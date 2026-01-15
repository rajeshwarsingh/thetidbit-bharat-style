# Google Discover Monitoring Guide for Bharat.style

## Quick Setup Checklist

### ✅ Phase 1: Enable Tracking (Day 1)
- [ ] Access Google Search Console (GSC) for bharat.style
- [ ] Navigate to **Performance** > **Discover** (left sidebar)
- [ ] Verify Discover data is available (may take 1-3 days after first impressions)
- [ ] Confirm date range is set appropriately (default: last 3 months)

### ✅ Phase 2: Initial Configuration (Week 1)
- [ ] Set up date range comparisons (compare to previous period)
- [ ] Configure performance filters for story pages only
- [ ] Create saved report for Stories section (`/stories/*`)
- [ ] Set up email alerts for significant changes (optional)

### ✅ Phase 3: Baseline Metrics (Week 1-2)
- [ ] Document baseline metrics:
  - [ ] Total Discover impressions
  - [ ] Average CTR
  - [ ] Total clicks
  - [ ] Top performing story URLs
- [ ] Note: Baseline may take 7-14 days to establish

---

## Key Metrics to Track

### Primary Metrics (Monitor Weekly)

#### 1. Impressions
- **What:** Number of times stories appear in Discover feed
- **Where:** GSC > Performance > Discover > Overview
- **Target:** Increasing trend over time
- **Action:** Identify which stories get most impressions

#### 2. Click-Through Rate (CTR)
- **What:** Percentage of impressions that result in clicks
- **Calculation:** (Clicks / Impressions) × 100
- **Target:** 3-8% for Discover (higher than regular search)
- **Action:** Low CTR = improve headlines/images; High CTR = replicate strategy

#### 3. Clicks
- **What:** Number of users clicking through to stories
- **Where:** GSC > Performance > Discover
- **Target:** Growing month-over-month
- **Action:** Track which stories drive most traffic

#### 4. Average Position
- **What:** Average ranking position in Discover (less relevant than search)
- **Note:** Position varies widely in Discover feed
- **Action:** Less critical than impressions/clicks

---

## Identifying Top-Performing Stories

### Method 1: GSC Performance Report

1. **Access the Report:**
   - Go to GSC > Performance > Discover
   - Click on "Pages" tab
   - Sort by "Clicks" or "Impressions"

2. **Key Filters:**
   - Date range: Last 30 days (adjust as needed)
   - Click "New" filter > Page > Contains: `/stories/`

3. **Identify Patterns:**
   - Which stories have highest impressions?
   - Which stories have highest CTR?
   - Which stories have highest clicks?

### Method 2: Content Analysis

**Look for patterns in top performers:**
- [ ] Headline style/tone (emotional, curiosity-driven?)
- [ ] Image type (lifestyle, artisan, product?)
- [ ] Story topics/themes
- [ ] Publish date timing
- [ ] Read time length
- [ ] Author name/branding

### Top Performer Tracking Template

| Story Title | URL | Impressions | Clicks | CTR | Key Pattern |
|------------|-----|-------------|--------|-----|-------------|
| Example Story | /stories/... | 10,000 | 350 | 3.5% | Emotional headline |
| | | | | | |

---

## Recommended Metrics Dashboard

### Weekly Review (Every Monday)

**Check:**
- [ ] Total Discover impressions (week-over-week)
- [ ] Total clicks (week-over-week)
- [ ] Average CTR
- [ ] Top 3 performing stories
- [ ] New stories appearing in Discover

### Monthly Review (First Monday of Month)

**Analyze:**
- [ ] Month-over-month trends
- [ ] Best performing story themes/topics
- [ ] Worst performing stories (consider refresh)
- [ ] Content gaps (topics not performing)
- [ ] Seasonal patterns (if applicable)

---

## Content Iteration Strategy

### Based on Discover Performance Data

#### If High Impressions, Low CTR:
**Problem:** Stories are shown but not clicked
**Actions:**
- [ ] Review and improve headlines (more curiosity-driven)
- [ ] Test new hero images (lifestyle-focused, high quality)
- [ ] Ensure images are 16:9, min 1200px width
- [ ] Check if excerpt is compelling enough
- [ ] Consider A/B testing different image styles

#### If Low Impressions:
**Problem:** Stories not showing in Discover
**Actions:**
- [ ] Verify all Discover requirements are met:
  - [ ] Large hero images (1200px+)
  - [ ] No text overlays on images
  - [ ] Clean, editorial layout
  - [ ] No intrusive popups
  - [ ] Fast page load (LCP < 2.5s)
