import * as opencage from 'opencage-api-client';

// https://opencagedata.com/tutorials/geocode-in-nodejs
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const query = req.query.query;
    opencage
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
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
