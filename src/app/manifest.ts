import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Boostify - Digital Marketing Agency',
    short_name: 'Boostify',
    description:
      'Boostify combines technology, strategy, and creative excellence to help ambitious businesses grow faster online.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020a16',
    theme_color: '#020a16',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
