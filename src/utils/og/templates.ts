import { ogColors } from './colors';

type ContentType = 'articles' | 'notes' | 'jots';

interface TemplateProps {
  title?: string;
  date: string;
  contentType: ContentType;
}

const WIDTH = 1200;
const HEIGHT = 630;

const baseStyles = {
  width: WIDTH,
  height: HEIGHT,
  display: 'flex' as const,
  backgroundColor: ogColors.background,
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const template = ({
  coreFontFamily,
  includeDate,
  type,
  fontSize,
}: {
  coreFontFamily: string;
  type: string;
  includeDate: boolean;
    fontSize: string;
}) => (props: TemplateProps) => {
  return {
    type: 'div',
    props: {
      style: {
        ...baseStyles,
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              left: '50px',
              top: '50px',
              width: '60px',
              height: '4px',
              backgroundColor: ogColors.brand,
            },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              left: '50px',
              top: '50px',
              width: '4px',
              height: '60px',
              backgroundColor: ogColors.brand,
            },
          },
        },
        // Main content
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              padding: '60px 70px',
            },
            children: [
              // Label
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'League Mono',
                    fontSize: '34px',
                    color: ogColors.brand,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    marginBottom: '20px',
                  },
                  children: `// ${type}`,
                },
              },
              // Title
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: coreFontFamily,
                    fontSize: fontSize,
                    color: ogColors.foreground,
                    lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                    maxWidth: '800px',
                  },
                  children: props.title || props.date || '',
                },
              },
            ],
          },
        },
        // Footer
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 70px 50px 70px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'EB Garamond',
                    fontSize: '48px',
                    color: ogColors.muted,
                    letterSpacing: '-0.02em',
                  },
                  children: 'zanlib.dev',
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'EB Garamond',
                    fontSize: '24px',
                    color: ogColors.brand,
                    letterSpacing: '0.05em',
                  },
                  children: includeDate ? props.date : '',
                },
              },
            ],
          },
        },
      ],
    },
  };
}

const articleTemplate = template({
  coreFontFamily: 'EB Garamond',
  includeDate: true,
  type: 'article',
  fontSize: '84px',
});

const noteTemplate = template({
  coreFontFamily: 'League Spartan',
  includeDate: true,
  type: 'note',
  fontSize: '74px',
});

const jotTemplate = template({
  coreFontFamily: 'League Mono',
  includeDate: false,
  type: 'jot',
  fontSize: '48px',
})

export function getTemplate(props: TemplateProps) {
  switch (props.contentType) {
    case 'articles':
      return articleTemplate(props);
    case 'notes':
      return noteTemplate(props);
    case 'jots':
      return jotTemplate(props);
    default:
      return articleTemplate(props);
  }
}

export { formatDate, WIDTH, HEIGHT };
