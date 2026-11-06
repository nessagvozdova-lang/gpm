import { NextResponse } from 'next/server';
import { getUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: 'Login required.' }, { status: 401 });
  const orders = await prisma.order.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' }, include: { items: true } });
  return NextResponse.json({ orders });
}
