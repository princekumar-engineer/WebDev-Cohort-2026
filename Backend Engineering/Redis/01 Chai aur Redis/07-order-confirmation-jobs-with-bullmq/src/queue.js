import { Queue } from "bullmq";

const connection = {
  host: "localhost",
  port: 6379,
};

const emailQueue = new Queue("emails", { connection });
export { emailQueue, connection };