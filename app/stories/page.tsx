import StoriesPage from '../../components/StoriesPage';
import { buildMetadata } from '../../lib/seo';
import { STORIES_META } from '../../lib/seo-content';

export const metadata = buildMetadata({
  title: STORIES_META.title,
  description: STORIES_META.description,
  path: '/stories',
  type: 'article',
  image:
    'https://res.cloudinary.com/thetidbit23024/image/upload/v1784376383/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/blog_mivwlc.png',
  keywords: [
    'handmade bags guide',
    'jute bags',
    'sustainable fashion India',
    'eco friendly handbags',
  ],
});

export default function Page() {
  return <StoriesPage />;
}
