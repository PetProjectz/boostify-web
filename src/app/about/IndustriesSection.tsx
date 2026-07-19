import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import FactoryRoundedIcon from '@mui/icons-material/FactoryRounded';
import MonitorHeartRoundedIcon from '@mui/icons-material/MonitorHeartRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';

import SectionHeading from '@/components/common/SectionHeading';
import { brand } from '@/brand';

const industries = [
  { icon: <FactoryRoundedIcon />, title: 'Manufacturing', description: 'Automation, production systems, industrial branding, and digital transformation.' },
  { icon: <MonitorHeartRoundedIcon />, title: 'Healthcare', description: 'Healthcare marketing, patient engagement, and digital service platforms.' },
  { icon: <SchoolRoundedIcon />, title: 'Education', description: 'Educational institutions, training centers, and e-learning platforms.' },
  { icon: <ShoppingCartRoundedIcon />, title: 'Retail & E-Commerce', description: 'Online stores, customer acquisition, digital advertising, and sales optimization.' },
  { icon: <HotelRoundedIcon />, title: 'Hospitality & Tourism', description: 'Hotels, restaurants, travel businesses, and destination marketing.' },
  { icon: <RocketLaunchRoundedIcon />, title: 'Startups & SMEs', description: 'Complete digital solutions for growing businesses, from branding to scalable technology platforms.' },
];

export default function IndustriesSection() {
  return (
    <Box sx={{ py: { xs: 6, sm: 7 }, bgcolor: 'background.default' }}>
      <Container>
        <SectionHeading tag="Our Clients" title="Industries We Serve" align="center" />
        <Grid container spacing={2.25} sx={{ mt: 2 }}>
          {industries.map((industry) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={industry.title}>
              <Paper
                elevation={0}
                variant="outlined"
                sx={{
                  height: '100%',
                  minHeight: 170,
                  borderRadius: '12px',
                  p: 2,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 14px 32px rgba(5, 18, 45, 0.08)',
                }}
              >
                <Box sx={{ color: brand.gold2, mb: 1.25, '& svg': { fontSize: 44 } }}>{industry.icon}</Box>
                <Typography variant="h3" sx={{ fontSize: 14, mb: 1, color: 'text.primary' }}>
                  {industry.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 12, lineHeight: 1.35 }}>
                  {industry.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
