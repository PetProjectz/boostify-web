import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';

import SectionHeading from '@/components/common/SectionHeading';
import ScrollReveal from '@/components/common/ScrollReveal';

const reasons = [
  {
    icon: <Diversity3RoundedIcon />,
    title: 'Expert Team',
    description:
      'Our team combines years of industry experience with cutting-edge knowledge to deliver exceptional results.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Data-Driven Approach',
    description:
      'Every decision is backed by analytics and insights, ensuring your marketing budget delivers maximum impact.',
  },
  {
    icon: <VerifiedUserRoundedIcon />,
    title: 'Tailored Solutions',
    description:
      'We do not believe in one-size-fits-all. Every strategy is customized to your unique business goals.',
  },
  {
    icon: <WorkspacePremiumRoundedIcon />,
    title: 'Proven Track Record',
    description:
      'With 25+ successful projects, we have helped businesses across industries achieve their digital goals.',
  },
  {
    icon: <AutoAwesomeRoundedIcon />,
    title: 'Creative Excellence',
    description:
      'We blend creativity with strategy to produce campaigns that not only look great but drive real results.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'End-to-End Support',
    description:
      'From concept to execution and beyond, we are with you every step of your digital journey.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <Box sx={{ py: { xs: 7, sm: 8 }, bgcolor: 'background.default' }}>
      <Container>
        <ScrollReveal>
          <SectionHeading tag="The Boostify Advantage" title="Why Choose Us?" align="center" />
        </ScrollReveal>
        <Grid container spacing={2.5} sx={{ mt: 2 }}>
          {reasons.map((reason, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={reason.title}>
              <ScrollReveal delay={Math.min(index * 0.08, 0.3)} sx={{ height: '100%' }}>
                <Paper
                  elevation={0}
                  variant="outlined"
                  sx={{
                    height: '100%',
                    borderRadius: '18px',
                    p: 3.5,
                    boxShadow: '0 18px 45px rgba(7, 18, 45, 0.10)',
                    transition: 'transform 0.25s ease',
                    '&:hover': { transform: 'translateY(-4px)' },
                  }}
                >
                  <Box
                    sx={{
                      width: 62,
                      height: 62,
                      borderRadius: '18px',
                      display: 'grid',
                      placeItems: 'center',
                      mb: 2.25,
                      background: 'linear-gradient(180deg, #fff6df, #fff1cb)',
                      border: '1px solid color-mix(in srgb, var(--mui-palette-primary-main) 35%, transparent)',
                      boxShadow: '0 10px 20px color-mix(in srgb, var(--mui-palette-primary-main) 12%, transparent)',
                      color: 'primary.dark',
                      '& svg': { fontSize: 30 },
                    }}
                  >
                    {reason.icon}
                  </Box>
                  <Typography variant="h3" sx={{ fontSize: 21, mb: 1.25, color: 'text.primary' }}>
                    {reason.title}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>{reason.description}</Typography>
                </Paper>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
