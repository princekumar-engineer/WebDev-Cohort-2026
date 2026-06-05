import express from "express";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000; // Fallback to 3000 if process.env.PORT is undefined

app.get('/', (req, res) => {
  res.send('Hello from Dockerized Node.js App!');
});

// Added an explicit health check route matching the docker-compose healthcheck rules
app.get('/health', (req, res) => {
  res.sendStatus(200);
});

console.log(`JWT Secret Loaded: ${process.env.JWT_SECRET}`);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});