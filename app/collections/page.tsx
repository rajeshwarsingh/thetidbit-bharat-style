import { Suspense } from 'react';
import CollectionsPage from '../../components/CollectionsPage';
import { buildMetadata } from '../../lib/seo';

export const metadata = buildMetadata({
  title: 'Collections — Signature & Made-on-Demand Bags',
  description:
    "Browse TheTidbit's full range of handmade jute bags. Shop the ready-to-ship Signature Collection or request a quote for made-on-demand, bulk and corporate orders.",
  path: '/collections',
});

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CollectionsPage />
    </Suspense>
  );
}
