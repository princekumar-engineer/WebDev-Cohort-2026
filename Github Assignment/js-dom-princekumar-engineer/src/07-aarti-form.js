/**
 * 🙏 Aarti Form - Form Handling, preventDefault & Validation
 *
 * Mandir ki aarti booking form bana rahe hain! Bhakton ka naam, aarti type,
 * aur date validate karke submit karna hai. Form submit hone pe page reload
 * nahi hona chahiye (preventDefault), pehle sab fields validate karo,
 * phir success ya error callback call karo. Jaise mandir mein pujari
 * entry check karta hai ki sab theek hai, waise hi form ko validate karo.
 *
 * Functions:
 *
 *   1. validateName(name)
 *      - Name must be a string, 2-50 characters long
 *      - Only letters (a-z, A-Z) and spaces allowed
 *      - Returns { valid: true, error: null } if valid
 *      - Returns { valid: false, error: "error message" } if invalid
 *      - Error messages (Hinglish):
 *        - Not string: "Naam string hona chahiye"
 *        - Too short: "Naam mein kam se kam 2 characters hone chahiye"
 *        - Too long: "Naam 50 characters se zyada nahi ho sakta"
 *        - Invalid chars: "Naam mein sirf letters aur spaces allowed hain"
 *
 *   2. validateDate(dateString)
 *      - Must be a valid date string in YYYY-MM-DD format
 *      - Must be today or a future date (past dates not allowed)
 *      - Returns { valid: true, error: null } if valid
 *      - Returns { valid: false, error: "error message" } if invalid
 *      - Error messages:
 *        - Not string: "Date string honi chahiye"
 *        - Invalid format: "Date YYYY-MM-DD format mein honi chahiye"
 *        - Past date: "Date aaj ya future ki honi chahiye"
 *
 *   3. validateAartiType(type)
 *      - Must be one of: "morning", "evening", "special"
 *      - Returns { valid: true, error: null } if valid
 *      - Returns { valid: false, error: "error message" } if invalid
 *      - Error messages:
 *        - Not string: "Aarti type string hona chahiye"
 *        - Invalid type: "Aarti type morning, evening, ya special mein se hona chahiye"
 *
 *   4. setupAartiForm(formElement, onSuccess, onError)
 *      - Adds "submit" event listener on formElement with preventDefault()
 *      - On submit: reads form fields:
 *        - name: from input/element with name="name" (formElement.elements.name.value)
 *        - date: from input with name="date"
 *        - aartiType: from select/input with name="aartiType"
 *      - Validates all three fields using above functions
 *      - If ALL valid: calls onSuccess({ name, date, aartiType })
 *      - If ANY invalid: calls onError(errorsArray) where errorsArray contains
 *        error strings from each failed validation
 *      - Returns cleanup function that removes the submit listener
 *      - Agar formElement null/undefined, return null
 *      - Agar onSuccess or onError not functions, return null
 *
 *   5. createBookingSummary(booking)
 *      - Takes { name, date, aartiType } object
 *      - Creates a div.booking-summary containing:
 *        - h3 with text "Booking Confirmation"
 *        - p.booking-name with text "Bhakt: {name}"
 *        - p.booking-date with text "Date: {date}"
 *        - p.booking-type with text "Aarti: {aartiType}"
 *      - Returns the div element
 *      - Agar booking null/undefined or missing fields, return null
 *
 * Hint: event.preventDefault() form ka default submit behavior rokta hai.
 *   formElement.elements se form ke inputs access karo by name attribute.
 *
 * @example
 *   validateName("Rahul Sharma");
 *   // => { valid: true, error: null }
 *
 *   validateName("R");
 *   // => { valid: false, error: "Naam mein kam se kam 2 characters hone chahiye" }
 *
 *   validateDate("2025-12-25");
 *   // => { valid: true, error: null } (if date is in future)
 *
 *   validateAartiType("morning");
 *   // => { valid: true, error: null }
 *
 *   const summary = createBookingSummary({
 *     name: "Rahul", date: "2025-12-25", aartiType: "morning"
 *   });
 *   // => <div class="booking-summary">...</div>
 */
