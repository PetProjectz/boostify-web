import * as React from 'react';

import Typography from '@mui/material/Typography';

export default function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.disabled', fontSize: 13 }}>
      © {new Date().getFullYear()} Boostify. All rights reserved.
    </Typography>
  );
}
