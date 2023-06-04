'use client';

import wasteDropOffPointSchema from '@/backend/models/wasteDropOffPointSchema';
import { dbConnect } from '@/db/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await dbConnect();
    const points = await wasteDropOffPointSchema.find({});
    res.status(200).json(points);
  } else if (req.method === 'POST') {
    await dbConnect();
    const { name, adress, lat, lng, description, categories, isProfit, WhatProfit, additionalInfo, imagePath, isConfirmed } = req.body;
    const newWasteDropOffPoint = {
      name,
      adress,
      lat,
      lng,
      description,
      categories,
      isProfit,
      WhatProfit,
      additionalInfo,
      imagePath,
      isConfirmed,
    };
    console.log(newWasteDropOffPoint);

    try {
      const createdPoint = await wasteDropOffPointSchema.create(newWasteDropOffPoint);

      res.status(201).json({ success: true, data: createdPoint });
    } catch (error) {
      res.status(400).json({ success: false, error: error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
