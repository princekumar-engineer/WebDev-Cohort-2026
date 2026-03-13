// ⏰ JS Date & Time — Quick Notes


// -----------------------------
// 🧠 Date Basics
// -----------------------------

// In JavaScript, a Date object always contains:
// 1️⃣ Date
// 2️⃣ Time


// -----------------------------
// 🏗️ Creating Date Objects
// -----------------------------

// Current date and time

const now = new Date();

// console.log(now);


// Create date using parameters
// (year, monthIndex, day, hour, minute)

const piyushBDay = new Date("2000-01-01");

// Update time

piyushBDay.setHours(8, 32);

// console.log(piyushBDay);


// -----------------------------
// 📥 Getting Date Components
// -----------------------------

// Useful getter methods:

// getFullYear()
// getMonth()
// getDate()
// getHours()
// getMinutes()
// getMilliseconds()
// getDay()


// Example:

// console.log(now.getFullYear());


// -----------------------------
// ✏️ Setting Date Components
// -----------------------------

// Methods used to modify date values:

/*

setFullYear(year, [month], [date])

setMonth(month, [date])

setDate(date)

setHours(hour, [min], [sec], [ms])

setMinutes(min, [sec], [ms])

setSeconds(sec, [ms])

setMilliseconds(ms)

setTime(milliseconds)

*/


// -----------------------------
// 🔄 Auto Correction Feature
// -----------------------------

// JavaScript automatically adjusts
// invalid date values.

let d = new Date(2026, 1, 28, 5, 30);

// Add 2 days

// console.log(d.setDate(d.getDate() + 2));


// Example:
// Feb 28 + 2 days → March 2


// -----------------------------
// 🕰️ Epoch Time
// -----------------------------

// JavaScript dates are based on
// milliseconds since:

// 1 January 1970 (Unix Epoch)


// Current timestamp

// console.log(Date.now());


// -----------------------------
// 📅 Parsing Dates
// -----------------------------

// Convert date string → timestamp

// console.log(Date.parse("2014-4-22"));


// -----------------------------
// 🌍 International Date Formatting
// -----------------------------

// Intl API helps format dates for different locales.

// It replaces libraries like:
// moment.js
// date-fns


// Example:

// const formatter = new Intl.DateTimeFormat("en-IN");

// console.log(formatter.format(new Date()));


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - Date object stores both date and time
// - new Date() creates current date
// - Getter methods retrieve components
// - Setter methods modify date values
// - JavaScript auto-corrects invalid dates
// - Dates are stored as milliseconds since 1970
// - Intl API helps format dates