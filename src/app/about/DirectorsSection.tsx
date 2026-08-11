import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Image from 'next/image';

import SectionHeading from '@/components/common/SectionHeading';
import ScrollReveal from '@/components/common/ScrollReveal';

const directors = [
  {
    photo: '/assets/team/randula.jpg',
    name: 'Randula Arukgoda',
    role: 'Co-Founder & CEO',
    degree: 'BSc. (Hons) Electronic and Telecommunication Engineering, CINEC',
    linkedin: 'https://www.linkedin.com/in/randula-arukgoda-922487215/',
    description:
      "Randula's engineering background combined with strategic marketing insights drives our data-driven approach. With exposure working alongside leading enterprises, his analytical mindset ensures every campaign is optimized for maximum performance and measurable ROI.",
  },
  {
    photo: '/assets/team/akeshala.jpg',
    name: 'Akeshala Marasinghe',
    role: 'Co-Founder & CTO',
    degree: 'BSc. (Hons) Engineering, University of Moratuwa',
    linkedin: 'https://www.linkedin.com/in/akeshala/',
    description:
      'With over 5 years of experience in the software industry across leading local and foreign companies, Akeshala brings technical expertise and innovative thinking to every project.',
  },
  {
    photo: '/assets/team/hasila.jpg',
    name: 'Hasila Heshan',
    role: 'Co-Founder & CCO',
    degree: '5+ years experience with leading television and radio companies',
    linkedin: 'https://www.linkedin.com/in/hasila-heshan-pathirana/',
    description:
      'With more than five years of industry experience, including work at leading television and radio companies, Hasila brings broad media production expertise. His work spans national-level marketing campaigns, weddings, music videos, digital marketing, and event videography.',
  },
];

export default function DirectorsSection() {
  return (
    <Box sx={{ py: { xs: 4, sm: 5 }, bgcolor: 'background.default' }}>
      <Container>
        <ScrollReveal>
          <SectionHeading tag="Leadership" title="Meet Our Founders" align="center" />
        </ScrollReveal>
        <Grid container spacing={2.5} sx={{ mt: 2 }}>
          {directors.map((director, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={director.name}>
              <ScrollReveal delay={Math.min(index * 0.1, 0.3)} sx={{ height: '100%' }}>
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
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                        <Typography variant="h3" sx={{ fontSize: 18, color: 'text.primary' }}>
                          {director.name}
                        </Typography>
                        <IconButton
                          href={director.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${director.name} on LinkedIn`}
                          size="small"
                          sx={{
                            color: 'brandSurface.accentText',
                            p: 0.5,
                            '&:hover': { color: 'brandSurface.accentText', backgroundColor: 'transparent' },
                          }}
                        >
                          <LinkedInIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Typography
                        sx={{
                          color: 'brandSurface.accentText',
                          fontSize: 13,
                          fontWeight: 700,
                          mb: 1.5,
                        }}
                      >
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
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
