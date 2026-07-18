import ReviewsPage from '../../components/ReviewsPage';
import { buildMetadata } from '../../lib/seo';
import { REVIEWS_META } from '../../lib/seo-content';

export const metadata = buildMetadata({
  title: REVIEWS_META.title,
  description: REVIEWS_META.description,
  path: '/reviews',
  keywords: [
    'TheTidbit reviews',
    'handmade jute bag reviews',
    'customer reviews India',
    'Amazon TheTidbit reviews',
  ],
});

export default function Page() {
  return <ReviewsPage />;
}
