'use client';
import React, { useState } from 'react';
import MapComponent from './components/map/MapComponent';
import SearchComponent from './components/SearchComponent';
import { Coordinates } from './types';
import Sidebar from './components/sidebar';

const MapPage: React.FC = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [query, setQuery] = useState('');
  return (
    <div>
      <SearchComponent setQuery={setQuery} />
      <Sidebar />
      {/* <FormPage/> */}
      <MapComponent setLocation={setLocation} />
      {location && (
        <p>
          Selected Location: {location.lat}, {location.lng}
        </p>
      )}
    </div>
  );
};

export default MapPage;
