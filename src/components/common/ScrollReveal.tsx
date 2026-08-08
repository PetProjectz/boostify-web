'use client';

import * as React from 'react';

import Box, { type BoxProps } from '@mui/material/Box';
import { motion } from 'framer-motion';

import { easeOutExpo } from '@/app/(home)/heroShared';

const MotionBox = motion.create(Box);

/** HTML event handlers whose React and framer-motion signatures conflict. */
type ConflictingHandlers = 'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd';

type ScrollRevealProps = Omit<BoxProps, ConflictingHandlers> & {
  /** Animation delay in seconds, used to stagger sibling reveals. */
  delay?: number;
  /** Vertical offset (px) the content travels in from. */
  y?: number;
};

/**
 * Fades + slides content in the first time it scrolls into view.
 * Shares the easing/duration used by the hero section's entrance animation.
 */
export default function ScrollReveal({ delay = 0, y = 32, children, ...rest }: ScrollRevealProps) {
  return (
    <MotionBox
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: easeOutExpo }}
      {...(rest as React.ComponentProps<typeof MotionBox>)}
    >
      {children}
    </MotionBox>
  );
}
