import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const BASE_URL = 'https://bharat.style';
const SITE_NAME = 'TheTidbit';
const SITE_DESCRIPTION = 'Eco-friendly, artistic, handmade jute bags by TheTidbit. Sustainable fashion for the modern boho soul.';

/**
 * Load stories by parsing the TypeScript file
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
    const publishDateMatch = storyBlock.match(/publishDate:\s*['"]([^'"]+)['"]/);
    
    if (slugMatch && titleMatch && excerptMatch && heroImageMatch && publishDateMatch) {
      stories.push({
        id: idMatch[1],
        slug: slugMatch[1],
        title: titleMatch[1],
        excerpt: excerptMatch[1],
        heroImage: heroImageMatch[1],
        publishDate: publishDateMatch[1],
      });
    }
  }
  
  // Sort by publish date (newest first)
  stories.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  
  return stories;
}

/**
 * Format date for RSS (RFC 822)
 */
function formatRSSDate(dateString) {
  const date = new Date(dateString);
  return date.toUTCString();
}

/**
 * Escape XML special characters
 */
function escapeXML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate RSS 2.0 Feed
 */
async function generateRSSFeed(stories) {
  const now = new Date();
  const buildDate = formatRSSDate(now.toISOString());
  
  // Get latest 10 stories
  const latestStories = stories.slice(0, 10);
  
  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXML(SITE_NAME)}</title>
    <link>${BASE_URL}</link>
    <description>${escapeXML(SITE_DESCRIPTION)}</description>
    <language>en-IN</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <ttl>60</ttl>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>https://res.cloudinary.com/thetidbit23024/image/upload/v1765969614/canva-_logo-_bykbip.png</url>
      <title>${escapeXML(SITE_NAME)}</title>
      <link>${BASE_URL}</link>
    </image>
`;

  for (const story of latestStories) {
    const storyUrl = `${BASE_URL}/stories/${story.slug}`;
    const pubDate = formatRSSDate(story.publishDate);
    
    rss += `    <item>
      <title>${escapeXML(story.title)}</title>
      <link>${storyUrl}</link>
      <guid isPermaLink="true">${storyUrl}</guid>
      <description>${escapeXML(story.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>TheTidbit</dc:creator>
      <media:content url="${story.heroImage}" type="image/jpeg" medium="image">
        <media:title>${escapeXML(story.title)}</media:title>
      </media:content>
      <content:encoded><![CDATA[
        <img src="${story.heroImage}" alt="${escapeXML(story.title)}" />
        <p>${escapeXML(story.excerpt)}</p>
        <p><a href="${storyUrl}">Read more...</a></p>
      ]]></content:encoded>
    </item>
`;
  }
  
  rss += `  </channel>
</rss>`;

  const publicDir = join(rootDir, 'public');
  await mkdir(publicDir, { recursive: true });
  
  await writeFile(join(rootDir, 'feed.xml'), rss, 'utf8');
  await writeFile(join(publicDir, 'feed.xml'), rss, 'utf8');
  
  console.log(`✓ Generated feed.xml with ${latestStories.length} items`);
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('Generating RSS feed...\n');
    
    const stories = await loadStories();
    console.log(`✓ Loaded ${stories.length} stories\n`);
    
    await generateRSSFeed(stories);
    
    console.log('\n✓ RSS feed generated successfully!');
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    process.exit(1);
  }
}

main();

