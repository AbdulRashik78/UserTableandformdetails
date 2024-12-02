import React from 'react';
import { Stack, TextField, Button } from '@mui/material';

export const NewRowForm = ({ newRow, handleNewRowChange, handleSaveNewRow }) => (
  <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
    <TextField label="Name" value={newRow.Name} onChange={(e) => handleNewRowChange('Name', e.target.value)} />
    <TextField label="Surname" value={newRow.Surname} onChange={(e) => handleNewRowChange('Surname', e.target.value)} />
    <TextField label="BirthYear" value={newRow.BirthYear} onChange={(e) => handleNewRowChange('BirthYear', e.target.value)} />
    <TextField label="Country" value={newRow.Country} onChange={(e) => handleNewRowChange('Country', e.target.value)} />
    <TextField label="State" value={newRow.State} onChange={(e) => handleNewRowChange('State', e.target.value)} />
    <TextField label="City" value={newRow.City} onChange={(e) => handleNewRowChange('City', e.target.value)} />
    <Button variant="contained" color="primary" onClick={handleSaveNewRow}>Save</Button>
  </Stack>
);