import HomeOnePage from '../../components/HomeOnePage';
import { buildMetadata } from '../../lib/seo';

export const metadata = buildMetadata({
  title: 'The Brand',
  description: 'Discover the TheTidbit brand — premium handmade jute bags for everyday elegance.',
  path: '/home-one',
});

export default function Page() {
  return <HomeOnePage />;
}
