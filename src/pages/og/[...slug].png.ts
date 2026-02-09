import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { generateOGImage } from '../../utils/og/generate';

type ContentType = 'articles' | 'notes' | 'jots';

interface PostData {
  title?: string;
  description?: string;
  pubDate: Date;
}

interface OGPageProps {
  collection: ContentType;
  data: PostData;
  body?: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getCollection('articles');
  const notes = await getCollection('notes');
  const jots = await getCollection('jots');

  const paths = [
    ...articles.map((post) => ({
      params: { slug: post.id },
      props: {
        collection: 'articles' as ContentType,
        data: post.data,
      },
    })),
    ...notes.map((post) => ({
      params: { slug: post.id },
      props: {
        collection: 'notes' as ContentType,
        data: post.data,
      },
    })),
    ...jots.map((post) => ({
      params: { slug: post.id },
      props: {
        collection: 'jots' as ContentType,
        data: post.data,
        body: post.body,
      },
    })),
  ];

  return paths;
};

export const GET: APIRoute = async ({ props }) => {
  const { collection, data } = props as OGPageProps;

  const png = await generateOGImage({
    title: 'title' in data ? data.title : undefined,
    pubDate: data.pubDate,
    contentType: collection,
  });

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
