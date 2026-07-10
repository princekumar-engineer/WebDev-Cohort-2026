# 04 Building a OTP verification with Redis

## Video Link

<p align="center"> <a href="https://youtu.be/MlxmA5_cc_Y"> <img src="https://img.youtube.com/vi/MlxmA5_cc_Y/maxresdefault.jpg" alt="Watch the video on YouTube" width="100%"> </a> </p>

---

Your OTP code looks correct. Only one small thing:

This line:

```js id="v0ig90"
await redis.set(otpKey(phone), otp, 'EX', 30);
```

is valid in ioredis.

Everything else is fine.

---

## API Testing

### 1. Generate OTP

**POST**

```text id="4cwl77"
http://localhost:3000/otp
```

Body:

```json id="qjq7e8"
{
  "phone": "9876543210"
}
```

cURL:

```bash id="jtr2u1"
curl -X POST http://localhost:3000/otp \
-H "Content-Type: application/json" \
-d '{"phone":"9876543210"}'
```

Expected:

```json id="2fdfgd"
{
  "message": "OTP sent successfully",
  "otp": "123456"
}
```

(OTP will be random)

---

### 2. Verify OTP

**POST**

```text id="x8ksrb"
http://localhost:3000/otp/verify
```

Body:

```json id="8x0c5s"
{
  "phone": "9876543210",
  "otp": "123456"
}
```

cURL:

```bash id="hsp2xy"
curl -X POST http://localhost:3000/otp/verify \
-H "Content-Type: application/json" \
-d '{"phone":"9876543210","otp":"123456"}'
```

Success:

```json id="0eh8wi"
{
  "message": "OTP verified successfully"
}
```

Wrong OTP:

```json id="7n9c4f"
{
  "message": "Invalid OTP"
}
```

Expired OTP:

```json id="kdf4k3"
{
  "message": "OTP expired or not found"
}
```

---

### 3. Check TTL

**GET**

```text id="w28q0d"
http://localhost:3000/otp/9876543210/ttl
```

cURL:

```bash id="prmk9d"
curl http://localhost:3000/otp/9876543210/ttl
```

Example:

```json id="b9zq1f"
{
  "ttl": 24
}
```

Meaning 24 seconds left.

Special values:

* `-2` → key not found
* `-1` → key exists but no expiry

---

### Testing flow:

1. POST `/otp`
2. Copy OTP from response
3. GET `/otp/:phone/ttl`
4. POST `/otp/verify`
5. Try verifying again → should fail (because you delete it after success)
