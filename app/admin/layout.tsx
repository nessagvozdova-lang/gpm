import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LayoutDashboard, PackageOpen, ShoppingBasket, ArrowLeft } from 'lucide-react';
import { requireAdmin } from '@/lib/auth';
export default async function AdminLayout({children}:{children:React.ReactNode}){if(!(await requireAdmin()))redirect('/login?next=/admin');return <div className="admin-shell"><aside className="admin-nav"><h2>MAISON <em>VOYAGE.</em></h2><span className="eyebrow">STORE MANAGEMENT</span><Link href="/admin"><LayoutDashboard size={17}/> Dashboard</Link><Link href="/admin/products"><PackageOpen size={17}/> Products</Link><Link href="/admin/orders"><ShoppingBasket size={17}/> Orders</Link><Link href="/"><ArrowLeft size={17}/> Back to store</Link></aside><main className="admin-main">{children}</main></div>}
