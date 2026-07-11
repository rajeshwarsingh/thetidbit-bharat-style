import BulkOrdersPage from '../../components/BulkOrdersPage';
import { buildMetadata } from '../../lib/seo';

export const metadata = buildMetadata({
  title: 'Bulk & Corporate Orders — Custom Jute Bags',
  description:
    'Order handmade jute bags in bulk for corporate gifting, weddings and resellers. Custom branding, competitive wholesale pricing and reliable lead times. Request a quote.',
  path: '/bulk',
});

export default function Page() {
  return <BulkOrdersPage />;
}
