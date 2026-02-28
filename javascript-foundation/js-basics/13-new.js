// 🚗 JS "new" Keyword — Quick Notes

// 🏗️ Constructor function → used with new
function TataCar(chassisNumber, modelName) {
  // this → new object being created
  this.chassisNumber = chassisNumber;
  this.modelName = modelName;
  this.fuelLevel = 100;
}

// 🧬 Prototype method → shared across instances
TataCar.prototype.status = function () {
  return `Tata ${this.modelName} #${this.chassisNumber} | Fuel: ${this.fuelLevel}`;
};

// 🆕 new does:
// 1️⃣ Creates empty object
// 2️⃣ Links prototype
// 3️⃣ Binds this
// 4️⃣ Returns object
const car1 = new TataCar("MH-101", "Nexon");
const car2 = new TataCar("DL-202", "Harrier");

console.log(car1.modelName);
console.log(car2.modelName);

// ✅ Shared method from prototype
console.log(car1.status());
console.log(car2.status());

// ⚠️ Factory function (not using new)
function createAutoRickshaw(id, route) {
  return {
    id,
    route,
    run() {
      return `Auto ${this.id} running on ${this.route}`;
    },
  };
}

// 🧠 Each call creates new object with own methods
const auto1 = createAutoRickshaw("UP-1", "Lucknow-kanpu");
const auto2 = createAutoRickshaw("UP-2", "Agra-Mathura");

console.log(auto1.run());
console.log(auto2.run());

// 🧠 Key Takeaways:
// - new creates instance from constructor
// - Prototype methods are memory efficient
// - this refers to new object
// - Factory functions return objects directly
// - Constructor + prototype preferred for many instances
// - Factory pattern simpler but duplicates methods