import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { AMAZON_PRODUCT_URL, AMAZON_STORE_URL } from '../constants';

const AmazonIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M13.633 13.56c-.053.476-.403.546-.576.546-.376 0-.613-.263-.613-.67 0-.757.56-1.07 1.486-1.07.276 0 .526.027.68.053v.566c-.003 0-1.03.027-.977.575zm3.176-1.55c-1.393-.16-2.583-.243-3.666-.243-1.666 0-2.433.72-2.433 1.963 0 1.156.883 1.766 2.05 1.766 1.056 0 1.833-.496 2.14-1.086l.113.916h1.776v-5.26c0-2.026-1.12-3.056-3.266-3.056-1.636 0-2.8.546-3.483 1.066l.803 1.34c.596-.386 1.353-.69 2.213-.69 1.043 0 1.543.51 1.543 1.423v.453c-.326-.036-3.606-.216-4.66.196-1.19.466-1.74 1.32-1.74 2.39 0 1.636 1.253 2.506 3.016 2.506 1.413 0 2.34-.736 2.723-1.423l.113 1.26h1.83V12.01h-2.12v-.001zm-5.756.22l.14-.09c-1.35-1.08-2.61-1.2-3.02-1.2-.6 0-1.13.11-1.57.34l.32.74c.32-.17.71-.25 1.16-.25.29 0 1.35.09 2.97 1.38v-.92zm-2.06 3.1c1.55 1.12 3.73 1.22 4.41 1.22.42 0 .74-.04.95-.08v-.81c-.13.02-.38.05-.72.05-1.45 0-3.32-.46-4.64-1.34l-.32.74.32.22z"/>
  </svg>
);

