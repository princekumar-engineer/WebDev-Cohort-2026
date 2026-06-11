import { checkOpenAI } from "./01-chAI.js";

const client = await checkOpenAI();
const model = "gpt-4o-mini";

console.log(client.baseURL);

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

const userQuestion = "My name is Hitesh, tell me a 1 line joke";

const friendly = await askQuestion(
  "You always respond in 1 line",
  userQuestion,
);

console.log("++++++++++ Friendly response: ++++++++++");
console.log(friendly);

const userQuestion2 = "Tell me my Name";

// NOTE: This second call is completely independent of the first one. 
// Because the Chat Completions API is stateless, the model has no memory of 
// the previous conversation and won't know your name is Hitesh here.
const formal = await askQuestion("You always respond in 1 line", userQuestion2);

console.log("++++++++++ Formal response: ++++++++++");
console.log(formal); 
// EXPECTED BEHAVIOR: The model will likely respond with something like 
// "I don't know your name because you haven't told me yet."