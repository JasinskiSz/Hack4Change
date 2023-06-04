'use client';
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { RawResult } from 'leaflet-geosearch/dist/providers/openCageProvider';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider';
import axios from 'axios';
import { useDebounce } from '@/app/utils/useDebounce';
import { LatLng } from 'leaflet';

export type LocationSearchAutocompleteResult = LatLng & { address: string };

export const LocationSearchAutocomplete = (props: { onSelectedLocation: (location: LocationSearchAutocompleteResult) => void }) => {
  const [options, setOptions] = useState<SearchResult<RawResult>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');
  const debouncesSearchValue = useDebounce(searchValue, 500);

  const fetchOptions = async (query: string) => {
    setLoading(true);
    const response = await axios.get<SearchResult<RawResult>[]>(`/api/locations?query=${query}`);
    setLoading(false);
    setOptions(response.data);
  };

  useEffect(() => {
    if (debouncesSearchValue) {
      fetchOptions(debouncesSearchValue);
    }
  }, [debouncesSearchValue]);

  const autocompleteOptions = options.map((option) => {
    return {
      label: option.formatted,
      value: option,
    };
  });

  return (
    <div className="search-bar">
      <Asynchronous
        options={autocompleteOptions}
        loading={loading}
        handleOptionSelected={(value) => {
          console.log({ value });
          props.onSelectedLocation({
            lat: value.geometry.lat,
            lng: value.geometry.lng,
            address: value.formatted,
          });
        }}
        handleValueChange={setSearchValue}
      />
    </div>
  );
};

function Asynchronous(props: {
  options: { label: string; value: unknown }[];
  handleValueChange: (value: string) => void;
  handleOptionSelected: (value: any) => void;
  loading: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Autocomplete
      fullWidth
      id="asynchronous-demo"
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
        console.log({ option });
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
          fullWidth
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
