'use client';

import React, { createContext, useEffect, useState } from 'react';
import { useColorScheme } from '@mui/material/styles';

enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

interface ThemeContextType {
  themeMode: ThemeMode;
  isThemeReady: boolean;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode, setMode } = useColorScheme();
  const [isThemeReady, setIsThemeReady] = useState(false);

  useEffect(() => {
    setIsThemeReady(true);
  }, []);

  const themeMode = (mode ?? ThemeMode.DARK) as ThemeMode;

  const setThemeMode = (mode: ThemeMode) => {
    setMode(mode);
  };

  const value = {
    themeMode,
    isThemeReady,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
export { ThemeContext, ThemeMode };
export type { ThemeContextType };
