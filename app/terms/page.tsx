import { InfoPage } from '@/components/info-page';
export const metadata={title:'Terms & Conditions'};
export default function Terms(){return <InfoPage kicker="LEGAL / TERMS" title="Terms & conditions." intro="This is an editable draft. The business must approve final terms before accepting real orders." sections={[
['Prices and orders','All displayed prices are in MDL. Orders are subject to confirmation and product availability.'],
['Payments','The demo offers cash on delivery. Other payment methods are unavailable until explicitly integrated.'],
['Delivery and returns','Delivery coverage, fulfilment timeframes, and returns obligations must be finalized in compliance with applicable consumer law.'],
['Contact','For questions concerning orders or these terms, use the Contact page.']
]}/>}
