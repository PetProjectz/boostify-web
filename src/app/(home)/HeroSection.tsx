import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import HeroSectionDesktop from './HeroSectionDesktop';
import HeroSectionMobile from './HeroSectionMobile';

const glow =
  'radial-gradient(circle at 15% 20%, color-mix(in srgb, var(--mui-palette-primary-main) 12%, transparent), transparent 24%), radial-gradient(circle at 85% 75%, color-mix(in srgb, var(--mui-palette-primary-main) 8%, transparent), transparent 28%)';

function HeroSection() {
  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: 'text.primary',
        borderBottom: '2px solid var(--mui-palette-primary-main)',
        background: `${glow}, linear-gradient(180deg, var(--mui-palette-brandSurface-deep) 0%, var(--mui-palette-brandSurface-soft) 100%)`,
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
