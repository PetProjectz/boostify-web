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
  title: 'Boostify - Digital Marketing Agency',
  description:
    'Boostify combines technology, strategy, and creative excellence to help ambitious businesses grow faster and lead confidently in the digital world.',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <MuiThemeProvider theme={theme}>
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
