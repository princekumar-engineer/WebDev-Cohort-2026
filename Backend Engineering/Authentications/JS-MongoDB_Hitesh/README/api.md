# 📬 Postman API Testing Guide

This document explains how to test all authentication APIs using Postman.

---

## 🌐 Base URL

```http
http://localhost:4000/api/auth
```

---

## 📌 Prerequisites

Before testing APIs:

* Server is running:

  ```bash
  npm run dev
  ```
* MongoDB (Docker) is running:

  ```bash
  npm run db:up
  ```

---

## 🔹 1. Register User

**POST** `/register`

### Request Body (JSON)

```json
{
  "name": "Prince Kumar",
  "email": "prince@gmail.com",
  "password": "Password1"
}
```

### Expected Response

* User created successfully
* May include verification email trigger

---

## 🔹 2. Login User

**POST** `/login`

### Request Body

```json
{
  "email": "prince@gmail.com",
  "password": "Password1"
}
```

### Expected Response

```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

👉 Save the `accessToken` for protected routes.

---

## 🔐 3. Get Current User

**GET** `/me`

### Headers

```
Authorization: Bearer <ACCESS_TOKEN>
```

### Expected Response

* Returns logged-in user details

---

## 🔁 4. Refresh Token

**POST** `/refresh-token`

### Notes

* May use:

  * HTTP-only cookies OR
  * Request body (based on implementation)

### Expected Response

* New access token

---

## 🚪 5. Logout

**POST** `/logout`

### Headers

```
Authorization: Bearer <ACCESS_TOKEN>
```

### Expected Response

* User logged out
* Tokens invalidated

---

## 📧 6. Verify Email

**GET** `/verify-email/:token`

### Example

```http
GET /verify-email/abc123token
```

### Notes

* Token is received via email (Mailtrap)
* Opens in browser or Postman

---

## 🔑 7. Forgot Password

**POST** `/forgot-password`

### Request Body

```json
{
  "email": "prince@gmail.com"
}
```

### Expected Response

* Password reset email sent

---

## 🔄 8. Reset Password

**PUT** `/reset-password/:token`

### Request Body

```json
{
  "password": "NewPassword1"
}
```

### Notes

* Token is received via email

---

## 🧪 Testing Flow (Recommended Order)

1. Register
2. Verify Email (via Mailtrap)
3. Login
4. Access Protected Route (`/me`)
5. Refresh Token
6. Logout
7. Forgot Password
8. Reset Password

---

## ⚠️ Common Errors

### ❌ 401 Unauthorized

* Missing or invalid token
* Fix: Add `Authorization` header

---

### ❌ 400 Bad Request

* Validation failed
* Fix: Check request body format

---

### ❌ MongoDB Connection Error

* Database not running
* Fix:

  ```bash
  npm run db:up
  ```

---

## 💡 Tips

* Always use **JSON format** in Postman body
* Save tokens in environment variables for reuse
* Use Postman Collections for better workflow
* Check Mailtrap inbox for email-based routes

---

## 📁 Optional: Postman Collection

You can organize all requests into a collection:

* Create Collection → "Auth API"
* Add all endpoints
* Store token as variable:

  ```
  {{accessToken}}
  ```

---

## ✅ You're Ready!

You can now fully test and validate your authentication system using Postman 🚀
