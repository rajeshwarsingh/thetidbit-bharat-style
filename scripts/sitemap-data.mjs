/**
 * Shared data loaders for sitemap / feed generators.
 * Parses TypeScript source files — keeps sitemaps in sync with catalogs & stories.
 */
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const rootDir = join(__dirname, '..');
export const BASE_URL = 'https://thetidbit.in';

export function today() {
  return new Date().toISOString().split('T')[0];
}

export function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Extract balanced `{ ... }` blocks from an array literal body. */
function extractObjectBlocks(arrayBody) {
  const blocks = [];
  let depth = 0;
  let start = -1;
  for (let i = 0; i < arrayBody.length; i++) {
    const ch = arrayBody[i];
    if (ch === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && start >= 0) {
        blocks.push(arrayBody.slice(start, i + 1));
        start = -1;
      }
    }
  }
  return blocks;
}

function field(block, name) {
  const re = new RegExp(`${name}:\\s*['"]([^'"]+)['"]`);
  return block.match(re)?.[1] ?? null;
}

function fieldUrls(block, name) {
  const re = new RegExp(`${name}:\\s*\\[([\\s\\S]*?)\\]`, 'm');
  const m = block.match(re);
  if (!m) return [];
  return [...m[1].matchAll(/['"](https?:\/\/[^'"]+)['"]/g)].map((x) => x[1]);
}

/** Build map of `const FOO = "https://..."` image aliases in constants.ts. */
function parseConstantsUrlAliases(content) {
  const map = {};
  for (const m of content.matchAll(/const\s+([A-Z0-9_]+)\s*=\s*['"](https?:\/\/[^'"]+)['"]/g)) {
    map[m[1]] = m[2];
  }
  return map;
}

function resolveImageRefs(rawImages, aliases) {
  const urls = [];
  for (const token of rawImages) {
    if (token.startsWith('http')) urls.push(token);
    else if (aliases[token]) urls.push(aliases[token]);
  }
  return [...new Set(urls)];
}

