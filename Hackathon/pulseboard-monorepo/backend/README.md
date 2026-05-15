# 🚀 PulseBoard Backend Documentation

## Overview

PulseBoard is a scalable real-time polling backend built with the MERN ecosystem.
It supports:

* Public & private polls
* Anonymous & authenticated voting
* Real-time analytics
* Live Socket.IO updates
* Poll expiration management
* Poll result publishing
* Dynamic MongoDB aggregation pipelines
* Docker-based development workflow

---

# 🛠️ Backend Tech Stack

| Technology    | Purpose                 |
| ------------- | ----------------------- |
| Node.js       | JavaScript runtime      |
| Express.js    | Backend framework       |
| MongoDB       | NoSQL database          |
| Mongoose      | MongoDB ODM             |
| JWT           | Authentication          |
| Socket.IO     | Real-time communication |
| Docker        | Containerization        |
| bcryptjs      | Password hashing        |
| cookie-parser | Cookie handling         |
| cors          | Cross-origin requests   |
| helmet        | Security headers        |
| morgan        | API request logging     |

---

# 📁 Backend Folder Structure

```txt id="7m2x8q"
backend/
├── src/
│
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   │   └── socket.js
│
│   ├── controllers/
│   │   ├── analyticsController.js
│   │   ├── authController.js
│   │   ├── pollController.js
│   │   └── responseController.js
│
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── optionalAuthMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validateMiddleware.js
│
│   ├── models/
│   │   ├── Poll.js
│   │   ├── Response.js
│   │   └── User.js
│
│   ├── routes/
│   │   ├── analyticsRoutes.js
│   │   ├── authRoutes.js
│   │   ├── pollRoutes.js
│   │   └── responseRoutes.js
│
│   ├── services/
│   │   ├── pollService.js
│   │   └── responseService.js
│
│   ├── socket/
│   │   ├── analyticsSocket.js
│   │   └── pollSocket.js
│
│   ├── utils/
│   │   ├── aggregateAnalytics.js
│   │   ├── checkPollExpiry.js
│   │   ├── generateToken.js
│   │   └── getAnonymousIdentifier.js
│
│   ├── validation/
│   │   ├── authValidation.js
│   │   ├── pollValidation.js
│   │   └── responseValidation.js
│
│   ├── app.js
│   └── server.js
│
├── Dockerfile
├── package.json
└── .env
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the backend directory.

## Example

```env id="0ehmyh"
PORT=5000

MONGO_URI=mongodb://localhost:27017/pulseboard

JWT_SECRET=your_jwt_secret

NODE_ENV=development
```

---

# 📦 Installation

## Clone Repository

```bash id="db3dkg"
git clone <repository_url>
```

```bash id="vblz6s"
cd pulseboard-monorepo
```

---

## Install Dependencies

```bash id="h7a6lf"
npm install
```

---

# 🐳 Docker Setup

## Start Containers

```bash id="d5kn44"
npm run docker:up
```

## Stop Containers

```bash id="mjlxeh"
npm run docker:down
```

---

# ▶️ Running The Backend

## Development Mode

```bash id="0b9a9s"
npm run dev
```

## Production Mode

```bash id="gq7eiu"
npm start
```

---

# 🌐 Base API URL

```txt id="knv9d2"
http://localhost:5000/api
```

---

# 🔐 Authentication System

## Features

* JWT-based authentication
* HTTP-only cookie support
* Protected route handling
* Optional authentication middleware
* Anonymous participation support

---

# 🔄 Authentication Flow

```txt id="4m8x1q"
Frontend
   ↓
POST /api/auth/login
   ↓
Backend validates credentials
   ↓
JWT generated
   ↓
HTTP-only cookie set
   ↓
Browser stores cookie automatically
```

---

# 🔑 Authentication Routes

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| POST   | `/api/auth/register` | Register new user              |
| POST   | `/api/auth/login`    | Login user                     |
| POST   | `/api/auth/logout`   | Logout user                    |
| GET    | `/api/auth/me`       | Get current authenticated user |

---

# 👤 Authentication APIs

## Register User

### Endpoint

```http id="a8o1ep"
POST /api/auth/register
```

### Request Body

```json id="4cynd1"
{
  "name": "Prince Kumar",
  "email": "prince@example.com",
  "password": "123456"
}
```

---

## Login User

### Endpoint

```http id="u8r79i"
POST /api/auth/login
```

### Request Body

```json id="3l2tbm"
{
  "email": "prince@example.com",
  "password": "123456"
}
```

---

# 🗳️ Poll System

## Features

* Create polls
* Update polls
* Delete polls
* Publish poll results
* Poll expiry validation
* Anonymous voting
* Authenticated-only voting
* Required questions
* Multiple-choice options

---

# 📌 Poll Routes

| Method | Endpoint                 | Description                  |
| ------ | ------------------------ | ---------------------------- |
| POST   | `/api/polls`             | Create poll                  |
| GET    | `/api/polls/my-polls`    | Get authenticated user polls |
| GET    | `/api/polls/:id`         | Get poll by ID               |
| PATCH  | `/api/polls/:id`         | Update poll                  |
| DELETE | `/api/polls/:id`         | Delete poll                  |
| PATCH  | `/api/polls/:id/publish` | Publish poll results         |

---

# 📝 Create Poll API

## Endpoint

```http id="a9q24d"
POST /api/polls
```

## Headers

```txt id="pkvq0w"
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

