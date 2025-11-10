import Playlist from '../models/Playlist.js';
import Track from '../models/Track.js';

export const createPlaylist = async (req, res) => {
  try {
    const { name, isPublic } = req.body;
    const pl = await Playlist.create({ name, owner: req.user._id, isPublic: !!isPublic });
    res.status(201).json(pl);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addTrackToPlaylist = async (req, res) => {
  try {
    const { playlistId, trackId } = req.body;
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    if (!playlist.owner.equals(req.user._id)) return res.status(403).json({ message: 'Not owner' });

    const track = await Track.findById(trackId);
    if (!track) return res.status(404).json({ message: 'Track not found' });

    playlist.tracks.push(track._id);
    await playlist.save();
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ owner: req.user._id }).populate('tracks');
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('tracks');
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
