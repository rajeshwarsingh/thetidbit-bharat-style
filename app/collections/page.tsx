import { Suspense } from 'react';
import CollectionsPage from '../../components/CollectionsPage';
import { buildMetadata } from '../../lib/seo';
import { COLLECTIONS_META } from '../../lib/seo-content';

export const metadata = buildMetadata({
  title: COLLECTIONS_META.title,
  description: COLLECTIONS_META.description,
  path: '/collections',
  keywords: [
    'handmade bags online',
    'jute sling bags',
    'office bags for women',
    'college bags for women',
    'gift handbags',
  ],
});

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CollectionsPage />
    </Suspense>
  );
}