## Request Body

```json id="j1e9g3"
{
  "title": "Favorite Frontend Framework",
  "description": "Vote your favorite frontend framework",
  "allow_anonymous": true,
  "requires_auth": false,
  "expiry_time": "2026-12-31T00:00:00.000Z",
  "questions": [
    {
      "question_text": "Which framework do you use most?",
      "is_required": true,
      "options": [
        {
          "option_text": "React"
        },
        {
          "option_text": "Vue"
        },
        {
          "option_text": "Angular"
        }
      ]
    }
  ]
}
```

---

# 📥 Get Poll API

## Endpoint

```http id="1w6vlv"
GET /api/polls/:id
```

---

# ✏️ Update Poll API

## Endpoint

```http id="m6q4m2"
PATCH /api/polls/:id
```

## Headers

```txt id="o3efl2"
Authorization: Bearer YOUR_JWT_TOKEN
```

## Request Body

```json id="j1e9ge3"
{
  "title": "Updated Poll Title"
}
```

---

# ❌ Delete Poll API

## Endpoint

```http id="ttv0qf"
DELETE /api/polls/:id
```

## Important

Only the poll creator can delete the poll.

---

# 📢 Publish Poll Results API

## Endpoint

```http id="zic2bf"
PATCH /api/polls/:id/publish
```

---

# 📝 Response System

## Features

* Anonymous responses
* Authenticated responses
* Duplicate response prevention
* Required question validation
* Poll expiry validation
* Option validation

---

# 📮 Response Route

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| POST   | `/api/responses/:pollId` | Submit poll response |

---

# 📤 Submit Response API

## Endpoint

```http id="9w8bhz"
POST /api/responses/:pollId
```

## Headers

```txt id="o3efl2"
Authorization: Bearer YOUR_JWT_TOKEN
```

## Request Body

```json id="g3ch3j"
{
  "answers": [
    {
      "question_id": "QUESTION_ID",
      "selected_option_id": "OPTION_ID"
    }
  ]
}
```

---

# 🧠 MongoDB ID Structure

PulseBoard uses multiple MongoDB document IDs internally.

| ID Type     | Purpose             |
| ----------- | ------------------- |
| User ID     | Account owner       |
| Poll ID     | Entire poll         |
| Question ID | Individual question |
| Option ID   | Selected option     |
| Response ID | Stored response     |

---

# 📌 Important ID Rule

Every MongoDB document has its own unique:

```txt id="rule"
_id
```

---

# 🧠 ID Relationship Structure

```txt id="flow"
User
 └── Poll
      └── Questions
           └── Options
```

---

# 📌 Poll ID

Returned after creating a poll.

## Example

```json id="pollid"
"poll": {
  "_id": "6a025667736d87736381405c"
}
```

## Used In

```txt id="pollapi"
GET    /api/polls/:id
PATCH  /api/polls/:id
DELETE /api/polls/:id
POST   /api/responses/:pollId
GET    /api/analytics/:pollId
```

---

# 📌 Question ID

Returned inside:

```http id="getpoll"
GET /api/polls/:id
```

## Example

```json id="questionexample"
"questions": [
  {
    "_id": "QUESTION_ID"
  }
]
```

---

# 📌 Option ID

Returned inside question options.

## Example

```json id="optionexample"
"options": [
  {
    "_id": "OPTION_ID"
  }
]
```

---

# ⚠️ Common Mistake

Incorrect:

```json id="mistake"
"creator": "USER_ID"
```

Correct:

```json id="difference"
"_id": "POLL_ID"
```

These are different IDs and should not be mixed.

---

# 📊 Analytics System

## Features

* Real-time analytics
* Vote percentage calculations
* Total response counts
* Public analytics sharing
* Live Socket.IO updates

---

# 📈 Analytics Routes

| Method | Endpoint                                | Description             |
| ------ | --------------------------------------- | ----------------------- |
| GET    | `/api/analytics/:pollId`                | Get poll analytics      |
| GET    | `/api/analytics/:pollId/public-results` | Get public poll results |

---

# 📡 Real-Time Socket.IO System

## Features

* Live analytics updates
* Poll room subscriptions
* Real-time broadcasts
* Room-based communication architecture

---

# ⚡ Socket Events

| Event                   | Description               |
| ----------------------- | ------------------------- |
| `join_poll_room`        | Join poll room            |
| `leave_poll_room`       | Leave poll room           |
| `live_analytics_update` | Receive analytics updates |

---

# 🔌 Socket.IO Usage

## Join Poll Room

