//Configuration
import dotenv from "dotenv";

dotenv.config(); 
// NOTE: In ES Modules, imports are hoisted. If another file imports this one 
// and expects process.env to be ready immediately, it might fail.
// Alternative: import "dotenv/config";

const API_KEY = process.env.OPENAI_API_KEY;

export const apikeyChecker = () => {
  if (!API_KEY) {
    console.error(
      "Error: OPENAI_API_KEY is not set in the environment variables.",
    );
    process.exit(1);
  }
};

export const checkOpenAI = async () => {
  const openai = (await import("openai")).default;
  
  // NOTE: In OpenAI v4+, the constructor is usually a named export.
  // If this line throws an error, change it to:
  // const { OpenAI } = await import("openai");
  // const client = new OpenAI({ apiKey: API_KEY });
  const client = new openai.OpenAI({
    apiKey: API_KEY,
  });

  // NOTE: This checks if the local object was created, not if the API key is valid.
  // The SDK only validates the key when you make your first actual API call.
  if (!client) {
    console.error("Error: Failed to initialize OpenAI client.");
    process.exit(1);
  }
  
  console.log("OpenAI client initialized successfully.");
  return client;
};