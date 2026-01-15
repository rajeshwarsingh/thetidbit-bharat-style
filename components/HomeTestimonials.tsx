import React from 'react';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '../constants';

const HomeTestimonials: React.FC = () => {
  // Show first 3 reviews for homepage
  const featuredReviews = REVIEWS.slice(0, 3);

  return (
    <section className="py-16 bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-brand-green dark:text-brand-green/80 mb-4">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-sm font-semibold">4.8/5 Rating</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Loved by <span className="text-brand-green dark:text-brand-green/80">1000+</span> Customers
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            See what our customers are saying about their handmade jute bags
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-stone-800 rounded-2xl p-6 md:p-8 shadow-md dark:shadow-stone-900/50 hover:shadow-xl dark:hover:shadow-stone-900/70 transition-all border border-stone-100 dark:border-stone-700 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-brand-green/10 dark:text-brand-green/20">
                <Quote className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < review.rating
                        ? 'text-yellow-400 dark:text-yellow-500 fill-current'
                        : 'text-stone-300 dark:text-stone-600'
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-stone-700 dark:text-stone-300 mb-6 leading-relaxed relative z-10">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-700">
                <div>
                  <p className="font-bold text-stone-900 dark:text-stone-100">{review.author}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Verified Purchase</p>
                </div>
                <span className="text-xs text-stone-400 dark:text-stone-500">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-12 border-t border-stone-200 dark:border-stone-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">1000+</div>
              <div className="text-sm text-stone-600 dark:text-stone-400">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">4.8★</div>
              <div className="text-sm text-stone-600 dark:text-stone-400">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">98%</div>
              <div className="text-sm text-stone-600 dark:text-stone-400">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">5000+</div>
              <div className="text-sm text-stone-600 dark:text-stone-400">Bags Sold</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonials;
