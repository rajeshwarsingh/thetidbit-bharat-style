import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Gift, Sparkles, ArrowRight, Star } from 'lucide-react';
import { PRODUCT, ALL_PRODUCTS } from '../constants';
import { cloudinaryTransform } from '../utils/cloudinary';

const GiftingSection: React.FC = () => {
  // Get a featured product for the gifting section
  const featuredGiftProduct = ALL_PRODUCTS.length > 0 ? ALL_PRODUCTS[0] : PRODUCT;
  const giftImage = featuredGiftProduct.colors[0]?.images[0] || '';

  const occasions = [
    { icon: '🎂', title: 'Birthdays', description: 'Make their special day memorable' },
    { icon: '💝', title: 'Anniversaries', description: 'Celebrate love with handmade beauty' },
    { icon: '🎉', title: 'Festivals', description: 'Perfect for Diwali, Raksha Bandhan & more' },
    { icon: '🎓', title: 'Achievements', description: 'Celebrate their success in style' },
    { icon: '💐', title: 'Just Because', description: 'Show you care, anytime' },
    { icon: '🎁', title: 'Weddings', description: 'Thoughtful gifts for the couple' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-stone-50 via-white to-stone-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-green rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-400 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 dark:bg-brand-green/20 px-4 py-2 rounded-full mb-6">
            <Gift className="w-5 h-5 text-brand-green dark:text-brand-green/80" />
            <span className="text-sm font-semibold text-brand-green dark:text-brand-green/80">
              Perfect Gift for Your Loved Ones
            </span>
          </div>
          
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-6">
            Give the Gift of
            <span className="block text-brand-green dark:text-brand-green/80 mt-2">
              Handcrafted Love
            </span>
          </h2>
          
          <p className="text-xl text-stone-600 dark:text-stone-400 max-w-3xl mx-auto leading-relaxed">
            Each bag is handcrafted with care by skilled artisans, making it a truly special and meaningful gift. 
            Show your love with something unique, sustainable, and made with heart.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Image & Product Highlight */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={cloudinaryTransform(giftImage, { w: 800, h: 800, c: 'fill' })}
                alt="Perfect gift - Handmade jute bag"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-stone-900 dark:text-stone-100">4.8/5</span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  Loved by 1000+ customers
                </p>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  {featuredGiftProduct.name}
                </h3>
                <p className="text-white/90 mb-4">
                  Handmade with love • {featuredGiftProduct.colors.length} beautiful colors
                </p>
                <Link
                  to={`/products/${featuredGiftProduct.id}`}
                  className="inline-flex items-center gap-2 bg-white text-stone-900 px-6 py-3 rounded-xl font-bold hover:bg-stone-50 transition-all shadow-lg hover:shadow-xl"
                >
                  Shop Now
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Decorative Hearts */}
            <div className="absolute -top-4 -left-4 w-16 h-16 opacity-20 dark:opacity-10">
              <Heart className="w-full h-full text-pink-400 fill-pink-400" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 opacity-20 dark:opacity-10">
              <Sparkles className="w-full h-full text-yellow-400 fill-yellow-400" />
            </div>
          </div>

          {/* Right: Occasions Grid */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-8 text-center lg:text-left">
              Perfect For Every Occasion
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {occasions.map((occasion, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-stone-800 rounded-2xl p-6 border border-stone-200 dark:border-stone-700 hover:border-brand-green dark:hover:border-brand-green/50 transition-all hover:shadow-lg dark:hover:shadow-stone-900/50 group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {occasion.icon}
                  </div>
                  <h4 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">
                    {occasion.title}
                  </h4>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    {occasion.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Gift Features */}
            <div className="mt-8 bg-brand-green/5 dark:bg-brand-green/10 rounded-2xl p-6 border border-brand-green/20">
              <h4 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-brand-green dark:text-brand-green/80" />
                Why It Makes a Perfect Gift
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-stone-700 dark:text-stone-300">
                  <span className="text-brand-green dark:text-brand-green/80 mt-1">✓</span>
                  <span><strong>Unique & One-of-a-Kind:</strong> Each bag is handcrafted, making it truly special</span>
                </li>
                <li className="flex items-start gap-3 text-stone-700 dark:text-stone-300">
                  <span className="text-brand-green dark:text-brand-green/80 mt-1">✓</span>
                  <span><strong>Eco-Friendly Choice:</strong> Show you care about the planet too</span>
                </li>
                <li className="flex items-start gap-3 text-stone-700 dark:text-stone-300">
                  <span className="text-brand-green dark:text-brand-green/80 mt-1">✓</span>
                  <span><strong>Thoughtful & Meaningful:</strong> Handmade with love by Indian artisans</span>
                </li>
                <li className="flex items-start gap-3 text-stone-700 dark:text-stone-300">
                  <span className="text-brand-green dark:text-brand-green/80 mt-1">✓</span>
                  <span><strong>Beautiful Packaging:</strong> Ready to gift with care</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-brand-green/10 via-pink-50/50 to-yellow-50/50 dark:from-brand-green/20 dark:via-stone-800 dark:to-stone-800 rounded-3xl p-8 sm:p-12 text-center border border-stone-200 dark:border-stone-700">
          <div className="max-w-2xl mx-auto">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Ready to Make Someone's Day?
            </h3>
            <p className="text-lg text-stone-600 dark:text-stone-400 mb-8">
              Browse our collection and find the perfect bag that speaks to your heart. 
              Every purchase supports skilled artisans and brings joy to your loved ones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-8 py-4 rounded-xl font-bold hover:bg-stone-800 dark:hover:bg-stone-200 transition-all shadow-lg hover:shadow-xl text-lg"
              >
                <Gift size={20} />
                Browse Gift Collection
                <ArrowRight size={20} />
              </Link>
              <Link
                to={`/products/${featuredGiftProduct.id}`}
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-100 text-stone-900 dark:text-stone-100 px-8 py-4 rounded-xl font-bold hover:bg-stone-50 dark:hover:bg-stone-700 transition-all shadow-lg text-lg"
              >
                <Heart size={20} className="fill-pink-400 text-pink-400" />
                Shop Featured Gift
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftingSection;
