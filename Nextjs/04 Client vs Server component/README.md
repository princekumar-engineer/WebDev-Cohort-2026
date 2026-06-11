# Client vs Server Component
In Next.js (App Router), every component is a **Server Component by default** unless you explicitly mark it as a **Client Component** using `"use client"`.

Understanding the difference is one of the most important Next.js interview topics.

---

# Quick Comparison

| Feature                                            | Server Component | Client Component                |
| -------------------------------------------------- | ---------------- | ------------------------------- |
| Runs on                                            | Server           | Browser                         |
| Default in App Router                              | ✅ Yes            | ❌ No                            |
| Can use `useState`                                 | ❌                | ✅                               |
| Can use `useEffect`                                | ❌                | ✅                               |
| Can access browser APIs (`window`, `localStorage`) | ❌                | ✅                               |
| Can fetch data directly                            | ✅                | ⚠️ Possible but not recommended |
| Included in JS bundle                              | ❌ Minimal        | ✅ Sent to browser               |
| SEO Friendly                                       | ✅ Excellent      | ⚠️ Depends                      |
| Event Handlers (`onClick`)                         | ❌                | ✅                               |

---

# 1. Server Components

Server Components run only on the server.

Example:

```jsx
// app/users/page.jsx

async function getUsers() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  )

  return res.json()
}

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  )
}
```

### Advantages

✅ Smaller JavaScript bundle

✅ Better SEO

✅ Faster initial load

✅ Direct database access

✅ Secure (API keys stay on server)

---

## What Server Components Cannot Do

❌ `useState`

```jsx
const [count, setCount] = useState(0)
```

❌ `useEffect`

```jsx
useEffect(() => {})
```

❌ Event handlers

```jsx
<button onClick={handleClick}>
```

❌ Browser APIs

```jsx
window.localStorage
```

---

# 2. Client Components

Add `"use client"` at the top.

```jsx
"use client"

import { useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button
      onClick={() => setCount(count + 1)}
    >
      {count}
    </button>
  )
}
```

Now the component runs in the browser.

---

## What Client Components Can Do

### State

```jsx
const [count, setCount] = useState(0)
```

### Effects

```jsx
useEffect(() => {
  console.log("Mounted")
}, [])
```

### Browser APIs

```jsx
localStorage.setItem("theme", "dark")
```

### Event Handling

```jsx
<button onClick={save}>
```

---

# Example: Server + Client Together

Server Component:

```jsx
// app/page.jsx

import Counter from "./Counter"

export default function Home() {
  return (
    <>
      <h1>Dashboard</h1>
      <Counter />
    </>
  )
}
```

Client Component:

```jsx
// app/Counter.jsx

"use client"

import { useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button
      onClick={() => setCount(count + 1)}
    >
      {count}
    </button>
  )
}
```

Flow:

```text
Server Component
        ↓
Sends HTML
        ↓
Client Component Hydrates
        ↓
Interactive UI
```

---

# Data Fetching Difference

## Server Component (Recommended)

```jsx
export default async function Products() {
  const res = await fetch(
    "https://api.example.com/products"
  )

  const products = await res.json()

  return <div>{products.length}</div>
}
```

Benefits:

* Faster
* SEO friendly
* No loading spinner needed
* Data never exposed to browser

---

## Client Component

```jsx
"use client"

import { useEffect, useState } from "react"

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(setProducts)
  }, [])

  return <div>{products.length}</div>
}
```

Problems:

* Extra network request
* Initial loading state
* More JavaScript

---

# When to Use Server Components

Use when:

✅ Fetching data

✅ Displaying content

✅ SEO pages

✅ Database queries

✅ Reading files

✅ Calling backend services

Examples:

```text
Blog Page
Product Page
User Dashboard
News Feed
Documentation
```

---

# When to Use Client Components

Use when:

✅ User interaction needed

✅ Forms

✅ Modals

✅ Dropdowns

✅ Tabs

✅ Theme switchers

✅ Real-time updates

Examples:

```text
Counter
Login Form
Search Box
Shopping Cart
Dark Mode Toggle
```

---

# Common Interview Question

### Can a Server Component import a Client Component?

✅ Yes

```jsx
import Counter from "./Counter"

export default function Page() {
  return <Counter />
}
```

---

### Can a Client Component import a Server Component?

❌ No

```jsx
"use client"

import ServerComp from "./ServerComp" // Error
```

A Client Component cannot directly import a Server Component because server code cannot run in the browser.

---

# Rendering Flow

```text
Request
   ↓
Server Component Executes
   ↓
HTML Generated
   ↓
Sent to Browser
   ↓
Client Components Hydrate
   ↓
Interactive UI
```

---

# Rule of Thumb

**Start with Server Components.**

Only add `"use client"` when you need:

* `useState`
* `useEffect`
* Event handlers (`onClick`, `onChange`)
* Browser APIs (`window`, `localStorage`)
* Interactive UI

This approach keeps your Next.js application faster, more SEO-friendly, and sends less JavaScript to the browser.
