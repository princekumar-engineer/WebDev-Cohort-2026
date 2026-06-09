# ⚛️ Chapter 09 — Understanding SSR (Server Side Rendering) & “Create Your Next.js”

---

# 🚀 Moving Beyond Static Generation

In the previous chapter:

* React generated static HTML at build time
* files were stored inside `dist/`
* HTML was pre-generated before deployment

That approach was called:

```txt id="d2x8hf"
SSG (Static Site Generation)
```

Now we move into something even more powerful:

```txt id="r8f1pk"
SSR (Server Side Rendering)
```

This chapter explains:

* how servers render React dynamically
* how Next.js works internally
* how React renders HTML on request
* how backend + React connect together

---

# 🌍 What is SSR?

> SSR (Server Side Rendering) means rendering React on the server for every request.

Instead of generating HTML during build time:

```txt id="j9v0az"
HTML is generated dynamically
when user visits the page
```

---

# ⚡ CSR vs SSG vs SSR

| Type | Rendering Time  | Rendering Place |
| ---- | --------------- | --------------- |
| CSR  | After page load | Browser         |
| SSG  | Build time      | Build process   |
| SSR  | Request time    | Server          |

---

# 🧠 Why SSR Exists

Some applications need:

* dynamic user data
* SEO
* faster first load
* real-time content
* personalized pages

Static generation is not always enough.

---

# 🌍 Real Examples of SSR

SSR is commonly used in:

* ecommerce websites
* dashboards
* news websites
* social media platforms
* authenticated applications

---

# ⚛️ “Create Your Next.js”

This chapter teaches the core idea behind:

Next.js

before using the actual framework.

---

# 🧠 What Next.js Does Internally

At a high level:

```txt id="u8k4lm"
User Request
      ↓
Server Receives Request
      ↓
React Renders HTML
      ↓
HTML Sent To Browser
```

This project recreates that architecture manually.

---

# 📁 Project Structure

```txt id="m5r2xa"
project/
│
├── server.js
├── package.json
└── src/
    └── App.js
```

---

# 📦 Required Dependencies

```json id="s7q1vr"
"dependencies": {
  "express": "^5.2.1",
  "react": "^19.2.6",
  "react-dom": "^19.2.6"
}
```

---

# 📌 Understanding Dependencies

| Dependency         | Purpose               |
| ------------------ | --------------------- |
| `express`          | Node.js web server    |
| `react`            | UI creation           |
| `react-dom`        | React rendering       |
| `react-dom/server` | server-side rendering |

---

# ⚡ Why Express is Used

Express helps create:

```txt id="j3f8pc"
Backend HTTP Server
```

It handles:

* routes
* requests
* responses
* middleware
* APIs

---

# 🌍 Understanding server.js

# 📄 server.js

```js
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "./src/App.js";

const app = express();
```

---

# 🧠 What This Imports

| Import           | Purpose                |
| ---------------- | ---------------------- |
| `express`        | create server          |
| `React`          | create React elements  |
| `ReactDOMServer` | render React on server |
| `App`            | React component        |

---

# ⚡ Creating Express App

```js
const app = express();
```

This creates:

```txt id="n8k4vy"
Express Server Instance
```

---

# 📌 Basic Route

```js
app.get("/", (req, res) => {
  res.send("hello world");
});
```

---

# 🧠 What Happens Here

When user visits:

```txt id="m4z9ja"
http://localhost:3000/
```

Express sends:

```txt id="k8x1bw"
hello world
```

---

# ⚛️ SSR Route

```js
app.get("/chaicode", (req, res) => {
```

This route demonstrates:

```txt id="q2f6rs"
Server Side Rendering
```

---

# ⚡ Rendering React on Server

```js
const appHtml =
  ReactDOMServer.renderToString(
    React.createElement(App)
  );
```

---

# 🧠 What renderToString() Does

It converts React components into:

```txt id="x5r1mv"
HTML String
```

on the server.

---

# 🌳 Internal SSR Flow

```txt id="v0z7xt"
React Component
        ↓
ReactDOMServer.renderToString()
        ↓
HTML Generated
        ↓
Server Sends HTML
```

---

# 📌 Why React.createElement() Again?

This chapter intentionally uses:

```txt id="k4b9wd"
React.createElement()
```

to understand:

```txt id="a8x0lf"
What JSX becomes internally
```

Remember:

```txt id="u6r5ke"
JSX
   ↓
Babel
   ↓
React.createElement()
```

---

# 📄 App.js

```js
import React from "react";

export default function App() {
  return React.createElement(
    "div",
    { style: { color: "orange" } },

    React.createElement(
      "h1",
      null,
      "Hello World!"
    ),
  );
}
```

