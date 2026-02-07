import React from 'react';
import { readFileSync } from 'node:fs';
import type { RenderFunctionInput } from 'astro-opengraph-images';

function svgToBase64(path: string): string {
  const svg = readFileSync(path, 'utf-8');
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

const backgroundBase64 = svgToBase64('src/og/assets/background.svg');
const logoBase64 = svgToBase64('src/assets/shorebird-light.svg');
const docIconBase64 = svgToBase64('src/og/assets/doc-icon.svg');

/**
 * Custom OG image renderer for Shorebird docs.
 *
 * This function receives page metadata and returns a React element
 * that gets rendered to a 1200x630 PNG via Satori + sharp.
 *
 * Satori supports a subset of CSS (flexbox only, no grid).
 * See: https://github.com/vercel/satori#css
 */
export async function renderer({
  title,
  description,
  pathname,
}: RenderFunctionInput): Promise<React.ReactNode> {
  const isHomepage = pathname === '/' || pathname === '';
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: 1200,
        height: 630,
      }}
    >
      <img
        src={backgroundBase64}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
        }}
      />
      {!isHomepage && (
        <img
          src={logoBase64}
          style={{
            position: 'absolute',
            top: 46,
            left: 75,
            height: 88,
          }}
        />
      )}
      <img
        src={docIconBase64}
        style={{
          position: 'absolute',
          top: 22,
          right: 30,
          width: 140,
          height: 140,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          padding: 80,
          paddingTop: 100,
          fontFamily: 'General Sans',
        }}
      >
        {isHomepage ? (
          <img src={logoBase64} style={{ height: 147, marginTop: -20 }} />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 80,
                fontWeight: 600,
                lineHeight: 1.2,
                letterSpacing: -1.6,
                color: '#0a0a0a',
                textAlign: 'center',
              }}
            >
              {title}
            </div>
            {description && (
              <div
                style={{
                  display: 'flex',
                  fontSize: 28,
                  color: '#55556B',
                  letterSpacing: -0.56,
                  lineHeight: 1.4,
                  marginTop: 24,
                  textAlign: 'center',
                }}
              >
                {description}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
