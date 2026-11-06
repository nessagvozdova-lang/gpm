import { cookies } from 'next/headers';
import { createHash, randomBytes } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const COOKIE = 'mv_session';
const TTL = 60 * 60 * 24 * 14;
const digest = (token: string) => createHash('sha256').update(token).digest('hex');
export async function hashPassword(password: string) { return bcrypt.hash(password, 12); }
export async function verifyPassword(password: string, hash: string) { return bcrypt.compare(password, hash); }
export async function getUser() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const session = await prisma.session.findUnique({ where: { tokenHash: digest(token) }, include: { user: true } });
  return session && session.expiresAt > new Date() ? session.user : null;
}
export async function createSession(userId: string) {
  const token = randomBytes(32).toString('hex');
  await prisma.session.create({ data: { tokenHash: digest(token), userId, expiresAt: new Date(Date.now() + TTL * 1000) } });
  (await cookies()).set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: TTL });
}
export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE)?.value;
  if (token) await prisma.session.deleteMany({ where: { tokenHash: digest(token) } });
  cookieStore.delete(COOKIE);
}
export async function requireAdmin() {
  const user = await getUser();
  if (user?.role !== 'ADMIN') return null;
  return user;
}
