'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

import { easeOutExpo } from '@/app/(home)/heroShared';

const MotionTypography = motion.create(Typography);

const heroDelays = [0.1, 0.22, 0.34];

interface PageHeroProps {
  tag: string;
  title: string;
  subtitle: string;
}

/**
 * Navy + gold page header used at the top of the About and Contact pages,
 * adapted per light/dark color scheme.
 */
export default function PageHero({ tag, title, subtitle }: PageHeroProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: 'text.primary',
        pt: { xs: 6, sm: 8 },
        pb: { xs: 6, sm: 8 },
        borderBottom: '5px solid var(--mui-palette-primary-main)',
        boxShadow: '0 8px 24px color-mix(in srgb, var(--mui-palette-primary-main) 22%, transparent)',
        background:
          'radial-gradient(circle at 15% 35%, color-mix(in srgb, var(--mui-palette-primary-main) 18%, transparent), transparent 26%), radial-gradient(circle at 86% 28%, color-mix(in srgb, var(--mui-palette-primary-main) 16%, transparent), transparent 32%), linear-gradient(180deg, var(--mui-palette-brandSurface-deep) 0%, var(--mui-palette-brandSurface-soft) 100%)',
      }}
    >
      <Container sx={{ position: 'relative', textAlign: 'center' }}>
        <MotionTypography
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: heroDelays[0], ease: easeOutExpo }}
          sx={{
            color: 'brandSurface.accentText',
            fontWeight: 800,
            textTransform: 'uppercase',
            fontSize: 14,
            letterSpacing: '2px',
            mb: 1.5,
          }}
        >
          {tag}
        </MotionTypography>
        <MotionTypography
          variant="h1"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: heroDelays[1], ease: easeOutExpo }}
          sx={{ fontSize: 'clamp(46px, 7vw, 72px)', letterSpacing: '-0.06em', mb: 2 }}
        >
          {title}
        </MotionTypography>
        <MotionTypography
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: heroDelays[2], ease: easeOutExpo }}
          sx={{ fontSize: 18, color: 'text.secondary', fontWeight: 500 }}
        >
          {subtitle}
        </MotionTypography>
      </Container>
    </Box>
  );
}
