import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * TODO: Define User schema
 *
 * Fields:
 * - name: String, required, trim, minlength 2, maxlength 50
 * - email: String, required, unique, lowercase, trim
 *   Use regex validation: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 * - password: String, required, minlength 6
 *   IMPORTANT: Add { select: false } so password isn't returned by default
 * - role: String, enum ['user', 'admin'], default 'user'
 *
 * Options:
 * - Enable timestamps (createdAt, updatedAt)
 */

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

/**
 * TODO: Add pre-save hook to hash password
 *
 * Before saving a user:
 * 1. Check if password is modified (if not, skip hashing)
 * 2. Hash password using bcrypt.hash(password, 10)
 * 3. Replace plain text password with hashed version
 *
 * Example structure:
 * userSchema.pre('save', async function(next) {
 *   // Only hash if password is modified
 *   
 *   // Hash password and replace
 *   
 * });
 */

/**
 * Hash password before save
 */

userSchema.pre('save', async function(next) {
   // Skip if password not modified
    if (!this.isModified('password')) {
      return next();
    }  

   // Hash password
    this.password = await bcrypt.hash(this.password, 10);

    next();
});


// TODO: Create and export the User model
export const User = mongoose.model('User', userSchema);