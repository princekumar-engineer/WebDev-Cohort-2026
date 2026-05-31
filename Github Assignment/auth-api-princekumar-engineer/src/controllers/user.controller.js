import { User } from '../models/user.model.js';

/**
 * TODO: List all users (Admin only)
 *
 * 1. Find all users (password excluded by default)
 * 2. Return 200 with { users }
 */
/**
 * List all users (Admin only)
 */
export async function listUsers(
  req,
  res,
  next
) {
  try {
    const users = await User.find();

    return res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Get user by ID (Admin only)
 *
 * 1. Extract id from req.params
 * 2. Find user by id (password excluded by default)
 * 3. If not found: return 404 with { error: { message: "User not found" } }
 * 4. Return 200 with { user }
 */
/**
 * Get user by ID (Admin only)
 */
export async function getUser(
  req,
  res,
  next
) {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'User not found',
        },
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
}


/**
 * TODO: Delete user (Admin only)
 *
 * 1. Extract id from req.params
 * 2. Delete user by id
 * 3. If not found: return 404 with { error: { message: "User not found" } }
 * 4. Return 200 with { message: "User deleted successfully" }
 */
/**
 * Delete user (Admin only)
 */
export async function deleteUser(
  req,
  res,
  next
) {
  try {
    const { id } = req.params;

    const user =
      await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'User not found',
        },
      });
    }

    return res.status(200).json({
      message:
        'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}
