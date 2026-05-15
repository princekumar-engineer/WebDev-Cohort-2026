import express from "express";

import {
  createPoll,
  getMyPolls,
  getPollById,
  updatePoll,
  deletePoll,
  publishPollResults,
} from "../controllers/pollController.js";

import pollValidation from "../validations/pollValidation.js";


import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Poll
router.post(
  "/",
  authMiddleware,
  pollValidation,
  createPoll
);

// Get Logged-in User Polls
router.get(
  "/my-polls",
  authMiddleware,
  getMyPolls
);

// Get Poll By ID
router.get("/:id", getPollById);

// Update Poll
router.patch(
  "/:id",
  authMiddleware,
  updatePoll
);

// Delete Poll
router.delete(
  "/:id",
  authMiddleware,
  deletePoll
);

// Publish Poll Results
router.patch(
  "/:id/publish",
  authMiddleware,
  publishPollResults
);

export default router;