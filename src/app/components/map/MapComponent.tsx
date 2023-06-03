'use client';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import { LatLng, LatLngExpression, latLng } from 'leaflet';
import { OpenCageProvider } from 'leaflet-geosearch';
import 'node_modules/leaflet-geosearch/dist/geosearch.css';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { RawResult } from 'leaflet-geosearch/dist/providers/openCageProvider';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider';

const CustomIcon = new Icon({ iconUrl: markerIconPng.src, iconSize: [25, 41], iconAnchor: [12, 41] });

const provider = new OpenCageProvider({
  params: {
    key: 'secret',
  },
});

function Asynchronous(props: {
  options: { label: string; value: unknown }[];
  handleValueChange: (value: string) => void;
  handleOptionSelected: (value: any) => void;
  loading: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onInputChange={(_event, value) => {
        props.handleValueChange(value);
      }}
      filterOptions={(x) => x}
      onChange={(_event, option) => {
        props.handleOptionSelected(option?.value);
      }}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      getOptionLabel={(option) => option.label}
      options={props.options}
      loading={props.loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Adres"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {props.loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

const LocationSearch = () => {
  const [options, setOptions] = useState<SearchResult<RawResult>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');
  const debouncesSearchValue = useDebounce(searchValue, 500);

  const fetchOptions = async (query: string) => {
    setLoading(true);
    const response = await provider.search({ query });
    setLoading(false);
    setOptions(response);
  };

  useEffect(() => {
    if (debouncesSearchValue) {
      fetchOptions(debouncesSearchValue);
    }
  }, [debouncesSearchValue]);

  const autocompleteOptions = options.map((option) => {
    return {
      label: option.label,
      value: option.raw,
    };
  });

  return (
    <Asynchronous
      options={autocompleteOptions}
      loading={loading}
      handleOptionSelected={(value) => {
        // TODO: move map after option is selected
        console.log('selected option', { value });
      }}
      handleValueChange={setSearchValue}
    />
  );
};

const AddPoint = () => {
  const [currentPoint, setCurrentPoint] = useState<LatLng | null>(null);
  const map = useMapEvents({
    click: (event) => {
      console.log(event.latlng);
      setCurrentPoint(event.latlng);
    },
  });

  if (currentPoint) {
    const point = latLng(currentPoint);

    return (
      <Marker position={point} icon={CustomIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    );
  }

  return null;
};

const GDANSK_POSITION: LatLngExpression = [54.3475, 18.645278];

const page = () => {
  return (
    <div>
      <LocationSearch />
      <MapContainer center={GDANSK_POSITION} zoom={20} scrollWheelZoom={false} style={{ height: '100vh' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={GDANSK_POSITION}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <AddPoint />
      </MapContainer>
    </div>
  );
};

export default page;
