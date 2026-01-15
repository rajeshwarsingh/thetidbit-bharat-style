import React from 'react';
import { Leaf, Feather, Maximize, MoveDiagonal } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      name: "Eco-Friendly",
      description: "Made from 100% natural biodegradable jute.",
      icon: Leaf,
    },
    {
      name: "Lightweight",
      description: "Weighs only 310g, perfect for all-day wear.",
      icon: Feather,
    },
    {
      name: "Spacious",
      description: "Fits your phone, wallet, keys & makeup essentials.",
      icon: Maximize,
    },
    {
      name: "Adjustable",
      description: "Long strap for comfortable crossbody or shoulder styling.",
      icon: MoveDiagonal,
    },
  ];

  return (
    <div className="bg-white dark:bg-stone-950 py-12 sm:py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-brand-green dark:text-brand-green/80 tracking-wide uppercase">Why You'll Love It</h2>
          <p className="mt-2 text-3xl font-serif leading-8 font-extrabold tracking-tight text-stone-900 dark:text-stone-100 sm:text-4xl">
            Sustainable Meets Stylish
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="group relative bg-stone-50 dark:bg-stone-800/50 dark:backdrop-blur-sm p-6 rounded-2xl hover:bg-stone-100 dark:hover:bg-stone-800 transition duration-300">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-xl bg-jute-200 dark:bg-jute-800 text-stone-800 dark:text-stone-200 group-hover:bg-brand-green dark:group-hover:bg-brand-green/80 group-hover:text-white transition duration-300">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-stone-900 dark:text-stone-100">{feature.name}</p>
              <p className="mt-2 ml-16 text-base text-stone-500 dark:text-stone-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;