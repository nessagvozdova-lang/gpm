import type { Metadata } from 'next';
import '@/app/globals.css';
import { Header, Footer } from '@/components/header';
export const metadata: Metadata = { title: { default: 'Maison Voyage | Carry Your World in Style', template: '%s | Maison Voyage' }, description: 'Thoughtfully chosen handbags, travel bags, backpacks and luggage. Timeless pieces for every journey.', openGraph: { type: 'website', title: 'Maison Voyage', description: 'Carry Your World in Style' } };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body><Header/>{children}<Footer/></body></html>; }
