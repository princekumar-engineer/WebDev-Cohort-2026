# 🚀 PulseBoard Frontend Documentation

## Overview

PulseBoard frontend is a modern real-time polling platform built with React, Vite, TailwindCSS, Recharts, and Socket.IO.

It supports:

* User authentication
* Public & private polls
* Real-time analytics
* Live Socket.IO updates
* Poll management
* Responsive dashboard
* Public poll sharing
* Poll expiration handling

---

# 🛠️ Tech Stack

| Technology       | Purpose           |
| ---------------- | ----------------- |
| React            | Frontend UI       |
| Vite             | Build Tool        |
| TailwindCSS      | Styling           |
| React Router DOM | Routing           |
| Axios            | API Requests      |
| Recharts         | Analytics Charts  |
| Socket.IO Client | Real-time Updates |
| Lucide React     | Icons             |

---

# 📁 Frontend Structure

```txt id="7m6cc7"
src/
│
├── components/
│   ├── charts/
│   ├── layout/
│   └── ui/
│
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── Dashboard.jsx
│   ├── CreatePollPage.jsx
│   ├── EditPollPage.jsx
│   ├── PollDetailsPage.jsx
│   ├── MyPollsPage.jsx
│   ├── PublicPollPage.jsx
│   ├── ResultsPage.jsx
│   ├── AnalyticsPage.jsx
│   ├── ProfilePage.jsx
│   ├── UnauthorizedPage.jsx
│   ├── ExpiredPollPage.jsx
│   └── SubmissionSuccessPage.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── services/
│   ├── authService.js
│   ├── pollService.js
│   ├── analyticsService.js
│   ├── responseService.js
│   └── publicService.js
│
├── lib/
│   ├── axios.js
│   └── socket.js
│
├── utils/
│   └── auth.js
│
├── App.jsx
└── main.jsx
```

---

# 📦 Installation

## Clone Repository

```bash id="frontend-clone"
git clone <your-frontend-repo-url>
```

```bash id="frontend-cd"
cd frontend
```

---

## Install Dependencies

```bash id="q4q8iy"
npm install
```

---

# ⚙️ Environment Variables

Create a `.env` file in the frontend directory.

```env id="frontend-env"
VITE_API_URL=http://localhost:5000/api
```

---

# ▶️ Run Development Server

```bash id="w6fd5w"
npm run dev
```

Frontend runs on:

```txt id="s7h9xt"
http://localhost:5173
```

---

# 🏗️ Production Build

| Command           | Purpose                  |
| ----------------- | ------------------------ |
| `npm run build`   | Create production build  |
| `npm run preview` | Preview production build |

---

# 🌐 Backend Connection

Frontend expects backend API running at:

```txt id="backend-api"
http://localhost:5000/api
```

Update `VITE_API_URL` if backend URL changes.

---

# 🔐 Authentication

## Features

* JWT authentication
* Protected routes
* Persistent login state
* Public & private route handling

## Token Storage

```js id="token-storage"
localStorage
```

---

# 🗺️ Application Routes

| Page         | Route                      |
| ------------ | -------------------------- |
| Landing Page | `/`                        |
| Register     | `/register`                |
| Login        | `/login`                   |
| Dashboard    | `/dashboard`               |
| Create Poll  | `/polls/create`            |
| My Polls     | `/polls`                   |
| Poll Details | `/polls/:pollId`           |
| Edit Poll    | `/polls/:pollId/edit`      |
| Analytics    | `/polls/:pollId/analytics` |
| Public Poll  | `/p/:pollId`               |
| Results      | `/p/:pollId/results`       |
| Success Page | `/p/:pollId/success`       |
| Expired Poll | `/p/:pollId/expired`       |
| Profile      | `/profile`                 |
| Unauthorized | `/unauthorized`            |
| 404 Page     | `*`                        |

---

# 📊 Real-time Analytics

Socket.IO powers:

* Live analytics updates
* Instant response tracking
* Real-time dashboard updates

## Socket Setup

```js id="socket-setup"
src/lib/socket.js
```

---

# 📈 Charts & Analytics

Analytics dashboards use:

| Chart Type       | Library  |
| ---------------- | -------- |
| Line Chart       | Recharts |
| Pie Chart        | Recharts |
| Analytics Graphs | Recharts |

---

# 📄 Main Pages

| Page         | Purpose                  |
| ------------ | ------------------------ |
| Login        | User authentication      |
| Register     | Account creation         |
| Dashboard    | Main analytics dashboard |
| Create Poll  | Poll creation            |
| Edit Poll    | Poll editing             |
| Poll Details | Poll management          |
| Public Poll  | Public voting            |
| Analytics    | Real-time analytics      |
| Results      | Public results           |
| Profile      | User profile/settings    |

---

# 🔌 API Service Layer

| Service          | Purpose             |
| ---------------- | ------------------- |
| authService      | Authentication APIs |
| pollService      | Poll CRUD APIs      |
| analyticsService | Analytics APIs      |
| responseService  | Poll responses      |
| publicService    | Public poll APIs    |

---

# 🧩 Core Frontend Modules

| Module                 | Purpose                |
| ---------------------- | ---------------------- |
| `lib/axios.js`         | Axios configuration    |
| `lib/socket.js`        | Socket.IO client       |
| `routes/AppRoutes.jsx` | Application routing    |
| `utils/auth.js`        | Authentication helpers |

---

# 🛡️ Frontend Features

| Feature             | Status |
| ------------------- | ------ |
| Authentication      | ✅      |
| Protected Routes    | ✅      |
| Poll Management     | ✅      |
| Public Voting       | ✅      |
| Analytics Dashboard | ✅      |
| Responsive UI       | ✅      |
| Socket.IO Updates   | ✅      |


---

## Build Command

```bash id="frontend-build"
npm run build
```

## Output Directory

```txt id="frontend-dist"
dist
```

---

# ✅ Frontend Status

| Module                | Status     |
| --------------------- | ---------- |
| Authentication UI     | ✅ Complete |
| Poll Management       | ✅ Complete |
| Public Voting         | ✅ Complete |
| Analytics Dashboard   | ✅ Complete |
| Socket.IO Integration | ✅ Complete |
| Routing System        | ✅ Complete |
| Responsive Design     | ✅ Complete |

---

# ✅ Conclusion

PulseBoard frontend provides a scalable and modern React architecture supporting:

* Real-time polling
* Public & private participation
* Dynamic analytics dashboards
* Live Socket.IO updates
* Responsive user experience
* Production-ready frontend structure

The frontend is fully prepared for backend integration, deployment, and future scaling.
