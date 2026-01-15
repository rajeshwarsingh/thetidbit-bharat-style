import React from 'react';
import { Truck, ShieldCheck, RefreshCcw, Lock, Award, Heart } from 'lucide-react';

const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'On all prepaid orders',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      icon: RefreshCcw,
      title: 'Easy Returns',
      description: '10-day return policy',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payment',
      description: '100% secure checkout',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    },
    {
      icon: Award,
      title: 'Handmade Quality',
      description: 'Artisan crafted',
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
    },
  ];

  return (
    <section className="py-8 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className={`${badge.bgColor} rounded-xl p-4 md:p-6 text-center border border-stone-200 dark:border-stone-700 hover:shadow-md transition-all group`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full ${badge.bgColor} mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 md:w-7 md:h-7 ${badge.color}`} />
                </div>
                <h3 className="font-bold text-sm md:text-base text-stone-900 dark:text-stone-100 mb-1">
                  {badge.title}
                </h3>
                <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
