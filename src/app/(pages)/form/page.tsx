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
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
// import { truncate } from 'fs';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocationSearchAutocomplete } from '@/app/components/map/LocationSearchAutocomplete';
// import { styled } from '@mui/material/styles';

const theme1 = createTheme({
  palette: {
    primary: {
      main: '#56528D', 
    },
  },
});

const currencies = [
  {
    value: 'baterie',
    label: 'Baterie',
  },
  {
    value: 'leki',
    label: 'Leki',
  },
  {
    value: 'elektro',
    label: 'Elektro',
  },
  {
    value: 'butelki',
    label: 'Butelki',
  },
];

const profits = [
  {
    value: 'punkty',
    label: 'Punkty',
  },
  {
    value: 'zwrot gotówki',
    label: 'Zwrot gotówki',
  },
  {
    value: 'karta podarunkowa',
    label: 'Karta podarunkowa',
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const FormPage = () => {
  const [bonus, setBonus] = useState(false);

  const handleSwitch = () => {
    setBonus((currentValue) => !currentValue);
  };

  return (
    <ThemeProvider theme={theme1}>
    <Box
      component="form"
      sx={{
        display: 'flex', flexDirection: 'row',
        // width: 460,
        // height: 943,
        '& .MuiTextField-root': { m: 0, marginTop: 2},
      }}
      noValidate
      autoComplete="off"

      // backgroundColor: 'primary.dark',
      // '&:hover': {
      //   backgroundColor: 'primary.main',
      //   opacity: [0.9, 0.8, 0.7],
      // },
    >
      <Stack direction="column" justifyContent={'center'} spacing={2} marginLeft={0}>
        <h2 style={{textAlign: 'center', color: '#56528D'}}>Dodaj punkt</h2>
        <TextField id="outlined-basic" label="Nazwa produktu" variant="outlined" />

        <TextField id="outlined-select-currency" select label="Kategoria" defaultValue="" helperText="">
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <LocationSearchAutocomplete />
        <div>
          <Button variant="outlined" size="small">
            P
          </Button>
          <Button variant="outlined" size="small">
            W
          </Button>
          <Button variant="outlined" size="small">
            Ś
          </Button>
          <Button variant="outlined" size="small">
            C
          </Button>
          <Button variant="outlined" size="small">
            P
          </Button>
          <Button variant="outlined" size="small">
            S
          </Button>
          <Button variant="outlined" size="small">
            N
          </Button>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['MobileDateTimePicker', 'MobileDateTimePicker']} sx={{ flexDirection: 'row', justifyItems: 'top' ,gap: 1 }} >
            <MobileTimePicker label={'Otwarcie'} openTo="hours" sx={{  minWidth: 'auto !important' }} />
            <MobileTimePicker label={'Zamknięcie'} openTo="hours" sx={{  minWidth: 'auto !important' }} />
          </DemoContainer>
        </LocalizationProvider>
        <FormGroup sx={{ display: 'flex', flexDirection: 'row', marginLeft: 0 }}>
          <FormControlLabel control={<Checkbox />} label="Czynne całą dobę" />
          <FormControlLabel control={<Checkbox />} label="Zamknięte" />
        </FormGroup>
        <div>
          <FormGroup>
            <FormControlLabel control={<Switch />} label="Profit" onChange={handleSwitch} />
            {bonus ? (
              <TextField id="outlined-select-currency" select label="Wybierz" defaultValue="" helperText="">
                {profits.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : null}
          </FormGroup>
        </div>
        <TextField id="outlined-multiline-static" label="Dodatkowe informacje" multiline rows={4} defaultValue=""  />
        
        <Button variant="contained" size="large">
          Dodaj punkt do mapy
        </Button>
        
      </Stack>
    </Box>
    </ThemeProvider>
  );
};

export default FormPage;
