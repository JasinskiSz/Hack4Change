import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import { LatLng, latLng } from 'leaflet';
import { PointerIcon } from './PointerIcon';
import { useEffect } from "react";

export const GeneratePoint = ({ points }) => {
    return (
      <>
        {points.map((point, index) => (
          <Marker key={index} position={point} icon={PointerIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </>
    );
  };