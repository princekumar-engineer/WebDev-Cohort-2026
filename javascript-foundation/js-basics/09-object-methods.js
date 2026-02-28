// 🛠️ JS Object Methods — Quick Notes

// 📦 Basic object
const artifact = {
  name: "Obsidian Crown",
  era: "Ancient",
  value: 50000,
  material: "volcanic glass",
};

// 🔑 Object.keys → array of property names
const keys = Object.keys(artifact);

// 📋 Object.values → array of values
const values = Object.values(artifact);

// 🧾 Object.entries → [key, value] pairs
const entries = Object.entries(artifact);

console.log(keys);
console.log(values);
console.log(entries);

// 🔁 Iterate using entries + destructuring
for (const [key, value] of Object.entries(artifact)) {
  console.log(` ${key}: ${value}`);
}

// 🔄 Convert array → object
const priceList = [
  ["Obsidian Crown", 50000],
  ["Ruby Pendant", 30000],
  ["Iron Shield", 5000],
];

const priceObject = Object.fromEntries(priceList);

// 🧊 Object.freeze → prevents changes (add/remove/update)
const displayCase = {
  artifact: "Obsidian",
  location: "Hall A, Case 3",
  locked: true,
};

Object.freeze(displayCase);

// ❌ These will silently fail (or error in strict mode)
delete displayCase.locked;
displayCase.newProp = "test";

console.log(displayCase);

// 🔒 Object.seal → can update values but cannot add/remove
const catalogEntry = {
  id: "ART-001",
  description: "Ancient Crows",
  verified: true,
};

Object.seal(catalogEntry);

// 🔐 defineProperty → fine control over property behavior
const secureArtificats = { name: "Ruby Pendant" };

Object.defineProperty(secureArtificats, "catelogId", {
  value: "SEC-999",
  writable: false,     // cannot change value
  enumerable: false,   // hidden from loops
  configurable: false, // cannot delete or redefine
});

console.log(secureArtificats.catelogId);

// ❌ Attempt to change will fail
secureArtificats.catelogId = "HACKED";
console.log(secureArtificats.catelogId);

// 🔍 Non-enumerable property won't appear here
for (const [key, value] of Object.entries(secureArtificats)) {
  console.log(`${key} : ${value}`);
}

// 🔎 Inspect property descriptor
const desc = Object.getOwnPropertyDescriptor(secureArtificats, "name");
console.log(desc);

// 🔁 Loop key points:
// 1️⃣ for → classic loop
// 2️⃣ while → condition loop
// 3️⃣ do while → runs at least once
// 4️⃣ for...in → object keys
// 5️⃣ for...of → iterable values
// 6️⃣ map / forEach / filter / reduce → array iteration

// 🧠 Key Takeaways:
// - keys/values/entries help inspect objects
// - fromEntries builds objects dynamically
// - freeze = fully immutable
// - seal = partially locked
// - defineProperty controls property behavior
// - descriptors reveal property metadata
// - enumerable affects loops
