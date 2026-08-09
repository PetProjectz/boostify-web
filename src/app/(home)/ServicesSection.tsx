import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import SectionHeading from '@/components/common/SectionHeading';
import ScrollReveal from '@/components/common/ScrollReveal';
import { brand } from '@/brand';

const services = [
  {
    image: '/assets/services/social-media.webp',
    title: 'Social Media & Digital Growth',
    description:
      'Strategic social media management that grows your audience. From engaging posts, videos, and campaign content to optimized paid advertising that connects your brand with the right people.',
  },
  {
    image: '/assets/services/web-development.webp',
    title: 'Web and Mobile Application Development',
    description:
      'Web, mobile, and AI application development built on modern frameworks, machine learning, and cloud technologies to deliver secure, scalable, high-performance solutions.',
  },
  {
    image: '/assets/services/blockchain.webp',
    title: 'Business Process Automation',
    description:
      'Streamline operations with intelligent automation that reduces manual work, improves accuracy, and scales your business processes across teams and systems.',
  },
  {
    image: '/assets/services/digital-marketing.webp',
    title: 'Advanced Search & Discoverability',
    description:
      'Get found wherever customers search. We combine SEO, Generative Engine Optimization (GEO), and local search to boost your visibility across search engines, AI platforms, and maps.',
  },
];

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