/** Parse `export const NAME = { ... colors: [...] }` color images from constants.ts. */
function parseConstantsColorImages(content, exportName, aliases) {
  const start = content.indexOf(`export const ${exportName}`);
  if (start < 0) return {};
  const colorsIdx = content.indexOf('colors:', start);
  if (colorsIdx < 0) return {};
  const arrStart = content.indexOf('[', colorsIdx);
  if (arrStart < 0) return {};
  let depth = 0;
  let arrEnd = arrStart;
  for (let i = arrStart; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') {
      depth--;
      if (depth === 0) {
        arrEnd = i;
        break;
      }
    }
  }
  const colorsBody = content.slice(arrStart + 1, arrEnd);
  const colorBlocks = extractObjectBlocks(colorsBody);
  const map = {};
  for (const cb of colorBlocks) {
    const id = field(cb, 'id');
    const rawImages = fieldUrls(cb, 'images');
    const namedImages = [...cb.matchAll(/images:\s*\[([\s\S]*?)\]/gm)].flatMap((m) =>
      m[1].split(',').map((s) => s.trim().replace(/['"]/g, '')).filter(Boolean)
    );
    const images = resolveImageRefs(namedImages.length ? namedImages : rawImages, aliases);
    if (id && images.length) map[id] = images;
  }
  return map;
}

function sourceField(block) {
  const m = block.match(/source:\s*(PRODUCT|SLING_BAG_PRODUCT_1|SLING_BAG_PRODUCT_2|HANDBAG_PRODUCT)/);
  return m?.[1] ?? null;
}

/** All signature catalog products from data/catalogs.ts. */
export async function loadCatalogProducts() {
  const catalogsPath = join(rootDir, 'data', 'catalogs.ts');
  const constantsPath = join(rootDir, 'constants.ts');
  const [catalogsContent, constantsContent] = await Promise.all([
    readFile(catalogsPath, 'utf8'),
    readFile(constantsPath, 'utf8'),
  ]);

  const defsMatch = catalogsContent.match(/const CATALOG_DEFS[^=]*=\s*\[([\s\S]*?)\n\];/);
  if (!defsMatch) throw new Error('Could not parse CATALOG_DEFS in data/catalogs.ts');

  const aliases = parseConstantsUrlAliases(constantsContent);

  const sourceMaps = {
    PRODUCT: parseConstantsColorImages(constantsContent, 'PRODUCT', aliases),
    SLING_BAG_PRODUCT_1: parseConstantsColorImages(constantsContent, 'SLING_BAG_PRODUCT_1', aliases),
    SLING_BAG_PRODUCT_2: parseConstantsColorImages(constantsContent, 'SLING_BAG_PRODUCT_2', aliases),
    HANDBAG_PRODUCT: parseConstantsColorImages(constantsContent, 'HANDBAG_PRODUCT', aliases),
  };

  const products = [];
  for (const block of extractObjectBlocks(defsMatch[1])) {
    const slug = field(block, 'slug');
    if (!slug) continue;
    const displayName = field(block, 'displayName') || field(block, 'name') || slug;
    const collection = field(block, 'collection') || 'daily';
    let images = fieldUrls(block, 'images');
    if (!images.length) {
      const sourceKey = sourceField(block);
      const colorId = field(block, 'colorId');
      if (sourceKey && colorId && sourceMaps[sourceKey]?.[colorId]) {
        images = sourceMaps[sourceKey][colorId];
      }
    }
    products.push({
      slug,
      displayName,
      collection,
      images,
      loc: `/products/${slug}`,
      url: `${BASE_URL}/products/${slug}`,
    });
  }

  if (products.length === 0) throw new Error('No catalog products found for sitemap');
  return products;
}

/** Lifestyle collection filter IDs from data/catalog.ts. */
export async function loadCollectionFilters() {
  const catalogPath = join(rootDir, 'data', 'catalog.ts');
  const content = await readFile(catalogPath, 'utf8');
  const ids = [...content.matchAll(/id:\s*['"](office|travel|college|daily|gift)['"]/g)].map((m) => m[1]);
  return [...new Set(ids)];
}

/** Stories from data/stories.ts. */
export async function loadStories() {
  const storiesPath = join(rootDir, 'data', 'stories.ts');
  const storiesContent = await readFile(storiesPath, 'utf8');

  const storiesArrayMatch = storiesContent.match(/export const stories: Story\[\] = \[([\s\S]*)\];/);
  if (!storiesArrayMatch) throw new Error('Could not find stories array');

  const storiesArrayContent = storiesArrayMatch[1];
  const idPattern = /id:\s*['"](\d+)['"]/g;
  const idMatches = [...storiesArrayContent.matchAll(idPattern)];
  const stories = [];

  for (const idMatch of idMatches) {
    let braceStart = idMatch.index;
    while (braceStart > 0 && storiesArrayContent[braceStart] !== '{') braceStart--;

    let braceCount = 0;
    let braceEnd = braceStart;
    for (let j = braceStart; j < storiesArrayContent.length; j++) {
      if (storiesArrayContent[j] === '{') braceCount++;
      if (storiesArrayContent[j] === '}') {
        braceCount--;
        if (braceCount === 0) {
          braceEnd = j + 1;
          break;
        }
      }
    }

    const storyBlock = storiesArrayContent.substring(braceStart, braceEnd);
    const slug = field(storyBlock, 'slug');
    const title = field(storyBlock, 'title');
    const excerpt = field(storyBlock, 'excerpt');
    const heroImage = field(storyBlock, 'heroImage');
    const heroImageAlt = field(storyBlock, 'heroImageAlt');
    const publishDate = field(storyBlock, 'publishDate');

    if (!slug || !title || !heroImage || !publishDate) continue;

    const lifestyleImages = [];
    const lifestyleMatch = storyBlock.match(/lifestyleImages:\s*\[([\s\S]*?)\]/);
    if (lifestyleMatch) {
      for (const imgMatch of lifestyleMatch[1].matchAll(/url:\s*['"]([^'"]+)['"][\s\S]*?alt:\s*['"]([^'"]+)['"]/g)) {
        lifestyleImages.push({ url: imgMatch[1], alt: imgMatch[2] });
      }
    }

    stories.push({
      id: idMatch[1],
      slug,
      title,
      excerpt: excerpt || '',
      heroImage,
      heroImageAlt: heroImageAlt || title,
      publishDate,
      lifestyleImages,
      loc: `/stories/${slug}`,
      url: `${BASE_URL}/stories/${slug}`,
    });
  }

  if (stories.length === 0) throw new Error('No stories found');
  return stories;
}

/** Indexable static pages (excludes checkout, wishlist, track, order/*, noindex routes). */
export const STATIC_PAGES = [
  { loc: '/', changefreq: 'daily', priority: '1.0' },
  { loc: '/collections', changefreq: 'weekly', priority: '0.95' },
  { loc: '/products', changefreq: 'weekly', priority: '0.9' },
  { loc: '/stories', changefreq: 'weekly', priority: '0.9' },
  { loc: '/reviews', changefreq: 'weekly', priority: '0.85' },
  { loc: '/about', changefreq: 'monthly', priority: '0.8' },
  { loc: '/bulk', changefreq: 'monthly', priority: '0.8' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.7' },
];

export function urlEntry({ loc, lastmod, changefreq, priority, images = [] }) {
  const fullLoc = loc.startsWith('http') ? loc : `${BASE_URL}${loc}`;
  let xml = `  <url>\n    <loc>${escapeXml(fullLoc)}</loc>\n`;
  if (lastmod) xml += `    <lastmod>${lastmod}</lastmod>\n`;
  if (changefreq) xml += `    <changefreq>${changefreq}</changefreq>\n`;
  if (priority) xml += `    <priority>${priority}</priority>\n`;
  for (const img of images) {
    xml += `    <image:image>\n      <image:loc>${escapeXml(img.url)}</image:loc>\n`;
    if (img.title) xml += `      <image:title><![CDATA[${img.title}]]></image:title>\n`;
    if (img.caption) xml += `      <image:caption><![CDATA[${img.caption}]]></image:caption>\n`;
    xml += `    </image:image>\n`;
  }
  xml += `  </url>\n`;
  return xml;
}

export function wrapUrlset(body, withImages = false) {
  const imageNs = withImages ? '\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' : '';
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${imageNs}>\n${body}</urlset>\n`;
}

export function wrapSitemapIndex(entries, lastmod) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const path of entries) {
    xml += `  <sitemap>\n    <loc>${BASE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>\n`;
  }
  xml += `</sitemapindex>\n`;
  return xml;
}
