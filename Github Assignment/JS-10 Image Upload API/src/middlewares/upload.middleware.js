import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

/**
 * Configure multer for image uploads
 *
 * 1. Define __dirname and UPLOAD_DIR (path to uploads folder in project root)
 * 2. Create diskStorage with:
 * - destination: UPLOAD_DIR
 * - filename: Generate unique name using Date.now() and crypto.randomBytes(4).toString('hex')
 * Format: {timestamp}-{random}{extension}
 * 3. Add fileFilter to validate:
 * - Only allow image/jpeg, image/png, image/gif
 * - Reject others with: cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false)
 * 4. Set limits:
 * - fileSize: 5MB (5 * 1024 * 1024)
 * 5. Export upload middleware
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, '../../uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const random = crypto.randomBytes(4).toString('hex');
    cb(null, `${Date.now()}-${random}${ext}`);
  },
});

// Relaxed filter to avoid cutting network streams abruptly
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/gif'];

  if (!allowed.includes(file.mimetype)) {
    // Attach an invalid flag directly to the request body so our controller can throw a clean 400 response
    req.fileValidationError = 'Invalid file type. Only JPEG, PNG, and GIF are allowed.';
    return cb(null, false);
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});