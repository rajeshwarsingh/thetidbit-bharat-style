'use client';
import React from 'react';
import { PRODUCT, WHATSAPP_NUMBER } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import { cloudinarySrcSet, cloudinaryTransform } from '../utils/cloudinary';
import { ProductDetails } from '../types';

interface ColorPaletteProps {
  product?: ProductDetails;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ product = PRODUCT }) => {
  const handleBuy = (colorName: string) => {
    const message = `Hi TheTidbit, I love the ${product.name} in ${colorName}. I would like to place an order.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="collection" className="bg-white dark:bg-stone-950 py-16 sm:py-24 border-t border-stone-100 dark:border-stone-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-brand-green dark:text-brand-green/80 font-bold text-sm tracking-wider uppercase">The Collection</span>
          <h2 className="mt-2 text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 sm:text-4xl">
            Find Your Shade
          </h2>
          <p className="mt-4 text-stone-500 dark:text-stone-400 max-w-2xl mx-auto text-lg">
            Each color tells a different story. Choose the one that resonates with your vibe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {product.colors.map((color) => (
            <div key={color.id} className="group relative cursor-pointer" onClick={() => handleBuy(color.name)}>
              <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-800 relative shadow-sm dark:shadow-stone-900/50 transition-all duration-500 group-hover:shadow-xl dark:group-hover:shadow-stone-900/70">
                {/* Main Image (Model) */}
                <img
                  src={cloudinaryTransform(color.images[0], { w: 900 })}
                  srcSet={cloudinarySrcSet(color.images[0], [400, 600, 800, 900])}
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                  alt={`${product.name} in ${color.name}`}
                  className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-110"
                  loading="lazy"
                  width="600"
                  height="800"
                  decoding="async"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                   <h3 className="text-xl font-serif font-bold text-white mb-1">
                     {color.name}
                   </h3>
                   <div className="flex items-center justify-between">
                      <p className="text-stone-200 font-medium">
                        <span className="text-xs opacity-80">Only</span> ₹{product.price}
                      </p>
                      <button
                        className="bg-white/20 backdrop-blur-md text-white border border-white/30 p-2 rounded-full hover:bg-white hover:text-stone-900 transition-colors"
                        aria-label={`Shop ${color.name}`}
                      >
                        <ArrowUpRight size={18} />
                      </button>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ColorPalette;