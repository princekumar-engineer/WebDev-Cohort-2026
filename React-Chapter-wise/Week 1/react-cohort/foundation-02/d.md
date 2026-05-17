# JSX `{}` and Key Props in React

Using your example, let's understand:

1. What `{}` means in JSX
2. What `key` props are
3. Why they are important

---
# Code Example : App.jsx

```jsx id="2c2mo7"
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
    <div>
      <h1>Hello</h1>

      <section className="grid">
        {shows.map((show) => (
          <article key={show.id}>
            <p className="tag">{show.hall}</p>

            <h3>{show.title}</h3>

            <p className="muted">{show.time}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default App;
```
---

# 1. What is `{}` in JSX?

In JSX, curly braces `{}` are used to write **JavaScript inside HTML-like JSX**.

It allows React to:

* Display variables
* Run JavaScript expressions
* Use functions
* Loop through arrays
* Render dynamic data

---

# Example from Your Code

```jsx id="f44m6w"
<h3>{show.title}</h3>
```

Here:

```js id="d9g3a2"
show.title
```

is JavaScript.

React evaluates it and displays the value.

For example:

```js id="rm4hgv"
show.title = "Virtual DOM Nights"
```

Output:

```html id="j7m61r"
<h3>Virtual DOM Nights</h3>
```

---

# JSX Without `{}`

This is treated as plain text:

```jsx id="1n0n5j"
<h1>name</h1>
```

Output:

```html id="u7dfw7"
name
```

---

# JSX With `{}`

```jsx id="v8x0lf"
const name = "Rahul";

<h1>{name}</h1>
```

Output:

```html id="l4j3ri"
Rahul
```

---

# Common Uses of `{}` in JSX

## 1. Variables

```jsx id="9bslrj"
const user = "Aman";

<h1>{user}</h1>
```

---

## 2. Math Operations

```jsx id="3cgq7o"
<p>{10 + 20}</p>
```

Output:

```html id="7pqj8w"
30
```

---

## 3. Function Calls

```jsx id="5odr0g"
function greet() {
  return "Hello";
}

<h1>{greet()}</h1>
```

---

## 4. Array Mapping

Your example:

```jsx id="hl0xj4"
{shows.map((show) => (
  <article>
    <h3>{show.title}</h3>
  </article>
))}
```

React loops through the array and creates UI.

---

# 2. What is `map()` Doing Here?

```jsx id="ljg4yj"
shows.map((show) => (
  <article>
    <h3>{show.title}</h3>
  </article>
))
```

The `map()` function loops through every object inside `shows`.

---

## First Iteration

```js id="0s3g4q"
{
  id: 1,
  title: "The Component Returns",
  time: "10:00 AM",
  hall: "Hall A",
}
```

React creates:

```jsx id="hfr0li"
<article>
  <h3>The Component Returns</h3>
</article>
```

---

# 3. What is a `key` Prop?

When rendering lists using `map()`, React requires a special prop called `key`.

---

# Why is `key` Important?

React uses keys to:

* Identify elements uniquely
* Track changes efficiently
* Improve performance
* Avoid rendering bugs

---

# Problem in Your Code

Your current code:

```jsx id="nmu0o4"
{shows.map((show) => (
  <article>
```

❌ Missing `key`

React will show warning:

> Each child in a list should have a unique "key" prop.

---

# Correct Version

```jsx id="jlwmf2"
{shows.map((show) => (
  <article key={show.id}>
    <p className="tag">{show.hall}</p>
    <h3>{show.title}</h3>
    <p className="muted">{show.time}</p>
  </article>
))}
```

---

# Why `show.id`?

Because every object has unique IDs:

```js id="xf4m4t"
id: 1
id: 2
id: 3
```

Perfect for React keys.

---

# How React Uses Keys

Imagine this list:

```js id="ng1dk9"
A
B
C
```

If `B` changes, React uses the key to know:

* which item changed
* which item to update

Without keys, React may re-render incorrectly.

---

# Rules for Keys

## ✅ Keys Should Be:

* Unique
* Stable
* Predictable

---

## ❌ Avoid Using Index as Key

Bad:

```jsx id="k6b6ot"
key={index}
```

Use only if data never changes.


---

# Final Summary

## `{}` in JSX

Used to write JavaScript inside JSX.

Examples:

```jsx id="pclm4z"
{name}
{10 + 20}
{shows.map()}
```

---

## `key` Prop

Used when rendering lists.

Example:

```jsx id="h7kr4p"
key={show.id}
```

Helps React:

* identify elements
* optimize rendering
* avoid bugs
