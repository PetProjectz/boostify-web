import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import Copyright from '@/components/footer/Copyright';
import { brand } from '@/brand';
import { socialLinks } from '@/socialLinks';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const services = [
  'Web & Mobile Application Development',
  'Advanced Search & Discoverability (SEO + GEO)',
  'Performance Marketing & Social Commerce',
  'Blockchain & Digital Ledger Solutions',
];

const socials = [
  { icon: <FacebookIcon fontSize="small" />, href: socialLinks.facebook, label: 'Facebook' },
  { icon: <InstagramIcon fontSize="small" />, href: socialLinks.instagram, label: 'Instagram' },
  { icon: <LinkedInIcon fontSize="small" />, href: socialLinks.linkedin, label: 'LinkedIn' },
];

const headingSx = { color: '#fff', fontSize: 15, fontWeight: 900, mb: 1.25 } as const;
const linkSx = {
  color: 'rgba(255,255,255,0.7)',
  fontSize: 13,
  lineHeight: 1.8,
  display: 'block',
  '&:hover': { color: brand.gold2 },
} as const;

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        color: '#fff',
        pt: 4,
        background: `radial-gradient(circle at 0% 0%, ${brand.gold}14, transparent 24%), linear-gradient(180deg, ${brand.navyDeep} 0%, #030a15 100%)`,
      }}
    >
      <Container>
        <Grid container spacing={4} sx={{ pb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Box component={NextLink} href="/" sx={{ display: 'inline-flex', mb: 1.5 }}>
              <Image src="/assets/brand/boostify-logo.webp" alt="Boostify" width={80} height={28} style={{ height: 'auto', width: 80, objectFit: 'contain' }} />
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
            {services.map((s) => (
              <Typography key={s} sx={linkSx}>
                {s}
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
                    color: '#fff',
                    border: `1px solid ${brand.gold}`,
                    '&:hover': { backgroundColor: brand.gold, color: brand.onGold },
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.07)', py: 1.5, textAlign: 'center' }}>
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
}
