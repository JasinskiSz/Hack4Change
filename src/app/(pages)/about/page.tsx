"use client"
import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import dynamic from "next/dynamic";
const position = [51.505, -0.09];

const page = () => {
  const MapWithNoSSR = dynamic(() => import("../../components/map/MapComponent"), {
    ssr: false
  });

  return (
    <div>
<h1>hejka</h1>
   <MapWithNoSSR/>
    </div>
  )
}

export default page