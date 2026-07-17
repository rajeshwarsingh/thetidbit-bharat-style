import HomePage from '../../components/HomePage';
import { buildMetadata } from '../../lib/seo';
import { HOME_META } from '../../lib/seo-content';

export const metadata = buildMetadata({
  title: HOME_META.title,
  description: HOME_META.description,
  path: '/classic',
  image: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1768458165/2_txnnxs.png',
  noindex: true,
});

/** Legacy homepage (previous `/`). Kept for comparison; Smart is now `/`. */
export default function Page() {
  return <HomePage />;
}
