// ⚓ JS Variables — Quick Notes

// 🟢 var → function scoped, can be redeclared, avoid in modern JS
var shipName = "The Amber";
console.log("Shipname: ", shipName);

// 🟡 let → block scoped, can be reassigned
let crewCount = 12;
console.log("crew count: ", crewCount);

// ✅ Reassignment allowed with let
crewCount = 14;

// 🔒 const → block scoped, cannot be reassigned
const captainName = "Jack Sparrow";
console.log("Captain Name: ", captainName);

// ❌ Reassignment would throw error
// captainName = "Dipesh";

// ⚠️ var leaks outside block (not block scoped)
if (true) {
  var leakyTreasure = "Gold coins";
}

// 🔁 var in loop → still accessible outside
for (var i = 0; i < 10; i++) {
  //
}

// ⚠️ Common bug: using wrong variable in condition
// Here j is declared but i is used — logic mistake
for (let j = 0; i < 10; i++) {
  //
}

// 📢 Accessible because var is not block scoped
console.log(leakyTreasure);

// 🏷️ Naming conventions
let shipSpeed = 22;          // camelCase (standard)
let _privatelog = "secret";  // underscore for internal
let MONGODB_URI = "";        // UPPERCASE for constants/env
let name = "hitesh";         // avoid generic names in real apps

// 📦 const object → reference cannot change, but properties can
const treasureChest = {
  gold: 100,
  rubies: 50,
  maps: 2,
};

// ✅ Mutating object property allowed
treasureChest.gold = 150;

// ❌ Reassigning whole object not allowed
// treasureChest = { gold: 50 };

// 📚 const array → elements can change
const crewRoster = ["Alok", "Abhinav", "Tasnish"];

// ✅ Modify array
crewRoster.push("vraj");
crewRoster[0] = "Shubham";

// ❌ Reassigning array not allowed
crewRoster = ["Someone"];

// 🧠 Key Takeaways:
// - Prefer let and const over var
// - Use const by default, let when value changes
// - var can cause scope bugs
// - const prevents reassignment but allows mutation
// - Follow clear naming conventions
// - Watch for loop variable mistakes
