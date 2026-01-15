import React, { useEffect } from 'react';
import { ArrowLeft, Quote, HeartHandshake, Sprout, Hammer } from 'lucide-react';
import { ARTISAN_STORY_IMAGE, ARTISAN_SPOTLIGHT_IMAGE, LOGO_URL } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import SEO from './SEO';
import { cloudinarySrcSet, cloudinaryTransform } from '../utils/cloudinary';

const BlogPage: React.FC = () => {
  const navigate = useNavigate();

  // Scroll to top handled by ScrollToTop in App.tsx

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Threads of Tradition: The Story Behind Every Stitch",
    "image": [ARTISAN_STORY_IMAGE],
    "author": {
      "@type": "Organization",
      "name": "TheTidbit"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TheTidbit",
      "logo": {
        "@type": "ImageObject",
        "url": LOGO_URL
      }
    },
    "datePublished": "2026-01-01",
    "description": "Learn about the skilled artisans from West Bengal who handcraft our jute bags, preserving traditional techniques and earning fair wages."
  };

  const handleShopNow = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
       document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen pb-16 transition-colors duration-300">
      <SEO 
        title="Our Story - Threads of Tradition"
        description="The heartwarming story of the artisans behind TheTidbit. How we source ethically and empower women weavers in West Bengal."
        canonicalUrl="https://bharat.style/story"
        type="article"
        image={ARTISAN_STORY_IMAGE}
        schema={articleSchema}
      />
      {/* Header Image */}
      <div className="relative h-[40vh] sm:h-[50vh] w-full overflow-hidden">
        <img 
          src={cloudinaryTransform(ARTISAN_STORY_IMAGE, { w: 1600 })}
          srcSet={cloudinarySrcSet(ARTISAN_STORY_IMAGE, [768, 1200, 1600, 1920])}
          sizes="100vw"
          alt="Artisan hands working" 
          className="w-full h-full object-cover"
          width="1920"
          height="1080"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4">
              Threads of Tradition
            </h1>
            <p className="text-lg text-stone-200 dark:text-stone-300 font-medium tracking-wide">
              The Story Behind Every Stitch
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white dark:bg-stone-800/50 dark:backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl dark:shadow-stone-900/50 transition-colors duration-300">
          
          <Link 
            to="/"
            className="group flex items-center text-stone-500 dark:text-stone-400 hover:text-brand-green dark:hover:text-brand-green mb-8 transition w-fit"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </Link>

          <div className="space-y-6 text-lg leading-relaxed">
            <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
              The Hands That Weave Magic
            </h2>
            <p className="text-stone-700 dark:text-stone-200">
              In a small, sun-drenched village in West Bengal, the rhythmic clatter of handlooms is the music of daily life. This is where <strong className="text-stone-900 dark:text-stone-100 font-semibold">TheTidbit</strong> was born—not in a corporate boardroom, but on the mud porch of Lakshmi Devi's home.
            </p>
            <p className="text-stone-700 dark:text-stone-200">
              Jute, known as the "Golden Fiber," has been the lifeline of this region for centuries. However, with the rise of fast fashion and plastic, the traditional art of jute weaving began to fade. Artisans like Lakshmi found themselves with incredible skills but no market.
            </p>

            <div className="my-12 bg-stone-50 dark:bg-stone-800/50 p-6 sm:p-10 rounded-2xl border-l-4 border-brand-green dark:border-brand-green/80 flex gap-6 flex-col sm:flex-row items-center">
               <img 
                 src={cloudinaryTransform(ARTISAN_SPOTLIGHT_IMAGE, { w: 256 })}
                 srcSet={cloudinarySrcSet(ARTISAN_SPOTLIGHT_IMAGE, [128, 192, 256, 384])}
                 sizes="(min-width: 640px) 128px, 96px"
                 alt="Lakshmi Devi" 
                 className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-md border-2 border-white dark:border-stone-800"
                 loading="lazy"
                 width="128"
                 height="128"
                 decoding="async"
               />
               <div>
                 <Quote className="text-brand-green dark:text-brand-green/80 mb-2 opacity-50" size={32} />
                 <p className="text-xl font-serif font-medium text-stone-800 dark:text-stone-200 italic">
                   "When you buy a bag, you are not just buying an object. You are buying hundreds of hours of failures and experimentation. You are buying days, weeks, and months of frustration and pure joy. You are buying a piece of a heart, a part of a soul."
                 </p>
                 <p className="mt-4 font-bold text-stone-900 dark:text-stone-100">— Lakshmi Devi, Master Artisan</p>
               </div>
            </div>

            <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mt-10">
              From Fiber to Fashion
            </h3>
            <p className="text-stone-700 dark:text-stone-200">
              The journey of your bag begins in the jute fields. The plants are harvested, retted in water, and stripped of their golden fibers. These fibers are then spun into strong, durable yarn.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10">
              <div className="bg-stone-50 dark:bg-stone-800/50 p-6 rounded-xl text-center">
                <div className="mx-auto w-12 h-12 bg-jute-200 dark:bg-jute-800 rounded-full flex items-center justify-center text-stone-800 dark:text-stone-200 mb-4">
                  <Sprout size={24} />
                </div>
                <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-2">1. Sourcing</h4>
                <p className="text-sm text-stone-600 dark:text-stone-400">Raw jute is sourced ethically from local farmers, ensuring fair prices.</p>
              </div>
              <div className="bg-stone-50 dark:bg-stone-800/50 p-6 rounded-xl text-center">
                <div className="mx-auto w-12 h-12 bg-jute-200 dark:bg-jute-800 rounded-full flex items-center justify-center text-stone-800 dark:text-stone-200 mb-4">
                  <Hammer size={24} />
                </div>
                <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-2">2. Crafting</h4>
                <p className="text-sm text-stone-600 dark:text-stone-400">The fabric is hand-woven and dyed using eco-friendly vegetable dyes.</p>
              </div>
              <div className="bg-stone-50 dark:bg-stone-800/50 p-6 rounded-xl text-center">
                <div className="mx-auto w-12 h-12 bg-jute-200 dark:bg-jute-800 rounded-full flex items-center justify-center text-stone-800 dark:text-stone-200 mb-4">
                  <HeartHandshake size={24} />
                </div>
                <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-2">3. Empowering</h4>
                <p className="text-sm text-stone-600 dark:text-stone-400">Earnings go directly to the artisan cooperative, funding education & healthcare.</p>
              </div>
            </div>

            <p className="text-stone-700 dark:text-stone-200">
              The intricate embroidery you see on the round sling bag is done entirely by hand. No machines, no automation. Just a needle, colorful cotton threads, and a steady hand. This ensures that <strong className="text-stone-900 dark:text-stone-100 font-semibold">no two bags are exactly alike</strong>. Your bag is as unique as your fingerprint.
            </p>

            <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mt-10">
              Why It Matters
            </h3>
            <p className="text-stone-700 dark:text-stone-200">
              By choosing TheTidbit, you are making a conscious choice. You are saying NO to mass-produced synthetic leather and plastic that clogs our oceans. You are saying YES to a product that returns to the earth gracefully when its life is over.
            </p>
            <p className="text-stone-700 dark:text-stone-200">
              We are proud to be a "Make in India" brand, bringing rural craftsmanship to the global stage. Thank you for being part of our story.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-700/50 text-center">
            <p className="text-stone-500 dark:text-stone-400 mb-6 italic">Ready to carry a piece of art?</p>
            <a 
              href="#collection"
              onClick={handleShopNow}
              className="inline-block bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-8 py-4 rounded-xl font-bold hover:bg-stone-800 dark:hover:bg-stone-200 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Shop the Collection
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BlogPage;