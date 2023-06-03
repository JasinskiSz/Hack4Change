import { NextApiRequest, NextApiResponse } from 'next'
import { useState } from 'react';

// Przykładowa tablica miejsc
const locations = [
  { id: 1, name: 'Location 1', lat: 51.505, lng: -0.09 },
  { id: 2, name: 'Location 2', lat: 51.505, lng: -0.10 },
  // ... więcej miejsc
]
const [location, setLocation] = useState<Location | null>(null);


export default (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query.q as string;
  const results = locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ results }));
}