import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/lib/validators';
import { createSession, verifyPassword } from '@/lib/auth';
export async function POST(request: Request) {
  const parsed = loginSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  await createSession(user.id);
  return NextResponse.json({ ok: true, role: user.role });
}
