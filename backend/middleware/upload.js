import multer from 'multer';
import path from 'path';
import fs from 'fs';

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

ensureDir(path.join(process.cwd(), 'uploads', 'tracks'));
ensureDir(path.join(process.cwd(), 'uploads', 'covers'));
ensureDir(path.join(process.cwd(), 'uploads', 'others'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'track') cb(null, path.join('uploads', 'tracks'));
    else if (file.fieldname === 'cover') cb(null, path.join('uploads', 'covers'));
    else cb(null, path.join('uploads', 'others'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB cap
  fileFilter: (req, file, cb) => {
    const allowed = ['.mp3', '.wav', '.m4a', '.flac', '.jpg', '.jpeg', '.png'];
    if (allowed.includes(path.extname(file.originalname).toLowerCase())) cb(null, true);
    else cb(new Error('Invalid file type'));
  }
});
