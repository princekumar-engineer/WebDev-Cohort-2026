// 🗺️ JS Map — Quick Notes


// -----------------------------
// 🧠 What is a Map?
// -----------------------------

// Map is a collection of key-value pairs,
// similar to objects.

// Difference:
// Object keys → string or symbol
// Map keys → ANY type (number, object, function, etc)


// -----------------------------
// 🏗️ Creating a Map
// -----------------------------

const m = new Map();

m.set(1, "one");

// console.log(m.get(1));


// -----------------------------
// ⚙️ Important Map Methods
// -----------------------------

// new Map()        → creates a map
// map.set(k, v)    → store value by key
// map.get(k)       → get value by key
// map.has(k)       → check if key exists
// map.delete(k)    → remove key-value pair
// map.clear()      → remove all entries
// map.size         → total elements


// -----------------------------
// 📊 Word Frequency Example
// -----------------------------

const text = "the cat sat on the mat the cat";

const freq = new Map();

for (const word of text.split(" ")) {

  const wordFreq = freq.get(word) || 0;

  freq.set(word, wordFreq + 1);

  // Example:
  // the → 1
  // cat → 1
  // sat → 1
  // on → 1
  // the → 2
}


// console.log(freq);


// -----------------------------
// 🔍 Map Iteration Helpers
// -----------------------------

// console.log(freq.keys());

// console.log(freq.values());

// console.log(freq.entries());


// -----------------------------
// 🔑 Using Objects as Keys
// -----------------------------

const affiliates = new Map();

const first = { name: "vidya4sure" };
const second = { name: "devwithjay" };

affiliates.set(first, 50_000);
affiliates.set(second, 20_000);

// console.log(affiliates);


// -----------------------------
// 🔄 Object → Map
// -----------------------------

let obj = {
  name: "Ashu",
  age: 22,
};


// Convert object to map

let map = new Map(Object.entries(obj));

console.log(map);


// -----------------------------
// 🔄 Map → Object
// -----------------------------

let obj1 = Object.fromEntries(map);

console.log(obj1);


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - Map stores key-value pairs
// - Map keys can be any data type
// - Map preserves insertion order
// - Useful methods: set(), get(), has()
// - Object.entries() helps convert object → map
// - Object.fromEntries() converts map → object