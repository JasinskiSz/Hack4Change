'use client';
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { RawResult } from 'leaflet-geosearch/dist/providers/openCageProvider';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider';
import axios from 'axios';
import { useDebounce } from '@/app/utils/useDebounce';
import { LatLngLiteral } from 'leaflet';

export type LocationSearchAutocompleteResult = LatLngLiteral & { address: string };

export const LocationSearchAutocomplete = (props: {
  onSelectedLocation: (location: LocationSearchAutocompleteResult) => void;
  searchValueOverride?: string;
}) => {
  const [options, setOptions] = useState<SearchResult<RawResult>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (props.searchValueOverride) {
      setSearchValue(props.searchValueOverride);
    }
  }, [props.searchValueOverride]);
  const debouncesSearchValue = useDebounce(searchValue, 500);
  // nie robić dwa razy takiego samego zapytania jak przychodzi z góry
  const fetchOptions = async (query: string) => {
    setLoading(true);
    const response = await axios.get<SearchResult<RawResult>[]>(`/api/locations?query=${query}`);
    setLoading(false);
    setOptions(response.data);
  };

  useEffect(() => {
    if (debouncesSearchValue && debouncesSearchValue !== props.searchValueOverride) {
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
        searchValueOverride={props.searchValueOverride}
      />
    </div>
  );
};

function Asynchronous(props: {
  options: { label: string; value: unknown }[];
  handleValueChange: (value: string) => void;
  handleOptionSelected: (value: any) => void;
  loading: boolean;
  searchValueOverride?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState('');
  console.log({ inputValue });
  useEffect(() => {
    if (props.searchValueOverride) {
      setInputValue(props.searchValueOverride);
    }
  }, [props.searchValueOverride]);

  return (
    <Autocomplete
      fullWidth
      id="asynchronous-demo"
      open={open}
      inputValue={inputValue}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onInputChange={(_event, value, reason) => {
        // this will break reset but fix new address
        if (reason === 'reset') {
          return;
        }
        props.handleValueChange(value);
        setInputValue(value);
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
