'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import HeroImageCard from '@/components/common/HeroImageCard';
import { cardBaseSx, easeOutExpo, heroPoints } from './heroShared';

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);
const MotionStack = motion.create(Stack);

const contentContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const contentItemVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutExpo } },
};

const imageDelays = [0.45, 0.75, 0.90];

export default function HeroSectionDesktop() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 140, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 140, damping: 20, mass: 0.5 });

  const groupRotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);
  const groupRotateY = useTransform(springX, [-0.5, 0.5], [-9, 9]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'grid' },
        gridTemplateColumns: '1.05fr 0.95fr',
        gap: 8,
        alignItems: 'center',
        minHeight: 720,
        pt: 8,
        pb: 10,
      }}
    >
      <MotionBox variants={contentContainerVariants} initial="hidden" animate="visible">
        <MotionTypography
          variants={contentItemVariants}
          sx={{
            color: 'brandSurface.accentText',
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
          variants={contentItemVariants}
          sx={{ fontSize: 'clamp(42px, 7vw, 78px)', lineHeight: 0.98, letterSpacing: '-0.07em', mb: 2.5, maxWidth: 760 }}
        >
          We build brands that win online
        </MotionTypography>
        <MotionTypography
          variants={contentItemVariants}
          sx={{ color: 'text.secondary', fontSize: 19, maxWidth: 660, mb: 3.5 }}
        >
          Boostify partners with Sri Lankan businesses to transform digitally and embrace AI,
          combining technology, strategy, and creative excellence to help you grow faster and
          lead confidently online.
        </MotionTypography>

        <MotionStack direction="row" spacing={2} variants={contentItemVariants} sx={{ flexWrap: 'wrap', gap: 2 }}>
          <Button
            component={NextLink}
            href="/contact"
            variant="contained"
            color="primary"
            sx={{ minHeight: 48, px: 3.5, background: 'linear-gradient(180deg, var(--mui-palette-brandAccent-goldSoft), var(--mui-palette-primary-main))' }}
          >
            Get Started
          </Button>
          <Button
            href="#services"
            variant="outlined"
            sx={{
              minHeight: 48,
              px: 3.5,
              color: 'brandSurface.accentText',
              borderColor: 'primary.main',
              '&:hover': { background: 'primary.main', color: 'primary.contrastText', borderColor: 'primary.main' },
            }}
          >
            Explore Services
          </Button>
        </MotionStack>

        <MotionStack spacing={1.75} variants={contentItemVariants} sx={{ mt: 3.5, maxWidth: 560 }}>
          {heroPoints.map((point) => (
            <Stack key={point} direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  flex: '0 0 auto',
                  background: 'linear-gradient(180deg, var(--mui-palette-brandAccent-goldSoft), var(--mui-palette-primary-main))',
                  boxShadow: '0 0 18px color-mix(in srgb, var(--mui-palette-primary-main) 65%, transparent)',
                }}
              />
              <Typography sx={{ fontSize: 15, color: 'text.secondary' }}>{point}</Typography>
            </Stack>
          ))}
        </MotionStack>
      </MotionBox>

      <Box
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        sx={{ position: 'relative', width: '100%', minHeight: 560, perspective: 1400 }}
      >
        <MotionBox
          style={{
            rotateX: groupRotateX,
            rotateY: groupRotateY,
            transformStyle: 'preserve-3d',
          }}
          sx={{ position: 'absolute', inset: 0 }}
        >
          <HeroImageCard
            src="/assets/hero/hero-1.webp"
            alt="Digital solutions"
            delay={imageDelays[0]}
            parallaxDepth={10}
            springX={springX}
            springY={springY}
            sizes="40vw"
            sx={[cardBaseSx, { width: '78%', height: 430, right: 0, top: 60, zIndex: 1 }]}
          />
          <HeroImageCard
            src="/assets/hero/hero-2.webp"
            alt="Creative studio"
            delay={imageDelays[1]}
            parallaxDepth={22}
            springX={springX}
            springY={springY}
            sizes="20vw"
            sx={[cardBaseSx, { width: '44%', height: 200, left: 0, top: 0, zIndex: 2 }]}
          />
          <HeroImageCard
            src="/assets/hero/hero-3.webp"
            alt="Technology"
            delay={imageDelays[2]}
            parallaxDepth={18}
            springX={springX}
            springY={springY}
            sizes="20vw"
            sx={[cardBaseSx, { width: '46%', height: 220, left: 20, bottom: 0, zIndex: 2 }]}
          />
        </MotionBox>
      </Box>
    </Box>
  );
}
