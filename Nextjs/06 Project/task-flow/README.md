# TaskFlow

TaskFlow is a full-stack Todo application built with Next.js, TypeScript, Prisma, PostgreSQL, Docker, Tailwind CSS, and shadcn/ui.

It helps users create, update, delete, and manage tasks efficiently while demonstrating core full-stack concepts.

---
# Preview

## Landing Page
![Landing Page](./public/screenshots/N2.png)
## Dashboard
![Dashboard](./public/screenshots/N3.png)

## Tasks Page
![Tasks Page](./public/screenshots/N1.png)

## Database
![Task Details](./public/screenshots/N5.png)

---

# Core Project Flow

Think of the app like this:

```text
User → Route → Page → Component → Action/API → Prisma → PostgreSQL
```

That is the complete full-stack flow.

Example:

```text
Create Task
↓
User submits form
↓
Server Action runs
↓
Validation checks data
↓
Prisma writes to DB
↓
PostgreSQL stores it
↓
UI revalidates and updates
```

Simple memory trick:

```text
app = routes
components = UI
lib = logic
types = type safety
api = external access
prisma = database bridge
```

---

# Tech Stack

* Next.js 16 (App Router)
* TypeScript
* Tailwind CSS
* Prisma ORM
* PostgreSQL
* Docker
* Zod
* React 19
* shadcn/ui
* pnpm

---

# Features

* Create Tasks
* Update Tasks
* Delete Tasks
* Mark Tasks as Complete
* Set Task Priority
* Add Descriptions
* Due Dates
* Dashboard Overview
* Task Analytics
* Server Actions
* API Routes
* Error Handling
* Loading UI
* Error UI
* Not Found UI

---

# Project Structure

```bash
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   │
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   │
│   ├── tasks/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── [id]/
│   │   │   ├── page.tsx
│   │   │   └── not-found.tsx
│   │
│   ├── analytics/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   │
│   ├── settings/
│   │   └── page.tsx
│   │
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│
├── components/
│   ├── Navbar.tsx
│   ├── TaskCard.tsx
│   ├── TaskForm.tsx
│   ├── TaskList.tsx
│   ├── TaskStats.tsx
│
├── lib/
│   ├── prisma.ts
│   ├── actions.ts
│   ├── validations.ts
│
├── types/
│   ├── task.ts
```

---

# Folder Structure Explained

---

## 1. `src/app/` → Main entry point

This is the heart of the Next.js App Router.

Think:

```text
app = routes
```

Every folder inside `app` becomes a route.

Example:

```bash
app/tasks/page.tsx
```

becomes:

```text
/tasks
```

Flow:

```text
User → Route → Page → Components → Logic → Database
```

---

## 2. `layout.tsx` → Global wrapper

File:

```bash
app/layout.tsx
```

Wraps every page.

Flow:

```text
Browser opens page
↓
layout.tsx loads
↓
Navbar loads
↓
Page content loads
```

Example:

```text
/tasks
```

Actual:

```text
layout.tsx
↓
Navbar
↓
tasks/page.tsx
```

Think of it as the application skeleton.

---

## 3. `page.tsx` → Route pages

Each `page.tsx` creates a route.

Examples:

```bash
app/page.tsx → /
app/tasks/page.tsx → /tasks
app/dashboard/page.tsx → /dashboard
app/analytics/page.tsx → /analytics
app/settings/page.tsx → /settings
```

Flow:

```text
User clicks route
↓
page.tsx executes
↓
loads components
↓
fetches data
↓
renders UI
```

---

## 4. Dynamic Routes `[id]`

Folder:

```bash
app/tasks/[id]/page.tsx
```

Routes:

```text
/tasks/123
/tasks/abc
```

Flow:

```text
User clicks task
↓
TaskCard Link
↓
/tasks/task-id
↓
[id]/page.tsx
↓
Gets params.id
↓
Prisma fetches task
↓
Shows details
```

Example:

```ts
params.id
```

Used to identify the task.

---

# Special Files

---

## `loading.tsx`

Shows temporary UI while data loads.

Flow:

```text
Open page
↓
Fetching data
↓
loading.tsx
↓
Real UI appears
```

---

## `error.tsx`

Handles crashes.

Flow:

```text
Page fails
↓
error.tsx catches it
↓
Shows fallback UI
```

Useful for Prisma/API failures.

---

## `not-found.tsx`

Handles invalid routes.

Flow:

```text
Invalid task ID
↓
No task found
↓
notFound()
↓
404 UI
```

---

# Components

Think:

```text
pages = big
components = reusable pieces
```

---

## `Navbar.tsx`

Used globally inside `layout.tsx`.

Flow:

```text
Every page
↓
Navbar visible
```

---

## `TaskForm.tsx`

Used on task creation.

Flow:

```text
User fills form
↓
Submit
↓
Server Action
↓
Task created
```

---

## `TaskList.tsx`

Displays all tasks.

Flow:

```text
Tasks page loads
↓
TaskList receives tasks
↓
Maps tasks
↓
Renders TaskCard
```

