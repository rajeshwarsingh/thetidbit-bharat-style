import { Suspense } from 'react';
import MockPayPage from '../../../components/MockPayPage';
import { buildMetadata } from '../../../lib/seo';

export const metadata = buildMetadata({
  title: 'Payment',
  description: 'Complete your payment.',
  path: '/order/pay',
  noindex: true,
});

export default function Page() {
  return (
    <Suspense fallback={null}>
      <MockPayPage />
    </Suspense>
  );
}
