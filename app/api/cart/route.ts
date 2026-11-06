import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cartSchema } from '@/lib/validators';
import { cartSummary, getCart } from '@/lib/cart';
export const dynamic = 'force-dynamic';
export async function GET() { return NextResponse.json(cartSummary(await getCart())); }
export async function POST(request: Request) {
  const parsed = cartSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Choose a product option and a valid quantity.' }, { status: 400 });
  const variant = await prisma.productVariant.findUnique({ where: { id: parsed.data.variantId }, include: { product: true } });
  if (!variant || !variant.product.active) return NextResponse.json({ error: 'This item is no longer available.' }, { status: 404 });
  const cart = await getCart(true);
  if (!cart) return NextResponse.json({ error: 'Cart unavailable.' }, { status: 500 });
  const existing = cart.items.find(item => item.variantId === variant.id);
  const quantity = (existing?.quantity ?? 0) + parsed.data.quantity;
  if (quantity > variant.stock || quantity > 20) return NextResponse.json({ error: 'Not enough stock available.' }, { status: 409 });
  await prisma.cartItem.upsert({ where: { cartId_variantId: { cartId: cart.id, variantId: variant.id } }, create: { cartId: cart.id, variantId: variant.id, quantity }, update: { quantity } });
  return NextResponse.json(cartSummary(await getCart()), { status: 201 });
}
