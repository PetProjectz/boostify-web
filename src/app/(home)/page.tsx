import * as React from 'react';
import type { Metadata } from 'next';

import HeroSection from '@/app/(home)/HeroSection';
import ServicesSection from '@/app/(home)/ServicesSection';
import ProjectCounterSection from '@/app/(home)/ProjectCounterSection';
import ClientsSection from '@/app/(home)/ClientsSection';
import WhyChooseUsSection from '@/app/(home)/WhyChooseUsSection';
import CtaSection from '@/components/common/CtaSection';
import { socialLinks } from '@/socialLinks';

export const metadata: Metadata = {
  description:
    "Boostify is Sri Lanka's trusted digital and AI transformation partner, helping ambitious businesses grow faster and lead confidently with technology, strategy, and creative excellence.",
  openGraph: {
    title: 'Boostify - Digital & AI Transformation Partner in Sri Lanka',
    description:
      "Boostify is Sri Lanka's trusted digital and AI transformation partner, helping ambitious businesses grow faster and lead confidently with technology, strategy, and creative excellence.",
    url: 'https://boostify.lk',
  },
  alternates: {
    canonical: 'https://boostify.lk',
  },
};

function Home() {
  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Boostify',
    url: 'https://boostify.lk',
    logo: 'https://boostify.lk/assets/brand/boostify-logo.webp',
    description:
      "Sri Lanka's digital and AI transformation partner, combining technology, strategy, and creative excellence for ambitious businesses.",
    areaServed: 'LK',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kurunegala',
      addressCountry: 'LK',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+94713598928',
      contactType: 'Customer Service',
      email: 'info@boostify.lk',
    },
    sameAs: [socialLinks.facebook, socialLinks.instagram, socialLinks.linkedin],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection />
      <ServicesSection />
      <ProjectCounterSection />
      <ClientsSection />
      <WhyChooseUsSection />
      <CtaSection />
    </>
  );
}

export default Home;
