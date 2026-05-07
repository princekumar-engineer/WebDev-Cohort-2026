// 🔷 TypeScript Basics — Quick Notes


// -----------------------------
// 🧠 What is TypeScript?
// -----------------------------

// TypeScript is JavaScript with types.

// It helps:
// ✅ catch errors early
// ✅ improve autocomplete
// ✅ make code easier to maintain

// TypeScript eventually compiles into JavaScript.


// -----------------------------
// 🔢 Primitive Types
// -----------------------------

let sales: number = 123_456_789;
let largeNumber: bigint = 9007199254740991n;
let course: string = "Total TypeScript";
let is_published: boolean = true;
let name: undefined = undefined;
let sym: symbol = Symbol();


// -----------------------------
// ⚠️ any Type
// -----------------------------

// any disables type checking.

// any type noImplecitAny
let naam: any;
// Avoid using "any" whenever possible,
// because TypeScript loses safety.


// -----------------------------
// 🔒 unknown Type
// -----------------------------

// unknown is the type-safe version of any.

// We must narrow the type before using it.
function render(document: unknown) {
  if (typeof document === "string") {
    //...
    console.log(document);
  }
  if (typeof document === "string" && document.endsWith(".jgp")) {
    //...
    // show img
  }
}

// -----------------------------
// 🚫 never Type
// -----------------------------

// never represents values that never occur.

// Usually used for:
// - throwing errors
// - infinite loops

// function propose(message: string):never {
//   throw new Error("Tumhara taste achha hai, par meri choice itni buri nahi.");
// }

// propose("....")


// -----------------------------
// 📚 Enums
// -----------------------------

// Enums represent related constants.

const enum TeamStrength {
  Weak = 1,
  Good,
  Strong,
}

let yellow = TeamStrength.Weak;
console.log(yellow);

// -----------------------------
// 📦 Arrays
// -----------------------------

let numbers: number[] = [1, 2, 3];
let names: string[] = ["Keshva", "Madhav", "Damodar", "Shyamsundar"];

// -----------------------------
// 🧩 Tuples
// -----------------------------

// Tuple = fixed-length array
// with predefined types.

let album: [string, number, string] = ["Mantra", 2025, "Radhika Das"];

// -----------------------------
// 📄 Objects
// -----------------------------

let mentor: {
  id: number;
  name: string;
  age: number;
  teaches: (sub: string[]) => void;
  address?: {
    street: string;
    pin: number;
  };
} = {
  id: 4,
  name: "Anirudha",
  age: 28,
  teaches: (sub: string[]) => {
    console.log(`${mentor.name} teaches: ${sub.join(", ")}`);
  },
};

// -----------------------------
// ⚙️ Functions
// -----------------------------

function calculatePrice(team: string): number {
  if (team.toLowerCase() === "rr")
    return 15e10; //15,000 Cr

  if (team.toLowerCase() === "rcb")
    return 18e10; //18,000 Cr

  if (team.toLowerCase() === "csk")
    return 500_000; // 5 L
    
  return NaN;
}

// -----------------------------
// 🧠 Type Inference
// -----------------------------

// TypeScript can automatically infer types.

let guestTheType = {
  id: 4,
  name: "Anirudha",
  age: 28,
  teaches: (sub: string[]) => {
    console.log(`${mentor.name} teaches: ${sub.join(", ")}`);
  }
};

/* Even though they aren't annotated, TypeScript is still picking up the type that they're each supposed to be. This is TypeScript inferring the type of the variable from usage.

This is an extremely powerful part of TypeScript. It means that you can mostly *not* annotate variables and still have your IDE know what type things are.*/





// Even without explicit annotations,
// TypeScript understands the types automatically.


// -----------------------------
// ✨ Why Type Inference is Powerful
// -----------------------------

// It reduces unnecessary type annotations
// while still giving:

// ✅ autocomplete
// ✅ error checking
// ✅ IDE support


// -----------------------------
// 🧠 Key Takeaways
// -----------------------------

// - TypeScript adds types to JavaScript
// - Primitive types improve safety
// - unknown is safer than any
// - never represents impossible values
// - Arrays and tuples support typed collections
// - Objects can define strict structures
// - Functions can define parameter & return types
// - Type inference makes TS very powerful