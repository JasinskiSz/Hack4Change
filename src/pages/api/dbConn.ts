"use client"
import wasteDropOffPointSchema from "@/backend/models/wasteDropOffPointSchema";
import {dbConnect, testConnection} from "../../db/db"

// var conn = dbConnect();
// conn.


export default async function handler(req, res) {
    if (req.method === 'GET') {
      await dbConnect();
      res.status(200).json({ text: 'Hello World' });
      const newLoc = await wasteDropOffPointSchema.create({ name: 'Ekomat', lng: 1, lat: 2 });
      await newLoc.save();
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }