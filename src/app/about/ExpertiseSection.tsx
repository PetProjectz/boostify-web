import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import MovieRoundedIcon from '@mui/icons-material/MovieRounded';
import AutoModeRoundedIcon from '@mui/icons-material/AutoModeRounded';

import SectionHeading from '@/components/common/SectionHeading';
import ScrollReveal from '@/components/common/ScrollReveal';
import { DARK_SELECTOR } from '@/cssSelectors';
import { expertise, type ExpertiseTitle } from '@/aboutContent';

const expertiseIcons: Record<ExpertiseTitle, React.ReactNode> = {
  'Web & Mobile Development': <CodeRoundedIcon />,
  'Digital Marketing': <CampaignRoundedIcon />,
  'Social Media Management': <ShareRoundedIcon />,
  'Business Process Automation': <AutoModeRoundedIcon />,
  'Brand Identity & Design': <BrushRoundedIcon />,
  'Creative Media Production': <MovieRoundedIcon />,
};

export default function ExpertiseSection() {
  return (
    <Box
      sx={{
        color: 'text.primary',
        py: { xs: 6, sm: 7 },
        background:
          'radial-gradient(circle at 50% -20%, color-mix(in srgb, var(--mui-palette-primary-main) 13%, transparent), transparent 33%), linear-gradient(180deg, var(--mui-palette-brandSurface-deep) 0%, var(--mui-palette-brandSurface-mid) 100%)',
      }}
    >
      <Container>
        <ScrollReveal>
          <SectionHeading tag="What We Excel At" title="Our Expertise" align="center" />
        </ScrollReveal>
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: 2 }}>
          {expertise.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.title}>
              <ScrollReveal
                delay={Math.min(index * 0.08, 0.3)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  gap: 2.25,
                  alignItems: 'flex-start',
                  p: 2.5,
                  borderRadius: '14px',
                  border: '1px solid color-mix(in srgb, var(--mui-palette-primary-main) 88%, transparent)',
                  background: '#fff',
                  transition: 'transform 0.25s ease, background 0.25s ease',
                  '&:hover': { transform: 'translateY(-3px)', background: '#faf6ef' },
                  [DARK_SELECTOR]: {
                    background: 'var(--mui-palette-brandSurface-cardTint)',
                    '&:hover': { background: 'var(--mui-palette-brandSurface-cardTintHover)' },
                  },
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
                    border: '1px solid var(--mui-palette-primary-main)',
                    color: '#5c3500',
                    [DARK_SELECTOR]: { color: 'brandSurface.accentText' },
                    '& svg': { fontSize: 32 },
                  }}
                >
                  {expertiseIcons[item.title]}
                </Box>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{ fontSize: 18, mb: 0.75, color: 'rgba(0,0,0,0.87)', [DARK_SELECTOR]: { color: 'text.primary' } }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{ color: 'rgba(0,0,0,0.6)', fontSize: 14, lineHeight: 1.45, [DARK_SELECTOR]: { color: 'text.secondary' } }}
                  >
                    {item.description}
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
