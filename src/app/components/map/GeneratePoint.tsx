import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import { LatLng, latLng } from 'leaflet';
import { PointerIcon } from './PointerIcon';
import { useEffect } from "react";

export const GeneratePoint = ({ points }) => {
  const [currentPoints, setCurrentPoints] = useState<LatLng[]>([]);

  useEffect(() => {
    if (points && points.length > 0) {
      const newPoints = points.map(({ lat, lng }) => latLng(lat, lng));
      setCurrentPoints(newPoints);
    }
  }, [points]);

  useMapEvents({
    click: (event) => {
      setCurrentPoints([...currentPoints, event.latlng]);
    },
  });

  return (
    <>
      {currentPoints.map((point, index) => (
        <Marker key={index} position={point} icon={PointerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ))}
    </>
  );
};