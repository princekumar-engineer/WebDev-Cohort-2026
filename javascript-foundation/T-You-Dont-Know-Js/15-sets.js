// 🧩 JS Sets — Quick Notes


// -----------------------------
// 🧠 What is a Set?
// -----------------------------

// A Set is a collection of unique values.

// Similar to arrays but:
// ❌ No duplicate values allowed
// ✅ Each value appears only once


// -----------------------------
// 🏗️ Creating a Set
// -----------------------------

// new Set(iterable)

let numbers = new Set([1, 2, 3, 3, 4]);

// Duplicate values automatically removed

// console.log(numbers);


// -----------------------------
// ⚙️ Important Set Methods
// -----------------------------

// new Set(iterable) → create a set
// set.add(value)    → add value
// set.delete(value) → remove value
// set.has(value)    → check if value exists
// set.clear()       → remove all values
// set.size          → total elements


// -----------------------------
// 🔁 Example with String
// -----------------------------

let mm =
  "Hare Krishna Hare Krishna Krishna Krishna Hare Hare Hare Rama Hare Rama Rama Rama Hare Hare Hare Krishna Hare Krishna Krishna Krishna Hare Hare Hare Rama Hare Rama Rama Rama Hare Hare";


// Unique characters

let uniqueChars = new Set(mm);


// Unique words

let uniqueWords = new Set(mm.split(" "));


// console.log(uniqueChars);

console.log(uniqueWords);


// -----------------------------
// 🔄 Convert Set → Array
// -----------------------------

// const arr = Array.from(uniqueWords);

// console.log(arr);


// -----------------------------
// 🔁 Looping Through Set
// -----------------------------

// for (const word of uniqueWords) {
//   console.log(word);
// }


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - Set stores only unique values
// - Duplicate values are automatically removed
// - Works with iterable data
// - Useful for removing duplicates
// - Can be converted to array using Array.from()