```js id="20d4v9"
socket.emit("join_poll", pollId);
```

---

## Listen For Analytics Updates

```js id="7zcv8m"
socket.on("live_analytics_update", (data) => {
  console.log(data);
});
```

---

# 🗄️ Database Models

## User Model

| Field    | Type   |
| -------- | ------ |
| name     | String |
| email    | String |
| password | String |
| role     | String |

---

## Poll Model

| Field           | Type     |
| --------------- | -------- |
| creator         | ObjectId |
| title           | String   |
| description     | String   |
| allow_anonymous | Boolean  |
| requires_auth   | Boolean  |
| is_published    | Boolean  |
| expiry_time     | Date     |
| questions       | Array    |

---

## Response Model

| Field                | Type     |
| -------------------- | -------- |
| poll_id              | ObjectId |
| respondent_id        | ObjectId |
| anonymous_identifier | String   |
| answers              | Array    |

---

# 🧩 Middleware System

| Middleware             | Purpose                              |
| ---------------------- | ------------------------------------ |
| authMiddleware         | Protected route handling             |
| optionalAuthMiddleware | Public + authenticated route support |
| errorMiddleware        | Global error handling                |
| validateMiddleware     | Request validation                   |

---

# ✅ Validation System

| Validation File    | Purpose                     |
| ------------------ | --------------------------- |
| authValidation     | Login/Register validation   |
| pollValidation     | Poll request validation     |
| responseValidation | Response request validation |

---

# 🛠️ Utility Functions

| Utility                | Purpose                     |
| ---------------------- | --------------------------- |
| aggregateAnalytics     | Analytics aggregation       |
| checkPollExpiry        | Poll expiry validation      |
| generateToken          | JWT token generation        |
| getAnonymousIdentifier | Anonymous response tracking |

---

# 🔒 Security Features

| Feature              | Status |
| -------------------- | ------ |
| JWT Authentication   | ✅      |
| HTTP-only Cookies    | ✅      |
| Password Hashing     | ✅      |
| Protected Routes     | ✅      |
| Duplicate Prevention | ✅      |
| Helmet Security      | ✅      |
| CORS Handling        | ✅      |

---

# 🚨 Common API Errors

## Unauthorized

```json id="prkly6"
{
  "success": false,
  "message": "Unauthorized"
}
```

---

## Poll Not Found

```json id="efy6wt"
{
  "success": false,
  "message": "Poll not found"
}
```

---

## Duplicate Response

```json id="upzyzu"
{
  "success": false,
  "message": "You have already submitted a response to this poll"
}
```

---

## Poll Expired

```json id="c2vlgr"
{
  "success": false,
  "message": "This poll has expired and is no longer accepting responses"
}
```

---

# 🧪 Recommended API Testing Flow

```txt id="p11hsf"
Register
   ↓
Login
   ↓
Create Poll
   ↓
Get Poll
   ↓
Save:
   - POLL_ID
   - QUESTION_ID
   - OPTION_ID
   ↓
Submit Response
   ↓
Get Analytics
   ↓
Publish Results
   ↓
Get Public Results
   ↓
Delete Poll
```

---

# 🐳 Docker Support

## Features

* MongoDB container setup
* Backend container setup
* Docker Compose support
* Monorepo-ready architecture

---

# 📦 Current Backend Status

| Module         | Status     |
| -------------- | ---------- |
| Authentication | ✅ Complete |
| Poll CRUD      | ✅ Complete |
| Responses      | ✅ Complete |
| Analytics      | ✅ Complete |
| Socket.IO      | ✅ Complete |
| Validation     | ✅ Complete |
| MongoDB        | ✅ Complete |
| Docker         | ✅ Complete |

---

# 🚀 Future Improvements

## Authentication

| Feature                   | Status |
| ------------------------- | ------ |
| Refresh Tokens            | Future |
| OAuth Login               | Future |
| Email Verification        | Future |
| Password Reset            | Future |
| Two-Factor Authentication | Future |

---

## Poll Features

| Feature                | Status |
| ---------------------- | ------ |
| Multi-select Questions | Future |
| Text Questions         | Future |
| Rating Questions       | Future |
| File Upload Questions  | Future |
| Poll Templates         | Future |
| Draft Polls            | Future |
| Scheduled Polls        | Future |

---

## Analytics Improvements

| Feature              | Status |
| -------------------- | ------ |
| Advanced Charts      | Future |
| Time-based Analytics | Future |
| Geographic Analytics | Future |
| CSV/PDF Export       | Future |
| AI Insights          | Future |

---

## Real-Time Improvements

| Feature           | Status |
| ----------------- | ------ |
| Live Vote Counts  | Future |
| Live Participants | Future |
| Typing Indicators | Future |
| Presence System   | Future |

---

## Security Improvements

| Feature               | Status |
| --------------------- | ------ |
| Rate Limiting         | Future |
| CAPTCHA Protection    | Future |
| IP Blocking           | Future |
| Device Fingerprinting | Future |
| CSRF Protection       | Future |

---
