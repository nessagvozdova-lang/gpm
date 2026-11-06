import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { CheckoutForm } from '@/components/checkout-form';
import { CartClient } from '@/components/cart-client';
export const metadata = { title: 'Secure Checkout' };
export default function CheckoutPage(){return <main className="container page-section"><div className="breadcrumbs"><Link href="/">Home</Link><ChevronRight size={13}/><Link href="/cart">Shopping bag</Link><ChevronRight size={13}/> Checkout</div><span className="eyebrow">ONE STEP CLOSER</span><h1 className="page-title">Your <em>checkout.</em></h1><div className="checkout-layout"><CheckoutForm/><div className="checkout-sidebar"><CartClient checkout/></div></div></main>}
