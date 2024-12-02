import React from 'react';
import { Input, Stack, InputAdornment } from '@mui/material';
import { Search as SearchIcon, ClearOutlined as ClearOutlinedIcon, AddBox as AddBoxIcon } from '@mui/icons-material';

export const SearchBar = ({ searchQuery, handleSearchChange, handleClearSearch, handleAddRow }) => (
  <Stack direction="row" alignItems="center" spacing={1} sx={{ padding: 1 }}>
    <Input
      placeholder="Search"
      value={searchQuery}
      onChange={handleSearchChange}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon style={{ color: 'gray', opacity: 0.8 }} />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <ClearOutlinedIcon
            style={{ color: 'gray', opacity: 0.8, cursor: 'pointer' }}
            onClick={handleClearSearch}
          />
        </InputAdornment>
      }
    />
    <AddBoxIcon color='gray' style={{ opacity: 0.6, cursor: 'pointer' }} onClick={handleAddRow} />
  </Stack>
);