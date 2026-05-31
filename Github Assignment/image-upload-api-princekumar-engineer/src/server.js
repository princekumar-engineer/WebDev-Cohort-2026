import { createApp } from './app.js';
import { connectDB } from './db/connect.js';

async function start() {
  try {
    // Read PORT from process.env, default to 3000
    const port = process.env.PORT || 3000;

    // Read MONGO_URI from process.env, default to "mongodb://localhost:27017/image_upload_api"
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/image_upload_api';

    // Establish Mongoose/MongoDB connection
    await connectDB(uri);
    
    // Initialize application context factory
    const app = createApp();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();