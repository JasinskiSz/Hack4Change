'use client';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLng, LatLngExpression } from 'leaflet';
import { LocationSearchAutocomplete } from './LocationSearchAutocomplete';
import { RecenterAutomatically } from './RecenterAutomatically';
import { AddPoint } from './AddPoint';
import { PointerIcon } from './PointerIcon';
import { GeneratePoint } from './GeneratePoint';
import axios from 'axios';

const GDANSK_POSITION: LatLngExpression = [54.3475, 18.645278];

const Page = () => {
  const [selectedAddress, setSelectedAddress] = useState<LatLng | null>(null);
  const [shopsWithWasteRecycling, setShopsWithWasteRecycling] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/ShopsWithWasteRecycling', {
          city: 'Gdańsk',
          shops: [],
        });
        setShopsWithWasteRecycling(response.data.filter((point) => point && point.lat));
        console.log(shopsWithWasteRecycling);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectedLocation = (coordinates: LatLng) => {
    setSelectedAddress(coordinates);
  };

  return (
    <div>
      <LocationSearchAutocomplete onSelectedLocation={handleSelectedLocation} />
      <MapContainer center={GDANSK_POSITION} zoom={20} scrollWheelZoom={false} style={{ height: '100vh' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={GDANSK_POSITION} icon={PointerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <AddPoint lat={undefined} lng={undefined} />
        {shopsWithWasteRecycling.length > 0 && <GeneratePoint points={shopsWithWasteRecycling} />}
        {selectedAddress && <RecenterAutomatically lat={selectedAddress.lat} lng={selectedAddress.lng} />}
      </MapContainer>
    </div>
  );
};

export default Page;
