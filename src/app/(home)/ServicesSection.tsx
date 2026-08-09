import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import SectionHeading from '@/components/common/SectionHeading';
import ScrollReveal from '@/components/common/ScrollReveal';
import { brand } from '@/brand';
import { services } from '@/services';

export default function ServicesSection() {
  return (
    <Box
      id="services"
      sx={{
        color: '#fff',
        py: 8,
        background: `radial-gradient(circle at 50% -20%, ${brand.gold}21, transparent 33%), linear-gradient(180deg, ${brand.navyDeep} 0%, ${brand.navy3} 100%)`,
      }}
    >
      <Container>
        <ScrollReveal>
          <SectionHeading
            tag="What We Do"
            title="Our Services"
            align="center"
            light
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
                  border: `1px solid ${brand.gold}bf`,
                  boxShadow: '0 20px 45px rgba(0,0,0,0.18)',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    borderColor: brand.gold,
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(180deg, rgba(2,10,22,0.15), rgba(2,10,22,0.9)), url('${service.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.25s ease',
                  },
                  '&:hover::before': {
                    transform: 'scale(1.04)',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 'auto 0 0',
                    p: 3.5,
                    zIndex: 1,
                  }}
                >
                  <Typography variant="h3" sx={{ fontSize: 24, mb: 1.25 }}>
                    {service.title}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.82)' }}>
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
