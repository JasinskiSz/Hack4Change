import React, { useEffect, useRef, Dispatch, SetStateAction } from 'react';
import L from 'leaflet';
import {Coordinates} from '../../types'



interface MapComponentProps {
  setLocation:(coords:Coordinates)=>void;
}

const MapComponent: React.FC<MapComponentProps> = ({setLocation}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current !== null) {
      const map = L.map(mapRef.current).setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      map.on('click', function(e) {
        const { lat, lng } = e.latlng;
        setLocation({ lat, lng });
      });
    }
  }, []);

  return <div ref={mapRef} style={{ height: "500px", width: "100%" }} />;
}

export default MapComponent;