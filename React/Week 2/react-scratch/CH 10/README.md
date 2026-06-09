Here’s a clean Chapter 10 style note focused on the interview-favorite topic: **Error Boundaries in React** using your `BrokenCup` example.

---

# Chapter 10 — Error Boundaries in React ☕💥

## Interview Favourite Topic

One of the most commonly asked React interview topics is:

* What is an Error Boundary?
* Why do we use it?
* Can Functional Components become Error Boundaries?
* How does React handle runtime UI crashes?

This chapter covers all of that using a fun `BrokenCup` example.

---

# What Problem Are We Solving?

Normally, if a React component crashes because of a JavaScript error:

```js id="4szk0z"
throw new Error("Boom!");
```

the entire React UI may crash.

Example:

* blank screen
* white page
* broken app

React introduced **Error Boundaries** to gracefully handle these runtime UI errors.

---

# Project Structure

```txt id="k06xnl"
App.jsx
BrokenCup.jsx
ErrorBoundary.jsx
main.jsx
```

---

# App.jsx

This is the main application component.

```jsx id="nh7f0t"
function App() {
  return (
    <>
      <h1>Chai aur late night react</h1>

      <ErrorBoundary>
        <BrokenCup />
      </ErrorBoundary>
    </>
  );
}
```

---

# Key Observation

Notice this part carefully:

```jsx id="0b2llk"
<ErrorBoundary>
  <BrokenCup />
</ErrorBoundary>
```

The `BrokenCup` component is wrapped inside `ErrorBoundary`.

That means:

👉 If `BrokenCup` crashes,
👉 `ErrorBoundary` catches the error,
👉 instead of crashing the whole app.

---

# BrokenCup Component ☕

```jsx id="b2ic3l"
export function BrokenCup() {
  const [isBroken, setIsBroken] = useState(false);

  if (isBroken) {
    throw new Error("The cup is broken!");
  }

  return (
    <div>
      <p>The cup is intact.</p>
      <button onClick={() => setIsBroken(true)}>
        Break the cup
      </button>
    </div>
  );
}
```

---

# What Happens Here?

Initially:

```txt id="iw1rqn"
The cup is intact.
```

When user clicks:

```txt id="vhkjk3"
Break the cup
```

this line runs:

```js id="jtl3vk"
setIsBroken(true)
```

Now React re-renders the component.

Then this executes:

```js id="x1dhy0"
if (isBroken) {
  throw new Error("The cup is broken!");
}
```

Boom 💥

The component throws an error intentionally.

---

# Without Error Boundary ❌

If we remove `ErrorBoundary`:

```jsx id="2nxxsd"
<BrokenCup />
```

the whole React application may crash.

You may see:

```txt id="s2k9lm"
Uncaught Error: The cup is broken!
```

and the UI disappears.

---

# ErrorBoundary Component 🛡️

```jsx id="j7r2e6"
export class ErrorBoundary extends Component {
```

This is EXTREMELY important.

# Error Boundaries ONLY work with Class Components

This is one of the most important interview questions.

✅ Error Boundaries MUST be class-based components.

❌ Functional components cannot directly become Error Boundaries.

---

# Why Class Components?

Because React Error Boundary lifecycle methods exist only in class components:

```js id="oz29bl"
static getDerivedStateFromError()
```

and

```js id="v2t0hh"
componentDidCatch()
```

These lifecycle methods are unavailable in normal functional components.

---

# Full ErrorBoundary Code

```jsx id="ax6v5l"
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      "Error caught in ErrorBoundary:",
      error,
      errorInfo
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          Something went wrong:
          {this.state.error.message}
        </h2>
      );
    }

    return this.props.children;
  }
}
```

---

# Understanding Each Part

---

# 1. constructor()

```js id="fwxykl"
this.state = {
  hasError: false,
  error: null,
};
```

Stores:

* whether error occurred
* actual error object

---

# 2. getDerivedStateFromError()

```js id="0s43gv"
static getDerivedStateFromError(error)
```

This lifecycle method runs when child component crashes.

It updates state:

```js id="8vf1fe"
return {
  hasError: true,
  error,
};
```

Now UI knows an error happened.

---

# 3. componentDidCatch()

```js id="9w9xlu"
componentDidCatch(error, errorInfo)
```

Used for:

* logging
* monitoring
* analytics
* sending errors to server

Example:

* Sentry
* LogRocket
* Datadog

---

# 4. Fallback UI

```jsx id="9vud1q"
if (this.state.hasError) {
  return <h2>Something went wrong</h2>;
}
```

Instead of blank screen, user sees friendly UI.

---

# Real Life Example

Imagine:

* payment section crashes
* cart component crashes
* profile component crashes

Without Error Boundary:

❌ entire app dies

With Error Boundary:

✅ only failed section gets replaced

Huge production advantage.

---

# Important Interview Questions

---

# Q1. Can functional components be Error Boundaries?

❌ No

Currently React supports Error Boundaries only with class components.

---

# Q2. Which lifecycle methods are used?

```js id="k4e0q8"
static getDerivedStateFromError()
componentDidCatch()
```

---

# Q3. Do Error Boundaries catch all errors?

❌ No

They do NOT catch:

* event handler errors
* async errors
* setTimeout errors
* server-side rendering errors

They mainly catch:

✅ rendering errors
✅ lifecycle errors
✅ child component crashes

---

# Q4. Why are Error Boundaries useful?

They prevent full application crashes.

---

# StrictMode in main.jsx

```jsx id="9c5evv"
<StrictMode>
  <App />
</StrictMode>
```

React StrictMode helps detect:

* unsafe lifecycle usage
* deprecated APIs
* side effects

Used only in development.

---

# Relief About npm Packages 😌

Many beginners panic when they hear:

```txt id="7xp2v2"
Error Boundary
```

thinking:

```txt id="r1m7b4"
Do I need to install some npm package?
```

Good news:

✅ NO extra npm package is required.

Error Boundaries are built directly into React.

You already have everything if React is installed.

---

# Just Import Component

```js id="e9m1gu"
import { Component } from "react";
```

That’s enough.

No need for:

```bash id="y3r5f0"
npm install error-boundary
```

unless you want advanced third-party libraries.

---

# Final Mental Model ☕

Think like this:

```txt id="8z2m2s"
BrokenCup = risky component
ErrorBoundary = safety wall
```

If component crashes:

```txt id="aq1i9n"
ErrorBoundary catches the explosion
```

and shows fallback UI instead of destroying the app.

---

# Final Interview Summary

| Concept             | Important Point                              |
| ------------------- | -------------------------------------------- |
| Error Boundary      | Handles React UI crashes                     |
| Type                | Class component only                         |
| Main Methods        | getDerivedStateFromError + componentDidCatch |
| Purpose             | Prevent full app crash                       |
| Used Around         | Risky child components                       |
| npm package needed? | No                                           |

---

# Golden Line for Interviews ⭐

> “Error Boundaries are special class-based React components that catch rendering errors in child components and display fallback UI instead of crashing the entire application.”
