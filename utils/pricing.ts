/** Shared checkout pricing helpers (server + client safe). */
export const FREE_SHIPPING_MIN = 499;
export const SHIPPING_FEE = 49;

export function shippingForSubtotal(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE;
}

export function orderGrandTotal(unitPrice: number, qty: number): {
  subtotal: number;
  shipping: number;
  total: number;
} {
  const subtotal = unitPrice * Math.max(1, qty);
  const shipping = shippingForSubtotal(subtotal);
  return { subtotal, shipping, total: subtotal + shipping };
}
