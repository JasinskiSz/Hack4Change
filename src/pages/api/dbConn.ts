"use client"

import {dbConnect} from "../../db/db"

// var conn = dbConnect();
// conn.


export default async function handler(req, res) {
    if (req.method === 'GET') {
      await dbConnect();
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }