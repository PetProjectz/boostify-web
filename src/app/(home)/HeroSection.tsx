'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { alpha, useTheme } from '@mui/material/styles';

import { brand } from '@/brand';
import HeroSectionDesktop from './HeroSectionDesktop';
import HeroSectionMobile from './HeroSectionMobile';

function HeroSection() {
  const theme = useTheme();

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: theme.palette.common.white,
        borderBottom: `5px solid ${brand.gold}`,
        background: `radial-gradient(circle at 15% 20%, ${alpha(brand.gold, 0.12)}, transparent 24%), radial-gradient(circle at 85% 75%, ${alpha(brand.gold, 0.08)}, transparent 28%), linear-gradient(180deg, ${brand.navyDeep} 0%, ${brand.navySoft} 100%)`,
      }}
    >
      <Container>
        <HeroSectionDesktop />
        <HeroSectionMobile />
      </Container>
    </Box>
  );
}

export default HeroSection;
