import React from 'react';
import { Sprout, Hand, HeartHandshake, Package, Quote, ArrowRight } from 'lucide-react';
import { ARTISAN_STORY_IMAGE, ARTISAN_SPOTLIGHT_IMAGE } from '../constants';
import { Link } from 'react-router-dom';
import { cloudinarySrcSet, cloudinaryTransform } from '../utils/cloudinary';

const Story: React.FC = () => {
  const steps = [
    {
      icon: Sprout,
      title: "Ethically Sourced",
      desc: "We source premium raw jute directly from sustainable farms in West Bengal."
    },
    {
      icon: Hand,
      title: "Handcrafted",
      desc: "Local artisans weave and embroider every bag, preserving traditional techniques."
    },
    {
      icon: HeartHandshake,
      title: "Fair Trade",
      desc: "We ensure fair wages and safe working conditions for our artisan partners."
    },
    {
      icon: Package,
      title: "Eco-Packaging",
      desc: "Delivered to your doorstep in 100% plastic-free, biodegradable packaging."
    }
  ];

  return (
    <section id="our-story" className="relative bg-jute-900 overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/woven.png')]"></div>

      {/* Part 1: Philosophy & Process */}
      <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center mb-16">
          <div className="mb-10 lg:mb-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-jute-800 border border-jute-500 mb-6">
               <span className="text-xs font-bold text-jute-100 uppercase tracking-widest">Our Philosophy</span>
            </div>
            <h2 className="text-4xl font-serif font-bold tracking-tight text-white sm:text-5xl mb-6">
              Handmade with <span className="text-jute-300 italic">Soul</span>
            </h2>
            <p className="text-lg text-jute-100 leading-relaxed mb-6">
              At <strong>TheTidbit</strong>, we believe fashion shouldn't cost the Earth. 
              Our bags are not just accessories; they are stories woven by skilled artisans from rural India.
            </p>
            <p className="text-lg text-jute-100 leading-relaxed">
              By choosing this jute bag, you are supporting sustainable livelihoods and saying no to plastic. 
              Embrace the imperfections of handmade art—where every stitch tells a story of tradition and love.
            </p>
          </div>
          
          <div className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-jute-500 to-brand-green rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
             <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img 
                  src={cloudinaryTransform(ARTISAN_STORY_IMAGE, { w: 1000 })} 
                  srcSet={cloudinarySrcSet(ARTISAN_STORY_IMAGE, [480, 768, 1000, 1200])}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  alt="Artisan weaving" 
                  className="w-full h-full object-cover transform transition duration-700 group-hover:scale-110"
                  loading="lazy"
                  width="800"
                  height="600"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
             </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-white/10">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center sm:items-start sm:text-left group hover:bg-white/5 p-4 rounded-xl transition duration-300">
              <div className="p-3 bg-white/10 rounded-xl text-jute-300 mb-4 group-hover:scale-110 transition duration-300 group-hover:bg-brand-green group-hover:text-white">
                <step.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-jute-100 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Artisan Spotlight */}
      <div className="bg-jute-800 py-20 relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 gap-8 items-center">
               <div className="lg:col-span-5 relative">
                  <img 
                    src={cloudinaryTransform(ARTISAN_SPOTLIGHT_IMAGE, { w: 900 })} 
                    srcSet={cloudinarySrcSet(ARTISAN_SPOTLIGHT_IMAGE, [480, 600, 800, 900])}
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    alt="Lakshmi, Senior Artisan"
                    className="rounded-xl shadow-xl w-full object-cover aspect-[3/4]"
                    loading="lazy"
                    width="600"
                    height="800"
                    decoding="async"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden sm:block">
                     <p className="font-serif font-bold text-stone-900 text-xl">Lakshmi Devi</p>
                     <p className="text-stone-500 text-sm">Master Weaver, West Bengal</p>
                  </div>
               </div>
               <div className="lg:col-span-7 mt-10 lg:mt-0 lg:pl-10">
                  <Quote size={48} className="text-jute-500 mb-6 opacity-50" />
                  <blockquote className="text-3xl font-serif font-medium text-white leading-snug mb-8">
                     "For us, weaving is not just work; it is our meditation. Every thread I weave into these bags carries a prayer for the person who will wear it."
                  </blockquote>
                  <p className="text-jute-200 text-lg mb-8">
                     Lakshmi leads a cooperative of 15 women in her village. Your purchase directly contributes to their children's education fund and healthcare.
                  </p>
                  <Link 
                    to="/story"
                    className="inline-flex items-center text-white border-b border-brand-green pb-1 hover:text-brand-green transition"
                  >
                     Read more about our artisans <ArrowRight size={16} className="ml-2" />
                  </Link>
               </div>
            </div>
         </div>
      </div>

      {/* Part 3: Newsletter */}
      <div className="py-20 px-4 text-center">
         <h3 className="text-2xl font-serif font-bold text-white mb-4">Join the Conscious Circle</h3>
         <p className="text-jute-200 mb-8 max-w-md mx-auto">
            Get early access to new collections and stories from our artisans.
         </p>
         <form className="max-w-md mx-auto flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input 
               type="email" 
               placeholder="Your email address" 
               className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-jute-200 focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
            <button className="px-6 py-3 bg-brand-green text-white font-bold rounded-lg hover:bg-green-700 transition">
               Subscribe
            </button>
         </form>
      </div>
    </section>
  );
};

export default Story;