import { inngest, gpt4omini } from "./inngest-client.js";

export const summarizeThenTranslate = inngest.createFunction(
  {
    id: "chai-summarize-then-translate",
    triggers: [{ event: "chai.summarize-then-translate" }],
  },

  async ({ event, step }) => {
    // Step 1: Use step.ai.infer to run a prompt against the configured model.
    // Inngest automatically manages the API lifecycle and handles caching/retries
    // so token costs aren't wasted on function reruns.
    const sum = await step.ai.infer("summarize", {
      model: gpt4omini,
      body: {
        input: [
          {
            role: "user",
            content: "Summarize the following text in 1 line: " + event.data.text,
          },
        ],
      },
    });

    // Safely parse the text output from the model wrapper
    const summary = sum.output[0].content[0].text;

    // Step 2: Pass the output of the first AI model directly into the second AI model.
    // Because Inngest checkpoints state, if this step fails, Step 1 does NOT run again.
    const tr = await step.ai.infer("translate", {
      model: gpt4omini,
      body: {
        input: [
          {
            role: "user",
            content: `Translate the following text to Punjabi Gurmukhi: ${summary}`,
          },
        ],
      },
    });

    // Extract the translated text
    const translation = tr.output[0].content[0].text;

    // Return the final output of the pipeline
    return translation;
  },
);