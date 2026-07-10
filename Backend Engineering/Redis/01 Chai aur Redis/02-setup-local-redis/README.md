# 02 Complete local setup to learn Redis

## Video Link

<p align="center"> <a href="https://youtu.be/UEm0mHeXdxk"> <img src="https://img.youtube.com/vi/UEm0mHeXdxk/maxresdefault.jpg" alt="Watch the video on YouTube" width="100%"> </a> </p>

---

## Prerequisites

Make sure you have installed:

* Node.js
* Docker
* Docker Compose

---

## Install Dependencies

```bash
npm install
```

---

## Start Services with Docker Compose

From the root project directory (where `docker-compose.yml` exists):

```bash
docker-compose up -d
```

This will start:

* Redis on port `6379`
* MongoDB on port `27017`

Check running containers:

```bash
docker ps
```

---

## Start Application

Inside this project folder:

```bash
npm run dev
```

Expected output:

```bash
Server is running on port 3000
```

---

## API Testing

### Redis Health Check

Request:

```bash
GET http://localhost:3000/redis
```

Test with curl:

```bash
curl http://localhost:3000/redis
```

Expected response:

```json
{
  "redis": "PONG"
}
```

---

### MongoDB Health Check

Request:

```bash
GET http://localhost:3000/mongo
```

Test with curl:

```bash
curl http://localhost:3000/mongo
```

Expected response:

```json
{
  "mongo": "connected",
  "database": "chai_aur_redis"
}
```

---

## Stop Containers

```bash
docker-compose down
```

---

## Notes

Default local URLs:

Redis:

```bash
redis://localhost:6379
```

MongoDB:

```bash
mongodb://localhost:27017/chai_aur_redis
```
