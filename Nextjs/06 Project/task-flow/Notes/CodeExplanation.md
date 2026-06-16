Good. We’ll build this **step by step** in the correct order so you understand everything.

Build order:

1. Prisma Client Setup
2. Types
3. Validation
4. API Routes
5. Server Actions
6. UI Components
7. Pages
8. Rendering Strategies

We start with the foundation.

---

# Step 1: Prisma Client Setup

File:

`src/lib/prisma.ts`

Code:

```ts
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as {
  prisma?: PrismaClient
}

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
```

---

## What this does

This creates a reusable Prisma client.

Without this:

```ts
const prisma = new PrismaClient()
```

inside every file creates multiple DB connections.

That causes:

* memory leaks
* too many open connections
* crashes in development

---

## Why `globalThis`

In Next.js dev mode:

Hot reload refreshes files often.

Without `globalThis`:

```ts
new PrismaClient()
```

runs again and again.

With:

```ts
globalForPrisma.prisma
```

it reuses the existing connection.

---

## Production behavior

In production:

```ts
process.env.NODE_ENV === "production"
```

It creates a fresh client normally.

Good practice.

---

## How to use it

Example:

```ts
import { prisma } from "@/lib/prisma"

const tasks = await prisma.task.findMany()
```

That’s it.

---

This file is your database gateway.

Next step:

**Step 2 → Create TypeScript types (`src/types/task.ts`)**.

Great.

# Step 2: Create TypeScript Types

File:

`src/types/task.ts`

Code:

```ts id="j4z1ha"
export type Priority = "LOW" | "MEDIUM" | "HIGH"

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: Priority
  dueDate?: Date | null
  createdAt: Date
  updatedAt: Date
}
```

---

## Why do we need this?

This defines the shape of a Task.

Think of it as the blueprint.

Without TypeScript:

```ts id="xj7h4l"
const task = {
  title: 123
}
```

This could happen.

That’s wrong.

With TypeScript:

```ts id="s5y0q3"
title: string
```

it will throw an error.

Safer code.

---

## Field explanation

### `id`

```ts id="id1"
id: string
```

Unique identifier.

From Prisma:

```prisma id="id2"
id String @id @default(uuid())
```

Example:

```text id="id3"
a8d7b2f1-9e1d-4b2f
```

---

### `title`

```ts id="t1"
title: string
```

Task name.

Example:

```text id="t2"
Finish assignment
```

Required.

---

### `description`

```ts id="d1"
description?: string
```

Optional.

`?` means not required.

Example:

```text id="d2"
Build API routes
```

---

### `completed`

```ts id="c1"
completed: boolean
```

Tracks status.

Example:

```ts id="c2"
true
false
```

---

### `priority`

```ts id="p1"
priority: Priority
```

Only allows:

```ts id="p2"
"LOW"
"MEDIUM"
"HIGH"
```

No invalid values.

---

### `dueDate`

```ts id="du1"
dueDate?: Date | null
```

Can be:

* missing
* null
* actual date

Flexible.

---

### `createdAt`

```ts id="cr1"
createdAt: Date
```

Automatically created by Prisma.

---

### `updatedAt`

```ts id="up1"
updatedAt: Date
```

Automatically updated on changes.

---

## Where this type will be used

In:

### Components

```ts id="use1"
task: Task
```

---

### API responses

```ts id="use2"
data: Task[]
```

---

### Server Actions

```ts id="use3"
createTask(task: Task)
```

---

This keeps your app strongly typed.

Next:

**Step 3 → Validation with Zod (`src/lib/validations.ts`)**

This is important for API safety.

Good.

# Step 3: Validation with Zod

Before saving data into the database, we should validate it.

Why?

Because users can send bad data like:

```json
{
  "title": "",
  "priority": "SUPERHIGH"
}
```

That would break our app.

We use Zod to prevent this.

---

## Install Zod

Run:

```bash id="z1"
pnpm add zod
```

---

## Create validation file

File:

`src/lib/validations.ts`

Code:

```ts id="z2"
import { z } from "zod"

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .optional(),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH"
  ]),

  dueDate: z
    .string()
    .optional()
})
```

---

# Explanation

---

## `z.object()`

Creates a validation schema.

Think of it like rules.

```ts id="z3"
z.object({...})
```

Everything inside must follow those rules.

---

## `title`

```ts id="z4"
title: z.string().min(3)
```

Rules:

* must be text
* minimum 3 characters

Valid:

```ts id="z5"
"Learn Next.js"
```

Invalid:

```ts id="z6"
"Hi"
```

Error:

```text
Title must be at least 3 characters
```

---

## `description`

```ts id="z7"
description: z.string().optional()
```

Means:

This field can exist or not.

Valid:

```ts id="z8"
"Build CRUD API"
```

Also valid:

```ts id="z9"
undefined
```

---

## `priority`

```ts id="z10"
z.enum(["LOW", "MEDIUM", "HIGH"])
```

Only these values allowed.

Valid:

```ts id="z11"
"HIGH"
```

Invalid:

```ts id="z12"
"URGENT"
```

Rejected.

---

## `dueDate`

```ts id="z13"
dueDate: z.string().optional()
```

Optional.

We receive dates as strings from forms.

Example:

```ts id="z14"
"2026-07-20"
```

Later Prisma converts it.

---

# How to use it

Example in API:

```ts id="z15"
const body = await req.json()

const validatedData =
  taskSchema.safeParse(body)
```

---

## `safeParse()`

Safely checks data.

If valid:

```ts id="z16"
validatedData.success === true
```

If invalid:

```ts id="z17"
validatedData.success === false
```

---

Example:

```ts id="z18"
if (!validatedData.success) {
  return Response.json({
    success: false,
    errors: validatedData.error.flatten()
  })
}
```

Good error handling.

---

Why evaluators like this:

✅ Input validation
✅ Safer APIs
✅ Cleaner code
✅ Better TypeScript integration

This improves code quality marks.

Next:

**Step 4 → Build API Routes (GET + POST)**
This is where CRUD starts.
---
Good.

# Step 4: API Routes (GET + POST)

We will create:

```bash id="api1"
src/app/api/tasks/route.ts
```

