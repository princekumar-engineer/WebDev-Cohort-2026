import mongoose from 'mongoose';
import { connectDB } from '../../src/db/connect.js';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('Test 2: Database Connection', () => {
  let mongoServer;

  beforeEach(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });

  afterEach(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  describe('connectDB', () => {
    it('should connect to MongoDB with valid URI', async () => {
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();

      const connection = await connectDB(uri);

      expect(connection).toBeDefined();
      expect(mongoose.connection.readyState).toBe(1);
    });

    it('should throw error when URI is not provided', async () => {
      await expect(connectDB()).rejects.toThrow('MongoDB URI is required');
    });

    it('should throw error when URI is empty string', async () => {
      await expect(connectDB('')).rejects.toThrow('MongoDB URI is required');
    });
  });
});
