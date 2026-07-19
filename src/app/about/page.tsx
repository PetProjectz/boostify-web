import * as React from 'react';
import type { Metadata } from 'next';

import PageHero from '@/components/common/PageHero';
import StorySection from '@/app/about/StorySection';
import DirectorsSection from '@/app/about/DirectorsSection';
import ExpertiseSection from '@/app/about/ExpertiseSection';
import IndustriesSection from '@/app/about/IndustriesSection';
import CtaSection from '@/components/common/CtaSection';

export const metadata: Metadata = {
  title: 'About Us - Boostify',
  description: 'We help businesses grow, connect, and succeed in the digital world.',
};

export default function About() {
  return (
    <>
      <PageHero
        tag="About Us"
        title="About Boostify"
        subtitle="We help businesses grow, connect, and succeed in the digital world."
      />
      <StorySection />
      <DirectorsSection />
      <ExpertiseSection />
      <IndustriesSection />
      <CtaSection />
    </>
  );
}