This file will handle:

* GET → Fetch all tasks
* POST → Create new task

This covers:

✅ API Routes
✅ GET
✅ POST
✅ DB Integration
✅ Error Handling
✅ Structured Responses

---

## Code

```ts id="api2"
import { prisma } from "@/lib/prisma"
import { taskSchema } from "@/lib/validations"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tasks"
      },
      {
        status: 500
      }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const validatedData =
      taskSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          errors:
            validatedData.error.flatten()
        },
        {
          status: 400
        }
      )
    }

    const task = await prisma.task.create({
      data: {
        title: validatedData.data.title,
        description:
          validatedData.data.description,
        priority:
          validatedData.data.priority,
        dueDate:
          validatedData.data.dueDate
            ? new Date(
                validatedData.data.dueDate
              )
            : null
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: "Task created successfully",
        data: task
      },
      {
        status: 201
      }
    )
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create task"
      },
      {
        status: 500
      }
    )
  }
}
```

---

# Explanation

---

# GET Method

Runs when:

```http id="g1"
GET /api/tasks
```

Example:

```ts id="g2"
const tasks =
  await prisma.task.findMany()
```

This fetches all tasks.

---

## Ordering

```ts id="g3"
orderBy: {
  createdAt: "desc"
}
```

Newest tasks first.

Example:

Newest → Oldest

Good UX.

---

## Response

```ts id="g4"
return NextResponse.json({
  success: true,
  data: tasks
})
```

Returns:

```json id="g5"
{
  "success": true,
  "data": []
}
```

Structured API response.

Assignment requirement.

---

# POST Method

Runs when:

```http id="p1"
POST /api/tasks
```

Used to create tasks.

---

## Reading request body

```ts id="p2"
const body = await req.json()
```

Example:

```json id="p3"
{
  "title": "Learn Prisma",
  "priority": "HIGH"
}
```

---

## Validation

```ts id="p4"
taskSchema.safeParse(body)
```

Checks if:

* title exists
* title length >= 3
* priority valid

If invalid:

```ts id="p5"
return NextResponse.json(...)
```

Prevents bad data.

---

## Creating task

```ts id="p6"
await prisma.task.create(...)
```

Saves task in database.

---

## Due Date conversion

Forms send:

```ts id="p7"
"2026-07-30"
```

Database expects:

```ts id="p8"
Date
```

So we convert:

```ts id="p9"
new Date(...)
```

---

## Success response

Returns:

```json id="p10"
{
  "success": true,
  "message": "Task created successfully",
  "data": {...}
}
```

---

# Test it

Run dev server:

```bash id="test1"
pnpm dev
```

Test:

GET:

```text id="test2"
/api/tasks
```

POST (using Postman):

```json id="test3"
{
  "title": "Build Todo App",
  "description": "Next.js assignment",
  "priority": "HIGH",
  "dueDate": "2026-07-30"
}
```

Expected:

Task created.

---

This gives you:

✅ Read
✅ Create

Next:

**Step 5 → API Routes (PATCH + DELETE)**
Completes CRUD.
---
Good.

# Step 5: API Routes (PATCH + DELETE)

Now we complete CRUD.

Create:

```bash id="a1"
src/app/api/tasks/[id]/route.ts
```

This file handles:

* PATCH → Update task
* DELETE → Remove task

Covers:

✅ PATCH
✅ DELETE
✅ Dynamic routes
✅ Full CRUD
✅ Database update/delete

---

## Code

```ts id="a2"
import { prisma } from "@/lib/prisma"
import { taskSchema } from "@/lib/validations"
import { NextResponse } from "next/server"

interface Params {
  params: Promise<{
    id: string
  }>
}

export async function PATCH(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params
    const body = await req.json()

    const validatedData =
      taskSchema.partial().safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          errors:
            validatedData.error.flatten()
        },
        {
          status: 400
        }
      )
    }

    const updatedTask =
      await prisma.task.update({
        where: {
          id
        },
        data: {
          ...validatedData.data,
          dueDate:
            validatedData.data.dueDate
              ? new Date(
                  validatedData.data.dueDate
                )
              : undefined
        }
      })

    return NextResponse.json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update task"
      },
      {
        status: 500
      }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params

    await prisma.task.delete({
      where: {
        id
      }
    })

    return NextResponse.json({
      success: true,
      message: "Task deleted successfully"
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete task"
      },
      {
        status: 500
      }
    )
  }
}
```

---

# Explanation

---

# Dynamic Route

File:

```bash id="a3"
tasks/[id]/route.ts
```

This means:

```http id="a4"
PATCH /api/tasks/123
DELETE /api/tasks/123
```

`123` becomes:

```ts id="a5"
params.id
```

Dynamic routing concept covered.

Assignment requirement.

---

# PATCH Method

Used to update task.

Example:

```http id="a6"
PATCH /api/tasks/123
```

Body:

```json id="a7"
{
  "title": "Updated title",
  "completed": true
}
```

---

## `taskSchema.partial()`

Important:

```ts id="a8"
taskSchema.partial()
```

Makes every field optional.

Normally:

```ts id="a9"
title required
priority required
```

For updates:

We may only send:

```json id="a10"
{
  "completed": true
}
```

So partial is necessary.

---

# Update query

```ts id="a11"
await prisma.task.update(...)
```

Updates matching task.

Uses:

```ts id="a12"
where: { id }
```

---

# DELETE Method

Used to remove task.

Example:

```http id="a13"
DELETE /api/tasks/123
```

Deletes task permanently.

---

# Delete query

```ts id="a14"
await prisma.task.delete(...)
```

Simple.

Deletes by ID.

---

# Testing

---

## PATCH

Use Postman:

```http id="a15"
PATCH /api/tasks/{id}
```

Body:

```json id="a16"
{
  "title": "Finish project",
  "priority": "HIGH"
}
```

Expected:

```json id="a17"
{
  "success": true
}
```

---

## DELETE

```http id="a18"
DELETE /api/tasks/{id}
```

Expected:

