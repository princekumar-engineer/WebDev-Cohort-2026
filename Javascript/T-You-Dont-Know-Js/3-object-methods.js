// ⚙️ JS Object Methods — Quick Notes


// -----------------------------
// 🧠 What is an Object Method?
// -----------------------------

// A method is simply a function stored inside an object.

function viralDance() {
  console.log("Ichu Inchu Song");
}


// -----------------------------
// 🐶 Adding Method After Object Creation
// -----------------------------

// const dogesh = {
//   name: "Husky",
// };

// dogesh.dance = function () {
//   console.log("Ichu Ichu Song");
// };


// -----------------------------
// 🔗 Using External Function as Method
// -----------------------------

// const dogesh = {
//   name: "Husky",
//   dance: viralDance,
// };


// -----------------------------
// 🧱 Method Defined Inside Object
// -----------------------------

// const dogesh = {
//   name: "Husky",
//   dance: function () {
//     console.log("Ichu Inchu Song");
//   },
// };


// -----------------------------
// ✨ Method Shorthand (Modern JS)
// -----------------------------

const dogesh = {
  name: "Husky",

  dance() {
    console.log("Ichu Inchu Song");
  },
};


// dogesh.dance();


// -----------------------------
// 🧠 Using "this" Keyword
// -----------------------------

// "this" refers to the current object.

let user = {
  name: "Piyush Garg",
  age: 26,
  college: "Chitkara University",
  passout: 2021,
  gf: "Mai Ka Ladli",

  intro() {
    console.log(`Hi, my name is ${this.name}!`);
    console.log(`I am ${this.age} years old.`);
    console.log(`I studied at ${this.college} and passed out in ${this.passout}.`);
    console.log(`My girlfriend's name is ${this.gf}.`);
  },
};


// user.intro();


// -----------------------------
// 🔁 Object Reference Behavior
// -----------------------------

let piyush = user;

// remove original reference
user = null;


// The object still exists because
// "piyush" still references it.

piyush.intro();


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - Methods are functions inside objects
// - Methods can be added after object creation
// - Functions can also be reused as methods
// - Method shorthand makes syntax cleaner
// - "this" refers to the current object
// - Objects exist as long as at least one reference exists