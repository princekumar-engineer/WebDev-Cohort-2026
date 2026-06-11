import { inngest } from "./client.js";
import { auditlog } from "../store.js";

/**
 * Background function triggered whenever a "todo/created" event is received.
 * Appends metadata about the newly created todo item to an audit log store.
 */
export const onTodoCreated = inngest.createFunction(
  {
    id: "on-todo-created", // Unique ID for this function in the Inngest dashboard
    triggers: [{ event: "todo/created" }], // Event that executes this workflow
  },
  async ({ event, step }) => {
    // Isolated execution step. Ensures this code block runs reliably and exactly once.
    await step.run("audit", async () => {
      auditlog.push({
        action: "created",
        todoId: event.data.todo.id,
        title: event.data.todo.title,
        timestamp: new Date().toISOString(),
      });
      return { ok: true };
    });
  },
);

/**
 * Background function triggered when a "todo/deleted" event is received.
 * Performs a destructive action simulation with explicit retry behavior.
 */
export const onTodoDeleted = inngest.createFunction(
  {
    id: "on-todo-deleted", // Unique ID for this function
    retries: 2,            // Total number of retries if a step failure occurs (3 attempts total)
    triggers: [{ event: "todo/deleted" }],
  },
  async ({ event, step, attempt }) => {
    const id = event.data.todo.id;

    // Step 1: Simulated cleanup step designed to fail on its first run
    await step.run("cleanup", async () => {
      // Inngest attempts are 0-indexed. 'attempt === 0' represents the initial run.
      if (attempt === 0) {
        // Throwing an error causes Inngest to pause, record the step failure, and retry the workflow.
        throw new Error(`Failed to clean up after deleting todo ${id}`);
      }
      
      // On the subsequent attempt (attempt === 1), this string is returned and saved to step state.
      return "cleaned up successfully";
    });

    // Step 2: Logging step. 
    // This step will only execute after Step 1 ("cleanup") finishes successfully.
    await step.run("audit", async () => {
      auditlog.push({
        action: "deleted",
        todoId: id,
      });
      return { ok: true };
    });
  },
);