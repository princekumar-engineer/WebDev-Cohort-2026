# Inngest Breakdown: "Make any code durable by default"

> **"Workflows, agents, endpoints, background jobs—however it's written, wherever it runs—Inngest makes it unbreakable."**

Official Website:

[Inngest Official Website](https://www.inngest.com)

Official Docs:

[Inngest Documentation](https://www.inngest.com/docs)

---

# What does "durable" mean?

Normally when code runs:

```text
Request
   ↓
Code executes
   ↓
External API fails
   ↓
Everything crashes ❌
```

You lose progress.

With Inngest:

```text
Request
   ↓
Step A ✅ saved
   ↓
Step B ❌ failed
   ↓
Automatic retry
   ↓
Resume from Step B
```

Step A never runs again.

Inngest remembers completed steps and resumes from the failure point. This is called **Durable Execution**. ([Inngest][1])

---

# How your Todo App demonstrates durability

Your code already contains a perfect example.

When deleting a todo:

```js
await step.run("cleanup", async () => {
  if (attempt === 0) {
    throw new Error("Failed");
  }

  return "success";
});
```

### First Run

```text
todo/deleted event
        ↓
cleanup step
        ↓
throws error
        ↓
workflow fails
```

---

### Retry

```text
todo/deleted event
        ↓
cleanup step
        ↓
success
        ↓
audit step
        ↓
done
```

Because of:

```js
retries: 2
```

Inngest automatically retries the function. ([Inngest][1])

---

# Event Flow in Your Application

## Create Todo

```text
POST /todos
     ↓
createTodo()
     ↓
save in memory
     ↓
inngest.send()
     ↓
todo/created event
     ↓
onTodoCreated()
     ↓
audit log entry
```

---

## Delete Todo

```text
DELETE /todos/:id
      ↓
deleteTodo()
      ↓
inngest.send()
      ↓
todo/deleted event
      ↓
onTodoDeleted()
      ↓
cleanup step
      ↓
audit step
```

---

# Ideal Folder Structure

For learning:

```text
10-todo-inngest/
│
├── server.js
├── store.js
│
└── inngest/
    ├── client.js
    ├── functions.js
```

---

For production:

```text
10-todo-inngest/
│
├── src/
│   │
│   ├── server.js
│   │
│   ├── routes/
│   │   └── todo.routes.js
│   │
│   ├── controllers/
│   │   └── todo.controller.js
│   │
│   ├── services/
│   │   └── todo.service.js
│   │
│   ├── store/
│   │   └── store.js
│   │
│   └── inngest/
│       ├── client.js
│       ├── functions/
│       │   ├── todo-created.js
│       │   └── todo-deleted.js
│       │
│       └── index.js
│
├── .env
├── package.json
└── README.md
```

---

# Why separate Inngest functions?

Instead of:

```text
functions.js
```

Use:

```text
functions/
├── todo-created.js
└── todo-deleted.js
```

Benefits:

* easier maintenance
* one workflow per file
* scalable
* cleaner imports

Example:

```js
functions/
 ├─ email-sent.js
 ├─ todo-created.js
 ├─ todo-deleted.js
 ├─ payment-success.js
 └─ user-created.js
```

---

# Core Inngest Concepts Used Here

## 1. Client

```js
export const inngest = new Inngest({
  id: "chai-todo-app",
});
```

Purpose:

```text
Application identity
```

---

## 2. Event

```js
await inngest.send({
  name: "todo/created",
  data: { todo },
});
```

Purpose:

```text
Something happened
```

Examples:

```text
user/created
order/paid
email/sent
todo/deleted
```

---

## 3. Function

```js
inngest.createFunction(...)
```

Purpose:

```text
React to an event
```

---

## 4. Step

```js
step.run(...)
```

Purpose:

```text
Durable unit of work
```

Each step:

* retries independently
* stores result
* resumes after failure
* won't rerun if already successful

([Inngest][1])

---

# Complete Flow Diagram

```text
User
 │
 │ POST /todos
 ▼
Express Server
 │
 ├── createTodo()
 │
 └── inngest.send()
          │
          ▼
     todo/created
          │
          ▼
    Inngest Event Bus
          │
          ▼
   onTodoCreated()
          │
          ▼
   step.run("audit")
          │
          ▼
      auditlog
```

---

# Delete Flow Diagram

```text
User
 │
 │ DELETE /todos/1
 ▼
Express Server
 │
 ├── deleteTodo()
 │
 └── inngest.send()
          │
          ▼
     todo/deleted
          │
          ▼
    Inngest Event Bus
          │
          ▼
   onTodoDeleted()
          │
          ▼
   step.run("cleanup")
          │
      FAILS ❌
          │
      Retry
          │
          ▼
   step.run("cleanup")
          │
      SUCCESS ✅
          │
          ▼
   step.run("audit")
          │
          ▼
      auditlog
```

---

# README Notes (Step-by-Step)

## 1. Install Dependencies

```bash
npm install
```

---

## 2. Start Inngest Dev Server

```bash
npx inngest-cli@latest dev
```

or

```bash
inngest dev
```

This creates a local dashboard for workflow execution and debugging. ([Inngest][2])

---

## 3. Start Express App

```bash
npm run dev
```

Server:

```text
http://localhost:3000
```

Inngest Endpoint:

```text
http://localhost:3000/api/inngest
```

---

## 4. Create Todo

```bash
POST /todos
```

Body:

```json
{
  "title": "Learn Inngest"
}
```

Flow:

```text
Todo Saved
    ↓
Event Sent
    ↓
Workflow Triggered
    ↓
Audit Logged
```

---

## 5. Delete Todo

```bash
DELETE /todos/1
```

Flow:

```text
Todo Deleted
    ↓
Event Sent
    ↓
Cleanup Step
    ↓
Failure
    ↓
Automatic Retry
    ↓
Success
    ↓
Audit Logged
```

---

## 6. Observe in Dashboard

Open the Inngest dashboard and inspect:

* Events
* Function Runs
* Retries
* Failed Steps
* Successful Steps
* Step Outputs

This is one of Inngest's major benefits: built-in observability and workflow tracing. ([Inngest][3])

---

# Key Takeaway

Your project demonstrates the complete Inngest lifecycle:

```text
HTTP Request
      ↓
Database Change
      ↓
Event Emitted
      ↓
Workflow Triggered
      ↓
Durable Steps
      ↓
Automatic Retries
      ↓
Audit Logging
      ↓
Observability Dashboard
```

This is exactly the pattern Inngest promotes: **write normal JavaScript, split important work into `step.run()` blocks, and let Inngest handle retries, state persistence, recovery, and orchestration automatically.** ([Inngest][3])

[1]: https://www.inngest.com/docs/learn/how-functions-are-executed "How Inngest functions are executed: Durable Execution"
[2]: https://www.inngest.com/blog/ai-agents-inngest-durable-steps "How to Build a Durable AI Agent with Inngest"
[3]: https://www.inngest.com/ "AI and backend workflows, orchestrated at any scale"
