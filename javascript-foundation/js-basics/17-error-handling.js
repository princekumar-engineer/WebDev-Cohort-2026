// 🚨 JS Error Handling — Quick Notes

function bootNavigation(mapLoaded) {
  try {
    // 🧪 Code that might fail goes inside try block
    console.log(`Is Navigation loaded: ${mapLoaded}`);

    // ❗ Manually throwing error
    if (!mapLoaded) {
      throw new Error("Map was not passed in this function");
    }

    // ✅ If no error → return success
    return "NAV_OK";

  } catch (error) {
    // 🛑 catch runs only if error occurs
    console.log(error); // full error object
    console.log(`Navigation Failed: ${error.message}`); // readable message

  } finally {
    // 🔄 finally always runs (success or error)
    console.log("Navigation sequence completed");
  }
}

const status1 = bootNavigation(true);
console.log(`Result: ${status1}`);

// 🧠 Key Takeaways:
// - try → wrap risky code
// - throw → create custom error
// - catch → handle error gracefully
// - finally → cleanup logic (always runs)
// - Error object has message, name, stack
// - If error is caught but not rethrown, function returns undefined