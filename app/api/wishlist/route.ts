import { NextResponse } from 'next/server';
import { getUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
export async function POST(request: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: 'Sign in to save favorites.' }, { status: 401 });
  const { productId } = await request.json().catch(() => ({}));
  if (typeof productId !== 'string') return NextResponse.json({ error: 'Invalid product.' }, { status: 400 });
  const product = await prisma.product.findFirst({ where: { id: productId, active: true } });
  if (!product) return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  const existing = await prisma.wishlistItem.findUnique({ where: { userId_productId: { userId: user.id, productId } } });
  if (existing) await prisma.wishlistItem.delete({ where: { id: existing.id } });
  else await prisma.wishlistItem.create({ data: { userId: user.id, productId } });
  return NextResponse.json({ saved: !existing });
}
