import { prisma } from '@/lib/prisma';
import { AdminOrders } from '@/components/admin-orders';
export const dynamic='force-dynamic';
export const metadata={title:'Admin Orders'};
export default async function Orders(){const data=await prisma.order.findMany({orderBy:{createdAt:'desc'},take:100,include:{items:true}});return <AdminOrders orders={data.map(o=>({...o,createdAt:o.createdAt.toISOString()}))}/>}
