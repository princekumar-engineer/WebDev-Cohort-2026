// 📦 JS Objects — Quick Notes

// Objects store data in key:value pairs
// Example → { name: "Prince", age: 22 }


// -----------------------------
// 🧱 Two Ways to Create Objects
// -----------------------------

let gemini = new Object(); // Object Constructor Syntax
let claude = {};           // Object Literal (most common)


// -----------------------------
// 🧠 Basic Object Example
// -----------------------------

let gpt = {
  company: "openai",  // key : value
  version: 5.3,
  releaseYear: 2025,
};

// console.log(gpt.company);


// -----------------------------
// ➕ Adding New Properties
// -----------------------------

gpt.type = "Large Language Model";

// Objects can store any type of value
gpt.isMultiModal = true;


// -----------------------------
// ✏️ Modifying Properties
// -----------------------------

gpt.type = "LLM";


// -----------------------------
// ❌ Deleting Properties
// -----------------------------

delete gpt.type;


// console.log(gpt);


// -----------------------------
// 🔑 Multi-word & Number Keys
// -----------------------------

let sonnet = {
  company: "anthropic",
  version: 4.6,
  "released on": 2026, // multi-word property must use quotes
  1: "claude hi hai",  // number keys allowed
};


// -----------------------------
// 🔎 Access Using Bracket Notation
// -----------------------------

// console.log(sonnet["released on"]);
// console.log(sonnet[1]);


// -----------------------------
// 📥 Using Expression as Property Name
// -----------------------------

const input = "company";

// console.log(sonnet[input]);


// -----------------------------
// ✨ Property Shorthand
// -----------------------------

function getLaptop(name, price) {

  return {
    brand: "Apple",
    name,   // shorthand for name:name
    price,  // shorthand for price:price
  };
}

let myMac = getLaptop("M4 Air", 99_900);

// console.log(myMac);


// -----------------------------
// 🔍 Searching for a Property
// -----------------------------

// undefined check
// console.log(myMac.ram === undefined);

// "in" operator
// console.log("ram" in myMac);


// -----------------------------
// 🔁 Looping Through Objects
// -----------------------------

// for..in loop → iterates over keys

// for (let key in myMac) {
//   console.log(key);
//   console.log(myMac[key]);
// }


// -----------------------------
// 📊 Property Order in Objects
// -----------------------------

// Integer keys → sorted automatically
// String keys → appear in creation order

let codes = {

  // Asia
  "+7": "Russia",
  "+32": "Belgium",
  "+91": "India",

  // North America
  "+1": "Canada",
  "+52": "Mexico",
};

// for (const code in codes) {
//   console.log(code);
// }


// -----------------------------
// 🧬 Primitive Copy vs Object Reference
// -----------------------------

// Primitives → copied by VALUE

let like = "Radhika Das";
let love = like;

// console.log(love);

like = "Taylor Swift";

// console.log(love);


// Objects → copied by REFERENCE

let artist = {
  name: "Radhika Das",
  county: "UK",
};

let kirtaniya = artist;

artist.county = "England";

// console.log(kirtaniya);


// -----------------------------
// ⚠️ Object Comparison
// -----------------------------

let a = {};
let b = {};

// console.log(a === b); // false


// -----------------------------
// 🔒 const Objects
// -----------------------------

// const prevents reassignment
// but object properties CAN change

const ev = {
  name: "Mahindra be6",
};

ev.name = "BYD Seal";

// console.log(ev);


// -----------------------------
// 📋 Object Cloning
// -----------------------------

const original = {
  k1: "v1",
  k2: "v2",
};


// Manual cloning

// let clone = {}
// for (let key in original) {
//   clone[key] = original[key];
// }


// Using Object.assign()

let clone = Object.assign({}, original);

// console.log(clone);


// -----------------------------
// 🪆 Nested Objects
// -----------------------------

const nestedObj = {
  model: "gpt",
  version: "5.3",
  capabilities: {
    reasoning: true,
    codeGeneration: true,
    imageUnderstanding: true,
    toolUse: true,
    functionCalling: true,
    streaming: true,
  },
};


// -----------------------------
// 🧠 Deep Cloning
// -----------------------------

// structuredClone → deep copy

const nestedClone = structuredClone(nestedObj);

nestedObj.version = 5.2;

console.log(nestedClone);


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - Objects store data as key:value pairs
// - Dot notation → obj.key
// - Bracket notation → obj["key"]
// - Objects are copied by reference
// - Use Object.assign() for shallow clone
// - Use structuredClone() for deep clone
// - for..in loop helps iterate object keys