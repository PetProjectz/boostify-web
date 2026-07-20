import * as React from 'react';
import type { Metadata } from 'next';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import PageHero from '@/components/common/PageHero';
import CtaSection from '@/components/common/CtaSection';
import ContactForm from '@/app/contact/ContactForm';
import { brand } from '@/brand';
import { socialLinks } from '@/socialLinks';

export const metadata: Metadata = {
  title: 'Contact Us - Boostify',
  description: 'Ready to boost your digital presence? Get in touch with us today.',
};

const contactItems = [
  { icon: <LocationOnRoundedIcon />, title: 'Location', value: 'Kurunegala, Sri Lanka' },
  { icon: <EmailRoundedIcon />, title: 'Email', value: 'info@boostify.lk', href: 'mailto:info@boostify.lk' },
  { icon: <PhoneRoundedIcon />, title: 'Phone', value: '+94 71 359 8928', href: 'tel:+94713598928' },
  { icon: <WhatsAppIcon />, title: 'WhatsApp', value: '+94 71 359 8928', href: 'https://wa.me/94713598928' },
];

const socials = [
  { icon: <FacebookIcon fontSize="small" />, href: socialLinks.facebook, label: 'Facebook' },
  { icon: <InstagramIcon fontSize="small" />, href: socialLinks.instagram, label: 'Instagram' },
  { icon: <LinkedInIcon fontSize="small" />, href: socialLinks.linkedin, label: 'LinkedIn' },
];

export default function Contact() {
  return (
    <>
      <PageHero
        tag="Contact Us"
        title="Let's Work Together"
        subtitle="Ready to boost your digital presence? Get in touch with us today."
      />

      <Box sx={{ py: { xs: 6, sm: 7 }, bgcolor: 'background.default' }}>
        <Container>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 7 }}>
              <ContactForm />
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Stack spacing={2.75}>
                {/* Contact information */}
                <Paper
                  elevation={0}
                  variant="outlined"
                  sx={{ p: { xs: 3, sm: 3.5 }, borderRadius: '18px', boxShadow: '0 18px 45px rgba(7, 18, 45, 0.10)' }}
                >
                  <Typography variant="h2" sx={{ fontSize: 30, mb: 3, color: 'text.primary' }}>
                    Contact Information
                  </Typography>
                  <Stack spacing={2.25}>
                    {contactItems.map((item) => (
                      <Box key={item.title} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 54,
                            height: 54,
                            flexShrink: 0,
                            borderRadius: '15px',
                            display: 'grid',
                            placeItems: 'center',
                            border: `1px solid ${brand.gold}`,
                            color: brand.goldDark,
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Box>
                          <Typography variant="h3" sx={{ fontSize: 16, color: 'text.primary' }}>
                            {item.title}
                          </Typography>
                          {item.href ? (
                            <Link
                              href={item.href}
                              target={item.href.startsWith('http') ? '_blank' : undefined}
                              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              sx={{ color: 'text.secondary', fontSize: 14 }}
                            >
                              {item.value}
                            </Link>
                          ) : (
                            <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>{item.value}</Typography>
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Paper>

                {/* Promo card (always dark brand look) */}
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, sm: 3.5 },
                    borderRadius: '18px',
                    color: '#fff',
                    overflow: 'hidden',
                    background: `linear-gradient(180deg, rgba(2,10,22,0.72), rgba(2,10,22,0.95)), url('/assets/services/social-media.webp') center/cover`,
                  }}
                >
                  <Typography
                    component="p"
                    sx={{ color: brand.gold, fontWeight: 800, textTransform: 'uppercase', fontSize: 13, letterSpacing: '2px', mb: 1 }}
                  >
                    Connect With Us
                  </Typography>
                  <Typography variant="h2" sx={{ fontSize: 26, mb: 1.5, color: '#fff' }}>
                    Let&apos;s Create Something Amazing
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.82)' }}>
                    Whether you&apos;re looking to launch a new campaign, revamp your website, or build your
                    social media presence, we&apos;re here to help you succeed.
                  </Typography>
                  <Stack direction="row" spacing={1.5} sx={{ mt: 2.75 }}>
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
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
