// 🆕 JS new Operator — Quick Notes


// -----------------------------
// 🧠 What is the new Operator?
// -----------------------------

// The "new" operator is mostly used with
// Constructor Functions to create objects.


// -----------------------------
// 🏗️ Constructor Function Rules
// -----------------------------

// 1️⃣ Name usually starts with a Capital Letter
//    (User, Person, Car)

// 2️⃣ It should be executed using the "new" keyword


// -----------------------------
// 👤 Constructor Example
// -----------------------------

function User(name) {
  this.name = name;
  this.isPaid = false;
}


// Creating an object using "new"

const aj = new User("Ani");

// console.log(aj);


// Resulting Object:
// {
//   name: "Ani",
//   isPaid: false
// }


// -----------------------------
// ✨ What "new" Actually Does
// -----------------------------

// When "new" runs, JavaScript automatically does:

// 1️⃣ Create a new empty object
//      this = {}

// 2️⃣ Run the constructor function

// 3️⃣ Attach properties to "this"

// 4️⃣ Return the object automatically


// -----------------------------
// 🔍 Behind the Scenes
// -----------------------------

// This is roughly what happens internally

// function User(name) {

//   this = {};            // Step 1

//   this.name = name;     // Step 2
//   this.isPaid = false;  // Step 3

//   return this;          // Step 4
// }


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - "new" creates a fresh object
// - Constructor functions initialize object data
// - "this" refers to the newly created object
// - "new" automatically returns the object
// - Constructor names usually start with capital letters