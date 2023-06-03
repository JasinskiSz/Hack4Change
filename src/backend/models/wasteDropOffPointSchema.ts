import mongoose from 'mongoose';

const wasteDropOffPointSchema = new mongoose.Schema({
  name: String,
  city: String,
  lat: Number,
  lng: Number,
  description: String,
  category: String,
  profit: Boolean,
  WhatProfit: String,
  additionalInfo: String,
  imagePath: String
}, {
  timestamps: true,  // dodaje pola createdAt i updatedAt
});

export default mongoose.models.WasteDropOffPoint || mongoose.model('WasteDropOffPoint', wasteDropOffPointSchema);