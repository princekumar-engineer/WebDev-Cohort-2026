// ⚙️ JS Functions — Quick Notes

// 🪄 Function declaration → hoisted (can call before definition)
console.log(brewPotion("Healing Herbs", 3));

function brewPotion(ingredient, dose) {
  return `Brewing potion with ${ingredient} (x${dose})... Potion ready`;
}

// 🧾 Function expression → not hoisted like declaration
const mixElixir = function (ingredient) {
  return `Mixing elexir with ${ingredient} `;
};

// ➡️ Arrow function → concise syntax
// ❗ No own 'this' and no 'arguments'
const distilEssence = (ingredient) => {
  return `Mixing elexir with ${ingredient} `;
};

// 📦 arguments object (available in regular functions only)
function oldBrewingLogs() {
  console.log("Type: ", typeof arguments);
  console.log("Is Array: ", Array.isArray(arguments));

  // Convert to real array
  const argsArray = Array.from(arguments);
  console.log(argsArray);
}

// oldBrewingLogs("Sage", "Rosemary");

// ⚠️ Arrow functions do NOT have arguments
const arrowBrew = () => {
  try {
    console.log(arguments);
  } catch (e) {
    console.log(e.message);
  }
};

// arrowBrew();

// 🌍 Global state example
let globalCount = 0;

function brewAndCount(name) {
  globalCount++; // side effect
}

// 🧠 Higher Order Function (HOF) → takes function as argument
function anotherFunctionForClass(brewAndCount) {
  return function newBrew() {
    // do something
  };
}

// 🔒 IIFE (Immediately Invoked Function Expression)
// Used for private scope
const potionShop = (function () {
  let inventory = 0; // private variable

  return {
    brew() {
      inventory++;
      return `Brew potion #${inventory}`;
    },
    getStock() {
      return inventory;
    },
  };
})();

console.log(potionShop);
console.log(potionShop.brew());

// ❗ inventory not accessible directly
console.log(potionShop.inventory);

// 🧩 Closure example
function makeFunc() {
  const name = "Mozilla";

  function displayName() {
    console.log(name); // remembers outer scope
  }

  return displayName;
}

const myFunc = makeFunc();
myFunc();

// 🧠 Key Takeaways:
// - Function declarations are hoisted
// - Arrow functions lack this and arguments
// - arguments exists only in normal functions
// - Closures retain outer variables
// - IIFE creates private state
// - HOFs enable functional patterns
// - Global state can cause side effects
