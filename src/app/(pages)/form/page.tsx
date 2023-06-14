'use client';

import React, { FormEvent, useReducer, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import { LatLngLiteral, control } from 'leaflet';
import { OpenStreetAddress } from '@/app/types';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export const theme1 = createTheme({
  palette: {
    primary: {
      main: '#56528D',
    },
  },
});

interface DayButtonProps {
  clicked: boolean;
}

const DayButton = styled(Button)<DayButtonProps>`
  background-color: ${({ clicked }) => (clicked ? '#56528D' : '#ffffff')};
  color: ${({ clicked }) => (clicked ? '#ffffff' : '#56528D')};
  min-width: 35px;
  /* margin-right: 10px; */
`;

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

  const handleInput = (e) => {
    const name = e.target.name;
    const newValue = e.target.value;
    setFormInput({ [name]: newValue });
  };

  // const [buttons, setButtons] = useState(['P', 'W', 'Ś', 'C', 'P', 'S', 'N'].map((letter, index) => ({ index, letter, clicked: false })));

  // const handleClick = (index: number) => {
  //   setButtons((prevButtons) => prevButtons.map((button) => (button.index === index ? { ...button, clicked: !button.clicked } : button)));
  // };

  const [buttons, setButtons] = useState(['P', 'W', 'Ś', 'C', 'P', 'S', 'N'].map((letter, index) => ({ index, letter, clicked: false })));

  const handleClick = (index: number) => {
    setButtons((prevButtons) => prevButtons.map((button) => (button.index === index ? { ...button, clicked: !button.clicked } : button)));
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

  const [allDay, setAllDay] = useState(false);
  const [allClosed, setClosed] = useState(false);
  const clockDisabled = allDay || allClosed;
  return (
    <ThemeProvider theme={theme1}>
      <Grid container>
        <Grid
          item
          xs={3}
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',

            // '& .MuiTextField-root': { m: 0, marginTop: 2 },
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
          <Stack direction="column" justifyContent={'center'} spacing={2} padding={4} maxWidth={460}>
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              {buttons.map((button) => {
                return (
                  <DayButton
                    clicked={button.clicked ? 'true' : undefined}
                    onClick={() => handleClick(button.index)}
                    variant="outlined"
                    size="small"
                    key={button.index}
                  >
                    {button.letter}
                  </DayButton>
                );
              })}
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyItems: 'top',
                  gap: 1,
                }}
              >
                <MobileTimePicker label={'Otwarcie'} openTo="hours" sx={{ minWidth: 'auto !important' }} disabled={clockDisabled} />
                <MobileTimePicker label={'Zamknięcie'} openTo="hours" sx={{ minWidth: 'auto !important' }} disabled={clockDisabled} />
              </Box>
            </LocalizationProvider>
            <FormGroup sx={{ display: 'flex', flexDirection: 'row', marginLeft: 0 }}>
              <FormControlLabel control={<Checkbox />} onChange={(_e, checked) => setAllDay(checked)} label="Czynne całą dobę" />
              <FormControlLabel control={<Checkbox />} onChange={(_e, checked) => setClosed(checked)} label="Zamknięte" />
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
              rows={3}
              defaultValue=""
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <input type="file"></input>
              <button>dodaj zdjęcie</button>
            </div>

            <Button variant="contained" size="large" type="submit">
              Dodaj punkt do mapy
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={9}>
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
