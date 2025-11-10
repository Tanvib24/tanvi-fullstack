import express from 'express';
import { upload } from '../middleware/upload.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';
import {
  uploadTrack,
  getTracks,
  getTrackById,
  streamTrack,
  incrementPlays
} from '../controllers/trackController.js';

const router = express.Router();

// multipart form with fields: track (file), cover (file)
router.post(
  '/upload',
  protect,
  upload.fields([{ name: 'track', maxCount: 1 }, { name: 'cover', maxCount: 1 }]),
  uploadTrack
);

router.get('/', getTracks);
router.get('/:id', getTrackById);

// route for streaming: GET /api/tracks/stream/:filename
router.get('/stream/:filename', streamTrack);

// increment play count
router.post('/play/:id', incrementPlays);

export default router;
