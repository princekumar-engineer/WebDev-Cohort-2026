# Next.js Notes: Server Actions

Server Actions are a feature in the App Router that allow you to run server-side code directly from React components without creating separate API endpoints.

---

# 1. What are Server Actions?

A **Server Action** is an async function that executes on the server and can be called from forms, buttons, or client components.

Instead of:

```text
Client
  ↓
API Route
  ↓
Database
```

You can do:

```text
Client
  ↓
Server Action
  ↓
Database
```

This reduces boilerplate and keeps server logic close to the component.

---

# Why Server Actions?

Without Server Actions:

```jsx
fetch("/api/users", {
  method: "POST",
  body: JSON.stringify(data)
})
```

Need:

* API route
* Request parsing
* Response handling
* Error handling

With Server Actions:

```jsx
<form action={createUser}>
```

Directly call server code.

---

# 2. Server Actions vs API Routes

| Feature                   | Server Actions | API Routes |
| ------------------------- | -------------- | ---------- |
| Runs on server            | ✅              | ✅          |
| Requires endpoint         | ❌              | ✅          |
| Works with forms directly | ✅              | ❌          |
| Good for UI mutations     | ✅              | ⚠️         |
| External API access       | ⚠️ Limited use | ✅          |
| Public endpoint           | ❌              | ✅          |
| Third-party integrations  | ❌              | ✅          |
| Less boilerplate          | ✅              | ❌          |

---

## Use Server Actions For

* Creating users
* Updating posts
* Deleting records
* Form submissions
* Database mutations

Example:

```text
Create Product
Update Profile
Delete Comment
Add Todo
```

---

## Use API Routes For

* Public APIs
* Webhooks
* Mobile apps
* Third-party services
* External consumers

Example:

```text
Stripe Webhook
REST API
Mobile Backend
OAuth Callback
```

---

# 3. use server Directive

The `"use server"` directive marks a function or file as server-only.

---

## Function-Level

```jsx
export default function Page() {
  async function createUser() {
    "use server"

    console.log("Runs on server")
  }

  return (
    <form action={createUser}>
      <button>Submit</button>
    </form>
  )
}
```

---

## File-Level

```jsx
// app/actions/user.js

"use server"

export async function createUser() {
  console.log("Server")
}

export async function deleteUser() {
  console.log("Server")
}
```

All exports become server actions.

---

# Important

Must be:

```jsx
"use server"
```

at the top of the function or file.

Not:

```jsx
'use server'
```

The quotes can be single or double; both work. The important part is that it is the first statement.

---

# 4. Implementing Server Actions

---

## Example 1: Simple Form

```jsx
// app/page.jsx

async function submitForm(formData) {
  "use server"

  const name = formData.get("name")

  console.log(name)
}

export default function Page() {
  return (
    <form action={submitForm}>
      <input name="name" />
      <button>Submit</button>
    </form>
  )
}
```

Flow:

```text
Form Submit
      ↓
Server Action Executes
      ↓
Server Processes Data
```

---

# Example 2: Database Insert

```jsx
// app/actions.js

"use server"

import { db } from "./db"

export async function createUser(formData) {
  const name = formData.get("name")

  await db.user.create({
    data: { name }
  })
}
```

Usage:

```jsx
import { createUser } from "./actions"

export default function Page() {
  return (
    <form action={createUser}>
      <input name="name" />
      <button>Create</button>
    </form>
  )
}
```

---

# Example 3: Calling from Client Component

Server Action:

```jsx
// app/actions.js

"use server"

export async function saveUser(name) {
  console.log(name)
}
```

Client Component:

```jsx
"use client"

import { saveUser } from "./actions"

export default function UserForm() {
  return (
    <button
      onClick={() => saveUser("John")}
    >
      Save
    </button>
  )
}
```

Next.js securely invokes the server function.

---

# Example 4: Revalidating Data

After database updates, refresh cached pages.

```jsx
"use server"

import { revalidatePath } from "next/cache"

export async function createPost(formData) {
  await db.post.create({
    data: {
      title: formData.get("title")
    }
  })

  revalidatePath("/posts")
}
```

---

# Example 5: Redirect After Action

```jsx
"use server"

import { redirect } from "next/navigation"

export async function createPost(formData) {
  await db.post.create({
    data: {
      title: formData.get("title")
    }
  })

  redirect("/posts")
}
```

---

# FormData in Server Actions

Server Actions automatically receive:

```jsx
FormData
```

Example:

```jsx
const email = formData.get("email")
const password = formData.get("password")
```

Form:

```jsx
<form action={login}>
  <input name="email" />
  <input name="password" />
</form>
```

---

# Passing Additional Arguments

Use `bind()`.

```jsx
"use server"

export async function deletePost(id) {
  console.log(id)
}
```

Component:

```jsx
<form action={deletePost.bind(null, post.id)}>
  <button>Delete</button>
</form>
```

---

# Error Handling

```jsx
"use server"

export async function createUser(formData) {
  try {
    const name = formData.get("name")

    await db.user.create({
      data: { name }
    })
  } catch (error) {
    throw new Error("Failed")
  }
}
```

---

# Common Interview Questions

### Q1. What is a Server Action?

A server-side function marked with `"use server"` that can be invoked directly from React components without creating an API route.

---

### Q2. Do Server Actions replace API Routes?

No.

* Server Actions → UI-driven mutations.
* API Routes → public endpoints, webhooks, third-party integrations.

---

### Q3. Can Server Actions access databases directly?

Yes.

```jsx
await prisma.user.create(...)
```

because they execute on the server.

---

### Q4. Can Client Components call Server Actions?

Yes.

```jsx
"use client"
```

components can invoke imported Server Actions.

---

### Q5. Why are Server Actions faster to develop?

They remove the need for:

* API routes
* Fetch calls
* Request/response parsing
* Endpoint management

---

# Interview Summary

```text
Server Actions
   ↓
Server-side functions
   ↓
Marked with "use server"
   ↓
Used for mutations
(Create, Update, Delete)
   ↓
Can access DB directly
   ↓
Can revalidate cache
   ↓
Can redirect users
```

### Rule of Thumb

* **Read data** → Server Components (`fetch`, DB queries).
* **Mutate data** → Server Actions.
* **Expose endpoints to external systems** → API Routes (`route.js`).
