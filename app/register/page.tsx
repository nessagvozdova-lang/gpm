import { Suspense } from 'react';
import { AuthForm } from '@/components/auth-form';
export const metadata = { title: 'Create Account' };
export default function Page(){return <main className="auth-page"><Suspense><AuthForm register/></Suspense></main>}
