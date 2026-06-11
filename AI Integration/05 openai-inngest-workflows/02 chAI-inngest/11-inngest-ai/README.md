
# Building Durable AI Workflows with Inngest

## Overview

This project demonstrates how to build durable background workflows and AI pipelines using Inngest.

Instead of manually handling:

* Retries
* State management
* Workflow orchestration
* Background jobs
* AI execution tracking

Inngest provides these capabilities automatically through durable functions and step-based execution.

---

# What You'll Learn

This project covers:

✅ Event-driven workflows

✅ Durable execution

✅ Step-level state persistence

✅ Automatic retries

✅ AI workflow orchestration

✅ OpenAI integration via `@inngest/ai`

✅ Multi-step AI pipelines

---

# Project Structure

```text
11-inngest-ai/
│
├── 01-inngest.js
├── 02-step-ai.js
├── inngest-client.js
├── server.js
│
├── .env
├── .env.sample
├── package.json
└── README.md
```

---

# Core Idea: Durable Execution

Normally, when code fails:

```text
Step 1 ✅
Step 2 ✅
Step 3 ❌
```

The application restarts and everything runs again:

```text
Step 1 ❌ reruns
Step 2 ❌ reruns
Step 3 ❌ reruns
```

This can cause:

* Duplicate API calls
* Duplicate emails
* Duplicate payments
* Duplicate AI requests

With Inngest:

```text
Step 1 ✅ saved
Step 2 ✅ saved
Step 3 ❌ failed
```

Retry:

```text
Resume from Step 3
```

Previously completed steps are never executed again.

---

# Architecture

```text
Client/Event
      │
      ▼
Express Server
      │
      ▼
/api/inngest
      │
      ▼
Inngest Runtime
      │
      ├──────────────┐
      │              │
      ▼              ▼

Order Workflow   AI Workflow
```

---

# File Breakdown

## 1. inngest-client.js

Responsible for:

```text
Initialize Inngest
+
Configure AI Models
```

### Inngest Client

```javascript
export const inngest = new Inngest({
  id: "chaicode-inngest-ai",
});
```

Purpose:

```text
Application Identity
```

This ID appears inside the Inngest Dashboard and uniquely identifies the application.

---

### AI Model Configuration

```javascript
export const gpt4omini = openaiResponses({
  model: "gpt-4o-mini",
  apiKey: process.env.OPENAI_API_KEY,
});
```

Purpose:

```text
OpenAI Integration Layer
```

This configuration allows Inngest AI steps to:

* Execute model requests
* Persist responses
* Retry safely
* Avoid duplicate token usage

---

# Workflow 1: Order Processing

File:

```text
01-inngest.js
```

Triggered By:

```javascript
chai.order.placed
```

---

## Execution Flow

```text
Order Event
     │
     ▼
Generate Greeting
     │
     ▼
Log Greeting
     │
     ▼
Complete
```

---

## Step 1: greet

```javascript
step.run("greet", ...)
```

Generates:

```text
Hello John! Thanks for your order ORD-101
```

Inngest stores the result automatically.

If later steps fail:

```text
greet
   ▼
saved permanently
```

---

## Step 2: log-greeting

```javascript
step.run("log-greeting", ...)
```

Logs the greeting.

Because it is wrapped in `step.run()`:

```text
Independent Execution Unit
```

If it fails:

```text
greet ✅
log-greeting ❌
```

Retry:

```text
greet skipped
log-greeting retried
```

---

# Workflow 2: AI Pipeline

File:

```text
02-step-ai.js
```

Triggered By:

```javascript
chai.summarize-then-translate
```

This workflow behaves like a simple AI agent.

---

## Execution Flow

```text
Input Text
    │
    ▼
Summarize
    │
    ▼
Translate
    │
    ▼
Return Output
```

---

## AI Step 1: Summarization

```javascript
step.ai.infer("summarize", ...)
```

Example Input:

```text
Artificial Intelligence is transforming industries worldwide.
```

Example Output:

