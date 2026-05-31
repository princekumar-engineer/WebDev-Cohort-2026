# Authentication & Authorization API

Build a secure authentication and authorization system from scratch! Learn JWT tokens, password hashing, protected routes, and role-based access control.

## What You'll Learn

- **Password Security** - Hash passwords with bcrypt (never store plain text!)
- **JWT Tokens** - Generate and validate JSON Web Tokens
- **Authentication** - Verify user identity ("Who are you?")
- **Authorization** - Check permissions ("What can you do?")
- **Protected Routes** - Guard endpoints with middleware
- **Role-Based Access Control (RBAC)** - User vs Admin permissions
- **Security Best Practices** - Error messages, token storage, validation

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start MongoDB with Docker

```bash
# Start MongoDB container
docker-compose up -d

# Check if MongoDB is running
docker-compose ps

# View MongoDB logs
docker-compose logs mongodb
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and set your JWT secret:
```
JWT_SECRET=your-super-secret-key-change-in-production-minimum-32-characters
```

### 4. Run Tests

```bash
# Run all tests
npm test

# Run specific test
npm test -- 01-health
npm test -- 02-connect
npm test -- 03-register
npm test -- 04-login
npm test -- 05-protected
npm test -- 06-roles
```

### 5. Start Development Server

```bash
npm run dev
```

## Project Structure

```
auth-api/
├── src/
│   ├── app.js                    # Express app setup
│   ├── server.js                 # Server startup
│   ├── db/
│   │   └── connect.js            # MongoDB connection
│   ├── models/
│   │   └── user.model.js         # User schema with password hashing
│   ├── controllers/
│   │   ├── auth.controller.js    # Register, login, me
│   │   └── user.controller.js    # User management (admin)
│   ├── routes/
│   │   ├── auth.routes.js        # Auth endpoints
│   │   └── user.routes.js        # User management endpoints
│   ├── middlewares/
│   │   ├── auth.middleware.js    # JWT verification
│   │   ├── role.middleware.js    # Role checking
│   │   ├── error.middleware.js   # Error handling
│   │   └── notFound.middleware.js # 404 handling
│   └── utils/
│       └── jwt.js                # JWT helpers (TODO - signToken, verifyToken)
└── tests/
    ├── __helpers__/
    │   └── setupTestDb.js        # Test utilities (complete)
    └── visible/
        ├── 01-health.spec.js     # Health check tests
        ├── 02-connect.spec.js    # Database tests
        ├── 03-register.spec.js   # Registration tests
        ├── 04-login.spec.js      # Login & JWT tests
        ├── 05-protected.spec.js  # Auth middleware tests
        └── 06-roles.spec.js      # Authorization tests
