// 🚆 JS Arrays — Quick Notes

// 🟢 Array literal (most common way)
const carriage1 = ["Veer", "Ayush", "Ravi"];

// 📭 Empty array
const emptyCarriage = [];

// 🪑 Array constructor with length (creates empty slots)
const threeEmptySeats = Array(3);
console.log(threeEmptySeats.length);

// ⚠️ Array constructor with elements
const passenger = Array("Veer", "Ayush", "Ravi");

// ✅ Array.of → avoids constructor confusion
const singlePassenger = Array.of(3);
console.log(singlePassenger);

// 🔤 Array.from → converts iterable to array
const trainCode = Array.from("DUST");
console.log(trainCode);

// ✂️ Changing length truncates or expands array
const tempTrain = ["A", "B", "C", "D", "E"];

// ✅ Truncate array
tempTrain.length = 3;
console.log(tempTrain);

// ⚠️ Expanding creates empty slots
tempTrain.length = 5;
console.log(tempTrain);

// 🔧 Common mutating methods
// push → add at end
// pop → remove from end
// shift → remove from start
// unshift → add at start
// splice → add/remove anywhere

// 🔄 Non-mutating methods (return new array)
// concat → merge arrays
// slice → copy portion
// flat → flatten nested arrays
// flatMap → map + flatten

// 📋 Example copy (shallow copy)
// const trainCopy = wholeTrain.slice()

// 🔍 Searching methods
// indexOf → find index
// includes → true/false check
// find → first match
// findIndex → index of match

// 🧠 Type checking
console.log(typeof []); // object
console.log(Array.isArray([])); // true
console.log(Array.isArray("Ravi")); // false

// 🧠 Key Points:
// 1️⃣ [] vs Array(4) → empty slots behave differently
// 2️⃣ Arrays are zero-based indexed
// 3️⃣ Mutating methods change original array
// 4️⃣ Non-mutating methods return new array
// 5️⃣ includes is simplest existence check
// 6️⃣ Always use Array.isArray for checking arrays