```json id="a19"
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

Now your API is complete:

✅ GET
✅ POST
✅ PATCH
✅ DELETE

Full assignment CRUD done.

Next:

**Step 6 → Server Actions (`src/lib/actions.ts`)**

This is important because it’s separately evaluated.
---

Good.

# Step 6: Server Actions

This is one of the most important parts of your assignment.

Your teacher specifically wants:

✅ `use server`
✅ Meaningful use case
✅ Difference between API Routes and Server Actions

We will create:

```bash id="sa1"
src/lib/actions.ts
```

Server Actions are best for:

* Form submission
* Internal mutations
* Faster updates
* Avoid manual API calls

---

## Code

```ts id="sa2"
"use server"

import { prisma } from "@/lib/prisma"
import { taskSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"

export async function createTask(
  formData: FormData
) {
  try {
    const rawData = {
      title: formData.get("title"),
      description:
        formData.get("description"),
      priority: formData.get("priority"),
      dueDate: formData.get("dueDate")
    }

    const validatedData =
      taskSchema.safeParse(rawData)

    if (!validatedData.success) {
      throw new Error("Invalid task data")
    }

    await prisma.task.create({
      data: {
        title: validatedData.data.title,
        description:
          validatedData.data.description,
        priority:
          validatedData.data.priority,
        dueDate:
          validatedData.data.dueDate
            ? new Date(
                validatedData.data.dueDate
              )
            : null
      }
    })

    revalidatePath("/tasks")
  } catch (error) {
    console.error(error)
    throw new Error(
      "Failed to create task"
    )
  }
}

export async function toggleTask(
  id: string,
  completed: boolean
) {
  try {
    await prisma.task.update({
      where: { id },
      data: {
        completed: !completed
      }
    })

    revalidatePath("/tasks")
  } catch {
    throw new Error(
      "Failed to update task"
    )
  }
}

export async function deleteTask(
  id: string
) {
  try {
    await prisma.task.delete({
      where: { id }
    })

    revalidatePath("/tasks")
  } catch {
    throw new Error(
      "Failed to delete task"
    )
  }
}
```

---

# Explanation

---

# `"use server"`

Very important.

```ts id="sa3"
"use server"
```

Marks this file as server-only.

Means:

Runs on server.

Not browser.

Required by assignment.

---

# `createTask()`

Used for form submissions.

Input:

```ts id="sa4"
formData: FormData
```

Comes directly from HTML form.

Example:

```html id="sa5"
<form action={createTask}>
```

No fetch needed.

Very clean.

---

# Reading form data

```ts id="sa6"
formData.get("title")
```

Gets form field values.

Example:

```html id="sa7"
<input name="title" />
```

Matches automatically.

---

# Validation

Same Zod schema.

Keeps consistency.

---

# Creating task

```ts id="sa8"
await prisma.task.create(...)
```

Saves to DB.

---

# `revalidatePath()`

Very important.

```ts id="sa9"
revalidatePath("/tasks")
```

Refreshes cache.

So UI updates immediately.

Without this:

Old cached data may show.

---

# `toggleTask()`

Used to mark complete/incomplete.

Logic:

```ts id="sa10"
completed: !completed
```

Flips:

```ts id="sa11"
true → false
false → true
```

Simple.

---

# `deleteTask()`

Deletes task directly.

Used in buttons.

---

# Why Server Actions?

Example:

Without Server Actions:

```ts id="sa12"
fetch("/api/tasks", ...)
```

More code.

More complexity.

---

With Server Actions:

```ts id="sa13"
<form action={createTask}>
```

Direct.

Fast.

Cleaner.

---

# API Routes vs Server Actions

Important for viva:

## API Routes

Used for:

* Public APIs
* External clients
* CRUD endpoints

Example:

```http id="sa14"
GET /api/tasks
```

---

## Server Actions

Used for:

* Internal app mutations
* Forms
* Buttons

Example:

```ts id="sa15"
createTask()
```

No API request needed.

---

This distinction gives marks.

Next:

**Step 7 → Build UI Components (`TaskForm.tsx`)**

This connects Server Actions to your frontend.
---
Current progress:

✅ Prisma setup
✅ Types
✅ Validation
✅ API Routes (CRUD)
✅ Server Actions
✅ Project structure
✅ Tailwind + shadcn setup

Now we start UI.

Next step:

# Step 7: Build TaskForm Component

File:

```bash
src/components/TaskForm.tsx
```

Purpose:

This component will:

* create new tasks
* use Server Actions directly
* use shadcn components
* connect frontend → backend

This is important because it demonstrates:

✅ Server Actions in UI
✅ Form handling
✅ Internal mutations

---

## Code

```tsx
"use client"

import { createTask } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useState } from "react"

export default function TaskForm() {
  const [priority, setPriority] =
    useState("MEDIUM")

  return (
    <form
      action={createTask}
      className="space-y-4"
    >
      <Input
        name="title"
        placeholder="Enter task title"
        required
      />

      <Textarea
        name="description"
        placeholder="Task description"
      />

      <Select
        name="priority"
        defaultValue={priority}
        onValueChange={setPriority}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="LOW">
            Low
          </SelectItem>

          <SelectItem value="MEDIUM">
            Medium
          </SelectItem>

          <SelectItem value="HIGH">
            High
          </SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="date"
        name="dueDate"
      />

      <Button type="submit">
        Create Task
      </Button>
    </form>
  )
}
```

---

# Explanation

---

# `"use client"`

Required because:

```tsx
useState()
```

is client-side.

Without:

```tsx
"use client"
```

Next.js will throw error.

---

# Form action

Important:

```tsx
<form action={createTask}>
```

This directly connects:

Form → Server Action

No:

```tsx
fetch("/api/tasks")
```

needed.

Cleaner.

---

# Input fields

Each field matches:

```ts
formData.get("fieldName")
```

inside:

```ts
createTask()
```

Example:

```tsx
<Input name="title" />
```

matches:

```ts
formData.get("title")
```

---

# Select component

Used for:

Priority.

Values:

```ts
LOW
MEDIUM
HIGH
```

Matches Prisma enum.

---

# Due date

Uses:

```tsx
type="date"
```

Browser returns:

```ts
"2026-07-20"
```

Server Action converts:

```ts
new Date(...)
```

---

# Submit flow

User clicks:

```text
Create Task
```

Then:

```text
TaskForm → createTask() → Prisma → PostgreSQL → revalidatePath("/tasks")
```

Full cycle.

Very important concept.

---

Next:

# Step 8: Build TaskCard Component

This will display each task and connect:

* toggleTask()
* deleteTask()

This makes your Todo app functional.
---
Good.

# Step 8: Build TaskCard Component

File:

```bash id="tc1"
src/components/TaskCard.tsx
```

Purpose:

This component will:

* display task details
* toggle task completion
* delete task
* show priority badge

This connects UI with Server Actions.

---

## Code

```tsx id="tc2"
"use client"

