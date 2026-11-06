import { InfoPage } from '@/components/info-page';
export const metadata={title:'Privacy Policy'};
export default function Privacy(){return <InfoPage kicker="LEGAL / PRIVACY" title="Privacy policy." intro="Draft information for this demonstration. A legal review and complete policy are required before launch." sections={[
['Data collected','The application processes account details, delivery addresses, purchase history, and messages you submit to support.'],
['Purpose','Information is used to fulfill orders, manage accounts and answer enquiries. Newsletter emails are stored only if you subscribe.'],
['Storage & security','Account passwords are hashed; session tokens are stored as hashes. Production hosting, retention periods, data processing agreements and access requests require final configuration.'],
['Your rights','Contact the store operator to request access to, correction of, or deletion of personal information subject to applicable laws.']
]}/>}
