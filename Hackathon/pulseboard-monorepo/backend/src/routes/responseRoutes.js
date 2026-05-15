import express from "express";

import { submitResponse } from "../controllers/responseController.js";

import optionalAuthMiddleware from "../middleware/optionalAuthMiddleware.js";

import responseValidation from "../validations/responseValidation.js";


const router = express.Router();

router.post(
  "/:pollId",
  optionalAuthMiddleware,
  responseValidation,
  submitResponse
);

export default router;