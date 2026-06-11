import { Inngest } from "inngest";

/**
 * Initialize and export the core Inngest client.
 * This client manages event registration, handles communication with the Inngest service,
 * and acts as the central hub for dispatching background functions.
 */
export const inngest = new Inngest({
  // Unique identifier for this application within the Inngest ecosystem
  id: "chai-todo-app",
});