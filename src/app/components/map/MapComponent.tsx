'use client';
import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import { LatLng, LatLngExpression, latLng } from 'leaflet';
import { LocationSearchAutocomplete } from './LocationSearchAutocomplete';

const CustomIcon = new Icon({ iconUrl: markerIconPng.src, iconSize: [25, 41], iconAnchor: [12, 41] });

const AddPoint = () => {
  const [currentPoint, setCurrentPoint] = useState<LatLng | null>(null);
  const map = useMapEvents({
    click: (event) => {
      console.log(event.latlng);
      setCurrentPoint(event.latlng);
    },
  });

  if (currentPoint) {
    const point = latLng(currentPoint);

    return (
      <Marker position={point} icon={CustomIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    );
  }

  return null;
};

const GDANSK_POSITION: LatLngExpression = [54.3475, 18.645278];

const handleSelectedLocation = (coordinates: LatLng) => {
  console.log('selected coordinates', coordinates);
};

const page = () => {
  return (
    <div>
      <LocationSearchAutocomplete onSelectedLocation={handleSelectedLocation} />
      <MapContainer center={GDANSK_POSITION} zoom={20} scrollWheelZoom={false} style={{ height: '100vh' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={GDANSK_POSITION}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <AddPoint />
      </MapContainer>
    </div>
  );
};

export default page;
