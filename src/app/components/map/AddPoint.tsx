'use client';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import { LatLng, latLng } from 'leaflet';
import { PointerIcon } from './PointerIcon';
import { useEffect } from 'react';

export const AddPoint = ({
  lat,
  lng,
  onSelectedPointChange,
}: {
  lat?: LatLng['lat'];
  lng?: LatLng['lng'];
  onSelectedPointChange: (coordinates: LatLng) => void;
}) => {
  const [currentPoint, setCurrentPoint] = useState<LatLng | null>(null);

  useEffect(() => {
    if (lat && lng) {
      setCurrentPoint(latLng(lat, lng));
    }
  }, [lat, lng]);

  useMapEvents({
    click: (event) => {
      setCurrentPoint(event.latlng);
      onSelectedPointChange(event.latlng);
    },
  });

  if (currentPoint) {
    const point = latLng(currentPoint);

    return (
      <Marker position={point} icon={PointerIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    );
  }

  return null;
};
