import AboutPage from '../../components/AboutPage';
import { buildMetadata } from '../../lib/seo';
import { ABOUT_META } from '../../lib/seo-content';

export const metadata = buildMetadata({
  title: ABOUT_META.title,
  description: ABOUT_META.description,
  path: '/about',
  keywords: ['TheTidbit', 'handmade bags manufacturer', 'made in India handbags'],
});

export default function Page() {
  return <AboutPage />;
}
