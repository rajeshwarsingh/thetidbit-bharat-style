/**
 * Order email notifications via Resend (https://resend.com) — SERVER ONLY.
 * No npm dependency: a single fetch to Resend's REST API.
 *
 * Configure in .env.local:
 *   RESEND_API_KEY       — from resend.com (free tier)
 *   ORDER_NOTIFY_EMAIL   — merchant inbox(es), comma-separated
 *   ORDER_FROM_EMAIL     — optional sender (default onboarding@resend.dev)
 *
 * Customer email (optional on checkout) is also mailed after a paid order.
 * If Resend is not configured, sending is a graceful no-op.
 */
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = process.env.ORDER_FROM_EMAIL || 'TheTidbit Orders <onboarding@resend.dev>';

const MERCHANT_EMAILS = (process.env.ORDER_NOTIFY_EMAIL || '')
  .split(/[,;\s]+/)
  .map((e) => e.trim())
  .filter(Boolean);

export const emailConfigured = Boolean(RESEND_API_KEY && MERCHANT_EMAILS.length > 0);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface OrderPayload {
  productName: string;
  qty: number;
  total: number;
  name: string;
  phone: string;
  email?: string;
  address: string;
  pincode: string;
}

const esc = (s: string) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] || c));

async function sendOne(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
    body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html }),
  });
  if (res.ok) return { to, ok: true as const };
  const d = await res.json().catch(() => ({}));
  console.error('[order email failed]', to, d?.message || res.status);
  return { to, ok: false as const, error: d?.message || `email_failed_${res.status}` };
}

function orderRows(order: OrderPayload, txn: string, paid: boolean) {
  const row = (k: string, v: string) =>
    `<tr>
      <td style="padding:10px 14px;color:#78716c;width:120px;vertical-align:top;white-space:nowrap;">${k}</td>
      <td style="padding:10px 14px;font-weight:600;color:#1c1917;vertical-align:top;word-break:break-word;overflow-wrap:anywhere;">${esc(v)}</td>
    </tr>`;
  return `
    <table style="border-collapse:collapse;width:100%;border:1px solid #e7e5e4;border-radius:8px;table-layout:fixed;">
      ${row('Product', order.productName)}
      ${row('Quantity', String(order.qty))}
      ${row('Amount', `₹${order.total}`)}
      ${row('Payment', paid ? `PAID (ref ${txn})` : 'Pending / COD')}
      ${row('Full name', order.name)}
      ${row('Phone', order.phone)}
      ${order.email ? row('Email', order.email) : ''}
      ${row('Address', order.address)}
      ${row('PIN code', order.pincode)}
    </table>`;
}

export async function sendOrderEmail(
  order: OrderPayload,
  txn: string,
  paid: boolean
): Promise<{ ok: boolean; error?: string }> {
  if (!RESEND_API_KEY) return { ok: false, error: 'email_not_configured' };

  const customerEmail = (order.email || '').trim().toLowerCase();
  const sendCustomer = Boolean(customerEmail && EMAIL_RE.test(customerEmail));

  const merchantSubject = `${paid ? '🟢 PAID' : '🕓 New'} order · ${order.name} · ₹${order.total}`;
  const merchantHtml = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto;color:#1c1917;">
    <h2 style="color:#4A5D44;margin:0 0 16px;">${paid ? 'New PAID order 🎉' : 'New order'}</h2>
    <p style="margin:0 0 16px;font-size:16px;line-height:1.4;">
      <strong>Full name:</strong> ${esc(order.name)}
    </p>
    ${orderRows(order, txn, paid)}
    <p style="color:#a8a29e;font-size:12px;margin-top:16px;">Sent automatically by thetidbit.in checkout.</p>
  </div>`;

  const customerSubject = `Your TheTidbit order · ₹${order.total}`;
  const customerHtml = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto;color:#1c1917;">
    <h2 style="color:#4A5D44;margin:0 0 16px;">Thanks for your order${order.name ? `, ${esc(order.name.split(' ')[0])}` : ''}!</h2>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.5;color:#44403c;">
      ${paid ? 'We received your payment and will prepare your handmade bag for dispatch.' : 'We received your order details.'}
      Reply to this email or WhatsApp us if you need anything.
    </p>
    ${orderRows(order, txn, paid)}
    <p style="color:#a8a29e;font-size:12px;margin-top:16px;">TheTidbit · Handmade in India · thetidbit.in</p>
  </div>`;

  const jobs: Promise<{ to: string; ok: boolean; error?: string }>[] = [];

  // Merchant inboxes
  for (const to of MERCHANT_EMAILS) {
    jobs.push(sendOne(to, merchantSubject, merchantHtml));
  }
  // Customer confirmation (optional)
  if (sendCustomer) {
    jobs.push(sendOne(customerEmail, customerSubject, customerHtml));
  }

  if (jobs.length === 0) return { ok: false, error: 'no_recipients' };

  try {
    // Send per-recipient so one blocked address does not block the others
    // (Resend free tier limits who you can mail until a domain is verified).
    const results = await Promise.all(jobs);
    const anyOk = results.some((r) => r.ok);
    if (anyOk) return { ok: true };
    return { ok: false, error: results.map((r) => r.error).filter(Boolean).join('; ') || 'email_failed' };
  } catch (e: any) {
    return { ok: false, error: String(e?.message ?? e) };
  }
}
