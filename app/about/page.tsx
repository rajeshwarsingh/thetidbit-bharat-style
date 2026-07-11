import AboutPage from '../../components/AboutPage';
import { buildMetadata } from '../../lib/seo';

export const metadata = buildMetadata({
  title: 'About TheTidbit — Our Story',
  description:
    'TheTidbit crafts premium, sustainable handmade jute bags in India. Learn about our mission, artisans and commitment to affordable luxury.',
  path: '/about',
});

export default function Page() {
  return <AboutPage />;
}
