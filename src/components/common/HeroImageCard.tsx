'use client';

import Box from '@mui/material/Box';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

const MotionBox = motion.create(Box);

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export interface HeroImageCardProps {
  src: string;
  alt: string;
  sx: SxProps<Theme>;
  delay: number;
  parallaxDepth: number;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  sizes: string;
}

export default function HeroImageCard({
  src,
  alt,
  sx,
  delay,
  parallaxDepth,
  springX,
  springY,
  sizes,
}: HeroImageCardProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const parallaxX = useTransform(springX, (v) => v * parallaxDepth);
  const parallaxY = useTransform(springY, (v) => v * (parallaxDepth * 0.6));

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay, ease: easeOutExpo }}
      sx={sx}
    >
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          x: isDesktop ? parallaxX : 0,
          y: isDesktop ? parallaxY : 0,
        }}
      >
        <motion.div
          initial={isDesktop ? { scale: 1.35 } : { x: -36 }}
          animate={isDesktop ? { scale: 1 } : { x: 0 }}
          transition={{ duration: isDesktop ? 1.1 : 0.8, delay, ease: easeOutExpo }}
          style={{ position: 'relative', width: '100%', height: '100%' }}
        >
          <Image src={src} alt={alt} fill sizes={sizes} />
        </motion.div>
      </motion.div>
    </MotionBox>
  );
}
