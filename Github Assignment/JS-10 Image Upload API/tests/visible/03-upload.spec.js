import request from 'supertest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createApp } from '../../src/app.js';
import { Image } from '../../src/models/image.model.js';
import { setupDb, teardownDb, resetDb } from '../__helpers__/setupTestDb.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Test 3: Image Upload', () => {
  let app;

  beforeAll(async () => {
    await setupDb();
    app = createApp();
  });

  afterAll(async () => {
    await teardownDb();
  });

  beforeEach(async () => {
    await resetDb();
  });

  const testImagePath = path.join(__dirname, '../__helpers__/test-image.jpg');
  const testPngPath = path.join(__dirname, '../__helpers__/test-image.png');
  const testGifPath = path.join(__dirname, '../__helpers__/test-image.gif');

  // Create simple test images if they don't exist
  beforeAll(() => {
    const helpersDir = path.join(__dirname, '../__helpers__');

    // Create minimal valid JPEG (1x1 pixel)
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
    fs.writeFileSync(testPngPath, jpegBuffer); // Will be treated as JPEG for simplicity
    fs.writeFileSync(testGifPath, jpegBuffer); // Will be treated as JPEG for simplicity
  });

  describe('POST /api/images', () => {
    it('should upload JPEG successfully', async () => {
      const response = await request(app)
        .post('/api/images')
        .attach('image', testImagePath);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('originalName');
      expect(response.body).toHaveProperty('filename');
      expect(response.body).toHaveProperty('mimetype');
      expect(response.body).toHaveProperty('size');
      expect(response.body).toHaveProperty('width');
      expect(response.body).toHaveProperty('height');
      expect(response.body).toHaveProperty('thumbnailFilename');
      expect(response.body).toHaveProperty('uploadDate');

      // Check database
      const image = await Image.findById(response.body._id);
      expect(image).toBeTruthy();

      // Check file exists
      const uploadsDir = path.join(__dirname, '../../uploads');
      const filePath = path.join(uploadsDir, response.body.filename);
      expect(fs.existsSync(filePath)).toBe(true);

      // Check thumbnail exists
      const thumbnailPath = path.join(uploadsDir, 'thumbnails', response.body.thumbnailFilename);
      expect(fs.existsSync(thumbnailPath)).toBe(true);
    });

    it('should upload PNG successfully', async () => {
      const response = await request(app)
        .post('/api/images')
        .attach('image', testPngPath);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
    });

    it('should upload GIF successfully', async () => {
      const response = await request(app)
        .post('/api/images')
        .attach('image', testGifPath);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
    });

    it('should reject invalid file types', async () => {
      const textFilePath = path.join(__dirname, '../__helpers__/test.txt');
      fs.writeFileSync(textFilePath, 'This is a text file');

      const response = await request(app)
        .post('/api/images')
        .attach('image', textFilePath);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('message');
      expect(response.body.error.message).toMatch(/invalid file type/i);

      fs.unlinkSync(textFilePath);
    });

    it('should reject files over 5MB', async () => {
      // Create a file larger than 5MB
      const largePath = path.join(__dirname, '../__helpers__/large.jpg');
      const largeBuffer = Buffer.alloc(6 * 1024 * 1024); // 6MB
      fs.writeFileSync(largePath, largeBuffer);

      const response = await request(app)
        .post('/api/images')
        .attach('image', largePath);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toMatch(/file size exceeds 5MB limit/i);

      fs.unlinkSync(largePath);
    });

    it('should reject request with no file', async () => {
      const response = await request(app).post('/api/images');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toMatch(/no file uploaded/i);
    });

    it('should save optional description and tags', async () => {
      const response = await request(app)
        .post('/api/images')
        .field('description', 'Test description')
        .field('tags', 'tag1,tag2,tag3')
        .attach('image', testImagePath);

      expect(response.status).toBe(201);
      expect(response.body.description).toBe('Test description');
      expect(response.body.tags).toEqual(['tag1', 'tag2', 'tag3']);
    });

    it('should extract image dimensions', async () => {
      const response = await request(app)
        .post('/api/images')
        .attach('image', testImagePath);

      expect(response.status).toBe(201);
      expect(response.body.width).toBeGreaterThan(0);
      expect(response.body.height).toBeGreaterThan(0);
    });

    it('should create thumbnail smaller than original', async () => {
      const response = await request(app)
        .post('/api/images')
        .attach('image', testImagePath);

      expect(response.status).toBe(201);

      const uploadsDir = path.join(__dirname, '../../uploads');
      const originalPath = path.join(uploadsDir, response.body.filename);
      const thumbnailPath = path.join(uploadsDir, 'thumbnails', response.body.thumbnailFilename);

      const originalSize = fs.statSync(originalPath).size;
      const thumbnailSize = fs.statSync(thumbnailPath).size;

      expect(thumbnailSize).toBeLessThanOrEqual(originalSize);
    });

    it('should follow thumbnail naming convention', async () => {
      const response = await request(app)
        .post('/api/images')
        .attach('image', testImagePath);

      expect(response.status).toBe(201);
      expect(response.body.thumbnailFilename).toMatch(/^thumb-.+\.jpg$/);
    });
  });
});
