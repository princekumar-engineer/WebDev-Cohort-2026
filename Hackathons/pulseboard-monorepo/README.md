# 🚀 PulseBoard Monorepo

Full-stack real-time polling platform built with:

* React + Vite frontend
* Node.js + Express backend
* MongoDB database
* Socket.IO real-time updates
* Dockerized monorepo architecture

---

# 📁 Monorepo Structure

```txt
pulseboard-monorepo/
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── Dockerfile
│   ├── .env
│   └── package.json
│
├── docker-compose.yml
├── package.json
└── README.md
```

---

# 🛠️ Tech Stack

| Layer            | Technology               |
| ---------------- | ------------------------ |
| Frontend         | React, Vite, TailwindCSS |
| Backend          | Node.js, Express.js      |
| Database         | MongoDB                  |
| Real-time        | Socket.IO                |
| Containerization | Docker                   |
| Authentication   | JWT                      |

---

# ⚙️ Environment Setup

## Frontend Environment

Create:

```txt
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## Backend Environment

Create:

```txt
backend/.env
```

Add:

```env
PORT=5000

MONGO_URI=mongodb://mongodb:27017/pulseboard

JWT_SECRET=supersecret

CLIENT_URL=http://localhost:5173
```

---

# 🐳 Docker Setup

## Frontend Dockerfile

Create:

```txt
frontend/Dockerfile
```

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
```

---

## Backend Dockerfile

Create:

```txt
backend/Dockerfile
```

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
```

---

# 📦 Docker Compose

Create:

```txt
docker-compose.yml
```

```yaml
version: "3.9"

services:
  mongodb:
    image: mongo:7
    container_name: pulseboard-mongodb
    restart: always

    ports:
      - "27017:27017"

    environment:
      MONGO_INITDB_DATABASE: pulseboard

    volumes:
      - mongodb_data:/data/db

    networks:
      - pulseboard-network

  backend:
    build:
      context: ./backend

    container_name: pulseboard-backend
    restart: always

    ports:
      - "5000:5000"

    env_file:
      - ./backend/.env

    volumes:
      - ./backend:/app
      - /app/node_modules

    depends_on:
      - mongodb

    networks:
      - pulseboard-network

  frontend:
    build:
      context: ./frontend

    container_name: pulseboard-frontend
    restart: always

    ports:
      - "5173:5173"

    env_file:
      - ./frontend/.env

    volumes:
      - ./frontend:/app
      - /app/node_modules

    depends_on:
      - backend

    networks:
      - pulseboard-network

volumes:
  mongodb_data:

networks:
  pulseboard-network:
```

---

# 📦 Root Package.json

```json
{
  "name": "pulseboard-monorepo",
  "version": "1.0.0",
  "private": true,
  "description": "PulseBoard Full Stack Polling Platform",
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix backend\" \"npm run dev --prefix frontend\"",
    "backend": "npm run dev --prefix backend",
    "frontend": "npm run dev --prefix frontend",
    "docker:up": "docker compose up -d",
    "docker:down": "docker compose down",
    "docker:logs": "docker compose logs -f"
  },
  "keywords": [
    "mern",
    "polling-app",
    "socketio",
    "monorepo"
  ],
  "license": "ISC",
  "devDependencies": {
    "concurrently": "^9.2.1"
  }
}
```

---

# ▶️ Local Development

## Install Root Dependencies

```bash
npm install
```

---

## Run Frontend + Backend Together

```bash
npm run dev
```

---

# 🐳 Docker Commands

| Command               | Purpose              |
| --------------------- | -------------------- |
| `npm run docker:up`   | Start all containers |
| `npm run docker:down` | Stop containers      |
| `npm run docker:logs` | View container logs  |

---

# 🚀 Start Full Application

## Build & Start Containers

```bash
docker compose up --build
```

---

# 🌐 Application URLs

| Service     | URL                         |
| ----------- | --------------------------- |
| Frontend    | `http://localhost:5173`     |
| Backend API | `http://localhost:5000`     |
| MongoDB     | `mongodb://localhost:27017` |

---

# 🔌 Frontend API Setup

## Axios Configuration

```txt
frontend/src/lib/axios.js
```

```js
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

export default api;
```

---

# ⚡ Socket.IO Setup

```txt
frontend/src/lib/socket.js
```

```js
import { io } from "socket.io-client";

const socket = io(
  import.meta.env.VITE_SOCKET_URL
);

export default socket;
```

---

# 📌 Important Notes

## MongoDB Connection

Inside Docker containers use:

```env
mongodb://mongodb:27017/pulseboard
```

Do not use:

```env
localhost
```

because Docker containers communicate using service names.

---

## Vite Host Configuration

Frontend Dockerfile uses:

```dockerfile
CMD ["npm", "run", "dev", "--", "--host"]
```

This allows Vite to be accessible outside the container.

---

# 🔄 System Flow

```txt
Frontend (5173)
       ↓
Backend API (5000)
       ↓
MongoDB (27017)
```

---

# ✅ Monorepo Status

| Module             | Status  |
| ------------------ | ------- |
| Frontend           | ✅ Ready |
| Backend            | ✅ Ready |
| MongoDB            | ✅ Ready |
| Docker Setup       | ✅ Ready |
| Socket.IO          | ✅ Ready |
| JWT Authentication | ✅ Ready |

---

# ✅ Conclusion

PulseBoard monorepo provides a complete production-style full-stack architecture with:

* React frontend
* Express backend
* MongoDB database
* Socket.IO real-time updates
* Dockerized development workflow
* Monorepo project management

Everything runs together using a single command.
