import React from 'react';
import { Typography,Stack } from '@mui/material';

export const Header = () => {
  return (
    <div>
        <Typography variant = 'h3'>Premier League Best Players</Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{ padding: 1 }}>
  </Stack>
    </div>
  )
}


