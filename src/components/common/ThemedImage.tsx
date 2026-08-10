import Box from '@mui/material/Box';
import Image, { type ImageProps } from 'next/image';

import { DARK_SELECTOR } from '@/cssSelectors';

interface ThemedImageProps extends Omit<ImageProps, 'src'> {
  lightSrc: string;
  darkSrc: string;
}

/**
 * Swaps between a light-mode and dark-mode image asset. CSS can't
 * conditionally change an <img> src, so both are rendered and toggled via
 * DARK_SELECTOR (display: none), matching how colors adapt elsewhere.
 */
export default function ThemedImage({ lightSrc, darkSrc, alt, fill, ...rest }: ThemedImageProps) {
  return (
    <Box
      sx={
        fill
          ? { position: 'relative', width: '100%', height: '100%' }
          : { position: 'relative', display: 'inline-block' }
      }
    >
      <Box sx={{ [DARK_SELECTOR]: { display: 'none' } }}>
        <Image src={lightSrc} alt={alt} fill={fill} {...rest} />
      </Box>
      <Box sx={{ display: 'none', [DARK_SELECTOR]: { display: 'block' } }}>
        <Image src={darkSrc} alt={alt} fill={fill} {...rest} />
      </Box>
    </Box>
  );
}
