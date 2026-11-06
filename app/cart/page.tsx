import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { CartClient } from '@/components/cart-client';
export const metadata = { title: 'Your Shopping Bag' };
export default function CartPage(){return <main className="container page-section"><div className="breadcrumbs"><Link href="/">Home</Link><ChevronRight size={13}/> Shopping bag</div><span className="eyebrow">THE PIECES YOU LOVE</span><h1 className="page-title">Your <em>shopping bag.</em></h1><CartClient/></main>}
