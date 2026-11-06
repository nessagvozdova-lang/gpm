'use client';
import { useRouter } from 'next/navigation';
export function Logout(){const router=useRouter();return <button className="text-link" onClick={async()=>{await fetch('/api/auth/logout',{method:'POST'});router.push('/');router.refresh();}}>Sign out ↗</button>}
