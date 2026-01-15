import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { NEW_ARRIVALS } from '../constants';

const NewArrivals: React.FC = () => {
  const handleAction = (action: string, productName: string) => {
    // In a real app, this would add to cart context or API
    alert(`${action}: ${productName}`);
  };

  return (
    <section id="new-arrivals" className="bg-white py-16 sm:py-24 border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <span className="text-brand-green font-bold text-sm tracking-wider uppercase mb-2 block">New Drop</span>
            <h2 className="text-3xl font-serif font-bold text-stone-900">Fresh from the Loom</h2>
            <p className="mt-2 text-stone-500 max-w-lg">
              Discover our latest eco-conscious additions. Handpicked styles for the season, crafted with the same sustainable values you love.
            </p>
          </div>
          <button 
             onClick={() => handleAction('Navigating', 'All Collection')}
             className="hidden sm:inline-flex items-center text-stone-900 font-bold border-b-2 border-brand-green pb-1 hover:text-brand-green transition group"
          >
            View all collection 
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {NEW_ARRIVALS.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-stone-100 relative shadow-sm group-hover:shadow-md transition-all duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-700 ease-out"
                />
                
                {/* Badges */}
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-stone-900 shadow-sm border border-stone-100">
                    {product.tag}
                  </span>
                )}
                
                {/* Wishlist Button */}
                <button 
                  onClick={() => handleAction('Added to Wishlist', product.name)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-stone-400 hover:text-red-500 hover:bg-white transition shadow-sm z-10"
                >
                  <Heart size={16} />
                </button>
                
                {/* Overlay & Quick Add */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex justify-center bg-gradient-to-t from-black/20 to-transparent">
                   <button 
                     onClick={() => handleAction('Quick Added', product.name)}
                     className="w-full bg-white text-stone-900 py-2.5 px-4 rounded-lg shadow-lg flex items-center justify-center gap-2 text-sm font-bold hover:bg-stone-50 active:scale-95 transition-all"
                   >
                     <ShoppingBag size={16} /> Quick Add
                   </button>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-base font-serif font-bold text-stone-900 leading-snug">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <span aria-hidden="true" className="absolute inset-0 sm:hidden" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-stone-500">Natural Jute</p>
                <div className="mt-2 flex items-baseline gap-2">
                   <p className="text-lg font-bold text-stone-900">
                     <span className="text-xs font-medium text-stone-600 mr-1">Only</span>₹{product.price}
                   </p>
                   {product.mrp > product.price && (
                     <>
                      <p className="text-xs text-stone-500 line-through">₹{product.mrp}</p>
                       <p className="text-xs text-brand-green font-bold">
                         {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                       </p>
                     </>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center sm:hidden">
           <button 
             onClick={() => handleAction('Navigating', 'All Collection')}
             className="w-full border border-stone-300 px-6 py-4 rounded-xl text-stone-800 font-bold hover:bg-stone-50 transition"
           >
             View All Collection
           </button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;