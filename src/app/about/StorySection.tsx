import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import SectionHeading from '@/components/common/SectionHeading';
import ScrollReveal from '@/components/common/ScrollReveal';
import { DARK_SELECTOR } from '@/cssSelectors';
import { storyParagraphs } from '@/aboutContent';

export default function StorySection() {
  return (
    <Box sx={{ py: { xs: 6, sm: 7 }, bgcolor: 'background.default' }}>
      <Container>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1.06fr' },
            gap: { xs: 4, md: 10 },
            alignItems: 'center',
          }}
        >
          <ScrollReveal>
            <SectionHeading tag="Our Story" title="Our Background" />
            {storyParagraphs.map((text, i) => (
              <Typography key={i} sx={{ color: 'text.secondary', fontSize: 15, lineHeight: 1.7, mb: 2.5 }}>
                {text}
              </Typography>
            ))}
          </ScrollReveal>
          <ScrollReveal
            delay={0.15}
            aria-label="Boostify office branding"
            sx={{
              position: 'relative',
              minHeight: { xs: 300, md: 420 },
              borderRadius: '40px',
              overflow: 'hidden',
              boxShadow: '0 25px 55px rgba(4, 12, 29, 0.18)',
              backgroundImage:
                "linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03) 55%, rgba(255,255,255,0)), url('/assets/about/boostify-wall.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              [DARK_SELECTOR]: {
                backgroundImage:
                  "linear-gradient(90deg, rgba(2,10,22,0.16), rgba(2,10,22,0.06) 55%, rgba(2,10,22,0.02)), url('/assets/about/boostify-wall.webp')",
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
