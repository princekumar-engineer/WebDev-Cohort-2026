import { Router } from 'express';
import {
  uploadImage,
  listImages,
  getImage,
  downloadImage,
  downloadThumbnail,
  deleteImage,
} from '../controllers/image.controller.js';
import { upload } from '../middlewares/upload.middleware.js';
import { validateObjectId } from '../middlewares/validateObjectId.middleware.js';

/**
 * Image Routes Definition
 *
 * POST   /                  → uploadImage (use upload.single('image') middleware)
 * GET    /                  → listImages
 * GET    /:id               → getImage (use validateObjectId middleware)
 * GET    /:id/download      → downloadImage (use validateObjectId middleware)
 * GET    /:id/thumbnail     → downloadThumbnail (use validateObjectId middleware)
 * DELETE /:id               → deleteImage (use validateObjectId middleware)
 */

const router = Router();

// Base collection endpoints
router.route('/')
  .post(upload.single('image'), uploadImage)
  .get(listImages);

// Individual resource metadata and removal endpoints
router.route('/:id')
  .get(validateObjectId, getImage)
  .delete(validateObjectId, deleteImage);

// Binary file retrieval stream endpoints
router.get('/:id/download', validateObjectId, downloadImage);
router.get('/:id/thumbnail', validateObjectId, downloadThumbnail);

export default router;