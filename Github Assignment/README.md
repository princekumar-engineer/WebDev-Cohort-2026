````md id="ordered-assignment-readme"
# 🚀 Assignment Setup Guide

Follow the steps below to set up the project and run the assignments locally.

---

# 📦 Step 1: Clone the Repository

```bash
git clone <repository-url>
````

---

# 📂 Step 2: Move into the Project Folder

```bash
cd <project-folder>
```

---

# 📥 Step 3: Install Dependencies

```bash
npm install
```

---

# 🪟 Step 4: Windows Users Only

If you are using Windows, update the following script inside your `package.json` file.

## ❌ Replace This

```json
"test:watch": "NODE_OPTIONS=--experimental-vm-modules jest --watchAll"
```

## ✅ With This

```json
"test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
```

This fixes issues related to Jest and experimental VM modules on Windows systems.

---

# ▶️ Step 5: Run Assignment Tests

The following commands are tested and working ✅

## 🎫 Ticket Pricing

```bash
npm test -- ticket-pricing
```

---

## 🚦 Traffic Light

```bash
npm test -- traffic-light
```

---

## 📊 Grade Calculator

```bash
npm test -- grade-calculator
```

---

# 🛠 Tech Stack

* JavaScript
* Node.js
* Jest

---

# 📌 Notes

* Make sure Node.js is installed
* Run `npm install` before testing
* Use the exact test command names mentioned above
* Keep dependencies updated

---

# ☕ Happy Coding

Practice consistently, experiment with code, and keep building 🚀

```
```
