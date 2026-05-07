# 🗄️ Database (MongoDB + Docker) Guide

This project uses **MongoDB running inside Docker** for data storage.

---

## 📦 Database Overview

* Database: `MongoDB`
* Containerized using Docker
* Default DB name: `cohort`
* Default port: `27017`

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

## ▶️ Running the Database

### Start MongoDB

```bash
npm run db:up
```

---

### Stop MongoDB

```bash
npm run db:down
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

## ⚠️ Common Errors & Fixes

### ❌ Authentication Failed

* Cause: Old Docker volume with different credentials
* Fix:

  ```bash
  docker volume rm backend-cohort_mongo_data
  ```

---

### ❌ Cannot Connect to DB

* Check Docker:

  ```bash
  docker ps
  ```
* Start DB:

  ```bash
  npm run db:up
  ```

---

### ❌ No Data Found

* Ensure API was called (e.g., register)
* Verify correct DB (`cohort`)

---

## 💡 Best Practices

* Use Docker for consistent DB setup
* Always use `.env` for connection string
* Reset DB when debugging issues
* Never commit database credentials
* Use GUI tools (Compass/VS Code) for inspection

---

## 🔐 Security Notes

* Default credentials are for development only
* Do NOT use `admin/password` in production
* Use strong passwords in real applications

---

## ✅ Summary

* MongoDB runs via Docker
* Connection via `MONGODB_URI`
* Data persists in Docker volume
* Reset DB by deleting volume
* Use VS Code / Compass / CLI to inspect data

---

## 🚀 You're Ready!

You can now:

* run MongoDB
* connect to it
* inspect data
* debug backend issues
