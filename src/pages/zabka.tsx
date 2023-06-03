import { useEffect, useState } from 'react';

export default function ZabkaStores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = `
      [out:json];
      area["name"="Gdańsk"]->.searchArea;
      (
        node["shop"="convenience"]["brand"="Żabka"](area.searchArea);
        way["shop"="convenience"]["brand"="Żabka"](area.searchArea);
        relation["shop"="convenience"]["brand"="Żabka"](area.searchArea);
      );
      out body;
      >;
      out skel qt;
      `;

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: new URLSearchParams({ data: query }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      const data = await response.json();
      setStores(data.elements);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Sklepy Żabka w Gdańsku:</h1>
      <ul>
        {stores.map((store, index) => (
          <li key={index}>
            Sklep Żabka o id: {store.id}, typ: {store.type}, współrzędne: {store.lat}, {store.lon}
          </li>
        ))}
      </ul>
    </div>
  );
}