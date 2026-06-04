// 🧬 JS Prototypes + Polyfills — Quick Notes

// 👴 Base object (acts like prototype)
const prithviraj = {
  name: "Prithviraj",
  generation: "grandfather",

  cookTraditionalDish() {
    return `${this.name} cooks an ancient family recipe`;
  },
};

// 🔗 Object.create → sets prototype link
const raj = Object.create(prithviraj);

raj.name = "raj";
raj.generation = "father";

raj.runBusiness = function () {
  return `${this.name} runs the family business`;
};

const ranbir = Object.create(raj);

ranbir.name = "ranbir";
ranbir.generation = "son";

ranbir.makeFilm = function () {
  return `${this.name} directs blockbuster movies`;
};

// 🧠 Prototype lookup chain
console.log(ranbir.makeFilm());
console.log(ranbir.runBusiness());
console.log(ranbir.cookTraditionalDish());

// 🧩 Extending built-in prototypes (educational only — risky in production)
Array.prototype.last = function () {
  return this[this.length - 1];
};

console.log([1, 2, 3].last());

// 🪄 What is a Polyfill?
// 👉 A polyfill is code that adds missing functionality
// 👉 Used when older environments don’t support a feature

// Example polyfill for Array.last (safe check first)
if (!Array.prototype.last) {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
}

// 🧠 Why check first?
// To avoid overwriting native implementation

// Example polyfill idea (simplified)
if (!Array.prototype.mapTwo) {
  Array.prototype.mapTwo = function (callback) {
    const result = [];

    for (let i = 0; i < this.length; i++) {
      result.push(callback(this[i], i, this));
    }

    return result;
  };
}

// Usage
console.log([1, 2, 3].mapTwo(x => x * 2));

// ⚠️ Important:
// Never blindly modify global prototypes in real projects
// Use libraries or scoped helpers instead

// 🧠 Key Takeaways:
// - Prototype allows shared behavior
// - Polyfills add missing features
// - Always feature-detect before polyfilling
// - Built-in extensions can cause conflicts
// - Modern JS rarely needs manual polyfills