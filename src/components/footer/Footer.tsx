import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import Copyright from '@/components/footer/Copyright';
import ThemedImage from '@/components/common/ThemedImage';
import { DARK_SELECTOR } from '@/cssSelectors';
import { services } from '@/services';
import { socialLinks } from '@/socialLinks';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
];

const socials = [
  { icon: <FacebookIcon fontSize="small" />, href: socialLinks.facebook, label: 'Facebook' },
  { icon: <InstagramIcon fontSize="small" />, href: socialLinks.instagram, label: 'Instagram' },
  { icon: <LinkedInIcon fontSize="small" />, href: socialLinks.linkedin, label: 'LinkedIn' },
];

const headingSx = { color: 'text.primary', fontSize: 15, fontWeight: 900, mb: 1.25 } as const;
const linkSx = {
  color: 'text.secondary',
  fontSize: 13,
  lineHeight: 1.8,
  display: 'block',
  '&:hover': { color: 'brandSurface.accentText' },
} as const;

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        color: 'text.primary',
        pt: 4,
        background: '#ffffff',
        boxShadow: '0 -8px 24px color-mix(in srgb, var(--mui-palette-primary-main) 22%, transparent)',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '2px',
          background:
            'linear-gradient(90deg, transparent, var(--mui-palette-primary-main) 20%, var(--mui-palette-primary-main) 80%, transparent)',
        },
        [DARK_SELECTOR]: {
          background:
            'radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--mui-palette-primary-main) 8%, transparent), transparent 24%), linear-gradient(180deg, var(--mui-palette-brandSurface-deep) 0%, var(--mui-palette-brandSurface-mid) 100%)',
        },
      }}
    >
      <Container>
        <Grid container spacing={4} sx={{ pb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Box
              component={NextLink}
              href="/"
              aria-label="Boostify Home"
              sx={{
                display: 'inline-flex',
                mb: 2,
                '& img': { display: 'block', width: 176, height: 'auto' },
              }}
            >
              <ThemedImage
                lightSrc="/assets/brand/boostify-logo-light.webp"
                darkSrc="/assets/brand/boostify-logo-dark.webp"
                alt="Boostify"
                width={176}
                height={32}
              />
            </Box>
            <Typography sx={{ ...linkSx, maxWidth: 320 }}>
              We engineer digital transformation through cutting-edge technology, intelligent
              automation, and data-driven innovation.
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography sx={headingSx}>Quick Links</Typography>
            {quickLinks.map((link) => (
              <Link key={link.href} component={NextLink} href={link.href} sx={linkSx}>
                {link.label}
              </Link>
            ))}
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 3 }}>
            <Typography sx={headingSx}>Services</Typography>
            {services.map((service) => (
              <Typography key={service.title} sx={linkSx}>
                {service.title}
              </Typography>
            ))}
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography sx={headingSx}>Contact Info</Typography>
            <Typography sx={linkSx}>Kurunegala, Sri Lanka</Typography>
            <Link href="mailto:info@boostify.lk" sx={linkSx}>
              info@boostify.lk
            </Link>
            <Link href="tel:+94713598928" sx={linkSx}>
              +94 71 359 8928
            </Link>
            <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
              {socials.map((s) => (
                <IconButton
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  size="small"
                  sx={{
                    color: 'text.primary',
                    border: '1px solid var(--mui-palette-primary-main)',
                    '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' },
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', py: 1.5, textAlign: 'center' }}>
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
}
