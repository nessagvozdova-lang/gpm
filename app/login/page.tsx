import { Suspense } from 'react';
import { AuthForm } from '@/components/auth-form';
export const metadata = { title: 'Sign In' };
export default function Page(){return <main className="auth-page"><Suspense><AuthForm/></Suspense></main>}
