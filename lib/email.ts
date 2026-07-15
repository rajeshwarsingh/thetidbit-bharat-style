/**
 * Order + tax-invoice emails via Resend (https://resend.com) — SERVER ONLY.
 *
 * Configure in .env.local / Vercel:
 *   RESEND_API_KEY, ORDER_NOTIFY_EMAIL, ORDER_FROM_EMAIL
 *   ORDER_GSTIN (optional) — shown on invoices when set
 */
import { CONTACT_INFO } from '../constants';
import { GST_PERCENT, orderGrandTotal } from '../utils/pricing';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = process.env.ORDER_FROM_EMAIL || 'TheTidbit Orders <onboarding@resend.dev>';
const GSTIN = (process.env.ORDER_GSTIN || '').trim();

const MERCHANT_EMAILS = (process.env.ORDER_NOTIFY_EMAIL || '')
  .split(/[,;\s]+/)
  .map((e) => e.trim())
  .filter(Boolean);

export const emailConfigured = Boolean(RESEND_API_KEY && MERCHANT_EMAILS.length > 0);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface OrderPayload {
  productId?: string;
  productName: string;
  unitPrice?: number;
  qty: number;
  subtotal: number;
  shipping: number;
  gst: number;
  gstPercent: number;
  total: number;
  name: string;
  phone: string;
  email?: string;
  address: string;
  pincode: string;
}

const esc = (s: string) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] || c));

const inr = (n: number) => `₹${Number(n).toLocaleString('en-IN')}`;

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

function invoiceNumber(txn: string) {
  return `INV-${String(txn).replace(/[^A-Z0-9]/gi, '').slice(-12).toUpperCase()}`;
}

