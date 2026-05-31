import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer;

/**
 * Sets up an in-memory MongoDB instance for testing
 * Call this in beforeAll() in your test files
 */
export async function setupDb() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
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
}
