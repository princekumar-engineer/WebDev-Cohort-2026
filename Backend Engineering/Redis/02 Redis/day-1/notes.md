# 📘 Redis – Chapter 1 (Day 1)

## 1️⃣ What is Redis?

**Redis** stands for **REmote DIctionary Server**.

At its core:

- Redis is an **in-memory data store**
- Data is primarily stored in **RAM**
- Extremely **fast** (microseconds latency)
- Key → Value based, but values can be **advanced data structures**
- Can optionally persist data to disk

👉 Think of Redis as:

> "A super-fast in-memory database for temporary or frequently accessed data."

```txt
                    Redis
                       │
       ┌───────────────┼───────────────┐
       │               │               │
       ▼               ▼               ▼

    String          Queue          Stack

 username        emailQueue      undoStack
    │                │               │
    ▼                ▼               ▼

 "john"       user1,user2      ACTION_1
                              ACTION_2
```

---

## 2️⃣ Why do we even need Redis?

Let's start with a real backend problem 👇

### ❌ Problem without Redis

```txt
┌────────┐      ┌─────────┐      ┌────────────┐
│ Client │ ───► │ Backend │ ───► │ Database   │
└────────┘      └─────────┘      └────────────┘
     ▲                                 │
     └──────── Response ◄──────────────┘
```

Every request:

- Hits the database
- Database performs disk I/O
- Slower response times
- High traffic creates DB bottlenecks 💥

Example:

- Fetch user profile
- Fetch product list
- Fetch leaderboard
- Fetch dashboard stats

Same queries... again and again.

---

### ✅ Solution with Redis

```txt
                    ┌─────────┐
                    │ Redis   │
                    │ Cache   │
                    └────┬────┘
                         │
                    Cache Miss
                         │
                         ▼
┌────────┐      ┌─────────┐      ┌────────────┐
│ Client │ ───► │ Backend │ ───► │ Database   │
└────────┘      └─────────┘      └────────────┘
     ▲                │
     └────────────────┘
        Fast Response
```

Flow:

1. Backend checks Redis
2. If data exists → return immediately (**Cache Hit**)
3. If data doesn't exist → fetch from DB (**Cache Miss**)
4. Store result in Redis
5. Return response

### Cache Hit vs Cache Miss

```txt
Request
   │
   ▼
Check Redis
   │
   ├── Found? YES ──► Return Data ⚡
   │
   └── Found? NO
          │
          ▼
      Query DB
          │
          ▼
   Store in Redis
          │
          ▼
      Return Data
```

Redis:

- Stores frequently accessed data
- Serves data without hitting DB
- Reduces DB load
- Improves response time massively

📌 **Key Idea**

> Redis is used when speed matters more than repeatedly querying the database.

---

## 3️⃣ What exact problems does Redis solve?

### 1. Caching

- User profiles
- API responses
- Database query results
- Computed results

### 2. Rate Limiting

- Limit login attempts
- Prevent API abuse
- Protect public APIs

### 3. Queues

- Background jobs
- Email sending
- Notification processing

### 4. Real-Time Data

- Live counters
- Online users
- Leaderboards

### 5. Temporary Storage

- OTPs
- Verification tokens
- Password reset links

---

## 4️⃣ Why Redis is fast?

✅ Data stored in RAM

✅ Single-threaded command execution

✅ Optimized internal data structures

✅ Lightweight network protocol

✅ No expensive disk reads for most operations

```txt
                Speed Comparison

      RAM Access           Disk Access

         ⚡                    🐢

      Microseconds       Milliseconds
```

> Redis prioritizes speed, but it can also persist data to disk when configured.

---

## 5️⃣ Redis vs Traditional Database

| Feature | Redis | SQL / MongoDB |
|----------|--------|---------------|
| Storage | RAM | Disk |
| Speed | ⚡ Extremely Fast | Slower |
| Use Case | Cache, Queue, Real-Time | Persistent Data |
| Data Size | Usually Smaller | Large Datasets |
| Durability | Optional | Strong |
| Queries | Limited | Powerful |

👉 Redis **does NOT replace your database**

👉 Redis **works alongside your database**

### Common Architecture

```txt
                 ┌────────────┐
                 │ Database   │
                 └─────▲──────┘
                       │
                       │
                 ┌─────┴──────┐
                 │  Backend   │
                 └─────▲──────┘
                       │
                 ┌─────┴──────┐
                 │   Redis    │
                 └─────▲──────┘
                       │
                 ┌─────┴──────┐
                 │   Client   │
                 └────────────┘
```

---

## 6️⃣ Services like Redis

You'll mention this briefly (no deep dive today):

- Redis Cloud
- AWS ElastiCache
- Azure Cache for Redis
- Upstash ✅

---

## 7️⃣ Why Upstash Redis?

You don't want Docker today 👇

Upstash provides:

