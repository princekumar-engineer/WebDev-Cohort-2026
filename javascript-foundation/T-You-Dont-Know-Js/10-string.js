// 🔤 JS Strings — Quick Notes


// -----------------------------
// 🧠 String Basics
// -----------------------------

// Strings represent text data.

// Three ways to create strings:

let single = 'single-quoted';

let double = "double-quoted";

let backticks = `backticks (string interpolation)`; // `${variable}`


// -----------------------------
// ✨ Template Literals
// -----------------------------

// Backticks allow string interpolation

let name = "Prince";

let greeting = `Hello ${name}`;

// console.log(greeting);


// -----------------------------
// 🔧 Escape Characters
// -----------------------------

// Escape sequences allow special characters inside strings.

/*
\n  → new line
\t  → tab
\\  → backslash
\'  → single quote
\"  → double quote
*/

let fancy = "this is \"me\"";

// console.log("5\\2");


// -----------------------------
// 📜 Multiline Strings
// -----------------------------

// Backticks allow multiline strings

let windowsDownfall = `Downfall started from:
  * w8
  * w10
  * w11 AI
  * Copilot
  * noted bug
  * Blue Screen of Death
`;

// console.log(windowsDownfall);


// -----------------------------
// 📏 String Length
// -----------------------------

// length property returns total characters

// console.log(windowsDownfall.length);


// -----------------------------
// 🔍 Accessing Characters
// -----------------------------

// Two ways to access characters:

// 1️⃣ Square brackets []

// console.log(windowsDownfall[0]);

// console.log(windowsDownfall[windowsDownfall.length - 1]);


// 2️⃣ .at(position)


// console.log(windowsDownfall.at(-1)); // last character


// -----------------------------
// 🔁 Strings are Iterable
// -----------------------------

// We can loop through characters using for..of

for (const char of "meow") {
  // console.log(char);
}


// -----------------------------
// 🔒 Strings are Immutable
// -----------------------------

// Strings cannot be changed directly.

let str = "Kama";

// Instead we create a new string

str = "R" + str.substring(1);

// console.log(str);


// -----------------------------
// 🧹 String Methods Example
// -----------------------------

// trim() removes extra spaces from start and end

console.log(windowsDownfall.trim().length);


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - Strings represent text data
// - Can be created using '', "", or backticks ``
// - Backticks support interpolation and multiline strings
// - Strings are iterable using for..of
// - Strings are immutable
// - Useful methods: trim(), substring(), length