import { Task } from "@/types/task"
import {
  toggleTask,
  deleteTask
} from "@/lib/actions"

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TaskCardProps {
  task: Task
}

export default function TaskCard({
  task
}: TaskCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="space-y-2">
          <h2
            className={`font-semibold ${
              task.completed
                ? "line-through text-gray-400"
                : ""
            }`}
          >
            {task.title}
          </h2>

          {task.description && (
            <p className="text-sm text-gray-500">
              {task.description}
            </p>
          )}

          <div className="flex gap-2">
            <Badge>
              {task.priority}
            </Badge>

            {task.dueDate && (
              <Badge variant="outline">
                {new Date(
                  task.dueDate
                ).toLocaleDateString()}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <form
            action={() =>
              toggleTask(
                task.id,
                task.completed
              )
            }
          >
            <Checkbox
              checked={task.completed}
            />
          </form>

          <form
            action={() =>
              deleteTask(task.id)
            }
          >
            <Button
              variant="destructive"
              type="submit"
            >
              Delete
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
```

---

# Explanation

---

# Props

```tsx id="tc3"
task: Task
```

This receives one task object.

Example:

```ts id="tc4"
{
  title: "Build API",
  completed: false
}
```

Typed using:

```ts id="tc5"
Task
```

from:

```bash id="tc6"
types/task.ts
```

Strong TypeScript.

---

# Card UI

Uses shadcn:

```tsx id="tc7"
<Card>
```

Cleaner task display.

---

# Conditional description

Only show if exists:

```tsx id="tc8"
task.description && (...)
```

Avoid empty UI.

---

# Priority badge

Shows:

```tsx id="tc9"
LOW
MEDIUM
HIGH
```

Good visual.

---

# Due Date badge

Shows date only if available.

Converts:

```ts id="tc10"
Date → readable string
```

Example:

```text id="tc11"
6/20/2026
```

---

# Completed styling

If completed:

```tsx id="tc12"
line-through
```

Visual feedback.

Good UX.

---

# Toggle form

This is important:

```tsx id="tc13"
<form action={() => toggleTask(...)}>
```

Direct Server Action.

No API call.

Flow:

```text id="tc14"
Checkbox → Server Action → Prisma → DB
```

---

# Delete form

Same:

```tsx id="tc15"
<form action={() => deleteTask(...)}>
```

Deletes task directly.

Simple.

---

Important note:

Right now checkbox click won’t submit automatically.

Fix:

Change:

```tsx id="tc16"
<Checkbox checked={task.completed} />
```

to:

```tsx id="tc17"
<Checkbox
  checked={task.completed}
  onCheckedChange={() =>
    toggleTask(
      task.id,
      task.completed
    )
  }
/>
```

Better.

Use this final version.

---

Now you can:

✅ View task
✅ Toggle complete
✅ Delete task

Functional.

Next:

# Step 9: Build TaskList Component

This fetches tasks and renders all TaskCards. This is your SSR page foundation.

---
Good.

# Step 9: Build TaskList Component

File:

```bash id="tl1"
src/components/TaskList.tsx
```

Purpose:

This component will:

* fetch all tasks from database
* render TaskCard for each task
* run on server (SSR)

This covers:

✅ Server Components
✅ SSR
✅ Database fetching

---

## Code

```tsx id="tl2"
import { prisma } from "@/lib/prisma"
import TaskCard from "./TaskCard"

export default async function TaskList() {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No tasks found.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
        />
      ))}
    </div>
  )
}
```

---

# Explanation

---

# Async component

Important:

```tsx id="tl3"
export default async function TaskList()
```

This means:

Server Component.

Allows:

```ts id="tl4"
await prisma.task.findMany()
```

directly.

No `useEffect`.

No fetch.

Cleaner.

---

# Database query

```ts id="tl5"
const tasks =
  await prisma.task.findMany()
