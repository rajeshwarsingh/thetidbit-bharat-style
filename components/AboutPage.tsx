'use client';
import React from 'react';
import { ArrowLeft, Quote, Heart, MapPin } from 'lucide-react';
import { Link } from '@/lib/router';
import { ARTISAN_STORY_IMAGE, ARTISAN_SPOTLIGHT_IMAGE, MISSION_IMAGE } from '../constants';
import SEO from './SEO';
import { cloudinarySrcSet, cloudinaryTransform } from '../utils/cloudinary';
import { ABOUT_META } from '../lib/seo-content';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={ABOUT_META.title}
        description={ABOUT_META.description}
        canonicalUrl="https://thetidbit.in/about"
        type="website"
        image={MISSION_IMAGE}
      />

      {/* Hero Section - Clean, no overlay */}
      <div className="relative w-full aspect-video overflow-hidden bg-stone-50">
        <img
          src={cloudinaryTransform(ARTISAN_STORY_IMAGE, { w: 1920 })}
          srcSet={cloudinarySrcSet(ARTISAN_STORY_IMAGE, [1200, 1600, 1920])}
          sizes="100vw"
          alt="Artisan crafting handmade jute bag in West Bengal"
          className="w-full h-full object-cover"
          width="1920"
          height="1080"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Story Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Back Link */}
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-12 transition font-medium"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>

        {/* Main Story */}
        <div className="space-y-8 text-lg leading-relaxed text-stone-700">
          
          {/* Opening */}
          <div className="space-y-6">
            <h1 className="font-serif text-5xl sm:text-6xl font-bold text-stone-900 leading-tight">
              Our Story
            </h1>
            
            <p className="text-xl text-stone-700 leading-relaxed">
              This story doesn't start in a boardroom or a marketing meeting. It starts in a small village in West Bengal, where Lakshmi sits on her porch, needle in hand, creating something beautiful.
            </p>
          </div>

          {/* The Beginning */}
          <section className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-stone-900 mt-12">
              How It Began
            </h2>
            
            <p>
              We're a small team of people who love beautiful things. Simple, honest things. Things made by human hands, not machines. We noticed something—there was a gap. On one side, incredible artisans in rural India with skills passed down through generations, struggling to find markets for their craft. On the other side, women in cities looking for sustainable, meaningful fashion but finding mostly mass-produced options.
            </p>
            
            <p>
              So we decided to do something about it. Not because it was a "market opportunity" or a "business model." Because it felt right. Because we believed that beautiful, handmade things should have a place in modern life. Because we wanted to connect these two worlds.
            </p>
          </section>

          {/* Artisan Story */}
          <section className="space-y-6">
            <div className="my-12 bg-stone-50 rounded-2xl p-8 sm:p-10 border border-stone-200">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <img 
                  src={cloudinaryTransform(ARTISAN_SPOTLIGHT_IMAGE, { w: 200 })}
                  srcSet={cloudinarySrcSet(ARTISAN_SPOTLIGHT_IMAGE, [150, 200, 300])}
                  sizes="(min-width: 640px) 150px, 100px"
                  alt="Lakshmi Devi, master artisan" 
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-md"
                  loading="lazy"
                  width="128"
                  height="128"
                  decoding="async"
                />
                <div className="flex-1">
                  <Quote className="text-stone-400 mb-3" size={32} />
                  <p className="text-xl font-serif font-medium text-stone-800 italic mb-4">
                    "When you buy a bag, you are not just buying an object. You are buying hundreds of hours of care. You are buying a piece of a heart, a part of a soul."
                  </p>
                  <p className="font-semibold text-stone-900">
                    — Lakshmi Devi, Master Artisan, West Bengal
                  </p>
                </div>
              </div>
            </div>

            <h2 className="font-serif text-3xl font-bold text-stone-900 mt-12">
              The Hands Behind Every Bag
            </h2>
            
            <p>
              Our bags are made in small workshops and homes across West Bengal. These aren't factories. They're spaces where craft lives. Where mothers teach daughters. Where neighbors work together. Where creating something beautiful is still an act of love, not just a job.
            </p>
            
            <p>
              We work directly with these artisans. No middlemen. No complicated supply chains. Just direct relationships. This means they earn fair wages. It means they have dignity in their work. It means when you buy a bag, you're not just supporting a brand—you're supporting a family, a community, a craft.
            </p>
            
            <p>
              Many of these artisans are women. Women who've been weaving and embroidering since they were young. Women who've kept these traditions alive through decades of change. Women who are now able to earn a living doing what they love, from their homes, on their own terms.
            </p>
          </section>

          {/* The Craft */}
          <section className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-stone-900 mt-12">
              The Craft
            </h2>
            
            <div className="relative h-96 rounded-2xl overflow-hidden bg-stone-100 my-8">
              <img 
                src={cloudinaryTransform(MISSION_IMAGE, { w: 1200 })}
                srcSet={cloudinarySrcSet(MISSION_IMAGE, [800, 1200, 1600])}
                sizes="(min-width: 768px) 100vw, 100vw"
                alt="Handcrafted jute bag with natural materials" 
                className="w-full h-full object-cover"
                loading="lazy"
                width="1200"
                height="800"
                decoding="async"
              />
            </div>
            
            <p>
              Every bag starts with jute—India's golden fiber. It's grown by local farmers, processed by hand, and then transformed into fabric. The embroidery? That's done stitch by stitch, thread by thread. No machines. No automation. Just skill, patience, and care.
            </p>
            
            <p>
              This means every bag is unique. The slight variations in the embroidery, the texture of the jute, the way the colors settle—these aren't flaws. They're proof that this was made by a person, not a machine. They're what make your bag yours and yours alone.
            </p>
            
            <p>
              It also means it takes time. Real time. Hours of work go into every bag. But we think that's beautiful. In a world of instant everything, there's something deeply satisfying about something that took time to make, that was made with care, that was made to last.
            </p>
          </section>

          {/* Our Values */}
          <section className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-stone-900 mt-12">
              What We Believe
            </h2>
            
            <p>
              We're not perfect. We're a small team trying to do something good. But here's what we believe in, what guides us:
            </p>
            
            <div className="space-y-6 my-8">
              <div className="flex gap-4">
                <Heart className="text-stone-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-stone-900 mb-2">Craft Matters</h3>
                  <p className="text-stone-700">
                    We believe that things made by human hands have value beyond their function. They carry stories. They connect us. They remind us of what's possible when we take time, when we care, when we create with intention.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <MapPin className="text-stone-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-stone-900 mb-2">India's Heritage Is Worth Preserving</h3>
                  <p className="text-stone-700">
                    Indian craftsmanship is among the finest in the world. But it's fading. As fast fashion grows, traditional crafts struggle. We believe these skills deserve to survive, to thrive, to be part of modern life. We're proud to be part of the "Make in India" story.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Heart className="text-stone-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-stone-900 mb-2">Sustainability Isn't a Trend</h3>
                  <p className="text-stone-700">
                    Jute is 100% biodegradable. It requires minimal water to grow. It returns to the earth when its life is over. We believe fashion shouldn't cost the planet. Every choice we make, we try to make with the earth in mind.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Heart className="text-stone-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-stone-900 mb-2">Fairness Matters</h3>
                  <p className="text-stone-700">
                    The people who make our bags deserve to be paid fairly, to work in good conditions, to have dignity. It's that simple. We work directly with artisans, no middlemen. Every bag sold means a fair wage for the person who made it.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Who We Are */}
          <section className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-stone-900 mt-12">
              Who We Are
            </h2>
            
            <p>
              We're TheTidbit—a small team based in India, passionate about connecting rural craftsmanship with urban lives. TheTidbit is our way of sharing these beautiful, handmade pieces with women who appreciate them.
            </p>
            
            <p>
              We're not a big corporation. We're not trying to scale fast or dominate markets. We're trying to do something good, something meaningful, something that connects people and supports craft. That's it. That's our ambition.
            </p>
            
            <p>
              When you buy from us, you're supporting a small team trying to make a difference. You're supporting artisans who deserve to earn a living from their craft. You're choosing something that's made to last, that's made with care, that's made in India.
            </p>
          </section>

          {/* Closing */}
          <section className="space-y-6 mt-16 pt-12 border-t border-stone-200">
            <p className="text-xl text-stone-800 leading-relaxed">
              So that's our story. Not a corporate mission statement or a marketing pitch. Just the truth. We love beautiful, handmade things. We believe they deserve a place in modern life. We're trying to make that happen.
            </p>
            
            <p className="text-xl text-stone-800 leading-relaxed">
              If this resonates with you, if you believe in supporting craft and making thoughtful choices, then we're grateful you're here. Thank you for being part of our story.
            </p>
          </section>

          {/* Soft Links to Other Sections */}
          <nav className="mt-16 pt-12 border-t border-stone-200" aria-label="Related pages">
            <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
              <Link
                to="/stories"
                className="text-stone-600 hover:text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-600 transition"
              >
                Read Our Stories
              </Link>
              <span className="text-stone-300">•</span>
              <Link
                to="/"
                className="text-stone-600 hover:text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-600 transition"
              >
                Explore Collection
              </Link>
            </div>
          </nav>

        </div>
      </article>
    </div>
  );
};

export default AboutPage;