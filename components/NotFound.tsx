'use client';
import React from 'react';
import { Link } from '@/lib/router';
import { Home } from 'lucide-react';
import SEO from './SEO';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-stone-50 dark:bg-stone-950 px-4 text-center transition-colors duration-300">
      <SEO 
        title="Page Not Found" 
        description="The page you are looking for does not exist. Return to TheTidbit shop."
        canonicalUrl="https://bharat.style/404"
        noindex
      />
      <h1 className="text-9xl font-serif font-bold text-jute-300 dark:text-jute-800">404</h1>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-4">Page Not Found</h2>
      <p className="text-stone-600 dark:text-stone-400 mt-2 max-w-md">
        Oops! The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link 
        to="/"
        className="mt-8 flex items-center gap-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-6 py-3 rounded-xl font-bold hover:bg-stone-800 dark:hover:bg-stone-200 transition"
      >
        <Home size={20} />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;