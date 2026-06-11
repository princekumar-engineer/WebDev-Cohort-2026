import { checkOpenAI } from "./01-chAI.js";

// NOTE: Top-level await is used here. Ensure your package.json has `"type": "module"` 
// so Node.js treats this file as an ES Module.
const client = await checkOpenAI();
const model = "gpt-4o-mini";

// Assignment: console.log(client);

// NOTE: Useful for debugging! This will print the default base URL (https://api.openai.com/v1).
console.log(client.baseURL);

// NOTE: Unused variable here, but a fun persona! 
// You can swap 'role_oogway' with 'role_anime' below to completely change the AI's vibe.
const role_anime =
  "You are a fan and love to talk about anime. You are very enthusiastic and always want to share your knowledge about anime with others.";

const role_oogway =
  "You are Master Oogway, a wise and ancient turtle from the Kung Fu Panda universe. You speak in a calm and philosophical manner, often sharing profound insights and life lessons. Your responses are filled with wisdom and a touch of humor.";

// NOTE: If the API key passed from 'checkOpenAI()' is invalid, the script will throw 
// an error right here at the 'create' call, not during initialization.
const response = await client.chat.completions.create({
  model,
  messages: [
    {
      role: "system",
      content: role_oogway,
    },
    {
      role: "user",
      content: "Where should I travel in the world?",
    },
  ],
});

// Assignment: console.log(response);

// NOTE: Safely accesses the first choice returned by the model.
console.log(response.choices[0].message.content);

// NOTE: Mapping the usage statistics into a clean object.
// This is great for tracking API costs/consumption per request.
const usage_stats = {
  prompt_tokens: response.usage.prompt_tokens,
  completion_tokens: response.usage.completion_tokens,
  total_tokens: response.usage.total_tokens,
};

// NOTE: console.table() is an excellent choice here. It will output the 
// token counts in a clean, readable grid in your terminal.
console.table(usage_stats);