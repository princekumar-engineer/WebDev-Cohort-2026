// 🧩 JS Objects — Quick Notes

// 📦 Object literal → key-value pairs
const hero = {
  name: "Luna the Brave",
  class: "Mage",
  level: 12,
  health: 85,
  mana: 120,
  isAlive: true,
};

// ➕ Add new property dynamically
hero.weapon = "Fire";

// ❌ Delete property
delete hero.level;

// 🧙 Another object example
const ranger = {
  name: "Lakshya the swift",
  agility: 80,
  stealth: undefined, // property exists but value is undefined
};

// 🔍 "in" operator → checks property (own + prototype)
console.log("name" in ranger);     // true
console.log("stealth" in ranger);  // true
console.log("toString" in ranger); // true (from prototype)

// 🛡️ hasOwnProperty → checks only own properties
console.log(ranger.hasOwnProperty("toString")); // false

// 🧠 Key Takeaways:
// - Objects store structured data
// - Properties can be added or removed dynamically
// - "in" checks entire prototype chain
// - hasOwnProperty checks only object itself
// - undefined value ≠ property missing
// - delete removes property completely
