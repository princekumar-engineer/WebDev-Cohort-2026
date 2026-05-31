import express from 'express';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { notFound } from './middlewares/notFound.middleware.js';

/**
 * TODO: Create Express app
 *
 * 1. Create app with express()
 * 2. Add express.json() middleware
 * 3. Add GET /health route → { ok: true }
 * 4. Mount auth routes at /api/auth
 * 5. Mount user routes at /api/users
 * 6. Add notFound middleware
 * 7. Add errorHandler middleware (must be last!)
 * 8. Return app
 */
export function createApp() {
  const app = express();

  //Parse JSON
  app.use(express.json());

  //Health route
  app.get('/health', (req, res) =>{
    res.json({ ok: true});
  })

  //Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);

  // 404 middleware
  app.use(notFound);

  //Error middleware (LAST)
  app.use(errorHandler);

  return app;
}
