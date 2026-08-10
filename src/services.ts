/**
 * The canonical Boostify service list. Kept in a plain (non-"use client")
 * module so it can be imported by both Server and Client Components, and so
 * the home page cards and the footer link list can never drift apart.
 */
export const services = [
  {
    image: '/assets/services/social-media.webp',
    imageLight: '/assets/services/social-media-light.webp',
    title: 'Social Media & Digital Growth',
    description:
      'Strategic social media management that grows your audience. From engaging posts, videos, and campaign content to optimized paid advertising that connects your brand with the right people.',
  },
  {
    image: '/assets/services/web-development.webp',
    imageLight: '/assets/services/web-development-light.webp',
    title: 'Web and Mobile Application Development',
    description:
      'Web, mobile, and AI application development built on modern frameworks, machine learning, and cloud technologies to deliver secure, scalable, high-performance solutions.',
  },
  {
    image: '/assets/services/blockchain.webp',
    imageLight: '/assets/services/blockchain-light.webp',
    title: 'Business Process Automation',
    description:
      'Streamline operations with intelligent automation that reduces manual work, improves accuracy, and scales your business processes across teams and systems.',
  },
  {
    image: '/assets/services/digital-marketing.webp',
    imageLight: '/assets/services/digital-marketing-light.webp',
    title: 'Advanced Search & Discoverability',
    description:
      'Get found wherever customers search. We combine SEO, Generative Engine Optimization (GEO), and local search to boost your visibility across search engines, AI platforms, and maps.',
  },
];