- [ ] Check article freshness (newer content performs better)
- [ ] Ensure consistent publishing schedule
- [ ] Review story topics (trending, relevant to Indian women?)

#### If High CTR, Low Engagement:
**Problem:** Clicks high but time on page low
**Actions:**
- [ ] Improve article content quality
- [ ] Add related stories section (internal linking)
- [ ] Ensure mobile-first experience
- [ ] Check page load speed
- [ ] Review content length (too short? too long?)

#### Top Performer Replication:
**Actions:**
- [ ] Document successful patterns:
  - [ ] Headline structure/formula
  - [ ] Image style/composition
  - [ ] Content length
  - [ ] Topic themes
  - [ ] Publish timing
- [ ] Apply patterns to new stories
- [ ] Create content templates based on winners

---

## Monthly Content Strategy Session

### Review Meeting (First Monday, Monthly)

**Agenda:**

1. **Performance Review (15 min)**
   - [ ] Review top 5 stories by clicks
   - [ ] Review bottom 3 stories
   - [ ] Identify trends and patterns

2. **Content Planning (20 min)**
   - [ ] Plan new stories based on top performers
   - [ ] Identify content gaps
   - [ ] Schedule story refreshes (if needed)

3. **Optimization Tasks (10 min)**
   - [ ] Update underperforming story headlines
   - [ ] Refresh images for low-CTR stories
   - [ ] Improve internal linking

4. **Action Items**
   - [ ] Assign tasks for content team
   - [ ] Set next review date
   - [ ] Document learnings

---

## Quick Reference: Discover Requirements Checklist

### Technical Requirements
- [ ] Hero images: Minimum 1200px width, 16:9 aspect ratio
- [ ] No text overlays on hero images
- [ ] Clean, white/beige background
- [ ] Large, readable fonts (18px+ body text)
- [ ] No intrusive popups or interstitials
- [ ] Fast page load: LCP < 2.5 seconds
- [ ] Mobile-first, responsive design
- [ ] Proper semantic HTML (`<article>`, headings)

### Content Requirements
- [ ] Original, high-quality content
- [ ] Recent publication date (fresh content)
- [ ] Clear, compelling headlines
- [ ] Relevant topics for target audience
- [ ] Proper article schema markup
- [ ] Open Graph and Twitter Card meta tags
- [ ] Canonical URLs

### Engagement Signals
- [ ] Related stories section
- [ ] Internal linking strategy
- [ ] Encourages scroll depth
- [ ] Clear navigation
- [ ] No aggressive CTAs

---

## GSC Access & Navigation

### Finding Discover Data in Google Search Console

1. **Login:** https://search.google.com/search-console
2. **Select Property:** bharat.style
3. **Navigate:** Left sidebar > Performance > Discover
4. **Default View:** Shows last 3 months of data

### Key Tabs to Use

- **Overview:** Overall Discover performance
- **Pages:** Individual story performance
- **Countries:** Geographic distribution
- **Dates:** Day-by-day performance
- **Devices:** Mobile vs. desktop breakdown

### Exporting Data

1. Click "Export" button (top right)
2. Choose format: Google Sheets or CSV
3. Use for monthly reporting and analysis

---

## Success Indicators

### Healthy Discover Performance Looks Like:

- ✅ **Impressions:** Growing month-over-month
- ✅ **CTR:** 3-8% range (higher than regular search)
- ✅ **Clicks:** Steady growth trajectory
- ✅ **Diversity:** Multiple stories performing (not just one)
- ✅ **Fresh Content:** New stories appearing in Discover regularly

### Warning Signs:

- ⚠️ **Declining Impressions:** Content may not be fresh enough
- ⚠️ **Very Low CTR (<2%):** Headlines/images need improvement
- ⚠️ **Only 1-2 Stories Performing:** Need more content variety
- ⚠️ **No New Stories Appearing:** Publishing frequency too low

---

## Next Steps After Setup

1. **Week 1-2:** Establish baseline metrics
2. **Week 3-4:** Identify first patterns and top performers
3. **Month 2:** Begin content iteration based on data
4. **Month 3+:** Refine strategy and scale successful patterns

---

## Resources

- [Google Search Console Help](https://support.google.com/webmasters/topic/9460985)
- [Google Discover Guidelines](https://developers.google.com/search/docs/appearance/google-discover)
- [Discover Performance Report Guide](https://support.google.com/webmasters/answer/7473296)

---

**Last Updated:** January 2025  
**Review Frequency:** Weekly (metrics), Monthly (strategy)

