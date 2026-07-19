import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import MovieRoundedIcon from '@mui/icons-material/MovieRounded';

import SectionHeading from '@/components/common/SectionHeading';
import { brand } from '@/brand';

const expertise = [
  {
    icon: <CodeRoundedIcon />,
    title: 'Web & Mobile Development',
    description:
      'Custom websites and mobile applications designed with modern technologies, intuitive user experiences, and scalable architectures.',
  },
  {
    icon: <CampaignRoundedIcon />,
    title: 'Digital Marketing',
    description:
      'Performance-driven campaigns that increase visibility, generate quality leads, and maximize your return on investment.',
  },
  {
    icon: <ShareRoundedIcon />,
    title: 'Social Media Management',
    description:
      "Creative content planning, audience engagement, and brand growth strategies across today's leading social platforms.",
  },
  {
    icon: <HubRoundedIcon />,
    title: 'Blockchain Solutions',
    description:
      'Secure and scalable blockchain applications that improve transparency, trust, and operational efficiency.',
  },
  {
    icon: <BrushRoundedIcon />,
    title: 'Brand Identity & Design',
    description:
      'Building memorable brands through professional logos, visual identity systems, and compelling marketing materials.',
  },
  {
    icon: <MovieRoundedIcon />,
    title: 'Creative Media Production',
    description:
      'Professional photography, videography, promotional content, and visual storytelling that strengthens your brand presence.',
  },
];

export default function ExpertiseSection() {
  return (
    <Box
      sx={{
        color: '#fff',
        py: { xs: 6, sm: 7 },
        background: `radial-gradient(circle at 50% -20%, ${brand.gold}21, transparent 33%), linear-gradient(180deg, ${brand.navyDeep} 0%, ${brand.navy3} 100%)`,
      }}
    >
      <Container>
        <SectionHeading tag="What We Excel At" title="Our Expertise" align="center" light />
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: 2 }}>
          {expertise.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.title}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  gap: 2.25,
                  alignItems: 'flex-start',
                  p: 2.5,
                  borderRadius: '14px',
                  border: `1px solid ${brand.gold}e0`,
                  background: 'rgba(255,255,255,0.025)',
                  transition: 'transform 0.25s ease, background 0.25s ease',
                  '&:hover': { transform: 'translateY(-3px)', background: 'rgba(255,255,255,0.055)' },
                }}
              >
                <Box
                  sx={{
                    width: 58,
                    height: 58,
                    flexShrink: 0,
                    borderRadius: '15px',
                    display: 'grid',
                    placeItems: 'center',
                    border: `1px solid ${brand.gold}`,
                    color: brand.gold2,
                    '& svg': { fontSize: 32 },
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography variant="h3" sx={{ fontSize: 18, mb: 0.75, color: '#fff' }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.82)', fontSize: 14, lineHeight: 1.45 }}>
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
