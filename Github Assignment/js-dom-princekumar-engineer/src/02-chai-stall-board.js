/**
 * 🍵 Chai Stall Board - getElementById, querySelector, textContent
 *
 * Sharma ji ki chai stall hai station ke bahar. Unka rate board update
 * karna hai digitally. Cutting chai, masala chai, adrak chai - sabki
 * price dynamically change hoti rehti hai. getElementById se specific
 * chai ka price element dhundho, querySelector se stall ka naam dhundho,
 * aur textContent se values read/write karo.
 *
 * DOM Structure expected:
 *   <div class="chai-stall">
 *     <h1 class="stall-name">Sharma Chai Wala</h1>
 *     <div class="price-board">
 *       <p id="price-masala" class="chai-price" data-chai="masala">₹15</p>
 *       <p id="price-cutting" class="chai-price" data-chai="cutting">₹10</p>
 *       <p id="price-adrak" class="chai-price" data-chai="adrak">₹20</p>
 *     </div>
 *   </div>
 *
 * Functions:
 *
 *   1. updateChaiPrice(document, chaiType, newPrice)
 *      - Finds element with id "price-{chaiType}" using getElementById
 *      - Sets its textContent to "₹{newPrice}"
 *      - Returns true if element found and updated, false if not found
 *      - Validation: newPrice must be a number > 0, else return false
 *      - chaiType must be a non-empty string, else return false
 *
 *   2. getChaiPrice(document, chaiType)
 *      - Finds element with id "price-{chaiType}"
 *      - Reads textContent, removes "₹" prefix, parses to number
 *      - Returns the number price
 *      - Agar element not found, return null
 *
 *   3. updateStallName(document, newName)
 *      - Finds ".stall-name" element using querySelector
 *      - Saves old textContent, updates to newName
 *      - Returns old name string
 *      - Agar element not found, return null
 *      - Agar newName not string or empty, return null
 *
 *   4. highlightCheapestChai(document)
 *      - Finds all ".chai-price" elements using querySelectorAll
 *      - Parses each price (remove ₹, parse to number)
 *      - Adds class "cheapest" to the element with lowest price
 *      - Removes class "cheapest" from all other chai-price elements
 *      - Returns the data-chai attribute value of cheapest chai
 *      - Agar no chai-price elements found, return null
 *
 * Hint: document.getElementById("id") se specific element dhundho,
 *   document.querySelector(".class") se first matching element,
 *   document.querySelectorAll(".class") se saare matching elements.
 *
 * @example
 *   updateChaiPrice(document, "masala", 20);
 *   // => true (element with id "price-masala" now shows "₹20")
 *
 *   getChaiPrice(document, "masala");
 *   // => 20
 *
 *   updateStallName(document, "Sharma Premium Chai");
 *   // => "Sharma Chai Wala" (old name returned)
 *
 *   highlightCheapestChai(document);
 *   // => "cutting" (cheapest chai gets "cheapest" class)
 */
export function updateChaiPrice(document, chaiType, newPrice) {
  // Validation
  if (
    typeof chaiType !== "string" ||
    chaiType.trim() === "" ||
    typeof newPrice !== "number" ||
    newPrice <= 0
  ) {
    return false;
  }

  // Find element
  const element = document.getElementById(`price-${chaiType}`);

  if (!element) {
    return false;
  }

  // Update price
  element.textContent = `₹${newPrice}`;

  return true;
}

export function getChaiPrice(document, chaiType) {
  // Find element
  const element = document.getElementById(`price-${chaiType}`);

  if (!element) {
    return null;
  }

  // Read and parse price
  const priceText = element.textContent.replace("₹", "");

  return Number(priceText);
}

export function updateStallName(document, newName) {
  // Validation
  if (
    typeof newName !== "string" ||
    newName.trim() === ""
  ) {
    return null;
  }

  // Find element
  const stallNameElement =
    document.querySelector(".stall-name");

  if (!stallNameElement) {
    return null;
  }

  // Save old name
  const oldName = stallNameElement.textContent;

  // Update name
  stallNameElement.textContent = newName;

  return oldName;
}

export function highlightCheapestChai(document) {
  // Find all chai prices
  const chaiElements =
    document.querySelectorAll(".chai-price");

  if (chaiElements.length === 0) {
    return null;
  }

  let cheapestElement = null;
  let cheapestPrice = Infinity;

  // Find cheapest
  chaiElements.forEach((element) => {
    const price = Number(
      element.textContent.replace("₹", "")
    );

    // Remove old class
    element.classList.remove("cheapest");

    if (price < cheapestPrice) {
      cheapestPrice = price;
      cheapestElement = element;
    }
  });

  // Add cheapest class
  cheapestElement.classList.add("cheapest");

  // Return chai type
  return cheapestElement.dataset.chai;
}