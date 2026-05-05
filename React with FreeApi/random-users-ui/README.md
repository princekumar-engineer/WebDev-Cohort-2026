# 👤 Random Users UI

### 🚀 React + API Project (Web Dev Cohort 2026)

---

## 🌐 Live Demo

🔗 https://your-live-link.vercel.app

## 📂 GitHub Repository

🔗 https://github.com/your-username/random-users-ui

---

## 🧠 Overview

This project is a **modern user profile interface** built using React.
It fetches random user data from a public API and displays it in a clean, responsive card-based layout.

The goal is to simulate a **real-world user directory UI** while practicing API integration and component-based architecture.

---

## 🎯 Objectives

* Fetch and display user data from an API
* Build a structured user card layout
* Design a clean and responsive UI
* Practice component-based architecture in React

---

## 🖼️ UI Preview

### 👤 User Cards

![Home](./screenshots/1%20.png)

---

## ⚙️ Tech Stack

| Technology        | Purpose                  |
| ----------------- | ------------------------ |
| React (Vite)      | Frontend framework       |
| JavaScript (ES6+) | Logic & state management |
| CSS               | Styling                  |
|Fetch API          | Data fetching            |

---

## 🌐 API Integration

**Endpoint Used:**

```id="api1"
https://api.freeapi.app/api/v1/public/randomusers
```

### 🔍 Response Structure (Simplified)

```id="api2"
{
  data: {
    data: [ users ]
  }
}
```

👉 Users accessed via:

```id="api3"
data.data.data
```

---


## 🧩 Component Architecture

```id="arch1"
App.jsx
 ├── Fetch API & manage state
 └── Render UserCard components

UserCard.jsx
 └── Display individual user details
```

---

## 🔄 Data Flow

```id="flow1"
API → fetch() → state update → re-render → UI display
```

---

## 📁 Folder Structure

```id="folder1"
src/
 ├── components/
 │    └── UserCard.jsx
 ├── App.jsx
 ├── main.jsx
 ├── styles.css
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```id="setup1"
git clone https://github.com/your-username/random-users-ui.git
```

### 2️⃣ Navigate to Project

```id="setup2"
cd random-users-ui
```

### 3️⃣ Install Dependencies

```id="setup3"
npm install
```

### 4️⃣ Run Development Server

```id="setup4"
npm run dev
```

### 5️⃣ Open in Browser

```id="setup5"
http://localhost:5173/
```

---

## 🚀 Deployment

This project is deployed using:

* Vercel


---

## 🎓 Learning Outcomes

* Understanding API integration in React
* Using React Hooks (`useState`, `useEffect`)
* Designing reusable UI components
* Managing asynchronous data
* Building responsive layouts

---

## 🤝 Contribution

This is an academic project, but contributions and suggestions are welcome.

---

## 📄 License

This project is created for educational purposes.

---

## 🙌 Acknowledgements

* FreeAPI for providing user data
* React & Vite for development tools

---
