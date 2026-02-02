import satori from 'satori';
import sharp from 'sharp';
import { getTemplate, formatDate, WIDTH, HEIGHT } from './templates';

type ContentType = 'articles' | 'notes' | 'jots';

interface GenerateOGImageProps {
  title?: string;
  description?: string;
  body?: string;
  pubDate: Date;
  contentType: ContentType;
}

// Font cache to avoid redundant fetches during build
const fontCache = new Map<string, ArrayBuffer>();

async function fetchFont(url: string): Promise<ArrayBuffer> {
  if (fontCache.has(url)) {
    return fontCache.get(url)!;
  }

  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  fontCache.set(url, arrayBuffer);
  return arrayBuffer;
}

async function getFontFromGoogleAPI(
  family: string,
  weight: number = 400
): Promise<ArrayBuffer> {
  // Google Fonts CSS2 API URL
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;

  // Fetch with older user-agent that returns TTF instead of WOFF2
  const cssResponse = await fetch(cssUrl, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    },
  });

  const css = await cssResponse.text();

  // Extract font URL from CSS
  const fontUrlMatch = css.match(/src:\s*url\(([^)]+)\)/);
  if (!fontUrlMatch) {
    throw new Error(`Could not find font URL for ${family}`);
  }

  const fontUrl = fontUrlMatch[1];
  return fetchFont(fontUrl);
}

async function loadFonts() {
  const [ebGaramond, leagueSpartan, jetbrainsMono] = await Promise.all([
    getFontFromGoogleAPI('EB Garamond', 400),
    getFontFromGoogleAPI('League Spartan', 600),
    getFontFromGoogleAPI('JetBrains Mono', 400),
  ]);

  return [
    {
      name: 'EB Garamond',
      data: ebGaramond,
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'League Spartan',
      data: leagueSpartan,
      weight: 600 as const,
      style: 'normal' as const,
    },
    {
      name: 'League Mono',
      data: jetbrainsMono,
      weight: 400 as const,
      style: 'normal' as const,
    },
  ];
}

export async function generateOGImage(
  props: GenerateOGImageProps
): Promise<Buffer> {
  const fonts = await loadFonts();

  const template = getTemplate({
    title: props.title,
    description: props.description,
    body: props.body,
    date: formatDate(props.pubDate),
    contentType: props.contentType,
  });

  const svg = await satori(template, {
    width: WIDTH,
    height: HEIGHT,
    fonts,
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return png;
}
