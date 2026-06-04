import jwt from 'jsonwebtoken';

/**
 * TODO: Signs a JWT token with the given payload
 *
 * Requirements:
 * 1. Use jsonwebtoken library's sign() method
 * 2. Sign with JWT_SECRET from environment variables
 * 3. Set expiration time from JWT_EXPIRES_IN env var (default: '24h')
 * 4. Return the signed token string
 *
 * @param {Object} payload - Data to encode in the token (e.g., { userId: '123', email: 'user@example.com' })
 * @returns {string} - Signed JWT token
 *
 * Hints:
 * - Use jwt.sign(payload, secret, options)
 * - Options object should include expiresIn
 * - Read secret from process.env.JWT_SECRET
 * - Read expiresIn from process.env.JWT_EXPIRES_IN with fallback '24h'
 *
 * Example:
 * const token = signToken({ userId: '123', email: 'user@example.com' });
 * // Returns: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMi..."
 *
 * Security Notes:
 * - Never include sensitive data like passwords in the payload
 * - JWT payload is NOT encrypted, only signed (it's base64 encoded and readable)
 * - Keep JWT_SECRET secure and never commit it to version control
 */
/**
 * Signs a JWT token
 */
export function signToken(payload) {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn:
        process.env.JWT_EXPIRES_IN || '24h',
    }
  );
}

/**
 * TODO: Verifies and decodes a JWT token
 *
 * Requirements:
 * 1. Use jsonwebtoken library's verify() method
 * 2. Verify with JWT_SECRET from environment variables
 * 3. Return the decoded payload if valid
 * 4. Let the method throw errors for invalid/expired tokens
 *
 * @param {string} token - JWT token to verify
 * @returns {Object} - Decoded token payload
 * @throws {JsonWebTokenError} - If token is invalid
 * @throws {TokenExpiredError} - If token is expired
 * @throws {NotBeforeError} - If token is not yet valid
 *
 * Hints:
 * - Use jwt.verify(token, secret)
 * - No need to catch errors - let them propagate
 * - Read secret from process.env.JWT_SECRET
 *
 * Example:
 * const decoded = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
 * // Returns: { userId: '123', email: 'user@example.com', iat: 1234567890, exp: 1234654290 }
 *
 * Common Errors:
 * - JsonWebTokenError: "invalid signature" - Wrong secret or tampered token
 * - TokenExpiredError: "jwt expired" - Token past expiration time
 * - JsonWebTokenError: "jwt malformed" - Invalid token format
 *
 * Security Notes:
 * - Always verify tokens before trusting the payload
 * - Check token expiration (verify does this automatically)
 * - Never skip verification for "performance" reasons
 */
/**
 * Verifies and decodes JWT token
 */
export function verifyToken(token) {
  return jwt.verify(
    token,
    process.env.JWT_SECRET
  );
}