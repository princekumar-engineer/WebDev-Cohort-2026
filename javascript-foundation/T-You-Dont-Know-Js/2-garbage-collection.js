// 🧹 JS Garbage Collection — Quick Notes


// -----------------------------
// 🧠 What is Garbage Collection?
// -----------------------------

// JavaScript automatically manages memory.
// When data is no longer reachable, the
// Garbage Collector removes it from memory.


// -----------------------------
// 📍 Reachability Concept
// -----------------------------

// Objects remain in memory while they are reachable
// (i.e., something can still access them).

let temp = {
  email: "gibberish@xyz.com",
  valid: "5", // minutes
};


// -----------------------------
// ❌ Removing the Reference
// -----------------------------

// After 5 minutes the data is no longer needed

temp = null;


// Now the object has no reference pointing to it
// Garbage Collector will eventually remove it
// and free the memory.


// -----------------------------
// 🎬 Example Object
// -----------------------------

const movie = {
  title: "Ghosted",
  release: 2023,
  production: "Apple TV",
};


// -----------------------------
// 🎭 Creating Linked Objects
// -----------------------------

function coStar(actor, actress) {

  // circular references
  actor.coStar = actress;
  actress.coStar = actor;

  return {
    leading: actor,
    supporting: actress,
  };
}


// -----------------------------
// 📦 Adding Nested Object
// -----------------------------

movie.cast = coStar(
  { name: "Chris Evans", salary: 10_000_000 },
  { name: "Ana de Armas", salary: 2_000_000 }
);


// console.log(movie);


// -----------------------------
// 🗑️ Breaking References
// -----------------------------

// Removing reference from movie

movie.cast = null;


// Now actor and actress objects
// are no longer reachable from the program.

// Garbage Collector will clean them up.


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - JavaScript automatically manages memory
// - Objects stay in memory while reachable
// - Removing references makes them eligible for cleanup
// - Garbage Collector frees unused memory
// - Setting variables to null helps remove references