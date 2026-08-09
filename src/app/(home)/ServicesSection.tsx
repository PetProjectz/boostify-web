import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import SectionHeading from '@/components/common/SectionHeading';
import ScrollReveal from '@/components/common/ScrollReveal';
import { DARK_SELECTOR } from '@/cssSelectors';
import { services } from '@/services';

const darkScrim =
  'linear-gradient(180deg, var(--mui-palette-brandSurface-scrimStart), var(--mui-palette-brandSurface-scrimEnd))';

export default function ServicesSection() {
  return (
    <Box
      id="services"
      sx={{
        color: 'text.primary',
        py: 8,
        background:
          'radial-gradient(circle at 50% -20%, color-mix(in srgb, var(--mui-palette-primary-main) 13%, transparent), transparent 33%), linear-gradient(180deg, var(--mui-palette-brandSurface-deep) 0%, var(--mui-palette-brandSurface-mid) 100%)',
      }}
    >
      <Container>
        <ScrollReveal>
          <SectionHeading
            tag="What We Do"
            title="Our Services"
            align="center"
          />
        </ScrollReveal>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {services.map((service, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={service.title}>
              <ScrollReveal
                delay={Math.min(index * 0.1, 0.3)}
                sx={{
                  position: 'relative',
                  minHeight: 300,
                  height: '100%',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '1px solid color-mix(in srgb, var(--mui-palette-primary-main) 75%, transparent)',
                  boxShadow: '0 20px 45px rgba(0,0,0,0.18)',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    borderColor: 'primary.main',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url('${service.imageLight}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    transition: 'transform 0.25s ease',
                  },
                  '&:hover::before': {
                    transform: 'scale(1.04)',
                  },
                  [DARK_SELECTOR]: {
                    '&::before': {
                      backgroundImage: `${darkScrim}, url('${service.image}')`,
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 'auto 0 0',
                    p: 3.5,
                    pt: 2.5,
                    zIndex: 1,
                    background: 'linear-gradient(180deg, transparent, var(--mui-palette-brandSurface-scrimEnd) 45%)',
                    borderTop: '1px solid color-mix(in srgb, var(--mui-palette-primary-main) 33%, transparent)',
                    backdropFilter: 'blur(6px)',
                    [DARK_SELECTOR]: {
                      background: 'none',
                      borderTop: 'none',
                      backdropFilter: 'none',
                    },
                  }}
                >
                  <Typography variant="h3" sx={{ fontSize: 24, mb: 1.25, color: 'text.primary' }}>
                    {service.title}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {service.description}
                  </Typography>
                </Box>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
