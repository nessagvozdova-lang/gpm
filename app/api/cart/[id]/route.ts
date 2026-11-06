import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCart, cartSummary } from '@/lib/cart';
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body || !Number.isInteger(body.quantity) || body.quantity < 0 || body.quantity > 20) return NextResponse.json({ error: 'Invalid quantity.' }, { status: 400 });
  const cart = await getCart();
  const item = cart?.items.find(i => i.id === id);
  if (!cart || !item) return NextResponse.json({ error: 'Item not found.' }, { status: 404 });
  if (body.quantity > item.variant.stock) return NextResponse.json({ error: 'Not enough inventory.' }, { status: 409 });
  if (body.quantity === 0) await prisma.cartItem.delete({ where: { id } });
  else await prisma.cartItem.update({ where: { id }, data: { quantity: body.quantity } });
  return NextResponse.json(cartSummary(await getCart()));
}
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cart = await getCart();
  if (!cart?.items.some(i => i.id === id)) return NextResponse.json({ error: 'Item not found.' }, { status: 404 });
  await prisma.cartItem.delete({ where: { id } });
  return NextResponse.json(cartSummary(await getCart()));
}
