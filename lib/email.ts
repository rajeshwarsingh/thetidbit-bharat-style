/**
 * Order email notifications via Resend (https://resend.com) — SERVER ONLY.
 * No npm dependency: a single fetch to Resend's REST API.
 *
 * Configure in .env.local:
 *   RESEND_API_KEY       — from resend.com (free tier)
 *   ORDER_NOTIFY_EMAIL   — one or more emails, comma-separated
 *   ORDER_FROM_EMAIL     — optional sender (default onboarding@resend.dev)
 *
 * If not configured, sending is a graceful no-op (the WhatsApp order path
 * still notifies you).
 */
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = process.env.ORDER_FROM_EMAIL || 'TheTidbit Orders <onboarding@resend.dev>';

const TO_EMAILS = (process.env.ORDER_NOTIFY_EMAIL || '')
  .split(/[,;\s]+/)
  .map((e) => e.trim())
  .filter(Boolean);

export const emailConfigured = Boolean(RESEND_API_KEY && TO_EMAILS.length > 0);

export interface OrderPayload {
  productName: string;
  qty: number;
  total: number;
  name: string;
  phone: string;
  address: string;
  pincode: string;
}

const esc = (s: string) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] || c));

export async function sendOrderEmail(
  order: OrderPayload,
  txn: string,
  paid: boolean
): Promise<{ ok: boolean; error?: string }> {
  if (!emailConfigured) return { ok: false, error: 'email_not_configured' };

  const subject = `${paid ? '🟢 PAID' : '🕓 New'} order · ${order.name} · ₹${order.total}`;
  const row = (k: string, v: string) =>
    `<tr>
      <td style="padding:10px 14px;color:#78716c;width:120px;vertical-align:top;white-space:nowrap;">${k}</td>
      <td style="padding:10px 14px;font-weight:600;color:#1c1917;vertical-align:top;word-break:break-word;overflow-wrap:anywhere;">${esc(v)}</td>
    </tr>`;
  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto;color:#1c1917;">
    <h2 style="color:#4A5D44;margin:0 0 16px;">${paid ? 'New PAID order 🎉' : 'New order'}</h2>
    <p style="margin:0 0 16px;font-size:16px;line-height:1.4;">
      <strong>Full name:</strong> ${esc(order.name)}
    </p>
    <table style="border-collapse:collapse;width:100%;border:1px solid #e7e5e4;border-radius:8px;table-layout:fixed;">
      ${row('Product', order.productName)}
      ${row('Quantity', String(order.qty))}
      ${row('Amount', `₹${order.total}`)}
      ${row('Payment', paid ? `PAID (ref ${txn})` : 'Pending / COD')}
      ${row('Full name', order.name)}
      ${row('Phone', order.phone)}
      ${row('Address', order.address)}
      ${row('PIN code', order.pincode)}
    </table>
    <p style="color:#a8a29e;font-size:12px;margin-top:16px;">Sent automatically by thetidbit.in checkout.</p>
  </div>`;

  try {
    // Resend free tier (onboarding@resend.dev) can only email the account owner
    // until a domain is verified. Send per-recipient so one blocked address
    // does not block delivery to the others.
    const results = await Promise.all(
      TO_EMAILS.map(async (to) => {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
          body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html }),
        });
        if (res.ok) return { to, ok: true as const };
        const d = await res.json().catch(() => ({}));
        console.error('[order email failed]', to, d?.message || res.status);
        return { to, ok: false as const, error: d?.message || `email_failed_${res.status}` };
      })
    );
    const anyOk = results.some((r) => r.ok);
    if (anyOk) return { ok: true };
    return { ok: false, error: results.map((r) => r.error).filter(Boolean).join('; ') || 'email_failed' };
  } catch (e: any) {
    return { ok: false, error: String(e?.message ?? e) };
  }
}
