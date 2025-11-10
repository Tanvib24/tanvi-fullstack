import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, default: 'Unknown' },
  album: { type: String, default: '' },
  duration: { type: Number }, // seconds (optional)
  src: { type: String, required: true }, // relative path like /uploads/tracks/xxx.mp3 or URL
  cover: { type: String, default: '' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  plays: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Track = mongoose.model('Track', trackSchema);
export default Track;
