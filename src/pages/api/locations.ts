import { NextApiRequest, NextApiResponse } from 'next';
import * as opencage from 'opencage-api-client';
import axios from 'axios';

// https://opencagedata.com/tutorials/geocode-in-nodejs
const fetchByQuery = (query: string, res: NextApiResponse) => {
  return opencage
    .geocode({ q: query, pretty: 1 })
    .then((data) => {
      // console.log(JSON.stringify(data));
      if (data.status.code === 200 && data.results.length > 0) {
        return res.status(200).json(data.results);
      } else {
        return res.status(200).json([]);
      }
    })
    .catch((error) => {
      // https://opencagedata.com/api#codes
      if (error.status.code === 402) {
        console.log('hit free trial daily limit');
        return res.status(402).json({});
      }
      return res.status(500).json({});
    });
};

const fetchByCoordinates = async ({ lat, lng }: { lat: number; lng: number }, res: NextApiResponse) => {
  const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
  if (response.status === 200) {
    console.log(response.data);
    return res.status(200).json({ address: response.data.address });
  } else {
    throw new Error('Geocoding failed');
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { lat, lng, query } = req.query;
    if (query) {
      return fetchByQuery(String(query), res);
    }
    if (lat && lng) {
      return fetchByCoordinates({ lat, lng }, res);
    }
    return res.status(400).end(`Missing query params, query or lat+lng required`);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
