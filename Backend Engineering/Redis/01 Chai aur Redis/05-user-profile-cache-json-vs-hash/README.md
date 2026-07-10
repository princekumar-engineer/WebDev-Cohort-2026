# 05-User-profile-in-Redis Json-vs-Hash

## Video Link

<p align="center"> <a href="https://youtu.be/MFnK1PRABDU"> <img src="https://img.youtube.com/vi/MFnK1PRABDU/maxresdefault.jpg" alt="Watch the video on YouTube" width="100%"> </a> </p>

---

Just one thing:

This line is valid:

```js
await redis.hset(`user:${userId}:hash`, userData);
```

As long as `userData` is a flat object like:

```json
{
  "name": "PRINCE",
  "age": "22"
}
```

If nested objects exist, Redis hash won’t store them properly.

---

## API Testing

---

# 1. Store User as JSON

**POST**

```text
http://localhost:3000/user/1/json
```

Body:

```json
{
  "name": "PRINCE",
  "email": "prince@example.com",
  "age": 22
}
```

cURL:

```bash
curl -X POST http://localhost:3000/user/1/json \
-H "Content-Type: application/json" \
-d '{"name":"PRINCE","email":"prince@example.com","age":22}'
```

Response:

```json
{
  "status": "success",
  "message": "User data cached as JSON"
}
```

---

# 2. Get User JSON

**GET**

```text
http://localhost:3000/user/1/json
```

cURL:

```bash
curl http://localhost:3000/user/1/json
```

Response:

```json
{
  "status": "success",
  "data": {
    "name": "PRINCE",
    "email": "prince@example.com",
    "age": 22
  }
}
```

---

# 3. Store User as Hash

**POST**

```text
http://localhost:3000/user/1/hash
```

Body:

```json
{
  "name": "PRINCE",
  "email": "prince@example.com",
  "age": "22"
}
```

(cast numbers as strings if you want exact Redis hash behavior)

cURL:

```bash
curl -X POST http://localhost:3000/user/1/hash \
-H "Content-Type: application/json" \
-d '{"name":"PRINCE","email":"prince@example.com","age":"22"}'
```

Response:

```json
{
  "status": "success",
  "message": "User data cached as Hash"
}
```

---

# 4. Get User Hash

**GET**

```text
http://localhost:3000/user/1/hash
```

cURL:

```bash
curl http://localhost:3000/user/1/hash
```

Response:

```json
{
  "status": "success",
  "data": {
    "name": "PRINCE",
    "email": "prince@example.com",
    "age": "22"
  }
}
```

---

## Difference you'll notice

### JSON (`SET/GET`)

Stored like:

```json
{
  "name":"PRINCE",
  "email":"prince@example.com",
  "age":22
}
```

Single string.

---

### Hash (`HSET/HGETALL`)

Stored like:

```text
name → PRINCE
email → prince@example.com
age → 22
```

Field-wise storage.

Best test flow:

1. POST `/json`
2. GET `/json`
3. POST `/hash`
4. GET `/hash`

This shows the storage difference clearly.
