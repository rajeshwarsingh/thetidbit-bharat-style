import SmartPage from '../components/SmartPage';
import { buildMetadata } from '../lib/seo';
import { HOME_META } from '../lib/seo-content';

export const metadata = buildMetadata({
  title: HOME_META.title,
  description: HOME_META.description,
  path: '/',
  image: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1768458165/2_txnnxs.png',
  keywords: [
    'handmade jute sling bag',
    'boho embroidered crossbody bag',
    'evil eye jute sling bag',
    'affordable sling bags under 500',
    'best sling bags in mumbai online',
    'handcrafted handbags maharashtra',
    'TheTidbit',
  ],
});

/** Default homepage — Smart experience. Legacy home lives at /classic. */
export default function Page() {
  return <SmartPage />;
}
