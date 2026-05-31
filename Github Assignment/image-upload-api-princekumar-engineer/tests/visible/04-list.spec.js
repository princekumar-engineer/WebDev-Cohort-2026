import request from 'supertest';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createApp } from '../../src/app.js';
import { Image } from '../../src/models/image.model.js';
import { setupDb, teardownDb, resetDb } from '../__helpers__/setupTestDb.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Test 4: List Images', () => {
  let app;
  const testImagePath = path.join(__dirname, '../__helpers__/test-image.jpg');

  beforeAll(async () => {
    await setupDb();
    app = createApp();

    // Create test image if doesn't exist
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

  describe('GET /api/images', () => {
    it('should return empty array when no images', async () => {
      const response = await request(app).get('/api/images');

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([]);
      expect(response.body.meta).toEqual({
        total: 0,
        page: 1,
        limit: 10,
        pages: 0,
        totalSize: 0,
      });
    });

    it('should return all images with pagination meta', async () => {
      // Upload 3 images
      await request(app).post('/api/images').attach('image', testImagePath);
      await request(app).post('/api/images').attach('image', testImagePath);
      await request(app).post('/api/images').attach('image', testImagePath);

      const response = await request(app).get('/api/images');

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(3);
      expect(response.body.meta.total).toBe(3);
      expect(response.body.meta.page).toBe(1);
      expect(response.body.meta.limit).toBe(10);
      expect(response.body.meta.pages).toBe(1);
      expect(response.body.meta.totalSize).toBeGreaterThan(0);
    });

    it('should support pagination with page parameter', async () => {
      // Upload 15 images
      for (let i = 0; i < 15; i++) {
        await request(app).post('/api/images').attach('image', testImagePath);
      }

      const response = await request(app).get('/api/images?page=2');

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(5);
      expect(response.body.meta.page).toBe(2);
      expect(response.body.meta.total).toBe(15);
      expect(response.body.meta.pages).toBe(2);
    });

    it('should support pagination with limit parameter', async () => {
      // Upload 10 images
      for (let i = 0; i < 10; i++) {
        await request(app).post('/api/images').attach('image', testImagePath);
      }

      const response = await request(app).get('/api/images?limit=5');

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(5);
      expect(response.body.meta.limit).toBe(5);
      expect(response.body.meta.pages).toBe(2);
    });

    it('should filter by mimetype', async () => {
      // Create images with different mimetypes in database
      await Image.create({
        originalName: 'test1.jpg',
        filename: 'test1.jpg',
        mimetype: 'image/jpeg',
        size: 1000,
        width: 100,
        height: 100,
        thumbnailFilename: 'thumb-test1.jpg',
      });

      await Image.create({
        originalName: 'test2.png',
        filename: 'test2.png',
        mimetype: 'image/png',
        size: 2000,
        width: 100,
        height: 100,
        thumbnailFilename: 'thumb-test2.jpg',
      });

      const response = await request(app).get('/api/images?mimetype=image/jpeg');

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].mimetype).toBe('image/jpeg');
    });

    it('should search in originalName and description', async () => {
      await Image.create({
        originalName: 'vacation.jpg',
        filename: 'test1.jpg',
        mimetype: 'image/jpeg',
        size: 1000,
        width: 100,
        height: 100,
        thumbnailFilename: 'thumb-test1.jpg',
        description: 'Beach photo',
      });

      await Image.create({
        originalName: 'meeting.jpg',
        filename: 'test2.jpg',
        mimetype: 'image/jpeg',
        size: 2000,
        width: 100,
        height: 100,
        thumbnailFilename: 'thumb-test2.jpg',
        description: 'Office meeting',
      });

      const response = await request(app).get('/api/images?search=vacation');

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].originalName).toBe('vacation.jpg');
    });

    it('should sort by size ascending', async () => {
      await Image.create({
        originalName: 'large.jpg',
        filename: 'large.jpg',
        mimetype: 'image/jpeg',
        size: 3000,
        width: 100,
        height: 100,
        thumbnailFilename: 'thumb-large.jpg',
      });

      await Image.create({
        originalName: 'small.jpg',
        filename: 'small.jpg',
        mimetype: 'image/jpeg',
        size: 1000,
        width: 100,
        height: 100,
        thumbnailFilename: 'thumb-small.jpg',
      });

      const response = await request(app).get('/api/images?sortBy=size&sortOrder=asc');

      expect(response.status).toBe(200);
      expect(response.body.data[0].size).toBeLessThan(response.body.data[1].size);
    });

    it('should sort by uploadDate descending by default', async () => {
      const first = await Image.create({
        originalName: 'first.jpg',
        filename: 'first.jpg',
        mimetype: 'image/jpeg',
        size: 1000,
        width: 100,
        height: 100,
        thumbnailFilename: 'thumb-first.jpg',
        uploadDate: new Date('2024-01-01'),
      });

      const second = await Image.create({
        originalName: 'second.jpg',
        filename: 'second.jpg',
        mimetype: 'image/jpeg',
        size: 2000,
        width: 100,
        height: 100,
        thumbnailFilename: 'thumb-second.jpg',
        uploadDate: new Date('2024-01-02'),
      });

      const response = await request(app).get('/api/images');

      expect(response.status).toBe(200);
      expect(response.body.data[0]._id.toString()).toBe(second._id.toString());
      expect(response.body.data[1]._id.toString()).toBe(first._id.toString());
    });
  });
});
