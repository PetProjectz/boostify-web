import { alpha, type Theme } from '@mui/material/styles';

import { brand } from '@/brand';

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Time (seconds) it takes PageHero's staggered entrance to settle. Sections
 * that sit right below a PageHero use this as their base ScrollReveal delay
 * so the page content only starts revealing once the header has finished,
 * instead of animating in at the same time.
 */
export const pageHeroSettleDelay = 0.95;

export const heroPoints = [
  'Tailored digital strategy and execution',
  'Modern branding, media and social media management solutions',
  'Built for start-ups, enterprises, and exporters',
];

export const cardBaseSx = (theme: Theme) => ({
  position: 'absolute' as const,
  overflow: 'hidden' as const,
  borderRadius: '22px',
  border: `1px solid ${alpha(brand.gold, 0.45)}`,
  background: alpha(theme.palette.common.white, 0.04),
  boxShadow: `0 24px 60px ${alpha(theme.palette.common.black, 0.28)}`,
  '& img': { objectFit: 'cover' as const, transition: 'transform 0.5s ease' },
  '&:hover img': { transform: 'scale(1.08)' },
});