```

Reads all tasks.

Direct DB query.

Fast.

---

# Sorting

```ts id="tl6"
orderBy: {
  createdAt: "desc"
}
```

Shows latest first.

Good UX.

---

# Empty state

If no tasks:

```tsx id="tl7"
No tasks found.
```

Better than blank page.

Important UI handling.

---

# Rendering tasks

Loops:

```tsx id="tl8"
tasks.map(...)
```

Each task becomes:

```tsx id="tl9"
<TaskCard />
```

Reusable component.

Clean code.

---

# Why this is SSR?

Because:

```tsx id="tl10"
await prisma.task.findMany()
```

runs on server.

Each request gets fresh data.

Perfect for:

```bash id="tl11"
/tasks
```

Dynamic content.

Assignment requirement.

---

Flow:

```text id="tl12"
Page → TaskList → Prisma → PostgreSQL → TaskCard
```

Full stack connected.

---

Next:

# Step 10: Build Navbar Component

This connects all routes:

* Home
* Dashboard
* Tasks
* Analytics
* Settings

Important for routing demonstration.

---
# Step 10: Build Navbar Component

File:

```bash id="nv1"
src/components/Navbar.tsx
```

Purpose:

This component connects all routes.

Covers:

✅ File-based routing
✅ Navigation
✅ Layout usage

---

## Code

```tsx id="nv2"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="border-b px-6 py-4">
      <div className="flex items-center gap-6">
        <Link href="/">
          Home
        </Link>

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/tasks">
          Tasks
        </Link>

        <Link href="/analytics">
          Analytics
        </Link>

        <Link href="/settings">
          Settings
        </Link>
      </div>
    </nav>
  )
}
```

---

# Explanation

Uses:

```tsx id="nv3"
Link
```

from Next.js.

Why?

Because:

```tsx id="nv4"
<Link />
```

gives client-side navigation.

Faster than:

```html id="nv5"
<a>
```

---

Routes covered:

```text id="nv6"
/                → Landing
/dashboard       → Dashboard
/tasks           → All tasks
/analytics       → Analytics
/settings        → Settings
```

Good assignment coverage.

---

# Step 11: Add Navbar to Root Layout

File:

```bash id="lay1"
src/app/layout.tsx
```

Code:

```tsx id="lay2"
import "./globals.css"
import Navbar from "@/components/Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-4xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  )
}
```

---

# Explanation

This is your global layout.

Every page gets:

```text id="lay3"
Navbar
Main container
```

Automatically.

This demonstrates:

✅ Layouts in Next.js
✅ Shared UI
✅ Nested routing system

Assignment requirement.

---

Next:

# Step 12: Build `/tasks/page.tsx`

This is your main Todo page.

It will combine:

* TaskForm
* TaskList

This makes the app usable.

---
Good.

# Step 12: Build Tasks Page

File:

```bash id="tp1"
src/app/tasks/page.tsx
```

Purpose:

This is the main Todo page.

It combines:

* TaskForm → create tasks
* TaskList → show tasks

This becomes the core page of your app.

Covers:

✅ SSR
✅ Multiple pages/routes
✅ Server Components
✅ Server Actions

---

## Code

```tsx id="tp2"
import TaskForm from "@/components/TaskForm"
import TaskList from "@/components/TaskList"

export const dynamic = "force-dynamic"

export default function TasksPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Task Manager
        </h1>

        <p className="text-gray-500">
          Create and manage your tasks
        </p>
      </div>

      <TaskForm />

      <TaskList />
    </div>
  )
}
```

---

# Explanation

---

# Imports

We combine:

```tsx id="tp3"
TaskForm
TaskList
```

This makes:

Full Todo page.

---

# `dynamic = "force-dynamic"`

Important:

```ts id="tp4"
export const dynamic = "force-dynamic"
```

Forces SSR.

Why?

Tasks change frequently.

Without this:

Next may cache.

With this:

Every request gets fresh DB data.

Perfect assignment explanation.

---

# Page structure

Top:

```tsx id="tp5"
Title
Description
```

Middle:

```tsx id="tp6"
TaskForm
```

Bottom:

```tsx id="tp7"
TaskList
```

Simple.

Clean.

---

Flow:

```text id="tp8"
User submits form
↓
Server Action
↓
Prisma
↓
PostgreSQL
↓
revalidatePath("/tasks")
↓
TaskList refreshes
```

Full cycle.

This is the heart of your project.

---

Visit:

```text id="tp9"
/tasks
```

Now your Todo app should work.

You can:

✅ Create tasks
✅ View tasks
✅ Toggle complete
✅ Delete tasks

Core app done.

Next:

# Step 13: Build Landing Page (`/`) with SSG

This covers Static Site Generation.

---

# Step 13: Build Landing Page (`/`) — SSG

File:

```bash id="lp1"
src/app/page.tsx
```

Purpose:

This is your static landing page.

Covers:

✅ SSG (Static Site Generation)
✅ Entry point
✅ Project overview

This is important for assignment.

---

## Code

```tsx id="lp2"
import Link from "next/link"

export const dynamic = "force-static"

export default function HomePage() {
  return (
    <section className="space-y-6 text-center">
      <h1 className="text-5xl font-bold">
        Welcome to TaskFlow
      </h1>

      <p className="text-lg text-gray-500">
        Manage your tasks, stay productive,
        and track your progress.
      </p>

      <Link
        href="/tasks"
        className="inline-block rounded-md bg-black px-6 py-3 text-white"
      >
        Get Started
      </Link>
    </section>
  )
}
```

---

# Explanation

---

# `dynamic = "force-static"`

Important:

```ts id="lp3"
export const dynamic = "force-static"
```

Forces static generation.

Builds at:

```text id="lp4"
build time
```

Not request time.

Good for:

Landing pages.

Content rarely changes.

---

# Why SSG here?

Because:

This page contains:

* static text
* button
* no DB data

Perfect use case.

Assignment requirement.

---

# Link

```tsx id="lp5"
<Link href="/tasks">
```

Navigates to:

```text id="lp6"
/tasks
```

Main app page.

---

This page demonstrates:

```text id="lp7"
Static content + navigation
```

Good structure.

---

Now you have:

```text id="lp8"
/        → SSG
/tasks   → SSR
```

Two rendering strategies done.

Next:

# Step 14: Build Dashboard Page (`/dashboard`) — SSR

This page will show:

* total tasks
* completed tasks
* pending tasks

Good for dynamic data.
---
Good.

# Step 14: Build Dashboard Page (`/dashboard`) — SSR

File:

```bash id="db1"
src/app/dashboard/page.tsx
```

Purpose:

This page shows quick task stats.

It will display:

* Total tasks
* Completed tasks
* Pending tasks

Covers:

✅ SSR
✅ Database queries
✅ Dynamic data

---

## Code

```tsx id="db2"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const totalTasks =
    await prisma.task.count()

  const completedTasks =
    await prisma.task.count({
      where: {
        completed: true
      }
    })

  const pendingTasks =
    totalTasks - completedTasks

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold">
            Total Tasks
          </h2>
          <p className="text-2xl">
            {totalTasks}
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold">
            Completed
          </h2>
          <p className="text-2xl">
            {completedTasks}
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold">
            Pending
          </h2>
          <p className="text-2xl">
            {pendingTasks}
          </p>
        </div>
      </div>
    </div>
  )
}
```

---

# Explanation

---

# `force-dynamic`

```ts id="db3"
export const dynamic = "force-dynamic"
```

This makes it SSR.

Why?

Because stats change often.

Good assignment explanation.

---

# Counting tasks

Prisma count:

```ts id="db4"
await prisma.task.count()
```

Returns total number.

---

# Completed count

Filtered:

```ts id="db5"
where: {
  completed: true
}
```

Only completed tasks.

---

# Pending count

Simple math:

```ts id="db6"
totalTasks - completedTasks
```

No extra query.

Efficient.

---

Why dashboard matters:

Shows practical use of:

```text id="db7"
Dynamic server-rendered analytics
```

Good for evaluation.

---

Now:

```text id="db8"
/dashboard → SSR
/tasks → SSR
/ → SSG
```

Great progress.

Next:

# Step 15: Build Analytics Page (`/analytics`) — ISR

This covers the third rendering strategy.

Very important for full marks.

---
Good.

# Step 15: Build Analytics Page (`/analytics`) — ISR

File:

```bash id="an1"
src/app/analytics/page.tsx
```

Purpose:

This page shows productivity insights.

It will display:

* Completion percentage
* Completed tasks
* Pending tasks

Covers:

✅ ISR (Incremental Static Regeneration)
✅ Revalidation
✅ Aggregated DB data

Very important for assignment.

---

## Code

```tsx id="an2"
import { prisma } from "@/lib/prisma"

