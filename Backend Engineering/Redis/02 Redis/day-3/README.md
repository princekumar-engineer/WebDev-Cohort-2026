# 📧 Email Batch Processor

A simple email batch processing system built with **Express**, **PostgreSQL**, **Prisma**, and **Redis**.

Users upload a CSV containing emails, the API stores the data, pushes the batch into a Redis queue, and a background worker processes the emails asynchronously while streaming live progress updates to the browser.

---

# 🚀 Features

* Upload CSV files containing email addresses
* Background processing using a Redis queue
* Live progress updates using Redis Pub/Sub + Server-Sent Events (SSE)
* PostgreSQL persistence with Prisma ORM
* Real-time batch status tracking
* Recent batch history
* Scales by separating API and Worker processes

---

# 🏗️ Architecture

```txt
                    ┌─────────────┐
                    │   Browser   │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Express API │
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼

   ┌──────────┐    ┌────────────┐    ┌────────────┐
   │ Postgres │    │ Redis List │    │ Redis      │
   │ + Prisma │    │   Queue    │    │ Pub/Sub    │
   └──────────┘    └────────────┘    └────────────┘
                           ▲
                           │
                           ▼
                    ┌─────────────┐
                    │   Worker    │
                    └─────────────┘
```

---

# 📂 Project Structure

```txt
project-root/

├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── routes/
│   │   ├── config.js
│   │   ├── db.js
│   │   ├── redis.js
│   │   ├── queue.js
│   │   ├── worker.js
│   │   └── index.js
│   │
│   ├── package.json
│   └── .env
│
├── ui/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── scripts/
│   └── generate-sample-csv.js
│
├── sample-emails.csv
└── README.md
```

---

# 📋 Prerequisites

Before running the project, ensure you have:

* Node.js 18+
* PostgreSQL
* Redis

Verify installations:

```bash
node -v
psql --version
redis-server --version
```

---

# ⚙️ Setup

## 1. Create Database

Create a PostgreSQL database:

```bash
createdb email_processor
```

---

## 2. Configure Environment Variables

Create:

```txt
backend/.env
```

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/email_processor?schema=public"
REDIS_URL="redis://localhost:6379"
PORT=4000
```

Replace:

* `USER`
* `PASSWORD`

with your PostgreSQL credentials.

---

## 3. Install Dependencies

```bash
cd backend
npm install
```

---

## 4. Generate Prisma Client

```bash
npx prisma generate
```

---

## 5. Push Database Schema

```bash
npx prisma db push
```

---

# ▶️ Running the Application

The application requires **two separate processes**.

---

## Terminal 1 — API Server

```bash
cd backend
npm run dev
```

Expected:

```txt
API running on http://localhost:4000
```

---

## Terminal 2 — Worker

```bash
cd backend
npm run worker
```

Expected:

```txt
Worker started
Waiting for jobs...
```

---

# 🌐 Open the Application

Visit:

```txt
http://localhost:4000
```

The UI is served directly by the Express application.

---

# 🔄 Processing Flow

```txt
Upload CSV
     │
     ▼
Create Batch
     │
     ▼
Store Emails
     │
     ▼
LPUSH batchId
     │
     ▼
Redis Queue
     │
     ▼
Worker (BRPOP)
     │
     ▼
Process Emails
     │
     ▼
Publish Progress
     │
     ▼
SSE Stream
     │
     ▼
Browser Updates
```

---

# 📤 Usage

## Step 1: Prepare CSV

Example:

```csv
email
john@example.com
alice@example.com
bob@example.com
```

One email per row.

---

## Step 2: Upload

1. Open the application.
2. Select a CSV file.
3. Click:

```txt
Upload & Process
```

---

## Step 3: Watch Progress

The UI will display:

* Batch status
* Processed count
* Total emails
* Progress bar

Updates occur in real time.

---

# 📡 API Endpoints

## Health Check

```http
GET /api/health
```

Response:

```json
{
  "status": "ok"
}
```

---

## Upload CSV

```http
POST /api/upload
```

Content-Type:

```txt
multipart/form-data
```

Field:

```txt
file
```

Response:

```json
{
  "batchId": "123",
  "filename": "emails.csv",
  "totalEmails": 500,
  "status": "pending"
}
```

---

## List Batches

```http
GET /api/batches
```

---

## Batch Details

```http
GET /api/batches/:id
```

---

## Live Status Stream

```http
GET /api/batches/:id/stream
```

Uses:

```txt
Server-Sent Events (SSE)
```

---

# 🗄️ Database Models

## Batch

```txt
id
filename
totalEmails
processedCount
status
createdAt
completedAt
```

Status:

```txt
pending
processing
completed
failed
```

---

## Email

```txt
id
batchId
email
status
createdAt
```

Status:

```txt
pending
processed
failed
```

---

# 🧪 Sample CSV Files

Small sample:

```txt
sample-emails.csv
```

---

Generate a larger sample:

```bash
node scripts/generate-sample-csv.js 1500
```

Output:

```txt
sample-emails-large.csv
```

Generate 2000 rows:

```bash
node scripts/generate-sample-csv.js 2000
```

---

# 🐞 Troubleshooting

## Batch Stuck in "Pending"

Cause:

```txt
Worker is not running
```

Solution:

```bash
npm run worker
```

---

## Redis Connection Error

Check:

```bash
redis-cli ping
```

Expected:

```txt
PONG
```

---

## PostgreSQL Connection Error

Verify:

```bash
psql -U USER -d email_processor
```

---

## Prisma Client Errors

Regenerate client:

```bash
npx prisma generate
```

---

# 🛠️ Tech Stack

| Technology    | Purpose           |
| ------------- | ----------------- |
| Express       | REST API          |
| PostgreSQL    | Data Storage      |
| Prisma        | ORM               |
| Redis List    | Queue             |
| Redis Pub/Sub | Live Updates      |
| SSE           | Browser Streaming |
| Vanilla JS    | Frontend          |

---

# 📝 Notes

* API and Worker must both be running.
* Upload requests return immediately.
* Heavy processing happens in the worker.
* Redis List acts as the job queue.
* Redis Pub/Sub powers live status updates.
* SSE streams progress updates to the browser in real time.

---

# 📄 License

MIT
