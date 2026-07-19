"use client";

import { alpha, createTheme, PaletteColor } from "@mui/material/styles";
import { Inter } from "next/font/google";

import { brand } from "@/brand";

const inter = Inter({
    weight: ["400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    display: "swap",
});

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
}

const theme = createTheme({
    colorSchemes: { light: true, dark: true },
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
    palette: {
        primary: {
            main: brand.gold,
            light: brand.gold2,
            dark: brand.goldDark,
            contrastText: brand.onGold,
        },
        secondary: {
            main: "#9e9e9e",
            dark: "#616161",
            light: "#e0e0e0",
        },
    },
});

theme.getAlphaColor = (colorKey, opacity, shade = "main") => {
    const color = theme.palette[colorKey] as PaletteColor;
    return color ? alpha(color[shade], opacity) : "";
};

export default theme;
