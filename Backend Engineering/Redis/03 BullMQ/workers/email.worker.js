// workers/email.worker.js
const { Worker } = require("bullmq");
const connection = require("../config/redis");
const { QUEUES } = require("../constants"); // Updated import
const sendEmail = require("../services/email.service");

const worker = new Worker(
  QUEUES.EMAIL, // Updated variable
  async (job) => {
    console.log("Processing Job", job.id);
    await sendEmail(job.data);
  },
  { connection },
);

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed ✅`);
});

worker.on("failed", (job, err) => {
    console.log(`Job ${job.id} Failed ❌`, err.message);
});