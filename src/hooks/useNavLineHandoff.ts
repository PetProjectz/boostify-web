'use client';

import * as React from 'react';

import { HERO_LINE_ATTR, NAV_LINE_ATTR } from '@/cssSelectors';

const DRAW_IN_AT = 0;
const RETRACT_AT = 12;

function useNavLineHandoff(pathname: string) {
  const navRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const nav = navRef.current;
    if (!nav) {
      return undefined;
    }

    // Tracked so the attribute is only touched on an actual change — writing
    // the same value every frame would restart the transition.
    let drawn: boolean | null = null;

    const setDrawn = (next: boolean) => {
      if (next === drawn) {
        return;
      }
      drawn = next;
      nav.setAttribute(NAV_LINE_ATTR, next ? 'on' : 'off');
    };

    const hero = document.querySelector<HTMLElement>(`[${HERO_LINE_ATTR}]`);
    if (!hero) {
      setDrawn(true);
      return undefined;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      // Both rects end on the outer edge of their own 2px line, so a gap of 0
      // means the two lines are sitting on top of each other; negative is how
      // far the hero line has travelled up behind the nav bar.
      const gap = hero.getBoundingClientRect().bottom - nav.getBoundingClientRect().bottom;
      setDrawn(drawn ? gap <= RETRACT_AT : gap <= DRAW_IN_AT);
    };

    const schedule = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    // The hero grows as its images load, which moves its line without any
    // scroll or resize event firing.
    const observer = new ResizeObserver(schedule);
    observer.observe(hero);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer.disconnect();
    };
  }, [pathname]);

  return navRef;
}

export default useNavLineHandoff;
