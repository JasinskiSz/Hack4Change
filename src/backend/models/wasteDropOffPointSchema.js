import mongoose from 'mongoose';

const wasteDropOffSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
}, {
  timestamps: true,  // dodaje pola createdAt i updatedAt
});

export default mongoose.models.User || mongoose.model('User', UserSchema);