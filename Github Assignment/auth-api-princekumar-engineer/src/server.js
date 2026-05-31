import { createApp } from './app.js';
import { connectDB } from './db/connect.js';

async function start() {
  try {
    // TODO: Read PORT from process.env, default to 3000
    const port = process.env.PORT || 3000;

    // TODO: Read MONGO_URI from process.env, default to "mongodb://localhost:27017/auth_api"
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/auth_api';

    await connectDB(uri);
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
