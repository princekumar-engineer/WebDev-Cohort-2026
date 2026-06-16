Simple version:

When using Prisma with Next.js, there are 3 common problems.

Think of it like this:

---

# 1. Prisma accidentally goes to browser (Big problem)

Problem:

Prisma should only run on the server.

Bad example:

```tsx
"use client"
import { prisma } from "@/lib/prisma"
```

Why bad?

Browser cannot talk directly to database.

Browser only knows:

* HTML
* CSS
* JS

It does NOT know:

* PostgreSQL
* file system
* database drivers

So Prisma crashes.

---

Easy rule:

### Prisma only inside:

✅ API Routes
✅ Server Components
✅ Server Actions

Never inside:

❌ Client Components

---

Good:

```tsx
// server component
const tasks = await prisma.task.findMany()
```

Bad:

```tsx
"use client"
const tasks = await prisma.task.findMany()
```

---

# 2. Too many database connections

Problem:

In dev mode:

Every save = Next.js reload.

If you write:

```ts
const prisma = new PrismaClient()
```

every save creates a new DB connection.

Example:

Save 10 times:

```text
10 prisma clients
10 database connections
```

Bad.

Database gets overloaded.

---

Fix:

Use one shared client.

Like:

```ts
globalThis.prisma
```

Think:

Instead of opening a new door every time,
reuse the same door.

Good:

```ts
const globalForPrisma = globalThis as {
  prisma?: PrismaClient
}
```

This keeps one connection.

---

# 3. Turbopack breaks Prisma

Problem:

Next.js uses Turbopack.

Turbopack tries to optimize everything.

But Prisma has generated files.

Turbopack sometimes touches those files and breaks them.

You may see:

```text
__TURBOPACK__
PrismaClient cannot be evaluated
```

---

Fix:

Tell Next.js:

"Don't touch Prisma"

Inside:

```ts
next.config.ts
```

add:

```ts
const nextConfig = {
  serverExternalPackages: ["@prisma/client"],
}
```

Simple.

---

# Best setup (easy rules)

### File:

```text
src/lib/prisma.ts
```

Keep Prisma here.

---

### Fetch data in server components

Good:

```tsx
app/tasks/page.tsx
```

Fetch here.

Pass to UI.

---

### UI components stay client-side

Good:

```tsx
TaskCard.tsx
TaskForm.tsx
```

No Prisma here.

---

Simple memory trick:

```text
Prisma = Server only
UI = Client only
API = Bridge
```

That’s the whole idea.
