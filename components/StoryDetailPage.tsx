'use client';
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from '@/lib/router';
import { ArrowLeft, Calendar, Clock, Heart, ArrowRight } from 'lucide-react';
import SEO from './SEO';
import BulkInquiryForm from './BulkInquiryForm';
import { stories, getStoryPath } from '../data/stories';
import { cloudinaryTransform, cloudinarySrcSet } from '../utils/cloudinary';
import { LOGO_URL } from '../constants';
import { SIGNATURE_PRODUCT_LINKS } from '../data/catalogs';

type ContentBlock =
  | { type: 'h2' | 'h3' | 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'image'; alt: string; url?: string };

/** Parse story.content (+ lifestyleImages) into semantic blocks. */
function parseStoryBlocks(
  content: string[],
  lifestyleImages?: { url: string; alt: string; insertAfterParagraph?: number }[]
): ContentBlock[] {
  const lines: string[] = [];
  content.forEach((paragraph, index) => {
    lines.push(paragraph);
    const lifestyle = lifestyleImages?.find((img) => img.insertAfterParagraph === index);
    if (lifestyle) {
      lines.push(`[[image:${lifestyle.alt}|${lifestyle.url}]]`);
    }
  });

  const blocks: ContentBlock[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.slice(4).trim() });
      i += 1;
    } else if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3).trim() });
      i += 1;
    } else if (line.startsWith('[[image:') && line.endsWith(']]')) {
      const inner = line.slice(8, -2);
      const pipe = inner.indexOf('|');
      if (pipe === -1) {
        blocks.push({ type: 'image', alt: inner.trim() });
      } else {
        blocks.push({
          type: 'image',
          alt: inner.slice(0, pipe).trim(),
          url: inner.slice(pipe + 1).trim() || undefined,
        });
      }
      i += 1;
    } else if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2));
        i += 1;
      }
      blocks.push({ type: 'ul', items });
    } else {
      blocks.push({ type: 'p', text: line });
      i += 1;
    }
  }
  return blocks;
}

const StoryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const story = stories.find(s => s.slug === slug);

  useEffect(() => {
    if (!story && slug) {
      navigate('/stories', { replace: true });
    }
  }, [story, slug, navigate]);

  if (!story) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Enhanced Article Schema with ImageObject
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": ["Article", "BlogPosting"],
    "headline": story.title,
    "description": story.excerpt,
    "articleSection": "Stories",
    "inLanguage": "en-IN",
    "wordCount": story.content.join(' ').split(/\s+/).length,
    "image": {
      "@type": "ImageObject",
      "url": story.heroImage,
      "width": 1600,
      "height": 900
    },
    "author": {
      "@type": "Person",
      "name": story.author.name,
      "jobTitle": story.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "TheTidbit",
      "url": "https://thetidbit.in",
      "logo": {
        "@type": "ImageObject",
        "url": LOGO_URL,
        "width": 400,
        "height": 200
      }
    },
    "datePublished": story.publishDate,
    "dateModified": story.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://thetidbit.in${getStoryPath(story)}`
    }
  };

  // Find related stories (excluding current story)
  const getRelatedStories = () => {
    const related = stories.filter(s => s.id !== story.id);
    return related.slice(0, 3);
  };

  const relatedStories = getRelatedStories();
  const relatedProducts = SIGNATURE_PRODUCT_LINKS.slice(0, 4);
  const storyPath = getStoryPath(story);
  const contentBlocks = parseStoryBlocks(story.content, story.lifestyleImages);
  const ctaHref = story.ctaHref || '/collections';

  // Use optimized image for social sharing (1200x630 for OG/Twitter)
  const socialImage = cloudinaryTransform(story.heroImage, { w: 1200 });

  /** Support **bold** → <strong> inside story paragraphs. */
  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={story.title}
        description={story.excerpt}
        canonicalUrl={`https://thetidbit.in${storyPath}`}
        type="article"
        image={socialImage}
        schema={articleSchema}
      />

      {/* Hero Image - 16:9 aspect ratio, min 1200px width, no text overlay */}
      <div className="relative w-full aspect-video overflow-hidden bg-stone-50">
        <img
          src={cloudinaryTransform(story.heroImage, { w: 1600 })}
          srcSet={cloudinarySrcSet(story.heroImage, [1200, 1600, 1920, 2400])}
          sizes="100vw"
          alt={story.heroImageAlt}
          className="w-full h-full object-cover"
          width="1600"
          height="900"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Article Content - Clean white/beige background, editorial layout */}
      <article className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          
          {/* Back Button - Below the image */}
          <div className="mb-8">
            <Link
              to="/stories"
              className="group inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors font-medium"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Back to Stories</span>
            </Link>
          </div>
          
          {/* Article Header */}
          <header className="mb-12">
            {/* Metadata */}
            <div className="flex items-center gap-4 text-sm text-stone-500 mb-6">
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <time dateTime={story.publishDate}>{formatDate(story.publishDate)}</time>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                <span>{story.readTime} min read</span>
              </div>
            </div>

            {/* H1 - Large, readable, editorial */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-900 mb-8 leading-[1.1] tracking-tight">
              {story.title}
            </h1>

            {/* Author Section */}
            <div className="flex items-center gap-4 pt-6 border-t border-stone-200">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
                <span className="text-stone-600 font-semibold text-lg">
                  {story.author.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-stone-900 text-base">
                  {story.author.name}
                </p>
                <p className="text-sm text-stone-500">
                  {story.author.role}
                </p>
              </div>
            </div>
          </header>

          {/* Article Body - Large, readable fonts, editorial spacing */}
          <div className="space-y-2 text-lg sm:text-xl leading-relaxed text-stone-700 font-sans">
            {contentBlocks.map((block, index) => {
              if (block.type === 'h2') {
                return (
                  <h2
                    key={index}
                    className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-10 mb-4 leading-snug"
                  >
                    {renderInline(block.text)}
                  </h2>
                );
              }
              if (block.type === 'h3') {
                return (
                  <h3
                    key={index}
                    className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-8 mb-3 leading-snug"
                  >
                    {renderInline(block.text)}
                  </h3>
                );
              }
              if (block.type === 'ul') {
                return (
                  <ul key={index} className="mb-6 list-disc space-y-3 pl-6 marker:text-brand-green">
                    {block.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="leading-relaxed pl-1">
                        {renderInline(item)}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === 'image') {
                if (block.url) {
                  return (
                    <figure key={index} className="my-10 sm:my-12">
                      <img
                        src={cloudinaryTransform(block.url, { w: 1200 })}
                        srcSet={cloudinarySrcSet(block.url, [800, 1200, 1600])}
                        sizes="(min-width: 768px) 768px, 100vw"
                        alt={block.alt}
                        className="w-full rounded-2xl"
                        loading="lazy"
                        decoding="async"
                        width="1200"
                        height="675"
                      />
                      <figcaption className="mt-3 text-center text-sm text-stone-500 leading-relaxed">
                        {block.alt}
                      </figcaption>
                    </figure>
                  );
                }
                return (
                  <figure key={index} className="my-10 sm:my-12">
                    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-dashed border-stone-300 bg-stone-100">
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'%3E%3Crect fill='%23f5f5f4' width='100%25' height='100%25'/%3E%3C/svg%3E"
                        alt={block.alt}
                        className="h-full w-full object-cover"
                        width="1600"
                        height="900"
                        data-image-placeholder="true"
                      />
                    </div>
                    <figcaption className="mt-3 text-center text-sm text-stone-500 leading-relaxed">
                      {block.alt} — drop in product photo here
                    </figcaption>
                  </figure>
                );
              }
              return (
                <p key={index} className="mb-6 leading-relaxed">
                  {renderInline(block.text)}
                </p>
              );
            })}
          </div>

          {/* Soft Product Reference CTA - Editorial, non-commercial */}
          <div className="mt-20 pt-12 border-t border-stone-200">
            <div className="bg-stone-50 rounded-2xl p-10 text-center sm:text-left border border-stone-100">
              <Heart className="w-10 h-10 text-stone-400 mx-auto sm:mx-0 mb-5" />
              <p className="text-lg text-stone-600 mb-6 leading-relaxed max-w-xl mx-auto sm:mx-0">
                {story.showBulkInquiryForm
                  ? 'Ready to elevate your corporate gifting strategy? Request a custom quote — we’ll reply with a digital catalog within 24 hours.'
                  : 'Love the story? Explore TheTidbit’s signature handmade jute bags — each crafted with the same care.'}
              </p>
              {!story.showBulkInquiryForm && (
                <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-6">
                  {relatedProducts.map((p) => (
                    <Link
                      key={p.id}
                      to={p.href}
                      className="text-sm font-semibold text-brand-green underline underline-offset-2 hover:text-stone-900"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
              <div className="flex justify-center sm:justify-start">
                {ctaHref.startsWith('#') ? (
                  <a
                    href={ctaHref}
                    onClick={() => {
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'story_cta_click', {
                          placement: 'story_detail_anchor',
                          slug: story.slug,
                        });
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-brand-green transition-colors text-base text-center max-w-md"
                  >
                    {story.ctaLabel || 'Shop the collection'} <ArrowRight size={18} className="shrink-0" />
                  </a>
                ) : (
                  <Link
                    to={ctaHref}
                    onClick={() => {
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'story_cta_click', {
                          placement: 'story_detail_collection',
                          slug: story.slug,
                        });
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-brand-green transition-colors text-base text-center max-w-md"
                  >
                    {story.ctaLabel || 'Shop the collection'} <ArrowRight size={18} className="shrink-0" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {story.showBulkInquiryForm && (
            <div className="mt-12">
              <BulkInquiryForm placement={`story-${story.slug}`} />
            </div>
          )}

          {/* Related Stories Section */}
          {relatedStories.length > 0 && (
            <section className="mt-20 pt-12 border-t border-stone-200">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-8">
                More Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedStories.map((relatedStory) => (
                  <Link
                    key={relatedStory.id}
                    to={getStoryPath(relatedStory)}
                    className="group block"
                  >
                    <div className="bg-stone-50 rounded-xl overflow-hidden hover:shadow-md transition-all">
                      <div className="aspect-video overflow-hidden bg-stone-200">
                        <img
                          src={cloudinaryTransform(relatedStory.heroImage, { w: 600 })}
                          srcSet={cloudinarySrcSet(relatedStory.heroImage, [400, 600, 800])}
                          sizes="(min-width: 768px) 33vw, 100vw"
                          alt={relatedStory.heroImageAlt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-serif text-lg font-bold text-stone-900 mb-2 group-hover:text-stone-700 transition-colors line-clamp-2">
                          {relatedStory.title}
                        </h3>
                        <p className="text-sm text-stone-600 mb-3 line-clamp-2">
                          {relatedStory.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-stone-500">
                          <Clock size={14} />
                          <span>{relatedStory.readTime} min read</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Link
                  to="/stories"
                  className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 transition font-medium"
                >
                  <span>View all stories</span>
                  <ArrowLeft size={18} className="rotate-180" />
                </Link>
              </div>
            </section>
          )}

          {/* Soft Links to Other Sections */}
          <nav className="mt-16 pt-12 border-t border-stone-200" aria-label="Related pages">
            <div className="flex flex-wrap gap-4 text-sm">
              <Link
                to="/collections"
                className="text-stone-600 hover:text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-600 transition"
              >
                Shop handmade bags
              </Link>
              <span className="text-stone-300">•</span>
              <Link
                to="/about"
                className="text-stone-600 hover:text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-600 transition"
              >
                Our Story
              </Link>
              <span className="text-stone-300">•</span>
              <Link
                to="/stories"
                className="text-stone-600 hover:text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-600 transition"
              >
                All Stories
              </Link>
              <span className="text-stone-300">•</span>
              <Link
                to="/bulk"
                className="text-stone-600 hover:text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-600 transition"
              >
                Corporate gifting
              </Link>
            </div>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default StoryDetailPage;