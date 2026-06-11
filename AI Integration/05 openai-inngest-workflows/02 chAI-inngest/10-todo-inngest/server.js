import express from "express";
import "dotenv/config";
import { todos, createTodo, deleteTodo } from "./store.js";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { onTodoCreated, onTodoDeleted } from "./inngest/functions.js";

const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

/**
 * Inngest HTTP Endpoint.
 * This route allows the Inngest Dev Server or Cloud platform to safely communicate
 * with your application, trigger functions, and read your background workflow schemas.
 */
app.use(
  "/api/inngest",
  serve({
    client: inngest, // The main Inngest client configuration
    functions: [onTodoCreated, onTodoDeleted], // Array of workflows registered to this server
  }),
);

/**
 * Route: Create a new Todo item.
 * Adds the item to the local database store and dispatches a background event.
 */
app.post("/todos", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  // 1. Persist the change to your primary data store synchronously
  const todo = createTodo(title);

  // 2. Broadcast an asynchronous event to Inngest to kickoff background workflows
  await inngest.send({
    name: "todo/created", // Must match the event trigger name in functions.js
    data: { todo },// Payload containing the context of the newly created todo
  });

  // 3. Immediately return a response to the client without waiting for background steps to finish
  res.status(201).json(todo);
});

/**
 * Route: Delete an existing Todo item.
 * Removes the item from the local store and dispatches a background deletion event.
 */
app.delete("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  
  // 1. Remove the item from your primary data store synchronously
  const todo = deleteTodo(id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  // 2. Broadcast the event to Inngest to kick off background cleanup and auditing
  await inngest.send({
    name: "todo/deleted", // Must match the event trigger name in functions.js
    data: { todo },       // Payload containing context of what was deleted
  });

  // 3. Send a response acknowledging the deletion immediately
  res.json(todo);
});

// Start the Express HTTP server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
  console.log("Inngest endpoint available at http://localhost:3000/api/inngest");
});