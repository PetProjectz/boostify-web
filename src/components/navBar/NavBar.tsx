'use client';

import * as React from 'react';

import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import ColorModeToggle from '@/components/navBar/ColorModeToggle';
import useNavLineHandoff from '@/hooks/useNavLineHandoff';
import { DARK_SELECTOR, NAV_LINE_ATTR } from '@/cssSelectors';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
];

const StyledAppBar = styled(AppBar)({
  position: 'sticky',
  top: 0,
  backgroundColor: '#ffffff',
  backdropFilter: 'blur(12px)',
  border: 'none',
  boxShadow: '0 8px 24px color-mix(in srgb, var(--mui-palette-primary-main) 22%, transparent)',
  backgroundImage: 'none',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '2px',
    background:
      'linear-gradient(90deg, transparent, var(--mui-palette-primary-main) 20%, var(--mui-palette-primary-main) 80%, transparent)',
    transform: 'scaleX(0)',
    transformOrigin: 'center',
    transition: 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform',
  },
  [`&[${NAV_LINE_ATTR}="on"]::after`]: {
    transform: 'scaleX(1)',
  },
  '@media (prefers-reduced-motion: reduce)': {
    '&::after': {
      transition: 'none',
    },
  },
  [DARK_SELECTOR]: {
    backgroundColor: 'color-mix(in srgb, var(--mui-palette-brandSurface-deep) 97%, transparent)',
  },
});

export default function NavBar() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const navRef = useNavLineHandoff(pathname);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <StyledAppBar ref={navRef} enableColorOnDark sx={{ zIndex: 50 }}>
      <Container maxWidth="lg" disableGutters>
        <Box sx={{ minHeight: '78px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, sm: 3 }, position: 'relative' }}>
          <Box
            component={NextLink}
            href="/"
            aria-label="Boostify Home"
            sx={{
              display: 'flex',
              alignItems: 'center',
              zIndex: 1,
              '& img': { display: 'block', width: { xs: 148, sm: 176 }, height: 'auto' },
            }}
          >
            <Image
              src="/assets/brand/boostify-logo.webp"
              alt="Boostify"
              width={176}
              height={32}
              priority
            />
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, position: 'absolute', left: '50%', transform: 'translateX(-50%)', alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="text"
                component={NextLink}
                href={item.href}
                sx={{
                  color: isActive(item.href) ? 'brandSurface.accentText' : 'text.primary',
                  fontWeight: isActive(item.href) ? 800 : 700,
                  fontSize: '14px',
                  textTransform: 'none',
                  '&:hover': {
                    color: 'brandSurface.accentText',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1.5,
              alignItems: 'center',
              zIndex: 1,
            }}
          >
            <ColorModeToggle sx={{ color: 'brandSurface.accentText' }} />
            <Button
              variant="outlined"
              component={NextLink}
              href="/contact"
              sx={{
                borderColor: 'primary.main',
                color: 'brandSurface.accentText',
                fontWeight: 800,
                fontSize: '14px',
                textTransform: 'none',
                minHeight: '46px',
                minWidth: '160px',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                },
              }}
            >
              Get In Touch
            </Button>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 0.5, alignItems: 'center' }}>
            <ColorModeToggle
              size="medium"
              sx={{ color: 'brandSurface.accentText' }}
            />
            <IconButton
              aria-label="Menu button"
              onClick={toggleDrawer(true)}
              sx={{ color: 'brandSurface.accentText' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>

        <Drawer
          anchor="top"
          open={open}
          onClose={toggleDrawer(false)}
        >
          <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
              <IconButton onClick={toggleDrawer(false)}>
                <CloseRoundedIcon />
              </IconButton>
            </Box>

            {navItems.map((item) => (
              <MenuItem
                key={item.href}
                component={NextLink}
                href={item.href}
                onClick={toggleDrawer(false)}
                selected={isActive(item.href)}
              >
                {item.label}
              </MenuItem>
            ))}
            <Divider sx={{ my: 1 }} />
            <MenuItem>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                component={NextLink}
                href="/contact"
                onClick={toggleDrawer(false)}
              >
                Get In Touch
              </Button>
            </MenuItem>
          </Box>
        </Drawer>
      </Container>
    </StyledAppBar>
  );
}
