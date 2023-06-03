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
import Checkbox from '@mui/material/Checkbox';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
// import { styled } from '@mui/material/styles';

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const FormPage = () => {

const [bonus, setBonus] = useState(false)

const handleSwitch = () => {
  setBonus((currentValue) => !currentValue)
}

  return (
    <Box
      component="form"
      sx={{
        width: 460,
         height: 943,
        '& .MuiTextField-root': { m: 2, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
     
       
        // backgroundColor: 'primary.dark',
        // '&:hover': {
        //   backgroundColor: 'primary.main',
        //   opacity: [0.9, 0.8, 0.7],
        // },
     
    >
    <Stack direction="column"
     alignItems="center" spacing={2}>
   
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
        <div>
      <Button variant="outlined" size="small" >
          P
        </Button>
        <Button variant="outlined" size="small" >
          W
        </Button>
        <Button variant="outlined" size="small" >
          Ś
        </Button>
        <Button variant="outlined" size="small" >
          C
        </Button>
        <Button variant="outlined" size="small" >
          P
        </Button>
        <Button variant="outlined" size="small" >
          S
        </Button>
        <Button variant="outlined" size="small">
          N
        </Button>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['MobileDateTimePicker', 'MobileDateTimePicker']}>
          <div>
          <MobileTimePicker label={'Otwarcie'} openTo="hours"/>
          <MobileTimePicker label={'Zamknięcie'} openTo="hours"/>
          </div>
        </DemoContainer>
      </LocalizationProvider>
      <FormGroup>
        <div>
      <FormControlLabel control={<Checkbox  />} label="Czynne całą dobę" />
      <FormControlLabel control={<Checkbox  />} label="Zamknięte" />
      </div>
    </FormGroup>
      <div>
      <FormGroup>
        <FormControlLabel control={<Switch />} label="Profit" onChange={handleSwitch}/>
        {bonus ?       
        <TextField
          id="outlined-select-currency"
          select
          label="Wybierz"
          defaultValue=""
          helperText=""
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
         <Button variant="contained" disableElevation >
      Dodaj punkt do mapy
    </Button>
    </Stack>
    </Box>
  );
};

export default FormPage;
