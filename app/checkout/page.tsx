import { Suspense } from 'react';
import CheckoutPage from '../../components/CheckoutPage';
import { buildMetadata } from '../../lib/seo';

export const metadata = buildMetadata({
  title: 'Checkout',
  description: 'Complete your TheTidbit order.',
  path: '/checkout',
  noindex: true,
});

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CheckoutPage />
    </Suspense>
  );
}
