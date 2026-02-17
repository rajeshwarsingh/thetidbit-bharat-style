import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProductDetailPage from './components/ProductDetailPage';
import AllProductsPage from './components/AllProductsPage';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import GoogleAnalytics from './components/GoogleAnalytics';
import MetaPixel from './components/MetaPixel';
import SlingTryModal from './components/SlingTryModal';
import { SlingTryProvider } from './components/SlingTryContext';
import { ThemeProvider } from './components/ThemeContext';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
// import Butterfly from './components/Butterfly';
import NewYearCelebration from './components/NewYearCelebration';

const AboutPage = React.lazy(() => import('./components/AboutPage'));
const BlogPage = React.lazy(() => import('./components/BlogPage'));
const TrackPage = React.lazy(() => import('./components/TrackPage'));
const AdminTrackingGate = React.lazy(() => import('./components/AdminTrackingGate'));
const StoriesPage = React.lazy(() => import('./components/StoriesPage'));
const StoryDetailPage = React.lazy(() => import('./components/StoryDetailPage'));

// Component to ensure page scrolls to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export function AppFrame({ enableAnalytics = true }: { enableAnalytics?: boolean }) {
  const [isSlingTryOpen, setIsSlingTryOpen] = useState(false);

  return (
    <ThemeProvider>
      <SlingTryProvider value={{ openSlingTry: () => setIsSlingTryOpen(true) }}>
        <ScrollToTop />
        {enableAnalytics ? <GoogleAnalytics /> : null}
        {enableAnalytics ? <MetaPixel /> : null}
        <div className="min-h-screen flex flex-col bg-white dark:bg-stone-900 transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
            <Suspense
              fallback={
                <div className="min-h-[40vh] flex items-center justify-center text-stone-500 dark:text-stone-400">
                  Loading…
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<AllProductsPage />} />
                <Route path="/products/:productId" element={<ProductDetailPage />} />
                <Route path="/story" element={<BlogPage />} />
                <Route path="/stories" element={<StoriesPage />} />
                <Route path="/stories/:slug" element={<StoryDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/track" element={<TrackPage />} />
                <Route path="/ops/tracking" element={<AdminTrackingGate />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>

        <SlingTryModal
          open={isSlingTryOpen}
          onClose={() => setIsSlingTryOpen(false)}
          iframeSrc="https://slingtry-ai-virtual-try-on-955247528706.us-west1.run.app/"
        />
        
        {/* WhatsApp Floating Chat Button */}
        <WhatsAppFloatingButton />
        
        {/* New Year Celebration - Shows on first visit */}
        <NewYearCelebration />
      </SlingTryProvider>
    </ThemeProvider>
  );
}


