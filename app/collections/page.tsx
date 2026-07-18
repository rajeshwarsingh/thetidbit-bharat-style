import { Suspense } from 'react';
import CollectionsPage from '../../components/CollectionsPage';
import { buildMetadata } from '../../lib/seo';
import { COLLECTIONS_META } from '../../lib/seo-content';

export const metadata = buildMetadata({
  title: COLLECTIONS_META.title,
  description: COLLECTIONS_META.description,
  path: '/collections',
  keywords: [
    'handmade jute sling bag',
    'aesthetic office tote bags delhi',
    'college bags for girls ncr',
    'jute tote bags pune',
    'trendy college tote bags lucknow',
    'handwoven evil eye sling bag',
  ],
});

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CollectionsPage />
    </Suspense>
  );
}
