import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Heart, ArrowRight } from 'lucide-react';
import SEO from './SEO';
import { stories } from '../data/stories';
import { cloudinaryTransform, cloudinarySrcSet } from '../utils/cloudinary';
import { LOGO_URL } from '../constants';

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
    "@type": "Article",
    "headline": story.title,
    "description": story.excerpt,
    "image": {
      "@type": "ImageObject",
      "url": story.heroImage,
      "width": 1600,
      "height": 900
    },
    "author": {
      "@type": "Organization",
      "name": story.author.name,
      "url": "https://bharat.style"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TheTidbit",
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
      "@id": `https://bharat.style/stories/${story.slug}`
    }
  };

  const handleShopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Find related stories (excluding current story)
  const getRelatedStories = () => {
    const related = stories.filter(s => s.id !== story.id);
    // Return 2-3 related stories
    return related.slice(0, 3);
  };

  const relatedStories = getRelatedStories();

  // Use optimized image for social sharing (1200x630 for OG/Twitter)
  const socialImage = cloudinaryTransform(story.heroImage, { w: 1200 });

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={story.title}
        description={story.excerpt}
        canonicalUrl={`https://bharat.style/stories/${story.slug}`}
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
          fetchpriority="high"
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
          <div className="space-y-6 text-xl leading-relaxed text-stone-700 font-sans">
            {story.content.map((paragraph, index) => {
              // Check if we should insert a lifestyle image after this paragraph
              const lifestyleImage = story.lifestyleImages?.find(
                img => img.insertAfterParagraph === index
              );

              return (
                <React.Fragment key={index}>
                  <p className="mb-6">
                    {paragraph}
                  </p>
                  {lifestyleImage && (
                    <figure className="my-12">
                      <img
                        src={cloudinaryTransform(lifestyleImage.url, { w: 1200 })}
                        srcSet={cloudinarySrcSet(lifestyleImage.url, [800, 1200, 1600])}
                        sizes="(min-width: 768px) 100vw, 100vw"
                        alt={lifestyleImage.alt}
                        className="w-full rounded-2xl"
                        loading="lazy"
                        decoding="async"
                        width="1200"
                        height="675"
                      />
                    </figure>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Soft Product Reference CTA - Editorial, non-commercial */}
          <div className="mt-20 pt-12 border-t border-stone-200">
            <div className="bg-stone-50 rounded-2xl p-10 text-center border border-stone-100">
              <Heart className="w-10 h-10 text-stone-400 mx-auto mb-5" />
              <p className="text-lg text-stone-600 mb-6 leading-relaxed max-w-xl mx-auto">
                Love the story? Explore the collection of handmade jute bags, each crafted with the same care and intention.
              </p>
              <button
                onClick={handleShopClick}
                className="inline-block bg-stone-900 text-white px-10 py-4 rounded-xl font-semibold hover:bg-stone-800 transition text-base"
              >
                Discover the Collection
              </button>
            </div>
          </div>

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
                    to={`/stories/${relatedStory.slug}`}
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
                to="/"
                className="text-stone-600 hover:text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-600 transition"
              >
                Home
              </Link>
            </div>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default StoryDetailPage;