export function validateName(name) {
  // Type check
  if (typeof name !== "string") {
    return {
      valid: false,
      error: "Naam string hona chahiye",
    };
  }

  // Length checks
  if (name.length < 2) {
    return {
      valid: false,
      error:
        "Naam mein kam se kam 2 characters hone chahiye",
    };
  }

  if (name.length > 50) {
    return {
      valid: false,
      error:
        "Naam 50 characters se zyada nahi ho sakta",
    };
  }

  // Character validation
  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) {
    return {
      valid: false,
      error:
        "Naam mein sirf letters aur spaces allowed hain",
    };
  }

  return {
    valid: true,
    error: null,
  };
}

export function validateDate(dateString) {
  // Type check
  if (typeof dateString !== "string") {
    return {
      valid: false,
      error: "Date string honi chahiye",
    };
  }

  // Format check
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(dateString)) {
    return {
      valid: false,
      error:
        "Date YYYY-MM-DD format mein honi chahiye",
    };
  }

  const inputDate = new Date(dateString);

  // Today's date
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  // Past check
  if (inputDate < today) {
    return {
      valid: false,
      error:
        "Date aaj ya future ki honi chahiye",
    };
  }

  return {
    valid: true,
    error: null,
  };
}

export function validateAartiType(type) {
  // Type check
  if (typeof type !== "string") {
    return {
      valid: false,
      error:
        "Aarti type string hona chahiye",
    };
  }

  const validTypes = [
    "morning",
    "evening",
    "special",
  ];

  // Allowed values check
  if (!validTypes.includes(type)) {
    return {
      valid: false,
      error:
        "Aarti type morning, evening, ya special mein se hona chahiye",
    };
  }

  return {
    valid: true,
    error: null,
  };
}

export function setupAartiForm(
  formElement,
  onSuccess,
  onError
) {
  // Validation
  if (
    !formElement ||
    typeof onSuccess !== "function" ||
    typeof onError !== "function"
  ) {
    return null;
  }

  // Submit handler
  function handleSubmit(event) {
    event.preventDefault();

    // Read form values
    const name =
      formElement.elements.name.value;

    const date =
      formElement.elements.date.value;

    const aartiType =
      formElement.elements.aartiType.value;

    // Validate
    const nameResult =
      validateName(name);

    const dateResult =
      validateDate(date);

    const typeResult =
      validateAartiType(aartiType);

    // Collect errors
    const errors = [];

    if (!nameResult.valid) {
      errors.push(nameResult.error);
    }

    if (!dateResult.valid) {
      errors.push(dateResult.error);
    }

    if (!typeResult.valid) {
      errors.push(typeResult.error);
    }

    // Success or error
    if (errors.length === 0) {
      onSuccess({
        name,
        date,
        aartiType,
      });
    } else {
      onError(errors);
    }
  }

  // Add listener
  formElement.addEventListener(
    "submit",
    handleSubmit
  );

  // Cleanup function
  return function cleanup() {
    formElement.removeEventListener(
      "submit",
      handleSubmit
    );
  };
}

export function createBookingSummary(
  booking
) {
  // Validation
  if (
    !booking ||
    !booking.name ||
    !booking.date ||
    !booking.aartiType
  ) {
    return null;
  }

  // Main container
  const div = document.createElement("div");

  div.classList.add("booking-summary");

  // Heading
  const heading =
    document.createElement("h3");

  heading.textContent =
    "Booking Confirmation";

  // Name
  const nameP =
    document.createElement("p");

  nameP.classList.add("booking-name");

  nameP.textContent =
    `Bhakt: ${booking.name}`;

  // Date
  const dateP =
    document.createElement("p");

  dateP.classList.add("booking-date");

  dateP.textContent =
    `Date: ${booking.date}`;

  // Aarti type
  const typeP =
    document.createElement("p");

  typeP.classList.add("booking-type");

  typeP.textContent =
    `Aarti: ${booking.aartiType}`;

  // Append all
  div.appendChild(heading);

  div.appendChild(nameP);

  div.appendChild(dateP);

  div.appendChild(typeP);

  return div;
}