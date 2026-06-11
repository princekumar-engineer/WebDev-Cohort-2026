# Required Commands

## 1. Install Runtime Dependencies

```bash
npm install express dotenv inngest @inngest/ai openai
```

### Package Purpose

| Package     | Purpose                 |
| ----------- | ----------------------- |
| express     | HTTP server             |
| dotenv      | Environment variables   |
| inngest     | Durable workflow engine |
| @inngest/ai | AI workflow integration |
| openai      | OpenAI SDK dependency   |

---

## 2. Install Development Dependencies

```bash
npm install -D nodemon
```

---

## 3. Configure package.json

```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

---

## 4. Create Environment File

Copy:

```bash
cp .env.sample .env
```

or manually create:

```env
PORT=3000
INNGEST_DEV=1
OPENAI_API_KEY=your_openai_api_key
```

---

## 5. Start Inngest Dev Server

Open Terminal #1:

```bash
npx inngest-cli@latest dev
```

Expected Output:

```text
Inngest Dev Server running
UI: http://localhost:8288
```

---

## 6. Start Express Server

Open Terminal #2:

```bash
npm run dev
```

Expected Output:

```text
Example app listening at http://localhost:3000
```

---

## 7. Verify Inngest Sync

Open:

```text
http://localhost:8288
```

You should see:

```text
chai-on-order-placed

chai-summarize-then-translate
```

registered automatically.

---

## 8. Test Function Discovery

Open:

```text
http://localhost:3000/api/inngest
```

The endpoint should be reachable by the Inngest Dev Server.

---

## Development Workflow

```text
Terminal #1
    │
    ▼
inngest dev

Terminal #2
    │
    ▼
npm run dev

Browser
    │
    ▼
http://localhost:8288
```

This setup allows Inngest to discover your functions, execute workflows, track retries, persist step state, and visualize AI executions locally.
