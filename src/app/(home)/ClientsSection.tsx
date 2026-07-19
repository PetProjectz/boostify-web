import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Image from 'next/image';

import SectionHeading from '@/components/common/SectionHeading';

const clients = [
  { src: '/assets/goldlac-logo.jpg', alt: 'Goldlac' },
  { src: '/assets/higrow-logo.png', alt: 'K Grow Lanka' },
  { src: '/assets/samtes-logo.png', alt: 'Samtes' },
  { src: '/assets/slaughter-logo.jpg', alt: 'Slaughter' },
];

export default function ClientsSection() {
  return (
    <Box sx={{ pb: { xs: 7, sm: 8 }, bgcolor: 'background.default' }}>
      <Container>
        <SectionHeading tag="Trusted By" title="Our Clients" align="center" />
        <Grid container spacing={2.5} sx={{ mt: 2 }}>
          {clients.map((client) => (
            <Grid size={{ xs: 6, md: 3 }} key={client.alt}>
              <Paper
                elevation={0}
                variant="outlined"
                sx={{
                  minHeight: 138,
                  height: '100%',
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2.25,
                  boxShadow: '0 18px 45px rgba(7, 18, 45, 0.08)',
                }}
              >
                <Box sx={{ position: 'relative', width: '100%', height: 90 }}>
                  <Image src={client.src} alt={client.alt} fill sizes="(max-width: 900px) 40vw, 20vw" style={{ objectFit: 'contain' }} />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
