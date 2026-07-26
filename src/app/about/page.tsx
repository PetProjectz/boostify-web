import * as React from 'react';
import type { Metadata } from 'next';

import PageHero from '@/components/common/PageHero';
import StorySection from '@/app/about/StorySection';
import DirectorsSection from '@/app/about/DirectorsSection';
import ExpertiseSection from '@/app/about/ExpertiseSection';
import IndustriesSection from '@/app/about/IndustriesSection';
import CtaSection from '@/components/common/CtaSection';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'We help businesses grow, connect, and succeed in the digital world.',
  openGraph: {
    title: 'About Us | Boostify',
    description: 'We help businesses grow, connect, and succeed in the digital world.',
    url: 'https://boostify.lk/about',
  },
  alternates: {
    canonical: 'https://boostify.lk/about',
  },
};

export default function About() {
  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Boostify',
      url: 'https://boostify.lk',
      logo: 'https://boostify.lk/assets/brand/boostify-logo.webp',
      description: 'Digital marketing agency combining technology, strategy, and creative excellence for ambitious businesses.',
      areaServed: 'LK',
      knowsAbout: [
        'Web and Mobile Application Development',
        'Business Process Automation',
        'Performance Marketing & Social Commerce',
        'SEO and Generative Engine Optimization',
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
