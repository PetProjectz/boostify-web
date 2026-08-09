'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

import { brand } from '@/brand';
import HeroMobileGallery from './HeroMobileGallery';
import { cardBaseSx, easeOutExpo, heroPoints } from './heroShared';

const MotionTypography = motion.create(Typography);
const MotionStack = motion.create(Stack);

const mobileDelays = [0.1, 0.22, 0.34, 0.46, 0.58, 0.7];

const heroImages = [
  { src: '/assets/hero/hero-1.webp', alt: 'Digital solutions' },
  { src: '/assets/hero/hero-2.webp', alt: 'Creative studio' },
  { src: '/assets/hero/hero-3.webp', alt: 'Technology' },
];

export default function HeroSectionMobile() {
  const theme = useTheme();

  return (
    <Box sx={{ display: { xs: 'block', md: 'none' }, pt: 6, pb: 8 }}>
      <MotionTypography
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: mobileDelays[0], ease: easeOutExpo }}
        sx={{
          color: brand.gold,
          fontWeight: 800,
          textTransform: 'uppercase',
          fontSize: 13,
          letterSpacing: '2px',
          mb: 1,
        }}
      >
        Turning Clicks into Customers
      </MotionTypography>
      <MotionTypography
        variant="h1"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: mobileDelays[1], ease: easeOutExpo }}
        sx={{ fontSize: 'clamp(42px, 7vw, 78px)', lineHeight: 0.98, letterSpacing: '-0.07em', mb: 3 }}
      >
        We build brands that win online
      </MotionTypography>

      <HeroMobileGallery
        images={heroImages}
        delay={mobileDelays[2]}
        sizes="100vw"
        sx={[cardBaseSx, { position: 'relative', width: '100%', height: 260, mb: 3 }]}
      />

      <MotionTypography
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: mobileDelays[3], ease: easeOutExpo }}
        sx={{ color: alpha(theme.palette.common.white, 0.84), fontSize: 19, mb: 3.5 }}
      >
        Boostify partners with Sri Lankan businesses to transform digitally and embrace AI,
        combining technology, strategy, and creative excellence to help you grow faster and
        lead confidently online.
      </MotionTypography>

      <MotionStack
        direction="row"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: mobileDelays[4], ease: easeOutExpo }}
        sx={{ flexWrap: 'wrap', gap: 2 }}
      >
        <Button
          component={NextLink}
          href="/contact"
          variant="contained"
          color="primary"
          sx={{ minHeight: 48, px: 3.5, background: `linear-gradient(180deg, ${brand.goldSoft}, ${brand.gold})` }}
        >
          Get Started
        </Button>
        <Button
          href="#services"
          variant="outlined"
          sx={{ minHeight: 48, px: 3.5, color: brand.gold2, borderColor: brand.gold, '&:hover': { background: brand.gold, color: brand.onGold, borderColor: brand.gold } }}
        >
          Explore Services
        </Button>
      </MotionStack>

      <MotionStack
        spacing={1.75}
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: mobileDelays[5], ease: easeOutExpo }}
        sx={{ mt: 3.5, maxWidth: 560 }}
      >
        {heroPoints.map((point) => (
          <Stack key={point} direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                flex: '0 0 auto',
                background: `linear-gradient(180deg, ${brand.goldSoft}, ${brand.gold})`,
                boxShadow: `0 0 18px ${alpha(brand.gold, 0.65)}`,
              }}
            />
            <Typography sx={{ fontSize: 15, color: alpha(theme.palette.common.white, 0.85) }}>{point}</Typography>
          </Stack>
        ))}
      </MotionStack>
    </Box>
  );
}
