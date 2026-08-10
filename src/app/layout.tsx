import * as React from 'react';
import type { Metadata } from 'next';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import theme from '@/theme';
import AppShell from '@/app/AppShell';
import ThemeProvider from '@/contexts/ThemeContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://boostify.lk'),
  title: {
    default: 'Boostify',
    template: 'Boostify | %s',
  },
  description:
    'Boostify combines technology, strategy, and creative excellence to help ambitious businesses grow faster and lead confidently in the digital world.',
  keywords: [
    'boostify',
    'boostify lanka',
    'boostify.lk',
    'digital marketing agency Sri Lanka',
    'web and mobile app development',
    'business process automation',
    'social media marketing',
    'social commerce',
    'SEO Sri Lanka',
    'brand identity and design',
    'creative media production',
    'social media management',
  ],
  authors: [{ name: 'Boostify' }],
  creator: 'Boostify',
  publisher: 'Boostify',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://boostify.lk',
    siteName: 'Boostify',
    title: 'Boostify - Digital Transformation Partner',
    description:
      'Boostify combines technology, strategy, and creative excellence to help ambitious businesses grow faster online.',
    images: [
      {
        url: '/assets/brand/boostify-logo.webp',
        width: 1200,
        height: 630,
        alt: 'Boostify Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boostify - Digital Transformation Partner',
    description:
      'Boostify combines technology, strategy, and creative excellence to help ambitious businesses grow faster online.',
    images: ['/assets/brand/boostify-logo.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://boostify.lk',
  },
  // verification: {
  //   google: 'add-google-search-console-verification-code-here',
  // },
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" defaultMode="dark" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <MuiThemeProvider theme={theme} defaultMode="dark">
            <CssBaseline />
            <ThemeProvider>
              <AppShell>
                {props.children}
              </AppShell>
            </ThemeProvider>
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
