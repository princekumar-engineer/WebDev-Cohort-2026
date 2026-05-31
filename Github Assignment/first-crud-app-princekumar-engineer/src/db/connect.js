import mongoose from "mongoose";

/**
 * TODO: Connect to MongoDB
 *
 * 1. Check if uri is provided (throw error if not: "MongoDB URI is required")
 * 2. Connect using mongoose.connect(uri)
 * 3. Return mongoose.connection
 */
export async function connectDB(uri) {
  if (!uri) {
    throw new Error("MongoDB URI is required");
  }

  await mongoose.connect(uri);

  return mongoose.connection;
}