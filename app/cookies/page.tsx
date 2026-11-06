import { InfoPage } from '@/components/info-page';
export const metadata={title:'Cookie Policy'};
export default function Cookies(){return <InfoPage kicker="LEGAL / COOKIES" title="Cookie policy." intro="Details about the essential cookies used by the site." sections={[
['Essential cookies','We use httpOnly session cookies for secure sign-in and an opaque cart identifier for remembering your shopping bag.'],
['Analytics and marketing','No third-party tracking or marketing cookies are included in this starter. Obtain consent if adding optional tracking later.'],
['Managing cookies','Your browser settings can remove or restrict cookies; this may prevent account sessions and shopping carts from working correctly.']
]}/>}
