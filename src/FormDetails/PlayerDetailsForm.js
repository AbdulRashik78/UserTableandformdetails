import React, { useState } from 'react';
import { Box, Stack, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio, FormLabel, Checkbox } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { FileUpload } from './FileUpload';
import { ImageUpload } from './ImageUpload';

export const PlayerDetailsForm = () => {
  const location = useLocation();
  const player = location.state?.player || {};

  const [formState, setFormState] = useState({
    name: player.Name || '',
    surname: player.Surname || '',
    dob: player.Dob || '',
    country: player.Country || '',
    state: player.State || '',
    city: player.City || '',
    contact: player.Contact ||'',
    gender: '',
    currentAddress: '',
    permanentAddress: '',
    sameAddress: false,
    uploadedFile: null,
    uploadedImage: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'currentAddress' && prevState.sameAddress ? { permanentAddress: value } : {}),
      ...(name === 'sameAddress' && checked ? { permanentAddress: prevState.currentAddress } : {}),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState.name) newErrors.name = 'Name is required';
    if (!formState.surname) newErrors.surname = 'Surname is required';
    if (!formState.dob) newErrors.dob = 'Date of Birth is required';
    if (!formState.country) newErrors.country = 'Country is required';
    if (!formState.state) newErrors.state = 'State is required';
    if (!formState.city) newErrors.city = 'City is required';
    if (!formState.contact) newErrors.contact = 'Contact is required';
    if (!formState.gender) newErrors.gender = 'Gender is required';
    if (!formState.currentAddress) newErrors.currentAddress = 'Current Address is required';
    if (!formState.permanentAddress) newErrors.permanentAddress = 'Permanent Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Submit the form data to the API
      console.log('Form submitted:', formState);
    }
  };

  const handleReset = () => {
    setFormState({
      name: '',
      surname: '',
      dob: '',
      country: '',
      state: '',
      city: '',
      contact: '',
      gender: '',
      currentAddress: '',
      permanentAddress: '',
      sameAddress: false,
      uploadedFile: null,
      uploadedImage: null,
    });
    setErrors({});
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginTop={40}
      height="100vh"
      padding={2}
    >
      <Typography variant='h4' gutterBottom>
        Player Details
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <TextField
          label="Name"
          variant='outlined'
          size="small"
          fullWidth
          name="name"
          value={formState.name}
          onChange={handleChange}
          error={!!errors.name}  //error will be converted to boolean using !!
          helperText={errors.name}
        />
        <TextField
          label="Surname"
          variant='outlined'
          size="small"
          fullWidth
          name="surname"
          value={formState.surname}
          onChange={handleChange}
          error={!!errors.surname}
          helperText={errors.surname}
        />
        <TextField
          label="DOB"
          name="dob"
          type='date'
          value={formState.dob}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          variant='outlined'
          size="small"
          fullWidth
          error={!!errors.dob}
          helperText={errors.dob}
        />
        <TextField
          label="Country"
          variant='outlined'
          size="small"
          fullWidth
          name="country"
          value={formState.country}
          onChange={handleChange}
          error={!!errors.country}
          helperText={errors.country}
        />
        <TextField
          label="State"
          variant='outlined'
          size="small"
          fullWidth
          name="state"
          value={formState.state}
          onChange={handleChange}
          error={!!errors.state}
          helperText={errors.state}
        />
        <TextField
          label="City"
          variant='outlined'
          size="small"
          fullWidth
          name="city"
          value={formState.city}
          onChange={handleChange}
          error={!!errors.city}
          helperText={errors.city}
        />
        <Box display="flex" alignItems="center">
          <FormLabel id="Gender" sx={{ marginRight: 2 }}>Gender</FormLabel>
          <RadioGroup
            aria-labelledby='Gender'
            row
            name="gender"
            value={formState.gender}
            onChange={handleChange}
          >
            <FormControlLabel control={<Radio size='small' color='secondary' />} label='Male' value='Male' />
            <FormControlLabel control={<Radio size='small' color='secondary' />} label='Female' value='Female' />
            <FormControlLabel control={<Radio size='small' color='secondary' />} label='Others' value='Others' />
          </RadioGroup>
        </Box>
        {errors.gender && <Typography color="error">{errors.gender}</Typography>}
        <TextField
          label="Email"
          variant='outlined'
          type="email"
          size="small"
          placeholder='Enter a valid email id'
          fullWidth
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
        <TextField
          label="Contact"
          placeholder='Enter 10 digit mobile number'
          variant='outlined'
          type='tel'
          size="small"
          fullWidth
          name="contact"
          value={formState.contact}
          onChange={handleChange}
          inputProps={{ maxLength: 10 }}
          error={!!errors.contact}
          helperText={errors.contact}
        />
        <TextField
          id="current-address"
          label="Current Address"
          multiline
          maxRows={4}
          fullWidth
          name="currentAddress"
          value={formState.currentAddress}
          onChange={handleChange}
          error={!!errors.currentAddress}
          helperText={errors.currentAddress}
        />
        <FormControlLabel
          control={<Checkbox name="sameAddress" checked={formState.sameAddress} onChange={handleChange} />}
          label='Current address same as the permanent address'
        />
        <TextField
          id="permanent-address"
          label="Permanent Address"
          multiline
          maxRows={4}
          fullWidth
          name="permanentAddress"
          value={formState.permanentAddress}
          onChange={handleChange}
          error={!!errors.permanentAddress}
          helperText={errors.permanentAddress}
        />
        <FileUpload uploadedFile={formState.uploadedFile} setUploadedFile={(file) => setFormState((prevState) => ({ ...prevState, uploadedFile: file }))} />
        <ImageUpload uploadedImage={formState.uploadedImage} setUploadedImage={(image) => setFormState((prevState) => ({ ...prevState, uploadedImage: image }))} />
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" color="primary" type="submit" >           Submit
          </Button>
          <Button variant="outlined" color="secondary" type="button" onClick={handleReset}>
            Reset
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}