---

## `TaskCard.tsx`

Displays one task.

Shows:

* Title
* Description
* Priority
* Checkbox
* Delete Button

Flow:

```text
TaskList
↓
TaskCard
↓
User interacts
```

---

## `TaskStats.tsx`

Reusable stats UI.

Used in:

* `/dashboard`
* `/analytics`

Flow:

```text
Page fetches counts
↓
Passes data
↓
TaskStats renders
```

---

# `lib/` → Business Logic

Think:

```text
lib = backend logic
```

---

## `prisma.ts`

Database connection.

Flow:

```text
Need database
↓
Import prisma
↓
Run query
```

Single Prisma client.

---

## `actions.ts`

Server Actions.

Used for:

* Create Task
* Update Task
* Delete Task
* Toggle Task Status

Flow:

```text
Form submit
↓
Action function
↓
Prisma query
↓
Database updated
↓
revalidatePath()
↓
UI refreshes
```

---

## `validations.ts`

Zod validation.

Flow:

```text
User input
↓
Validate
↓
Valid → continue
Invalid → reject
```

Protects database integrity.

---

# `types/` → Type Safety

File:

```bash
types/task.ts
```

Defines task structure.

Flow:

```text
Task data
↓
TypeScript checks
↓
Safer code
```

Example:

```ts
title: string
priority: "LOW" | "MEDIUM" | "HIGH"
completed: boolean
```

---

# API Routes

Used for external/public CRUD.

Difference:

```text
API Routes = public/external CRUD
Server Actions = internal mutations/forms
```

---

## Routes

| Method | Endpoint         | Purpose       |
| ------ | ---------------- | ------------- |
| GET    | `/api/tasks`     | Get all tasks |
| POST   | `/api/tasks`     | Create task   |
| PATCH  | `/api/tasks/:id` | Update task   |
| DELETE | `/api/tasks/:id` | Delete task   |

Flow:

```text
Client/Postman
↓
API Route
↓
Prisma
↓
Database
↓
Response
```

---

# Application Routes

| Route         | Purpose      |
| ------------- | ------------ |
| `/`           | Landing Page |
| `/dashboard`  | Dashboard    |
| `/tasks`      | All Tasks    |
| `/tasks/[id]` | Task Details |
| `/analytics`  | Analytics    |
| `/settings`   | Settings     |

---

# Rendering Strategy

## SSG

Used for:

```text
/
```

Reason:

Static landing page.

---

## SSR

Used for:

```text
/dashboard
/tasks
/tasks/[id]
```

Reason:

Dynamic task data.

---

## ISR

Used for:

```text
/analytics
```

Reason:

Analytics refresh periodically.

```ts
export const revalidate = 60
```

---

# Full Flows

---

## Create Task Flow

```text
/tasks
↓
TaskForm
↓
createTask()
↓
Zod validation
↓
Prisma create
↓
PostgreSQL
↓
revalidatePath("/tasks")
↓
TaskList updates
↓
TaskCard shows new task
```

---

## Toggle Task Flow

```text
TaskCard checkbox click
↓
toggleTask()
↓
Prisma update
↓
PostgreSQL update
↓
revalidatePath()
↓
Dashboard updates
↓
Analytics updates
```

---

## Delete Task Flow

```text
TaskCard delete button
↓
deleteTask()
↓
Prisma delete
↓
Database delete
↓
UI refresh
```

---

# Environment Variables

Create `.env`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todoapp?schema=public"
```

Create `.env.example`

```env
DATABASE_URL=""
```

---

# Setup

## 1. Install dependencies

```bash
pnpm install
```

---

## 2. Start PostgreSQL with Docker

```bash
docker compose up -d
```

---

## 3. Generate Prisma Client

```bash
pnpm prisma generate
```

---

## 4. Run migrations

```bash
pnpm prisma migrate dev --name init
```

---

## 5. Open Prisma Studio

```bash
pnpm prisma studio
```

Runs on:

```text
http://localhost:5555
```

---

## 6. Start development server

```bash
pnpm dev
```

Runs on:

```text
http://localhost:3000
```

---

# Useful Commands

## Prisma

```bash
pnpm prisma generate
pnpm prisma migrate dev --name init
pnpm prisma migrate reset
pnpm prisma validate
pnpm prisma format
pnpm prisma studio
```

---

## Docker

```bash
docker compose up -d
docker compose down
docker compose down -v
docker ps
```

---

# Concepts Covered

* Next.js Setup
* File-Based Routing
* Layouts
* Dynamic Routes
* API Routes
* CRUD Operations
* Database Integration
* Prisma ORM
* Docker Setup
* Server Actions
* SSR
* SSG
* ISR
* Loading UI
* Error Boundaries
* Not Found Handling
* TypeScript
* Error Handling

---

# Future Improvements

* Authentication
* Search & Filters
* Categories
* Dark Mode
* Drag & Drop
* Notifications

---

# Author

Prince Kumar