'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import SectionHeading from '@/components/common/SectionHeading';

const TARGET = 50;
const DURATION = 3000;

export default function ProjectCounterSection() {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / DURATION, 1);
              setCount(Math.floor(progress * TARGET));
              if (progress < 1) requestAnimationFrame(tick);
              else setCount(TARGET);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Box sx={{ py: { xs: 6, sm: 7 }, bgcolor: 'background.default' }}>
      <Container>
        <Paper
          ref={ref}
          elevation={0}
          variant="outlined"
          sx={{
            textAlign: 'center',
            borderRadius: '22px',
            px: { xs: 3, sm: 4 },
            py: { xs: 5, sm: 6 },
            boxShadow: '0 18px 45px rgba(7, 18, 45, 0.12)',
          }}
        >
          <SectionHeading tag="Our Achievements" title="Completed Projects" align="center" />
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 0.5, mb: 1.5 }}>
            <Typography
              component="span"
              sx={{ fontSize: 'clamp(64px, 9vw, 110px)', fontWeight: 900, lineHeight: 1, color: 'primary.main', letterSpacing: '-0.06em' }}
            >
              {count}
            </Typography>
            <Typography component="span" sx={{ fontSize: 42, fontWeight: 900, lineHeight: 1, color: 'text.primary', mt: 1.5 }}>
              +
            </Typography>
          </Box>
          <Typography sx={{ color: 'text.secondary', maxWidth: 700, mx: 'auto' }}>
            We have successfully delivered high-impact digital solutions for brands across multiple industries.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
