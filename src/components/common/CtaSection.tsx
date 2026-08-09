import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import NextLink from 'next/link';
import Typography from '@mui/material/Typography';

import ScrollReveal from '@/components/common/ScrollReveal';

/**
 * "Ready to Boost Your Business?" call-to-action band, styled with the
 * navy + gold brand look, adapted per light/dark color scheme.
 */
export default function CtaSection() {
  return (
    <Box sx={{ bgcolor: 'background.default', pb: 2 }}>
      <Container sx={{ px: { xs: 2, sm: 3 } }}>
        <ScrollReveal
          amount={0.4}
          delay={0.2}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            color: 'text.primary',
            background:
              'radial-gradient(circle at 6% 58%, color-mix(in srgb, var(--mui-palette-primary-light) 30%, transparent), transparent 20%), linear-gradient(90deg, var(--mui-palette-brandSurface-mid), var(--mui-palette-brandSurface-deep))',
            boxShadow: '0 18px 35px rgba(2, 10, 22, 0.15)',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '230px 1fr 210px' },
            alignItems: 'center',
            gap: { xs: 2.5, md: 2 },
            px: { xs: 3, md: 3.5 },
            py: { xs: 3.5, md: 2.5 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box
            component="svg"
            viewBox="0 0 160 90"
            sx={{
              width: 140,
              height: 72,
              color: 'brandSurface.accentText',
              opacity: 0.9,
              display: { xs: 'none', md: 'block' },
            }}
          >
            <path d="M38 70C63 44 83 25 124 14c-9 38-28 61-58 78" fill="none" stroke="currentColor" strokeWidth={3} />
            <path d="M74 37l22 22" fill="none" stroke="currentColor" strokeWidth={3} />
            <circle cx="105" cy="34" r="7" fill="none" stroke="currentColor" strokeWidth={3} />
            <path d="M50 57c-15-1-26 4-36 17 16-4 28-1 36 7" fill="none" stroke="currentColor" strokeWidth={3} />
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '-0.03em' }}>
              Ready to Boost Your Business?
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 14, mt: 0.5 }}>
              Let&apos;s discuss how we can help you achieve your digital marketing goals.
            </Typography>
          </Box>

          <Button
            component={NextLink}
            href="/contact"
            variant="contained"
            color="primary"
            sx={{
              justifySelf: { xs: 'center', md: 'end' },
              minWidth: 160,
              height: 48,
              background: 'linear-gradient(180deg, var(--mui-palette-brandAccent-goldSoft), var(--mui-palette-primary-main))',
            }}
          >
            Get In Touch&nbsp;›
          </Button>
        </ScrollReveal>
      </Container>
    </Box>
  );
}
