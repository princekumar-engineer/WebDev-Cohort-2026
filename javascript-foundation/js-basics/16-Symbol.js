// 🔷 JS Symbols — Quick Notes

// 🧠 When is Symbol knowledge useful?
// 1️⃣ Creating unique object property keys (avoid collisions)
// 2️⃣ Making hidden/internal properties
// 3️⃣ Customizing built-in behavior (Symbol.iterator, Symbol.toPrimitive)
// 4️⃣ Library/framework design
// 5️⃣ Advanced interviews (object internals)

// 🆔 Every Symbol is unique
const aadhaar_of_mayur = Symbol("aadhaar");
const aadhaar_of_piyush = Symbol("aadhaar");

// typeof symbol → "symbol"
console.log(typeof aadhaar_of_mayur);

// ❗ Even with same description, symbols are unique
console.log(aadhaar_of_mayur === aadhaar_of_piyush);

// Convert to string
console.log(aadhaar_of_mayur.toString());

// Access description
console.log(aadhaar_of_mayur.description);

// Symbol without description
const nonIndian = Symbol();
console.log(nonIndian.description); // undefined

// 🧩 Using Symbols as object keys (hidden properties)
const biometricHash = Symbol("biometricHash");
const bloodGroup = Symbol("bloodGroup");

const citizenRecord = {
  name: "Ved Pandey",
  age: 21,
  [biometricHash]: "a7yknfky788dn",
  [bloodGroup]: "O+",
};

// ❌ Symbol keys not shown in Object.keys
console.log(Object.keys(citizenRecord));

// ✅ Get symbol properties explicitly
console.log(Object.getOwnPropertySymbols(citizenRecord));

// 🔁 Custom Iterator using Symbol.iterator
const rtiQueryBook = {
  queries: ["Infra budget", "Ration Card", "Education budget", "Startup laws"],

  [Symbol.iterator]() {
    let index = 0;
    const queries = this.queries;

    return {
      next() {
        if (index < queries.length) {
          return { value: queries[index++], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

// Enables for...of loop
for (const query of rtiQueryBook) {
  console.log(`Filing RTI: ${query}`);
}

// 🔄 Custom type conversion using Symbol.toPrimitive
const governmentScheme = {
  name: "PM Kisan Yojna",
  people: 54,

  [Symbol.toPrimitive](hint) {
    if (hint === "string") return this.name;
    if (hint === "number") return 88;
  },
};

// Number conversion
console.log(+governmentScheme);

// String conversion
console.log(`${governmentScheme}`);

// 🧠 Key Takeaways:
// - Symbol creates unique values
// - Used as hidden object keys
// - Not enumerable by default
// - Symbol.iterator makes object iterable
// - Symbol.toPrimitive customizes type conversion
// - Important for advanced JS & library design