'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Image from 'next/image';
import NextLink from 'next/link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { brand } from '@/brand';

const heroPoints = [
  'Premium digital strategy and execution',
  'Modern branding, media, and technology solutions',
  'Built for startups, enterprises, and growing brands',
];

const cardBaseSx = {
  position: 'absolute',
  overflow: 'hidden',
  borderRadius: '22px',
  border: `1px solid ${brand.gold}73`,
  background: 'rgba(255,255,255,0.04)',
  boxShadow: '0 24px 60px rgba(0,0,0,0.28)',
  '& img': { objectFit: 'cover' as const, transition: 'transform 0.5s ease' },
  '&:hover img': { transform: 'scale(1.05)' },
};

function HeroSection() {
  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
        borderBottom: `5px solid ${brand.gold}`,
        background: `radial-gradient(circle at 15% 20%, ${brand.gold}1f, transparent 24%), radial-gradient(circle at 85% 75%, ${brand.gold}14, transparent 28%), linear-gradient(180deg, ${brand.navyDeep} 0%, ${brand.navySoft} 100%)`,
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
            gap: { xs: 5, md: 8 },
            alignItems: 'center',
            minHeight: { md: 720 },
            pt: { xs: 16, md: 18 },
            pb: { xs: 8, md: 10 },
          }}
        >
          {/* Content */}
          <Box>
            <Typography
              component="p"
              sx={{
                color: brand.gold,
                fontWeight: 800,
                textTransform: 'uppercase',
                fontSize: 13,
                letterSpacing: '2px',
                mb: 1,
              }}
            >
              Premium Digital Innovation
            </Typography>
            <Typography
              variant="h1"
              sx={{ fontSize: 'clamp(42px, 7vw, 78px)', lineHeight: 0.98, letterSpacing: '-0.07em', mb: 2.5, maxWidth: 760 }}
            >
              We Build Powerful Digital Brands For The Modern Future
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.84)', fontSize: 19, maxWidth: 660, mb: 3.5 }}>
              Boostify combines technology, strategy, and creative excellence to help ambitious
              businesses grow faster, stand out stronger, and lead confidently in the digital world.
            </Typography>

            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
              <Button
                component={NextLink}
                href="/contact"
                variant="contained"
                color="primary"
                sx={{ minHeight: 48, px: 3.5, background: `linear-gradient(180deg, ${brand.goldSoft}, ${brand.gold})` }}
              >
                Get Started
              </Button>
              <Button
                href="#services"
                variant="outlined"
                sx={{ minHeight: 48, px: 3.5, color: brand.gold2, borderColor: brand.gold, '&:hover': { background: brand.gold, color: brand.onGold, borderColor: brand.gold } }}
              >
                Explore Services
              </Button>
            </Stack>

            <Stack spacing={1.75} sx={{ mt: 3.5, maxWidth: 560 }}>
              {heroPoints.map((point) => (
                <Stack key={point} direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      flex: '0 0 auto',
                      background: `linear-gradient(180deg, ${brand.goldSoft}, ${brand.gold})`,
                      boxShadow: `0 0 18px ${brand.gold}a6`,
                    }}
                  />
                  <Typography sx={{ fontSize: 15, color: 'rgba(255,255,255,0.85)' }}>{point}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          {/* Visual */}
          <Box sx={{ position: 'relative', width: '100%', minHeight: { xs: 380, md: 560 } }}>
            {/* Main card */}
            <Box
              sx={{
                ...cardBaseSx,
                width: { xs: '100%', sm: '78%' },
                height: { xs: 260, md: 430 },
                right: 0,
                top: { xs: 0, md: 60 },
                position: { xs: 'relative', sm: 'absolute' },
                zIndex: 1,
              }}
            >
              <Image src="/assets/hero/hero-1.webp" alt="Digital solutions" fill sizes="(max-width: 900px) 100vw, 40vw" />
            </Box>
            {/* Top card */}
            <Box
              sx={{
                ...cardBaseSx,
                display: { xs: 'none', sm: 'block' },
                width: '44%',
                height: 200,
                left: 0,
                top: 0,
                zIndex: 2,
              }}
            >
              <Image src="/assets/hero/hero-2.webp" alt="Creative studio" fill sizes="20vw" />
            </Box>
            {/* Bottom card */}
            <Box
              sx={{
                ...cardBaseSx,
                display: { xs: 'none', sm: 'block' },
                width: '46%',
                height: 220,
                left: 20,
                bottom: 0,
                zIndex: 2,
              }}
            >
              <Image src="/assets/hero/hero-3.webp" alt="Technology" fill sizes="20vw" />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;
