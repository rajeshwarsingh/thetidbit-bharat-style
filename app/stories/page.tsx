import StoriesPage from '../../components/StoriesPage';
import { buildMetadata } from '../../lib/seo';

export const metadata = buildMetadata({
  title: 'Stories',
  description: 'Read the latest stories and style notes from TheTidbit.',
  path: '/stories',
  type: 'article',
});

export default function Page() {
  return <StoriesPage />;
}
