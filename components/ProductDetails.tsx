'use client';
import React, { useState } from 'react';
import { PRODUCT } from '../constants';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ProductDetails as ProductDetailsType } from '../types';

interface ProductDetailsProps {
  product?: ProductDetailsType;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product = PRODUCT }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-stone-50 dark:bg-stone-950 py-16 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white dark:bg-stone-800/50 dark:backdrop-blur-sm shadow-sm dark:shadow-stone-900/50 rounded-2xl overflow-hidden border border-stone-100 dark:border-stone-700/50 transition-colors duration-300">
          <div className="p-8">
             <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-6">Product Details</h3>
             
             <div className="prose prose-stone dark:prose-invert prose-lg text-stone-600 dark:text-stone-400">
                <p>
                  Elevate your everyday style with our <strong>{product.name}</strong>. 
                  Handcrafted by skilled artisans in India, this bag blends traditional embroidery with modern boho aesthetics.
                  The natural jute texture adds an earthy charm to any outfit, making it perfect for college, brunch, or a casual day out.
                </p>
                
                <div className={`mt-4 ${isExpanded ? '' : 'hidden'} transition-all duration-300`}>
                   <p>
                     Unlike synthetic bags, our jute bags are biodegradable and breathable. The inner cotton lining ensures your belongings are safe, 
                     while the sturdy zip closure keeps everything secure. The vibrant embroidery patterns are unique to each batch, giving you a truly one-of-a-kind accessory.
                   </p>
                   <ul className="list-disc pl-5 space-y-2 mt-4">
                     {product.features.map((f, i) => <li key={i}>{f}</li>)}
                   </ul>
                </div>

                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-4 flex items-center text-brand-green dark:text-brand-green/80 font-medium hover:text-green-800 dark:hover:text-green-600 focus:outline-none"
                >
                  {isExpanded ? (
                    <>Show Less <ChevronUp size={16} className="ml-1" /></>
                  ) : (
                    <>Read More <ChevronDown size={16} className="ml-1" /></>
                  )}
                </button>
             </div>
          </div>
          
          <div className="border-t border-stone-100 dark:border-stone-700/50 bg-stone-50/50 dark:bg-stone-800/30 p-8">
             <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4 font-serif">Specifications</h4>
             <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-stone-500 dark:text-stone-400">Material</dt>
                  <dd className="mt-1 text-sm text-stone-900 dark:text-stone-100">{product.material}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-stone-500 dark:text-stone-400">Dimensions</dt>
                  <dd className="mt-1 text-sm text-stone-900 dark:text-stone-100">{product.dimensions}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-stone-500 dark:text-stone-400">Weight</dt>
                  <dd className="mt-1 text-sm text-stone-900 dark:text-stone-100">{product.weight}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-stone-500 dark:text-stone-400">Country of Origin</dt>
                  <dd className="mt-1 text-sm text-stone-900 dark:text-stone-100">{product.origin}</dd>
                </div>
             </dl>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;