import { checkOpenAI } from "./01-chAI.js";
import { calculator, calculateTool } from "./tools/calculator.js";

const client = await checkOpenAI();
const model = "gpt-4o-mini";

console.log(client.baseURL);

// NOTE: Registering your tool array. 'calculateTool' contains the schema 
// (JSON description) that tells the LLM *what* the calculator does and *what parameters* it expects.
const tools = [calculateTool];

const messages = [
  {
    role: "user",
    content: "what is result of adding 23 and 54",
  },
];

// NOTE: Round 1: The model intercepts the query, realizes it needs a tool to solve this math problem accurately, 
// and returns a structured request to call your tool instead of generating a direct text answer.
const firstResponse = await client.chat.completions.create({
  model,
  messages,
  tool_choice: "auto", // 'auto' allows the model to decide whether to call a tool or just respond with text.
  tools,
});

console.log("++++++++++ First Response: ++++++++++");
const assistantMessage = firstResponse.choices[0].message;

console.log(assistantMessage);
console.log(assistantMessage.tool_calls); // NOTE: This will print the object containing the tool name and arguments.

// NOTE: CRUCIAL STEP. You must push the assistant's tool-call request back into the message history 
// so the API maintains the proper structural timeline.
messages.push(assistantMessage);

// NOTE: Checking if the model actually decided to invoke a tool.
if (assistantMessage.tool_calls) {
  const toolCall = assistantMessage.tool_calls[0];
  
  // NOTE: You are executing the local JavaScript function here, passing the arguments extracted by the LLM.
  const toolResponse = await calculator(toolCall.arguments);
  console.log("++++++++++ Tool Response: ++++++++++");
  console.log(toolResponse);

  // NOTE: Send the execution results back to the conversation thread.
  // The 'role' MUST be "tool", and you must specify the 'name' matching the toolCall.
  messages.push({
    role: "tool",
    name: toolCall.name,
    content: toolResponse,
  });
}

// NOTE: Round 2: You send the updated history (User Prompt -> Assistant Tool Request -> Tool Output) 
// back to OpenAI. The model will see the tool's result and formulate the final, user-friendly text answer.
const secondResponse = await client.chat.completions.create({
  model,
  messages,
  tool_choice: "auto",
  tools,
});