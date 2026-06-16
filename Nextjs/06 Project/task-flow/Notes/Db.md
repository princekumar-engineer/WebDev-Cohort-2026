# Singleton Pattern

## Definition

The Singleton Pattern is a design pattern that ensures:

1. Only **one instance** of a class/object exists in the application.
2. That instance is **globally accessible** and reused everywhere.

Instead of creating new objects repeatedly, you create it once and share it.

---

## Core Idea

The Singleton Pattern is **not about Prisma specifically**.

It applies to any **long-lived resource** such as:

- Database clients
- Connection pools
- Cache clients
- API SDKs
- Loggers

Its purpose is to prevent unnecessary recreation of expensive resources.

---

## Basic Idea

### Without singleton

```ts
const db1 = new Database()
const db2 = new Database()
const db3 = new Database()
```

Result:

- 3 separate instances
- more memory usage
- possible resource waste

---

### With singleton

```ts
const db = Database.getInstance()
```

Result:

- same instance reused everywhere

---

## Real-world analogy

Think of a printer in an office.

### Without singleton

- Every employee buys a new printer.

### With singleton

- More cost
- More waste
- Harder maintenance

### With singleton

- Everyone uses the same printer.

Result:

- cheaper
- easier
- centralized

---

# Why Singleton Matters

Use singleton when the library **creates or holds connections internally**.

Examples:

- Prisma Client ✅
- Mongoose ✅
- node-postgres (Pool) ✅
- mysql2 (Pool) ✅
- ioredis ✅

These manage:

- connection pools
- sockets
- authentication sessions

Recreating them repeatedly wastes resources.

---

# When Singleton Matters Less

Some tools are lighter because they wrap the actual connection.

Examples:

- Drizzle ORM → not directly
- Kysely → not directly
- Knex.js → depends on underlying pool
- better-sqlite3 → less critical

Important distinction:

```txt
ORM / Query Builder ≠ Actual Connection
Driver / Pool = Actual Connection
```

Example:

```ts
const db = drizzle(pool)
```

Singleton should be for:

```ts
pool ✅
```

Not necessarily:

```ts
db ❌
```

---

# Examples

## 1. Prisma

Used for database connection pooling.

```ts
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as {
  prisma?: PrismaClient
}

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
```

Why:

- prevents multiple Prisma clients during hot reload
- avoids too many DB connections

---

## 2. PostgreSQL (pg Pool)

```ts
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export default pool
```

Usage:

```ts
import pool from "./db"

await pool.query("SELECT * FROM users")
```

Why:

- one pool shared
- better connection management

---

## 3. MongoDB (Mongoose)

```ts
import mongoose from "mongoose"

let isConnected = false

export async function connectDB() {
  if (isConnected) return

  await mongoose.connect(process.env.MONGO_URL!)
  isConnected = true
}
```

Why:

- prevents reconnecting every time

---

## 4. Redis

```ts
import Redis from "ioredis"

const redis = new Redis(process.env.REDIS_URL)

export default redis
```

Why:

- one persistent Redis connection

---

## 5. Drizzle + pg

Drizzle itself is lightweight.

The actual singleton should be the pool.

```ts
import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export const db = drizzle(pool)
```

Important:

Singleton = `pool`

Not Drizzle itself.

---

## 6. Logger

Not only for databases.

```ts
class Logger {
  static instance

  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  log(message: string) {
    console.log(message)
  }
}
```

Usage:

```ts
const logger1 = Logger.getInstance()
const logger2 = Logger.getInstance()

console.log(logger1 === logger2) // true
```

Why:

- single logging system across app

---

# Simple Mental Model

Ask:

> Does this object open or maintain connections?

If yes → Singleton is usually a good idea.

If no → Singleton is optional.

---

# Best Practice by Stack

| Stack | What should be singleton? |
|---|---|
| Prisma | Prisma client |
| Drizzle + pg | Pool |
| Kysely + pg/mysql2 | Pool |
| Mongoose | Connection |
| Redis | Client |
| SQLite | Usually singleton for consistency |

---

# Rule of thumb

Shared, expensive, long-lived resource = good singleton candidate.

The pattern survives even if you switch away from Prisma.

Only the object you singleton changes.