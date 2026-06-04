// 📞 call / apply / bind — Quick Notes

// 🧠 call & apply → invoke function with custom this
// 🔗 bind → returns a new function with fixed this

function cookDish(ingredient, style) {
  return `${this.name} prepares ${ingredient} in ${style} style !`;
}

// ⚠️ No context → this is undefined/global
console.log(cookDish());

const sharmaKitchen = { name: "Sharma jis Kitchen" };
const guptaKitchen = { name: "Gupta jis Kitchen" };

// 📞 call → arguments passed individually
console.log(cookDish.call(sharmaKitchen, "Paneer and spices", "Muglai"));

// 📦 apply → arguments passed as array
const guptaOrder = ["Chole kulche", "Punjabi Dhaba"];
console.log(cookDish.apply(guptaKitchen, guptaOrder));

// 🧮 Using apply with Math functions
const bills = [100, 30, 45, 50];

// Old pattern
Math.max.apply(null, bills);

// Modern ES6 spread
Math.max(...bills);

// 📦 Another example
function reportDelivery(location, status) {
  return `${this.name} at ${location}: ${status}`;
}

const deliveryBoy = { name: "Ranveer" };

// 📞 call → execute immediately
console.log("Call: ", reportDelivery.call(deliveryBoy, "Lyari", "Ordered"));

// 📦 apply → execute with array args
console.log("Apply: ", reportDelivery.apply(deliveryBoy, ["Mars", "Pick up"]));

// 🔗 bind → returns function (does NOT execute)
console.log("Bind: ", reportDelivery.bind(deliveryBoy, "Haridwar", "WHAT"));

// ✅ Call later
const bindReport = reportDelivery.bind(deliveryBoy);
console.log(bindReport("Haridwar", "WHAT"));

// 🧠 Key Takeaways:
// - call → immediate, args separated
// - apply → immediate, args array
// - bind → returns new function
// - All three set this explicitly
// - Spread operator replaces many apply uses
// - bind useful for callbacks and event handlers