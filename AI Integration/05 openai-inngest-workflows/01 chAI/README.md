# OpenAI Node.js Learning Notes

A step-by-step journey from initializing the OpenAI client to building AI agents with memory, streaming, and tool calling.

---

# Environment Setup

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000

# OpenAI API Configuration
# Replace the placeholder value below with your actual secret API key.
# Never commit your real API key or .env file to GitHub.
OPENAI_API_KEY=your_openai_api_key_here
```

## .gitignore

```gitignore
node_modules/
.env
```

## Install Dependencies

```bash
npm install openai dotenv
```

## Enable ES Modules

Add the following to `package.json`:

```json
{
  "type": "module"
}
```

---

# 1. OpenAI Client Setup

## Load Environment Variables

```js
import dotenv from "dotenv";

dotenv.config();
```

## Read API Key

```js
const API_KEY = process.env.OPENAI_API_KEY;
```

## Validate API Key

```js
export const apikeyChecker = () => {
  if (!API_KEY) {
    console.error("OPENAI_API_KEY is missing.");
    process.exit(1);
  }
};
```

## Create OpenAI Client

```js
const { OpenAI } = await import("openai");

const client = new OpenAI({
  apiKey: API_KEY,
});
```

### Key Learning

* `dotenv` loads variables from `.env`.
* Client initialization does not validate the API key.
* Validation occurs during the first API request.

---

# 2. First Chat Completion

## Basic Request

```js
const response =
  await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are Master Oogway",
      },
      {
        role: "user",
        content: "Where should I travel?",
      },
    ],
  });
```

## Read Response

```js
console.log(
  response.choices[0].message.content
);
```

## Usage Statistics

```js
console.table(response.usage);
```

### Key Learning

* `system` messages define behavior.
* `user` messages contain user requests.
* Responses are returned inside:

```js
response.choices[0].message.content
```

---

# 3. Prompt Engineering

## Reusable Function

```js
async function askQuestion(
  systemPrompt,
  userPrompt
) {
  const response =
    await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

  return response.choices[0].message.content;
}
```

## Persona Examples

```js
const friendly = await askQuestion(
  "You are friendly",
  question
);

const formal = await askQuestion(
  "You are formal",
  question
);

const rude = await askQuestion(
  "You are rude",
  question
);
```

### Key Learning

Changing only the system prompt can completely change the model's behavior.

---

# 4. Understanding Stateless APIs

## Example

```js
await askQuestion(
  "You always respond in 1 line",
  "My name is Hitesh"
);

await askQuestion(
  "You always respond in 1 line",
  "Tell me my name"
);
```

### Result

The model forgets the name.

### Why?

Each request is completely independent.

The model only knows what is included in the current API call.

### Key Learning

OpenAI APIs are stateless.

No memory exists unless you provide it.

---

# 5. Building Conversation Memory

## Create History

```js
const conversation = [];
```

## Include History

```js
messages: [
  {
    role: "system",
    content: systemPrompt,
  },
  ...conversation,
  {
    role: "user",
    content: userInput,
  },
];
```

## Save Messages

```js
conversation.push({
  role: "user",
  content: userInput,
});

conversation.push({
  role: "assistant",
  content: reply,
});
```

### Key Learning

Memory is simulated by resending previous messages with every request.

---

# 6. Async Iterators

## Custom Async Iterable

```js
const stream = {
  count: 0,

  async next() {
    this.count++;

    if (this.count > 5) {
      return { done: true };
    }

    return {
      done: false,
      value: `Chunk ${this.count}`,
    };
  },

  [Symbol.asyncIterator]() {
    return this;
  },
};
```

## Consume Stream

```js
for await (const chunk of stream) {
  console.log(chunk);
}
```

### Key Learning

`for await...of` consumes asynchronous data streams.

---

# 7. Streaming Responses

## Enable Streaming

```js
const stream =
  await client.chat.completions.create({
    model,
    stream: true,
    messages,
  });
```

## Read Tokens

```js
let fullResponse = "";

