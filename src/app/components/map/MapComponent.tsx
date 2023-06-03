'use client';
import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLng, LatLngExpression } from 'leaflet';

const AddPoint = () => {
  const [currentPoint, setCurrentPoint] = useState<LatLng | null>(null);
  const map = useMapEvents({
    click: (event) => {
      console.log(event.latlng);
      setCurrentPoint(event.latlng);
    },
  });
  console.log(currentPoint);

  if (currentPoint) {
    <Marker position={currentPoint}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>;
  }

  return null;
};

const GDANSK_POSITION: LatLngExpression = [54.3475, 18.645278];

const page = () => {
  return (
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
  );
};

export default page;
