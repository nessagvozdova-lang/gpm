import { prisma } from '@/lib/prisma';
import { AdminProducts } from '@/components/admin-products';
export const dynamic='force-dynamic';
export const metadata={title:'Admin Products'};
export default async function Products(){const [products,categories]=await Promise.all([prisma.product.findMany({include:{images:{take:1},variants:true},orderBy:{createdAt:'desc'}}),prisma.category.findMany({orderBy:{name:'asc'}})]);return <AdminProducts products={products} categories={categories}/>}
