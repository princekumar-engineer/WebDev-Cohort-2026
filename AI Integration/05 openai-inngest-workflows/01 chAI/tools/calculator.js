export async function calculator({ op, a, b }) {
  // NOTE: Type safety check. OpenAI usually sends correct types based on your schema, 
  // but validating inputs locally is an excellent security and stability practice.
  if (typeof a !== "number" || typeof b !== "number") {
    return "Both a and b should be numbers.";
  }
  
  switch (op) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      // NOTE: Defensive programming. Prevents crashing or returning 'Infinity' 
      // if the LLM passes 0 as the denominator.
      if (b === 0) {
        return "Cannot divide by zero.";
      }
      return a / b;
    default:
      return "Unsupported operation. Use add, subtract, multiply, or divide.";
  }
}

// NOTE: This JSON schema object acts as the interface description for OpenAI. 
// The model reads this declaration to map natural language queries to your arguments.
export const calculateTool = {
    type: "function",
    function: {
        name: "calculator",
        // NOTE: The model uses this description to realize *when* it should call this function.
        description: "A simple calculator function that performs basic arithmetic operations.",
        parameters: {
            type: "object",
            properties: {
                // NOTE: 'enum' restricts the LLM to only choosing from these 4 exact string options.
                op: { type: "string", enum: ["add", "subtract", "multiply", "divide"] },
                a: { type: "number" },
                b: { type: "number" },
            },
            // NOTE: Tells OpenAI that it must extract all three fields before requesting a tool call.
            required: ["op", "a", "b"],
        }
    }
}