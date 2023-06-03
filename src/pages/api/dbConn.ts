"use client"
import {dbConnect, testConnection} from "../../db/db"

// var conn = dbConnect();
// conn.


export default async function handler(req, res) {
    if (req.method === 'GET') {
    await testConnection();
      res.status(200).json({ text: 'Hello World' });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }