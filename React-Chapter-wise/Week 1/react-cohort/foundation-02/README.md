# React Notes: Components, JSX, Fragments, `{}` & Key Props with Bun + Vite

# 1. What is a Component in React?

A **Component** is a reusable piece of UI (User Interface).

React applications are built using components.

Examples:

* Navbar
* Button
* Card
* Sidebar
* Footer

---

## Example of a Component

```jsx
function Welcome() {
  return <h1>Hello React!</h1>;
}

export default Welcome;
```

---

# Component Naming Convention

React components should follow these conventions:

---

## 1. Use PascalCase

Component names must start with a capital letter.

✅ Correct:

```jsx
function UserCard() {}
```

❌ Wrong:

```jsx
function userCard() {}
```

---

## 2. One Component per File (Recommended)

Example folder structure:

```bash
components/
 ├── Navbar.jsx
 ├── Footer.jsx
 └── Card.jsx
```

---

## 3. File Extensions

Common extensions:

* `.jsx`
* `.js`
* `.tsx` (TypeScript)

---

## 4. Export Components

```jsx
export default Navbar;
```

---

# Types of Components

## Functional Component (Modern)

```jsx
function Button() {
  return <button>Click Me</button>;
}
```

---

## Arrow Function Component

```jsx
const Button = () => {
  return <button>Click Me</button>;
};
```

---

# 2. JSX in React

## What is JSX?

JSX stands for:

> JavaScript XML

It allows us to write HTML-like syntax inside JavaScript.

---

## Example of JSX

```jsx
const element = <h1>Hello JSX</h1>;
```

---

## Why JSX?

JSX makes UI code:

* Cleaner
* Easier to read
* Easier to maintain

---

# JSX Rules

---

## 1. Return a Single Parent Element

✅ Correct:

```jsx
return (
  <div>
    <h1>Title</h1>
    <p>Description</p>
  </div>
);
```

❌ Wrong:

```jsx
return (
  <h1>Title</h1>
  <p>Description</p>
);
```

---

## 2. Use `className` Instead of `class`

```jsx
<div className="container">
  Hello
</div>
```

---

## 3. JavaScript Inside `{}`

```jsx
const name = "PRINCE";

return <h1>Hello {name}</h1>;
```

---

## 4. Self Closing Tags

```jsx
<img src="image.png" />
<input />
```

---

# 3. React Fragment (`<> </>`)

## What is a Fragment?

A Fragment lets you group multiple elements without adding extra HTML tags to the DOM.

---

## Fragment Syntax

```jsx
<>
  <h1>Hello</h1>
  <p>Welcome</p>
</>
```

---

## Why Use Fragment?

Without Fragment:

```jsx
<div>
  <h1>Hello</h1>
  <p>World</p>
</div>
```

This adds an unnecessary `<div>` to the DOM.

With Fragment:

```jsx
<>
  <h1>Hello</h1>
  <p>World</p>
</>
```

No extra DOM element is created.

---

## Full Fragment Syntax

```jsx
import React from "react";

function App() {
  return (
    <React.Fragment>
      <h1>Hello</h1>
      <p>React Fragment</p>
    </React.Fragment>
  );
}
```

---

# 4. `{}` in JSX

## What Does `{}` Mean in JSX?

In JSX, curly braces `{}` are used to write **JavaScript inside JSX**.

React evaluates the JavaScript expression and displays the result.

---

## Example

```jsx
const name = "Rahul";

<h1>{name}</h1>
```

Output:

```html
Rahul
```

---

# JSX Without `{}`

```jsx
<h1>name</h1>
```

Output:

```html
name
```

React treats it as plain text.

---

# Common Uses of `{}` in JSX

---

## 1. Variables

```jsx
const user = "Prince";

<h1>{user}</h1>
```

---

## 2. Math Operations

```jsx
<p>{10 + 20}</p>
```

Output:

```html
30
```

---

## 3. Function Calls

```jsx
function greet() {
  return "Hello";
}

<h1>{greet()}</h1>
```

---

## 4. Array Mapping

```jsx
{
  shows.map((show) => (
    <article>
      <h3>{show.title}</h3>
    </article>
  ));
}
```

React loops through the array and creates UI elements dynamically.

---

# 5. Understanding `map()` in React

Consider this data:

```jsx
const shows = [
  {
    id: 1,
    title: "The Component Returns",
    time: "10:00 AM",
    hall: "Hall A",
  },
  {
    id: 2,
    title: "Attack of the Re-render",
    time: "12:30 PM",
    hall: "Hall B",
  },
  {
    id: 3,
    title: "Virtual DOM Nights",
    time: "04:00 PM",
    hall: "Hall C",
  },
];
```

