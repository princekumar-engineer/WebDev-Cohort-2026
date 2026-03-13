// 🔁 JS Iterables — Quick Notes


// -----------------------------
// 🧠 What is an Iterable?
// -----------------------------

// An iterable is any object that can be used
// in a for..of loop.

// Examples of built-in iterables:
// - String
// - Array
// - Map
// - Set


// -----------------------------
// ⚙️ How Iterables Work
// -----------------------------

// Iterables use a special method:

// [Symbol.iterator]

// This method tells JavaScript
// how to iterate over the object.


// -----------------------------
// 🧩 Iterator Protocol
// -----------------------------

// The iterator method must:

// 1️⃣ Return an object
// 2️⃣ That object must have next()

// next() returns an object:

// {
//   done: Boolean,
//   value: any
// }


// -----------------------------
// 📦 Example Object
// -----------------------------

// Let's make our own object iterable

let playlist = {
  songs: [
    "My Sweet Lord",
    "Pyaro Vrindavan",
    "Surrender",
    "Like a River"
  ],

  from: 0,
};


// -----------------------------
// 🔧 Implement Symbol.iterator
// -----------------------------

playlist[Symbol.iterator] = function () {

  let curr = this.from;

  const songs = this.songs;

  return {

    next() {

      if (curr < songs.length) {

        return {
          done: false,
          value: songs[curr++]
        };

        // songs[curr++]
        // equivalent to:
        // songs[curr]; curr++

      }

      return { done: true };

    }

  };

};


// -----------------------------
// 🔁 Using for..of Loop
// -----------------------------

for (const song of playlist) {
  // console.log("Now Playing:", song);
}


// -----------------------------
// 🔄 Iterable → Array
// -----------------------------

// Array.from() converts an iterable
// into a real array.

const array = Array.from(playlist);

console.log(array);


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - Iterables work with for..of loops
// - They implement [Symbol.iterator]
// - Symbol.iterator returns an iterator
// - Iterator has next() method
// - next() returns {done, value}
// - Array.from() converts iterables to arrays