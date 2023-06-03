import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Please use POST.' });
  }

  const { city, shops = [] } = req.body;

  if (!city) {
    return res.status(400).json({ error: 'Please provide city.' });
  }

  // Define default shops
  const defaultShops = ['biedronka', 'żabka', 'rtv euro agd', 'mediamarkt', 'paczkomat', 'leroy merlin', 'castorama'];

  // Use default shops if no shops were provided
  const shopsToSearch = shops.length > 0 ? shops : defaultShops;

  let query: string;
  const promises = shopsToSearch.map((shop: string) => {
    if (shop.toLowerCase().includes('paczkomat')) {
      query = `
      [out:json];
        area["name"="Gdańsk"]->.searchArea;
        (node["amenity"="parcel_locker"]["operator"="InPost"](area.searchArea);
        way["amenity"="parcel_locker"]["operator"="InPost"](area.searchArea);
        rel["amenity"="parcel_locker"]["operator"="InPost"](area.searchArea);
        );
        out body;
        >;
        out skel qt;
      `;
    } else {
      query = `
    [out:json];
    area["name"="${city}"]->.searchArea;
    (
      node["shop"~"convenience|doityourself|electronics|supermarket"]["brand"~"${shop}", i](area.searchArea);
      way["shop"~"convenience|doityourself|electronics|supermarket"]["brand"~"${shop}", i](area.searchArea);
      relation["shop"~"convenience|doityourself|electronics|supermarket"]["brand"~"${shop}", i](area.searchArea);
    );
    out body;
    >;
    out skel qt;
    `;
    }

    return axios.post('https://overpass-api.de/api/interpreter', new URLSearchParams({ data: query }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  });

  const responses = await Promise.all(promises);

  // Map the response data to the expected format
  const results = responses.flatMap((response) =>
    response.data.elements
      .map((element) => {
        if (element.tags) {
          return {
            name: element.tags.name != null ? element.tags.name : 'Paczkomat',
            city: element.tags['addr:city'],
            lat: element.lat,
            lng: element.lon,
            description: 'Punkt przyjmuje elektrośmieci.',
            categories: 'Elektrośmieci',
            isProfit: true,
            WhatProfit: 'brak szczegółów.',
            additionalInfo: 'Autmatycznie wygenerowane',
            imagePath: '/',
            isConfirmed: true,
          };
        }
      })
      .filter(Boolean),
  );

  return res.status(200).json(results);
}
