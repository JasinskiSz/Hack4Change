import mongoose from 'mongoose';

const wasteDropOffPointSchema = new mongoose.Schema(
  {
    name: String,
    adress: {},
    lat: Number,
    lng: Number,
    description: String,
    categories: [String],
    isProfit: Boolean,
    WhatProfit: String,
    additionalInfo: String,
    imagePath: String,
    isConfirmed: Boolean,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.WasteDropOffPoint || mongoose.model('WasteDropOffPoint', wasteDropOffPointSchema);
