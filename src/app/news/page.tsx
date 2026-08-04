import * as React from 'react';
import type { Metadata } from 'next';

import PageHero from '@/components/common/PageHero';
import NewsSection from '@/app/news/NewsSection';
import CtaSection from '@/components/common/CtaSection';

export const metadata: Metadata = {
  title: 'News',
  description: 'The latest news, updates, and insights from the industry.',
  openGraph: {
    title: 'News | Boostify',
    description: 'The latest news, updates, and insights from the industry.',
    url: 'https://boostify.lk/news',
  },
  alternates: {
    canonical: 'https://boostify.lk/news',
  },
};

export default function News() {
  return (
    <>
      <PageHero
        tag="News"
        title="Latest News"
        subtitle="Updates, insights, and stories from the Boostify team."
      />
      <NewsSection />
      <CtaSection />
    </>
  );
}