---

## Rendering List Using `map()`

```jsx
{
  shows.map((show) => (
    <article>
      <h3>{show.title}</h3>
    </article>
  ));
}
```

The `map()` function loops through every object inside `shows`.

---

## First Iteration

```js
{
  id: 1,
  title: "The Component Returns",
  time: "10:00 AM",
  hall: "Hall A",
}
```

React creates:

```jsx
<article>
  <h3>The Component Returns</h3>
</article>
```

---

# 6. What is the `key` Prop?

When rendering lists using `map()`, React requires a special prop called `key`.

---

## Why is `key` Important?

React uses keys to:

* Identify elements uniquely
* Track changes efficiently
* Improve rendering performance
* Avoid UI bugs

---

# Incorrect Example

```jsx
{
  shows.map((show) => (
    <article>
      <h3>{show.title}</h3>
    </article>
  ));
}
```

❌ Missing `key`

React warning:

> Each child in a list should have a unique "key" prop.

---

# Correct Example

```jsx
{
  shows.map((show) => (
    <article key={show.id}>
      <h3>{show.title}</h3>
    </article>
  ));
}
```

---

## Why Use `show.id`?

Because every object has a unique ID:

```js
id: 1
id: 2
id: 3
```

Perfect for React keys.

---

# Rules for Keys

## ✅ Good Keys Should Be

* Unique
* Stable
* Predictable

---

## ❌ Avoid Using Index as Key

Bad practice:

```jsx
key={index}
```

Use index only when the list never changes.

---

# 7. Complete Example: `App.jsx`

```jsx
const shows = [
  {
    id: 1,
    title: "The Component Returns",
    time: "10:00 AM",
    hall: "Hall A",
  },
  {
    id: 2,
    title: "Attack of the Re-render",
    time: "12:30 PM",
    hall: "Hall B",
  },
  {
    id: 3,
    title: "Virtual DOM Nights",
    time: "04:00 PM",
    hall: "Hall C",
  },
];

function App() {
  return (
    <>
      <h1>Hello React</h1>

      <section className="grid">
        {shows.map((show) => (
          <article key={show.id}>
            <p className="tag">{show.hall}</p>

            <h3>{show.title}</h3>

            <p className="muted">{show.time}</p>
          </article>
        ))}
      </section>
    </>
  );
}

export default App;
```

---

# 8. Basic React Setup Using Bun + Vite

## What is Bun?

Bun is a fast JavaScript runtime and package manager.

Official Website:

[Bun Official Website](https://bun.sh/)

---

# Step 1: Install Bun

## Linux / macOS

```bash
curl -fsSL https://bun.sh/install | bash
```

---

## Windows (PowerShell)

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

---

## Verify Installation

```bash
bun --version
```

---

# Step 2: Create React App Using Vite

```bash
bun create vite
```

---

## Project Setup Example

```bash
✔ Project name: my-react-app
✔ Select a framework: React
✔ Select a variant: JavaScript
```

---

# Step 3: Move Into Project Folder

```bash
cd my-react-app
```

---

# Step 4: Install Dependencies

```bash
bun install
```

---

# Step 5: Start Development Server

```bash
bun run dev
```

---

# Step 6: Open in Browser

Usually:

```bash
http://localhost:5173
```

---

# Advantages of Bun

* Faster package installation
* Fast runtime
* Built-in bundler
* Better performance

---

# Folder Structure

```bash
my-react-app/
│
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── components/
│
├── package.json
└── vite.config.js
```

---

# Example `App.jsx`

```jsx
function App() {
  return (
    <>
      <h1>Hello React + Bun + Vite</h1>
      <p>My first React app</p>
    </>
  );
}

export default App;
```

---

# Final Summary

## Components

* Reusable UI blocks
* Follow PascalCase naming
* Usually one component per file

---

## JSX

* Allows HTML-like syntax inside JavaScript
* Must return a single parent element
* Uses `className`
* Supports JavaScript using `{}`

---

## `{}` in JSX

Used to write JavaScript inside JSX.

Examples:

```jsx
{name}
{10 + 20}
{shows.map()}
```

---

## React Fragment

* Avoids unnecessary wrapper elements
* Written as `<> </>`

---

## `map()` in React

* Used to loop through arrays
* Helps render dynamic UI lists

Example:

```jsx
{
  shows.map((show) => <h3>{show.title}</h3>);
}
```

---

## `key` Prop

Used when rendering lists.

Example:

```jsx
key={show.id}
```

Helps React:

* Identify elements
* Optimize rendering
* Avoid rendering bugs

---

## Bun + Vite

* Fast modern React setup
* Easy project creation
* Excellent performance for development
