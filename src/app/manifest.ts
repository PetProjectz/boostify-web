import { MetadataRoute } from 'next';

import { brand } from '@/brand';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Boostify - Digital Marketing Agency',
    short_name: 'Boostify',
    description:
      'Boostify combines technology, strategy, and creative excellence to help ambitious businesses grow faster online.',
    start_url: '/',
    display: 'standalone',
    background_color: brand.navy,
    theme_color: brand.navy,
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
