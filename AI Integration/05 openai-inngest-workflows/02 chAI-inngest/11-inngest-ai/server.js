import "dotenv/config"; // Load environmental variables (.env) safely at startup

import express from "express";
import { serve } from "inngest/express";
import { inngest } from "./inngest-client.js";
import { onOrderPlaced } from "./01-inngest.js";
import { summarizeThenTranslate } from "./02-step-ai.js";

const app = express();
app.use(express.json()); // Ensure Express can automatically parse incoming JSON payloads

// Mount the Inngest API route handler.
// The serve() adapter creates a secure POST endpoint that allows the Inngest engine 
// to send commands, query functions, and trigger individual steps.
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onOrderPlaced, summarizeThenTranslate], // Register your background functions here
  }),
);

const port = process.env.PORT || 3000;

// Simple health check route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the local development server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});