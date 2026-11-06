import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth';
import { ProductCard } from '@/components/product-card';
export const dynamic='force-dynamic';
export const metadata={title:'My Wishlist'};
export default async function Wishlist(){const user=await getUser();if(!user)redirect('/login?next=/wishlist');const items=await prisma.wishlistItem.findMany({where:{userId:user.id},include:{product:{include:{images:{take:1},variants:true,category:true}}}});return <main className="container page-section"><span className="eyebrow">KEEP THE THINGS YOU LOVE CLOSE</span><h1 className="page-title">Your <em>wishlist.</em></h1>{items.length?<div className="products-grid">{items.filter(i=>i.product.active).map((i,n)=><ProductCard key={i.id} product={i.product} index={n}/>)}</div>:<div className="empty-state"><h2>Nothing saved just yet.</h2><p>Tap the heart beside any piece you love to keep it here.</p><Link href="/shop" className="btn btn-primary">Browse the collection</Link></div>}</main>}
