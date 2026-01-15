# SEO & Feed Setup Guide for Bharat.style

This document outlines the complete SEO implementation for `https://bharat.style/` including sitemaps, feeds, structured data, and Google Search Console setup.

## 📋 Overview

The site includes:
- ✅ XML Sitemaps (main, stories, images)
- ✅ RSS Feed (feed.xml)
- ✅ Structured Data (JSON-LD) for Products, Articles, Organization
- ✅ Open Graph & Twitter Cards
- ✅ Image optimization with alt text
- ✅ Canonical URLs
- ✅ Google Analytics 4 integration

## 🗺️ Sitemaps

### Generated Files

1. **sitemap.xml** (Index) - References all other sitemaps
2. **sitemap-main.xml** - Core pages (/, /about, /story, /stories, /track, product variants)
3. **sitemap-stories.xml** - All story/article pages with images
4. **sitemap-images.xml** - Image sitemap for product and story images

### Generation

```bash
# Generate all sitemaps
npm run generate-sitemaps

# Generate image sitemap separately
npm run generate-image-sitemap

# Generate everything (sitemaps + feed)
npm run generate-all-seo
```

Sitemaps are automatically generated during build and written to both:
- Root directory (for version control)
- `public/` directory (for deployment)

### URLs Included

- `/` (Home/Product page) - Priority 1.0, Daily
- `/about` - Priority 0.8, Monthly
- `/story` - Priority 0.8, Monthly
- `/stories` - Priority 0.9, Weekly
- `/stories/:slug` - Priority 0.8, Weekly (all story pages)
- `/track` - Priority 0.7, Weekly
- `/?color=red|blue|skin-orange|pink` - Priority 0.9, Weekly (product variants)

## 📰 RSS Feed

### File: `feed.xml`

RSS 2.0 feed located at `https://bharat.style/feed.xml`

**Features:**
- Latest 10 stories/articles
- Includes images (media:content)
- Proper pubDate formatting (RFC 822)
- Content encoded with HTML
- Linked in `<head>` via `<link rel="alternate">`

### Generation

```bash
npm run generate-feed
```

### Feed Link

Already added to `index.html`:
```html
<link rel="alternate" type="application/rss+xml" title="Bharat.style Feed" href="https://bharat.style/feed.xml" />
```

## 🏗️ Structured Data (JSON-LD)

### Product Schema (Home Page)

Located in `components/Home.tsx`:
- Product name, description, images
- Brand information
- Pricing (INR)
- Availability
- Aggregate ratings (4.8/5, 48 reviews)
- Offers with seller information

### Article Schema (Story Pages)

Located in `components/StoryDetailPage.tsx`:
- Headline, description
- Author (Organization)
- Publisher with logo
- Publish date
- Images (ImageObject with dimensions)
- MainEntityOfPage

### Organization Schema (About Page)

Located in `components/AboutPage.tsx`:
- Organization name, alternate name
- Logo
- Area served (India)
- KnowsAbout topics

### FAQ Schema (Home Page)

Located in `components/Home.tsx`:
- 6 common questions about the product
- Answers for rich snippets

## 🎯 Open Graph & Twitter Cards

All pages use the `SEO` component (`components/SEO.tsx`) which includes:

### Open Graph Tags
```html
<meta property="og:type" content="website|article|product" />
<meta property="og:url" content="https://bharat.style/..." />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta property="og:image:alt" content="..." />
<meta property="og:site_name" content="Bharat.style" />
<meta property="og:locale" content="en_IN" />
```

### Twitter Cards
```html
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="..." />
<meta property="twitter:title" content="..." />
<meta property="twitter:description" content="..." />
<meta property="twitter:image" content="..." />
<meta property="twitter:image:alt" content="..." />
```

## 🖼️ Image Optimization

### Requirements Met

✅ All images have `width` and `height` attributes
✅ All images have descriptive `alt` text with keywords
✅ Images use Cloudinary transformations for optimization
✅ Image sitemap includes product and story images
✅ Images in sitemaps include captions and titles

### Image Sitemap

The `sitemap-images.xml` includes:
- Product images (all color variants)
- Story hero images
- Story lifestyle images

Each image entry includes:
- `<image:loc>` - Image URL
- `<image:title>` - Image title
- `<image:caption>` - Alt text/description

## 🔍 Google Search Console Setup

### 1. Verify Property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://bharat.style/`
3. Choose verification method:
   - **HTML tag** (recommended): Add meta tag to `index.html`
   - **DNS record**: Add TXT record to domain
   - **Google Analytics**: If GA4 is already connected

### 2. Submit Sitemaps

After verification, submit:
- `https://bharat.style/sitemap.xml` (index - will discover all others)

Or submit individually:
- `https://bharat.style/sitemap-main.xml`
- `https://bharat.style/sitemap-stories.xml`
- `https://bharat.style/sitemap-images.xml`

