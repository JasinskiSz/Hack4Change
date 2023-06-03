import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import { LatLng, latLng } from 'leaflet';
import { PointerIcon } from './PointerIcon';
import { useEffect } from "react"; // Importuj useEffect

export const AddPoint = ({ lat, lng }) => { // Dodaj lat i lng do propsów
  const [currentPoint, setCurrentPoint] = useState<LatLng | null>(null);

  // Użyj useEffect do ustawienia punktu początkowego na podstawie lat i lng
  useEffect(() => {
    if (lat && lng) {
      setCurrentPoint(latLng(lat, lng));
    }
  }, [lat, lng]);

  useMapEvents({
    click: (event) => {
      console.log(event.latlng);
      setCurrentPoint(event.latlng);
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
