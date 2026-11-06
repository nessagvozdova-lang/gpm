import { cookies } from 'next/headers';
import { randomBytes } from 'node:crypto';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth';
import { shippingFor } from '@/lib/format';

export async function getCart(create = false) {
  const jar = await cookies();
  const user = await getUser();
  // Anonymous cart persists using an opaque httpOnly cookie.
  let token = jar.get('mv_cart')?.value;
  let cart = token ? await prisma.cart.findUnique({ where: { token }, include: { items: { include: { variant: { include: { product: { include: { images: { orderBy: { position: 'asc' }, take: 1 } } } } } } } } }) : null;
  if (cart && user && cart.userId !== user.id) {
    // Do not leak someone else's cart when a different account logs in.
    if (cart.userId) cart = null;
    else { await prisma.cart.update({ where: { id: cart.id }, data: { userId: user.id } }); cart.userId = user.id; }
  }
  if (!cart && user) cart = await prisma.cart.findFirst({ where: { userId: user.id }, include: { items: { include: { variant: { include: { product: { include: { images: { take: 1 } } } } } } } } });
  if (!cart && create) {
    token = randomBytes(32).toString('hex');
    cart = await prisma.cart.create({ data: { token, userId: user?.id }, include: { items: { include: { variant: { include: { product: { include: { images: { take: 1 } } } } } } } } });
    jar.set('mv_cart', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 90 });
  } else if (cart && cart.token && token !== cart.token) jar.set('mv_cart', cart.token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 90 });
  return cart;
}
export function cartSummary(cart: Awaited<ReturnType<typeof getCart>>) {
  const items = cart?.items.map(item => ({ id: item.id, variantId: item.variantId, productId: item.variant.product.id, slug: item.variant.product.slug,
    name: item.variant.product.name, image: item.variant.product.images[0]?.url ?? '', color: item.variant.color, size: item.variant.size,
    stock: item.variant.stock, price: item.variant.product.price, quantity: item.quantity,
    lineTotal: item.variant.product.price * item.quantity })) ?? [];
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  return { items, subtotal, shipping: items.length ? shippingFor(subtotal) : 0, total: subtotal + (items.length ? shippingFor(subtotal) : 0), count: items.reduce((sum, item) => sum + item.quantity, 0) };
}
