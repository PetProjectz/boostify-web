'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


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
        color: 'text.primary',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(circle at 50% -20%, color-mix(in srgb, var(--mui-palette-primary-main) 13%, transparent), transparent 33%), linear-gradient(180deg, var(--mui-palette-brandSurface-deep) 0%, var(--mui-palette-brandSurface-mid) 100%)',
      }}
    >
      <Container sx={{ textAlign: 'center', py: 8 }}>
        <Typography
          sx={{
            color: 'brandSurface.accentText',
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
        <Typography sx={{ fontSize: 18, color: 'text.secondary', maxWidth: 560, mx: 'auto', mb: 4 }}>
          An unexpected error occurred while loading this page. Please try again.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            onClick={() => reset()}
            variant="contained"
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontWeight: 700,
              px: 4,
              py: 1.25,
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            Try Again
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
