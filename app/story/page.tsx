import BlogPage from '../../components/BlogPage';
import { buildMetadata } from '../../lib/seo';

export const metadata = buildMetadata({
  title: 'The Journal — Stories & Style',
  description: 'Styling tips, sustainability and stories from TheTidbit.',
  path: '/story',
  type: 'article',
});

export default function Page() {
  return <BlogPage />;
}
