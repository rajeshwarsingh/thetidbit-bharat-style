'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GoogleAnalytics from '../components/GoogleAnalytics';
import MetaPixel from '../components/MetaPixel';
import SlingTryModal from '../components/SlingTryModal';
import { SlingTryProvider } from '../components/SlingTryContext';
import { ThemeProvider } from '../components/ThemeContext';
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton';
import NewYearCelebration from '../components/NewYearCelebration';

/**
 * Client-side app chrome + context providers, ported from the old AppFrame.
 * Next.js App Router handles routing & scroll restoration, so ScrollToTop is gone.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  const [isSlingTryOpen, setIsSlingTryOpen] = useState(false);

  return (
    <ThemeProvider>
      <SlingTryProvider value={{ openSlingTry: () => setIsSlingTryOpen(true) }}>
        <GoogleAnalytics />
        <MetaPixel />
        <div className="min-h-screen flex flex-col bg-white dark:bg-stone-900 transition-colors duration-300">
          <Navbar />
          <main id="main-content" className="flex-grow">{children}</main>
          <Footer />
        </div>

        <SlingTryModal
          open={isSlingTryOpen}
          onClose={() => setIsSlingTryOpen(false)}
          iframeSrc="https://slingtry-ai-virtual-try-on-955247528706.us-west1.run.app/"
        />
        <WhatsAppFloatingButton />
        <NewYearCelebration />
      </SlingTryProvider>
    </ThemeProvider>
  );
}
