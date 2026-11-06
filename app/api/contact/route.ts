import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validators';
export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
  await prisma.contactMessage.create({ data: parsed.data });
  return NextResponse.json({ ok: true }, { status: 201 });
}
