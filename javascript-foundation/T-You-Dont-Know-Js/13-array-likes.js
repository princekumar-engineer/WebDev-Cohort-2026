// 📦 JS Array-Like Objects — Quick Notes


// -----------------------------
// 🧠 What is an Array-Like Object?
// -----------------------------

// An array-like object is an object that
// behaves like an array but is NOT a real array.

// It must have:
// 1️⃣ Numeric indexes
// 2️⃣ length property


// -----------------------------
// 📦 Example Array-Like Object
// -----------------------------

const starterPack = {
  0: "Macbook",
  1: "Chai",
  length: 2,
};


// Looks like an array but it is actually an object.


// -----------------------------
// ⚠️ Limitation
// -----------------------------

// Array-like objects do NOT have array methods.

// For example:

// starterPack.push("iPhone"); ❌
// starterPack.pop(); ❌


// Because they are not real arrays.


// -----------------------------
// 🔍 Real Example of Array-Like
// -----------------------------

// Strings behave like array-like objects

let text = "hello";

// console.log(text[0]);


// -----------------------------
// 🔄 Convert Array-Like → Array
// -----------------------------

// Use Array.from()

const array = Array.from(starterPack);

console.log(array);


// Now we can use array methods.


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - Array-like objects have indexes and length
// - They are NOT real arrays
// - They don't support array methods
// - Array.from() converts them to arrays
// - Strings are a common array-like structure