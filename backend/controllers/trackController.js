import Track from '../models/Track.js';
import fs from 'fs';
import path from 'path';

export const uploadTrack = async (req, res) => {
  try {
    const { title, artist, album } = req.body;
    if (!req.files || !req.files.track) return res.status(400).json({ message: 'No track file' });

    const trackFile = req.files.track[0];
    const coverFile = req.files.cover ? req.files.cover[0] : null;

    const track = await Track.create({
      title: title || trackFile.originalname,
      artist: artist || 'Unknown',
      album: album || '',
      src: `/uploads/tracks/${trackFile.filename}`,
      cover: coverFile ? `/uploads/covers/${coverFile.filename}` : '',
      uploadedBy: req.user._id
    });

    res.status(201).json(track);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getTracks = async (req, res) => {
  try {
    const q = req.query.q;
    const filter = q
      ? { $or: [{ title: new RegExp(q, 'i') }, { artist: new RegExp(q, 'i') }, { album: new RegExp(q, 'i') }] }
      : {};
    const tracks = await Track.find(filter).sort({ createdAt: -1 }).limit(200);
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTrackById = async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) return res.status(404).json({ message: 'Track not found' });
    res.json(track);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const streamTrack = (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), 'uploads', 'tracks', filename);

    if (!fs.existsSync(filePath)) return res.status(404).end();

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'audio/mpeg'
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = { 'Content-Length': fileSize, 'Content-Type': 'audio/mpeg' };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Streaming error' });
  }
};

export const incrementPlays = async (req, res) => {
  try {
    const track = await Track.findByIdAndUpdate(req.params.id, { $inc: { plays: 1 } }, { new: true });
    if (!track) return res.status(404).json({ message: 'Track not found' });
    res.json(track);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
