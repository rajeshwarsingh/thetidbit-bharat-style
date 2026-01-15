# Quick SEO Reference - Bharat.style

## 🚀 Quick Commands

```bash
# Generate all SEO files (sitemaps + feed)
npm run generate-all-seo

# Generate only sitemaps
npm run generate-sitemaps

# Generate only RSS feed
npm run generate-feed

# Generate only image sitemap
npm run generate-image-sitemap
```

## 📍 Important URLs

- **Main Sitemap**: `https://bharat.style/sitemap.xml`
- **RSS Feed**: `https://bharat.style/feed.xml`
- **Main Pages**: `https://bharat.style/sitemap-main.xml`
- **Stories**: `https://bharat.style/sitemap-stories.xml`
- **Images**: `https://bharat.style/sitemap-images.xml`

## ✅ Post-Deployment Checklist

1. **Verify Files Are Accessible:**
   - [ ] `https://bharat.style/sitemap.xml` returns XML
   - [ ] `https://bharat.style/feed.xml` returns RSS
   - [ ] All sitemap URLs return valid XML

2. **Google Search Console:**
   - [ ] Verify property ownership
   - [ ] Submit `https://bharat.style/sitemap.xml`
   - [ ] Check coverage report (wait 24-48 hours)
   - [ ] Link GA4 to Search Console

3. **Validate Structured Data:**
   - [ ] Test home page: [Rich Results Test](https://search.google.com/test/rich-results)
   - [ ] Test story page: [Rich Results Test](https://search.google.com/test/rich-results)
   - [ ] Fix any errors

4. **Test Social Sharing:**
   - [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [ ] [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - [ ] Verify OG images display correctly

## 🔄 After Content Updates

When you publish a new story:

```bash
npm run generate-all-seo
```

Then commit and deploy. Google will discover updates automatically.

## 📊 Monitoring

- **Search Console**: Weekly check for errors
- **GA4**: Monitor traffic sources
- **Discover**: Check Discover report in Search Console
- **Core Web Vitals**: Monthly review

---

For detailed documentation, see `SEO_SETUP.md`

