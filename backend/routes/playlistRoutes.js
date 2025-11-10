import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createPlaylist,
  addTrackToPlaylist,
  getUserPlaylists,
  getPlaylistById
} from '../controllers/playlistController.js';

const router = express.Router();

router.post('/', protect, createPlaylist);
router.post('/add', protect, addTrackToPlaylist);
router.get('/mine', protect, getUserPlaylists);
router.get('/:id', getPlaylistById);

export default router;
