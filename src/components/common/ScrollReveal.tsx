'use client';

import * as React from 'react';

import Box, { type BoxProps } from '@mui/material/Box';
import { motion, useAnimationControls, useInView } from 'framer-motion';

import { easeOutExpo } from '@/app/(home)/heroShared';

const MotionBox = motion.create(Box);

/** HTML event handlers whose React and framer-motion signatures conflict. */
type ConflictingHandlers = 'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd';

type ScrollRevealProps = Omit<BoxProps, ConflictingHandlers> & {
  /** Animation delay in seconds, used to stagger sibling reveals. */
  delay?: number;
  /** Vertical offset (px) the content travels in from. */
  y?: number;
  minStartTime?: number;
  /** Fraction of the element (0–1) that must be visible before it reveals. */
  amount?: number;
};

/**
 * Fades + slides content in the first time it scrolls into view.
 * Shares the easing/duration used by the hero section's entrance animation.
 */
export default function ScrollReveal({
  delay = 0,
  y = 32,
  minStartTime = 1.05,
  amount = 0.2,
  children,
  ...rest
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inViewOptions = React.useMemo(() => ({ once: true as const, amount }), [amount]);
  const isInView = useInView(ref, inViewOptions);
  const controls = useAnimationControls();

  const mountedAtRef = React.useRef<number | null>(null);
  if (mountedAtRef.current === null) {
    mountedAtRef.current = performance.now();
  }

  React.useEffect(() => {
    if (!isInView) return;
    const elapsed = (performance.now() - mountedAtRef.current!) / 1000;
    const heroWait = Math.max(0, minStartTime - elapsed);
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: delay + heroWait, ease: easeOutExpo },
    });
  }, [isInView, controls, delay, minStartTime]);

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={controls}
      {...(rest as React.ComponentProps<typeof MotionBox>)}
    >
      {children}
    </MotionBox>
  );
}
