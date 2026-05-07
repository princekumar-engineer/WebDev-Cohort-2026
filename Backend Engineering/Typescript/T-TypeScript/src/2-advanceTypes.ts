// 🔷 Advanced TypeScript — Quick Notes

/// <reference lib="dom" />


// -----------------------------
// 🧠 Type Aliases
// -----------------------------

// Type aliases help create reusable types.

type Team = {
  name: string;
  getSquad: () => string[];
  readonly price: number;
  isBanned: boolean;
};

// Example object using Team type
let csk: Team = {
  name: "Chenni Super Kings",
  getSquad() {
    return ["Thala"];
  },
  price: 500_000,
  isBanned: true,
};

// readonly → property cannot be modified


// -----------------------------
// 🔀 Union Types
// -----------------------------

// Union allows multiple possible types.
function kgToLbs(weight: number | string): number {
  // Narrowing
  if (typeof weight === "number") return weight * 2.2;

  return parseInt(weight) * 2.2;
}

// console.log(kgToLbs(1));

// console.log(kgToLbs("10kg"));


// -----------------------------
// ✂️ Type Narrowing
// -----------------------------

// Narrowing helps TypeScript determine
// the exact type at runtime.


// Example:

// typeof weight === "number"


// -----------------------------
// 🔗 Intersection Types
// -----------------------------

// Intersection combines multiple types.
type Male = {
  speak: () => void;
};

type Lion = {
  roar: () => void;
};

// Narasimha must have BOTH properties

type Narasimha = Male & Lion;

let lordNarasimha: Narasimha = {
  roar: () => {
    console.log("🦁 The universe trembles...");
  },
  speak: () => {
    console.log("Fear not, Prahlada. I am here.");
  },
};

// -----------------------------
// 🚦 Nullable Types
// -----------------------------

// Variables can explicitly allow:
// null or undefined

function greet(name: string | null | undefined) {
  if (name) {
    console.log(`Hello, ${name}`);
  }
  console.log("Hello");
}

greet(undefined);
greet(null);

// -----------------------------
// 🔗 Optional Chaining
// -----------------------------

type Customer = {
  birthday?: Date;
};

function getCustomer(id: number): Customer | null | undefined {
  return id === 0 ? null : id <= -1 ? undefined : {birthday: new Date()};
}

let customer = getCustomer(0);

// if (customer !== null && customer !== undefined) {
//   if (customer.birthday) {
//     console.log(customer.birthday.getFullYear());
//   } else console.log("better luck next time");
// } else {
//   console.log("no customer");
// }





// Traditional nested checking becomes messy


// Optional chaining makes it cleaner

let customer1 = getCustomer(1);
console.log(customer1?.birthday?.getFullYear());

// -----------------------------
// ❓ Nullish Coalescing Operator ??
// -----------------------------


// Using the Nullish Coalescing Operator we can fallback to a default value when dealing with null/undefined objects.

// ?? provides fallback value
// only for null or undefined.

let speed: number | null | undefined = null;

let ride = {
  // speed: (speed !== null || speed !== undefined) ? speed : 49,
  speed: speed ?? 49,
};

console.log(ride.speed); // 49

// Difference:
// || checks all falsy values
// ?? checks only null/undefined


// -----------------------------
// 🎯 Type Assertions
// -----------------------------

// Type assertions tell TypeScript
// the exact type of an element.

let phone = document.getElementById<HTMLInputElement>("phone");

// Now TypeScript knows this is an input element

let phoneNo = phone.value;

// -----------------------------
// 📦 Another Object Example
// -----------------------------

const mi: Team2 = {
  name: "Mumbai Indians",
  price: Infinity,
  isBanned: false, // Hell naa...
}




// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - Type aliases create reusable types
// - Union types allow multiple possible types
// - Narrowing helps identify exact type
// - Intersection types combine multiple types
// - Optional chaining prevents runtime errors
// - Nullish coalescing provides fallback values
// - Type assertions help DOM element typing
// - readonly properties cannot be modified