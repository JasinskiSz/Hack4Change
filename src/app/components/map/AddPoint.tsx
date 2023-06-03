import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import { LatLng, latLng } from 'leaflet';
import { PointerIcon } from './PointerIcon';

export const AddPoint = () => {
  const [currentPoint, setCurrentPoint] = useState<LatLng | null>(null);
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
