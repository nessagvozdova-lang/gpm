import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const base=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';const pages=['','shop','about','contact','shipping','returns','faq','privacy','terms','cookies'];const products=await prisma.product.findMany({where:{active:true},select:{slug:true,createdAt:true}});return [...pages.map(path=>({url:`${base}/${path}`,lastModified:new Date()})),...products.map(p=>({url:`${base}/shop/${p.slug}`,lastModified:p.createdAt}))]}
