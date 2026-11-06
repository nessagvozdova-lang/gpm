'use client';
import { useState } from 'react';
import { Heart, ShoppingBag, Check, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
export function AddToCart({ variantId, label = 'Add to bag', className = '' }: { variantId: string; label?: string; className?: string }) {
  const [busy, setBusy] = useState(false); const [status, setStatus] = useState('');
  async function add() {
    setBusy(true); setStatus('');
    try { const r = await fetch('/api/cart', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({variantId,quantity:1})}); const data = await r.json(); if (!r.ok) throw new Error(data.error || 'Unable to add item.'); window.dispatchEvent(new Event('cart:updated')); setStatus('Added to bag'); setTimeout(() => setStatus(''),2600); }
    catch (e) { setStatus(e instanceof Error ? e.message : 'Something went wrong.'); }
    finally { setBusy(false); }
  }
  return <div className="action-wrap"><button type="button" onClick={add} disabled={busy || !variantId} className={className || 'add-card-button'}>{status === 'Added to bag' ? <Check size={16}/> : <ShoppingBag size={16}/>} {busy ? 'Adding…' : status === 'Added to bag' ? 'Added' : label}</button>{status && status !== 'Added to bag' && <span className="action-error" role="alert">{status}</span>}</div>;
}
export function FavoriteButton({ productId }: { productId: string }) {
  const [saved, setSaved] = useState(false); const [error, setError] = useState(''); const router = useRouter();
  async function toggle() { setError(''); const r=await fetch('/api/wishlist',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({productId})}); if(r.status===401){router.push('/login?next=/wishlist');return;} const d=await r.json();if(r.ok)setSaved(d.saved);else setError(d.error||'Unable to save'); }
  return <><button type="button" title={saved?'Remove from wishlist':'Add to wishlist'} aria-label={saved?'Remove from wishlist':'Add to wishlist'} className={'favorite-button '+(saved?'active':'')} onClick={toggle}><Heart size={18} fill={saved?'currentColor':'none'}/></button>{error&&<small className="action-error">{error}</small>}</>;
}
export function QuantityControl({ quantity, min = 1, max = 20, onChange }: { quantity:number; min?:number; max?:number; onChange:(v:number)=>void }) { return <div className="quantity"><button type="button" aria-label="Decrease quantity" onClick={()=>onChange(Math.max(min,quantity-1))}><Minus size={14}/></button><span>{quantity}</span><button type="button" aria-label="Increase quantity" onClick={()=>onChange(Math.min(max,quantity+1))}><Plus size={14}/></button></div>; }
