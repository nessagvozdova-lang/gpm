'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, ShoppingBag, Heart, Search, UserRound, ArrowUpRight, Instagram } from 'lucide-react';
export function Header() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const refresh = () => fetch('/api/cart', { cache: 'no-store' }).then(r => r.json()).then(d => setCount(d.count ?? 0)).catch(() => {});
    refresh(); window.addEventListener('cart:updated', refresh);
    return () => window.removeEventListener('cart:updated', refresh);
  }, []);
  return <>
    <div className="announcement"><span>Complimentary delivery on orders over 2,500 MDL</span><span className="announcement-right">A little luxury, wherever life takes you <ArrowUpRight size={13}/></span></div>
    <header className="site-header">
      <button className="icon-button mobile-menu" aria-label="Toggle menu" onClick={() => setMenu(v => !v)}>{menu ? <X/> : <Menu/>}</button>
      <nav className={'nav-left ' + (menu ? 'nav-open' : '')} aria-label="Main navigation"><Link onClick={() => setMenu(false)} href="/shop">Shop all</Link><Link onClick={() => setMenu(false)} href="/shop?category=womens-bags">Handbags</Link><Link onClick={() => setMenu(false)} href="/shop?category=suitcases">Luggage</Link><Link onClick={() => setMenu(false)} href="/about">Our story</Link></nav>
      <Link className="logo" href="/" aria-label="Maison Voyage home"><span className="logo-top">MAISON</span><span className="logo-bottom">VOYAGE<span className="logo-period">.</span></span></Link>
      <div className="nav-actions"><button className="icon-button" onClick={() => setSearch(v => !v)} aria-label="Search products"><Search size={20}/></button><Link className="icon-button account-icon" href="/account" aria-label="My account"><UserRound size={19}/></Link><Link className="icon-button heart-icon" href="/wishlist" aria-label="Wishlist"><Heart size={20}/></Link><Link className="icon-button bag-button" href="/cart" aria-label={`Shopping bag, ${count} items`}><ShoppingBag size={20}/>{count > 0 && <span className="bag-counter">{count}</span>}</Link></div>
      {search && <form action="/shop" className="search-popover"><input autoFocus name="q" placeholder="What are you looking for?" aria-label="Search products"/><button className="btn btn-primary" type="submit">Search</button></form>}
    </header>
  </>;
}
export function Footer() {
  const [email, setEmail] = useState(''); const [note, setNote] = useState('');
  async function subscribe(e: React.FormEvent) { e.preventDefault(); const res = await fetch('/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'},body:JSON.stringify({email}) }); setNote(res.ok?'You’re on the list. Welcome!':'Please enter a valid email.'); if (res.ok) setEmail(''); }
  return <footer className="footer"><div className="footer-main container"><div className="footer-intro"><Link href="/" className="footer-logo">MAISON<br/>VOYAGE<span>.</span></Link><p>Thoughtfully chosen companions for the places you go and the moments you keep.</p><a href="https://instagram.com" className="social-link" aria-label="Instagram"><Instagram size={18}/></a></div><div className="footer-links"><div><h4>Explore</h4><Link href="/shop">Shop all</Link><Link href="/shop?category=womens-bags">Handbags</Link><Link href="/shop?category=suitcases">Suitcases</Link><Link href="/about">Our story</Link></div><div><h4>We're here to help</h4><Link href="/contact">Contact us</Link><Link href="/shipping">Shipping & delivery</Link><Link href="/returns">Returns & refunds</Link><Link href="/faq">FAQ</Link><Link href="/account">My account</Link></div></div><div className="footer-news"><h4>Notes from Maison Voyage</h4><p>New discoveries, thoughtful inspiration and a little something special. Straight to your inbox.</p><form onSubmit={subscribe} className="newsletter-form"><input type="email" required placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} aria-label="Newsletter email"/><button type="submit" aria-label="Subscribe"><ArrowUpRight size={22}/></button></form>{note && <small role="status">{note}</small>}</div></div><div className="footer-bottom container"><span>© {new Date().getFullYear()} Maison Voyage · All rights reserved</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/cookies">Cookies</Link><span>Made for the journey.</span></div></div></footer>;
}
