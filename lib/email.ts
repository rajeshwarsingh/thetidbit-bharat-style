/**
 * Order email notifications via Resend (https://resend.com) — SERVER ONLY.
 * No npm dependency: a single fetch to Resend's REST API.
 *
 * Configure in .env.local:
 *   RESEND_API_KEY       — from resend.com (free tier)
 *   ORDER_NOTIFY_EMAIL   — where YOU want to receive order emails
 *   ORDER_FROM_EMAIL     — optional sender (default onboarding@resend.dev)
 *
 * If not configured, sending is a graceful no-op (the WhatsApp order path
 * still notifies you).
 */
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const TO_EMAIL = process.env.ORDER_NOTIFY_EMAIL || '';
const FROM_EMAIL = process.env.ORDER_FROM_EMAIL || 'TheTidbit Orders <onboarding@resend.dev>';

export const emailConfigured = Boolean(RESEND_API_KEY && TO_EMAIL);

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

  const subject = `${paid ? '🟢 PAID order' : '🕓 New order'} · ${order.productName.slice(0, 60)} · ₹${order.total}`;
  const row = (k: string, v: string) =>
    `<tr><td style="padding:6px 12px;color:#78716c;">${k}</td><td style="padding:6px 12px;font-weight:600;">${esc(v)}</td></tr>`;
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;">
    <h2 style="color:#4A5D44;">${paid ? 'New PAID order 🎉' : 'New order'}</h2>
    <table style="border-collapse:collapse;width:100%;border:1px solid #e7e5e4;border-radius:8px;">
      ${row('Product', order.productName)}
      ${row('Quantity', String(order.qty))}
      ${row('Amount', `₹${order.total}`)}
      ${row('Payment', paid ? `PAID (ref ${txn})` : 'Pending / COD')}
      ${row('Customer', order.name)}
      ${row('Phone', order.phone)}
      ${row('Address', order.address)}
      ${row('PIN code', order.pincode)}
    </table>
    <p style="color:#a8a29e;font-size:12px;margin-top:16px;">Sent automatically by thetidbit.in checkout.</p>
  </div>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({ from: FROM_EMAIL, to: [TO_EMAIL], subject, html }),
    });
    if (res.ok) return { ok: true };
    const d = await res.json().catch(() => ({}));
    return { ok: false, error: d?.message || `email_failed_${res.status}` };
  } catch (e: any) {
    return { ok: false, error: String(e?.message ?? e) };
  }
}
