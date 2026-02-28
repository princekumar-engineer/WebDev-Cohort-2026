// 🧵 JS Strings — Quick Notes

// 🟢 String creation methods
const codeName = "Shadow Fox";        // string literal
const backupName = String("Night Own"); // String constructor
const templateName = `Agent ${codeName}`; // template literal with interpolation

// 🔒 Strings are immutable (cannot change characters)
let intercepted = "HELLO";
intercepted[0] = "J"; // silent fail — no error, no change
console.log(intercepted);

// 📏 String length and character access
const secretCode = "OMEGA-7";

console.log(secretCode.length);

// ⚠️ charAt returns "" if out of range
console.log(secretCode.charAt(99));

// ⚠️ bracket access returns undefined if out of range
console.log(secretCode[99]);

// ✅ .at supports negative indexing
console.log(secretCode.at(-1));

// 🔤 Case conversion
const rawTransmission = "ThE EaGLE has LandeD";
console.log(rawTransmission.toLowerCase());

// 🔍 Searching inside string
const message = "The drop point is at Dock 7. Repeat: Dock 7";

console.log(message.indexOf("Dock"));

// ✂️ slice extracts substring (does not modify original)
message.slice(0, 12);

// 🪓 Splitting string into array
const orders = "    move-north|hold-position|extract-vip";
let orderList = orders.split("|");
console.log("Split", orderList);

// 🧠 split("") creates array of characters
const myDataValue = "SOS".split("");

console.log(typeof myDataValue); // object
console.log(Array.isArray(myDataValue)); // true

// 🧩 Padding string
const missionNumber = "42";
console.log(missionNumber.padStart(6, "0")); // 000042

// 📝 Multiline template string
const spellCard = `

  ++==========================
  | Spell: ${myDataValue} |

  `;

// ⚙️ Conditional template example (commented)
// const profile = `
//   ${checker ? "true-value" : "false-value"}
// `;

// 🏷️ Tagged template literal → advanced feature (custom processing)
// (no tag function here, just placeholder comment)

// 🚫 void operator → returns undefined
console.log(void "hitesh");

// 📦 Object reference example
let generalStore = { name: "Kirana", goods: 2 };
console.log(generalStore);

// ❌ Clearing reference
generalStore = null;
console.log(generalStore);

// 🧠 Key Takeaways:
// - Strings are immutable
// - Use template literals for dynamic strings
// - slice and split are common operations
// - indexOf searches substrings
// - padStart useful for formatting
// - .at supports negative index
// - split returns array
// - void returns undefined
// - null clears object reference