### 3. Monitor Coverage

Check:
- **Coverage Report**: Ensure all pages are indexed
- **Performance Report**: Track impressions, clicks, CTR
- **Discover Report**: Monitor Google Discover traffic
- **Mobile Usability**: Ensure mobile-friendly

### 4. Link Search Console to GA4

1. In GA4: Admin → Search Console Linking
2. Link to your Search Console property
3. Enable data sharing

## 📊 Google Analytics 4

Already configured:
- Tracking ID: `G-6ZVW69DQG4` (in `constants.ts`)
- Component: `components/GoogleAnalytics.tsx`
- Tracks page views, events, conversions

### Events to Monitor

- Product views
- Add to cart (WhatsApp clicks)
- Story/article reads
- Theme toggle usage
- Virtual try-on usage

## 🚀 Performance & Core Web Vitals

### Current Optimizations

✅ **Image Optimization**
- Cloudinary transformations
- Responsive images with srcset
- Lazy loading for below-fold images
- WebP format support

✅ **Code Splitting**
- React lazy loading for routes
- Code splitting via Vite

✅ **Caching**
- Static assets cached (via Vercel headers)
- Service worker (if implemented)

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Monitoring

Use:
- Google Search Console → Core Web Vitals
- Google PageSpeed Insights
- Chrome DevTools Lighthouse

## 📝 Editorial Content

### Stories Section

Located at `/stories`:
- List page: `components/StoriesPage.tsx`
- Detail pages: `components/StoryDetailPage.tsx`
- Data: `data/stories.ts`

### Best Practices

✅ Each story includes:
- Unique slug
- SEO-friendly title
- Meta description (excerpt)
- Featured image (1200px+ width recommended)
- Publish date
- Author information
- Read time
- Structured data (Article schema)

✅ Images:
- High quality (1200px+ width)
- Descriptive alt text
- Optimized via Cloudinary
- Included in image sitemap

## 🔄 Auto-Generation

### Build Process

The build script (`package.json`) automatically:
1. Generates sitemaps
2. Generates image sitemap
3. Generates RSS feed
4. Builds the application
5. Prerenders static pages

```bash
npm run build
```

### Manual Regeneration

If content changes, regenerate:

```bash
# All SEO files
npm run generate-all-seo

# Individual
npm run generate-sitemaps
npm run generate-feed
npm run generate-image-sitemap
```

## 📍 Canonical URLs

All pages use canonical URLs via the `SEO` component:
- Prevents duplicate content issues
- Points to the primary version of each page
- Format: `https://bharat.style/{path}`

## 🎨 Image Mapping

### Product Images

Mapped in `constants.ts`:
- Ruby Red: `MODEL_RED`, `PRODUCT_RED`, `FLATLAY_RED`
- Ocean Blue: `MODEL_BLUE`, `PRODUCT_BLUE`, `FLATLAY_BLUE`
- Skin Orange: `MODEL_ORANGE`, `PRODUCT_ORANGE`, `FLATLAY_ORANGE`
- Blush Pink: `MODEL_PINK`, `PRODUCT_PINK`, `FLATLAY_PINK`

### Story Images

Mapped in `data/stories.ts`:
- Hero images for each story
- Lifestyle images within articles
- All included in image sitemap

## ✅ Checklist

### Pre-Launch

- [x] Sitemaps generated and accessible
- [x] RSS feed created and linked
- [x] Structured data on all pages
- [x] OG tags on all pages
- [x] Twitter Cards on all pages
- [x] Images optimized with alt text
- [x] Canonical URLs set
- [x] robots.txt configured
- [x] Feed link in HTML head

### Post-Launch

- [ ] Verify in Google Search Console
- [ ] Submit sitemap.xml
- [ ] Monitor coverage report
- [ ] Check Core Web Vitals
- [ ] Monitor Discover traffic
- [ ] Track GA4 events
- [ ] Regular content updates (stories)

## 📚 Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [RSS 2.0 Specification](https://www.rssboard.org/rss-specification)
- [Sitemap Protocol](https://www.sitemaps.org/protocol.html)

## 🐛 Troubleshooting

### Sitemap Not Found

- Check `public/` directory has sitemap files
- Verify build script ran successfully
- Check server configuration (should serve static files)

### Feed Not Updating

- Regenerate feed: `npm run generate-feed`
- Check `data/stories.ts` for latest stories
- Verify feed.xml is in `public/` directory

### Images Not Indexing

- Check image sitemap: `sitemap-images.xml`
- Verify images have proper alt text
- Ensure images are accessible (no 404s)

### Structured Data Errors

- Use [Google Rich Results Test](https://search.google.com/test/rich-results)
- Validate JSON-LD syntax
- Check for required fields per schema type

---

**Last Updated**: 2025-01-27
**Maintained by**: Bharat.style Team

