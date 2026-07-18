import { Suspense } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import StoryDetailPage from '../../../components/StoryDetailPage';
import { buildMetadata } from '../../../lib/seo';
import { stories, getStoryPath } from '../../../data/stories';

export function generateStaticParams() {
  return stories
    .filter((s) => s.canonicalPath?.startsWith('/blog/'))
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) {
    return buildMetadata({
      title: 'Blog',
      description: 'TheTidbit stories and guides',
      path: `/blog/${slug}`,
      noindex: true,
    });
  }
  return buildMetadata({
    title: story.metaTitle || story.title,
    description: story.excerpt || story.title,
    path: getStoryPath(story),
    image: story.heroImage,
    type: 'article',
    keywords: story.keywords,
  });
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) {
    redirect('/stories');
  }
  // Only blog-canonical posts render under /blog; everything else goes to Stories.
  if (!story.canonicalPath?.startsWith('/blog/')) {
    redirect(getStoryPath(story));
  }

  return (
    <Suspense fallback={null}>
      <StoryDetailPage />
    </Suspense>
  );
}
