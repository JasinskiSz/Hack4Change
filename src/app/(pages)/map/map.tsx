import React, { useState, Dispatch, SetStateAction } from 'react';
import MapComponent from '../../components/map/MapComponent';
import SearchComponent from '../../components/SearchComponent';

interface Location {
  lat: number;
  lng: number;
}

const MapPage: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [query, setQuery] = useState('');

  return (
    <div>
      <SearchComponent setQuery={setQuery} />
      <MapComponent setLocation={setLocation} />
      {location && (
        <p>Selected Location: {location.lat}, {location.lng}</p>
      )}
    </div>
  );
}

export default MapPage;