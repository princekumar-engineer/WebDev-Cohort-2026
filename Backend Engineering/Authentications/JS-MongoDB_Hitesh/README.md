# 🚀 Backend Cohort Project (Auth System)

A Node.js backend project with authentication using JWT, MongoDB, Docker, and Express.

---

## 📦 Tech Stack

* Node.js
* Express.js
* MongoDB (Docker)
* Mongoose
* JWT (Access & Refresh Tokens)
* Bcrypt (Password hashing)
* Nodemailer (Mailtrap for testing)

---

## 📁 Project Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd backend-cohort
```

---

### 2. Install Dependencies

```bash
npm install
```

---

## 🐳 Docker Setup (MongoDB)

This project uses Docker to run MongoDB.

### Start Database

```bash
npm run db:up
```

### Stop Database

```bash
npm run db:down
```

### Reset Database (if facing errors)

```bash
npm run db:down
docker volume rm backend-cohort_mongo_data
npm run db:up
```

---

## ⚙️ Environment Variables

Create a `.env` file in root:

```env
PORT=4000
NODE_ENV=development

MONGODB_URI=mongodb://admin:password@127.0.0.1:27017/cohort?authSource=admin

JWT_ACCESS_SECRET=your_access_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d

SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_user
SMTP_PASS=your_pass
SMTP_FROM_NAME=YourApp
SMTP_FROM_EMAIL=noreply@yourapp.com

CLIENT_URL=http://localhost:4000
```

---

## ▶️ Running the Server

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

Server runs on:

```
http://localhost:4000
```

---

## 🔐 Authentication Flow

* Register user
* Login user
* Generate Access Token (short-lived)
* Generate Refresh Token (long-lived)
* Protected routes using JWT middleware

---

## 📬 API Testing (Postman)

### Base URL

```
http://localhost:4000
```

---

### 🔹 Register

**POST** `/api/auth/register`

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}
```

---

### 🔹 Login

**POST** `/api/auth/login`

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

---

### 🔹 Protected Route Example

Add header:

```
Authorization: Bearer <your_access_token>
```

---

## 🧪 Mail Testing (Mailtrap)

Emails are sent using Mailtrap.

* Login to Mailtrap
* Check inbox for test emails

---

## ⚠️ Common Issues & Fixes

### ❌ MongoDB Authentication Failed

```bash
npm run db:down
docker volume rm backend-cohort_mongo_data
npm run db:up
```

---

### ❌ Server not connecting

* Check Docker is running
* Verify `.env` variables
* Ensure correct MongoDB URI

---

### ❌ Wrong Port

Make sure you're using:

```
http://localhost:4000
```

---

## 🧼 Best Practices

* Use `.env` for secrets
* Always start Docker before backend
* Reset DB volume when debugging
* Test APIs using Postman
* Never commit `.env` file

---

## 📌 Scripts

```bash
npm run dev      # Start with nodemon
npm start        # Start server
npm run db:up    # Start MongoDB (Docker)
npm run db:down  # Stop MongoDB
```

---

