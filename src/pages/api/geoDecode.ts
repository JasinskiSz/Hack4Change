import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Please use POST.' });
  }

  const { lat, lng } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Please provide both latitude and longitude.' });
  }

  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    if (response.status === 200) {
      return res.status(200).json({ address: response.data.address });
    } else {
      throw new Error('Geocoding failed');
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
