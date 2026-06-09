# ⚛️ Chapter 07 — Raw React & Backend API Server (Fastify + SQLite)

This React application uses a separate backend server built with:

```txt
Fastify
      +
SQLite
      +
promised-sqlite3
```

The backend provides all chai-related data through REST APIs.

---

# 📁 Full Project Structure

```txt
project/
│
├── apiserver/
│   ├── chai.sqlite
│   ├── package.json
│   └── server.js
│
├── CH_07/
│   ├── src/
│   ├── public/
│   ├── .env
│   ├── package.json
│   └── vite.config.js
```

---

# ⚡ Frontend + Backend Architecture

```txt
React UI
    ↓
fetch()
    ↓
Fastify API
    ↓
SQLite Database
    ↓
JSON Response
    ↓
React State Update
    ↓
UI Re-render
```

---

# 🚀 Starting The Backend

Move into the backend folder:

```bash
cd apiserver
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

# 📦 Backend Dependencies

```json
{
  "fastify": "^5.8.5",
  "promised-sqlite3": "^2.1.0",
  "pino-pretty": "^13.1.3",
  "@fastify/static": "^9.1.3"
}
```

---

# 📌 Backend Development Script

```json
{
  "scripts": {
    "dev": "node --watch server.js"
  }
}
```

Start server:

```bash
npm run dev
```

---

# 🌍 API Base URL

Backend runs on:

```txt
http://localhost:3000
```

Frontend environment file:

```env
VITE_API_URL=http://localhost:3000/api
```

---

# 📄 React Environment Variables

```env
VITE_API_URL=http://localhost:3000/api
```

Access inside React:

```jsx
fetch(`${import.meta.env.VITE_API_URL}/all-chai`)
```

---

# 🗄️ SQLite Database

Database file:

```txt
chai.sqlite
```

The database stores:

```txt
chai_types
chai_variants
orders
order_details
contacts
```

---

# 🌱 Seeding Database

The backend provides a special endpoint for creating and populating the database.

Endpoint:

```http
POST /api/seed
```

---

# 🚀 Seed Database

Using browser tools, Postman, or curl:

```bash
curl -X POST http://localhost:3000/api/seed
```

Successful response:

```json
{
  "success": "Database seeded successfully"
}
```

---

# 📊 Seeded Chai Data

The seed process creates sample chai types:

```txt
Masala Chai
Elaichi Chai
Adrak Chai
```

Each chai includes:

```txt
name
category
description
image
sizes
pricing
```

Example:

```json
{
  "id": 1,
  "name": "Masala Chai",
  "category": "Spiced"
}
```

---

# 📡 Available API Endpoints

## Welcome Route

```http
GET /api
```

Response:

```json
{
  "message": "Welcome to Chaicode"
}
```

---

## Get All Chai

```http
GET /api/all-chai
```

Used by:

```jsx
<ChaiMenu />
```

Returns:

```json
[
  {
    "id": 1,
    "name": "Masala Chai",
    "sizes": {
      "small": 20,
      "large": 35
    }
  }
]
```

---

## Get Special Chai

```http
GET /api/special-chai
```

Used by:

```jsx
useSpecialChai()
```

Returns a daily rotating chai recommendation.

---

## Get Orders

```http
GET /api/orders
```

Returns all order summaries.

---

## Get Single Order

```http
GET /api/order?id=1
```

Returns:

```txt
Order Information
Order Items
Total Cost
```

---

## Create Order

```http
POST /api/order
```

Example body:

```json
{
  "cart": [
    {
      "chai": {
        "id": 1
      },
      "size": "large"
    }
  ]
}
```

Response:

```json
{
  "orderId": 5
}
```

---

## Paginated Orders

```http
GET /api/past-orders?page=1
```

Returns 10 orders per page.

---

## Order Details

```http
GET /api/past-order/1
```

Returns complete order information with totals.

---

## Submit Contact Form

```http
POST /api/contact
```

Request:

```json
{
  "name": "John",
  "email": "john@example.com",
  "message": "Amazing chai!"
}
```

---

## View Contacts

```http
GET /api/contacts
```

Returns all submitted contact messages.

---

# ⚛️ React Data Fetching Flow

```txt
React Component Mounts
          ↓
useEffect Executes
          ↓
fetch() Sends Request
          ↓
Fastify Route Executes
          ↓
SQLite Query Runs
          ↓
JSON Response Returned
          ↓
setState Updates Data
          ↓
React Re-renders UI
```

---

# 🧩 Custom Hook + API Flow

```txt
App Component
      ↓
useSpecialChai()
      ↓
GET /api/special-chai
      ↓
Fastify
      ↓
SQLite
      ↓
JSON Response
      ↓
Hook Updates State
      ↓
Component Re-renders
```

---

# 🚀 Running The Complete Application

### Terminal 1 (Backend)

```bash
cd apiserver
npm install
npm run dev
```

### Seed Database (First Time Only)

```bash
curl -X POST http://localhost:3000/api/seed
```

### Terminal 2 (Frontend)

```bash
cd CH_07
npm install
npm run dev
```

---

# 🧠 What This Chapter Now Demonstrates

✅ React + Vite setup

✅ Environment Variables

✅ useState

✅ useEffect

✅ Custom Hooks

✅ API Fetching

✅ Conditional Rendering

✅ List Rendering

✅ Fastify Backend

✅ SQLite Database

✅ REST APIs

✅ Database Seeding

✅ Order Management APIs

✅ Contact Form APIs

✅ Frontend ↔ Backend Communication

✅ Modern Full-Stack React Workflow
