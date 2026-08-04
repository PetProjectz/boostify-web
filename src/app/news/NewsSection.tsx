import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { brand } from '@/brand';
import { fetchNewsFromSheet } from '@/lib/newsSheet';

export default async function NewsSection() {
  let newsItems: Awaited<ReturnType<typeof fetchNewsFromSheet>> = [];

  try {
    newsItems = await fetchNewsFromSheet();
  } catch {
    newsItems = [];
  }

  return (
    <Box sx={{ py: { xs: 6, sm: 7 }, bgcolor: 'background.default' }}>
      <Container>
        {newsItems.length === 0 ? (
          <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>
            No news articles are available right now. Please check back soon.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {newsItems.map((item) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={item.title}>
                <Box
                  component="article"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    boxShadow: '0 10px 30px rgba(4, 12, 29, 0.08)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 18px 40px rgba(4, 12, 29, 0.14)',
                    },
                  }}
                >
                  {item.image && (
                    <Box
                      sx={{
                        height: 190,
                        backgroundImage: `url('${item.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        bgcolor: brand.navy,
                      }}
                    />
                  )}
                  <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    {item.date && (
                      <Typography
                        component="p"
                        sx={{
                          color: brand.gold,
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          fontSize: 12,
                          letterSpacing: '1.5px',
                          mb: 1,
                        }}
                      >
                        {item.date}
                      </Typography>
                    )}
                    <Typography variant="h3" sx={{ fontSize: 20, mb: 1.5 }}>
                      {item.title}
                    </Typography>
                    {item.paragraphs.map((text, i) => (
                      <Typography
                        key={i}
                        sx={{
                          color: 'text.secondary',
                          fontSize: 14.5,
                          lineHeight: 1.7,
                          mb: i === item.paragraphs.length - 1 ? 0 : 2,
                        }}
                      >
                        {text}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
