# Authentication Backend using Node.js, Express, TypeScript, PostgreSQL & Drizzle ORM

A complete authentication backend built with:

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Drizzle ORM
* JWT Authentication
* Zod Validation

---

# Features

* User Signup
* User Signin
* JWT Authentication
* Protected Routes
* Password Hashing
* PostgreSQL Database
* Request Validation using Zod
* Middleware-based Authentication
* UUID-based User IDs

---

# Tech Stack

| Technology  | Purpose            |
| ----------- | ------------------ |
| Node.js     | Runtime            |
| Express.js  | Backend Framework  |
| TypeScript  | Type Safety        |
| PostgreSQL  | Database           |
| Drizzle ORM | Database ORM       |
| JWT         | Authentication     |
| Zod         | Validation         |
| Docker      | Database Container |

---

# Project Structure

```txt
src/
│
├── app/
│   ├── auth/
│   │   ├── controller.ts
│   │   ├── models.ts
│   │   ├── routes.ts
│   │   └── utils/token.ts
│   │
│   ├── middleware/
│   │   └── auth-middleware.ts
│   │
│   └── index.ts
│
├── db/
│   ├── index.ts
│   └── schema.ts
│
└── index.ts
```

---

# Environment Variables

Create a `.env` file:

```env

PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/authdb
JWT_SECRET=your_secret_key

```

---

# Docker Setup

## docker-compose.yml

```yaml
services:
  postgresdb:
    image: postgres:17
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: chaicode
    volumes:
      - 'postgres_data:/var/lib/postgresql/data'

volumes:
  postgres_data:
```

---

# Installation

## Install dependencies

```bash
npm install
```

---

# Start PostgreSQL

```bash
docker compose up -d
```

---

# Generate Database Migration

```bash
npm run db:generate
```

---

# Run Database Migration

```bash
npm run db:migrate
```

---

# Run Development Server

```bash
npm run dev
```

Server runs on:

```txt
http://localhost:3000
```

---

# Database Schema

## Users Table

```ts
export const usersTable = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),

    firstName: varchar('first_name', { length: 45 }).notNull(),
    lastName: varchar('last_name', { length: 45 }),

    email: varchar('email', { length: 322 }).notNull().unique(),

    emailVerified: boolean('email_verified')
        .default(false)
        .notNull(),

    password: text('password'),
    salt: text('salt'),

    createdAt: timestamp('created_at')
        .defaultNow()
        .notNull(),

    updatedAt: timestamp('updated_at')
        .$onUpdate(() => new Date()),
})
```

---

# Authentication Flow

## Signup Flow

```txt
User Request
    ↓
Validate Request Body
    ↓
Check Existing User
    ↓
Generate Salt
    ↓
Hash Password
    ↓
Store User in PostgreSQL
    ↓
Return Success Response
```

---

## Signin Flow

```txt
User Request
    ↓
Validate Request Body
    ↓
Find User
    ↓
Verify Password
    ↓
Generate JWT Token
    ↓
Return JWT Token
```

---

## Protected Route Flow

```txt
Client Sends JWT Token
    ↓
Authentication Middleware
    ↓
Verify JWT
    ↓
Attach User to req.user
    ↓
Protected Route Access
```

---

# API Endpoints

---

## Root Route

### GET /

Response:

```json
{
  "message": "Welcome to ChaiCode Auth Service"
}
```

---

## Signup

### POST /auth/sign-up

Request Body:

```json
{
  "firstName": "Prince",
  "lastName": "Kumar",
  "email": "prince@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "message": "user has been created successfully",
  "data": {
    "id": "uuid"
  }
}
```

---

## Signin

### POST /auth/sign-in

Request Body:

```json
{
  "email": "prince@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "message": "Signin Success",
  "data": {
    "token": "JWT_TOKEN"
  }
}
```

---

## Get Current User

### GET /auth/me

Headers:

```txt
Authorization: Bearer JWT_TOKEN
```

Response:

```json
{
  "firstName": "Prince",
  "lastName": "Kumar",
  "email": "prince@gmail.com"
}
```

---

# Middleware Explanation

## authenticationMiddleware()

Purpose:

* Read JWT token
* Verify JWT
* Attach user to request

Example:

```ts
const header = req.headers['authorization']
```

Checks:

```txt
Authorization: Bearer TOKEN
```

---

## restrictToAuthenticatedUser()

Purpose:

Protect routes from unauthenticated access.

If user is not authenticated:

```json
{
  "error": "Authentication Required"
}
```

is returned.

---

# JWT Utility

## Create Token

```ts
JWT.sign(payload, JWT_SECRET)
```

Creates signed JWT token.

---

## Verify Token

```ts
JWT.verify(token, JWT_SECRET)
```

Validates token authenticity.

---

# Validation using Zod

## Signup Validation

```ts
z.object({
    firstName: z.string().min(2),
    lastName: z.string().nullable().optional(),
    email: z.string().email(),
    password: z.string().min(6)
})
```

---

# Security Concepts Used

* Password Hashing
* Salt Generation
* JWT Authentication
* Protected Routes
* Request Validation
* UUID-based IDs

---

# Important Learnings

## Always return after sending response

Correct:

```ts
return res.status(400).json(...)
```

Incorrect:

```ts
res.status(400).json(...)
next()
```

Without `return`, Express may throw:

```txt
ERR_HTTP_HEADERS_SENT
```

---

# Future Improvements

* bcrypt Password Hashing
* Refresh Tokens
* Cookies Authentication
* OAuth Login
* Role-Based Authorization
* Global Error Middleware
* Rate Limiting
* Helmet & CORS
* Logging
* Dockerized Backend Deployment

---

# Author

Built as a learning project for understanding:

* Backend Architecture
* Authentication Systems
* Express Middleware
* JWT Authentication
* PostgreSQL + Drizzle ORM
* TypeScript Backend Development