const AmazonTrust: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-stone-50 to-white dark:from-stone-950 dark:to-stone-900 py-12 border-y border-stone-200 dark:border-stone-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white dark:bg-stone-800/50 dark:backdrop-blur-sm p-8 rounded-2xl shadow-sm dark:shadow-stone-900/50 border border-stone-100 dark:border-stone-700/50 transition-colors duration-300">
          
          {/* Left Content */}
          <div className="flex-1 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
            <div className="bg-[#FF9900]/10 p-4 rounded-full flex-shrink-0">
               {/* Amazon Logo SVG - Full Logo */}
               <svg viewBox="0 0 100 30" className="h-8 w-auto fill-[#232F3E]">
                  <path d="M72.3 8.3c-2.3-2.3-5.2-3.1-8.2-3.1-5.1 0-9.6 3-12.7 8.2l-2.7-4.8c-.5-.9-1.8-1.2-2.7-.6-.8.5-1.1 1.6-.6 2.5l2.8 4.9c-.8 2.2-1.2 4.6-1.2 7 0 7.8 6.3 14.1 14.1 14.1 2.3 0 4.5-.6 6.5-1.6l1.2 2.1c.5.9 1.6 1.2 2.5.7.9-.5 1.2-1.6.7-2.5l-1.3-2.3c2.7-3.7 4.3-8.2 4.3-13.1 0-4.6-1.3-8.8-3.7-12.2zm-9.3 22.8c-5.8 0-10.5-4.7-10.5-10.5 0-2.2.7-4.3 1.9-6 .6-.9 1.4-1.7 2.3-2.3 1.7-1.2 3.8-1.9 6-1.9 5.8 0 10.5 4.7 10.5 10.5 0 2.2-.7 4.3-1.9 6-.6.9-1.4 1.7-2.3 2.3-1.7 1.2-3.8 1.9-6 1.9z" />
                  <path d="M12.9 22.6c0-.8.3-1.6.8-2.3l.6-.7c.2-.2.5-.3.8-.3h.1c.3 0 .5.1.8.3l.5.6c.5.6.7 1.4.7 2.1v.2c0 .9-.3 1.7-.8 2.4l-.5.6c-.2.2-.5.3-.8.3h-.1c-.3 0-.6-.1-.8-.3l-.6-.6c-.5-.7-.7-1.5-.7-2.3zm-3.6 2.6c.4.5.9.9 1.5 1.2.6.3 1.3.5 2 .5h.4c.7 0 1.4-.2 2.1-.5.6-.3 1.2-.8 1.6-1.3.4-.6.7-1.3.7-2.1v-.3c0-.8-.2-1.5-.7-2.1-.4-.6-1-1-1.6-1.3-.7-.3-1.4-.5-2.2-.5h-.2c-.7 0-1.4.2-2 .5-.6.3-1.1.8-1.6 1.3-.4.6-.7 1.3-.7 2.1v.3c0 .8.3 1.6.7 2.2zm-2.8 1.7L4.7 21c-.2-.4-.2-.8-.1-1.2l3.4-12c.1-.5.6-.8 1.1-.7.5.1.8.6.7 1.1l-3.2 11.2 1.6 5.5c.1.4-.1.9-.6 1-.4.2-.9 0-1.1-.5l.1.5zm27.8-13.8c-.8-.5-1.9-.8-3.1-.8-1.4 0-2.6.4-3.5 1.1-.9.7-1.5 1.7-1.8 2.9l-.1.4h-2.2v-.8c0-1.6.5-3 1.5-4.2 1-1.1 2.5-1.7 4.3-1.7 1.6 0 2.9.4 3.9 1.2.9.8 1.4 2 1.4 3.5v7.6c0 .5 0 .9.1 1.3.1.4.2.8.4 1.1v.2h-2.3l-.2-.9c-.7.8-1.8 1.2-3.2 1.2-1.3 0-2.3-.4-3.1-1.1-.8-.8-1.2-1.8-1.2-3 0-1.3.4-2.3 1.3-3 .9-.8 2.2-1.2 3.9-1.2h2.2v-.8c0-.9-.2-1.6-.7-2.1-.4-.5-1.1-.8-2-.8-.8 0-1.5.2-2 .6-.6.4-.9 1-.9 1.7h-2.1c0-1.2.5-2.3 1.4-3.1zm1.7 8.3h-1.8c-.9 0-1.6.2-2 .6-.5.4-.7.9-.7 1.5 0 .6.2 1.1.5 1.5.4.4.9.6 1.5.6.8 0 1.5-.3 2-.9.4-.6.6-1.3.6-2.2v-1.1zm9.8-8c.4-.5 1-.8 1.7-.8 1 0 1.8.4 2.3 1.2l.2.3.2-.3c.5-.8 1.3-1.2 2.3-1.2.8 0 1.5.3 1.9.8.5.6.7 1.4.7 2.4v8.1h-2.2v-7.6c0-1.1-.4-1.7-1.2-1.7-.5 0-.9.2-1.2.6-.3.4-.5.9-.5 1.6v7.1h-2.2v-7.6c0-1.1-.4-1.7-1.2-1.7-.5 0-.9.2-1.2.6-.3.4-.5.9-.5 1.6v7.1h-2.2v-10.4h2.2v1.1c.2-.5.5-.9.9-1.2zm14.3 6.9c0 1.4-.4 2.5-1.3 3.4-.8.9-2 1.3-3.4 1.3-1.4 0-2.6-.4-3.5-1.3-.9-.9-1.3-2-1.3-3.4s.4-2.5 1.3-3.4c.9-.9 2-1.3 3.5-1.3 1.4 0 2.6.4 3.4 1.3.9.9 1.3 2 1.3 3.4zm-2.2 0c0-.8-.2-1.5-.7-2-.5-.5-1.1-.8-1.9-.8-.8 0-1.4.3-1.9.8-.5.5-.7 1.2-.7 2s.2 1.5.7 2c.5.5 1.1.8 1.9.8.8 0 1.4-.3 1.9-.8.5-.5.7-1.2.7-2zm9.1-3.6c.4-.5 1-.8 1.7-.8 1.3 0 2.2.6 2.7 1.7v-1.5h2.2v10.4h-2.2v-1.2c-.5 1-1.4 1.5-2.6 1.5-.9 0-1.7-.4-2.3-1.1-.6-.7-.9-1.7-.9-2.9 0-1.2.3-2.2.9-2.9.6-.8 1.4-1.2 2.3-1.2.6 0 1.1.1 1.5.4.4.3.7.7.9 1.1v-3.5c0-.6-.1-1-.4-1.3-.3-.3-.8-.5-1.4-.5-.6 0-1 .2-1.4.5-.3.3-.5.7-.5 1.2h-2.1c-.1-1 .6-1.9 1.6-2.4zm4.8 6.5c0-.6-.1-1.1-.4-1.5-.3-.4-.7-.6-1.2-.6-.6 0-1.1.2-1.5.7-.4.5-.6 1.1-.6 1.8 0 .7.2 1.3.6 1.7.4.5.9.7 1.5.7.5 0 .9-.2 1.2-.6.3-.4.4-.9.4-1.5v-.7z" />
                  <path fill="#FF9900" d="M11.6 30.6c0-.5-.6-1-1.1-1.4-1.8-1.2-5.7-1.7-8.1-.1-.8.5-.7 1.6.2 1.9.5.2 1.1.2 1.7.1 2.5-.5 5.5.3 6.1 1.2.2.3.6.5 1 .3.2-.2.2-1.2.2-2zM98.9 29s-1.8-1.4-2.5.2c-.3.7.1 2.3 2.1 2.1 1.7-.1 1.8-1.8.4-2.3z" />
                  <path fill="#FF9900" d="M22.8 28.5c15 4.3 35.8 3.8 49.3-3.6.6-.3.5-1.3-.2-1.4-.4-.1-1.1.1-1.5.3-7.5 3.3-17.4 4.8-28.7 3.5-5.9-.7-11.4-2.4-16.7-5-.7-.4-1.6-.1-2.1.5-.5.7-.3 1.6.4 2 .8.3 1.6.5 2.5.8l-3-2.9z" />
               </svg>
            </div>
            
            <div>
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                Shop on Amazon
              </h3>
              <p className="text-stone-500 dark:text-stone-400 mt-1 max-w-lg">
                Prefer to shop on Amazon? We are a verified genuine brand. 
                Enjoy Prime delivery and the same great quality.
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 w-fit px-2 py-1 rounded-md">
                <ShieldCheck size={14} />
                <span>100% Authentic Product</span>
              </div>
            </div>
          </div>

          {/* Right Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a 
              href={AMAZON_PRODUCT_URL} 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
                  window.gtag('event', 'amazon_click', { placement: 'amazon_trust', target: 'product' });
                }
              }}
              className="flex items-center justify-center gap-2 bg-[#232F3E] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#131921] transition shadow-md whitespace-nowrap"
            >
              <AmazonIcon className="w-5 h-5" />
              Buy on Amazon
            </a>
            <a 
              href={AMAZON_STORE_URL} 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
                  window.gtag('event', 'amazon_click', { placement: 'amazon_trust', target: 'store' });
                }
              }}
              className="flex items-center justify-center gap-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 px-6 py-3 rounded-xl font-bold hover:bg-stone-50 dark:hover:bg-stone-700 transition whitespace-nowrap"
            >
              Visit Store <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmazonTrust;