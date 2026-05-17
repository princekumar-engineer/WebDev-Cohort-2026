# React Notes: `useState` Hook and Behind the Scenes

Using your example, let's understand:

* What is `useState`
* Why React needs state
* How `useState` works
* Behind the scenes of:

```jsx
const [value, setValue] = useState(5);
```

* Why React does not allow direct value updates
* Why `setValue()` exists
* Re-rendering in React

---

# Your Code Example

```jsx
import { useState } from "react";

function App() {
  const [value, setValue] = useState(5);

  // let value = 5;

  const increase = () => {
    setValue(value + 1);
  };

  const decrement = () => {
    setValue(value - 1);
  };

  return (
    <>
      <div>
        <h1>Value: {value}</h1>

        <button onClick={increase}>✅</button>

        <button onClick={decrement}>❌</button>
      </div>
    </>
  );
}

export default App;
```

---

# What is `useState`?

`useState` is a React Hook.

It allows components to:

* Store data
* Update data
* Re-render UI when data changes

---

# Why React Needs State

Normal JavaScript variables do not trigger UI updates.

Example:

```jsx
let value = 5;

value = value + 1;
```

The variable changes, but React does not know anything changed.

So the UI does not update automatically.

---

# Problem Without `useState`

```jsx
function App() {
  let value = 5;

  const increase = () => {
    value = value + 1;

    console.log(value);
  };

  return (
    <>
      <h1>{value}</h1>

      <button onClick={increase}>+</button>
    </>
  );
}
```

---

# What Happens Here?

When button is clicked:

```js
value = value + 1;
```

The variable changes internally.

BUT:

* React does not re-render
* UI stays the same
* Screen still shows `5`

---

# Why?

Because React only re-renders when:

* State changes
* Props change

Normal variables are ignored.

---

# What `useState` Does

```jsx
const [value, setValue] = useState(5);
```

React now tracks `value`.

Whenever `setValue()` is called:

* React updates state
* React re-renders component
* UI updates automatically

---

# Understanding This Syntax

```jsx
const [value, setValue] = useState(5);
```

This is called:

> Array Destructuring

---

# Behind the Scenes

React internally does something similar to this:

```js
const statePair = useState(5);
```

Imagine React returns:

```js
[5, function]
```

Like:

```js
[5, setValue]
```

---

# Array Destructuring

This:

```js
const [value, setValue] = [5, someFunction];
```

becomes:

```js
value = 5;
setValue = someFunction;
```

---

# What React Actually Gives You

```jsx
const [value, setValue] = useState(5);
```

React gives:

| Variable   | Purpose                  |
| ---------- | ------------------------ |
| `value`    | Current state value      |
| `setValue` | Function to update state |

---

# Initial State

```jsx
useState(5)
```

`5` is the initial value.

So initially:

```js
value = 5
```

---

# Updating State

```jsx
setValue(value + 1);
```

Example:

```js
setValue(6);
```

React then:

* stores new state
* re-renders component
* updates UI

---

# Re-rendering Explained

Initial render:

```html
Value: 5
```

Click button:

```js
setValue(6)
```

React runs component again:

```jsx
function App() {
```

Now:

```js
value = 6
```

Updated UI:

```html
Value: 6
```

---

# Why React Doesn't Allow Direct Updates

You might think:

```jsx
value = value + 1;
```

should work.

But React intentionally prevents this.

---

# Why?

React needs control over state updates.

If direct mutation were allowed:

* React could miss updates
* UI could become inconsistent
* Re-rendering would break
* Performance optimizations would fail

---

# React Needs a "Signal"

`setValue()` acts like a signal.

When you call:

```jsx
setValue(newValue)
```

React understands:

> "State changed → Re-render component"

---

# Direct Mutation Problem

Bad:

```jsx
value = value + 1;
```

React cannot detect this reliably.

---

# Correct Way

```jsx
setValue(value + 1);
```

Now React knows:

* old state
* new state
* component to update

---

# State is Immutable

In React:

> State should never be changed directly.

Instead:

```jsx
setState(newValue)
```

This creates predictable updates.

---

# Your `increase()` Function

```jsx
const increase = () => {
  setValue(value + 1);
};
```

Example:

Current:

```js
value = 5
```

After click:

```js
setValue(6)
```

React re-renders.

---

# Your `decrement()` Function

```jsx
const decrement = () => {
  setValue(value - 1);
};
```

Example:

Current:

```js
value = 5
```

After click:

```js
setValue(4)
```

React updates UI.

---

# Event Handling in React

```jsx
<button onClick={increase}>✅</button>
```

When button is clicked:

React calls:

```js
increase()
```

Which calls:

```js
setValue(value + 1)
```

Which triggers re-render.

---

# Mental Model of `useState`

Think of `useState` like:

```js
const stateBox = {
  value: 5
};
```

And:

```js
setValue(10)
```

means:

```js
stateBox.value = 10;
rerenderUI();
```

---

# Important Rule About State

Never do this:

```jsx
value++;
```

or

```jsx
value = 100;
```

React state must always be updated using setter functions.

---

# Functional Updates (Better Approach)

Your current code:

```jsx
setValue(value + 1);
```

works fine.

But React recommends:

```jsx
setValue((prev) => prev + 1);
```

---

# Why is This Better?

Because state updates can be asynchronous.

React guarantees:

```jsx
prev
```

is always latest state.

---

# Better Version of Your Code

```jsx
import { useState } from "react";

function App() {
  const [value, setValue] = useState(5);

  const increase = () => {
    setValue((prev) => prev + 1);
  };

  const decrement = () => {
    setValue((prev) => prev - 1);
  };

  return (
    <>
      <div>
        <h1>Value: {value}</h1>

        <button onClick={increase}>✅</button>

        <button onClick={decrement}>❌</button>
      </div>
    </>
  );
}

export default App;
```

---

# Behind the Scenes Simplified

React internally does something conceptually similar to:

```js
let storedState = 5;

function useState(initialValue) {
  function setValue(newValue) {
    storedState = newValue;

    rerenderComponent();
  }

  return [storedState, setValue];
}
```

This is simplified, but helps understand the idea.

---

# Final Summary

## `useState`

* React Hook
* Stores component data
* Triggers UI updates

---

## Syntax

```jsx
const [value, setValue] = useState(5);
```

---

## React Returns

```js
[value, setValue]
```

---

## `value`

Current state value.

---

## `setValue`

Function used to update state.

---

## Why React Uses Setter Functions

Because React needs to:

* detect updates
* trigger re-rendering
* optimize performance
* keep UI predictable

---

## Wrong Way

```jsx
value = value + 1;
```

React won't track it correctly.

---

## Correct Way

```jsx
setValue(value + 1);
```

---

## Better Way

```jsx
setValue((prev) => prev + 1);
```

---

# Core Mental Model

React components are re-run whenever state changes.

```jsx
setValue(newValue)
```

basically means:

> "React, update state and render UI again."
