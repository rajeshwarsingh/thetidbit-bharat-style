import { Suspense } from 'react';
import OrderStatusPage from '../../../components/OrderStatusPage';
import { buildMetadata } from '../../../lib/seo';

export const metadata = buildMetadata({
  title: 'Order Status',
  description: 'Your TheTidbit order status.',
  path: '/order/status',
  noindex: true,
});

export default function Page() {
  return (
    <Suspense fallback={null}>
      <OrderStatusPage />
    </Suspense>
  );
}
