/**
 * 🛵 Zomato Delivery Pipeline - Promise Chaining: .then/.catch
 *
 * Zomato ki delivery pipeline banana hai jahan order placement se lekar
 * delivery tak sab kuch Promise chaining se hoga. Har step ek Promise
 * return karta hai aur .then() se next step chain hota hai. Agar koi
 * step fail ho toh .catch() se error handle karo.
 *
 * Pipeline: placeOrder -> confirmOrder -> assignRider -> deliverOrder
 *
 * Rider Names Pool: ["Rahul", "Priya", "Amit", "Neha", "Vikram"]
 *
 * Function: placeOrder(restaurant, items)
 *   - Returns a new Promise
 *   - Validates: restaurant must be non-empty string, items must be non-empty array
 *   - If invalid: reject with Error "Invalid order details!"
 *   - If valid: resolve (with small delay ~50ms) with:
 *     { orderId: Math.floor(Math.random() * 10000),
 *       restaurant, items, status: "placed",
 *       timestamp: new Date().toISOString() }
 *
 * Function: confirmOrder(order)
 *   - Returns a new Promise
 *   - Validates: order must have orderId and status === "placed"
 *   - If invalid: reject with Error "Order cannot be confirmed!"
 *   - If valid: resolve with { ...order, status: "confirmed", estimatedTime: 30 }
 *
 * Function: assignRider(order)
 *   - Returns a new Promise
 *   - Validates: order must have status === "confirmed"
 *   - If invalid: reject with Error "Order not confirmed yet!"
 *   - If valid: pick a random rider from the pool
 *   - Resolve with { ...order, rider: selectedRider, status: "assigned" }
 *
 * Function: deliverOrder(order)
 *   - Returns a new Promise
 *   - Validates: order must have status === "assigned" and a rider
 *   - If invalid: reject with Error "No rider assigned!"
 *   - If valid: resolve with { ...order, status: "delivered",
 *     deliveredAt: new Date().toISOString() }
 *
 * Function: processDelivery(restaurant, items)
 *   - Chains the full pipeline using .then():
 *     placeOrder(restaurant, items)
 *       .then(order => confirmOrder(order))
 *       .then(order => assignRider(order))
 *       .then(order => deliverOrder(order))
 *       .catch(error => ({ error: error.message, status: "failed" }))
 *   - Returns the Promise chain
 *   - On success: final delivered order object
 *   - On failure: { error: message, status: "failed" }
 *
 * Function: processMultipleOrders(orderList)
 *   - Takes array of { restaurant, items } objects
 *   - Processes EACH with processDelivery
 *   - Uses Promise.allSettled to handle all orders
 *   - Returns Promise resolving with array of results
 *   - Each result: { status: "fulfilled", value } or { status: "rejected", reason }
 *
 * Rules:
 *   - Each function returns a new Promise
 *   - Use .then() for chaining, NOT async/await
 *   - processDelivery must use .catch() for error handling
 *   - Order flows through a strict pipeline: placed -> confirmed -> assigned -> delivered
 *   - Each step validates the previous step's status
 *   - Random rider selection from the given pool
 *   - processMultipleOrders processes all orders regardless of individual failures
 *
 * @example
 *   placeOrder("Biryani House", ["biryani", "raita"])
 *     .then(order => console.log(order));
 *   // => { orderId: 4523, restaurant: "Biryani House", items: [...], status: "placed", ... }
 *
 * @example
 *   const result = await processDelivery("Pizza Palace", ["pizza"]);
 *   // => { orderId: 1234, restaurant: "Pizza Palace", items: ["pizza"],
 *   //      status: "delivered", rider: "Priya", deliveredAt: "...", ... }
 *
 * @example
 *   const results = await processMultipleOrders([
 *     { restaurant: "Dosa Corner", items: ["dosa"] },
 *     { restaurant: "", items: [] }  // invalid
 *   ]);
 *   // => [ { status: "fulfilled", value: { ...delivered order } },
 *   //      { status: "fulfilled", value: { error: "Invalid order details!", status: "failed" } } ]
 */

const riders = [
  "Rahul",
  "Priya",
  "Amit",
  "Neha",
  "Vikram"
];

export function placeOrder(restaurant, items) {
  return new Promise((resolve, reject) => {
    const validRestaurant = typeof restaurant === "string" && restaurant.trim() !== "";
    
    const validItems = Array.isArray(items) && items.length > 0;

    if (!validRestaurant || !validItems) {
      reject(
        new Error("Invalid order details!")
      );
      return;
    }

    setTimeout(()=>{
      resolve({
        orderId: Math.floor(Math.random() * 10000),
        restaurant,
        items,
        status: "placed",
        timestamp: new Date().toISOString()        
      });
    }, 50);
  });
}

export function confirmOrder(order) {
  return new Promise((resolve, reject) => {
    if (
      !order ||
      !order.orderId ||
      order.status !== "placed"
    ) {
      reject(
        new Error(
          "Order cannot be confirmed!"
        )
      );
      return;
    }

    resolve({
      ...order,
      status: "confirmed",
      estimatedTime: 30
    })
  })
}

export function assignRider(order) {
  return new Promise((resolve, reject) => {
    if (
      !order ||
      order.status !== "confirmed"
    ) {
      reject(
        new Error(
          "Order not confirmed yet!"          
        )
      );
      return;      
    }

      const randomIndex = Math.floor(
        Math.random() * riders.length
      );
    const selectedRider =
      riders[randomIndex];

    resolve({
      ...order,
      rider: selectedRider,
      status: "assigned"
    });      
  });
}

export function deliverOrder(order) {
  return new Promise((resolve, reject) => {
    if (
      !order ||
      order.status !== "assigned" ||
      !order.rider
    ) {
      reject(
        new Error("No rider assigned!")
      );
      return;
    }

    resolve({
      ...order,
      status: "delivered",
      deliveredAt: new Date().toISOString()
    });
  });
}

export function processDelivery(
  restaurant, items
) {
  return placeOrder(restaurant, items)
  .then(order => confirmOrder(order))
  .then(order => assignRider(order))
  .then(order => deliverOrder(order))
  .catch( error =>({
    error: error.message,
    status: "failed"
  }))
}

export function processMultipleOrders(
  orderList
) {
  const promises = orderList.map(order => processDelivery(
      order.restaurant,
      order.items    
  )
);

  return Promise.allSettled(promises);

}
