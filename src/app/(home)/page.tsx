import * as React from 'react';

import HeroSection from '@/app/(home)/HeroSection';
import ServicesSection from '@/app/(home)/ServicesSection';
import ProjectCounterSection from '@/app/(home)/ProjectCounterSection';
import ClientsSection from '@/app/(home)/ClientsSection';
import WhyChooseUsSection from '@/app/(home)/WhyChooseUsSection';
import CtaSection from '@/components/common/CtaSection';

function Home() {
  return (
    <>
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
