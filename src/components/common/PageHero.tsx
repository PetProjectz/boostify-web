'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

import { brand } from '@/brand';
import { easeOutExpo } from '@/app/(home)/heroShared';

const MotionContainer = motion.create(Container);
const MotionTypography = motion.create(Typography);

const heroDelays = [0.1, 0.22, 0.34];

interface PageHeroProps {
  tag: string;
  title: string;
  subtitle: string;
}

/**
 * Dark navy page header used at the top of the About and Contact pages.
 */
export default function PageHero({ tag, title, subtitle }: PageHeroProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
        pt: { xs: 6, sm: 8 },
        pb: { xs: 6, sm: 8 },
        borderBottom: `5px solid ${brand.gold}`,
        boxShadow: `0 8px 24px ${brand.gold}38`,
        background: `radial-gradient(circle at 15% 35%, ${brand.gold}2e, transparent 26%), radial-gradient(circle at 86% 28%, ${brand.gold}29, transparent 32%), linear-gradient(180deg, ${brand.navyDeep} 0%, ${brand.navySoft} 100%)`,
      }}
    >
      <MotionContainer sx={{ position: 'relative', textAlign: 'center' }}>
        <MotionTypography
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: heroDelays[0], ease: easeOutExpo }}
          sx={{
            color: brand.gold,
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
          sx={{ fontSize: 18, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}
        >
          {subtitle}
        </MotionTypography>
      </MotionContainer>
    </Box>
  );
}
