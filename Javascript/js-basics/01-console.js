// 🕵️ JS Console & Variables — Quick Notes

// ✅ Strings stored in variables (const = cannot be reassigned)
const clue1 = "Muddy footprint near the window";
const clue2 = "Broken glass on the table";

// ✅ console.log → general output for debugging/info
console.log("Clue found: ", clue1);
console.log("Clue found: ", clue2);

// ✅ Multiple variables with different types (string + number)
const suspectName = "Dipesh";
const suspectAge = 20;

// ✅ console.log can print multiple values
console.log("Suspect: ", suspectName, "| Age: ", suspectAge);

// ⚠️ console.warn → shows warning message (yellow in DevTools)
console.warn("Warning: Fingerprint evedence detected");

// ❌ console.error → shows error message (red in DevTools)
console.error("Warning: Fingerprint evedence detected");

// 📦 Array of objects → useful for structured data
const evidenceLog = [
  { id: 1, item: "Muddy footprint", location: "Window sill" },
  { id: 2, item: "Broken glass", location: "Living room" },
  { id: 3, item: "Red fiber strand", location: "Door handle" },
];

// 📊 console.table → displays array/object in table format
console.table(evidenceLog);

// 📂 console.group → groups related logs together
console.group("Groupd starts");
console.log("My log 1");
console.log("My log 2");
console.log("My log 3");
console.groupEnd();

// ⏱️ console.time / console.timeEnd → measure execution time
// (Useful for performance testing)

// console.time("time starts now");

// let dnaMatches = 0;
// for (let i = 0; i < 1_000_000; i++) {
//   dnaMatches++;
// }

// console.timeEnd();

// 🔁 Repeated logs — helps test output or loops
console.log("Chaicode");
console.log("Chaicode");
console.log("Chaicode");
console.log("Chaicode");

// 🧠 Key Takeaways:
// - Use console.log for normal debugging
// - Use console.warn for potential issues
// - Use console.error for actual errors
// - Use console.table for readable data
// - Use console.group to organize logs
// - Use console.time to measure performance