export const revalidate = 60

export default async function AnalyticsPage() {
  const totalTasks =
    await prisma.task.count()

  const completedTasks =
    await prisma.task.count({
      where: {
        completed: true
      }
    })

  const pendingTasks =
    totalTasks - completedTasks

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Analytics
      </h1>

      <div className="space-y-4 rounded-lg border p-6">
        <p>
          Total Tasks: {totalTasks}
        </p>

        <p>
          Completed Tasks: {completedTasks}
        </p>

        <p>
          Pending Tasks: {pendingTasks}
        </p>

        <p>
          Completion Rate: {completionRate}%
        </p>
      </div>
    </div>
  )
}
```

---

# Explanation

---

# `revalidate = 60`

Important:

```ts id="an3"
export const revalidate = 60
```

This enables ISR.

Meaning:

Page rebuilds every:

```text id="an4"
60 seconds
```

Not every request.

Not only build time.

Middle ground.

---

Why ISR here?

Analytics:

* changes often
* but doesn’t need instant updates

Perfect ISR use case.

Assignment requirement.

---

# Completion rate

Formula:

```ts id="an5"
(completedTasks / totalTasks) * 100
```

Example:

```text id="an6"
8/10 = 80%
```

Rounded:

```ts id="an7"
Math.round()
```

Cleaner UI.

---

# Zero division protection

Important:

```ts id="an8"
totalTasks === 0 ? 0 : ...
```

Avoids:

```text id="an9"
NaN
```

Good error handling logic.

---

Now your rendering strategies are complete:

✅ SSG → `/`
✅ SSR → `/tasks`
✅ SSR → `/dashboard`
✅ ISR → `/analytics`

This is excellent for evaluation.

Next:

# Step 16: Build Dynamic Task Details Page (`/tasks/[id]`)

This demonstrates:

* dynamic routes
* fetching single task
* task detail view

Important for routing marks.
---

Good.

# Step 16: Build Dynamic Task Details Page (`/tasks/[id]`)

File:

```bash id="td1"
src/app/tasks/[id]/page.tsx
```

Purpose:

This page shows one task in detail.

Covers:

✅ Dynamic routes
✅ SSR
✅ Route params
✅ Single DB fetch

Important for routing marks.

---

## Code

```tsx id="td2"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

interface TaskDetailsProps {
  params: Promise<{
    id: string
  }>
}

export const dynamic = "force-dynamic"

