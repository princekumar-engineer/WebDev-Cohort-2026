// 🔧 JS Methods of Primitives — Quick Notes


// -----------------------------
// 🧠 Primitives vs Objects
// -----------------------------

// Primitives:
// - string
// - number
// - boolean
// - symbol
// - bigint
// - null
// - undefined

// Objects are heavier than primitives.
// Primitives are lightweight values.


// -----------------------------
// 🤔 Then How Do Primitives Have Methods?
// -----------------------------

// Example:

let str = "akCool";

let strClean = str.toLowerCase();

console.log(strClean);


// But primitives are NOT objects.
// So how does this work?


// -----------------------------
// 🪄 JavaScript Trick (Wrapper Object)
// -----------------------------

// When we access a method on a primitive,
// JavaScript temporarily creates a special object.

// Example conceptually:

// {
//   value: "akCool",
//   toLowerCase()
// }


// JavaScript internally does something like:

// new String("akCool")

// Then it calls the method
// and deletes the temporary object.


// -----------------------------
// 📦 Wrapper Objects
// -----------------------------

// JavaScript provides wrapper objects
// for primitive types.


// String wrapper
let text = "HELLO";
console.log(text.toLowerCase());


// Number wrapper
let num = 42;
console.log(num.toFixed(2));


// Boolean wrapper
let flag = true;
console.log(flag.toString());


// -----------------------------
// ⚠️ Wrapper Object Types
// -----------------------------

// JavaScript wrapper objects include:

// String
// Number
// Boolean
// Symbol
// BigInt


// -----------------------------
// 🧠 Important Note
// -----------------------------

// The wrapper object exists only temporarily.
// After the method runs,
// JavaScript removes it automatically.


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - Primitives are lightweight values
// - Objects are heavier structures
// - Primitives can still use methods
// - JavaScript creates temporary wrapper objects
// - Wrapper types: String, Number, Boolean, Symbol, BigInt