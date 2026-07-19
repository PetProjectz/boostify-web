'use client';

import * as React from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const services = [
  'Web and Mobile Development',
  'Blockchain Solutions',
  'Digital Marketing',
  'Social Media Management',
  'Creative Media Production',
  'Brand Identity & Design',
];

export default function ContactForm() {
  const [service, setService] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    // Simulated submission (matches the sample's demo behaviour).
    setTimeout(() => {
      setSubmitting(false);
      setToastOpen(true);
      formRef.current?.reset();
      setService('');
    }, 700);
  };

  return (
    <Paper
      component="form"
      ref={formRef}
      onSubmit={handleSubmit}
      elevation={0}
      variant="outlined"
      sx={{ p: { xs: 3, sm: 4 }, borderRadius: '18px', boxShadow: '0 18px 45px rgba(7, 18, 45, 0.10)' }}
    >
      <Typography variant="h2" sx={{ fontSize: 30, mb: 3, color: 'text.primary' }}>
        Send Us a Message
      </Typography>
      <Grid container spacing={2.25}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField name="name" label="Full Name" placeholder="Enter your full name" required fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField name="email" type="email" label="Email Address" placeholder="Enter your email address" required fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField name="phone" type="tel" label="Phone Number" placeholder="Enter your phone number" fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField name="company" label="Company Name" placeholder="Enter your company name" fullWidth />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            name="service"
            label="Service Interested In"
            select
            required
            fullWidth
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <MenuItem value="" disabled>
              Select a service
            </MenuItem>
            {services.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField name="message" label="Your Message" placeholder="Tell us about your project" required fullWidth multiline minRows={5} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={submitting} sx={{ minHeight: 48 }}>
            {submitting ? 'Sending...' : 'Send Message'}
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={toastOpen}
        autoHideDuration={5000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setToastOpen(false)} sx={{ width: '100%' }}>
          Thank you for your message! We will get back to you soon.
        </Alert>
      </Snackbar>
    </Paper>
  );
}
