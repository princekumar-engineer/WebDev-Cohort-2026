// 🍽️ Array Methods — Quick Notes

// 📦 Array of objects (real world data structure)
const orders = [
  { dish: "Pasta Carbonara", price: 14, spicy: false, qty: 2 },
  { dish: "Dragon Ramen", price: 12, spicy: true, qty: 1 },
  { dish: "Caesar Salad", price: 9, spicy: false, qty: 3 },
  { dish: "Inferno Wings", price: 11, spicy: true, qty: 2 },
  { dish: "Truffle Risotto", price: 18, spicy: false, qty: 1 },
];

// 🔁 forEach → iterate, returns undefined (side effects only)
const myData = orders.forEach((order, index) => {
  console.log(`  #${index + 1} : ${order.qty}x ${order.dish}`);
});

// console.log(myData); // undefined

// 🗺️ map → transform array, returns new array
const receiptLines = orders.map((o) => `${o.dish}: $${o.price * o.qty}`);
console.log(receiptLines);

// 🔍 filter → select items based on condition
const spicyOrders = orders.filter((o) => o.spicy);
console.log(spicyOrders);

// 🧮 reduce → accumulate values (sum, grouping, etc.)
const totalRevenue = orders.reduce((sum, order) => {
  return sum + order.qty * order.price;
}, 0);

console.log(totalRevenue);

// 📊 reduce for grouping data
const grouped = orders.reduce(
  (acc, order) => {
    const category = order.spicy ? "spicy" : "mild";

    acc[category].push(order.dish);
    return acc;
  },
  { spicy: [], mild: [] },
);

console.log(grouped);

// 🔢 sort → sorts array (mutates original)
const ticketNumbers = [100, 25, 3, 42, 8];

// ✅ Copy before sort to avoid mutation
const sortedW = [...ticketNumbers].sort((a, b) => a - b);
console.log(sortedW);

// 🍳 Another dataset
const kitchenOrders = [
  { dish: "Pasta Carbonara", price: 14, spicy: false, qty: 2 },
  { dish: "Dragon Ramen", price: 12, spicy: true, qty: 1 },
  { dish: "Caesar Salad", price: 9, spicy: false, qty: 3 },
  { dish: "Inferno Wings", price: 11, spicy: true, qty: 2 },
  { dish: "Truffle Risotto", price: 18, spicy: false, qty: 1 },
  { dish: "Ghost Pepper Soup", price: 15, spicy: true, qty: 1 },
];

// ⚠️ This line looks like pseudo-code / invalid JS
// data | (v1=true, v2=false, v3=true)

// 🔗 Method chaining → powerful pattern
const mildReport = kitchenOrders
  .filter((order) => !order.spicy) // select mild
  .map((order) => ({
    dish: order.dish,
    total: order.price * order.qty,
  }))
  .toSorted(); // non-mutating sort (modern JS)

// 🧠 Key Takeaways:
// - forEach → side effects only
// - map → transform data
// - filter → select data
// - reduce → powerful aggregator
// - sort mutates → copy first
// - chaining improves readability
// - toSorted is non-mutating alternative
