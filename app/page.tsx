import HomePage from '../components/HomePage';
import { buildMetadata } from '../lib/seo';
import { HOME_META } from '../lib/seo-content';

export const metadata = buildMetadata({
  title: HOME_META.title,
  description: HOME_META.description,
  path: '/',
  image: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1768458165/2_txnnxs.png',
  keywords: [
    'handmade jute bags',
    'premium handbags India',
    'eco friendly bags',
    'made in India handbags',
    'TheTidbit',
  ],
});

export default function Page() {
  return <HomePage />;
}
