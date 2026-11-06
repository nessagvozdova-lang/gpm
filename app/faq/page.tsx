import { InfoPage } from '@/components/info-page';
export const metadata={title:'Frequently Asked Questions'};
export default function FAQ(){return <InfoPage kicker="GOOD TO KNOW / FAQ" title="A little help, here." intro="Answers to some of the questions that come up most often." sections={[
['How can I place an order?','Browse the collection, choose your preferred variation, add it to the bag and complete checkout with your delivery details.'],
['What payment methods do you accept?','This first version supports cash on delivery only. Card payments are not enabled.'],
['Which currency is used?','Prices are listed in Moldovan lei (MDL). Future currency display and payment options can be configured separately.'],
['How do I choose a size?','Available sizes appear on each product page. For suitcases, choose Cabin or Large where available.'],
['Can I track my order?','Sign in to see orders associated with your account, including their current status.'],
['Can I return a purchase?','Contact our team with your order number. The finalized return terms will be published before commercial launch.'],
['How should I care for my bag?','Follow the care instructions supplied with each product. For general upkeep, use a soft dry cloth and avoid harsh chemicals.']
]}/>}
