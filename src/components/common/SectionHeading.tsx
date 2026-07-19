import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { brand } from '@/brand';

interface SectionHeadingProps {
  tag: string;
  title: React.ReactNode;
  align?: 'left' | 'center';
  /** Force white title text (used on always-dark brand sections). */
  light?: boolean;
}

/**
 * The recurring "section tag + title + gold underline" heading used across
 * every Boostify section.
 */
export default function SectionHeading({
  tag,
  title,
  align = 'left',
  light = false,
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <Box sx={{ textAlign: align, maxWidth: isCenter ? 720 : undefined, mx: isCenter ? 'auto' : undefined }}>
      <Typography
        component="p"
        sx={{
          color: brand.gold,
          fontWeight: 800,
          textTransform: 'uppercase',
          fontSize: 13,
          letterSpacing: '2px',
          lineHeight: 1,
          mb: 1,
        }}
      >
        {tag}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontSize: 'clamp(30px, 4vw, 44px)',
          color: light ? '#ffffff' : 'text.primary',
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          width: 70,
          height: 3,
          borderRadius: 99,
          background: `linear-gradient(90deg, ${brand.gold}, transparent)`,
          mx: isCenter ? 'auto' : 0,
        }}
      />
    </Box>
  );
}
