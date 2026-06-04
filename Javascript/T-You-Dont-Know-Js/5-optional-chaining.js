// 🔗 JS Optional Chaining (?.) — Quick Notes


// -----------------------------
// 🧠 What is Optional Chaining?
// -----------------------------

// Optional chaining (?.) lets us safely access
// nested object properties without causing errors.

// If a property doesn't exist,
// JavaScript returns undefined instead of crashing.


// -----------------------------
// 📦 Example Object
// -----------------------------

const user = {
  name: "John",
  email: "john@gmail.com",
  address: {
    full: "adad adlfjdafj city",
    zip: "432322"
  },
};


// -----------------------------
// ⚠️ Problem Without Optional Chaining
// -----------------------------

// If we try accessing a property that doesn't exist,
// it may cause an error.

// Example (old way):

// if (user.address) {
//   if (user.address.city) {
//     console.log(user.address.city);
//   } else {
//     console.log(user.address.full);
//   }
// } else {
//   console.log("empty");
// }


// -----------------------------
// 🔗 Using Logical AND (Old Trick)
// -----------------------------

// Logical AND returns first falsy value
// or the last truthy value.

// console.log(user.address && user.address.city);


// -----------------------------
// ✨ Using Optional Chaining
// -----------------------------

// Cleaner and safer syntax

console.log(user.address?.zip);


// If "address" doesn't exist,
// JS will return undefined instead of throwing error.


// -----------------------------
// 📍 When to Use Optional Chaining
// -----------------------------

// Use it when you are NOT sure if a property exists.

// Common situations:
// - API responses
// - User data
// - Optional object properties
// - Deeply nested objects


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - ?. safely accesses nested properties
// - Prevents runtime errors
// - Returns undefined if property doesn't exist
// - Cleaner alternative to multiple if checks
// - Very useful for API or dynamic data