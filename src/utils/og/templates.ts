import { ogColors } from './colors';

type ContentType = 'articles' | 'notes' | 'jots';

interface TemplateProps {
  title?: string;
  description?: string;
  body?: string;
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

export function articleTemplate(props: TemplateProps) {
  return {
    type: 'div',
    props: {
      style: {
        ...baseStyles,
        flexDirection: 'row',
        position: 'relative',
        overflow: 'hidden',
      },
      children: [
        // Vertical brand bar on left
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '12px',
              backgroundColor: ogColors.brand,
            },
          },
        },
        // Decorative diagonal line
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              right: '-100px',
              top: '-200px',
              width: '500px',
              height: '1000px',
              backgroundColor: ogColors.brandDark,
              transform: 'rotate(15deg)',
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
              justifyContent: 'space-between',
              flex: 1,
              padding: '60px 70px 50px 70px',
            },
            children: [
              // Top section with title and description
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                  },
                  children: [
                    // Title
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'EB Garamond',
                          fontSize: '92px',
                          color: ogColors.foreground,
                          lineHeight: 1.1,
                          letterSpacing: '-0.02em',
                          maxWidth: '900px',
                        },
                        children: props.title || '',
                      },
                    },
                    // Description with accent line
                    props.description
                      ? {
                          type: 'div',
                          props: {
                            style: {
                              display: 'flex',
                              alignItems: 'center',
                              marginTop: '30px',
                              gap: '24px',
                            },
                            children: [
                              {
                                type: 'div',
                                props: {
                                  style: {
                                    width: '40px',
                                    height: '2px',
                                    backgroundColor: ogColors.brand,
                                  },
                                },
                              },
                              {
                                type: 'div',
                                props: {
                                  style: {
                                    fontFamily: 'EB Garamond',
                                    fontSize: '32px',
                                    color: ogColors.muted,
                                    lineHeight: 1.4,
                                    maxWidth: '700px',
                                  },
                                  children: props.description,
                                },
                              },
                            ],
                          },
                        }
                      : null,
                  ].filter(Boolean),
                },
              },
              // Footer
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'EB Garamond',
                          fontSize: '48px',
                          color: ogColors.brand,
                          letterSpacing: '-0.02em',
                        },
                        children: 'zanlib.dev',
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'League Mono',
                          fontSize: '38px',
                          color: ogColors.muted,
                          letterSpacing: '0.05em',
                        },
                        children: props.date,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

export function noteTemplate(props: TemplateProps) {
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
                  children: '// note',
                },
              },
              // Title
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'League Spartan',
                    fontSize: '84px',
                    color: ogColors.foreground,
                    lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                    maxWidth: '800px',
                  },
                  children: props.title || '',
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
                    fontFamily: 'League Mono',
                    fontSize: '38px',
                    color: ogColors.muted,
                    letterSpacing: '0.05em',
                  },
                  children: props.date,
                },
              },
            ],
          },
        },
      ],
    },
  };
}

export function jotTemplate(props: TemplateProps) {
  return {
    type: 'div',
    props: {
      style: {
        ...baseStyles,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      },
      children: [
        // Decorative circles
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              left: '80px',
              top: '80px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: ogColors.brand,
              opacity: 0.2,
            },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              right: '120px',
              bottom: '100px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: ogColors.brand,
              opacity: 0.15,
            },
          },
        },
        // Center branding
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'EB Garamond',
                    fontSize: '68px',
                    color: ogColors.brand,
                    letterSpacing: '-0.02em',
                  },
                  children: 'zanlib.dev',
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'League Mono',
                    fontSize: '24px',
                    color: ogColors.brand,
                    letterSpacing: '-0.02em',
                  },
                  children: props.date,
                },
              }
            ],
          },
        },
      ],
    },
  };
}

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
