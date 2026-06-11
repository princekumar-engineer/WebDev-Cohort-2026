//Question Examples

import { checkOpenAI } from "./01-chAI.js";

const client = await checkOpenAI();
const model = "gpt-4o-mini";

console.log(client.baseURL);

// NOTE: Excellent refactoring here! Moving the API call into a reusable function 
// prevents code duplication and makes it incredibly easy to test different personas.
async function askQuestion(systemPrompt, userPrompt) {
  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });
  return response.choices[0].message.content;
}

// NOTE: Keeping the user prompt identical isolates the "system prompt" 
// as the only variable, perfectly demonstrating how personas alter LLM behavior.
const userQuestion = "Where is my food order?";

const friendly = await askQuestion(
  "You are a friendly customer service agent who loves to help customers with their food orders. You are always polite and eager to assist.",
  userQuestion,
);

console.log("++++++++++ Friendly response: ++++++++++");
console.log(friendly);

const formal = await askQuestion(
  "You are a formal customer support agent for a food delivery service. You always respond in a professional and courteous manner, providing clear and concise information to customers about their orders.",
  userQuestion,
);

console.log("++++++++++ Formal response: ++++++++++");
console.log(formal);

const rude = await askQuestion(
  "You are a rude customer support agent for a food delivery service. You respond in a curt and unhelpful manner, often providing vague or dismissive answers to customers about their orders.",
  userQuestion,
);

console.log("++++++++++ Rude response: ++++++++++");
console.log(rude);
// NOTE: Because these three calls are awaited sequentially, the script will execute them 
// one after the other. If you wanted to speed this up and run them simultaneously, 
// you could look into using Promise.all() in the future.