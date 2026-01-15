import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { ProductDetails } from '../types';
import { cloudinaryTransform, cloudinarySrcSet } from '../utils/cloudinary';

interface ProductCardProps {
  product: ProductDetails;
  showTag?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showTag = false }) => {
  const primaryImage = product.colors[0]?.images[0] || product.colors[0]?.images[1] || '';
  const discountPercentage = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block bg-white dark:bg-stone-800 rounded-2xl overflow-hidden shadow-md dark:shadow-stone-900/50 hover:shadow-xl dark:hover:shadow-stone-900/70 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-stone-100 dark:bg-stone-900">
        <img
          src={cloudinaryTransform(primaryImage, { w: 600 })}
          srcSet={cloudinarySrcSet(primaryImage, [400, 600, 800])}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Category Tag */}
        {showTag && product.category.length > 0 && (
          <div className="absolute top-3 right-3 bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm text-stone-900 dark:text-stone-100 text-xs font-semibold px-2 py-1 rounded-full">
            {product.category[product.category.length - 1]}
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-black/10 transition-colors" />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 mb-1 line-clamp-2 group-hover:text-brand-green dark:group-hover:text-brand-green/80 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-3 line-clamp-1">
          {product.tagline}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center text-yellow-500">
            {[0, 1, 2, 3, 4].map((rating) => (
              <Star key={rating} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400">4.8</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
            ₹{product.price}
          </span>
          {product.mrp > product.price && (
            <span className="text-sm text-stone-500 dark:text-stone-400 line-through">
              ₹{product.mrp}
            </span>
          )}
        </div>

        {/* Color Variants */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-stone-500 dark:text-stone-400">Colors:</span>
          <div className="flex gap-1.5">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.id}
                className="w-5 h-5 rounded-full border border-stone-200 dark:border-stone-700"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <div className="w-5 h-5 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                <span className="text-[8px] text-stone-600 dark:text-stone-400 font-bold">
                  +{product.colors.length - 4}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={(e) => e.preventDefault()}
          className="w-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 py-2.5 px-4 rounded-xl font-bold text-sm hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag size={16} />
          View Details
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
