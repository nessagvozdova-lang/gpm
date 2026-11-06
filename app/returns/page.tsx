import { InfoPage } from '@/components/info-page';
export const metadata={title:'Returns & Refunds'};
export default function Returns(){return <InfoPage kicker="HELPFUL DETAILS / RETURNS" title="Returns & refunds." intro="We want you to love what you carry. Here's how to get help if something isn't right." sections={[
['Before requesting a return','Please contact support with your order reference and reason for return. Product eligibility and time limits must be confirmed in the final store policy before launch.'],
['Damaged items','If a product arrives damaged, take photos of the packaging and item and contact support as soon as possible.'],
['Exchanges','Exchanges depend on current availability and approval from customer support.'],
['Refunds','For cash-on-delivery orders, our team will confirm an appropriate refund process after reviewing your request.']
]}/>}