- Serverless Redis
- No infrastructure management
- Works perfectly with Node.js
- Generous free tier
- REST API + Redis protocol support

---

## 8️⃣ Setting up Upstash Redis

### Step 1: Create Redis Database

1. Go to **upstash.com**
2. Create an account
3. Create a Redis database
4. Copy:

```env
REDIS_URL=your_url
REDIS_TOKEN=your_token
```

---

## 9️⃣ Connecting Redis in Node.js (No Docker)

### Install Client

```bash
npm install @upstash/redis
```

### Create Redis Client

```js
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});
```

### Test Connection

```js
await redis.set("test", "Redis Connected");

const value = await redis.get("test");

console.log(value);
```

Output:

```txt
Redis Connected
```

---

# 🔑 Redis Data Types (Today's Focus)

We'll cover:

1. String
2. Queue
3. Stack

---

## 1️⃣ Redis String

The most basic Redis data type.

### Visual Representation

```txt
┌──────────┬───────────────┐
│ Key      │ Value         │
├──────────┼───────────────┤
│ username │ codesnippet   │
└──────────┴───────────────┘
```

### Set a value

```js
await redis.set("username", "codesnippet");
```

### Get a value

```js
const user = await redis.get("username");

console.log(user);
```

Output:

```txt
codesnippet
```

### Update a value

```js
await redis.set("username", "john");
```

### Delete a value

```js
await redis.del("username");
```

### Set with Expiry (TTL)

```js
await redis.set("otp", "123456", {
  ex: 60,
});
```

### TTL Visualization

```txt
SET otp = 123456

0 sec   → Exists ✅
30 sec  → Exists ✅
60 sec  → Expired ❌
61 sec  → Removed ❌
```

### Use Cases

- User cache
- OTPs
- Verification tokens
- Session data

---

## 2️⃣ Redis as a Queue (FIFO)

Queue = **First In First Out**

Redis uses **Lists** internally.

### Queue Visualization

```txt
Front                            Rear
  │                                │
  ▼                                ▼

┌───────┬───────┬───────┐
│ User1 │ User2 │ User3 │
└───────┴───────┴───────┘

LPOP removes User1 first
```

### Push into Queue

```js
await redis.rpush("emailQueue", "user1@gmail.com");
await redis.rpush("emailQueue", "user2@gmail.com");
await redis.rpush("emailQueue", "user3@gmail.com");
```

### Consume from Queue

```js
const email = await redis.lpop("emailQueue");

console.log(email);
```

Output:

```txt
user1@gmail.com
```

### Queue Flow

```txt
┌──────────┐      ┌────────────┐      ┌──────────┐
│ Producer │ ───► │ Redis List │ ───► │ Consumer │
└──────────┘      └────────────┘      └──────────┘
```

### Use Cases

- Email jobs
- Background processing
- Notifications
- Order processing

---

## 3️⃣ Redis as a Stack (LIFO)

Stack = **Last In First Out**

Redis also uses **Lists** internally.

### Stack Visualization

```txt
      Top
       │
       ▼

┌──────────┐
│ ACTION_3 │
├──────────┤
│ ACTION_2 │
├──────────┤
│ ACTION_1 │
└──────────┘

LPOP removes ACTION_3 first
```

### Push to Stack

```js
await redis.lpush("undoStack", "ACTION_1");
await redis.lpush("undoStack", "ACTION_2");
await redis.lpush("undoStack", "ACTION_3");
```

### Pop from Stack

```js
const action = await redis.lpop("undoStack");

console.log(action);
```

Output:

```txt
ACTION_3
```

### Use Cases

- Undo / Redo
- Browser history
- Recent activity tracking

---

## 🧠 Mental Model (Very Important)

```txt
                    REDIS

        ┌───────────────────────────┐
        │                           │
        ▼                           ▼

      String                     List

   Key → Value           ┌───────────────┐
                         │               │
                         ▼               ▼

                      Queue           Stack
                      FIFO            LIFO

                   RPUSH+LPOP      LPUSH+LPOP
```

| Structure | Redis Commands | Order |
|------------|----------------|--------|
| String | SET / GET | Single Value |
| Queue | RPUSH + LPOP | FIFO |
| Stack | LPUSH + LPOP | LIFO |

---

## 📌 End of Day-1 Summary

✅ What Redis is

✅ Why Redis exists

✅ Problems Redis solves

✅ Why Redis is fast

✅ Redis vs Traditional Database

✅ Upstash Redis setup

✅ Connecting Redis in Node.js

✅ Redis Strings

✅ Redis Queue (FIFO)

✅ Redis Stack (LIFO)

---

## 🎯 Key Takeaway

Redis is not a replacement for your primary database.

Think of it as a **high-speed layer sitting in front of your database** that helps your application:

- Respond faster
- Handle more traffic
- Reduce database load
- Store temporary and real-time data efficiently

> Use a database for permanent storage. Use Redis when speed matters.