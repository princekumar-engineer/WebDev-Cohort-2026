import { checkOpenAI } from "./01-chAI.js";

const client = await checkOpenAI();
const model = "gpt-4o-mini";

console.log(client.baseURL);

// NOTE: Great! This array acts as your local "memory bank" to store the 
// rolling context of the conversation.
const conversation = [];

// NOTE: Smart use of the spread operator (...history). By injecting the history 
// between the system prompt and the newest user message, you provide the model 
// with the entire context of past interactions.
async function askQuestion(systemPrompt, userPrompt, history = []) {
  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      ...history, // Unrolls past messages: [{role: 'user', ...}, {role: 'assistant', ...}]
      { role: "user", content: userPrompt },
    ],
  });
  
  // NOTE: Mutating the history array directly works here because objects/arrays 
  // in JavaScript are passed by reference. Both the user prompt and the assistant's 
  // response are preserved for subsequent calls.
  history.push({ role: "user", content: userPrompt });
  history.push({
    role: "assistant",
    content: response.choices[0].message.content,
  });
  return response.choices[0].message.content;
}

const userQuestion =
  "My name is Hitesh and I make coding videos on YouTube, tell me a 1 line joke";

const response1 = await askQuestion(
  "You always respond in 1 line",
  userQuestion,
  conversation,
);

console.log("++++++++++ Response 1: ++++++++++");
console.log(response1);

const userQuestion2 = "Tell me my Name";

// NOTE: Because 'conversation' was updated during the first call, response2 
// will now successfully output "Your name is Hitesh." 
const response2 = await askQuestion(
  "You always respond in 1 line",
  userQuestion2,
  conversation,
);

console.log("++++++++++ Response 2: ++++++++++");
console.log(response2);