import { Inngest } from "inngest";
import { openaiResponses } from "@inngest/ai/models";

// Initialize the main Inngest client. 
// This ID identifies your app within the Inngest Dev Server / Cloud dashboard.
export const inngest = new Inngest({
  id: "chaicode-inngest-ai",
});

// Configure the OpenAI model handler using Inngest's AI package.
// This allows background steps to cleanly infer streaming or JSON completions 
// with built-in state memoization.
export const gpt4omini = openaiResponses({
  model: "gpt-4o-mini",
  apiKey: process.env.OPENAI_API_KEY,
});