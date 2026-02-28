// 🔢 JS Numbers — Quick Notes

// ✅ Number literals (integer, float, numeric separator)
const crewMembers = 40;
const fuelTons = 142.42;
const light_speed = 299_888_999; // underscore improves readability

// ♾️ Special numeric values
const infiniteRange = Infinity;
const negativeInfiniteRange = -Infinity;
const notANumber = NaN;

// ⚠️ Division by zero → Infinity
console.log(1 / 0);
console.log(-1 / 0);

// 🛡️ Safe integer limits
console.log(Number.MAX_SAFE_INTEGER); // max precise integer
console.log(Number.MIN_SAFE_INTEGER); // min precise integer

// 🔬 Smallest precision difference
console.log(Number.EPSILON);

// ❓ Check NaN safely
console.log(Number.isNaN(notANumber));

// 🔎 Parsing numbers from strings
const fuelReading = "142.75 tons";
const sectorCode = "0xA3"; // hex string
const countDown = "007";

// ✅ parseInt ignores leading zeros
console.log(parseInt(countDown));

// 🧠 parseInt with radix (binary → decimal)
console.log(parseInt("111", 2));

// 📐 Rounding methods
const thrustForce = 4.567;

console.log(Math.round(thrustForce)); // nearest
console.log(Math.floor(thrustForce)); // down
console.log(Math.ceil(thrustForce));  // up
console.log(Math.trunc(thrustForce)); // remove decimal

// 📊 Min / Max values
const temps = [-120, 43, 56, -23];

// ⚠️ Math.min expects numbers, not array directly
console.log(Math.min(temps)); // returns NaN

// ✅ Correct usage would be: Math.min(...temps)

// 🐞 Floating point precision issue
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false

// 🧠 Safe comparison for decimals
function almostEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}

console.log(almostEqual(0.1 + 0.2, 0.3));

// 🧠 Key Takeaways:
// - JS numbers are double-precision floats
// - Division by zero → Infinity
// - NaN means invalid math result
// - Use Number.isNaN instead of isNaN
// - Floating point math has precision errors
// - Use EPSILON for safe comparisons
// - Math functions help with rounding
// - parseInt converts strings to numbers
