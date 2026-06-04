// 🔢 JS Numbers — Quick Notes


// -----------------------------
// 🧠 Numeric Separators
// -----------------------------

// Underscore (_) helps improve readability
// in large numbers.

let million = 1_000_000;


// -----------------------------
// ⚡ Exponential Notation
// -----------------------------

// e represents powers of 10.

// 1e5 → 1 × 10^5

let lakh = 1e5; // 100000

// 4e7 → 4 × 10^7

let cr = 4e7; // 40,000,000


// -----------------------------
// 🔬 Very Small Numbers
// -----------------------------

// Negative exponent represents
// very small numbers.


// 5e-10 → 5 × 10⁻¹⁰

let dAtom = 5e-10;


// 1e-15 → 1 × 10⁻¹⁵

let dNucleus = 1e-15;


// -----------------------------
// 🎨 Hexadecimal Numbers
// -----------------------------

// Base 16 number system

// Common in colors (RGB)

console.log(0xff); // 255


// Example:
// #ffffff → RGB(255,255,255)


// -----------------------------
// 💻 Binary Numbers
// -----------------------------

// Binary uses base 2

// Prefix: 0b

// console.log(0b111);


// -----------------------------
// 🧮 Octal Numbers
// -----------------------------

// Octal uses base 8

// Prefix: 0o

console.log(0o111); // 73 (octal → decimal)

// 111 → (64 + 8 + 1)


console.log(0o13); // 11


// -----------------------------
// 🔄 Number → String Conversion
// -----------------------------

// toString(base)

// Base examples:
// 2 → binary
// 8 → octal
// 16 → hexadecimal

const number = 11;

console.log(number.toString(16)); // b


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - Use "_" to make large numbers readable
// - "e" notation represents powers of 10
// - Negative exponent represents very small numbers
// - Hex numbers start with 0x
// - Binary numbers start with 0b
// - Octal numbers start with 0o
// - number.toString(base) converts numbers to different bases