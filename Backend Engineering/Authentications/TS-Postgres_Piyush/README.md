# API Testing Guide

Base URL:

```txt id="s2t4u8"
http://localhost:3000
```

---

# Start the Server

Run:

```bash id="j6k3r1"
npm run dev
```

Expected Output:

```txt id="v9p2x5"
Http server is running on PORT 3000
```

---

# API Endpoints

| Method | Endpoint        | Description                    |
| ------ | --------------- | ------------------------------ |
| GET    | `/`             | Health check route             |
| POST   | `/auth/sign-up` | Register new user              |
| POST   | `/auth/sign-in` | Login user                     |
| GET    | `/auth/me`      | Get current authenticated user |

---

# 1. Root Route

## Request

### Method

```txt id="c7m9n2"
GET
```

### URL

```txt id="b5w1k8"
http://localhost:3000/
```

---

## Expected Response

```json id="n4z8q3"
{
  "message": "Welcome to ChaiCode Auth Service"
}
```

---

# 2. Signup API

Register a new user.

---

## Request

### Method

```txt id="f3y6h1"
POST
```

### URL

```txt id="d2u7j9"
http://localhost:3000/auth/sign-up
```

---

## Headers

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

---

## Body

Select:

```txt id="r8k5m4"
Body → raw → JSON
```

Then send:

```json id="x6v2t7"
{
  "firstName": "Prince",
  "lastName": "Kumar",
  "email": "prince@gmail.com",
  "password": "123456"
}
```

---

## Expected Response

```json id="m1c8q5"
{
  "message": "user has been created successfully",
  "data": {
    "id": "generated-uuid"
  }
}
```

---

## Possible Errors

### Duplicate Email

```json id="p7h3n6"
{
  "error": "duplicate entry",
  "message": "user with email prince@gmail.com already exists"
}
```

---

# 3. Signin API

Login existing user.

---

## Request

### Method

```txt id="y4d9v2"
POST
```

### URL

```txt id="q8n2w7"
http://localhost:3000/auth/sign-in
```

---

## Headers

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

---

## Body

```json id="l3t7r5"
{
  "email": "prince@gmail.com",
  "password": "123456"
}
```

---

## Expected Response

```json id="w9m6k1"
{
  "message": "Signin Success",
  "data": {
    "token": "JWT_TOKEN"
  }
}
```

---

# Save JWT Token

Copy the token from response.

Example:

```txt id="k2x5j8"
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

You will use this token for protected routes.

---

# 4. Get Current User

Protected route requiring JWT token.

---

## Request

### Method

```txt id="n6u4b9"
GET
```

### URL

```txt id="z1r8m3"
http://localhost:3000/auth/me
```

---

## Headers

| Key           | Value            |
| ------------- | ---------------- |
| Authorization | Bearer JWT_TOKEN |

Example:

```txt id="g5v2c7"
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Expected Response

```json id="t4q9x2"
{
  "firstName": "Prince",
  "lastName": "Kumar",
  "email": "prince@gmail.com"
}
```

---

# Invalid Token Response

If token is invalid:

```json id="j7w3m8"
{
  "error": "Invalid token"
}
```

---

# Missing Token Response

If Authorization header is missing:

```json id="u2k6r1"
{
  "error": "Authentication Required"
}
```
---
# Important Notes

## Use JSON Body

Always select:

```txt id="h8x4n6"
Body → raw → JSON
```

---

## Authorization Header Format

Correct:

```txt id="y1v7q5"
Authorization: Bearer JWT_TOKEN
```

Incorrect:

```txt id="e4k2m9"
Authorization: JWT_TOKEN
```

---

# Recommended Testing Flow

```txt id="f6u3t8"
1. Start Server
2. Test GET /
3. Register User
4. Login User
5. Copy JWT Token
6. Test Protected Route
```

---

# Example Project Workflow

```txt id="m9w2x6"
Signup User
    ↓
Signin User
    ↓
Receive JWT Token
    ↓
Send JWT in Authorization Header
    ↓
Access Protected Routes
```
