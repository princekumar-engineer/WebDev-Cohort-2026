import mongoose from 'mongoose';

/**
 * Validate MongoDB ObjectId
 *
 * 1. Check if req.params.id is a valid MongoDB ObjectId
 * Use: mongoose.Types.ObjectId.isValid(req.params.id)
 * 2. If invalid: return 400 with { error: { message: 'Invalid id format' } }
 * 3. If valid: call next()
 */
export function validateObjectId(req, res, next) {
  // 1-2. Intercept request if the parameter ID fails verification format limits
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: {
        message: 'Invalid id format',
      },
    });
  }

  // 3. Forward control context safely to the subsequent middleware or controller
  next();
}