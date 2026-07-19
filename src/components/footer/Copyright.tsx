import * as React from 'react';

import Typography from '@mui/material/Typography';

export default function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>
      © {new Date().getFullYear()} Boostify. All rights reserved.
    </Typography>
  );
}
