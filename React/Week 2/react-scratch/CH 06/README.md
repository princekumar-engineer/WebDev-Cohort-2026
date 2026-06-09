# ⚡ Chapter 6 — Vite & Modern React Tooling

---

# 🚀 Moving From CDN to Modern React Development

In previous chapters:

* React was loaded using CDN
* Babel converted JSX in browser
* everything lived inside HTML files

This works for learning, but modern applications need:

* faster development
* modular files
* optimized builds
* scalable architecture
* instant reloads

To solve this, modern React apps use:

```txt id="mkj2h8"
Vite
```

Vite

---

# ⚡ What is Vite?

> Vite is a modern frontend build tool and development server.

Vite focuses on:

* speed
* simplicity
* modern JavaScript tooling

---

# 🧠 Why Vite Became Popular

Older tools like:

* Webpack
* CRA (Create React App)

became slower as projects grew.

Problems included:

```txt id="7h4xg9"
Slow startup
Slow rebuilds
Heavy bundling
Complex configuration
```

Vite solved this using:

```txt id="pm3m0y"
Native ES Modules
        +
Fast Dev Server
        +
Modern Build Tools
```

---

# 👨‍💻 Little Story Behind Vite

Evan You

Vite was created by Evan You, the creator of:

Vue.js

While working on Vue projects, he noticed traditional bundlers were becoming slow for modern development.

He wanted:

```txt id="fc8i6o"
Instant Server Start
        +
Fast Hot Reload
        +
Simpler Tooling
```

So he built:

```txt id="g1o5gn"
Vite
```

The word "Vite" means:

```txt id="4qgm0g"
"Fast" in French
```

---

# ⚛️ What is Vite Made Of?

Vite internally uses:

| Tool              | Purpose                              |
| ----------------- | ------------------------------------ |
| Native ES Modules | Fast development                     |
| esbuild           | Extremely fast dependency processing |
| Rollup            | Production bundling                  |
| Plugins           | Framework support                    |

---

# ⚡ Vite Architecture

```txt id="4nv1v9"
Browser
   ↓
Vite Dev Server
   ↓
ES Modules
   ↓
React Plugin
   ↓
JSX Transformation
   ↓
Browser Rendering
```

---

# 🔌 Plugin-Based Architecture

One of Vite’s biggest strengths is:

```txt id="0m8d8m"
Plugin-Based Architecture
```

---

# 🧩 What Does That Mean?

Vite itself is lightweight.

Features are added using plugins.

Examples:

| Plugin            | Purpose              |
| ----------------- | -------------------- |
| React Plugin      | JSX & React support  |
| Vue Plugin        | Vue support          |
| TypeScript Plugin | TS support           |
| PWA Plugin        | Progressive Web Apps |

---

# ⚛️ React Plugin

This package:

```json id="k9m8l3"
"@vitejs/plugin-react"
```

adds:

* JSX support
* Fast Refresh
* React optimization
* Babel integration

---

# 🔥 JSX as a Toolchain

JSX is not directly understood by browsers.

Modern React workflow:

```txt id="c56n2f"
JSX
   ↓
Vite
   ↓
React Plugin
   ↓
Babel / esbuild
   ↓
Browser-Compatible JavaScript
```

---

# 🧠 Earlier Workflow vs Modern Workflow

## Earlier Chapters

```txt id="nxt3i4"
Browser
   ↓
Babel CDN
   ↓
Compile JSX at Runtime
```

---

## Modern Vite Workflow

```txt id="zjlwm9"
Development Time
      ↓
Vite Compiles JSX
      ↓
Browser Receives Optimized JS
```

This is much faster.

---

# 📁 Project Structure

```txt id="q0w7px"
project/
│
├── index.html
├── package.json
└── src/
    ├── App.jsx
    └── index.jsx
```

---

# 📄 package.json

```json id="z7rjql"
{
  "name": "07",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite"
  },
  "type": "module",
  "dependencies": {
    "react": "^19.2.6",
    "react-dom": "^19.2.6"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^6.0.1",
    "vite": "^8.0.11"
  }
}
```

---

# 📌 Understanding package.json

This file manages:

* project metadata
* dependencies
* scripts
* tooling configuration

---

# 📦 Dependencies

```json id="h0jlwm"
"react": "^19.2.6",
"react-dom": "^19.2.6"
```

These are runtime libraries used by the application.

---

# 🛠️ Dev Dependencies

```json id="2u9m1j"
"vite": "^8.0.11",
"@vitejs/plugin-react": "^6.0.1"
```

These are development tools.

They help during development but are not shipped directly to users.

---

# ▶️ Running the Project

```bash id="q4t4v3"
npm run dev
```

This starts:

```txt id="yyx9yq"
Vite Development Server
```

---

# 📄 index.html

```html id="7t7h1n"
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>react the Chai way</title>

    <style>
      body {
        background-color: #121212;
        color: #ffffff;
      }
    </style>
  </head>

  <body>
    <div id="root"></div>

    <script type="module" src="./src/index.jsx"></script>
  </body>
</html>
```

---

# 📌 Important Modern Change

```html id="tk0e70"
<script type="module">
```

This enables:

```txt id="f9n65n"
ES Modules
```

Modern JavaScript import/export system.

---

# 📄 App.jsx

```jsx id="m3i0yc"
export function App() {
  return (
    <div>
      <h1>My App</h1>
    </div>
  );
}
```

---

# 🧩 Understanding export

```js id="6jlwm7"
export function App()
```

This allows other files to use the component.

---

# 📄 index.jsx

```jsx id="mdhzh2"
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(<App />);
```

---

# 📌 Understanding import

```js id="zjlwm4"
import { App } from "./App.jsx";
```

This imports the `App` component from another file.

---

# ⚛️ Modern React File Separation

Instead of putting everything in one HTML file:

```txt id="0v9gib"
HTML
JS
Components
Styles
```

are separated into modules.

This improves:

* scalability
* readability
* maintenance

---

# 🌳 Rendering Flow

```txt id="8qjlwm"
Browser Loads index.html
          ↓
Loads index.jsx
          ↓
Imports React Libraries
          ↓
Imports App Component
          ↓
Vite Processes JSX
          ↓
React Creates Virtual DOM
          ↓
ReactDOM Updates Real DOM
          ↓
UI Appears on Screen
```

---

# ⚡ React Fast Refresh

Vite supports:

```txt id="wjlwm8"
Fast Refresh
```

When code changes:

```txt id="3u2rbo"
Only changed components reload
```

without refreshing the entire page.

This makes development much faster.

---

# 🚀 Why Vite Feels Fast

Vite avoids bundling the entire app during development.

Instead:

```txt id="fdm3gm"
Serve Files On Demand
```

This dramatically improves startup speed.

---

# 🆚 Babel CDN vs Vite

| Babel CDN              | Vite                         |
| ---------------------- | ---------------------------- |
| Browser compiles JSX   | Vite compiles before browser |
| Slower                 | Extremely fast               |
| Good for learning      | Production-ready             |
| Everything inside HTML | Modular architecture         |
| Limited scalability    | Large-scale applications     |

---

# 🧠 Internal Modern React Toolchain

```txt id="vjlwm2"
React Components
        ↓
JSX
        ↓
Vite
        ↓
React Plugin
        ↓
esbuild/Babel
        ↓
Optimized JavaScript
        ↓
Browser
```

---

# 📌 Final UI Output

```txt id="5jlwm6"
My App
```

---

# 🧠 What You Learned

✅ What is Vite

✅ Why Vite became popular

✅ Plugin-based architecture

✅ JSX toolchain

✅ What Vite is made of

✅ Modern React project structure

✅ ES Modules

✅ import/export system

✅ React rendering flow

✅ Fast Refresh

---