---

# 🧠 App Component Flow

```txt id="g5m3zy"
App Component
      ↓
React.createElement()
      ↓
Virtual React Elements
      ↓
renderToString()
      ↓
HTML String
```

---

# 📌 Sending HTML Response

```js
res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
</head>
<body>
  <div id="root">${appHtml}</div>
</body>
</html>
`);
```

---

# 🧠 What Happens Here

The server injects:

```txt id="d7q8wn"
Rendered React HTML
```

inside:

```html
<div id="root"></div>
```

before sending response to browser.

---

# ⚡ Browser Receives Ready HTML

Unlike CSR:

```txt id="v7x6jn"
Browser does NOT need to build UI first
```

The page already contains rendered HTML.

---

# 🌍 Complete SSR Flow

```txt id="w1x7pf"
Browser Requests /chaicode
            ↓
Express Server Receives Request
            ↓
ReactDOMServer Renders App
            ↓
HTML String Generated
            ↓
HTML Injected Into Template
            ↓
Server Sends HTML Response
            ↓
Browser Displays Page
```

---

# 🧠 Visual SSR Architecture

```txt id="n9c4ht"
┌───────────────┐
│    Browser    │
└──────┬────────┘
       │ Request
       ↓
┌───────────────┐
│ Express Server│
└──────┬────────┘
       │
       ↓
┌───────────────┐
│ React App     │
│ renderToString│
└──────┬────────┘
       │
       ↓
┌───────────────┐
│ HTML Generated│
└──────┬────────┘
       │ Response
       ↓
┌───────────────┐
│    Browser    │
└───────────────┘
```

---

# ⚡ Starting the Server

```js
app.listen(3000, () => {
  console.log(
    "Server is running on http://localhost:3000"
  );
});
```

---

# 📌 What app.listen() Does

This starts the Node.js server on:

```txt id="u4v8bn"
Port 3000
```

---

# 🚀 Running the Application

Start server:

```bash id="z5g3lp"
node server.js
```

Visit:

```txt id="x1n8cz"
http://localhost:3000/chaicode
```

---

# ⚡ SSR vs SSG

| Feature           | SSR         | SSG            |
| ----------------- | ----------- | -------------- |
| HTML Generation   | Per request | Build time     |
| Speed             | Fast        | Extremely fast |
| Dynamic Data      | Excellent   | Limited        |
| SEO               | Strong      | Strong         |
| Server Needed     | Yes         | Minimal        |
| Real-time Content | Yes         | Harder         |

---

# ⚛️ How Next.js Works Internally

Next.js internally performs:

```txt id="m6z2wy"
Receive Request
       ↓
Find Route
       ↓
Fetch Data
       ↓
Render React On Server
       ↓
Generate HTML
       ↓
Send HTML To Browser
       ↓
Hydrate React On Client
```

This project recreates the core SSR idea manually.

---

# 🧠 Important Concept — Hydration

After browser receives server HTML:

```txt id="p8v5nh"
React attaches event listeners
and becomes interactive
```

This process is called:

```txt id="g9m4sk"
Hydration
```

---

# ⚡ SSR + Hydration Flow

```txt id="b3r8kx"
Server Generates HTML
          ↓
Browser Displays Page
          ↓
JavaScript Loads
          ↓
React Hydrates App
          ↓
Page Becomes Interactive
```

---

# 🌍 Why Next.js Became Popular

Because it combines:

```txt id="z2k1vt"
SSR
 +
SSG
 +
Routing
 +
Optimization
 +
Backend APIs
```

inside one framework.

---

# 🧠 Behind The Scenes Goal

This chapter teaches:

```txt id="j4y6nr"
How Next.js Actually Works Internally
```

instead of treating frameworks like magic.

---

# ⚡ Evolution of React Rendering

```txt id="e8m1fc"
React CSR
      ↓
Static Site Generation
      ↓
Server Side Rendering
      ↓
Modern Frameworks (Next.js)
```

---

# 📌 Final HTML Sent To Browser

The browser receives:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
</head>

<body>
  <div id="root">
    <div style="color:orange">
      <h1>Hello World!</h1>
    </div>
  </div>
</body>
</html>
```

before React even runs in the browser.

---

# 🧠 What You Learned

✅ What is SSR

✅ Difference between CSR, SSG, SSR

✅ Express server basics

✅ ReactDOMServer basics

✅ renderToString()

✅ Server-side React rendering

✅ HTML response generation

✅ How Next.js works internally

✅ Hydration concept

✅ SSR architecture

✅ React rendering evolution

✅ Backend + React integration

---
