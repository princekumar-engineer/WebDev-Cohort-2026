import { checkOpenAI } from "./01-chAI.js";

const client = await checkOpenAI();
const model = "gpt-4o-mini";

console.log(client.baseURL);

// NOTE: Setting 'stream: true' forces the API to return a stream object 
// (an async iterable) rather than a single, complete response object.
const stream = await client.chat.completions.create({
  model,
  stream: true,
  messages: [
    {
      role: "system",
      content: "You are a helpful assistant that responds in 5 line.",
    },
    { role: "user", content: "What is latest in AI" },
  ],
});

// NOTE: Heads up here! Since you initialize this as 'null', doing 'last_chunk += delta' 
// on the first iteration will turn it into the literal string "nullWord". 
// To fix this while keeping your code, change 'null' to an empty string: ''
let last_chunk = null;

// NOTE: This uses the 'for await...of' loop to process data fragments (chunks) 
// in real-time as they are pushed from OpenAI's servers.
for await (const message of stream) {
  // NOTE: In streaming mode, the text isn't in 'message.choices[0].message.content'. 
  // Instead, it arrives inside the 'delta' object as individual tokens.
  const delta = message.choices[0]?.delta?.content;
  
  if (delta) {
    // NOTE: 'process.stdout.write' prints the text exactly as it arrives 
    // without forcing a new line, creating that typewriter effect in your terminal.
    process.stdout.write(delta);
  }
  
  last_chunk += delta;
}