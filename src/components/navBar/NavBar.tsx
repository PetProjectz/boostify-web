'use client';

import * as React from 'react';

import { alpha, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import ColorModeIconDropdown from '@/components/navBar/ColorModeIconDropDown';
import { brand } from '@/brand';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  backgroundColor: alpha(brand.navy, 0.97),
  backdropFilter: 'blur(12px)',
  borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
  boxShadow: 'none',
  backgroundImage: 'none',
}));

export default function NavBar() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <StyledAppBar enableColorOnDark sx={{ zIndex: 50 }}>
      <Container maxWidth="lg" disableGutters>
        <Box sx={{ minHeight: '78px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, position: 'relative' }}>
          <Box component={NextLink} href="/" aria-label="Boostify Home" sx={{ display: 'flex', alignItems: 'center', zIndex: 1 }}>
            <Image src="/assets/brand/boostify-logo.webp" alt="Boostify" width={80} height={28} style={{ height: 'auto', width: 80, objectFit: 'contain' }} priority />
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, position: 'absolute', left: '50%', transform: 'translateX(-50%)', alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="text"
                component={NextLink}
                href={item.href}
                sx={{
                  color: isActive(item.href) ? brand.gold2 : 'common.white',
                  fontWeight: isActive(item.href) ? 800 : 700,
                  fontSize: '14px',
                  textTransform: 'none',
                  '&:hover': {
                    color: brand.gold2,
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
            <ColorModeIconDropdown sx={{ color: brand.gold2 }} />
            <Button
              variant="outlined"
              component={NextLink}
              href="/contact"
              sx={{
                borderColor: brand.gold,
                color: brand.gold2,
                fontWeight: 800,
                fontSize: '14px',
                textTransform: 'none',
                minHeight: '46px',
                minWidth: '160px',
                '&:hover': {
                  backgroundColor: brand.gold,
                  color: brand.onGold,
                },
              }}
            >
              Get In Touch
            </Button>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 0.5, alignItems: 'center' }}>
            <ColorModeIconDropdown size="medium" sx={{ color: brand.gold2 }} />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)} sx={{ color: brand.gold2 }}>
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
