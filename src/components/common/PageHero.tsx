import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { brand } from '@/brand';

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
        pt: { xs: 16, sm: 20 },
        pb: { xs: 6, sm: 8 },
        borderBottom: `5px solid ${brand.gold}`,
        boxShadow: `0 8px 24px ${brand.gold}38`,
        background: `radial-gradient(circle at 15% 35%, ${brand.gold}2e, transparent 26%), radial-gradient(circle at 86% 28%, ${brand.gold}29, transparent 32%), linear-gradient(180deg, ${brand.navyDeep} 0%, ${brand.navySoft} 100%)`,
      }}
    >
      <Container sx={{ position: 'relative', textAlign: 'center' }}>
        <Typography
          component="p"
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
        </Typography>
        <Typography
          variant="h1"
          sx={{ fontSize: 'clamp(46px, 7vw, 72px)', letterSpacing: '-0.06em', mb: 2 }}
        >
          {title}
        </Typography>
        <Typography sx={{ fontSize: 18, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
          {subtitle}
        </Typography>
      </Container>
    </Box>
  );
}
