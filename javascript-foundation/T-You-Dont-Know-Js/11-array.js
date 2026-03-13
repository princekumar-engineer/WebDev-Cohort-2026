// 📦 JS Arrays — Quick Notes


// -----------------------------
// 🧠 Creating Arrays
// -----------------------------

// Two ways to create arrays

let arr1 = new Array(); // Constructor syntax

let arr2 = []; // Literal syntax (most common)


// Example array

const appleTVShows = ["Silo", "See", "Hijack", "Severance", "Pluribus"];


// -----------------------------
// 🔍 Accessing Elements
// -----------------------------

// Arrays are zero-indexed

// console.log(appleTVShows[0]);

// Access last element

// console.log(appleTVShows.at(-1));


// -----------------------------
// ⚙️ Array Behavior
// -----------------------------

// JavaScript arrays behave like a Deque
// (double ended queue).

// Queue → FIFO (First In First Out)
// Methods: push(), shift()

// Stack → LIFO (Last In First Out)
// Methods: push(), pop()


// -----------------------------
// 🧩 Internal Structure
// -----------------------------

// Arrays are technically objects.

// Structure:
// index → value

// JS engines try to store array elements
// in contiguous memory for better performance.


// -----------------------------
// 🔁 Looping Arrays
// -----------------------------

// Traditional loop

for (let i = 0; i < appleTVShows.length; i++) {
  // console.log(appleTVShows[i]);
}


// Modern loop

for (const tvShow of appleTVShows) {
  // console.log(tvShow);
}


// -----------------------------
// 📏 length Property
// -----------------------------

let food = [];

food[7] = "Idali";

// console.log(food.length); // 8


// -----------------------------
// 🧮 Creating Arrays with fill()
// -----------------------------

// Useful for DSA problems

// console.log(new Array(50).fill(0));


// -----------------------------
// 🛠️ Common Array Methods
// -----------------------------

// Modify array
// splice(), concat()

// Loop helper
// forEach()

// Search methods
// indexOf()
// lastIndexOf()
// includes()
// find()
// findIndex()
// findLastIndex()
// filter()


// -----------------------------
// 🔄 Transforming Arrays
// -----------------------------

// reverse() → modifies original array

// split(delimiter) → string → array

// join(glue) → array → string

// sort()


// -----------------------------
// 🔤 Sorting Strings
// -----------------------------

const names = [
  "Atchuyt",
  "Madhav",
  "Kṛṣṇa",
  "Keshav",
  "Damodar",
  "Gauranga",
  "Gopal",
  "Radharaman",
];

// console.log(names.sort());


// -----------------------------
// 🔢 Sorting Numbers
// -----------------------------

const numbers = [5, 11, 2, 37, 41, 77, 8, 28];

// Default sorting is lexicographical

// console.log(numbers.sort());


// Custom numeric comparison

function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
  if (a === b) return 0;
}

// console.log(numbers.sort((a, b) => a - b)); // ascending

// console.log(numbers.sort((a, b) => b - a)); // descending


// -----------------------------
// 🌍 Sorting with localeCompare
// -----------------------------

const names2 = [
  "Atchuyt",
  "Madhav",
  "Kṛṣṇa",
  "Kubera",
  "Damodar",
  "Gauranga",
  "Gopal",
  "Radharaman",
];

// console.log(names2.sort((a, b) => a.localeCompare(b)));


// -----------------------------
// 🔁 map() vs forEach()
// -----------------------------

// map() → returns a new array
// forEach() → does not return a new array


const shoppingCart = [
  { name: "Macbook Pro 16", price: 3499 },
  { name: "iPhone 17 Pro", price: 1099 },
  { name: "iPad Pro", price: 1299 },
  { name: "Apple Watch", price: 249 },
];


const prices = shoppingCart.map(item => item.price);

// console.log(prices);


// -----------------------------
// ➕ reduce()
// -----------------------------

// Used to combine values into one result

const total = prices.reduce((total, price) => total + price, 0);

// console.log(total);


// -----------------------------
// 🔝 Finding Max & Min
// -----------------------------

const n = [-20, -9, 0, 10, 45];


const max = n.reduce((max, curr) => {
  if (max < curr) max = curr;

  return max;
}, -Infinity);


const min = n.reduce((min, curr) => {
  if (min > curr) min = curr;

  return min;
}, Infinity);


// console.log(min);


// -----------------------------
// 🔍 Checking Array Type
// -----------------------------

console.log(Array.isArray(prices));


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - Arrays store ordered collections
// - Index starts from 0
// - Arrays support stack and queue operations
// - Arrays are technically objects
// - Useful methods: map(), filter(), reduce()
// - Default sort is lexicographic
// - Use Array.isArray() to check array type