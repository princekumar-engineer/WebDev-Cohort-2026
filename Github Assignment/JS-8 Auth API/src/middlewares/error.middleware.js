/**
 * TODO: Global error handler
 *
 * 1. Handle Mongoose validation errors (error.name === 'ValidationError'):
 *    - Return 400 with { error: { message: error.message } }
 * 2. Handle Mongoose duplicate key errors (error.code === 11000):
 *    - Return 409 with { error: { message: "Email already exists" } }
 * 3. Handle all other errors:
 *    - Return 500 with { error: { message: error.message } }
 */
/**
 * Global error handler
 */
export function errorHandler(
  error,
  req,
  res,
  next
) {
  // Mongoose validation errors
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: {
        message: error.message,
      },
    });
  }

  // Duplicate key (email exists)
  if (error.code === 11000) {
    return res.status(409).json({
      error: {
        message: 'Email already exists',
      },
    });
  }

  // Default error
  return res.status(500).json({
    error: {
      message: error.message,
    },
  });
}