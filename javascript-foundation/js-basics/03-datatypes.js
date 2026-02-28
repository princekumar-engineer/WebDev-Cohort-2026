// 🧪 JS Data Types — Quick Notes

// 🟢 String → text data
const weaponName = "Flame Sword";
console.log("Weapon: ", weaponName, "| type: ", typeof weaponName);

// 🔢 Number → integers & decimals
const attackPower = 75;
const attackUpgrade = 1.5;

console.log(typeof attackPower);
console.log(typeof attackUpgrade);

// ✅ Boolean → true / false
const isLoggedIn = true;

// ❓ undefined → declared but no value assigned
let bonusEffect;

// 🚫 null → intentional empty value
let curseStatus = null;
let weatherApiResponse = null;

// ⚠️ typeof null returns "object" (JS historical bug)
console.log(typeof weatherApiResponse);

// 🆔 Symbol → unique identifiers
const uniqueRuneId = Symbol("rune_of_fire");
const uniqueRuneId2 = Symbol("rune_of_fire"); // still unique

console.log(
  "Rune: ",
  uniqueRuneId.toString(),
  "| type of: ",
  typeof uniqueRuneId,
);

// 📦 Object → key-value pairs
const heroStats = {
  name: "Deepak",
  level: 12,
  class: "Ranger",
};

console.log("Hero: ", heroStats, " | type: ", typeof heroStats);

// 📚 Array → special object for lists
const inventory = ["Flame Sword", "Health Potion", "Shield"];

// ⚠️ typeof [] → "object"
console.log("Inventory: ", inventory, " | type: ", typeof inventory);

// 🔧 Function → callable object
function castSpell() {
  return "Fireball";
}
console.log("Spell Type ", typeof castSpell);

// 🔍 typeof examples for quick reference
console.log(typeof "chaicode");   // string
console.log(typeof 42);           // number
console.log(typeof 42n);          // bigint
console.log(typeof true);         // boolean
console.log(typeof undefined);    // undefined
console.log(typeof null);         // object (quirk)
console.log(typeof Symbol());     // symbol
console.log(typeof {});           // object
console.log(typeof []);           // object
console.log(typeof function () {}); // function

// 🧠 Primitive → copied by value
let originalHP = 100;
let cloneHP = originalHP;

cloneHP = 80;

console.log("Original HP: ", originalHP);
console.log("Cloned HP: ", cloneHP);

// 📌 Objects → copied by reference
const originalSword = {
  name: "Flame Sword",
  damage: 75,
  typeofW: "Fire",
};

const cloneSword = originalSword;

// ⚠️ Changing clone affects original
cloneSword.damage = 100;

console.log("Original Sword: ", originalSword.damage);

// 🧩 Shallow copy using spread
const armorOriginal = {
  name: "Iron Plate",
  defence: 80,
  buff: {
    fire: 10,
  },
};

const armorCopy = { ...armorOriginal };

// ⚠️ Nested object still shared (shallow copy)
armorCopy.buff.fire = 90;

// 🧬 Deep copy using structuredClone
const potionOriginal = { name: "Health", effects: { heal: 40, mana: 30 } };
const potionCopy = structuredClone(potionOriginal);

// 🐞 Known JS quirks
typeof null === "object"; // historical bug
Array.isArray(); // proper way to check arrays

// 🧠 Key Takeaways:
// - JS has primitive and reference types
// - typeof helps identify types (with quirks)
// - Objects & arrays are reference types
// - Spread operator creates shallow copy
// - structuredClone creates deep copy
// - Symbols are always unique
// - null vs undefined are different concepts
