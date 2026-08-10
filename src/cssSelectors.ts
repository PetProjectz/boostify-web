
export const DARK_SELECTOR = '*:where(.dark) &';

/**
 * Marks the section whose own bottom line hands over to the nav bar's bottom
 * line as it scrolls up — see useNavLineHandoff.
 */
export const HERO_LINE_ATTR = 'data-hero-line';

export const heroLineProps = { [HERO_LINE_ATTR]: '' };

/** `"on"` once the nav bar's bottom line has taken over from the hero line. */
export const NAV_LINE_ATTR = 'data-nav-line';
