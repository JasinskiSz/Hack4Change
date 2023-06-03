import React, { ChangeEvent, useCallback, useRef, useState } from 'react';

interface Result {
  lat: number;
  lng: number;
}

interface SearchComponentProps {
  setQuery: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ setQuery }) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [results, setResults] = useState<Result[]>([]);

  const searchEndpoint = (query: string) => `/api/search?q=${query}`;

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          setResults(res.results);
        });
    } else {
      setResults([]);
    }
  }, []);

  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener('click', onClick);
  }, []);

  const onClick = useCallback((event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setActive(false);
      window.removeEventListener('click', onClick);
    }
  }, []);

  return (
    <div ref={searchRef}>
      <input onChange={onChange} onFocus={onFocus} placeholder="Search location" type="text" />
      {active && results.length > 0 && (
        <ul>
          {results.map(({ lat, lng }) => (
            <li key={`${lat},${lng}`}>
              {lat}, {lng}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
