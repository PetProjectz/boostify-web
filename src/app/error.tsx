'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { brand } from '@/brand';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `radial-gradient(circle at 50% -20%, ${brand.gold}21, transparent 33%), linear-gradient(180deg, ${brand.navyDeep} 0%, ${brand.navy3} 100%)`,
      }}
    >
      <Container sx={{ textAlign: 'center', py: 8 }}>
        <Typography
          sx={{
            color: brand.gold,
            fontWeight: 800,
            textTransform: 'uppercase',
            fontSize: 14,
            letterSpacing: '2px',
            mb: 1.5,
          }}
        >
          Something Went Wrong
        </Typography>
        <Typography variant="h1" sx={{ fontSize: 'clamp(36px, 6vw, 56px)', letterSpacing: '-0.06em', mb: 2 }}>
          We hit a snag
        </Typography>
        <Typography sx={{ fontSize: 18, color: 'rgba(255,255,255,0.82)', maxWidth: 560, mx: 'auto', mb: 4 }}>
          An unexpected error occurred while loading this page. Please try again.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            onClick={() => reset()}
            variant="contained"
            sx={{
              bgcolor: brand.gold,
              color: brand.onGold,
              fontWeight: 700,
              px: 4,
              py: 1.25,
              '&:hover': { bgcolor: brand.goldDark },
            }}
          >
            Try Again
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
