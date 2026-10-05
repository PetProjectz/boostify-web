import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Image from 'next/image';

import SectionHeading from '@/components/common/SectionHeading';
import ScrollReveal from '@/components/common/ScrollReveal';
import { DARK_SELECTOR } from '@/cssSelectors';

const clients = [
  { src: '/assets/clients/goldlac-logo.jpg', alt: 'Paint Factory LK', href: 'https://paintfactory.lk' },
  { src: '/assets/clients/higrow-logo.png', alt: 'Hi-Grow Lanka', href: 'https://higrowlanka.lk' },
  { src: '/assets/clients/samtes-logo.png', alt: 'Samtes' },
  { src: '/assets/clients/slaughter-logo.jpg', alt: 'Slaughter' },
  { src: '/assets/clients/calgary-handyman-logo.png', alt: 'Calgary Handyman', href: 'https://calgary-handyman.com' },
];

const COPIES = 3;
const SLIDE_DURATION = '30s';
const GAP = { xs: 2, md: 8 };

/** Edge fade so logos dissolve into the section instead of being clipped. */
const EDGE_FADE =
  'linear-gradient(to right, transparent, #000 56px, #000 calc(100% - 56px), transparent)';

export default function ClientsSection() {
  return (
    <Box
      sx={{
        pb: { xs: 7, sm: 8 },
        backgroundColor: 'var(--mui-palette-brandSurface-mid)',
        [DARK_SELECTOR]: { backgroundColor: 'var(--mui-palette-background-default)' },
      }}
    >
      <Container>
        <ScrollReveal>
          <SectionHeading tag="Trusted By" title="Our Clients" align="center" />
        </ScrollReveal>
      </Container>
      <ScrollReveal delay={0.08} sx={{ mt: 4 }}>
        <Box
          sx={{
            overflow: 'hidden',
            py: 1,
            maskImage: EDGE_FADE,
            WebkitMaskImage: EDGE_FADE,
            '&:hover .ClientsSection-track': { animationPlayState: 'paused' },
            '@media (prefers-reduced-motion: reduce)': {
              overflowX: 'auto',
              maskImage: 'none',
              WebkitMaskImage: 'none',
            },
          }}
        >
          <Box
            className="ClientsSection-track"
            sx={{
              display: 'flex',
              width: 'max-content',
              animation: `ClientsSection-slide ${SLIDE_DURATION} linear infinite`,
              // Each card carries its own right margin rather than the track
              // using `gap`, so one copy is exactly 100%/COPIES of the track
              // at every breakpoint and the loop stays seamless.
              '@keyframes ClientsSection-slide': {
                from: { transform: 'translate3d(0, 0, 0)' },
                to: { transform: `translate3d(${-100 / COPIES}%, 0, 0)` },
              },
              '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
            }}
          >
            {Array.from({ length: COPIES }, (_, copy) =>
              clients.map((client) => {
                // Only the first copy is real content; the rest are visual
                // padding for the loop, so they stay out of the a11y tree and
                // out of the tab order.
                const isClone = copy > 0;
                return (
                  <Box
                    key={`${copy}-${client.alt}`}
                    aria-hidden={isClone || undefined}
                    sx={{ flex: '0 0 auto', width: { xs: 170, md: 220 }, mr: GAP }}
                  >
                    <Paper
                      elevation={0}
                      variant="outlined"
                      {...(client.href
                        ? {
                            component: Link,
                            href: client.href,
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            ...(isClone && { tabIndex: -1 }),
                          }
                        : {})}
                      sx={{
                        minHeight: 138,
                        height: '100%',
                        borderRadius: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2.25,
                        boxShadow: '0 18px 45px rgba(7, 18, 45, 0.08)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        ...(client.href && {
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: '0 22px 50px rgba(7, 18, 45, 0.14)',
                          },
                        }),
                      }}
                    >
                      <Box sx={{ position: 'relative', width: '100%', height: 90 }}>
                        <Image
                          src={client.src}
                          alt={isClone ? '' : client.alt}
                          fill
                          sizes="220px"
                          style={{ objectFit: 'contain' }}
                        />
                      </Box>
                    </Paper>
                  </Box>
                );
              }),
            )}
          </Box>
        </Box>
      </ScrollReveal>
    </Box>
  );
}
