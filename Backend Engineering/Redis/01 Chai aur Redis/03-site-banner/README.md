# 03 Site Banner APIs with Redis

## Video Link

<p align="center"> <a href="https://youtu.be/kYeDJhA4XIw"> <img src="https://img.youtube.com/vi/kYeDJhA4XIw/maxresdefault.jpg" alt="Watch the video on YouTube" width="100%"> </a> </p> 

---


---

# API testing URLs:

---

## 1. Create/Update Banner

**POST**

```text
http://localhost:3000/banner
```

Body (JSON):

```json
{
  "message": "Big Sale! 50% OFF"
}
```

cURL:

```bash
curl -X POST http://localhost:3000/banner \
-H "Content-Type: application/json" \
-d '{"message":"Big Sale! 50% OFF"}'
```

Expected:

```json
{
  "success": true
}
```

---

## 2. Get Banner

**GET**

```text
http://localhost:3000/banner
```

cURL:

```bash
curl http://localhost:3000/banner
```

Expected:

```json
{
  "message": "Big Sale! 50% OFF"
}
```

If nothing exists:

```json
{
  "message": null
}
```

---

## 3. Check if Banner Exists

**GET**

```text
http://localhost:3000/banner/exists
```

cURL:

```bash
curl http://localhost:3000/banner/exists
```

Expected:

```json
{
  "exists": true
}
```

After delete:

```json
{
  "exists": false
}
```

---

## 4. Delete Banner

**DELETE**

```text
http://localhost:3000/banner
```

cURL:

```bash
curl -X DELETE http://localhost:3000/banner
```

Expected:

```json
{
  "success": true
}
```

---

Flow to test:

1. POST banner
2. GET banner
3. GET exists
4. DELETE banner
5. GET exists again

That verifies `SET`, `GET`, `DEL`, and `EXISTS` in Redis.
