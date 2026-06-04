// 🔷 JS Symbols — Quick Notes


// -----------------------------
// 🧠 What are Symbols?
// -----------------------------

// According to JavaScript specifications,
// Object keys can be:
// - String
// - Symbol

// A Symbol is a primitive unique value
// with an optional description.

let baby = Symbol("mai ka ladle");


// -----------------------------
// ✨ Symbols are Always Unique
// -----------------------------

// Even if descriptions are the same,
// every symbol is different.

let yntp = Symbol("ak");
let rehman = Symbol("ak");

// console.log(Symbol("ak") === Symbol("ak")); // false


// -----------------------------
// 🔑 Symbols as Object Keys
// -----------------------------

// Symbols are often used for
// hidden or special object properties.

const user = {
  name: "Prince",
};

const secret = Symbol("id");

user[secret] = 12345;


// -----------------------------
// 👀 Hidden Properties
// -----------------------------

// Symbol properties are skipped in
// normal loops like for..in

// for (let key in user) {
//   console.log(key);
// }

// "secret" symbol property will not appear


// -----------------------------
// 🌍 Global Symbols
// -----------------------------

// Symbol.for() creates or retrieves
// a symbol from the global symbol registry.

let org = Symbol.for("ChaiCode");

let company = Symbol.for("ChaiCode");


// These return the SAME symbol

console.log(org === company); // true


// Get key from global symbol

// console.log(Symbol.keyFor(org));


// -----------------------------
// ⚙️ System Symbols
// -----------------------------

// JavaScript has built-in symbols used internally.

// Examples:

// Symbol.iterator
// Symbol.toPrimitive


// -----------------------------
// 🔍 Accessing Symbol Properties
// -----------------------------

// Symbols are not fully hidden.
// We can still access them using:

// Object.getOwnPropertySymbols(obj)


// Example

// const symbols = Object.getOwnPropertySymbols(user);
// console.log(symbols);


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - Symbols are unique primitive values
// - They are often used as object property keys
// - Symbol properties are skipped in for..in loops
// - Symbol.for() creates shared global symbols
// - Object.getOwnPropertySymbols() can access them