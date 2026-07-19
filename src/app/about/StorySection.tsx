import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import SectionHeading from '@/components/common/SectionHeading';

const paragraphs = [
  'Boostify was born from a vision to revolutionize how businesses connect with their audiences in the digital age. Founded by a team of passionate innovators with diverse expertise in technology, media, and marketing, we have built a company that thrives on creativity, technical excellence, and delivering measurable results.',
  'Our journey began with a simple belief: that every business, regardless of size, deserves access to world class digital marketing solutions. Today, we combine cutting-edge technology with strategic thinking to help our clients not just compete, but dominate in their respective markets.',
  'With backgrounds spanning software and telecommunications engineering to broadcast media, our team brings a unique perspective to digital marketing. We understand both the technical infrastructure that powers digital platforms and the creative storytelling that captures audiences.',
];

export default function StorySection() {
  return (
    <Box sx={{ py: { xs: 6, sm: 7 }, bgcolor: 'background.default' }}>
      <Container>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1.06fr' },
            gap: { xs: 4, md: 10 },
            alignItems: 'center',
          }}
        >
          <Box>
            <SectionHeading tag="Our Story" title="Our Background" />
            {paragraphs.map((text, i) => (
              <Typography key={i} sx={{ color: 'text.secondary', fontSize: 15, lineHeight: 1.7, mb: 2.5 }}>
                {text}
              </Typography>
            ))}
          </Box>
          <Box
            aria-label="Boostify office branding"
            sx={{
              position: 'relative',
              minHeight: { xs: 300, md: 420 },
              borderRadius: '40px',
              overflow: 'hidden',
              boxShadow: '0 25px 55px rgba(4, 12, 29, 0.18)',
              backgroundImage:
                "linear-gradient(90deg, rgba(2,10,22,0.16), rgba(2,10,22,0.06) 55%, rgba(2,10,22,0.02)), url('/assets/boostify-wall.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
