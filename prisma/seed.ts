import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const db = new PrismaClient();
const pics = {
  tote: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1000&q=85',
  cross: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1000&q=85',
  bag: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&q=85',
  luggage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&q=85',
  suitcase: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=1000&q=85',
  travel: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1000&q=85',
  blackbag: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=1000&q=85',
  handbag: 'https://images.unsplash.com/photo-1585488763177-bde7d15fd3cf?w=1000&q=85',
  leather: 'https://images.unsplash.com/photo-1512412046876-f386342eddb3?w=1000&q=85',
  suitcase2: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=1000&q=85'
};
const categories = [
  { name: "Women's Bags", slug: 'womens-bags', image: pics.handbag },
  { name: "Men's Bags", slug: 'mens-bags', image: pics.leather },
  { name: 'Suitcases', slug: 'suitcases', image: pics.suitcase },
  { name: 'Travel Bags', slug: 'travel-bags', image: pics.travel },
  { name: 'Backpacks', slug: 'backpacks', image: pics.blackbag },
  { name: 'Accessories', slug: 'accessories', image: pics.tote }
];
const catalog: [string, string, number, string, string, string, string, number, boolean][] = [
  ['The Élise Shoulder Bag','womens-bags',189000,'An effortlessly elegant structured shoulder bag, designed for everyday rituals and evening adventures.','Burgundy','One size',pics.tote,14,true],
  ['The Camille Mini Tote','womens-bags',225000,'The petite carryall with a refined silhouette, supple finish, and smart internal organization.','Sand','One size',pics.cross,12,true],
  ['The Armand Leather Brief','mens-bags',279000,'Understated function meets thoughtful detailing in a classic work-to-weekend briefcase.','Espresso','One size',pics.leather,8,true],
  ['The Atlas Cabin Case','suitcases',349000,'Modern hard-shell protection, effortless rolling, and carefully designed compartments.','Champagne','Cabin',pics.suitcase,9,true],
  ['The Voyage Weekender','travel-bags',259000,'A beautiful escape starts with a reliable and spacious travel companion.','Cognac','One size',pics.travel,16,true],
  ['The Noa Everyday Backpack','backpacks',169000,'Minimal, lightweight, and thoughtfully organized for city days and long weekends.','Black','One size',pics.blackbag,20,true],
  ['The Solène Crossbody','womens-bags',149000,'Hands-free ease with a polished adjustable strap and considered proportions.','Black','One size',pics.handbag,13,false],
  ['The Nomad Travel Pack','backpacks',219000,'An all-day travel backpack with room for every important essential.','Slate','One size',pics.bag,11,false],
  ['The Riviera Large Case','suitcases',429000,'Longer journeys, lighter travel. A generous, refined hard-shell case.','Charcoal','Large',pics.suitcase2,6,false],
  ['The Weekend Duffle','mens-bags',199000,'Distinctive essentials for spontaneous departures and intentional escapes.','Tan','One size',pics.travel,15,false],
  ['The Travel Organizer','accessories',59000,'Small essentials, perfectly in their place. A companion for organized journeys.','Cocoa','One size',pics.cross,24,false],
  ['The Everyday Card Holder','accessories',39000,'A slim pocket-sized companion crafted with the same attention to detail as our bags.','Burgundy','One size',pics.tote,28,false]
];
async function main() {
  const ids = new Map<string,string>();
  for (const category of categories) {
    const c = await db.category.upsert({ where: { slug: category.slug }, update: { name: category.name, image: category.image }, create: category });
    ids.set(c.slug,c.id);
  }
  for (const [name, cat, price, description, color, size, image, stock, featured] of catalog) {
    const slug = name.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    await db.product.upsert({ where: { slug }, update: {}, create: { name, slug, price, description, featured, categoryId: ids.get(cat)!, material: 'Premium vegan leather and durable textiles', images: { create: [{ url: image, alt: name }] }, variants: { create: { sku: `MV-${slug.toUpperCase().slice(0,28)}`, color, size, stock } } } });
  }
  await db.discount.upsert({ where: { code: 'WELCOME10' }, update: {}, create: { code: 'WELCOME10', percent: 10 } });
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (email && password && password.length >= 12 && password !== 'CHANGE_ME_TO_A_STRONG_PASSWORD') {
    await db.user.upsert({ where: { email }, update: { role: 'ADMIN' }, create: { email, name: 'Store Administrator', role: 'ADMIN', passwordHash: await bcrypt.hash(password,12) } });
    console.log('Admin account ready:',email);
  } else console.log('No admin created. Set ADMIN_EMAIL and a strong ADMIN_PASSWORD before seeding.');
  console.log('Demo products seeded. Replace placeholder catalog data before launch.');
}
main().finally(() => db.$disconnect());
