import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
export async function POST(request: Request) {
  const parsed = z.object({ email: z.email() }).safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 });
  await prisma.subscriber.upsert({ where: { email: parsed.data.email }, update: {}, create: { email: parsed.data.email } });
  return NextResponse.json({ ok: true });
}
