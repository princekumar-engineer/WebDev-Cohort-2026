import { inngest } from "./inngest-client.js";

export const onOrderPlaced = inngest.createFunction(
  {
    id: "chai-on-order-placed", // Unique function identifier
    retries: 2,                 // Automatically retry individual steps up to 2 times on failure
    triggers: [{ event: "chai.order.placed" }], // Listens for this exact event name
  },
  async ({ event, step }) => {
    // Destructure payload data sent alongside the event trigger
    const { orderId, customer } = event.data;

    // Step 1: Create a personalized greeting.
    // step.run ensures this block runs exactly once. The return value is cached,
    // protecting it from executing again if subsequent steps cause a function rerun.
    const greeting = await step.run("greet", async () => {
      return `Hello ${customer.name}! Thanks for your order ${orderId}`;
    });

    // Note: This local helper function is declared but never invoked directly.
    async function logGreeting() {
        console.log(greeting);
    }

    // Step 2: Log the generated greeting.
    // By wrapping this in step.run, Inngest tracks its execution independently.
    await step.run("log-greeting", async () => {
      console.log(greeting);
    });

    // Final response payload returned to the Inngest orchestration engine
    return { ok: true, greeting };
  },
);