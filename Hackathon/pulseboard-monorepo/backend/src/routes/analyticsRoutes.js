import express from "express";

import {
  getAnalytics,
  getPublicResults,
} from "../controllers/analyticsController.js";

const router = express.Router();

// Get Analytics
router.get("/:pollId", getAnalytics);

// Get Public Results
router.get(
  "/:pollId/public-results",
  getPublicResults
);

export default router;
