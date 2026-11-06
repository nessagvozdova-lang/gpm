import { InfoPage } from '@/components/info-page';
export const metadata={title:'Shipping & Delivery'};
export default function Shipping(){return <InfoPage kicker="HELPFUL DETAILS / SHIPPING" title="Shipping & delivery." intro="Everything you need to know about getting your new favorite pieces home." sections={[
['Where we deliver','This demo checkout currently accepts delivery addresses in Moldova only. Regions and delivery coverage are subject to confirmation by the store operator.'],
['Delivery times','Delivery estimates are not yet finalized. Our team will confirm availability and timing after an order is placed.'],
['Delivery costs','Standard delivery is 150 MDL. Shipping is complimentary for merchandise subtotals of at least 2,500 MDL, after discounts.'],
['Tracking your order','Registered customers can see order statuses in My Account. For further details, contact customer support.']
]}/>}
