'use strict';
import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression, LatLngLiteral } from 'leaflet';
import { RecenterAutomatically } from './RecenterAutomatically';
import { AddPoint } from './AddPoint';
import { GeneratePoint } from './GeneratePoint';
import { Box, Slider, ThemeProvider, Typography, createTheme } from '@mui/material';
import { styled } from '@mui/system';

const GDANSK_POSITION: LatLngExpression = [54.3475, 18.645278];

interface MapProps {
  shopsWithWasteRecycling: any[];
  selectedAddress?: LatLngLiteral | null;
  onSelectedPointChange: (coordinates: LatLngLiteral) => void;
}
const SliderContainer = styled(Box)({
  position: 'fixed',
  width: '10vw',
  bottom: 0,
  left: 0,
  padding: '1rem',
  backgroundColor: '#fff',
  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
  zIndex: 9999,
});
const theme1 = createTheme({
  palette: {
    primary: {
      main: '#9FC446',
    },
  },
});

const DistanceSlider = () => {
  const [value, setValue] = useState(5);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme1}>
      <SliderContainer>
        <Typography id="continuous-slider" gutterBottom>
          Dystans: {value} km
        </Typography>
        <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" max={10} />
      </SliderContainer>
    </ThemeProvider>
  );
};

const Map = ({ shopsWithWasteRecycling, selectedAddress, onSelectedPointChange }: MapProps) => {
  return (
    <div>
      <MapContainer center={GDANSK_POSITION} zoom={15} scrollWheelZoom={false} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AddPoint lat={selectedAddress?.lat} lng={selectedAddress?.lng} onSelectedPointChange={onSelectedPointChange} />
        {shopsWithWasteRecycling.length > 0 && <GeneratePoint points={shopsWithWasteRecycling} />}
        {selectedAddress && <RecenterAutomatically lat={selectedAddress.lat} lng={selectedAddress.lng} />}
      </MapContainer>
      <DistanceSlider />
    </div>
  );
};

export default Map;
