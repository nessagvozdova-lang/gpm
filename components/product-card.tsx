import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { formatMoney } from '@/lib/format';
import { AddToCart, FavoriteButton } from '@/components/store-actions';
type Product = { id: string; name: string; slug: string; price: number; compareAt: number | null; images: { url: string; alt: string }[]; variants: { id: string; color: string; stock: number }[]; category: { name: string } };
export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const variant = product.variants.find(v=>v.stock>0);
  return <article className="product-card" style={{animationDelay: `${Math.min(index,8)*70}ms`}}><div className="product-image-wrap"><Link href={`/shop/${product.slug}`} aria-label={`View ${product.name}`}><Image src={product.images[0]?.url || '/placeholder.svg'} alt={product.images[0]?.alt || product.name} width={650} height={760} className="product-image" unoptimized={false}/></Link><span className="product-badge">{index<3?'BESTSELLER':'THE COLLECTION'}</span><FavoriteButton productId={product.id}/><div className="product-quick"><AddToCart variantId={variant?.id??''} label={variant?'Quick add':'Sold out'}/></div></div><div className="product-info"><span>{product.category.name}</span><Link href={`/shop/${product.slug}`}><h3>{product.name} <ArrowUpRight size={14}/></h3></Link><div className="price-line"><strong>{formatMoney(product.price)}</strong>{product.compareAt && <del>{formatMoney(product.compareAt)}</del>}</div><div className="swatches"><i className="swatch" title={product.variants[0]?.color || 'Classic'} style={{background: colorValue(product.variants[0]?.color)}}/><small>{product.variants[0]?.color || 'Classic'}</small></div></div></article>;
}
function colorValue(name?: string) { const colors:Record<string,string>={Burgundy:'#800020',Sand:'#dac9b4',Espresso:'#4c332b',Champagne:'#c4b9aa',Cognac:'#a86c43',Black:'#282828',Slate:'#6d777f',Charcoal:'#444349',Tan:'#bc946c',Cocoa:'#745247'}; return colors[name||'']||'#b6aea6'; }
