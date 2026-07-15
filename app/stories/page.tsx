import StoriesPage from '../../components/StoriesPage';
import { buildMetadata } from '../../lib/seo';
import { STORIES_META } from '../../lib/seo-content';

export const metadata = buildMetadata({
  title: STORIES_META.title,
  description: STORIES_META.description,
  path: '/stories',
  type: 'article',
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
