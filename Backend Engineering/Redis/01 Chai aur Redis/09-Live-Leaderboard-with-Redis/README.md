# 09 Live Leaderboard with Redis

## Video Link

<p align="center"> <a href="https://youtu.be/RTJMwBObHPE"> <img src="https://img.youtube.com/vi/RTJMwBObHPE/maxresdefault.jpg" alt="Watch the video on YouTube" width="100%"> </a> </p>

---

---
Your code is correct for testing **Redis counters and leaderboards**.

You are using:

```js
await redis.incr(`post:${id}:views`);
```

for counters.

And:

```js
await redis.zadd("leaderboard", score, userId);
```

for sorted leaderboard scores.

This is a very common real-world Redis pattern.

---

## Redis Commands Used

### Counter

```text
INCR
```

Used to increase views count.

Example:

```text
post:101:views = 1 → 2 → 3
```

---

### Sorted Set

```text
ZADD
ZREVRANGE
ZREVRANK
ZSCORE
```

Used for leaderboard.

Redis stores:

```text
userId -> score
```

Automatically sorted.

---

## API Testing

---

# 1. Increment Post Views

**POST**

```text
http://localhost:3000/post/101/views
```

cURL:

```bash
curl -X POST http://localhost:3000/post/101/views
```

First response:

```json
{
  "id": "101",
  "views": 1
}
```

Second request:

```json
{
  "id": "101",
  "views": 2
}
```

Third request:

```json
{
  "id": "101",
  "views": 3
}
```

Redis value:

```text
post:101:views → 3
```

---

# 2. Add Score to Leaderboard

**POST**

```text
http://localhost:3000/leaderboard/score
```

Body:

```json
{
  "userId": "PRINCE",
  "score": 120
}
```

cURL:

```bash
curl -X POST http://localhost:3000/leaderboard/score \
-H "Content-Type: application/json" \
-d '{"userId":"PRINCE","score":120}'
```

Response:

```json
{
  "message": "Score updated successfully",
  "userId": "PRINCE",
  "score": 120
}
```

---

Add more users:

```bash
curl -X POST http://localhost:3000/leaderboard/score \
-H "Content-Type: application/json" \
-d '{"userId":"RAHUL","score":200}'
```

```bash
curl -X POST http://localhost:3000/leaderboard/score \
-H "Content-Type: application/json" \
-d '{"userId":"AMAN","score":150}'
```

```bash
curl -X POST http://localhost:3000/leaderboard/score \
-H "Content-Type: application/json" \
-d '{"userId":"ROHIT","score":180}'
```

---

# 3. Get Top 10 Leaderboard

**GET**

```text
http://localhost:3000/leaderboard
```

cURL:

```bash
curl http://localhost:3000/leaderboard
```

Response:

```json
[
  {
    "rank": 1,
    "userId": "RAHUL",
    "score": 200
  },
  {
    "rank": 2,
    "userId": "ROHIT",
    "score": 180
  },
  {
    "rank": 3,
    "userId": "AMAN",
    "score": 150
  },
  {
    "rank": 4,
    "userId": "PRINCE",
    "score": 120
  }
]
```

Redis automatically sorts highest to lowest.

---

# 4. Get Specific User Rank

**GET**

```text
http://localhost:3000/leaderboard/PRINCE/rank
```

cURL:

```bash
curl http://localhost:3000/leaderboard/PRINCE/rank
```

Response:

```json
{
  "userId": "PRINCE",
  "rank": 4,
  "score": 120
}
```

---

If user not found:

```json
{
  "error": "User not found in leaderboard"
}
```

---

## Leaderboard Storage Example

Stored internally:

```text
PRINCE -> 120
RAHUL  -> 200
AMAN   -> 150
ROHIT  -> 180
```

Sorted:

```text
1. RAHUL  → 200
2. ROHIT  → 180
3. AMAN   → 150
4. PRINCE → 120
```

---

## Best Test Flow

1. POST `/post/101/views`
2. POST `/post/101/views`
3. POST `/post/101/views`
4. POST `/leaderboard/score`
5. Add multiple users
6. GET `/leaderboard`
7. GET `/leaderboard/PRINCE/rank`

This shows both **counter** and **leaderboard** behavior clearly.
