import mongoose from 'mongoose';

/**
 * Connect to MongoDB
 *
 * 1. Check if uri is provided (throw error if not: "MongoDB URI is required")
 * 2. Connect using mongoose.connect(uri)
 * 3. Return mongoose.connection
 */
export async function connectDB(uri) {
  // 1. Validate URI
  if (!uri) {
    throw new Error('MongoDB URI is required');
  }

  // 2. Connect using mongoose.connect(uri)
  await mongoose.connect(uri);

  // 3. Return mongoose.connection
  return mongoose.connection;
}