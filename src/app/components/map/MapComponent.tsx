'use client';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLng, LatLngExpression } from 'leaflet';
import { LocationSearchAutocomplete } from './LocationSearchAutocomplete';
import { RecenterAutomatically } from './RecenterAutomatically';
import { AddPoint } from './AddPoint';
import { PointerIcon } from './PointerIcon';
import { GeneratePoint } from './GeneratePoint';

const GDANSK_POSITION: LatLngExpression = [54.3475, 18.645278];

interface MapProps {
  shopsWithWasteRecycling: any[];
}

const Map = ({ shopsWithWasteRecycling }: MapProps) => {
  const [selectedAddress, setSelectedAddress] = useState<LatLng | null>(null);

  const handleSelectedLocation = (coordinates: LatLng) => {
    setSelectedAddress(coordinates);
  };

  return (
    <div>
      <LocationSearchAutocomplete onSelectedLocation={handleSelectedLocation} />
      <MapContainer center={GDANSK_POSITION} zoom={15} scrollWheelZoom={false} style={{ height: '100vh' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AddPoint lat={undefined} lng={undefined} />
        {shopsWithWasteRecycling.length > 0 && <GeneratePoint points={shopsWithWasteRecycling} />}
        {selectedAddress && <RecenterAutomatically lat={selectedAddress.lat} lng={selectedAddress.lng} />}
      </MapContainer>
    </div>
  );
};

export default Map;
