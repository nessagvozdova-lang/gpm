import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validators';
export async function POST(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  const parsed = productSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid product data.', details: parsed.error.issues }, { status: 400 });
  const { imageUrl, imageAlt, sku, color, size, stock, ...product } = parsed.data;
  try {
    const created = await prisma.product.create({ data: { ...product, images: { create: { url: imageUrl, alt: imageAlt } }, variants: { create: { sku, color, size, stock } } } });
    return NextResponse.json({ id: created.id, slug: created.slug }, { status: 201 });
  } catch { return NextResponse.json({ error: 'A product with this slug or SKU already exists, or category is invalid.' }, { status: 409 }); }
}
