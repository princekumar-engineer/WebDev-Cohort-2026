/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing element inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */
export function setupGuestList(containerElement) {
  // Validation
  if (!containerElement) {
    return null;
  }

  // Event delegation
  containerElement.addEventListener(
    "click",
    (event) => {
      const removeBtn =
        event.target.closest(".remove-btn");

      if (!removeBtn) {
        return;
      }

      const guestItem =
        removeBtn.closest(".guest-item");

      if (guestItem) {
        guestItem.remove();
      }
    }
  );

  return {
    addGuest(name, side) {
      const guestItem =
        document.createElement("div");

      guestItem.classList.add("guest-item");

      guestItem.dataset.name = name;
      guestItem.dataset.side = side;

      const span =
        document.createElement("span");

      span.textContent = name;

      const button =
        document.createElement("button");

      button.classList.add("remove-btn");
      button.textContent = "Remove";

      guestItem.appendChild(span);
      guestItem.appendChild(button);

      containerElement.appendChild(guestItem);

      return guestItem;
    },

    removeGuest(name) {
      const guest = containerElement.querySelector(
        `.guest-item[data-name="${name}"]`
      );

      if (!guest) {
        return false;
      }

      guest.remove();

      return true;
    },

    getGuests() {
      return Array.from(
        containerElement.querySelectorAll(
          ".guest-item"
        )
      ).map((guest) => ({
        name: guest.dataset.name,
        side: guest.dataset.side,
      }));
    },
  };
}

export function setupThemeSelector(
  containerElement,
  previewElement
) {
  // Validation
  if (!containerElement || !previewElement) {
    return null;
  }

  const themes = [
    "traditional",
    "modern",
    "royal",
  ];

  // Create buttons
  themes.forEach((theme) => {
    const button =
      document.createElement("button");

    button.classList.add("theme-btn");

    button.textContent = theme;

    button.dataset.theme = theme;

    containerElement.appendChild(button);
  });

  // Event delegation
  containerElement.addEventListener(
    "click",
    (event) => {
      const button =
        event.target.closest(".theme-btn");

      if (!button) {
        return;
      }

      const theme = button.dataset.theme;

      previewElement.className = theme;

      previewElement.dataset.theme = theme;
    }
  );

  return {
    getTheme() {
      return (
        previewElement.dataset.theme || null
      );
    },
  };
}

export function setupCardEditor(cardElement) {
  // Validation
  if (!cardElement) {
    return null;
  }

  // Helper
  function clearEditing() {
    const editingElement =
      cardElement.querySelector(".editing");

    if (editingElement) {
      editingElement.classList.remove(
        "editing"
      );

      editingElement.contentEditable =
        "false";
    }
  }

  // Event delegation
  cardElement.addEventListener(
    "click",
    (event) => {
      const editable =
        event.target.closest(
          "[data-editable]"
        );

      // Clicked editable field
      if (editable) {
        clearEditing();

        editable.contentEditable = "true";

        editable.classList.add("editing");

        return;
      }

      // Clicked card itself
      if (event.target === cardElement) {
        clearEditing();
      }
    }
  );

  return {
    getContent(field) {
      const element =
        cardElement.querySelector(
          `[data-editable="${field}"]`
        );

      if (!element) {
        return null;
      }

      return element.textContent;
    },
  };
}