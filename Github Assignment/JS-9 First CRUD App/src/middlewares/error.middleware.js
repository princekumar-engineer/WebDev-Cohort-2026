/**
 * TODO: Handle errors
 *
 * Required error format: { error: { message: "..." } }
 *
 * Handle these cases:
 * 1. Mongoose ValidationError → 400 with combined error messages
 * 2. Mongoose CastError → 400 with "Invalid id format"
 * 3. Other errors → Use err.status (or 500) and err.message
 */
/**
 * Handle errors
 *
 * Required error format:
 * { error: { message: "..." } }
 */
export function errorHandler(err, req, res, next) {
  // Mongoose validation errors
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");

    return res.status(400).json({
      error: {
        message,
      },
    });
  }

  // Invalid ObjectId cast
  if (err.name === "CastError") {
    return res.status(400).json({
      error: {
        message: "Invalid id format",
      },
    });
  }

  // Generic errors
  return res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal server error",
    },
  });
}