for await (const message of stream) {
  const delta =
    message.choices[0]?.delta?.content;

  if (delta) {
    process.stdout.write(delta);
    fullResponse += delta;
  }
}
```

### Key Learning

Streaming returns tokens incrementally instead of waiting for the complete response.

---

# 8. CLI Chatbot

## Setup Readline

```js
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
```

## Promisified Input

```js
function askQuestion(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}
```

## Chat Loop

```js
while (true) {
  const userQuestion =
    await askQuestion("Ask: ");

  if (
    userQuestion.toLowerCase() === "exit"
  ) {
    break;
  }
}
```

## Cleanup

```js
rl.close();
```

### Key Learning

Combining:

* Readline
* Streaming
* Loops

creates an interactive chatbot.

---

# 9. Function Calling Basics

## Calculator Tool

```js
export async function calculator({
  op,
  a,
  b,
}) {
  switch (op) {
    case "add":
      return a + b;

    case "subtract":
      return a - b;

    case "multiply":
      return a * b;

    case "divide":
      return a / b;
  }
}
```

---

## Tool Schema

```js
export const calculateTool = {
  type: "function",
  function: {
    name: "calculator",
    description:
      "Perform arithmetic operations",
    parameters: {
      type: "object",
      properties: {
        op: {
          type: "string",
          enum: [
            "add",
            "subtract",
            "multiply",
            "divide",
          ],
        },
        a: {
          type: "number",
        },
        b: {
          type: "number",
        },
      },
      required: ["op", "a", "b"],
    },
  },
};
```

### Key Learning

The model sees the schema, not the actual implementation.

---

# 10. Tool Calling Workflow

## Register Tools

```js
const tools = [calculateTool];
```

## First Request

```js
const firstResponse =
  await client.chat.completions.create({
    model,
    messages,
    tools,
    tool_choice: "auto",
  });
```

The model decides whether to call a tool.

---

## Extract Tool Call

```js
const toolCall =
  firstResponse.choices[0]
    .message.tool_calls[0];
```

---

## Parse Arguments

```js
const args = JSON.parse(
  toolCall.function.arguments
);
```

---

## Execute Tool

```js
const result =
  await calculator(args);
```

---

## Return Tool Result

```js
messages.push({
  role: "tool",
  tool_call_id: toolCall.id,
  content: String(result),
});
```

---

## Second Request

```js
const secondResponse =
  await client.chat.completions.create({
    model,
    messages,
    tools,
  });
```

---

## Final Answer

```js
console.log(
  secondResponse.choices[0]
    .message.content
);
```

---

# Tool Calling Flow

```text
User Question
      ↓
Model
      ↓
Tool Call Request
      ↓
JavaScript Function
      ↓
Tool Result
      ↓
Model
      ↓
Final Human-Friendly Answer
```

---

# Best Practices Learned

## Error Handling

Always wrap API requests:

```js
try {
  // OpenAI request
} catch (error) {
  console.error(error.message);
}
```

---

## Conversation Limits

Prevent unlimited growth:

```js
const MAX_MESSAGES = 20;

if (
  conversation.length > MAX_MESSAGES
) {
  conversation.splice(
    0,
    conversation.length - MAX_MESSAGES
  );
}
```

---

## Streaming Safety

Initialize accumulators correctly:

```js
let fullResponse = "";
```

Not:

```js
let fullResponse = null;
```

---

## Environment Security

* Never expose API keys.
* Never commit `.env`.
* Use `.gitignore`.
* Rotate compromised keys immediately.

---

# Core Concepts Covered

## OpenAI Fundamentals

* API Keys
* Environment Variables
* OpenAI Client
* Chat Completions

## Prompt Engineering

* System Prompts
* Personas
* Behavioral Control

## Conversation Management

* Stateless APIs
* Message History
* Memory Simulation

## Streaming

* Async Iterators
* Async Iterables
* Token Streaming

## CLI Applications

* Readline
* Interactive Chatbots
* Real-Time Responses

## Tool Calling

* Function Schemas
* Tool Registration
* Tool Execution
* Multi-Step Workflows

## Agent Foundations

* Model Decision Making
* External Tool Usage
* Structured Reasoning Loops

---

# Learning Journey

```text
Environment Setup
        ↓
OpenAI Client
        ↓
Chat Completions
        ↓
Prompt Engineering
        ↓
Stateless APIs
        ↓
Conversation Memory
        ↓
Async Iterators
        ↓
Streaming Responses
        ↓
CLI Chatbot
        ↓
Function Calling
        ↓
Tool Calling
        ↓
AI Agents
```

This progression takes you from a simple OpenAI API request to the foundations of building AI-powered assistants and agents capable of remembering context, streaming responses, and interacting with external tools.
