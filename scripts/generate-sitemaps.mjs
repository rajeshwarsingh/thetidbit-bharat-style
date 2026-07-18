/**
 * Generate sitemap index + sub-sitemaps for thetidbit.in
 *
 * sitemap.xml              → index
 * sitemap-pages.xml        → home, collections (+ filters), about, bulk, contact, stories hub
 * sitemap-products.xml     → all 12 signature PDPs with images
 * sitemap-stories.xml      → all story articles with images
 * sitemap-images.xml       → product + story image discovery (PDP-linked)
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import {
  rootDir,
  today,
  BASE_URL,
  loadCatalogProducts,
  loadCollectionFilters,
  loadStories,
  STATIC_PAGES,
  EXCLUDED_FROM_SITEMAP,
  expectedIndexableUrls,
  urlEntry,
  wrapUrlset,
  wrapSitemapIndex,
} from './sitemap-data.mjs';

const NOW = today();

async function writeSitemap(filename, xml) {
  const publicDir = join(rootDir, 'public');
  await mkdir(publicDir, { recursive: true });
  await writeFile(join(rootDir, filename), xml, 'utf8');
  await writeFile(join(publicDir, filename), xml, 'utf8');
}

async function generatePagesSitemap(collectionFilters) {
  let body = '';

  for (const page of STATIC_PAGES) {
    body += urlEntry({ ...page, lastmod: NOW });
  }

  for (const filter of collectionFilters) {
    body += urlEntry({
      loc: `/collections?filter=${filter}`,
      lastmod: NOW,
      changefreq: 'weekly',
      priority: '0.85',
    });
  }

  const xml = wrapUrlset(body);
  await writeSitemap('sitemap-pages.xml', xml);
  const count = STATIC_PAGES.length + collectionFilters.length;
  console.log(`✓ Generated sitemap-pages.xml with ${count} URLs`);
  return count;
}

async function generateProductsSitemap(products) {
  let body = '';
  for (const p of products) {
    body += urlEntry({
      loc: p.loc,
      lastmod: NOW,
      changefreq: 'weekly',
      priority: '0.9',
      images: p.images.slice(0, 8).map((url, i) => ({
        url,
        title: p.displayName,
        caption: i === 0 ? `${p.displayName} — TheTidbit handmade jute bag` : `${p.displayName} view ${i + 1}`,
      })),
    });
  }
  const xml = wrapUrlset(body, true);
  await writeSitemap('sitemap-products.xml', xml);
  console.log(`✓ Generated sitemap-products.xml with ${products.length} product URLs`);
  return products.length;
}

async function generateStoriesSitemap(stories) {
  let body = '';
  for (const story of stories) {
    const images = [
      { url: story.heroImage, title: story.title, caption: story.heroImageAlt },
      ...story.lifestyleImages.map((img) => ({ url: img.url, caption: img.alt })),
    ];
    body += urlEntry({
      loc: story.loc,
      lastmod: story.publishDate.split('T')[0] || NOW,
      changefreq: 'monthly',
      priority: '0.8',
      images,
    });
  }
  const xml = wrapUrlset(body, true);
  await writeSitemap('sitemap-stories.xml', xml);
  console.log(`✓ Generated sitemap-stories.xml with ${stories.length} story URLs`);
  return stories.length;
}

async function generateImageSitemap(products, stories) {
  let body = '';

  for (const p of products) {
    if (!p.images.length) continue;
    body += urlEntry({
      loc: p.loc,
      lastmod: NOW,
      images: p.images.slice(0, 10).map((url) => ({ url, title: p.displayName })),
    });
  }

  for (const story of stories) {
    const images = [
      { url: story.heroImage, title: story.title },
      ...story.lifestyleImages.map((img) => ({ url: img.url, caption: img.alt })),
    ];
    body += urlEntry({
      loc: story.loc,
      lastmod: story.publishDate.split('T')[0] || NOW,
      images,
    });
  }

  const xml = wrapUrlset(body, true);
  await writeSitemap('sitemap-images.xml', xml);
  const imageCount = products.reduce((n, p) => n + p.images.length, 0)
    + stories.reduce((n, s) => n + 1 + s.lifestyleImages.length, 0);
  console.log(`✓ Generated sitemap-images.xml (${products.length + stories.length} pages, ~${imageCount} images)`);
}

async function generateSitemapIndex() {
  const indexXml = wrapSitemapIndex(
    ['/sitemap-pages.xml', '/sitemap-products.xml', '/sitemap-stories.xml', '/sitemap-images.xml'],
    NOW,
  );
  await writeSitemap('sitemap.xml', indexXml);
  console.log('✓ Generated sitemap index (sitemap.xml)');
}

/** @deprecated kept for backwards compat — same as pages + products combined count */
async function generateMainSitemap(products, collectionFilters) {
  let body = '';
  for (const page of STATIC_PAGES) {
    body += urlEntry({ ...page, lastmod: NOW });
  }
  for (const filter of collectionFilters) {
    body += urlEntry({
      loc: `/collections?filter=${filter}`,
      lastmod: NOW,
      changefreq: 'weekly',
      priority: '0.85',
    });
  }
  for (const p of products) {
    body += urlEntry({
      loc: p.loc,
      lastmod: NOW,
      changefreq: 'weekly',
      priority: '0.9',
    });
  }
  const xml = wrapUrlset(body);
  await writeSitemap('sitemap-main.xml', xml);
  console.log(`✓ Generated sitemap-main.xml (legacy combined, ${STATIC_PAGES.length + collectionFilters.length + products.length} URLs)`);
}

