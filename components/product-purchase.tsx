'use client';
import { useState } from 'react';
import { Heart, Check, ShoppingBag } from 'lucide-react';
import { QuantityControl } from '@/components/store-actions';
import { useRouter } from 'next/navigation';
type Variant={id:string;color:string;size:string;stock:number};
export function ProductPurchase({variants,productId}:{variants:Variant[];productId:string}){
  const [chosen,setChosen]=useState(variants[0]?.id||''); const [quantity,setQuantity]=useState(1);const [loading,setLoading]=useState(false);const [message,setMessage]=useState('');const router=useRouter(); const selected=variants.find(v=>v.id===chosen);
  async function add(){setLoading(true);setMessage('');const res=await fetch('/api/cart',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({variantId:chosen,quantity})});const data=await res.json();setLoading(false);if(res.ok){setMessage('Added to your bag.');window.dispatchEvent(new Event('cart:updated'));}else setMessage(data.error||'Could not add this item.');}
  async function favorite(){const res=await fetch('/api/wishlist',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({productId})});if(res.status===401)router.push('/login?next=/wishlist');else setMessage(res.ok?'Wishlist updated.':'Could not update wishlist.');}
  return <div className="purchase-form"><div className="purchase-option"><span>Choose your color & size</span><div className="variant-select">{variants.map(v=><button className={chosen===v.id?'selected':''} key={v.id} type="button" onClick={()=>{setChosen(v.id);setQuantity(1);}}>{v.color} · {v.size}</button>)}</div></div><div className="purchase-option"><span>Quantity</span><QuantityControl quantity={quantity} max={Math.min(20,selected?.stock||1)} onChange={setQuantity}/></div><p className="availability">{selected && selected.stock>0?<><i/> In stock — {selected.stock} available</>:'Currently out of stock'}</p><div className="purchase-actions"><button disabled={!selected?.stock||loading} className="btn btn-primary" onClick={add}><ShoppingBag size={18}/> {loading?'Adding…':'Add to bag'}</button><button className="save-detail" onClick={favorite} aria-label="Save to wishlist"><Heart size={21}/></button></div>{message&&<p role="status" className="form-message">{message}</p>}</div>;
}
