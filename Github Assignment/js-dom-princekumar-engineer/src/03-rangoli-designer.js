/**
 * 🎨 Rangoli Designer - classList: add, remove, toggle, contains
 *
 * Diwali ke liye rangoli design app bana rahe hain! Har cell ka color
 * aur pattern classes se control hota hai. classList API use karke
 * colors add karo, remove karo, toggle karo, check karo ki design
 * lagaya hai ya nahi. Jaise rangoli mein ek ek rang bharte hain,
 * waise hi classes se elements ko style karo.
 *
 * Functions:
 *
 *   1. addColors(element, ...colors)
 *      - Adds each color as a CSS class to the element
 *      - Returns number of NEW classes actually added (skip duplicates
 *        that were already present on the element)
 *      - Agar element null/undefined, return -1
 *      - Each color is added as-is (e.g., "red" adds class "red")
 *
 *   2. removeColors(element, ...colors)
 *      - Removes each color class from the element
 *      - Returns number of classes actually removed (only count those
 *        that were present before removal)
 *      - Agar element null/undefined, return -1
 *
 *   3. togglePattern(element, pattern)
 *      - Toggles the class "pattern-{pattern}" on the element
 *        (e.g., pattern="floral" toggles class "pattern-floral")
 *      - Returns true if the class is NOW present after toggle
 *      - Returns false if the class was removed by toggle
 *      - Agar element null/undefined, return null
 *
 *   4. hasDesign(element, designName)
 *      - Returns true if element has class "design-{designName}"
 *        (e.g., designName="peacock" checks for class "design-peacock")
 *      - Returns false if class not present
 *      - Agar element null/undefined, return false
 *
 *   5. replaceDesign(element, oldDesign, newDesign)
 *      - Removes class "design-{oldDesign}" and adds "design-{newDesign}"
 *      - Returns true if oldDesign class was present and replaced
 *      - Returns false if oldDesign class was NOT found (newDesign still added)
 *      - Agar element null/undefined, return false
 *
 *   6. getActiveColors(element)
 *      - Returns array of all active color names from classes
 *      - Only classes starting with "color-" are considered
 *      - Return just the color name part (e.g., class "color-red" => "red")
 *      - Empty array if no color classes found
 *      - Agar element null/undefined, return []
 *
 * Hint: classList.add(), classList.remove(), classList.toggle(),
 *   classList.contains() use karo. classList is like an array of class names.
 *
 * @example
 *   const cell = document.createElement("div");
 *   addColors(cell, "red", "blue", "red");
 *   // => 2 (red and blue added, second red was duplicate)
 *
 *   removeColors(cell, "red", "green");
 *   // => 1 (red removed, green wasn't there)
 *
 *   togglePattern(cell, "floral");
 *   // => true (class "pattern-floral" added)
 *
 *   hasDesign(cell, "peacock");
 *   // => false (no "design-peacock" class)
 *
 *   cell.classList.add("color-red", "color-blue", "other");
 *   getActiveColors(cell);
 *   // => ["red", "blue"]
 */
export function addColors(element, ...colors) {
  // Validation
  if (!element) {
    return -1;
  }

  let addedCount = 0;

  for (const color of colors) {
    if (!element.classList.contains(color)) {
      element.classList.add(color);
      addedCount++;
    }
  }

  return addedCount;
}

export function removeColors(element, ...colors) {
  // Validation
  if (!element) {
    return -1;
  }

  let removedCount = 0;

  for (const color of colors) {
    if (element.classList.contains(color)) {
      element.classList.remove(color);
      removedCount++;
    }
  }

  return removedCount;
}

export function togglePattern(element, pattern) {
  // Validation
  if (!element) {
    return null;
  }

  const className = `pattern-${pattern}`;

  return element.classList.toggle(className);
}

export function hasDesign(element, designName) {
  // Validation
  if (!element) {
    return false;
  }

  return element.classList.contains(
    `design-${designName}`
  );
}

export function replaceDesign(
  element,
  oldDesign,
  newDesign
) {
  // Validation
  if (!element) {
    return false;
  }

  const oldClass = `design-${oldDesign}`;
  const newClass = `design-${newDesign}`;

  const hadOldDesign =
    element.classList.contains(oldClass);

  // Replace
  element.classList.remove(oldClass);
  element.classList.add(newClass);

  return hadOldDesign;
}

export function getActiveColors(element) {
  // Validation
  if (!element) {
    return [];
  }

  return Array.from(element.classList)
    .filter((className) =>
      className.startsWith("color-")
    )
    .map((className) =>
      className.replace("color-", "")
    );
}