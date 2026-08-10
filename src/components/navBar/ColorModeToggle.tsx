import * as React from 'react';

import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import Box from '@mui/material/Box';
import IconButton, { IconButtonOwnProps } from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';

export default function ColorModeToggle(props: IconButtonOwnProps) {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return (
      <Box
        data-screenshot="toggle-mode"
        sx={(theme) => ({
          verticalAlign: 'bottom',
          display: 'inline-flex',
          width: '2.25rem',
          height: '2.25rem',
          borderRadius: (theme.vars || theme).shape.borderRadius,
          border: '1px solid',
          borderColor: (theme.vars || theme).palette.divider,
        })}
      />
    );
  }

  const resolvedMode = mode as 'light' | 'dark';
  const icon = {
    light: <LightModeIcon />,
    dark: <DarkModeIcon />,
  }[resolvedMode];

  const handleToggle = () => {
    setMode(resolvedMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <IconButton
      data-screenshot="toggle-mode"
      onClick={handleToggle}
      disableRipple
      size="small"
      aria-label={resolvedMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      {...props}
    >
      {icon}
    </IconButton>
  );
}
