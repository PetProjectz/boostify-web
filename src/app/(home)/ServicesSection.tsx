import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import SectionHeading from '@/components/common/SectionHeading';
import { brand } from '@/brand';

const services = [
  {
    image: '/assets/services/web-development.webp',
    title: 'Web and Mobile Application Development',
    description:
      'Advanced web, mobile, and AI application development leveraging modern frameworks, machine learning, cloud technologies, and intelligent automation to create secure, scalable, and high-performance digital solutions.',
  },
  {
    image: '/assets/services/blockchain.webp',
    title: 'Business Process Automation',
    description:
      'Streamline operations with intelligent automation that reduces manual work, improves accuracy, and scales your business processes across teams and systems.',
  },
  {
    image: '/assets/services/social-media.webp',
    title: 'Performance Marketing & Social Commerce',
    description:
      'Turn clicks into customers and scale your revenue. We move past vanity metrics like "likes" to focus on what matters: leads and sales. We design data-driven ad campaigns and high-converting WhatsApp funnels that directly impact your bottom line.',
  },
  {
    image: '/assets/services/digital-marketing.webp',
    title: 'Advanced Search & Discoverability (SEO + GEO)',
    description:
      'Be found exactly when your customers are looking. We ensure your business dominates search results—whether someone is searching on Google, asking AI engines like ChatGPT, or looking for local services on Maps.',
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
        <SectionHeading tag="What We Do" title="Our Services" align="center" light />
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {services.map((service) => (
            <Grid size={{ xs: 12, md: 6 }} key={service.title}>
              <Box
                sx={{
                  position: 'relative',
                  minHeight: 300,
                  height: '100%',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: `1px solid ${brand.gold}bf`,
                  boxShadow: '0 20px 45px rgba(0,0,0,0.18)',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                  '&:hover': { transform: 'translateY(-5px)', borderColor: brand.gold },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(180deg, rgba(2,10,22,0.15), rgba(2,10,22,0.9)), url('${service.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.25s ease',
                  },
                  '&:hover::before': { transform: 'scale(1.04)' },
                }}
              >
                <Box sx={{ position: 'absolute', inset: 'auto 0 0', p: 3.5, zIndex: 1 }}>
                  <Typography variant="h3" sx={{ fontSize: 24, mb: 1.25 }}>
                    {service.title}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.82)' }}>{service.description}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
