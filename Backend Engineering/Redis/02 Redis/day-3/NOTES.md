# 📧 Email Batch Processor – Architecture Notes

Notes on how the application works internally.

---

# 1. Big Picture

The system processes large CSV uploads asynchronously.

Instead of processing every email during the upload request, we:

1. Save data to PostgreSQL
2. Push work to Redis
3. Return immediately
4. Let a worker process emails in the background

---

## System Architecture

```txt
                    ┌─────────────────┐
                    │     Browser     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Express API   │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼

 ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
 │   PostgreSQL   │  │ Redis Queue    │  │ Redis Pub/Sub  │
 │    (Prisma)    │  │ email-queue    │  │ batch:status:* │
 └────────────────┘  └────────────────┘  └────────────────┘
                              ▲
                              │
                              ▼
                    ┌─────────────────┐
                    │     Worker      │
                    └─────────────────┘
```

---

# 2. Two Separate Processes

Both processes must be running.

| Process    | Command          | Purpose                       |
| ---------- | ---------------- | ----------------------------- |
| API Server | `npm run dev`    | Uploads, UI, SSE, status APIs |
| Worker     | `npm run worker` | Processes queued batches      |

---

## API Process

Responsibilities:

* Receive CSV uploads
* Parse emails
* Save Batch + Emails
* Push batch ID to Redis queue
* Serve UI
* Stream status updates via SSE

---

## Worker Process

Responsibilities:

* Wait for batch IDs in Redis queue
* Process emails
* Update database
* Publish progress updates

---

# 3. End-to-End Flow

```txt
User Uploads CSV
        │
        ▼
Parse CSV
        │
        ▼
Create Batch Record
        │
        ▼
Create Email Records
        │
        ▼
LPUSH batchId -> Redis Queue
        │
        ▼
Return "Queued"
        │
        │
        ▼
Worker waiting on BRPOP
        │
        ▼
Receives batchId
        │
        ▼
Update Batch -> processing
        │
        ▼
Process Emails
        │
        ▼
Publish Progress
        │
        ▼
Update Batch -> completed
        │
        ▼
Publish Final Status
```

---

# 4. Why Redis?

Redis is used for **two completely different jobs**.

```txt
Redis

├── Queue (List)
│      └── Who does the work?
│
└── Pub/Sub
       └── How is the work going?
```

---

# 5. Redis Queue

## Queue Key

```txt
email-queue
```

---

## Producer (API)

Push work into queue.

```txt
LPUSH email-queue batch_123
```

Queue:

```txt
Left                             Right

┌──────────┬──────────┬──────────┐
│ batch789 │ batch456 │ batch123 │
└──────────┴──────────┴──────────┘
```

---

## Consumer (Worker)

Worker waits:

```txt
BRPOP email-queue 0
```

Meaning:

```txt
Block forever
until a batch arrives
```

No CPU wasted.

No polling.

No loops like:

while(true){
check queue
}

````

Redis wakes the worker only when work exists.

---

# 6. Redis Pub/Sub

Used for real-time progress updates.

---

## Channel Naming

```txt
batch:status:<batchId>
````

Example:

```txt
batch:status:123
```

---

## Worker Publishes

```json
{
  "status": "processing",
  "processed": 50,
  "total": 200
}
```

Worker:

```txt
PUBLISH batch:status:123 {...}
```

---

## API Subscribes

API listens for messages.

```txt
SUBSCRIBE batch:status:123
```

---

## Browser Receives SSE

```txt
Worker
   │
   ▼
Redis Pub/Sub
   │
   ▼
API SSE Endpoint
   │
   ▼
Browser EventSource
```

---

# 7. Why Two Redis Connections?

A Redis connection that subscribes cannot be used normally.

Once subscribed:

```txt
SUBSCRIBE channel
```

That connection becomes dedicated to Pub/Sub.

Therefore we create:

```txt
redisClient
    └── Queue + Publish

subscriberClient
    └── Subscribe Only
```

Example:

```js
const redis = new Redis();
const subscriber = new Redis();
```

---

# 8. Database Structure

## Batch Table

```txt
Batch

id
filename
totalEmails
processedCount
status
createdAt
completedAt
```

Status values:

```txt
pending
processing
completed
failed
```

---

## Email Table

```txt
Email

id
batchId
email
status
createdAt
```

Status values:

```txt
pending
processed
failed
```

---

# 9. API Endpoints

| Method | Route                     | Purpose       |
| ------ | ------------------------- | ------------- |
| GET    | `/`                       | UI            |
| GET    | `/api/health`             | Health check  |
| POST   | `/api/upload`             | Upload CSV    |
| GET    | `/api/batches`            | List batches  |
| GET    | `/api/batches/:id`        | Batch details |
| GET    | `/api/batches/:id/stream` | SSE updates   |

---

# 10. UI Flow

```txt
Select CSV
      │
      ▼
Upload
      │
      ▼
POST /api/upload
      │
      ▼
Receive batchId
      │
      ▼
Open EventSource
      │
      ▼
GET /stream
      │
      ▼
Receive Live Updates
      │
      ▼
Update Progress Bar
```

---

# 11. File Map

| File                    | Purpose             |
| ----------------------- | ------------------- |
| `src/index.js`          | Express entry point |
| `src/config.js`         | Config values       |
| `src/db.js`             | Prisma client       |
| `src/redis.js`          | Redis connections   |
| `src/queue.js`          | Queue helpers       |
| `src/worker.js`         | Worker process      |
| `src/routes/upload.js`  | Upload route        |
| `src/routes/batches.js` | Batch routes + SSE  |

---

# 12. Common Issues

## Worker Not Running

Symptoms:

```txt
Status stays "pending"
```

Reason:

```txt
Queue receives jobs
but nobody consumes them
```

Fix:

```bash
npm run worker
```

---

## Redis Not Running

Symptoms:

```txt
Queue errors
Pub/Sub errors
```

Fix:

Start Redis.

---

## Database Not Running

Symptoms:

```txt
Prisma connection errors
```

Fix:

Start PostgreSQL.

---

# 13. Mental Model

```txt
Upload Fast
     │
     ▼
Save To Database
     │
     ▼
Push To Queue
     │
     ▼
Return Response

---------------------

Worker Handles Heavy Work

---------------------

Pub/Sub Sends Progress

---------------------

SSE Updates UI
```

# Summary

* Express handles uploads and serves the UI.
* PostgreSQL stores batches and emails.
* Redis List acts as a queue.
* Redis Pub/Sub streams progress updates.
* Worker performs background processing.
* SSE pushes real-time updates to the browser.
* API and Worker must both be running for the system to work correctly.