function buildInvoiceHtml(order: OrderPayload, txn: string, paid: boolean, forCustomer: boolean) {
  const inv = invoiceNumber(txn);
  const date = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const gstPct = order.gstPercent || GST_PERCENT;
  const unitInclusive =
    order.unitPrice ?? (order.qty > 0 ? Math.round(order.total / order.qty) : order.total);
  const unitExcl = order.qty > 0 ? Math.round(order.subtotal / order.qty) : order.subtotal;

  const line = (label: string, value: string, bold = false) =>
    `<tr>
      <td style="padding:8px 0;color:#78716c;font-size:14px;">${label}</td>
      <td style="padding:8px 0;text-align:right;font-size:14px;${bold ? 'font-weight:700;color:#1c1917;' : 'font-weight:600;color:#292524;'}">${value}</td>
    </tr>`;

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:auto;color:#1c1917;background:#fafaf9;padding:24px;">
    <div style="background:#ffffff;border:1px solid #e7e5e4;border-radius:12px;overflow:hidden;">
      <div style="background:#4A5D44;color:#fff;padding:20px 24px;">
        <div style="font-size:20px;font-weight:700;letter-spacing:0.02em;">TheTidbit</div>
        <div style="font-size:13px;opacity:0.9;margin-top:4px;">Tax Invoice${paid ? ' · PAID' : ''}</div>
      </div>

      <div style="padding:24px;">
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr>
            <td style="vertical-align:top;width:50%;">
              <div style="font-size:11px;color:#a8a29e;text-transform:uppercase;letter-spacing:0.08em;">From</div>
              <div style="font-weight:700;margin-top:6px;">TheTidbit</div>
              <div style="font-size:13px;color:#57534e;line-height:1.5;margin-top:4px;">
                ${esc(CONTACT_INFO.address)}<br/>
                ${esc(CONTACT_INFO.email)} · ${esc(CONTACT_INFO.mobile)}
                ${GSTIN ? `<br/>GSTIN: ${esc(GSTIN)}` : ''}
              </div>
            </td>
            <td style="vertical-align:top;width:50%;text-align:right;">
              <div style="font-size:11px;color:#a8a29e;text-transform:uppercase;letter-spacing:0.08em;">Invoice</div>
              <div style="font-weight:700;margin-top:6px;font-family:monospace;">${esc(inv)}</div>
              <div style="font-size:13px;color:#57534e;margin-top:4px;">Date: ${esc(date)}</div>
              <div style="font-size:13px;color:#57534e;">Payment ref: ${esc(txn)}</div>
              <div style="margin-top:8px;display:inline-block;padding:4px 10px;border-radius:999px;background:${paid ? '#dcfce7' : '#fef3c7'};color:${paid ? '#166534' : '#92400e'};font-size:12px;font-weight:700;">
                ${paid ? 'PAID' : 'UNPAID'}
              </div>
            </td>
          </tr>
        </table>

        <div style="margin-bottom:20px;padding:14px 16px;background:#f5f5f4;border-radius:10px;">
          <div style="font-size:11px;color:#a8a29e;text-transform:uppercase;letter-spacing:0.08em;">Bill / ship to</div>
          <div style="font-weight:700;margin-top:6px;">${esc(order.name)}</div>
          <div style="font-size:13px;color:#57534e;line-height:1.5;margin-top:4px;">
            ${esc(order.phone)}${order.email ? ` · ${esc(order.email)}` : ''}<br/>
            ${esc(order.address)}<br/>
            PIN ${esc(order.pincode)}
          </div>
        </div>

        ${forCustomer ? `<p style="font-size:14px;color:#44403c;line-height:1.5;margin:0 0 16px;">Thank you for your order. Please find your tax invoice below.</p>` : `<p style="font-size:14px;color:#44403c;line-height:1.5;margin:0 0 16px;"><strong>New ${paid ? 'PAID' : ''} order</strong> — invoice copy for your records.</p>`}

        <table style="width:100%;border-collapse:collapse;margin-bottom:8px;">
          <thead>
            <tr style="background:#f5f5f4;">
              <th style="text-align:left;padding:10px 12px;font-size:12px;color:#78716c;font-weight:600;">Item</th>
              <th style="text-align:center;padding:10px 12px;font-size:12px;color:#78716c;font-weight:600;">Qty</th>
              <th style="text-align:right;padding:10px 12px;font-size:12px;color:#78716c;font-weight:600;">Rate (excl. GST)</th>
              <th style="text-align:right;padding:10px 12px;font-size:12px;color:#78716c;font-weight:600;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #e7e5e4;font-size:13px;font-weight:600;">${esc(order.productName)}<div style="font-size:11px;font-weight:400;color:#a8a29e;margin-top:4px;">Listed price ${inr(unitInclusive)} incl. GST</div></td>
              <td style="padding:12px;border-bottom:1px solid #e7e5e4;text-align:center;font-size:13px;">${order.qty}</td>
              <td style="padding:12px;border-bottom:1px solid #e7e5e4;text-align:right;font-size:13px;">${inr(unitExcl)}</td>
              <td style="padding:12px;border-bottom:1px solid #e7e5e4;text-align:right;font-size:13px;font-weight:600;">${inr(order.subtotal)}</td>
            </tr>
          </tbody>
        </table>

        <table style="width:100%;max-width:280px;margin-left:auto;border-collapse:collapse;margin-top:8px;">
          ${line('Taxable value', inr(order.subtotal))}
          ${line('Shipping', 'Free')}
          ${line(`GST (${gstPct}%)`, inr(order.gst))}
          <tr><td colspan="2" style="border-top:1px solid #e7e5e4;padding-top:4px;"></td></tr>
          ${line('Grand total (incl. GST)', inr(order.total), true)}
        </table>

        <p style="font-size:12px;color:#a8a29e;margin:24px 0 0;line-height:1.5;">
          Product prices are inclusive of GST @ ${gstPct}%. Free shipping across India · Handmade in India · thetidbit.in
        </p>
      </div>
    </div>
  </div>`;
}

/** Prefer server-side recomputed pricing when unit price is known. */
export function normalizeOrderPricing(order: OrderPayload): OrderPayload {
  if (typeof order.unitPrice === 'number' && order.unitPrice > 0) {
    const p = orderGrandTotal(order.unitPrice, order.qty);
    return { ...order, ...p };
  }
  return {
    ...order,
    subtotal: Number(order.subtotal) || 0,
    shipping: Number(order.shipping) || 0,
    gst: Number(order.gst) || 0,
    gstPercent: Number(order.gstPercent) || GST_PERCENT,
    total: Number(order.total) || 0,
  };
}

export async function sendOrderEmail(
  order: OrderPayload,
  txn: string,
  paid: boolean
): Promise<{ ok: boolean; error?: string; invoiceNo?: string }> {
  if (!RESEND_API_KEY) return { ok: false, error: 'email_not_configured' };

  const normalized = normalizeOrderPricing(order);
  const inv = invoiceNumber(txn);
  const customerEmail = (normalized.email || '').trim().toLowerCase();
  const sendCustomer = Boolean(customerEmail && EMAIL_RE.test(customerEmail));

  const merchantSubject = `${paid ? '🟢 PAID' : '🕓'} Invoice ${inv} · ${normalized.name} · ${inr(normalized.total)}`;
  const customerSubject = `Your TheTidbit invoice ${inv} · ${inr(normalized.total)}`;

  const merchantHtml = buildInvoiceHtml(normalized, txn, paid, false);
  const customerHtml = buildInvoiceHtml(normalized, txn, paid, true);

  const jobs: Promise<{ to: string; ok: boolean; error?: string }>[] = [];

  for (const to of MERCHANT_EMAILS) {
    jobs.push(sendOne(to, merchantSubject, merchantHtml));
  }
  if (sendCustomer) {
    jobs.push(sendOne(customerEmail, customerSubject, customerHtml));
  }

  if (jobs.length === 0) return { ok: false, error: 'no_recipients' };

  try {
    const results = await Promise.all(jobs);
    const anyOk = results.some((r) => r.ok);
    if (anyOk) return { ok: true, invoiceNo: inv };
    return { ok: false, error: results.map((r) => r.error).filter(Boolean).join('; ') || 'email_failed' };
  } catch (e: any) {
    return { ok: false, error: String(e?.message ?? e) };
  }
}
