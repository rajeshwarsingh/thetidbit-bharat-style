import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const BASE_URL = 'https://bharat.style';
const NOW = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

/**
 * Load stories by parsing the TypeScript file
 * Uses a more robust parsing approach that handles nested objects
 */
async function loadStories() {
  const storiesPath = join(rootDir, 'data', 'stories.ts');
  const storiesContent = await readFile(storiesPath, 'utf8');
  
  const stories = [];
  
  // Extract stories array section
  const storiesArrayMatch = storiesContent.match(/export const stories: Story\[\] = \[([\s\S]*)\];/);
  if (!storiesArrayMatch) {
    throw new Error('Could not find stories array');
  }
  
  const storiesArrayContent = storiesArrayMatch[1];
  
  // Split stories by looking for pattern "  },\n  {" which separates story objects
  // But we need to handle nested braces properly
  const storyMatches = [];
  let currentPos = 0;
  
  // Find all story starts (id: 'X')
  const idPattern = /id:\s*['"](\d+)['"]/g;
  const idMatches = [...storiesArrayContent.matchAll(idPattern)];
  
  for (let i = 0; i < idMatches.length; i++) {
    const idMatch = idMatches[i];
    const storyStart = idMatch.index;
    
    // Find the opening brace before this id
    let braceStart = storyStart;
    while (braceStart > 0 && storiesArrayContent[braceStart] !== '{') {
      braceStart--;
    }
    
    // Find the matching closing brace
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
    
    // Extract fields
    const slugMatch = storyBlock.match(/slug:\s*['"]([^'"]+)['"]/);
    const titleMatch = storyBlock.match(/title:\s*['"]([^'"]+)['"]/);
    const excerptMatch = storyBlock.match(/excerpt:\s*['"]([^'"]+)['"]/);
    const heroImageMatch = storyBlock.match(/heroImage:\s*['"]([^'"]+)['"]/);
    const heroImageAltMatch = storyBlock.match(/heroImageAlt:\s*['"]([^'"]+)['"]/);
    const publishDateMatch = storyBlock.match(/publishDate:\s*['"]([^'"]+)['"]/);
    
    if (slugMatch && titleMatch && excerptMatch && heroImageMatch && heroImageAltMatch && publishDateMatch) {
      // Extract lifestyle images
      const lifestyleImages = [];
      const lifestyleImagesMatch = storyBlock.match(/lifestyleImages:\s*\[([\s\S]*?)\]/);
      if (lifestyleImagesMatch) {
        const imagesContent = lifestyleImagesMatch[1];
        const imageUrlMatches = [...imagesContent.matchAll(/url:\s*['"]([^'"]+)['"][\s\S]*?alt:\s*['"]([^'"]+)['"]/g)];
        for (const imgMatch of imageUrlMatches) {
          lifestyleImages.push({
            url: imgMatch[1],
            alt: imgMatch[2]
          });
        }
      }
      
      stories.push({
        id: idMatch[1],
        slug: slugMatch[1],
        title: titleMatch[1],
        excerpt: excerptMatch[1],
        heroImage: heroImageMatch[1],
        heroImageAlt: heroImageAltMatch[1],
        publishDate: publishDateMatch[1],
        lifestyleImages
      });
    }
  }
  
  if (stories.length === 0) {
    throw new Error('No stories found. Please check stories.ts format.');
  }
  
  return stories;
}

/**
 * Generate sitemap-stories.xml with story URLs and image tags
 */
async function generateStoriesSitemap(stories) {
  const imageNamespace = 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        ${imageNamespace}>
`;

  for (const story of stories) {
    const storyUrl = `${BASE_URL}/stories/${story.slug}`;
    const lastmod = story.publishDate.split('T')[0] || NOW;
    
    xml += `  <url>
    <loc>${storyUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${story.heroImage}</image:loc>
      <image:title><![CDATA[${story.title}]]></image:title>
      <image:caption><![CDATA[${story.heroImageAlt}]]></image:caption>
    </image:image>
`;

    // Include lifestyle images if they exist
    if (story.lifestyleImages && story.lifestyleImages.length > 0) {
      for (const lifestyleImage of story.lifestyleImages) {
        xml += `    <image:image>
      <image:loc>${lifestyleImage.url}</image:loc>
      <image:caption><![CDATA[${lifestyleImage.alt}]]></image:caption>
    </image:image>
`;
      }
    }
    
    xml += `  </url>
`;
  }

  xml += `</urlset>`;

  // Write to both root and public directories
  const publicDir = join(rootDir, 'public');
  await mkdir(publicDir, { recursive: true });
  
  await writeFile(join(rootDir, 'sitemap-stories.xml'), xml, 'utf8');
  await writeFile(join(publicDir, 'sitemap-stories.xml'), xml, 'utf8');
  
  console.log(`✓ Generated sitemap-stories.xml with ${stories.length} story URLs`);
}

/**
 * Generate main sitemap.xml with core pages and product pages
 */
async function generateMainSitemap() {
  const routes = [
    { loc: '/', changefreq: 'daily', priority: '1.0' },
    { loc: '/about', changefreq: 'monthly', priority: '0.8' },
    { loc: '/story', changefreq: 'monthly', priority: '0.8' },
    { loc: '/stories', changefreq: 'weekly', priority: '0.9' },
    { loc: '/track', changefreq: 'weekly', priority: '0.7' },
  ];

  // Add product color variant pages
  const productColors = ['red', 'blue', 'skin-orange', 'pink'];
  for (const color of productColors) {
    routes.push({
      loc: `/?color=${color}`,
      changefreq: 'weekly',
      priority: '0.9'
    });
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  for (const route of routes) {
    xml += `  <url>
    <loc>${BASE_URL}${route.loc}</loc>
    <lastmod>${NOW}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
  }

  xml += `</urlset>`;

  const publicDir = join(rootDir, 'public');
  await mkdir(publicDir, { recursive: true });
  
  // Write as sitemap-main.xml (we'll reference it in the index)
  await writeFile(join(rootDir, 'sitemap-main.xml'), xml, 'utf8');
  await writeFile(join(publicDir, 'sitemap-main.xml'), xml, 'utf8');
  
  console.log(`✓ Generated sitemap-main.xml with ${routes.length} core URLs`);
}

/**
 * Generate sitemap index that references all sitemaps
 */
async function generateSitemapIndex() {
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-main.xml</loc>
    <lastmod>${NOW}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-stories.xml</loc>
    <lastmod>${NOW}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-images.xml</loc>
    <lastmod>${NOW}</lastmod>
  </sitemap>
</sitemapindex>
`;

  const publicDir = join(rootDir, 'public');
  await mkdir(publicDir, { recursive: true });
  
  // Write sitemap index as sitemap.xml (since that's what robots.txt references)
  await writeFile(join(rootDir, 'sitemap.xml'), indexXml, 'utf8');
  await writeFile(join(publicDir, 'sitemap.xml'), indexXml, 'utf8');
  
  console.log('✓ Generated sitemap index (sitemap.xml)');
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('Generating sitemaps...\n');
    
    // Load stories data
    const stories = await loadStories();
    console.log(`✓ Loaded ${stories.length} stories\n`);
    
    // First generate the stories sitemap
    await generateStoriesSitemap(stories);
    
    // Then generate the main sitemap
    await generateMainSitemap();
    
    // Finally, generate the sitemap index
    await generateSitemapIndex();
    
    console.log('\n✓ All sitemaps generated successfully!');
  } catch (error) {
    console.error('Error generating sitemaps:', error);
    process.exit(1);
  }
}

main();
