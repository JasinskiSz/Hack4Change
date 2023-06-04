'use client';

import React, { FormEvent, useReducer, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocationSearchAutocomplete, LocationSearchAutocompleteResult } from '@/app/components/map/LocationSearchAutocomplete';

import Map from '@/app/components/map/MapComponent';
import { useShopsWithWasteRecycling } from '@/app/components/map/shopsWithWasteRecycling';
import { Grid } from '@mui/material';
import axios from 'axios';
import { LatLngLiteral } from 'leaflet';
import { OpenStreetAddress } from '@/app/types';

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
  const { shopsWithWasteRecycling } = useShopsWithWasteRecycling();
  const [formInput, setFormInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    productName: '',
    categories: '',
  });

  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const [bonus, setBonus] = useState(false);

  const handleSwitch = () => {
    setBonus((currentValue) => !currentValue);
  };

  const [location, setLocation] = useState<LocationSearchAutocompleteResult | null>(null);

  function handleFormSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log({ formInput });
    console.log({ location });

    // const addProduct: AddProductPayload = {
    //   additionalInfo: event.target['additionalInfo'].value,
    //   categories,
    // };
  }

  async function handleSelectedPointChange({ lat, lng }: LatLngLiteral) {
    const result = await axios.get<OpenStreetAddress>(`/api/locations?lat=${lat}&lng=${lng}`, {});
    const { city, country, postcode, road } = result.data;
    // Mostowa, 58-563 Przesieka, Poland
    const address = `${road}, ${postcode} ${city}, ${country}`;
    setLocation({ lat, lng, address });
  }

  console.log({ 'location?.address': location?.address });

  return (
    <ThemeProvider theme={theme1}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={4}
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            // width: 460,
            // height: 943,
            '& .MuiTextField-root': { m: 0, marginTop: 2 },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleFormSubmit}

          // backgroundColor: 'primary.dark',
          // '&:hover': {
          //   backgroundColor: 'primary.main',
          //   opacity: [0.9, 0.8, 0.7],
          // },
        >
          <Stack direction="column" justifyContent={'center'} spacing={2} marginLeft={0}>
            <h2 style={{ textAlign: 'center', color: '#56528D' }}>Dodaj punkt</h2>
            <TextField
              id="outlined-basic"
              name="productName"
              defaultValue={formInput.productName}
              onChange={handleInput}
              label="Nazwa produktu"
              variant="outlined"
            />

            <TextField
              id="outlined-select-currency"
              name="categories"
              value={formInput.categories}
              onChange={handleInput}
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
            <LocationSearchAutocomplete onSelectedLocation={setLocation} searchValueOverride={location?.address} />
            <div>
              {['P', 'W', 'Ś', 'C', 'P', 'S', 'N'].map((letter, index) => {
                return (
                  <Button variant="outlined" size="small" key={index}>
                    {letter}
                  </Button>
                );
              })}
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={['MobileDateTimePicker', 'MobileDateTimePicker']}
                sx={{ flexDirection: 'row', justifyItems: 'top', gap: 1 }}
              >
                <MobileTimePicker label={'Otwarcie'} openTo="hours" sx={{ minWidth: 'auto !important' }} />
                <MobileTimePicker label={'Zamknięcie'} openTo="hours" sx={{ minWidth: 'auto !important' }} />
              </DemoContainer>
            </LocalizationProvider>
            <FormGroup sx={{ display: 'flex', flexDirection: 'row', marginLeft: 0 }}>
              <FormControlLabel control={<Checkbox />} label="Czynne całą dobę" />
              <FormControlLabel control={<Checkbox />} label="Zamknięte" />
            </FormGroup>
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
            <TextField
              id="outlined-multiline-static"
              name="additionalInfo"
              label="Dodatkowe informacje"
              multiline
              rows={4}
              defaultValue=""
            />

            <Button variant="contained" size="large" type="submit">
              Dodaj punkt do mapy
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Map
            shopsWithWasteRecycling={shopsWithWasteRecycling}
            selectedAddress={location}
            onSelectedPointChange={handleSelectedPointChange}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default FormPage;
