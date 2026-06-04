// 🪶 JS WeakMap & WeakSet — Quick Notes


// -----------------------------
// 🧠 Why WeakMap / WeakSet?
// -----------------------------

// JavaScript keeps objects in memory
// while they are "reachable".

// When an object is no longer reachable,
// the Garbage Collector removes it.

// WeakMap and WeakSet help store data
// linked to objects without preventing
// garbage collection.


// -----------------------------
// 🗺️ WeakMap
// -----------------------------

// WeakMap is similar to Map,
// but keys MUST be objects.


// -----------------------------
// 🏗️ Creating WeakMap
// -----------------------------

const bounties = new WeakMap();

let first = { name: "Windows" };

let second = { name: "Aryan - Mac" };


// Store values using objects as keys

bounties.set(first, "5000");

bounties.set(second, "3000");


// -----------------------------
// 🧹 Garbage Collection Behavior
// -----------------------------

// If an object key disappears,
// its entry automatically disappears.

first = null;

// console.log(bounties.has(first));


// -----------------------------
// ⚙️ WeakMap Methods
// -----------------------------

// weakMap.set(key, value)
// weakMap.get(key)
// weakMap.delete(key)
// weakMap.has(key)


// WeakMaps are NOT iterable.


// -----------------------------
// 📦 WeakSet
// -----------------------------

// WeakSet is similar to Set,
// but it stores ONLY objects.


// -----------------------------
// 🏗️ Example WeakSet
// -----------------------------

const gc = [
  { text: "Hello Team, Let's plan Vacation", from: "Hitesh" },
  { text: "Yoo I'm in! When?", from: "AK" },
  { text: "This Holi", from: "Ani" },
  { text: "Can I bring my girlfriend?", from: "Piyush" },
];


// Create WeakSet

const unreadForVidya = new WeakSet(gc);

// console.log(unreadForVidya);


// -----------------------------
// 🧹 Object Removed
// -----------------------------

// Piyush deletes his message

gc.pop();

// console.log(gc);


// Now the removed object is no longer reachable.


// -----------------------------
// 🔍 Checking WeakSet
// -----------------------------

console.log(unreadForVidya.has(gc[3]));


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - WeakMap keys must be objects
// - WeakSet stores only objects
// - Entries disappear automatically when objects are garbage collected
// - WeakMap and WeakSet are not iterable
// - Useful for memory-sensitive data