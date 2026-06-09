# ⚛️ Chapter 3 — React Components & Props (React 19)

---

# 🚀 Moving Beyond Basic React

In the previous chapter:

* React rendered simple UI
* used `React.createElement()`
* rendered content inside `#root`

Now we move to the most important concept in React:

```txt id="1t6mzd"
Components
        +
Props
```

These are the foundation of modern React applications.

---

# 🧩 What is a Component?

> A component is a reusable piece of UI.

Instead of writing one huge HTML page, React breaks UI into small reusable parts.

Examples:

```txt id="axsvt2"
Navbar
Sidebar
Card
Button
Product Item
Footer
```

---

# ☕ What is Props?

> Props are data passed from one component to another.

Props make components dynamic and reusable.

---

# 📁 Project Structure

```txt id="q2u8yx"
project/
│
├── index.html
└── app.js
```

---

# 📄 index.html

```html id="gx18fx"
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>react is here</title>

    <style>
      body {
        background-color: #333;
        color: #fff;
      }
    </style>
  </head>

  <body>
    <div id="root"></div>

    <script type="module" src="./app.js"></script>
  </body>
</html>
```

---

# 📄 app.js

```js id="9zsvy8"
import React from "https://esm.sh/react@19.0.0";
import ReactDOM from "https://esm.sh/react-dom@19.0.0/client";

const Chai = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", null, props.name || "Chai"),
    React.createElement("p", null, props.desc || "demo component"),
  ]);
};

const App = () => {
  return React.createElement(
    "div",
    {
      className: "container",
    },
    [
      React.createElement("h1", null, "Hello, React!"),

      React.createElement(Chai, {
        name: "Masala Chai",
        desc: "A simple React component with props",
      }),
    ],
  );
};

const container = document.getElementById("root");

const root = ReactDOM.createRoot(container);

root.render(React.createElement(App));
```

---

# ⚛️ Understanding React 19

React

React 19 continues React's modern architecture with improvements for:

* rendering performance
* server components
* actions
* async handling
* developer experience

---

# ✨ Why React 19 Matters

React 19 focuses on:

```txt id="7nt6yl"
Better Performance
        +
Cleaner Async Logic
        +
Modern Rendering
        +
Improved Developer Experience
```

---

# 🧠 Core Concepts Used in This Chapter

This chapter introduces:

* Components
* Props
* Reusability
* Parent → Child communication
* Component rendering flow

---

# 🧩 Creating a Component

```js id="7j17lw"
const Chai = (props) => {
  return React.createElement(...);
};
```

This creates a custom React component called:

```txt id="b25abv"
Chai
```

---

# ☕ Why Component Reuse Matters

Instead of repeating UI many times:

```html id="oc2j2d"
<h1>Masala Chai</h1>
<p>A simple React component with props</p>
```

We create reusable components.

This makes applications:

* cleaner
* scalable
* maintainable

---

# 📌 Understanding Props

```js id="bqjlwm"
props.name
props.desc
```

Props store values passed into the component.

---

# 🔥 Passing Props

```js id="k8j0yv"
React.createElement(Chai, {
  name: "Masala Chai",
  desc: "A simple React component with props",
})
```

This sends data into the `Chai` component.

---

# 🧠 Internal Flow of Props

```txt id="e8kxpp"
Parent Component (App)
          ↓
Pass Props
          ↓
Child Component (Chai)
          ↓
Display Dynamic Content
```

---

# 🛡️ Default Fallback Values

```js id="8mt9oi"
props.name || "Chai"
```

If no prop is passed:

```txt id="ulkk9n"
Default value will be used
```

---

# 📌 Rendering Multiple Elements

```js id="a2rn2r"
[
  React.createElement("h1", ...),
  React.createElement("p", ...)
]
```

Arrays allow multiple child elements inside a component.

---

# 🌳 Virtual DOM Flow

React creates UI in memory first.

```txt id="e4yr0z"
Component
    ↓
React.createElement()
    ↓
Virtual DOM
    ↓
Compare Changes
    ↓
Update Real DOM
```

---

# 📌 App Component

```js id="0yy8i9"
const App = () => {
  return React.createElement(...);
};
```

This is the main parent component.

It controls:

* page structure
* child components
* props flow

---

# 🧱 Component Hierarchy

```txt id="9tv5zf"
App
 ├── h1
 └── Chai
      ├── h1
      └── p
```

This is how React builds UI trees.

---

# 📌 Selecting Root Element

```js id="rq36vb"
const container = document.getElementById("root");
```

React finds the root container from HTML.

---

# 📌 Creating React Root

```js id="1m99ks"
const root = ReactDOM.createRoot(container);
```

React 18+ introduced:

* concurrent rendering
* improved updates
* better scheduling

React 19 continues this architecture.

---

# 📌 Rendering the App

```js id="m9wn9x"
root.render(React.createElement(App));
```

This tells React:

```txt id="0n8l8i"
Render App component inside #root
```

---

# 🔥 Complete Rendering Flow

```txt id="29hby1"
Browser Loads HTML
        ↓
Find #root
        ↓
Load app.js
        ↓
Create App Component
        ↓
App renders Chai Component
        ↓
Props passed to Chai
        ↓
Virtual DOM Created
        ↓
ReactDOM updates Browser DOM
        ↓
UI visible on screen
```

---

# 🧠 Final UI Output

```txt id="f7xv7v"
Hello, React!

Masala Chai
A simple React component with props
```

---

# 🚀 Why This Chapter Matters

This chapter introduces the real power of React:

```txt id="w3tzfm"
Reusable Components
        +
Dynamic Data
        +
Composable UI
```

Everything in modern React is built using these ideas.

---

# 📌 What You Learned

✅ React 19 basics

✅ Components

✅ Props

✅ Parent → Child communication

✅ Reusable UI

✅ Virtual DOM flow

✅ Rendering process

---