# File-Based Routing


In **Next.js**, **File-Based Routing** means routes are automatically created based on the files and folders inside your `app` or `pages` directory. You don't manually define routes like in React Router.

Since modern Next.js (v13+) primarily uses the **App Router**, I'll explain all routing types for both **App Router** and the older **Pages Router**.

---

# 1. Static Routes

A file directly maps to a URL.

### App Router

```
app/
├── page.js
├── about/
│   └── page.js
```

Routes:

| File              | URL    |
| ----------------- | ------ |
| app/page.js       | /      |
| app/about/page.js | /about |

Example:

```jsx
// app/about/page.js
export default function About() {
  return <h1>About Page</h1>;
}
```

Visit:

```
/about
```

---

# 2. Nested Routes

Folders create nested URLs.

```
app/
├── dashboard/
│   ├── page.js
│   └── settings/
│       └── page.js
```

Routes:

```
/dashboard
/dashboard/settings
```

---

# 3. Dynamic Routes

Use square brackets `[]` to create dynamic URLs.

```
app/
└── blog/
    └── [id]/
        └── page.js
```

URLs:

```
/blog/1
/blog/abc
/blog/nextjs
```

Example:

```jsx
export default async function BlogPost({ params }) {
  return <h1>Post: {params.id}</h1>;
}
```

---

# 4. Multiple Dynamic Segments

```
app/
└── product/
    └── [category]/
        └── [id]/
            └── page.js
```

URLs:

```
/product/mobile/1
/product/laptop/20
```

Example:

```jsx
export default function Product({ params }) {
  return (
    <>
      <h1>{params.category}</h1>
      <p>{params.id}</p>
    </>
  );
}
```

---

# 5. Catch-All Routes

Use `[...slug]`.

Matches multiple URL segments.

```
app/
└── docs/
    └── [...slug]/
        └── page.js
```

Matches:

```
/docs/react
/docs/react/hooks
/docs/react/hooks/useeffect
```

Result:

```js
params.slug
```

For:

```
/docs/react/hooks
```

Output:

```js
["react", "hooks"]
```

---

# 6. Optional Catch-All Routes

Use `[[...slug]]`.

```
app/
└── docs/
    └── [[...slug]]/
        └── page.js
```

Matches:

```
/docs
/docs/react
/docs/react/hooks
```

Output:

```js
undefined
```

or

```js
["react"]
```

depending on URL.

---

# 7. Route Groups

Organize files without affecting URL structure.

Folder name:

```
(folderName)
```

Example:

```
app/
├── (marketing)/
│   ├── about/
│   │   └── page.js
```

URL:

```
/about
```

Not:

```
/marketing/about
```

Useful for:

* Multiple layouts
* Better project organization

---

# 8. Private Folders

Prefix folder with `_`.

```
app/
├── _components/
│   └── Button.jsx
```

Next.js ignores it as a route.

Used for:

* Components
* Helpers
* Utilities

---

# 9. Parallel Routes

Render multiple routes simultaneously.

Folder syntax:

```
@folderName
```

Example:

```
app/
├── dashboard/
│   ├── @team/
│   │   └── page.js
│   ├── @analytics/
│   │   └── page.js
│   └── layout.js
```

Layout:

```jsx
export default function Layout({
  children,
  team,
  analytics,
}) {
  return (
    <>
      {team}
      {analytics}
      {children}
    </>
  );
}
```

Useful for:

* Dashboards
* Sidebars
* Multi-panel UIs

---

# 10. Intercepting Routes

Allow opening routes inside another route context (e.g., modal).

Syntax:

```
(.)
(..)
(...)
```

Example:

```
app/
├── feed/
│   └── page.js
├── photo/
│   └── [id]/
│       └── page.js
├── feed/
│   └── @modal/
│       └── (.)photo/
│           └── [id]/
│               └── page.js
```

Behavior:

* Normal navigation → full photo page
* From feed → photo opens as modal

Used by apps like Instagram.

---

# 11. API Routes (Pages Router)

### Pages Router

```
pages/
└── api/
    └── users.js
```

URL:

```
/api/users
```

Example:

```js
export default function handler(req, res) {
  res.status(200).json({ name: "John" });
}
```

---

# 12. Route Handlers (App Router)

Modern API routes.

```
app/
└── api/
    └── users/
        └── route.js
```

Example:

```js
export async function GET() {
  return Response.json({
    message: "Hello"
  });
}
```

Endpoint:

```
/api/users
```

---

# 13. Special Files

Next.js reserves certain filenames.

### page.js

Creates a route.

```
app/about/page.js
```

---

### layout.js

Shared UI.

```
app/dashboard/layout.js
```

```jsx
export default function Layout({ children }) {
  return (
    <>
      <nav>Navbar</nav>
      {children}
    </>
  );
}
```

---

### loading.js

Loading UI.

```
app/blog/loading.js
```

```jsx
export default function Loading() {
  return <p>Loading...</p>;
}
```

---

### error.js

Error boundary.

```
app/blog/error.js
```

---

### not-found.js

404 page.

```
app/not-found.js
```

---

### template.js

Like layout but remounts every navigation.

```
app/dashboard/template.js
```

---

### route.js

API endpoint.

```
app/api/users/route.js
```

---

# Complete Folder Example

```text
app/
│
├── page.js
│
├── about/
│   └── page.js
│
├── blog/
│   ├── page.js
│   ├── [id]/
│   │   └── page.js
│   ├── [...slug]/
│   │   └── page.js
│   └── [[...slug]]/
│       └── page.js
│
├── (marketing)/
│   └── pricing/
│       └── page.js
│
├── dashboard/
│   ├── layout.js
│   ├── page.js
│   ├── settings/
│   │   └── page.js
│   ├── @team/
│   │   └── page.js
│   └── @analytics/
│       └── page.js
│
├── api/
│   └── users/
│       └── route.js
│
├── loading.js
├── error.js
├── not-found.js
└── layout.js
```

### Quick Cheat Sheet

| Type               | Syntax               |
| ------------------ | -------------------- |
| Static Route       | `about/page.js`      |
| Dynamic Route      | `[id]`               |
| Catch-All          | `[...slug]`          |
| Optional Catch-All | `[[...slug]]`        |
| Route Group        | `(group)`            |
| Private Folder     | `_folder`            |
| Parallel Route     | `@team`              |
| Intercepting Route | `(.)` `(..)` `(...)` |
| Layout             | `layout.js`          |
| Template           | `template.js`        |
| Loading UI         | `loading.js`         |
| Error UI           | `error.js`           |
| 404 Page           | `not-found.js`       |
| API Route          | `route.js`           |

For interviews, the most commonly asked routing types are: **Static Routes, Dynamic Routes, Catch-All Routes, Optional Catch-All Routes, Route Groups, Parallel Routes, Intercepting Routes, and Layouts**. These are considered the core Next.js App Router routing concepts.
