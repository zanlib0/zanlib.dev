import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { getTemplate, formatDate, WIDTH, HEIGHT } from './templates';

type ContentType = 'articles' | 'notes' | 'jots';

interface GenerateOGImageProps {
  title?: string;
  pubDate: Date;
  contentType: ContentType;
}

// Anchored to the project root, not import.meta.url: this module is bundled into
// dist/.prerender/chunks/ before it runs.
const FONT_FILES = [
  'public/fonts/eb-garamond.woff',
  'src/utils/og/fonts/Ysabeau-SemiBold.ttf',
  'src/utils/og/fonts/LeagueMono-Regular.ttf',
] as const;

// Read once per build rather than per image.
let fontsPromise: ReturnType<typeof readFonts> | undefined;

async function readFonts() {
  const [ebGaramond, ysabeau, leagueMono] = await Promise.all(
    FONT_FILES.map((file) => readFile(resolve(process.cwd(), file)))
  );

  return [
    {
      name: 'EB Garamond',
      data: ebGaramond,
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'Ysabeau',
      data: ysabeau,
      weight: 600 as const,
      style: 'normal' as const,
    },
    {
      name: 'League Mono',
      data: leagueMono,
      weight: 400 as const,
      style: 'normal' as const,
    },
  ];
}

function loadFonts() {
  fontsPromise ??= readFonts();
  return fontsPromise;
}

export async function generateOGImage(
  props: GenerateOGImageProps
): Promise<Buffer> {
  const fonts = await loadFonts();

  const template = getTemplate({
    title: props.title,
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
