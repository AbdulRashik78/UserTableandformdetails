import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit as EditIcon, DeleteOutline as DeleteOutlineIcon, Save as SaveIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { SearchBar } from './SearchBar';
import { NewRowForm } from './NewRowForm';

export const EditableTable = () => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [newRow, setNewRow] = useState(null);
  const [editRowId, setEditRowId] = useState(null);
  const [editRowData, setEditRowData] = useState({});
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://mocki.io/v1/7dbee11b-08a5-4481-bd98-8f583b4faf43")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error Fetching Data:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleAddRow = () => {
    setNewRow({
      id: data.length + 1,
      Name: '',
      Surname: '',
      Dob: '',
      Country: '',
      State: '',
      City: '',
    });
    setError('');
  };

  const handleNewRowChange = (field, value) => {
    setNewRow({ ...newRow, [field]: value });
  };

  const handleSaveNewRow = () => {
    if (Object.values(newRow).some(value => value === '')) {
      setError('All fields must be filled out.');
      return;
    }
    console.log('New Row:', newRow);
    console.log('Data before:', data);
    setData([...data, newRow]);
    console.log('Data after:', data);
    setNewRow(null);
    setError('');
  };

  const handleEditRow = (row) => {
    setEditRowId(row.id);
    setEditRowData(row);
  };

  const handleEditRowChange = (field, value) => {
    setEditRowData({ ...editRowData, [field]: value });  //Computed property names
  };

  const handleSaveEditRow = () => {
    if (Object.values(editRowData).some(value => value === '')) {
      setError('All fields must be filled out.');
      return;
    }
    setData(data.map(row => (row.id === editRowId ? editRowData : row)));
    setEditRowId(null);
    setEditRowData({});
    setError('');
  };

  const handleDeleteRow = (id) => {
    setData(data.filter(row => row.id !== id));
  };

  const handleShowDetails = (row) => {
    navigate('/playerdetailsform', { state: { player: row } });
  };

  const filteredData = data.filter((row) => {
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <>
          {editRowId === params.row.id ? (
            <SaveIcon color="success" style={{ opacity: 0.65, cursor: 'pointer' }} onClick={handleSaveEditRow} />
          ) : (
            <EditIcon style={{ opacity: 0.65, marginRight: '20px', cursor: 'pointer' }} onClick={() => handleEditRow(params.row)} />
          )}
          <DeleteOutlineIcon style={{ opacity: 0.65, cursor: 'pointer' }} onClick={() => handleDeleteRow(params.row.id)} />
        </>
      ),
    },
    {
      field: 'Name',
      headerName: 'Name',
      width: 150,
      renderCell: (params) => (
        editRowId === params.row.id ? (
          <TextField
            value={editRowData.Name}
            onChange={(e) => handleEditRowChange('Name', e.target.value)}
          />
        ) : (
          params.value
        )
      ),
    },
    {
      field: 'Surname',
      headerName: 'Surname',
      width: 150,
      renderCell: (params) => (
        editRowId === params.row.id ? (
          <TextField
            value={editRowData.Surname}
            onChange={(e) => handleEditRowChange('Surname', e.target.value)}
          />
        ) : (
          params.value
        )
      ),
    },
    {
      field: 'Dob',
      headerName: 'Dob',
      width: 150,
      renderCell: (params) => (
        editRowId === params.row.id ? (
          <TextField
            value={editRowData.Dob}
            onChange={(e) => handleEditRowChange('Dob', e.target.value)}
          />
        ) : (
          params.value
        )
      ),
    },
    {
      field: 'Country',
      headerName: 'Country',
      width: 150,
      renderCell: (params) => (
        editRowId === params.row.id ? (
          <TextField
            value={editRowData.Country}
            onChange={(e) => handleEditRowChange('Country', e.target.value)}
          />
        ) : (
          params.value
        )
      ),
    },
    {
      field: 'State',
      headerName: 'State',
      width: 150,
      renderCell: (params) => (
        editRowId === params.row.id ? (
          <TextField
            value={editRowData.State}
            onChange={(e) => handleEditRowChange('State', e.target.value)}
          />
        ) : (
          params.value
        )
      ),
    },
    {
      field: 'City',
      headerName: 'City',
      width: 150,
      renderCell: (params) => (
        editRowId === params.row.id ? (
          <TextField
            value={editRowData.City}
            onChange={(e) => handleEditRowChange('City', e.target.value)}
          />
        ) : (
          params.value
        )
      ),
    },
    {
      field: 'Info',
      headerName: 'MoreInfo',
      width: 200,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button onClick={() => handleShowDetails(params.row)} variant='contained' style={{ marginRight: '10px', marginTop: "5px" }}>Show</Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box className='TableContainer' sx={{ padding: 4 }}>
      <Header />
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{ padding: 1 }}>
        <Typography className='Edit' variant='h5' color='error' sx={{ marginTop: 2 }}>Editable Preview</Typography>
        <SearchBar
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handleClearSearch={handleClearSearch}
          handleAddRow={handleAddRow}
        />
      </Stack>
      <div style={{ height: 400, width: '100%' }}>
        {newRow && (
          <NewRowForm
            newRow={newRow}
            handleNewRowChange={handleNewRowChange}
            handleSaveNewRow={handleSaveNewRow}
          />
        )}
        {error && <Typography color="error">{error}</Typography>}
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[25, 50,100]}
          pagination
        />
      </div>
    </Box>
  );
};