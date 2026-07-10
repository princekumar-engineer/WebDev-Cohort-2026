# 08 Live Admin Notification Pub-Sub

## Video Link

<p align="center"> <a href="https://youtu.be/0Y6PbN4NEz0"> <img src="https://img.youtube.com/vi/0Y6PbN4NEz0/maxresdefault.jpg" alt="Watch the video on YouTube" width="100%"> </a> </p>

---

<p align="center">
  <a href="Images/Redis PubSub diagram.png">
    <img src="Images/Redis PubSub diagram.png" alt="Pub-Sub With Redis" width="100%">
  </a>
</p>
---
Your code is correct for testing **Redis Pub/Sub messaging**.

Project structure:

```text
api.js         → Publisher (sends messages)
subscriber.js  → Subscriber (receives messages)
```

Flow:

```text
Publisher → Redis Channel → Subscriber
```

Channel:

```text
notifications
```

---

## How it works

### subscriber.js

Subscribes to channel:

```js
subscriber.subscribe("notifications");
```

Listens for messages:

```js
subscriber.on("message", (channel, message) => {})
```

Receives real-time notifications.

---

### api.js

Publishes message:

```js
await publisher.publish("notifications", JSON.stringify(payload));
```

Sends message to all active subscribers.

Return value:

```text
receivers
```

Number of subscribers that received the message.

---

## Important Pub/Sub behavior

Pub/Sub is **real-time only**.

If no subscriber is listening:

```text
Message is lost
```

Redis does not store Pub/Sub messages.

---

## Run Project

### 1. Start Redis

```bash
docker run -d --name redis-local -p 6379:6379 redis
```

---

### 2. Start Subscriber

Open terminal 1:

```bash
node subscriber.js
```

Expected:

```text
Subscribed successfully! Currently subscribed to 1 channel(s).
```

---

### 3. Start API

Open terminal 2:

```bash
node api.js
```

Expected:

```text
API Server is running at http://localhost:3000
```

---

## API Testing

---

# 1. Send Notification

**POST**

```text
http://localhost:3000/notifications
```

Body:

```json
{
  "title": "Welcome",
  "message": "Hello PRINCE, welcome to Chai aur Redis!"
}
```

cURL:

```bash
curl -X POST http://localhost:3000/notifications \
-H "Content-Type: application/json" \
-d '{"title":"Welcome","message":"Hello PRINCE, welcome to Chai aur Redis!"}'
```

Response:

```json
{
  "message": "Notification sent to 1 subscribers",
  "payload": {
    "title": "Welcome",
    "message": "Hello PRINCE, welcome to Chai aur Redis!",
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
}
```

---

## Subscriber Output

Terminal:

```text
Received notification:
Channel: notifications
Payload: {
  title: 'Welcome',
  message: 'Hello PRINCE, welcome to Chai aur Redis!',
  createdAt: '2025-01-01T12:00:00.000Z'
}
```

---

## Multiple Subscribers

Open another terminal:

```bash
node subscriber.js
```

Now:

```text
2 subscribers
```

Send again:

Response:

```json
{
  "message": "Notification sent to 2 subscribers"
}
```

Both terminals receive the message.

---

## Redis Commands Used

### Publisher

```text
PUBLISH
```

Sends message.

---

### Subscriber

```text
SUBSCRIBE
```

Listens to channel.

---

## Pub/Sub Example Flow

Subscriber A:

```text
Listening...
```

Subscriber B:

```text
Listening...
```

Publisher sends:

```text
New Notification
```

Redis delivers:

```text
A ← Notification
B ← Notification
```

Broadcasting in real-time.

---

## Limitations

1. No persistence
   Messages are not saved.

2. No retry
   Failed subscribers miss messages.

3. No history
   Late subscribers won't get old messages.

4. Fire-and-forget
   No delivery guarantee.

---

## Best test flow

1. Start Redis
2. Start subscriber.js
3. Start api.js
4. POST `/notifications`
5. Watch subscriber logs
6. Start second subscriber
7. POST again

This clearly shows **real-time pub/sub broadcasting**.
