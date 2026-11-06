export const SHIPPING_THRESHOLD = 250000; // 2,500 MDL
export const SHIPPING_FEE = 15000; // 150 MDL
export function formatMoney(amount: number, currency = 'MDL') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(amount / 100);
}
export function shippingFor(subtotal: number) { return subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE; }
export function discountFor(subtotal: number, percent: number) {
  if (!Number.isInteger(percent) || percent < 0 || percent > 100) throw new Error('Invalid discount');
  return Math.floor(subtotal * percent / 100);
}