export default async function TaskDetailsPage({
  params
}: TaskDetailsProps) {
  const { id } = await params

  const task = await prisma.task.findUnique({
    where: {
      id
    }
  })

  if (!task) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Task Details
      </h1>

      <div className="rounded-lg border p-6 space-y-4">
        <h2 className="text-2xl font-semibold">
          {task.title}
        </h2>

        <p>
          {task.description || "No description"}
        </p>

        <p>
          Status:{" "}
          {task.completed
            ? "Completed"
            : "Pending"}
        </p>

        <p>
          Priority: {task.priority}
        </p>

        <p>
          Due Date:{" "}
          {task.dueDate
            ? new Date(
                task.dueDate
              ).toLocaleDateString()
            : "Not set"}
        </p>

        <p>
          Created At:{" "}
          {new Date(
            task.createdAt
          ).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
```

---

# Explanation

---

# Dynamic route

Folder:

```bash id="td3"
tasks/[id]
```

Means:

```text id="td4"
/tasks/abc123
/tasks/xyz789
```

Dynamic segment.

Very important.

---

# Params

Gets:

```ts id="td5"
params.id
```

Example:

```text id="td6"
abc123
```

Used to fetch one task.

---

# Single task query

```ts id="td7"
await prisma.task.findUnique(...)
```

Finds by:

```ts id="td8"
id
```

Only one result.

---

# `notFound()`

Important:

```ts id="td9"
if (!task) {
  notFound()
}
```

If invalid ID:

Shows:

```text id="td10"
404 page
```

Good error handling.

Assignment requirement.

---

# Why SSR?

Task details are dynamic.

Need fresh data.

So:

```ts id="td11"
force-dynamic
```

is correct.

---

Now your routing is strong:

✅ Static routes
✅ Dynamic routes
✅ Nested routes
✅ Layouts

Excellent.

Next:

# Step 17: Make TaskCard clickable

So clicking a task opens:

```text id="td12"
/tasks/[id]
```

This improves navigation and route demonstration.

---
This looks solid.

Your structure now covers almost everything required.

Small improvement:

Add:

```bash id="s1"
src/app/settings/page.tsx
```

So final:

```bash id="s2"
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── dashboard/page.tsx
│   ├── tasks/page.tsx
│   ├── tasks/[id]/page.tsx
│   ├── analytics/page.tsx
│   ├── settings/page.tsx
│   ├── api/tasks/
│   │   ├── route.ts
│   │   └── [id]/route.ts
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

And routes:

| Route         | Purpose            |
| ------------- | ------------------ |
| `/`           | Landing Page (SSG) |
| `/dashboard`  | Dashboard (SSR)    |
| `/tasks`      | All Tasks (SSR)    |
| `/tasks/[id]` | Task Details (SSR) |
| `/analytics`  | Analytics (ISR)    |
| `/settings`   | Settings           |

This makes the project feel complete.

Continue.

# Step 18: Build Settings Page

File:

```bash id="s3"
src/app/settings/page.tsx
```

Code:

```tsx id="s4"
export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      <div className="rounded-lg border p-6">
        <p>
          User settings will be available here.
        </p>
      </div>
    </div>
  )
}
```

---

# Why add this?

Because it demonstrates:

* More routes
* Better folder structure
* App completeness

Even if simple.

Good for evaluation.

---

Next:

# Step 19: Build `TaskStats.tsx`

This is reusable analytics/dashboard component.

Cleaner code.

Improves code quality marks.

---

This looks solid.

Your structure now covers almost everything required.

Small improvement:

Add:

```bash id="s1"
src/app/settings/page.tsx
```

So final:

```bash id="s2"
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── dashboard/page.tsx
│   ├── tasks/page.tsx
│   ├── tasks/[id]/page.tsx
│   ├── analytics/page.tsx
│   ├── settings/page.tsx
│   ├── api/tasks/
│   │   ├── route.ts
│   │   └── [id]/route.ts
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

And routes:

| Route         | Purpose            |
| ------------- | ------------------ |
| `/`           | Landing Page (SSG) |
| `/dashboard`  | Dashboard (SSR)    |
| `/tasks`      | All Tasks (SSR)    |
| `/tasks/[id]` | Task Details (SSR) |
| `/analytics`  | Analytics (ISR)    |
| `/settings`   | Settings           |

This makes the project feel complete.

Continue.

# Step 18: Build Settings Page

File:

```bash id="s3"
src/app/settings/page.tsx
```

Code:

```tsx id="s4"
export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      <div className="rounded-lg border p-6">
        <p>
          User settings will be available here.
        </p>
      </div>
    </div>
  )
}
```

---

# Why add this?

Because it demonstrates:

* More routes
* Better folder structure
* App completeness

Even if simple.

Good for evaluation.

---

Next:

# Step 19: Build `TaskStats.tsx`

This is reusable analytics/dashboard component.

Cleaner code.

Improves code quality marks.
---
Good. Continue.

# Step 19: Build `TaskStats.tsx`

Purpose:

This component avoids repeated logic.

Right now:

* Dashboard calculates stats
* Analytics calculates stats

Repeated code.

We fix that.

This improves:

✅ Code quality
✅ Reusability
✅ Cleaner structure

---

File:

```bash id="ts1"
src/components/TaskStats.tsx
```

Code:

```tsx id="ts2"
interface TaskStatsProps {
  totalTasks: number
  completedTasks: number
}

export default function TaskStats({
  totalTasks,
  completedTasks
}: TaskStatsProps) {
  const pendingTasks =
    totalTasks - completedTasks

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        )

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="rounded-lg border p-4">
        <h2 className="font-semibold">
          Total Tasks
        </h2>
        <p className="text-2xl">
          {totalTasks}
        </p>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="font-semibold">
          Completed
        </h2>
        <p className="text-2xl">
          {completedTasks}
        </p>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="font-semibold">
          Pending
        </h2>
        <p className="text-2xl">
          {pendingTasks}
        </p>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="font-semibold">
          Completion Rate
        </h2>
        <p className="text-2xl">
          {completionRate}%
        </p>
      </div>
    </div>
  )
}
```

---

# Explanation

Input:

```tsx id="ts3"
totalTasks
completedTasks
```

This component computes:

```tsx id="ts4"
pendingTasks
completionRate
```

Reusable.

---

Now update:

# Dashboard Page

Replace:

```tsx id="ts5"
src/app/dashboard/page.tsx
```

with:

```tsx id="ts6"
import { prisma } from "@/lib/prisma"
import TaskStats from "@/components/TaskStats"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const totalTasks =
    await prisma.task.count()

  const completedTasks =
    await prisma.task.count({
      where: {
        completed: true
      }
    })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <TaskStats
        totalTasks={totalTasks}
        completedTasks={completedTasks}
      />
    </div>
  )
}
```

---

Now update:

# Analytics Page

Replace:

```tsx id="ts7"
src/app/analytics/page.tsx
```

with:

```tsx id="ts8"
import { prisma } from "@/lib/prisma"
import TaskStats from "@/components/TaskStats"

export const revalidate = 60

export default async function AnalyticsPage() {
  const totalTasks =
    await prisma.task.count()

  const completedTasks =
    await prisma.task.count({
      where: {
        completed: true
      }
    })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Analytics
      </h1>

      <TaskStats
        totalTasks={totalTasks}
        completedTasks={completedTasks}
      />
    </div>
  )
}
```

---

Now:

✅ Less repeated logic
✅ Cleaner code
✅ Better maintainability

This improves evaluation marks.

Next:

# Step 20: Add Loading UI (`loading.tsx`)

This improves UX and shows Next.js loading states.
---

Update your Analytics page to use the reusable `TaskStats` component.

Replace your current file:

```bash
src/app/analytics/page.tsx
```

with:

```tsx id="an-final"
import { prisma } from "@/lib/prisma"
import TaskStats from "@/components/TaskStats"

export const revalidate = 60

export default async function AnalyticsPage() {
  const totalTasks =
    await prisma.task.count()

  const completedTasks =
    await prisma.task.count({
      where: {
        completed: true
      }
    })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Analytics
      </h1>

      <TaskStats
        totalTasks={totalTasks}
        completedTasks={completedTasks}
      />
    </div>
  )
}
```

## What changed?

Removed repeated logic:

```ts
const pendingTasks = ...
const completionRate = ...
```

because `TaskStats` now handles:

* Pending Tasks
* Completion Rate

So:

Before:

```text
Analytics page = fetch + calculate + render
```

Now:

```text
Analytics page = fetch only
TaskStats = calculate + render
```

Cleaner architecture.

Better for:

✅ Code quality
✅ Reusability
✅ Separation of concerns
✅ Easier maintenance

Do the same for Dashboard (if not already done). Next we add **loading.tsx**.

---

Update Dashboard the same way.

Replace:

```bash id="d1"
src/app/dashboard/page.tsx
```

with:

```tsx id="d2"
import { prisma } from "@/lib/prisma"
import TaskStats from "@/components/TaskStats"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const totalTasks =
    await prisma.task.count()

  const completedTasks =
    await prisma.task.count({
      where: {
        completed: true
      }
    })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <TaskStats
        totalTasks={totalTasks}
        completedTasks={completedTasks}
      />
    </div>
  )
}
```

## What changed?

Removed:

```ts id="d3"
const pendingTasks =
  totalTasks - completedTasks
