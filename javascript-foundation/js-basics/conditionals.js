// 🧭 JS Conditionals — Quick Notes

// 🧠 Boolean conditions with logical operators
const playerHealth = 75;
const hasShield = true;
const hasSword = false;

// ✅ AND (&&) → both conditions must be true
if (playerHealth <= 30 && hasShield) {
  // critical state with protection
}

// 👤 Auth example
const isLoggedIn = true;
const hasCourseAccess = false;

// ✅ OR (||) → at least one condition true
if (isLoggedIn || hasCourseAccess) {
  // allow to watch videos
}

const courseLauched = true;

// 🗺️ switch → multiple branch control flow
const chosenPath = "left";

switch (chosenPath) {
  case "right":
    console.log("User selected right");
    break; // prevents fallthrough

  case "top":
    console.log("User selected top");
    break;

  case "left":
    console.log("User selected top"); // ⚠️ probably typo
    break;

  default:
    // fallback case
    "Jiska koi nhi hota, uska defaul hota h";
}

// 🧠 Key Takeaways:
// - && requires all conditions true
// - || requires any condition true
// - if statements handle dynamic logic
// - switch is useful for multiple fixed values
// - break prevents accidental fallthrough
// - always handle default case
// - watch for typos in cases
