import { alpha } from '@mui/material/styles';

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const heroPoints = [
  'Tailored digital strategy and execution',
  'Modern branding, media and social media management solutions',
  'Built for start-ups, enterprises, and exporters',
];

export const cardBaseSx = {
  position: 'absolute' as const,
  overflow: 'hidden' as const,
  borderRadius: '22px',
  border: '1px solid color-mix(in srgb, var(--mui-palette-primary-main) 45%, transparent)',
  background: alpha('#8a8f9a', 0.12),
  boxShadow: '0 24px 60px rgba(0,0,0,0.28)',
  '& img': { objectFit: 'cover' as const, transition: 'transform 0.5s ease' },
  '&:hover img': { transform: 'scale(1.08)' },
};
