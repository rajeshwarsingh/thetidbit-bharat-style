import BulkOrdersPage from '../../components/BulkOrdersPage';
import { buildMetadata } from '../../lib/seo';
import { BULK_META } from '../../lib/seo-content';

export const metadata = buildMetadata({
  title: BULK_META.title,
  description: BULK_META.description,
  path: '/bulk',
  keywords: [
    'eco friendly corporate gifting bangalore',
    'custom bulk jute bags karnataka',
    'corporate gifting',
    'bulk handmade bags',
    'custom jute bags India',
  ],
});

export default function Page() {
  return <BulkOrdersPage />;
}
