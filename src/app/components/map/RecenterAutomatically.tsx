import { LatLngLiteral } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export const RecenterAutomatically = ({ lat, lng }: LatLngLiteral) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};
