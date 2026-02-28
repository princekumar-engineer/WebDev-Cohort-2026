// 🤝 JS Promises — Quick Notes

// 🔴 CALLBACK VERSION (Callback Hell Example)

function prepareOrderCB(dish, cb) {
  setTimeout(() => cb(null, { dish, status: "prepared" }), 100);
}

function pickupOrderCB(order, cb) {
  setTimeout(() => cb(null, { ...order, status: "picked-up" }), 100);
}

function deliverOrderCB(order, cb) {
  setTimeout(() => cb(null, { ...order, status: "delivered" }), 100);
}

// ⚠️ Nested callbacks → hard to read & maintain
prepareOrderCB("Biryani", (err, order) => {
  if (err) return console.log(err);

  pickupOrderCB(order, (err, order) => {
    if (err) return console.log(err);

    deliverOrderCB(order, (err, order) => {
      if (err) return console.log(err);

      console.log(`${order.dish}: ${order.status}`);
    });
  });
});

// 🟢 PROMISE VERSION (Cleaner & Chainable)

function prepareOrder(dish) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!dish) {
        reject(new Error("No dish is there"));
        return;
      }

      console.log(`${dish} is ready`);
      resolve({ dish, status: "prepared" });
    }, 100);
  });
}

function pickupOrder(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!order) {
        reject(new Error("No order found"));
        return;
      }

      console.log(`${order.dish} picked`);
      resolve({ ...order, status: "picked-up" });
    }, 100);
  });
}

function deliverOrder(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!order) {
        reject(new Error("No order found"));
        return;
      }

      console.log(`${order.dish} delivered`);
      resolve({ ...order, status: "delivered" });
    }, 100);
  });
}

// 🔗 Promise chaining
prepareOrder("Panner Tikka")
  .then(order => pickupOrder(order))   // return next promise
  .then(order => deliverOrder(order))  // chain continues
  .then(order => console.log(`${order.dish}: ${order.status}`))
  .catch(err => console.log(err.message)); // handles any error

// 🧠 Key Takeaways:
// - Callback style → leads to callback hell
// - Promise represents future value
// - resolve → success
// - reject → failure
// - .then() handles success
// - .catch() handles errors
// - Always return promise inside .then()
// - Errors bubble down to nearest catch