```

## Implementation Guide

### Step 1: Basic Setup (5 points)

**File:** `src/server.js`

Read environment variables:
- `PORT` from `process.env.PORT` (default: 3000)
- `MONGO_URI` from `process.env.MONGO_URI` (default: mongodb://localhost:27017/auth_api)

**File:** `src/app.js`

Create Express app:
1. Add `express.json()` middleware
2. Add `GET /health` route returning `{ ok: true }`
3. Mount routes and error handlers

**Test:** `npm test -- 01-health`

### Step 2: Database Connection (10 points)

**File:** `src/db/connect.js`

Implement `connectDB(uri)`:
1. Validate URI is provided
2. Connect using `mongoose.connect(uri)`
3. Return connection

**Test:** `npm test -- 02-connect`

### Step 3: User Registration (20 points)

**File:** `src/models/user.model.js`

Define User schema:
- name (String, required, trim, 2-50 chars)
- email (String, required, unique, lowercase, validated)
- password (String, required, min 6 chars, `select: false`)
- role (String, enum: ['user', 'admin'], default: 'user')
- timestamps enabled

Add pre-save hook:
- Hash password with `bcrypt.hash(password, 10)` before saving
- Only hash if password is modified

**File:** `src/controllers/auth.controller.js`

Implement `register`:
1. Check if email already exists (409 if yes)
2. Create new user (password auto-hashed by pre-save hook)
3. Return 201 with user (password excluded)

**File:** `src/routes/auth.routes.js`

Add POST `/register` route

**Test:** `npm test -- 03-register`

### Step 4: Login & JWT (20 points)

**File:** `src/utils/jwt.js`

Implement JWT utility functions:

`signToken(payload)`:
1. Use `jwt.sign()` from jsonwebtoken library
2. Sign with `process.env.JWT_SECRET`
3. Set `expiresIn` from `process.env.JWT_EXPIRES_IN` (default: '24h')
4. Return the signed token string

`verifyToken(token)`:
1. Use `jwt.verify()` from jsonwebtoken library
2. Verify with `process.env.JWT_SECRET`
3. Return decoded payload
4. Let errors (invalid/expired tokens) propagate to caller

**File:** `src/controllers/auth.controller.js`

Implement `login`:
1. Find user by email (use `.select('+password')`)
2. Check password with `bcrypt.compare(password, user.password)`
3. Generate JWT with `signToken({ userId, email, role })`
4. Return 200 with token and user (password excluded)

**File:** `src/routes/auth.routes.js`

Add POST `/login` route

**Security:** Use same error message for wrong email/password: "Invalid credentials"

**Test:** `npm test -- 04-login`

### Step 5: Protected Routes (25 points)

**File:** `src/middlewares/auth.middleware.js`

Implement `authenticate`:
1. Extract Authorization header
2. Verify "Bearer token" format
3. Verify token with `verifyToken(token)`
4. Find user by decoded userId
5. Attach user to `req.user`
6. Return 401 for any auth failure

**File:** `src/controllers/auth.controller.js`

Implement `me`:
- Return current user from `req.user`

**File:** `src/routes/auth.routes.js`

Add GET `/me` route (protected with authenticate middleware)

**Test:** `npm test -- 05-protected`

### Step 6: Role-Based Authorization (20 points)

**File:** `src/middlewares/role.middleware.js`

Implement `requireRole(...roles)`:
1. Return middleware function
2. Check if user is authenticated (401 if not)
3. Check if user role is allowed (403 if not)
4. Call next()

**File:** `src/controllers/user.controller.js`

Implement admin-only endpoints:
- `listUsers` - Find all users
- `getUser` - Find user by ID (404 if not found)
- `deleteUser` - Delete user by ID (404 if not found)

**File:** `src/routes/user.routes.js`

Add routes (all require authenticate + requireRole('admin')):
- GET `/` - listUsers
- GET `/:id` - getUser
- DELETE `/:id` - deleteUser

**File:** `src/app.js`

Mount user routes at `/api/users`

**Test:** `npm test -- 06-roles`

## API Endpoints

### Authentication Routes (`/api/auth`)

#### POST /register
Register a new user.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

#### POST /login
Login and receive JWT token.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### GET /me
Get current user (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### User Management Routes (`/api/users`)

All routes require admin role.

#### GET /
List all users.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response (200):**
```json
{
  "users": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  ]
}
```

#### GET /:id
Get user by ID.

#### DELETE /:id
Delete user by ID.

## Security Best Practices

### 1. Password Security

- **Never store plain text passwords** - Always hash with bcrypt
- Use bcrypt.compare() for verification, not string comparison
- Set password field to `select: false` in schema
- Use `.select('+password')` only when needed (like login)

### 2. JWT Best Practices

- Store JWT_SECRET in environment variables
- Use strong secret (at least 32 characters)
- Set reasonable expiration (24h recommended)
- Include minimal data in payload (userId, email, role)
- Verify token on every protected request

### 3. Error Messages

- Don't leak information ("Invalid credentials" not "Email not found")
- Same message for wrong email or wrong password
- Consistent error format: `{ error: { message: "..." } }`

### 4. Status Codes

- 401 Unauthorized - Not authenticated (no token, invalid token)
- 403 Forbidden - Authenticated but no permission (wrong role)
- 409 Conflict - Resource already exists (duplicate email)

### 5. Token Format

- Authorization header: `Bearer <token>`
- Always check for "Bearer " prefix
- Extract token correctly: `header.split(' ')[1]`

## Common Mistakes

### 1. Storing Plain Text Passwords
**Wrong:**
```javascript
const user = new User({ name, email, password }); // Password saved as plain text!
await user.save();
```

**Correct:**
```javascript
// Pre-save hook automatically hashes password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
```

### 2. Wrong Password Comparison
**Wrong:**
```javascript
if (password === user.password) // String comparison won't work!
```

**Correct:**
```javascript
const isValid = await bcrypt.compare(password, user.password);
```

### 3. Missing select('+password') on Login
**Wrong:**
```javascript
const user = await User.findOne({ email }); // Password not included!
```

**Correct:**
```javascript
const user = await User.findOne({ email }).select('+password');
```

### 4. Token Without "Bearer" Prefix
**Wrong:**
```javascript
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Correct:**
```javascript
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5. Leaking Information in Errors
**Wrong:**
```javascript
if (!user) return res.status(404).json({ error: { message: "Email not found" } });
if (!isValid) return res.status(401).json({ error: { message: "Wrong password" } });
```

**Correct:**
```javascript
// Same message for both cases
if (!user || !isValid) {
  return res.status(401).json({ error: { message: "Invalid credentials" } });
}
```

## Testing Strategy

All tests use an in-memory MongoDB database for isolation. Tests are transparent - you can see exactly what's expected.

**Run tests progressively:**

```bash
npm test -- 01-health      # 5 points
npm test -- 02-connect     # 10 points
npm test -- 03-register    # 20 points
npm test -- 04-login       # 20 points
npm test -- 05-protected   # 25 points
npm test -- 06-roles       # 20 points
```

**Total: 100 points**

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Database
MONGO_URI=mongodb://localhost:27017/auth_api

# Server
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-key-minimum-32-characters
JWT_EXPIRES_IN=24h
```

**Generate a strong JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Docker Commands

```bash
# Start MongoDB
docker-compose up -d

# Stop MongoDB
docker-compose down

# View logs
docker-compose logs -f mongodb

# Remove all data
docker-compose down -v
```

## Troubleshooting

### Tests failing with "MongoError: connect ECONNREFUSED"
- Start MongoDB: `docker-compose up -d`
- Check MongoDB is running: `docker-compose ps`

### "JWT_SECRET is not defined"
- Copy `.env.example` to `.env`
- Set a strong JWT_SECRET value

### Password not being hashed
- Check pre-save hook in user.model.js
- Ensure `bcrypt.hash()` is called with salt rounds (10)
- Verify `this.isModified('password')` check

### Token verification failing
- Check Authorization header format: `Bearer <token>`
- Verify JWT_SECRET matches between sign and verify
- Check token hasn't expired

### 403 instead of 401 (or vice versa)
- 401 = Not authenticated (no/invalid token)
- 403 = Authenticated but forbidden (wrong role)

## Resources

- [Express Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)
- [JWT Introduction](https://jwt.io/introduction)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

## License

MIT
