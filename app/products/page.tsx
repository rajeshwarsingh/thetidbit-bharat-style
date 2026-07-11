import { Suspense } from 'react';
import AllProductsPage from '../../components/AllProductsPage';
import { buildMetadata } from '../../lib/seo';

export const metadata = buildMetadata({
  title: 'All Products — Handmade Jute Bags',
  description: 'Explore every handmade jute bag from TheTidbit — slings, handbags, totes and more.',
  path: '/products',
});

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AllProductsPage />
    </Suspense>
  );
}
