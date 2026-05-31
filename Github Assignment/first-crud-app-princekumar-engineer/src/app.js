import express from "express";
import todoRoutes from "./routes/todo.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { notFound } from "./middlewares/notFound.middleware.js";

/**
 * TODO: Create Express app
 *
 * 1. Create app with express()
 * 2. Add express.json() middleware
 * 3. Add GET /health route → { ok: true }
 * 4. Mount todo routes at /api/todos
 * 5. Add notFound middleware
 * 6. Add errorHandler middleware (must be last!)
 * 7. Return app
 */
export function createApp() {
  const app = express();

  // Parse JSON body
  app.use(express.json());

  // Health check
  app.get("/health", (req, res) => {
    res.json({ ok: true });
  });

  // Todo routes
  app.use("/api/todos", todoRoutes);

  // 404 handler
  app.use(notFound);

  // Error handler (LAST)
  app.use(errorHandler);

  return app;
}