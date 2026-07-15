/** Shared checkout pricing helpers (server + client safe).
 *
 * Catalog prices are GST-INCLUSIVE. Example: ₹474 already includes 5% GST.
 * Checkout shows the breakup (taxable + GST) that adds up to that same total.
 */
export const FREE_SHIPPING_MIN = 0;
export const SHIPPING_FEE = 0;
export const GST_RATE = 0.05;
export const GST_PERCENT = 5;

export function shippingForSubtotal(_subtotal: number): number {
  return 0;
}

export interface OrderPricing {
  /** GST-exclusive value of goods (rounded). */
  subtotal: number;
  shipping: number;
  /** Same as subtotal when shipping is free (excl. GST base). */
  taxable: number;
  /** GST portion included in the listed price. */
  gst: number;
  gstPercent: number;
  /** Amount charged — equals catalog price × qty (GST inclusive). */
  total: number;
}

/** Split an inclusive amount into taxable + GST that sum exactly to `inclusive`. */
export function splitInclusiveGst(inclusive: number, rate = GST_RATE): { taxable: number; gst: number } {
  const total = Math.max(0, Math.round(inclusive));
  const taxable = Math.round(total / (1 + rate));
  return { taxable, gst: total - taxable };
}

export function orderGrandTotal(unitPriceInclusive: number, qty: number): OrderPricing {
  const total = unitPriceInclusive * Math.max(1, qty);
  const { taxable, gst } = splitInclusiveGst(total);
  return {
    subtotal: taxable,
    shipping: 0,
    taxable,
    gst,
    gstPercent: GST_PERCENT,
    total,
  };
}
