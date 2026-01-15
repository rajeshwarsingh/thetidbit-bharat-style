import React from 'react';
import { Star } from 'lucide-react';
import { REVIEWS } from '../constants';

const Reviews: React.FC = () => {
  return (
    <div id="reviews" className="bg-white dark:bg-stone-950 py-16 sm:py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif font-bold text-center text-stone-900 dark:text-stone-100 mb-12">
          Loved by <span className="text-brand-green dark:text-brand-green/80 italic">Desi Girls</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-stone-50 dark:bg-stone-800/50 dark:backdrop-blur-sm rounded-2xl p-8 shadow-sm dark:shadow-stone-900/50 hover:shadow-md dark:hover:shadow-stone-900/70 transition">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={`${i < review.rating ? 'text-yellow-400 dark:text-yellow-500 fill-current' : 'text-stone-300 dark:text-stone-600'}`} 
                  />
                ))}
              </div>
              <p className="text-stone-700 dark:text-stone-300 italic mb-6">"{review.text}"</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 dark:text-stone-100">{review.author}</span>
                <span className="text-xs text-stone-400 dark:text-stone-500">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;