import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
const schema = z.object({ status: z.enum(['PENDING', 'CONFIRMED', 'PACKED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']) });
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  const { id } = await params;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });
  try { const order = await prisma.order.update({ where: { id }, data: { status: parsed.data.status } }); return NextResponse.json({ ok: true, status: order.status }); }
  catch { return NextResponse.json({ error: 'Order not found.' }, { status: 404 }); }
}