```

because `TaskStats` handles it.

Removed repeated UI blocks:

```tsx id="d4"
Total
Completed
Pending
```

Now reused:

```tsx id="d5"
<TaskStats />
```

Better architecture.

Now:

```text id="d6"
/dashboard → fetches data
/analytics → fetches data
TaskStats → displays data
```

Single responsibility.

Cleaner.

Current status:

✅ Routing
✅ Layouts
✅ SSG
✅ SSR
✅ ISR
✅ CRUD API
✅ Database
✅ Server Actions
✅ Reusable components
✅ Dynamic routes

Next:

# Step 20: Add Loading UI (`loading.tsx`) for better UX.

---

Update Dashboard the same way.

Replace:

```bash id="d1"
src/app/dashboard/page.tsx
```

with:

```tsx id="d2"
import { prisma } from "@/lib/prisma"
import TaskStats from "@/components/TaskStats"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const totalTasks =
    await prisma.task.count()

  const completedTasks =
    await prisma.task.count({
      where: {
        completed: true
      }
    })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <TaskStats
        totalTasks={totalTasks}
        completedTasks={completedTasks}
      />
    </div>
  )
}
```

## What changed?

Removed:

```ts id="d3"
const pendingTasks =
  totalTasks - completedTasks
```

because `TaskStats` handles it.

Removed repeated UI blocks:

```tsx id="d4"
Total
Completed
Pending
```

Now reused:

```tsx id="d5"
<TaskStats />
```

Better architecture.

Now:

```text id="d6"
/dashboard → fetches data
/analytics → fetches data
TaskStats → displays data
```

Single responsibility.

Cleaner.

Current status:

✅ Routing
✅ Layouts
✅ SSG
✅ SSR
✅ ISR
✅ CRUD API
✅ Database
✅ Server Actions
✅ Reusable components
✅ Dynamic routes

Next:

# Step 20: Add Loading UI (`loading.tsx`) for better UX.
---

Good.

# Step 21: Add Error UI (`error.tsx`)

This handles runtime errors gracefully.

Example:

* DB connection fails
* API crashes
* Server Action fails

Instead of white screen:

Show friendly error.

This demonstrates:

✅ Error boundaries
✅ Proper error handling
✅ Next.js special files

Strong for evaluation.

---

## Tasks Error

Create:

```bash id="e1"
src/app/tasks/error.tsx
```

Code:

```tsx id="e2"
"use client"

export default function Error({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-red-500">
        Something went wrong.
      </h2>

      <p>{error.message}</p>

      <button
        onClick={reset}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Try Again
      </button>
    </div>
  )
}
```

---

## Dashboard Error

Create:

```bash id="e3"
src/app/dashboard/error.tsx
```

Code:

```tsx id="e4"
"use client"

export default function Error({
  error
}: {
  error: Error
}) {
  return (
    <div>
      <p className="text-red-500">
        Dashboard Error: {error.message}
      </p>
    </div>
  )
}
```

---

## Analytics Error

Create:

```bash id="e5"
src/app/analytics/error.tsx
```

Code:

```tsx id="e6"
"use client"

export default function Error({
  error
}: {
  error: Error
}) {
  return (
    <div>
      <p className="text-red-500">
        Analytics Error: {error.message}
      </p>
    </div>
  )
}
```

---

# Why `"use client"`?

Required.

Because:

```tsx id="e7"
reset()
```

and error boundaries are client-side.

Without it:

Next.js throws error.

---

# How it works

If:

```text id="e8"
Prisma fails
```

instead of crash:

Shows:

```text id="e9"
Something went wrong
```

User can retry.

Good UX.

---

Current:

✅ Loading UI
✅ Error UI
✅ Special route files

This makes your app production-like.

Next:

# Step 22: Add `not-found.tsx`

This improves invalid route handling like:

```text id="e10"
/tasks/random-invalid-id
```

---

Good.

# Step 22: Add `not-found.tsx`

This handles invalid routes.

Example:

```text id="nf1"
/tasks/random-id
```

If task doesn’t exist:

We already use:

```ts id="nf2"
notFound()
```

inside:

```bash id="nf3"
src/app/tasks/[id]/page.tsx
```

Now we create the UI for that.

This demonstrates:

✅ Proper route handling
✅ Better UX
✅ Next.js special files

Good for evaluation.

---

## Create file

```bash id="nf4"
src/app/tasks/[id]/not-found.tsx
```

Code:

```tsx id="nf5"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-3xl font-bold">
        Task Not Found
      </h1>

      <p className="text-gray-500">
        The task you are looking for does not exist.
      </p>

      <Link
        href="/tasks"
        className="rounded bg-black px-4 py-2 text-white"
      >
        Back to Tasks
      </Link>
    </div>
  )
}
```

---

# How it works

Flow:

```text id="nf6"
/tasks/123
↓
Prisma findUnique()
↓
null
↓
notFound()
↓
not-found.tsx
```

Clean.

---

Current special files:

✅ `loading.tsx`
✅ `error.tsx`
✅ `not-found.tsx`

Very strong Next.js concepts.

---

Current project now covers:

✅ Next.js setup
✅ File-based routing
✅ Layouts
✅ Multiple routes
✅ SSR
✅ SSG
✅ ISR
✅ API Routes
✅ CRUD
✅ Database integration
✅ Server Actions
✅ Loading UI
✅ Error handling
✅ Not Found handling
✅ Dynamic routes

This is already strong enough for the assignment.

Next:

# Step 23: Add Empty State UI + Final polishing

This will make the app feel complete.
