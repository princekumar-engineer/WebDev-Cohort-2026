# 🚀 Project Setup Guide (Node.js + TypeScript + Drizzle + PostgreSQL)

This guide explains how to set up and run the project from scratch.

---

## 🧰 Prerequisites

Make sure you have installed:

* Node.js (v18+ recommended)
* PostgreSQL (v14+ recommended)
* npm (comes with Node.js)

---

## 📦 1. Install Dependencies

```bash
npm install
```

---

## ⚙️ 2. Setup Environment Variables

Create a `.env` file in the root of the project:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/authdb
PORT=3000
JWT_SECRET=your_secret_key
```

---

## 🗄️ 3. Setup PostgreSQL

### 🔐 Open PostgreSQL CLI

```bash
psql -U postgres
```

---

### 🔑 Set Password (if not already set)

```sql
ALTER USER postgres WITH PASSWORD '1234';
```

---

### 🏗️ Create Database

```sql
CREATE DATABASE authdb;
```

---

### 🔍 Verify

```sql
\l   -- list databases
\du  -- list users
```

Exit:

```sql
\q
```

---

## ⚙️ 4. Drizzle Configuration

Your `drizzle.config.js` should look like:

```js
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
```

---

## 🧱 5. Database Schema

Example (`src/db/schema.ts`):

```ts
import { pgTable, uuid, varchar, text, boolean, timestamp } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),

  firstName: varchar('first_name', { length: 45 }).notNull(),
  lastName: varchar('last_name', { length: 45 }),

  email: varchar('email', { length: 322 }).notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),

  password: varchar('password', { length: 66 }),
  salt: text('salt'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})
```

---

## 🔄 6. Generate & Run Migrations

### Generate SQL migrations:

```bash
npm run db:generate
```

### Apply migrations:

```bash
npm run db:migrate
```

---

## 🧪 7. Open Database Studio

```bash
npm run studio
```

Then open in browser:

```
https://local.drizzle.studio
```

You should see your `users` table.

---

## ▶️ 8. Run the Project

### Development mode:

```bash
npm run dev
```

### Production mode:

```bash
npm run build
npm start
```

---

## 🚨 Common Issues & Fixes

### ❌ Error: `role "username" does not exist`

✔ Fix:

* Use correct DB user (`postgres`)
* Update `.env`

---

### ❌ Error: `psql: command not found`

✔ Fix:

* Add PostgreSQL `/bin` folder to system PATH

---

### ❌ No tables in Drizzle Studio

✔ Fix:

```bash
npm run db:generate
npm run db:migrate
```

---

### ❌ `DATABASE_URL` undefined

✔ Fix:

* Ensure `.env` exists
* Ensure `dotenv` is loaded

---

## 🧠 Project Stack Overview

* Express → API server
* drizzle-orm → Database queries
* drizzle-kit → Migrations & studio
* PostgreSQL → Database
* jsonwebtoken → Authentication
* zod → Validation

---

## ✅ Final Checklist

* [ ] PostgreSQL running
* [ ] Database created (`authdb`)
* [ ] `.env` configured
* [ ] Migrations generated
* [ ] Migrations applied
* [ ] Studio shows tables
* [ ] Server runs

---

## 🚀 Next Steps

* Build Register API
* Implement Login with JWT
* Add password hashing (bcrypt)
* Add validation with Zod

---

**You’re now fully set up 🎯**
