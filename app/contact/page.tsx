import ContactPage from '../../components/ContactPage';
import { buildMetadata } from '../../lib/seo';

export const metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with TheTidbit for orders, bulk enquiries and support. Reach us on WhatsApp, phone or email — we usually reply within a few hours.',
  path: '/contact',
});

export default function Page() {
  return <ContactPage />;
}
