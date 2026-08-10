'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';

interface NewsCardImageProps {
  src: string;
  alt: string;
}

// This placeholder is intentionally always dark navy regardless of color
// scheme (like a video player's loading frame), so these are plain literals
// rather than the adaptive `brandSurface` tokens — using those would make
// the placeholder flip to cream in light mode, which isn't the intent here.
const navyDeep = '#020915';
const navyMid = '#07172d';

const shimmerSx = {
  position: 'absolute' as const,
  inset: 0,
  background: `linear-gradient(135deg, ${navyDeep}, ${navyMid})`,
  overflow: 'hidden' as const,
  '&::after': {
    content: '""',
    position: 'absolute' as const,
    inset: 0,
    transform: 'translateX(-100%)',
    background: `linear-gradient(90deg, transparent, ${alpha('#fff', 0.08)}, transparent)`,
    animation: 'newsCardShimmer 1.4s ease-in-out infinite',
  },
  '@keyframes newsCardShimmer': {
    '100%': { transform: 'translateX(100%)' },
  },
};

/**
 * No image on file for this article: show a designed placeholder instead of
 * leaving a blank gap in the card.
 */
function GeneratedPlaceholder({ alt }: { alt: string }) {
  return (
    <Box
      role="img"
      aria-label={alt}
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--mui-palette-primary-main) 15%, transparent), transparent 55%), linear-gradient(135deg, ${navyDeep}, ${navyMid})`,
      }}
    >
      <ArticleRoundedIcon sx={{ fontSize: 48, color: 'color-mix(in srgb, var(--mui-palette-primary-light) 55%, transparent)' }} />
    </Box>
  );
}

/**
 * Article thumbnail used on the News page. Shows a shimmering placeholder
 * until the remote image finishes loading, and falls back to a generated
 * graphic when the sheet has no image for that row.
 */
export default function NewsCardImage({ src, alt }: NewsCardImageProps) {
  const [loaded, setLoaded] = React.useState(false);
  const [errored, setErrored] = React.useState(false);

  if (!src || errored) {
    return (
      <Box sx={{ height: 190, position: 'relative' }}>
        <GeneratedPlaceholder alt={alt} />
      </Box>
    );
  }

  return (
    <Box sx={{ height: 190, position: 'relative', bgcolor: '#020a16' }}>
      <Box sx={{ ...shimmerSx, opacity: loaded ? 0 : 1, transition: 'opacity 0.4s ease' }} />
      <Box
        component="img"
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
    </Box>
  );
}
