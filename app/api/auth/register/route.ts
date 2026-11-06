import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/lib/validators';
import { createSession, hashPassword } from '@/lib/auth';
export async function POST(request: Request) {
  try {
    const data = registerSchema.parse(await request.json());
    const user = await prisma.user.create({ data: { name: data.name, email: data.email, passwordHash: await hashPassword(data.password) } });
    await createSession(user.id);
    return NextResponse.json({ ok: true, user: { name: user.name, email: user.email } }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('Unique constraint')) return NextResponse.json({ error: 'This email is already registered.' }, { status: 409 });
    return NextResponse.json({ error: 'Please check your registration details.' }, { status: 400 });
  }
}
