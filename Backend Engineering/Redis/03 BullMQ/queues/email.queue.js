// queues/email.queue.js
const { Queue } = require('bullmq');
const connection = require("../config/redis");
const { QUEUES } = require("../constants"); // Import from constants folder

const emailQueue = new Queue(QUEUES.EMAIL, {
    connection
});

module.exports = {
    emailQueue,
};