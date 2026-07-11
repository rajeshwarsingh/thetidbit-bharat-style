import AdminTrackingGate from '../../../components/AdminTrackingGate';
import { buildMetadata } from '../../../lib/seo';

export const metadata = buildMetadata({
  title: 'Ops Tracking',
  description: 'Internal tracking.',
  path: '/ops/tracking',
  noindex: true,
});

export default function Page() {
  return <AdminTrackingGate />;
}
