import { Worker } from "bullmq";
import { connection } from "./queue.js";

const emailWorker = new Worker(
  "emails",
  async (job) => {
    console.log("Processing email job...", job.id, job.name, job.data);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Email job completed!", job.id, job.name, job.data);
  },
  { connection }
);

emailWorker.on("completed", (job) => {
  console.log("Job has been completed!", job.id);
});

emailWorker.on("failed", (job, err) => {
  console.error("Job failed!", job?.id, err.message);
});

export default emailWorker;