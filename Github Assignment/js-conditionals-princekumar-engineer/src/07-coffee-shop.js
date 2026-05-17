/**
 * ☕ Bean & Brew Cafe
 *
 * Bean & Brew, the cozy neighborhood cafe, wants to go digital! They
 * need a system that calculates the total price of a coffee order.
 * Here's their menu:
 *
 * Base price by size:
 *   - "small"  → $3.00
 *   - "medium" → $4.00
 *   - "large"  → $5.00
 *
 * Add-on for coffee type:
 *   - "regular"    → +$0.00
 *   - "latte"      → +$1.00
 *   - "cappuccino" → +$1.50
 *   - "mocha"      → +$2.00
 *
 * Optional extras:
 *   - whippedCream → +$0.50 (if true)
 *   - extraShot    → +$0.75 (if true)
 *
 * Rules:
 *   - If size is not "small", "medium", or "large", return -1
 *   - If type is not "regular", "latte", "cappuccino", or "mocha", return -1
 *   - Return the total price rounded to 2 decimal places
 *
 * @param {string} size - "small", "medium", or "large"
 * @param {string} type - "regular", "latte", "cappuccino", or "mocha"
 * @param {{ whippedCream?: boolean, extraShot?: boolean }} extras - Optional extras
 * @returns {number} Total price or -1 for invalid input
 */
export function calculateCoffeePrice(size, type, extras = {}) {
  // Your code here
    //1. Safety Check

    if (typeof size != "string" || typeof type != "string" ) {
      return -1;
    }

    if (size !== "small" && size !== "medium" && size !== "large") { 
      return -1; 
    }

    if (
    type !== "regular" &&
    type !== "latte" &&
    type !== "cappuccino" &&
    type !== "mocha") {
    return -1;
  }

  let totalPrice = 0;

  //2. Base price by size:
    if (size === "small") {
      totalPrice = 3.00;
  }else if (size === "medium") {
      totalPrice = 4.00;
  }else if (size === "large") {
      totalPrice = 5.00;
  }

  //3. Add-on for coffee type
    if (type === "regular") {
    totalPrice += 0.00;
  }else if (type === "latte") {
    totalPrice += 1.00;
  }else if (type === "cappuccino") {
    totalPrice += 1.50;
  }else if (type === "mocha") {
    totalPrice += 2.00;
  }

  //4. Optional extras
  if (extras.whippedCream === true) {
    totalPrice += 0.5;
  }

  if (extras.extraShot === true) {
    totalPrice += 0.75;
  }

  // 5. Return rounded total
  return Number(totalPrice.toFixed(2));
}

