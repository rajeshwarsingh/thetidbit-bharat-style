import { redirect } from 'next/navigation';
import { stories } from '../../../data/stories';

/** Legacy /blog/[slug] → matching story when possible. */
export default async function BlogSlugRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const match = stories.find((s) => s.slug === slug);
  redirect(match ? `/stories/${match.slug}` : '/stories');
}
