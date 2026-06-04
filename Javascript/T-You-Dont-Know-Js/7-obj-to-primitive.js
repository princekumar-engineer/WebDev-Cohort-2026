// 🔄 JS Object → Primitive Conversion — Quick Notes


// -----------------------------
// 🧠 What is Object to Primitive Conversion?
// -----------------------------

// Sometimes JavaScript needs to convert
// an object into a primitive value.

// Primitive types:
// - string
// - number
// - boolean
// - bigint
// - symbol
// - null / undefined

// Most common conversions:
// Object → string
// Object → number


// -----------------------------
// ⚙️ Symbol.toPrimitive
// -----------------------------

// JavaScript allows us to define
// custom conversion behavior using:

// obj[Symbol.toPrimitive](hint)


// -----------------------------
// 🧩 Conversion Hints
// -----------------------------

// JavaScript provides a "hint"
// telling what type it expects.

// Possible hints:

// "string"
// "number"
// "default"

// Example:
// Binary + operator can mean
// addition OR string concatenation.


// -----------------------------
// 📦 Example Object
// -----------------------------

let galgota = {
  status: "wasted",
  aura: -1000,

  // custom primitive conversion
  [Symbol.toPrimitive](hint) {

    if (hint === "string") {
      return this.status;
    }

    return this.aura;
  },
};


// -----------------------------
// 🔎 Conversion Examples
// -----------------------------

console.log(galgota);

console.log(String(galgota)); // uses "string" hint

console.log(Number(galgota)); // uses "number" hint


// -----------------------------
// ⚠️ Default JS Behavior
// -----------------------------

// If Symbol.toPrimitive is NOT defined,
// JavaScript uses:

// hint: "string" → toString()
// hint: "number" → valueOf()


// -----------------------------
// 🎲 Example Utility Function
// -----------------------------

function randNo(start, end) {

  return start + Math.random() * (end - start);

  // Math.random() → [0,1)

  // Example:
  // 0–1 * diff → [0 , 5)

  // 5 + result → [5 , 10)
}


// -----------------------------
// 📦 Example Object for JSON
// -----------------------------

let user = {
  name: "Vidya",
  age: 23,

  roles: {
    isInstructor: false,
    isEditor: true,
    isDesigner: true,
  },
};


// -----------------------------
// 🔄 Object → JSON → Object
// -----------------------------

// Convert object to JSON string

const serialize = JSON.stringify(user, null, 2);


// Convert JSON string back to object

console.log(JSON.parse(serialize));


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - Objects sometimes need to convert to primitives
// - Symbol.toPrimitive lets us control conversion
// - JavaScript provides hints: "string", "number", "default"
// - Without Symbol.toPrimitive → JS uses toString() or valueOf()
// - JSON.stringify() converts object → JSON
// - JSON.parse() converts JSON → object