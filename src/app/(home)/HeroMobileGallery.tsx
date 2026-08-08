'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import Image from 'next/image';
import type { SxProps, Theme } from '@mui/material/styles';
import { AnimatePresence, motion } from 'framer-motion';

const MotionBox = motion.create(Box);

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export interface HeroMobileGalleryProps {
  images: { src: string; alt: string }[];
  sx: SxProps<Theme>;
  delay: number;
  sizes: string;
  intervalMs?: number;
}

export default function HeroMobileGallery({
  images,
  sx,
  delay,
  sizes,
  intervalMs = 4000,
}: HeroMobileGalleryProps) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  const current = images[index];

  return (
    <MotionBox
      initial={{ opacity: 0, x: -36 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: easeOutExpo }}
      sx={sx}
    >
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <AnimatePresence>
          <motion.div
            key={current.src}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 1.1, ease: easeOutExpo }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image src={current.src} alt={current.alt} fill sizes={sizes} />
          </motion.div>
        </AnimatePresence>
      </Box>
    </MotionBox>
  );
}
