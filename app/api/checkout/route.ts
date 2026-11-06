import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { Prisma } from '@prisma/client';
import { checkoutSchema } from '@/lib/validators';
import { getCart } from '@/lib/cart';
import { getUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { discountFor, shippingFor } from '@/lib/format';
export async function POST(request: Request) {
  const parsed = checkoutSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Please check your shipping details.' }, { status: 400 });
  const cart = await getCart();
  if (!cart || cart.items.length === 0) return NextResponse.json({ error: 'Your bag is empty.' }, { status: 400 });
  const user = await getUser();
  try {
    const order = await prisma.$transaction(async tx => {
      let subtotal = 0;
      const rows: { productId: string; variantId: string; name: string; sku: string; quantity: number; unitPrice: number }[] = [];
      for (const item of cart.items) {
        // Price and availability are always re-read and validated server-side.
        const variant = await tx.productVariant.findUnique({ where: { id: item.variantId }, include: { product: true } });
        if (!variant?.product.active || variant.stock < item.quantity) throw new Error('One or more products have insufficient inventory.');
        const updated = await tx.productVariant.updateMany({ where: { id: variant.id, stock: { gte: item.quantity } }, data: { stock: { decrement: item.quantity } } });
        if (updated.count !== 1) throw new Error('Inventory changed. Review your bag and retry.');
        subtotal += variant.product.price * item.quantity;
        rows.push({ productId: variant.productId, variantId: variant.id, name: variant.product.name, sku: variant.sku, quantity: item.quantity, unitPrice: variant.product.price });
      }
      let discount = 0;
      if (parsed.data.coupon) {
        const coupon = await tx.discount.findUnique({ where: { code: parsed.data.coupon.toUpperCase() } });
        if (!coupon || !coupon.active || (coupon.expiresAt && coupon.expiresAt < new Date()) || (coupon.maxUses != null && coupon.uses >= coupon.maxUses)) throw new Error('This discount code is not valid.');
        const applied = await tx.discount.updateMany({ where: { id: coupon.id, active: true, ...(coupon.maxUses === null ? {} : { uses: { lt: coupon.maxUses } }) }, data: { uses: { increment: 1 } } });
        if (applied.count !== 1) throw new Error('This discount has reached its usage limit.');
        discount = discountFor(subtotal, coupon.percent);
      }
      const shipping = shippingFor(subtotal - discount);
      const number = `MV-${new Date().getFullYear()}-${randomBytes(5).toString('hex').toUpperCase()}`;
      const { coupon: _coupon, ...shippingDetails } = parsed.data;
      const order = await tx.order.create({ data: { number, ...shippingDetails, subtotal, discount, shipping, total: subtotal - discount + shipping, userId: user?.id ?? null,
        items: { create: rows }, payment: { create: { provider: 'CASH_ON_DELIVERY', amount: subtotal - discount + shipping, status: 'UNPAID' } } } });
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      return order;
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable, maxWait: 10000, timeout: 15000 });
    return NextResponse.json({ ok: true, number: order.number, total: order.total }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Could not place order. Try again.' }, { status: 409 });
  }
}