```text
AI is transforming industries globally.
```

Inngest stores the AI response as workflow state.

---

## AI Step 2: Translation

```javascript
step.ai.infer("translate", ...)
```

Input:

```text
AI is transforming industries globally.
```

Output:

```text
ਏਆਈ ਦੁਨੀਆ ਭਰ ਵਿੱਚ ਉਦਯੋਗਾਂ ਨੂੰ ਬਦਲ ਰਹੀ ਹੈ।
```

---

# Why Use step.ai.infer()?

Without Inngest:

```text
Summarize
    ▼
OpenAI Call
    ▼
Translate
    ▼
Failure
```

Retry:

```text
Summarize Again
Translate Again
```

More token usage.

---

With Inngest:

```text
Summarize ✅ Saved
Translate ❌ Failed
```

Retry:

```text
Summarize Skipped
Translate Re-executed
```

Benefits:

* Reduced token costs
* Faster retries
* No duplicate AI work
* Persistent workflow state

---

# Server Layer

File:

```text
server.js
```

Responsibilities:

```text
Load Environment Variables
         │
         ▼
Create Express Server
         │
         ▼
Register Inngest Functions
         │
         ▼
Expose /api/inngest
         │
         ▼
Start Application
```

---

# Inngest Endpoint

```text
http://localhost:3000/api/inngest
```

Used by:

* Inngest Dev Server
* Inngest Cloud
* Workflow Discovery
* Step Execution
* Retry Coordination

---

# Environment Variables

Create a `.env` file from `.env.sample`.

## .env.sample

```env
# ======================================
# Application
# ======================================
PORT=3000

# ======================================
# Inngest Development Mode
# ======================================
INNGEST_DEV=1

# ======================================
# OpenAI
# ======================================
OPENAI_API_KEY=your_openai_api_key

# ======================================
# Inngest Cloud (Optional)
# ======================================
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
```

---

# Installation

Install dependencies:

```bash
npm install
```

---

# Start Inngest Dev Server

Terminal 1:

```bash
npx inngest-cli@latest dev
```

Dashboard:

```text
http://localhost:8288
```

The dashboard allows you to inspect:

* Events
* Function Runs
* Step Outputs
* Retries
* Errors
* AI Executions

---

# Start Application

Terminal 2:

```bash
npm run dev
```

Expected Output:

```bash
Example app listening at http://localhost:3000
```

---

# Workflow Discovery

When the application starts:

```text
Express App
      │
      ▼
/api/inngest
      │
      ▼
Inngest Dev Server
      │
      ▼
Function Discovery
      │
      ├── chai-on-order-placed
      │
      └── chai-summarize-then-translate
```

---

# Order Workflow Execution

```text
chai.order.placed
       │
       ▼
greet
       │
       ▼
log-greeting
       │
       ▼
complete
```

---

# AI Workflow Execution

```text
chai.summarize-then-translate
            │
            ▼
summarize
            │
            ▼
translate
            │
            ▼
return result
```

---

# Key Concepts

## Event

```text
Something Happened
```

Examples:

```text
chai.order.placed
chai.summarize-then-translate
```

---

## Function

```text
Workflow Definition
```

Created with:

```javascript
inngest.createFunction(...)
```

---

## Step

```text
Durable Unit of Work
```

Created with:

```javascript
step.run(...)
```

Features:

* Persisted state
* Independent retries
* Execution history
* Resume capability

---

## AI Step

```text
Durable LLM Execution
```

Created with:

```javascript
step.ai.infer(...)
```

Features:

* AI state persistence
* Retry safety
* Cost optimization
* Workflow observability

---

# Final Takeaway

This project demonstrates how Inngest transforms ordinary JavaScript into durable, production-ready workflows.

```text
Events
   +
Durable Steps
   +
Automatic Retries
   +
State Persistence
   +
AI Orchestration
   +
Observability
```

By combining `step.run()` and `step.ai.infer()`, you can build reliable background jobs and AI-powered workflows without managing queues, retry systems, or workflow state manually.
