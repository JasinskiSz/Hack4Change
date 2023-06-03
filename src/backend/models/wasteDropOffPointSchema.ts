import mongoose from 'mongoose';

const wasteDropOffPointSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
}, {
  timestamps: true,  // dodaje pola createdAt i updatedAt
});

export default mongoose.models.WasteDropOffPoint || mongoose.model('WasteDropOffPoint', wasteDropOffPointSchema);