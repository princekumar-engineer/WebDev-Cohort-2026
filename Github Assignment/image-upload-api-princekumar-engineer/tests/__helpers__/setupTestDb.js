import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mongoServer;

/**
 * Sets up an in-memory MongoDB instance for testing
 * Call this in beforeAll() in your test files
 */
export async function setupDb() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);

  // Create uploads directories for tests
  const uploadsDir = path.join(__dirname, '../../uploads');
  const thumbnailsDir = path.join(uploadsDir, 'thumbnails');

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  if (!fs.existsSync(thumbnailsDir)) {
    fs.mkdirSync(thumbnailsDir, { recursive: true });
  }
}

/**
 * Tears down the in-memory MongoDB instance
 * Call this in afterAll() in your test files
 */
export async function teardownDb() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }

  // Clean up uploads directory after tests
  const uploadsDir = path.join(__dirname, '../../uploads');
  if (fs.existsSync(uploadsDir)) {
    fs.rmSync(uploadsDir, { recursive: true, force: true });
  }
}

/**
 * Clears all collections in the database
 * Call this in beforeEach() to ensure test isolation
 */
export async function resetDb() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }

  // Clean uploaded files between tests
  const uploadsDir = path.join(__dirname, '../../uploads');
  const thumbnailsDir = path.join(uploadsDir, 'thumbnails');

  if (fs.existsSync(uploadsDir)) {
    const files = fs.readdirSync(uploadsDir);
    files.forEach((file) => {
      const filePath = path.join(uploadsDir, file);
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    });
  }

  if (fs.existsSync(thumbnailsDir)) {
    const thumbnails = fs.readdirSync(thumbnailsDir);
    thumbnails.forEach((file) => {
      fs.unlinkSync(path.join(thumbnailsDir, file));
    });
  }
}
