# 07 Your guide to BullMQ Queue infrastructure

## Video Link

<p align="center"> <a href="https://youtu.be/UHpUq-Mvvkc"> <img src="https://img.youtube.com/vi/UHpUq-Mvvkc/maxresdefault.jpg" alt="Watch the video on YouTube" width="100%"> </a> </p>


---
Your code is correct for testing **BullMQ background job processing with Redis**.

Project structure:

```text
api.js      → Adds jobs into queue
queue.js    → Queue setup and Redis connection
worker.js   → Processes jobs in background
```

Flow:

```text
API → Queue → Worker → Process Job
```

---

## How it works

### queue.js

Creates queue:

```js
const emailQueue = new Queue("emails", { connection });
```

Queue name:

```text
emails
```

Redis connection:

```text
localhost:6379
```

---

### api.js

Adds job:

```js
await emailQueue.add("send-welcome-email", {...})
```

Job config:

```js
attempts: 3
```

Retries 3 times if failed.

Backoff:

```js
delay: 1000
```

Retry delay increases exponentially.

---

### worker.js

Worker listens:

```js
new Worker("emails", async(job)=>{})
```

Processes jobs from same queue.

Simulates email sending:

```js
await new Promise((resolve) => setTimeout(resolve, 1500));
```

---

## Run Project

### 1. Start Redis

```bash
docker run -d --name redis-local -p 6379:6379 redis
```

---

### 2. Start API

```bash
node api.js
```

Output:

```text
Server is running at http://localhost:3000
```

---

### 3. Start Worker

In another terminal:

```bash
node worker.js
```

Worker will wait for jobs.

---

## API Testing

---

# 1. Add Welcome Email Job

**POST**

```text
http://localhost:3000/welcome-email
```

Body:

```json
{
  "to": "prince@example.com",
  "name": "PRINCE"
}
```

cURL:

```bash
curl -X POST http://localhost:3000/welcome-email \
-H "Content-Type: application/json" \
-d '{"to":"prince@example.com","name":"PRINCE"}'
```

Response:

```json
{
  "message": "Welcome email job added to the queue!",
  "jobId": "1"
}
```

---

## Worker Logs

When worker processes:

```text
Processing email job... 1 send-welcome-email {
  to: 'prince@example.com',
  name: 'PRINCE'
}
```

After completion:

```text
Email job completed! 1 send-welcome-email {
  to: 'prince@example.com',
  name: 'PRINCE'
}
```

Completed event:

```text
Job has been completed! 1
```

---

## Failure Handling

If worker throws error:

```text
Job failed! 1 Some error
```

BullMQ retries automatically:

```text
attempts: 3
```

Retry pattern:

```text
1st fail → wait 1s
2nd fail → wait 2s
3rd fail → wait 4s
```

Exponential backoff.

---

## Advantages over manual Redis queue

### Old approach:

```text
LPUSH + RPOP
```

Problems:

* Job loss
* No retry
* No tracking
* No delayed jobs

---

### BullMQ approach:

Features:

* Retry support
* Delayed jobs
* Failed job tracking
* Job IDs
* Worker events
* Concurrency support
* Better scalability

---

## Test flow

1. Start Redis
2. Start API
3. Start Worker
4. POST `/welcome-email`
5. Watch worker logs

This demonstrates real-world background processing.
