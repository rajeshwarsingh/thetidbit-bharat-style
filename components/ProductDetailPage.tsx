import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
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
import Reveal from './Reveal';
import DesktopWhatsAppCTA from './DesktopWhatsAppCTA';
import SEO from './SEO';
import { PRODUCT, ALL_PRODUCTS, LOGO_URL } from '../constants';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Find product by ID, fallback to main PRODUCT
  const currentProduct = productId 
    ? ALL_PRODUCTS.find(p => p.id === productId) || PRODUCT
    : PRODUCT;

  useEffect(() => {
    setAppliedCoupon(null);
  }, [productId]);

  // Product Schema for Google Rich Snippets
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": currentProduct.name,
    "image": currentProduct.colors[0].images,
    "description": currentProduct.features.join('. '),
    "sku": currentProduct.id,
    "brand": {
      "@type": "Brand",
      "name": "TheTidbit",
      "logo": LOGO_URL
    },
    "offers": {
      "@type": "Offer",
      "url": `https://bharat.style/products/${currentProduct.id}`,
      "priceCurrency": "INR",
      "price": currentProduct.price,
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
      "item": "https://bharat.style/"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://bharat.style/products"
    },{
      "@type": "ListItem",
      "position": 3,
      "name": currentProduct.name,
      "item": `https://bharat.style/products/${currentProduct.id}`
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
          "text": "Yes. We offer free delivery on prepaid orders across India."
        }
      },
      {
        "@type": "Question",
        "name": "What is the return policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer a 10-day return and exchange policy. Message us on WhatsApp with your order ID to initiate."
        }
      }
    ]
  };

  // Note: Hero and other components use PRODUCT from constants
  // For now, ProductDetailPage works with the main PRODUCT
  // To support multiple products fully, you'd need to refactor Hero/Features/etc to accept product as prop

  return (
    <React.Fragment key={currentProduct.id}>
      <SEO 
        title={currentProduct.name}
        description={`${currentProduct.tagline}. ${currentProduct.features.join('. ')}. Free Delivery & Easy Returns.`}
        canonicalUrl={`https://bharat.style/products/${currentProduct.id}`}
        type="product"
        image={currentProduct.colors[0].images[0]}
        schema={[productSchema, breadcrumbSchema, faqSchema]}
      />
      <Hero product={currentProduct} appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} />
      <Reveal delayMs={0}><Features /></Reveal>
      <Reveal delayMs={80}><ColorPalette product={currentProduct} /></Reveal>
      <Reveal delayMs={120}><ProductDetails product={currentProduct} /></Reveal>
      <Reveal delayMs={160}><AmazonTrust /></Reveal>
      <Reveal delayMs={200}><Story /></Reveal>
      <Reveal delayMs={240}><IndiaPride /></Reveal>
      <Reveal delayMs={280}><Reviews /></Reveal>
      <Reveal delayMs={320}><InstagramCTA /></Reveal>
      <StickyCTA appliedCoupon={appliedCoupon} product={currentProduct} />
      <DesktopWhatsAppCTA />
    </React.Fragment>
  );
};

export default ProductDetailPage;
