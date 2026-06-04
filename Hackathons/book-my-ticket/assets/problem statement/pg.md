# PostgreSQL Setup Commands (Seat Booking + Auth Project)

Follow these commands step-by-step to prepare your database.

---

## 1. Open PostgreSQL

```bash
psql -U postgres
```

You should see:

```
postgres=#
```

---

## 2. Create Database

```sql
CREATE DATABASE sql_class_2_db;
```

---

## 3. Switch to Database

```sql
\c sql_class_2_db
```

---

## 4. Create Users Table

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);
```

---

## 5. Create Seats Table

```sql
CREATE TABLE IF NOT EXISTS seats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  isbooked INT DEFAULT 0
);
```

---

## 6. Create Bookings Table

```sql
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  seat_id INT UNIQUE
);
```

---

## 7. Insert Seats

```sql
INSERT INTO seats (isbooked)
SELECT 0 FROM generate_series(1, 20)
WHERE NOT EXISTS (SELECT 1 FROM seats LIMIT 1);
```

---

## 8. Verify Data (Optional)

```sql
SELECT * FROM users;
SELECT * FROM seats;
SELECT * FROM bookings;
```

You should see:

* 20 seats
* empty users & bookings

---

## 9. Exit PostgreSQL

```sql
\q
```

---

## 10. Run Backend Server

```bash
node index.mjs
```

---

## 11. Open Application

```
http://localhost:8080
```

---

# 🔥 Full Copy-Paste Version

```sql
CREATE DATABASE sql_class_2_db;
\c sql_class_2_db

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS seats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  isbooked INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  seat_id INT UNIQUE
);

INSERT INTO seats (isbooked)
SELECT 0 FROM generate_series(1, 20)
WHERE NOT EXISTS (SELECT 1 FROM seats LIMIT 1);

SELECT * FROM seats;
```

---

## ✅ What This Sets Up

* 👤 Users table (for login/register)
* 🎟 Seats table (20 seats)
* 🔗 Bookings table (linked to users)
* 🚫 Prevents duplicate bookings (UNIQUE seat_id)

---