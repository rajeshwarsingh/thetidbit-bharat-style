'use client';
import React, { useState } from 'react';
import Hero from './Hero';
import Features from './Features';
import ColorPalette from './ColorPalette';
import ProductDetails from './ProductDetails';
import AmazonTrust from './AmazonTrust';
import Story from './Story';
import Reviews from './Reviews';
import StickyCTA from './StickyCTA';
import InstagramCTA from './InstagramCTA';
import IndiaPride from './IndiaPride';
import FounderExpert from './FounderExpert';
import Reveal from './Reveal';
import DesktopWhatsAppCTA from './DesktopWhatsAppCTA';
import SEO from './SEO';
import { PRODUCT, LOGO_URL } from '../constants';

const Home: React.FC = () => {
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Product Schema for Google Rich Snippets
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": PRODUCT.name,
    "image": PRODUCT.colors[0].images,
    "description": PRODUCT.features.join('. '),
    "sku": PRODUCT.id,
    "brand": {
      "@type": "Brand",
      "name": "TheTidbit",
      "logo": LOGO_URL
    },
    "offers": {
      "@type": "Offer",
      "url": "https://thetidbit.in/",
      "priceCurrency": "INR",
      "price": PRODUCT.price,
      "priceValidUntil": "2026-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "TheTidbit"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "48"
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://thetidbit.in/"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Women",
      "item": "https://thetidbit.in/women"
    },{
      "@type": "ListItem",
      "position": 3,
      "name": "Handbags",
      "item": "https://thetidbit.in/women/handbags"
    },{
      "@type": "ListItem",
      "position": 4,
      "name": "Sling Bags",
      "item": "https://thetidbit.in/"
    }]
  };

  // FAQ Schema (Rich Results)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is the bag washable?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jute is a natural fiber. We recommend spot cleaning with a damp cloth for stains. Do not machine wash or soak in water."
        }
      },
      {
        "@type": "Question",
        "name": "Is the strap adjustable?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the long strap is fully adjustable, making it perfect for both shoulder and crossbody use for women of all heights."
        }
      },
      {
        "@type": "Question",
        "name": "Does it have a zip closure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the main compartment has a high-quality zip closure to keep your essentials safe. It also has a small inner pocket."
        }
      },
      {
        "@type": "Question",
        "name": "Is it eco-friendly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. The bag is made from biodegradable jute and cotton, making it a sustainable choice."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer free delivery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We offer free delivery on all orders across India."
        }
      },
      {
        "@type": "Question",
        "name": "How can I get help with my order?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Message us on WhatsApp with your order ID. If something arrives damaged or incorrect, we'll help resolve it."
        }
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Handmade Jute Embroidered Round Sling Bag"
        description="Shop the eco-friendly, artistic, handmade jute embroidered round sling bag. Sustainable fashion for the modern boho soul. Free delivery across India."
        canonicalUrl="https://thetidbit.in/"
        type="product"
        image={PRODUCT.colors[0].images[0]}
        schema={[productSchema, breadcrumbSchema, faqSchema]}
      />
      <Hero appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} />
      <Reveal delayMs={0}><Features /></Reveal>
      <Reveal delayMs={80}><ColorPalette /></Reveal>
      <Reveal delayMs={120}><ProductDetails /></Reveal>
      <Reveal delayMs={160}><AmazonTrust /></Reveal>
      <Reveal delayMs={200}><Story /></Reveal>
      <Reveal delayMs={240}><IndiaPride /></Reveal>
      <Reveal delayMs={260}><FounderExpert /></Reveal>
      <Reveal delayMs={280}><Reviews /></Reveal>
      <Reveal delayMs={320}><InstagramCTA /></Reveal>
      <StickyCTA appliedCoupon={appliedCoupon} />
      <DesktopWhatsAppCTA />
    </>
  );
};

export default Home;