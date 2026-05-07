# 🗄️ MongoDB + Docker Setup Guide

This project uses **MongoDB running inside Docker** for database management and data storage.

---

## 📦 Database Overview

* Database: MongoDB
* Containerized using Docker
* Default DB name: `cohort`
* Default port: `27017`

---

## 📦 Tech Stack

* MongoDB (v8)
* Docker & Docker Compose
* Mongosh (CLI)
* Optional: MongoDB Compass / VS Code Extension

---

## 🐳 Docker Configuration

MongoDB is defined in `docker-compose.yml`:

```yaml
version: "3.9"

services:
  mongodb:
    image: mongo:8.0
    container_name: mongodb
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

---

## ▶️ Running MongoDB

### Start Database

```bash
docker compose up -d
# or
npm run db:up
```

---

### Stop Database

```bash
docker compose down
# or
npm run db:down
```

---

### Reset Database (Delete all data)

```bash
docker compose down -v
docker compose up -d
```

---

### Check Running Container

```bash
docker ps
```

---

## 🔗 Database Connection

Use this connection string:

```env
MONGODB_URI=mongodb://admin:password@127.0.0.1:27017/cohort?authSource=admin
```

---

## 🔗 Connection String (Generic)

```bash
mongodb://admin:password@127.0.0.1:27017/?authSource=admin
```

---

## 🧑‍💻 Connect via Mongosh

```bash
docker exec -it mongodb mongosh -u admin -p password --authenticationDatabase admin
```

---

## 🔍 Accessing Database

### 1. Using VS Code

* Install MongoDB extension
* Connect using:

```bash
mongodb://admin:password@127.0.0.1:27017/?authSource=admin
```

---

### 2. Using Mongo Shell (CLI)

```bash
docker exec -it mongodb mongosh -u admin -p password --authenticationDatabase admin
```

Commands:

```js
show dbs
use cohort
show collections
db.users.find().pretty()
```

---

### 3. Using MongoDB Compass (GUI)

Connect with:

```bash
mongodb://admin:password@localhost:27017/?authSource=admin
```

---

## 📂 Basic Commands

### Use Database

```js
use cohort
```

---

### Show Databases

```js
show dbs
```

---

### Show Collections

```js
show collections
```

---

## ➕ Insert Data

```js
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  password: "123456"
})
```

---

## 🔍 Read Data

```js
db.users.find().pretty()
```

---

## ❌ Delete Data

```js
db.users.deleteOne({ email: "john@example.com" })
```

---

## 📁 Common Collections

* `users` → stores user data
* `tokens` → (optional) refresh/reset tokens

---

## 🧪 Verifying Data

After API calls:

### Register User

```js
db.users.find()
```

---

### Delete User

```js
db.users.deleteOne({ email: "test@gmail.com" })
```

---

### Delete All Users

```js
db.users.deleteMany({})
```

---

## 🧹 Reset Database (Important)

If you face issues like:

* authentication failed
* duplicate data
* corrupted DB

Run:

```bash
npm run db:down
docker volume rm backend-cohort_mongo_data
npm run db:up
```

👉 This deletes all database data and recreates MongoDB.

---

## 🧪 Debugging

### 🔍 Check MongoDB is running

```bash
docker ps
```

---

### 🔍 Check Port Usage (Windows)

```bash
netstat -ano | findstr :27017
```

---

### 🔍 Identify Process

```bash
tasklist | findstr <PID>
```

---

## 💣 Kill Process (IMPORTANT)

If multiple MongoDB instances are running:

### 👉 Using Command Prompt (CMD)

```bash
taskkill /PID <PID> /F
```

---

### 👉 Using PowerShell

```bash
Stop-Process -Id <PID> -Force
```

---

### 👉 Example

```bash
taskkill /PID 26160 /F
```

---

## 🛑 Disable Local MongoDB (Permanent Fix)

1. Press Win + R
2. Type: `services.msc`
3. Find MongoDB
4. Stop it
5. Set Startup Type → Disabled

---

## ⚠️ Common Errors & Fixes

### ❌ Authentication Failed

**Causes:**

* Wrong credentials
* Wrong authSource
* Old Docker volume

**Fix:**

```bash
docker compose down -v
docker compose up -d
```

OR

```bash
docker volume rm backend-cohort_mongo_data
```

---

### ❌ Multiple MongoDB Instances

**Cause:**

* Local MongoDB + Docker both running

**Fix:**

* Kill process (`taskkill`)
* Disable local MongoDB service

---

### ❌ Cannot Connect to DB

**Cause:**

* Container not running

**Fix:**

```bash
docker compose up -d
# or
npm run db:up
```

---

### ❌ No Data Found

* Ensure API was called (e.g., register)
* Verify correct DB (`cohort`)

---

## 💡 Best Practices

* Use Docker only (avoid local MongoDB conflicts)
* Always use `authSource=admin`
* Always use `.env` for connection string
* Do not store plain passwords (use hashing)
* Never commit database credentials
* Reset DB when debugging issues
* Use GUI tools (Compass / VS Code) for inspection

---

## 🔐 Security Notes

* Default credentials are for development only
* Do NOT use `admin/password` in production
* Use strong passwords in real applications

---

## 🧠 Rule to Remember

Always ensure you are connecting to the correct MongoDB instance, port, and authentication setup.

---

## ✅ Summary

* MongoDB runs via Docker
* Connection via `MONGODB_URI`
* Data persists in Docker volume
* Reset DB by deleting volume
* Avoid multiple MongoDB instances
* Use mongosh or GUI tools
* Kill conflicting processes when needed

---

## 🚀 You're Ready!

You can now:

* Run MongoDB
* Connect to it
* Insert & query data
* Inspect data
* Debug backend issues
* Build backend applications

---

## 🔥 Next Steps (Optional)

* Add Node.js + Mongoose setup
* Implement User Authentication (Signup/Login)
* Convert this into a Full Backend Starter Template
