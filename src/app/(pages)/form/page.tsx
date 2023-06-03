'use client';

import React, { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { truncate } from 'fs';
import Button from '@mui/material/Button';

const currencies = [
  {
    value: 'baterie',
    label: 'baterie',
  },
  {
    value: 'leki',
    label: 'leki',
  },
  {
    value: 'elektro',
    label: 'elektro',
  },
  {
    value: 'butelki',
    label: 'butelki',
  },
];

const profits = [
  {
    value: 'punkty',
    label: 'punkty',
  },
  {
    value: 'zwrot gotówki',
    label: 'zwrot gotówki',
  },
  {
    value: 'karta podarunkowa',
    label: 'karta podarunkowa',
  },
]

const FormPage = () => {



const [bonus, setBonus] = useState(false)

const handleSwitch = () => {
  setBonus((currentValue)=> !currentValue)
}

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Nazwa produktu" variant="outlined" />
      <TextField
          id="outlined-select-currency"
          select
          label="Kategoria"
          defaultValue=""
          helperText=""
      >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </TextField>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['MobileDateTimePicker', 'MobileDateTimePicker']}>
          <div>
          <MobileTimePicker label={'Otwarcie'} openTo="hours" />
          <MobileTimePicker label={'Zamknięcie'} openTo="hours" />
          </div>
        </DemoContainer>
      </LocalizationProvider>
      <div>
      <FormGroup>
        <FormControlLabel control={<Switch />} label="Profit" onChange={handleSwitch}/>
        {bonus ?       
        <TextField
          id="outlined-select-currency"
          select
          label="Wybierz"
          defaultValue=""
          helperText="Wybierz rodzaj profitu"
      >
          {profits.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        : null}
      </FormGroup>

      </div>
      <TextField
          id="outlined-multiline-static"
          label="Dodatkowe informacje"
          multiline
          rows={4}
          defaultValue=""
        />
    </Box>
  );
};

export default FormPage;
