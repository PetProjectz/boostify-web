"use client";

import { alpha, createTheme, PaletteColor } from "@mui/material/styles";
import { Inter } from "next/font/google";

const inter = Inter({
    weight: ["400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    display: "swap",
});

interface BrandSurfacePalette {
    deep: string;
    mid: string;
    soft: string;
    cardTint: string;
    cardTintHover: string;
    scrimStart: string;
    scrimEnd: string;
    accentText: string;
}

interface BrandAccentPalette {
    goldSoft: string;
}

declare module "@mui/material/styles" {
    interface Theme {
        getAlphaColor: (
            colorKey: keyof Theme["palette"],
            opacity: number,
            shade?: "light" | "main" | "dark"
        ) => string;
    }
    interface ThemeOptions {
        getAlphaColor?: (
            colorKey: keyof Theme["palette"],
            opacity: number,
            shade?: "light" | "main" | "dark"
        ) => string;
    }
    interface Palette {
        brandSurface: BrandSurfacePalette;
        brandAccent: BrandAccentPalette;
    }
    interface PaletteOptions {
        brandSurface?: BrandSurfacePalette;
        brandAccent?: BrandAccentPalette;
    }
}

// All brand hex values are defined here, once, directly in the theme —
// see [[boostify-brand-constants-module]] memory / theme.ts's history for
// why they don't live in a separate constants module: components read them
// back out via `var(--mui-palette-*)` (composite CSS) or the `'group.key'`
// sx string-path shorthand (simple values), both of which are scheme-
// reactive and safe in Server Components, with no import needed at all.
const primary = {
    main: "#f5a623", // gold
    light: "#ffbd3d", // gold2
    dark: "#d98a0d", // goldDark
    contrastText: "#050b14", // onGold
};

const secondary = {
    main: "#9e9e9e",
    dark: "#616161",
    light: "#e0e0e0",
};

const brandAccent: BrandAccentPalette = {
    goldSoft: "#ffc75a",
};

// Same navy hue as brandSurfaceDark (~218°), lifted to a light-but-saturated
// tint instead of a neutral cream, so light mode reads as "the brand's blue"
// rather than "a generic light theme".
const brandSurfaceLight: BrandSurfacePalette = {
    deep: "#b3c9ef", // skyDeep
    mid: "#a1bfed", // sky3
    soft: "#94b2e6", // skySoft
    cardTint: "rgba(11,18,32,0.03)",
    cardTintHover: "rgba(11,18,32,0.06)",
    scrimStart: "rgba(148,178,230,0.55)",
    scrimEnd: "rgba(148,178,230,0.92)",
    accentText: "#5c3500",
};

const brandSurfaceDark: BrandSurfacePalette = {
    deep: "#020915", // navyDeep
    mid: "#07172d", // navy3
    soft: "#06162c", // navySoft
    cardTint: "rgba(255,255,255,0.025)",
    cardTintHover: "rgba(255,255,255,0.055)",
    scrimStart: "rgba(2,10,22,0.15)",
    scrimEnd: "rgba(2,10,22,0.9)",
    accentText: primary.main,
};

const theme = createTheme({
    colorSchemes: {
        light: { palette: { primary, secondary, brandAccent, brandSurface: brandSurfaceLight } },
        dark: { palette: { primary, secondary, brandAccent, brandSurface: brandSurfaceDark } },
    },
    defaultColorScheme: "dark",
    cssVariables: {
        colorSchemeSelector: "class",
    },
    shape: {
        borderRadius: 10,
    },
    typography: {
        fontFamily: inter.style.fontFamily,
        h1: { fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.02 },
        h2: { fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.12 },
        h3: { fontWeight: 900, lineHeight: 1.2 },
        h4: { fontWeight: 800 },
        button: { fontWeight: 800, textTransform: "none" },
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                root: {
                    variants: [
                        {
                            props: { severity: "info" },
                            style: {
                                backgroundColor: "#60a5fa",
                            },
                        },
                    ],
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 900,
                },
            },
        },
    },
});

theme.getAlphaColor = (colorKey, opacity, shade = "main") => {
    const color = theme.palette[colorKey] as PaletteColor;
    return color ? alpha(color[shade], opacity) : "";
};

export default theme;
