'use client';
import React from 'react';
import { Link } from '@/lib/router';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import SEO from './SEO';
import { stories } from '../data/stories';
import { cloudinaryTransform, cloudinarySrcSet } from '../utils/cloudinary';

const StoriesPage: React.FC = () => {
  const featuredStory = stories.find(s => s.featured);
  const otherStories = stories.filter(s => !s.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen transition-colors duration-300">
      <SEO 
        title="Stories"
        description="Guides on handmade bags, jute handbags, eco-friendly fashion in India, styling tips and gift ideas from TheTidbit."
        canonicalUrl="https://thetidbit.in/stories"
        type="website"
        image={featuredStory?.heroImage || "https://res.cloudinary.com/thetidbit23024/image/upload/v1766842697/article%20jutes/jute1_hpbfrm.png"}
      />

      {/* Header */}
      <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-stone-100 mb-6 leading-tight">
              Stories &amp; buying guides
            </h1>
            <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Practical guides on handmade jute bags for women, eco-friendly handbags, styling sling bags, and shopping sustainable fashion in India — written for how people actually search and decide.
            </p>
            <nav className="text-sm flex flex-wrap gap-x-4 gap-y-2">
              <Link
                to="/collections"
                className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-600 hover:decoration-stone-600 dark:hover:decoration-stone-400 transition"
              >
                Shop handmade bags
              </Link>
              <Link
                to="/about"
                className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-600 hover:decoration-stone-600 dark:hover:decoration-stone-400 transition"
              >
                About TheTidbit
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Featured Story */}
        {featuredStory && (
          <div className="mb-16">
            <div className="inline-block mb-6">
              <span className="text-xs font-bold text-brand-green dark:text-brand-green/80 uppercase tracking-wider">
                Featured Story
              </span>
            </div>
            <Link 
              to={`/stories/${featuredStory.slug}`}
              className="group block bg-white dark:bg-stone-800/50 dark:backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg dark:shadow-stone-900/50 hover:shadow-xl dark:hover:shadow-stone-900/70 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden bg-stone-200 dark:bg-stone-800">
                  <img
                    src={cloudinaryTransform(featuredStory.heroImage, { w: 1200 })}
                    srcSet={cloudinarySrcSet(featuredStory.heroImage, [800, 1200, 1600])}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    alt={featuredStory.heroImageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-stone-500 dark:text-stone-400 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={16} />
                      <span>{formatDate(featuredStory.publishDate)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} />
                      <span>{featuredStory.readTime} min read</span>
                    </div>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4 group-hover:text-brand-green dark:group-hover:text-brand-green/80 transition-colors">
                    {featuredStory.title}
                  </h2>

                  <p className="text-lg text-stone-600 dark:text-stone-400 mb-6 leading-relaxed">
                    {featuredStory.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-green/10 dark:bg-brand-green/20 flex items-center justify-center">
                        <span className="text-brand-green dark:text-brand-green/80 font-bold text-sm">
                          {featuredStory.author.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                          {featuredStory.author.name}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          {featuredStory.author.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-brand-green dark:text-brand-green/80 font-semibold group-hover:gap-3 transition-all">
                      <span>Read more</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Other Stories Grid */}
        {otherStories.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-8">
              More Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherStories.map((story) => (
                <Link
                  key={story.id}
                  to={`/stories/${story.slug}`}
                  className="group block bg-white dark:bg-stone-800/50 dark:backdrop-blur-sm rounded-2xl overflow-hidden shadow-md dark:shadow-stone-900/50 hover:shadow-xl dark:hover:shadow-stone-900/70 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 dark:bg-stone-800">
                    <img
                      src={cloudinaryTransform(story.heroImage, { w: 800 })}
                      srcSet={cloudinarySrcSet(story.heroImage, [600, 800, 1000])}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      alt={story.heroImageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(story.publishDate)}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{story.readTime} min</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-3 group-hover:text-brand-green dark:group-hover:text-brand-green/80 transition-colors line-clamp-2">
                      {story.title}
                    </h3>

                    <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 leading-relaxed line-clamp-3">
                      {story.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-stone-700/50">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-brand-green/10 dark:bg-brand-green/20 flex items-center justify-center">
                          <span className="text-brand-green dark:text-brand-green/80 font-bold text-xs">
                            {story.author.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                          {story.author.name}
                        </span>
                      </div>

                      <ArrowRight 
                        size={18} 
                        className="text-stone-400 dark:text-stone-500 group-hover:text-brand-green dark:group-hover:text-brand-green/80 group-hover:translate-x-1 transition-all" 
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoriesPage;