# ⚛️ Chapter 2 — React With CDN

---

# 🌍 Before React Build Tools

Before tools like:

* Vite
* Webpack
* Next.js

developers often used libraries directly through CDN links.

Examples:

* Bootstrap CDN
* jQuery CDN
* React CDN

---

# 📦 What is CDN?

> CDN (Content Delivery Network) allows us to use libraries directly from the internet without downloading them.

---

## Example

### Bootstrap CDN

Bootstrap

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
```

---

### jQuery CDN

jQuery

```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
```

---

### React CDN

React

```html
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>

<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

---

# 🤔 Why Learn React Through CDN First?

Using CDN helps understand:

* how React works internally
* how rendering happens
* what ReactDOM does
* what root element means
* how React creates UI without build tools

It also helps compare React with traditional JavaScript.

---

# 🧠 Traditional JavaScript vs React

## Traditional JavaScript

```js
const root = document.getElementById("root");
root.innerHTML = "<h1>Hello</h1>";
```

Problems:

* manual DOM updates
* difficult UI management
* repeated code
* hard scalability

---

## React Approach

```js
React.createElement()
```

React creates UI using components and virtual DOM.

---

# 📁 Project Structure

```txt id="7jff14"
project/
│
├── index.html
└── src/
    └── App.js
```

---

# 📄 index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Learn React</title>

    <style>
      body {
        background-color: #333;
        color: #fff;
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 50px;
      }
    </style>
  </head>

  <body>
    <h1>Learn React</h1>

    <div id="root">this is classic root</div>

    <!-- React CDN -->
    <!--
    <script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>

    <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
    -->

    <script type="module" src="./src/App.js"></script>
  </body>
</html>
```

---

# 📄 App.js

```js
import React from "https://esm.sh/react@19.0.0";
import ReactDOM from "https://esm.sh/react-dom@19.0.0/client";

const App = () => {
  return React.createElement(
    "div",
    {
      className: "container",
    },
    React.createElement("h1", null, "Hello, React!"),
  );
};

const container = document.getElementById("root");

const root = ReactDOM.createRoot(container);

root.render(React.createElement(App));
```

---

# 🔥 Understanding the Flow

```txt id="44fv96"
Browser loads HTML
        ↓
Finds #root div
        ↓
Loads App.js
        ↓
React creates virtual elements
        ↓
ReactDOM connects React to browser DOM
        ↓
root.render() displays UI
```

---

# 🧩 Understanding Each Part

---

## 📌 Root Element

```html
<div id="root">this is classic root</div>
```

This is the container where React will inject the UI.

---

## 📌 Import React

```js
import React from "https://esm.sh/react@19.0.0";
```

This imports the React library.

React helps create UI elements and components.

---

## 📌 Import ReactDOM

```js
import ReactDOM from "https://esm.sh/react-dom@19.0.0/client";
```

ReactDOM connects React with the browser DOM.

Without ReactDOM, React cannot display content in the browser.

---

# ⚛️ Creating Component

```js
const App = () => {
  return React.createElement(...);
};
```

This is a React component.

Components are reusable UI blocks.

---

# 🧱 React.createElement()

```js
React.createElement(
  "div",
  {
    className: "container",
  },
  React.createElement("h1", null, "Hello, React!")
);
```

---

## Structure

```txt id="3q7n4l"
React.createElement(
    tag,
    properties,
    children
)
```

---

## Meaning

| Part              | Purpose       |
| ----------------- | ------------- |
| `"div"`           | HTML element  |
| `className`       | CSS class     |
| `"h1"`            | child element |
| `"Hello, React!"` | text content  |

---

# 🌳 Virtual DOM Creation

React first creates a virtual representation of UI.

```txt id="ahx1l7"
Virtual DOM
    ↓
Compare Changes
    ↓
Update Real DOM Efficiently
```

This makes React fast.

---

# 📌 Selecting Container

```js
const container = document.getElementById("root");
```

React finds the root div from HTML.

---

# 📌 Creating React Root

```js
const root = ReactDOM.createRoot(container);
```

This creates a React rendering root.

React 18 introduced:

* `createRoot()`
* concurrent rendering improvements
* better performance

---

# 📌 Rendering UI

```js
root.render(React.createElement(App));
```

This tells React:

```txt id="trmb9c"
Render App component inside #root
```

---

# 🧠 Complete Internal Flow

```txt id="k9pnjx"
App Component
      ↓
React.createElement()
      ↓
Virtual DOM Object
      ↓
ReactDOM.createRoot()
      ↓
root.render()
      ↓
Browser DOM Updated
      ↓
UI Visible on Screen
```

---

# ⚡ Why This Approach Matters

This approach helps understand:

* React fundamentals
* virtual DOM
* rendering process
* components
* ReactDOM role

Before learning:

* JSX
* Vite
* Next.js
* Hooks
* State management

---

# 🆚 CDN vs Modern React Setup

| CDN Approach          | Modern Setup                |
| --------------------- | --------------------------- |
| Simple learning       | Production-ready            |
| No build tools        | Uses Vite/Webpack           |
| Good for fundamentals | Better developer experience |
| Manual imports        | npm package system          |
| Limited scalability   | Large-scale applications    |

---
