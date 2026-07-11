import { Suspense } from 'react';
import TrackPage from '../../components/TrackPage';
import { buildMetadata } from '../../lib/seo';

export const metadata = buildMetadata({
  title: 'Track Your Order',
  description: 'Track your TheTidbit order status and delivery updates.',
  path: '/track',
  noindex: true,
});

export default function Page() {
  return (
    <Suspense fallback={null}>
      <TrackPage />
    </Suspense>
  );
}
