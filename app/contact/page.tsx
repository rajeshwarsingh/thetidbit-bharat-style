import ContactPage from '../../components/ContactPage';
import { buildMetadata } from '../../lib/seo';
import { CONTACT_META } from '../../lib/seo-content';

export const metadata = buildMetadata({
  title: CONTACT_META.title,
  description: CONTACT_META.description,
  path: '/contact',
  keywords: [
    'TheTidbit Ambernath',
    'handcrafted handbags maharashtra',
    'jute bags mumbai contact',
  ],
});

export default function Page() {
  return <ContactPage />;
}
