import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validators';
type Ctx = { params: Promise<{ id: string }> };
export async function PATCH(request: Request, { params }: Ctx) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  const { id } = await params;
  const parsed = productSchema.partial().safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid product details.' }, { status: 400 });
  const { imageUrl, imageAlt, sku, color, size, stock, ...data } = parsed.data;
  try {
    const product = await prisma.product.update({ where: { id }, data });
    const variant = await prisma.productVariant.findFirst({ where: { productId: id } });
    if (variant && (sku !== undefined || color !== undefined || size !== undefined || stock !== undefined)) await prisma.productVariant.update({ where: { id: variant.id }, data: { sku, color, size, stock } });
    const image = await prisma.productImage.findFirst({ where: { productId: id } });
    if (image && (imageUrl !== undefined || imageAlt !== undefined)) await prisma.productImage.update({ where: { id: image.id }, data: { url: imageUrl, alt: imageAlt } });
    return NextResponse.json({ ok: true, id: product.id });
  } catch { return NextResponse.json({ error: 'Could not update this product.' }, { status: 409 }); }
}
export async function DELETE(_request: Request, { params }: Ctx) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  const { id } = await params;
  // Soft delete keeps historical order records intact.
  await prisma.product.update({ where: { id }, data: { active: false } });
  return NextResponse.json({ ok: true });
}
