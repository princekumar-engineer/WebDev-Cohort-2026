import request from 'supertest';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createApp } from '../../src/app.js';
import { Image } from '../../src/models/image.model.js';
import { setupDb, teardownDb, resetDb } from '../__helpers__/setupTestDb.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Test 6: Delete Images', () => {
  let app;
  const testImagePath = path.join(__dirname, '../__helpers__/test-image.jpg');

  beforeAll(async () => {
    await setupDb();
    app = createApp();

    // Create test image
    const jpegBuffer = Buffer.from([
      0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01,
      0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43,
      0x00, 0x08, 0x06, 0x06, 0x07, 0x06, 0x05, 0x08, 0x07, 0x07, 0x07, 0x09,
      0x09, 0x08, 0x0A, 0x0C, 0x14, 0x0D, 0x0C, 0x0B, 0x0B, 0x0C, 0x19, 0x12,
      0x13, 0x0F, 0x14, 0x1D, 0x1A, 0x1F, 0x1E, 0x1D, 0x1A, 0x1C, 0x1C, 0x20,
      0x24, 0x2E, 0x27, 0x20, 0x22, 0x2C, 0x23, 0x1C, 0x1C, 0x28, 0x37, 0x29,
      0x2C, 0x30, 0x31, 0x34, 0x34, 0x34, 0x1F, 0x27, 0x39, 0x3D, 0x38, 0x32,
      0x3C, 0x2E, 0x33, 0x34, 0x32, 0xFF, 0xC0, 0x00, 0x0B, 0x08, 0x00, 0x01,
      0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0xFF, 0xC4, 0x00, 0x14, 0x00, 0x01,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0xFF, 0xDA, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00,
      0x3F, 0x00, 0x7F, 0xFF, 0xD9
    ]);
    fs.writeFileSync(testImagePath, jpegBuffer);
  });

  afterAll(async () => {
    await teardownDb();
  });

  beforeEach(async () => {
    await resetDb();
  });

  describe('DELETE /api/images/:id', () => {
    it('should delete image successfully', async () => {
      const uploadResponse = await request(app)
        .post('/api/images')
        .attach('image', testImagePath);

      const imageId = uploadResponse.body._id;
      const filename = uploadResponse.body.filename;
      const thumbnailFilename = uploadResponse.body.thumbnailFilename;

      const response = await request(app).delete(`/api/images/${imageId}`);

      expect(response.status).toBe(204);

      // Check metadata deleted from database
      const image = await Image.findById(imageId);
      expect(image).toBeNull();

      // Check original file deleted
      const uploadsDir = path.join(__dirname, '../../uploads');
      const filePath = path.join(uploadsDir, filename);
      expect(fs.existsSync(filePath)).toBe(false);

      // Check thumbnail deleted
      const thumbnailPath = path.join(uploadsDir, 'thumbnails', thumbnailFilename);
      expect(fs.existsSync(thumbnailPath)).toBe(false);
    });

    it('should return 404 when image not found', async () => {
      const fakeId = '507f1f77bcf86cd799439011';

      const response = await request(app).delete(`/api/images/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toMatch(/image not found/i);
    });

    it('should return 400 for invalid ObjectId', async () => {
      const response = await request(app).delete('/api/images/invalid-id');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toMatch(/invalid id format/i);
    });

    it('should delete metadata even if files are missing', async () => {
      // Create image metadata without actual files
      const image = await Image.create({
        originalName: 'missing.jpg',
        filename: 'missing.jpg',
        mimetype: 'image/jpeg',
        size: 1000,
        width: 100,
        height: 100,
        thumbnailFilename: 'thumb-missing.jpg',
      });

      const response = await request(app).delete(`/api/images/${image._id}`);

      expect(response.status).toBe(204);

      // Metadata should still be deleted
      const deletedImage = await Image.findById(image._id);
      expect(deletedImage).toBeNull();
    });

    it('should not list deleted images', async () => {
      const uploadResponse = await request(app)
        .post('/api/images')
        .attach('image', testImagePath);

      const imageId = uploadResponse.body._id;

      await request(app).delete(`/api/images/${imageId}`);

      const listResponse = await request(app).get('/api/images');

      expect(listResponse.body.data).toHaveLength(0);
      expect(listResponse.body.meta.total).toBe(0);
    });

    it('should not allow download after deletion', async () => {
      const uploadResponse = await request(app)
        .post('/api/images')
        .attach('image', testImagePath);

      const imageId = uploadResponse.body._id;

      await request(app).delete(`/api/images/${imageId}`);

      const downloadResponse = await request(app).get(`/api/images/${imageId}/download`);

      expect(downloadResponse.status).toBe(404);
    });

    it('should delete both original and thumbnail files', async () => {
      const uploadResponse = await request(app)
        .post('/api/images')
        .attach('image', testImagePath);

      const imageId = uploadResponse.body._id;
      const filename = uploadResponse.body.filename;
      const thumbnailFilename = uploadResponse.body.thumbnailFilename;

      const uploadsDir = path.join(__dirname, '../../uploads');

      // Verify files exist before deletion
      expect(fs.existsSync(path.join(uploadsDir, filename))).toBe(true);
      expect(fs.existsSync(path.join(uploadsDir, 'thumbnails', thumbnailFilename))).toBe(true);

      await request(app).delete(`/api/images/${imageId}`);

      // Verify both files are deleted
      expect(fs.existsSync(path.join(uploadsDir, filename))).toBe(false);
      expect(fs.existsSync(path.join(uploadsDir, 'thumbnails', thumbnailFilename))).toBe(false);
    });
  });
});
