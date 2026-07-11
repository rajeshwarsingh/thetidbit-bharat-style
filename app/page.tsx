import HomePage from '../components/HomePage';
import { buildMetadata } from '../lib/seo';

export const metadata = buildMetadata({
  title: 'TheTidbit — Handmade Jute Bags | Sustainable Indian Fashion',
  description:
    'Shop handmade jute bags from TheTidbit. Eco-friendly, stylish and affordable — designed for everyday Indian women. Free shipping over ₹499. COD available.',
  path: '/',
  image: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1768458165/2_txnnxs.png',
});

export default function Page() {
  return <HomePage />;
}