/** Fail the build if any indexable URL is missing from the written sitemaps. */
async function assertSitemapCoverage(products, stories, collectionFilters) {
  const files = ['sitemap-pages.xml', 'sitemap-products.xml', 'sitemap-stories.xml'];
  const found = new Set();
  for (const file of files) {
    const xml = await readFile(join(rootDir, 'public', file), 'utf8');
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      found.add(m[1]);
    }
  }

  const expected = expectedIndexableUrls(products, stories, collectionFilters);
  const missing = [...expected].filter((u) => !found.has(u)).sort();
  const excludedPresent = EXCLUDED_FROM_SITEMAP
    .map((e) => `${BASE_URL}${e.path}`)
    .filter((u) => found.has(u));

  if (missing.length || excludedPresent.length) {
    if (missing.length) {
      console.error('\n✗ Missing from sitemap:');
      missing.forEach((u) => console.error(`  - ${u}`));
    }
    if (excludedPresent.length) {
      console.error('\n✗ Excluded routes incorrectly present:');
      excludedPresent.forEach((u) => console.error(`  - ${u}`));
    }
    throw new Error('Sitemap coverage check failed');
  }

  console.log(`\n✓ Coverage check passed — ${expected.size} indexable URLs, ${EXCLUDED_FROM_SITEMAP.length} routes correctly excluded`);
}

async function main() {
  try {
    console.log('Generating sitemaps...\n');

    const [products, stories, collectionFilters] = await Promise.all([
      loadCatalogProducts(),
      loadStories(),
      loadCollectionFilters(),
    ]);

    console.log(`✓ Loaded ${products.length} products, ${stories.length} stories, ${collectionFilters.length} collection filters\n`);

    await generatePagesSitemap(collectionFilters);
    await generateProductsSitemap(products);
    await generateStoriesSitemap(stories);
    await generateImageSitemap(products, stories);
    await generateMainSitemap(products, collectionFilters);
    await generateSitemapIndex();
    await assertSitemapCoverage(products, stories, collectionFilters);

    const total = STATIC_PAGES.length + collectionFilters.length + products.length + stories.length;
    console.log(`\n✓ All sitemaps generated — ${total} indexable URLs across pages, products & stories`);
  } catch (error) {
    console.error('Error generating sitemaps:', error);
    process.exit(1);
  }
}

main();
