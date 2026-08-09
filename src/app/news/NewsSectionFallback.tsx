import * as React from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function NewsSectionFallback() {
  return (
    <Box sx={{ py: { xs: 6, sm: 7 }, bgcolor: 'background.default' }}>
      <Container>
        <Box
          role="status"
          aria-live="polite"
          sx={{
            minHeight: 260,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <CircularProgress size={38} thickness={4} sx={{ color: 'brandSurface.accentText' }} />
          <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>Loading latest news…</Typography>
        </Box>
      </Container>
    </Box>
  );
}
