import type { APIRoute } from 'astro';
import { generateOGImage } from '../../utils/og/generate';

// Default site-wide card, used by BaseHead when a page has no OG image of its own.
export const GET: APIRoute = async () => {
  const png = await generateOGImage({
    title: 'Software, product judgment, and the humanities',
    contentType: 'site',
  });

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
