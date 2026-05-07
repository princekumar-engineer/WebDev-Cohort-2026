// 🔷 TypeScript Generics — Quick Notes


// -----------------------------
// 🧠 Why Generics?
// -----------------------------

// Generics help us write reusable,
// flexible, and type-safe code.

// Instead of hardcoding types,
// we use placeholders for types.


// -----------------------------
// ⚙️ Generic Function
// -----------------------------

function getResponse<T>(data: T[]) {
  return {
    success: true,
    status: 200,
    data,
  };
}

// -----------------------------
// 📦 Generic Usage Examples
// -----------------------------

// Type inferred automatically

const numbers = getResponse([1, 2, 3]).data;

// Explicit generic type

const strings = getResponse<string>([
  "Zigzagging",
  "Wrangling",
  "Finagling",
]).data;

// Mixed types

const mix = getResponse([1, "Wrangling", true]).data;

// -----------------------------
// 🧩 Generic Type Alias
// -----------------------------

type APIResponse<T> = {
  data: T;
  isError: boolean;
};

// Specific API response types

type UserAPIResponse =
  APIResponse<{
    name: string;
    age: number;
  }>;


type BlogAPIResponse =
  APIResponse<{
    title: string;
    views: number;
  }>;

// -----------------------------
// 📘 Generic Interfaces
// -----------------------------

interface User {
  username: string;
}

interface Product {
  title: string;
}

// Generic interface

interface Result<T> {
  data: T;
  errorMsg: string | null;
}


// -----------------------------
// 🌐 Generic Fetch Function
// -----------------------------

function fetch<T>(url: string): Result<T> {

  return {

    data: null,

    errorMsg: null,

  };

}


// -----------------------------
// 👤 Fetch User Example
// -----------------------------

let result = fetch<User>("../api/users");

let user = result.data;

console.log(user.username);


// -----------------------------
// 📦 Fetch Product Example
// -----------------------------

let result1 = fetch<Product>("../api/product");

let product = result1.data;

console.log(product.title);


// -----------------------------
// 🧠 Benefits of Generics
// -----------------------------

// ✅ Reusable code
// ✅ Strong type safety
// ✅ Better autocomplete
// ✅ Avoids duplicate code
// ✅ Flexible APIs


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - Generics use type placeholders like <T>
// - They make code reusable and type-safe
// - Generic functions work with multiple types
// - Generic type aliases simplify API structures
// - Generic interfaces help create flexible contracts
// - TypeScript can infer generic types automatically

