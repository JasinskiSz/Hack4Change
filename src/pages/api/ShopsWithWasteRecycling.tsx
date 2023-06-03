import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Please use POST.' });
  }

  const { city, shops } = req.body;

  if (!city || !shops || !Array.isArray(shops)) {
    return res.status(400).json({ error: 'Please provide both city and shops array.' });
  }
  let query: string;
  const promises = shops.map((shop : string) => {
    if (shop.toLowerCase().includes('inpost')) {
      query = `
      [out:json];
      area["name"="${city}"]->.searchArea;
      (
        node["amenity"="vending_machine"]["brand"~"InPost", i]["operator"~"InPost", i](area.searchArea);
        way["amenity"="vending_machine"]["brand"~"InPost", i]["operator"~"InPost", i](area.searchArea);
        relation["amenity"="vending_machine"]["brand"~"InPost", i]["operator"~"InPost", i](area.searchArea);
      );
      out body;
      >;
      out skel qt;
      `;
    }
    else{
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
const results = responses.flatMap(response =>
  response.data.elements.map(element => {
    if (element.tags) {
      return {
        name: element.tags.name,
        city: element.tags['addr:city'],
        lat: element.lat,
        lng: element.lon,
        description: 'Firma oferuje zbiórke.',
        categories: 'Elektrośmieci',
        isProfit: true,
        WhatProfit: 'Każda jednostka ma własną ofertę zwrotu',
        additionalInfo: 'Autmatycznie wygenerowane',
        imagePath: 'imagePath',
        isConfirmed: true,
      };
    }
  }).filter(Boolean)
);

return res.status(200).json(results);
}