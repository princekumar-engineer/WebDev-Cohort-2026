/**
 * TODO: Global error handler
 *
 * Handle different error types:
 *
 * 1. Multer file size error (err.code === 'LIMIT_FILE_SIZE'):
 *    - Return 400 with { error: { message: 'File size exceeds 5MB limit' } }
 *
 * 2. Multer file type error (err.message includes 'Invalid file type'):
 *    - Return 400 with { error: { message: err.message } }
 *
 * 3. Mongoose validation error (err.name === 'ValidationError'):
 *    - Extract messages from err.errors
 *    - Return 400 with { error: { message: 'combined messages' } }
 *
 * 4. Mongoose duplicate key error (err.code === 11000):
 *    - Return 409 with { error: { message: 'Resource already exists' } }
 *
 * 5. Default error:
 *    - Return status from err.status or 500
 *    - { error: { message: err.message || 'Internal server error' } }
 */
/**
 * Global error handler
 */
export function errorHandler(
  err,
  req,
  res,
  next
) {
  // 1. Multer file size
  if (
    err &&
    err.code === 'LIMIT_FILE_SIZE'
  ) {
    return res.status(400).json({
      error: {
        message:
          'File size exceeds 5MB limit',
      },
    });
  }

  // 2. Invalid file type
  if (
    err &&
    err.message &&
    err.message.includes(
      'Invalid file type'
    )
  ) {
    return res.status(400).json({
      error: {
        message: err.message,
      },
    });
  }

  // 3. Mongoose validation
  if (
    err &&
    err.name ===
      'ValidationError'
  ) {
    const messages = Object.values(
      err.errors
    )
      .map((e) => e.message)
      .join(', ');

    return res.status(400).json({
      error: {
        message: messages,
      },
    });
  }

  // 4. Duplicate key
  if (
    err &&
    err.code === 11000
  ) {
    return res.status(409).json({
      error: {
        message:
          'Resource already exists',
      },
    });
  }

  // Debug
  console.error(err);

  // 5. Default
  return res
    .status(
      err?.status || 500
    )
    .json({
      error: {
        message:
          err?.message ||
          'Internal server error',
      },
    });
}