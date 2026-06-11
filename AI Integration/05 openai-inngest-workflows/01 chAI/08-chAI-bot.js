import { checkOpenAI } from "./01-chAI.js";
import readline from "readline";

const client = await checkOpenAI();
const model = "gpt-4o-mini";

console.log(client.baseURL);

// NOTE: Creating an interface to handle terminal inputs (process.stdin) 
// and outputs (process.stdout). This is perfect for CLI applications.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const systemPrompt = "You are a helpful assistant that responds in 5 line.";

// NOTE: Excellent design pattern here! Node's native rl.question uses callbacks. 
// Wrapping it in a Promise allows you to use 'await' inside your loop, 
// keeping your code readable and avoiding callback hell.
function askQuestion(userPrompt) {
  return new Promise((resolve) => {
    rl.question(userPrompt, (answer) => {
      resolve(answer);
    });
  });
}

// NOTE: An infinite loop that keeps the conversation alive. 
// It will continuously run until the user explicitly triggers the "exit" condition.
while (true) {
  const userQuestion = await askQuestion("Ask a question: ");
  
  // NOTE: Clean exit condition. Without this break statement, 
  // the script would run forever or error out.
  if (userQuestion.toLowerCase() === "exit") {
    console.log("Exiting...");
    break;
  }

  const stream = await client.chat.completions.create({
    model,
    stream: true,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userQuestion },
    ],
  });
  
  process.stdout.write("Chai Bot: ");
  
  for await (const message of stream) {
    const delta = message.choices[0]?.delta?.content;
    if (delta) {
      process.stdout.write(delta);
    }
  }
  // NOTE: Adds a clean double line break after the stream finishes, 
  // preparing the terminal spacing for your next question prompt.
  console.log("\n");
}

// NOTE: Crucial cleanup step. If you forget to close the readline interface, 
// the Node.js process will stay open and refuse to exit back to your terminal prompt.
rl.close();