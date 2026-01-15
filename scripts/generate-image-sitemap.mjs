import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const BASE_URL = 'https://bharat.style';
const NOW = new Date().toISOString().split('T')[0];

/**
 * Load product images from constants
 */
async function loadProductImages() {
  const constantsPath = join(rootDir, 'constants.ts');
  const constantsContent = await readFile(constantsPath, 'utf8');
  
  const images = [];
  
  // Extract PRODUCT.colors array
  const colorsMatch = constantsContent.match(/colors:\s*\[([\s\S]*?)\]\s*\}/);
  if (!colorsMatch) {
    console.warn('Could not find product colors');
    return images;
  }
  
  const colorsContent = colorsMatch[1];
  
  // Extract each color's images
  const colorMatches = [...colorsContent.matchAll(/images:\s*\[([\s\S]*?)\]/g)];
  
  for (const colorMatch of colorMatches) {
    const imagesContent = colorMatch[1];
    const imageUrlMatches = [...imagesContent.matchAll(/['"](https?:\/\/[^'"]+)['"]/g)];
    
    for (const imgMatch of imageUrlMatches) {
      images.push({
        url: imgMatch[1],
        loc: imgMatch[1]
      });
    }
  }
  
  return images;
}

/**
 * Load story images
 */
async function loadStoryImages() {
  const storiesPath = join(rootDir, 'data', 'stories.ts');
  const storiesContent = await readFile(storiesPath, 'utf8');
  
  const images = [];
  
  // Extract hero images
  const heroImageMatches = [...storiesContent.matchAll(/heroImage:\s*['"](https?:\/\/[^'"]+)['"]/g)];
  for (const match of heroImageMatches) {
    images.push({
      url: match[1],
      loc: match[1]
    });
  }
  
  // Extract lifestyle images
  const lifestyleMatches = [...storiesContent.matchAll(/url:\s*['"](https?:\/\/[^'"]+)['"]/g)];
  for (const match of lifestyleMatches) {
    images.push({
      url: match[1],
      loc: match[1]
    });
  }
  
  return images;
}

/**
 * Generate image sitemap
 */
async function generateImageSitemap() {
  const productImages = await loadProductImages();
  const storyImages = await loadStoryImages();
  const allImages = [...productImages, ...storyImages];
  
  // Remove duplicates
  const uniqueImages = Array.from(
    new Map(allImages.map(img => [img.url, img])).values()
  );
  
  const imageNamespace = 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        ${imageNamespace}>
`;

  // Group images by page URL (simplified - all product images on home, story images on story pages)
  const homePageImages = productImages;
  const storyPageImages = storyImages;
  
  // Home page with product images
  if (homePageImages.length > 0) {
    xml += `  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${NOW}</lastmod>
`;
    for (const img of homePageImages.slice(0, 20)) { // Limit to 20 per page
      xml += `    <image:image>
      <image:loc>${img.loc}</image:loc>
    </image:image>
`;
    }
    xml += `  </url>
`;
  }
  
  // Story pages with their images
  const storiesPath = join(rootDir, 'data', 'stories.ts');
  const storiesContent = await readFile(storiesPath, 'utf8');
  const slugMatches = [...storiesContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
  const heroImageMatches = [...storiesContent.matchAll(/heroImage:\s*['"](https?:\/\/[^'"]+)['"]/g)];
  
  for (let i = 0; i < slugMatches.length && i < heroImageMatches.length; i++) {
    const slug = slugMatches[i][1];
    const heroImage = heroImageMatches[i][1];
    
    xml += `  <url>
    <loc>${BASE_URL}/stories/${slug}</loc>
    <lastmod>${NOW}</lastmod>
    <image:image>
      <image:loc>${heroImage}</image:loc>
    </image:image>
  </url>
`;
  }
  
  xml += `</urlset>`;

  const publicDir = join(rootDir, 'public');
  await mkdir(publicDir, { recursive: true });
  
  await writeFile(join(rootDir, 'sitemap-images.xml'), xml, 'utf8');
  await writeFile(join(publicDir, 'sitemap-images.xml'), xml, 'utf8');
  
  console.log(`✓ Generated sitemap-images.xml with ${uniqueImages.length} unique images`);
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('Generating image sitemap...\n');
    
    await generateImageSitemap();
    
    console.log('\n✓ Image sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating image sitemap:', error);
    process.exit(1);
  }
}

main();

