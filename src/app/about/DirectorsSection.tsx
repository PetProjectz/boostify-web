import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import SectionHeading from '@/components/common/SectionHeading';
import { brand } from '@/brand';

const directors = [
  {
    photo: '/assets/team/akeshala.jpg',
    name: 'Akeshala Marasinghe',
    role: 'Co-Founder & Director',
    degree: 'BSc. (Hons) Engineering, University of Moratuwa',
    description:
      'With over 5 years of experience in the software industry across leading local and foreign companies, Akeshala brings technical precision and innovative thinking to every project. His expertise in systems architecture ensures our digital solutions are built on strong technological foundations.',
  },
  {
    photo: '/assets/team/randula.jpg',
    name: 'Randula Arukgoda',
    role: 'Co-Founder & Director',
    degree: 'BSc. (Hons) Electronic and Telecommunication Engineering, CINEC',
    description:
      "Randula's engineering background combined with strategic marketing insights drives our data-driven approach. His analytical mindset ensures every campaign is optimized for maximum performance and measurable ROI.",
  },
  {
    photo: '/assets/team/hasila.jpg',
    name: 'Hasila Heshan',
    role: 'Co-Founder & Director',
    degree: '5+ years experience with leading television companies in Sri Lanka',
    description:
      "With over five years of hands on experience in Sri Lanka's leading television companies, Hasila brings outstanding media production expertise. His creative vision and technical proficiency in broadcast media elevate our content creation and event coverage services.",
  },
];

export default function DirectorsSection() {
  return (
    <Box sx={{ py: { xs: 4, sm: 5 }, bgcolor: 'background.default' }}>
      <Container>
        <SectionHeading tag="Leadership" title="Meet Our Directors" align="center" />
        <Grid container spacing={2.5} sx={{ mt: 2 }}>
          {directors.map((director) => (
            <Grid size={{ xs: 12, md: 4 }} key={director.name}>
              <Paper
                elevation={0}
                variant="outlined"
                sx={{ height: '100%', borderRadius: '16px', p: 2.25, boxShadow: '0 18px 45px rgba(7, 18, 45, 0.10)' }}
              >
                <Box sx={{ display: 'flex', gap: 2.5, mb: 2 }}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: 120,
                      height: 132,
                      flexShrink: 0,
                      borderRadius: '16px',
                      overflow: 'hidden',
                      background: 'linear-gradient(145deg, #d8e1ee, #455467)',
                    }}
                  >
                    <Image src={director.photo} alt={director.name} fill sizes="120px" style={{ objectFit: 'cover' }} />
                  </Box>
                  <Box>
                    <Typography variant="h3" sx={{ fontSize: 18, mb: 0.5, color: 'text.primary' }}>
                      {director.name}
                    </Typography>
                    <Typography sx={{ color: brand.goldDark, fontSize: 13, fontWeight: 700, mb: 1.5 }}>
                      {director.role}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: 13, lineHeight: 1.55 }}>
                      {director.degree}
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ color: 'text.secondary', fontSize: 14, lineHeight: 1.65 }}>
                  {director.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
