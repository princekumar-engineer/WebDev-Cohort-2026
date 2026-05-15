import Poll from "../models/Poll.js";
import Response from "../models/Response.js";

import checkPollExpiry from "../utils/checkPollExpiry.js";
import aggregateAnalytics from "../utils/aggregateAnalytics.js";
import getAnonymousIdentifier from "../utils/getAnonymousIdentifier.js";

import { getIO } from "../config/socket.js";
export const submitResponse = async (req, res) => {
  console.log("Submit Response Controller Started");

  try {
    const { pollId } = req.params;
    const { answers } = req.body || {};

    // Validate answers payload
    if (
      !answers ||
      !Array.isArray(answers) ||
      answers.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Answers are required",
      });
    }

    // Check if poll exists
    const poll = await Poll.findById(pollId);

// Poll requires login
if (
  poll.requires_auth &&
  !req.user
) {
  return res.status(401).json({
    success: false,
    message:
      "Login required to participate in this poll",
  });
}

    // Poll blocks anonymous voting
    if (
      !poll.allow_anonymous &&
      !req.user
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Anonymous responses are not allowed",
      });
    }
    // Check poll expiry
    const isExpired = checkPollExpiry(
      poll.expiry_time
    );

    if (isExpired) {
      return res.status(400).json({
        success: false,
        message:
          "This poll has expired and is no longer accepting responses",
      });
    }

    // Generate anonymous identifier
    const anonymousIdentifier =
      getAnonymousIdentifier(req);

    // Duplicate Prevention
    let existingResponse;

    // Logged-in user duplicate prevention
    if (req.user?.id) {
      existingResponse = await Response.findOne({
        poll_id: poll._id,
        respondent_id: req.user.id,
      });

      if (existingResponse) {
        return res.status(400).json({
          success: false,
          message:
            "You have already submitted a response to this poll",
        });
      }
    } else {
      // Anonymous duplicate prevention
      existingResponse = await Response.findOne({
        poll_id: poll._id,
        anonymous_identifier:
          anonymousIdentifier,
      });

      if (existingResponse) {
        return res.status(400).json({
          success: false,
          message:
            "Anonymous response already submitted from this device",
        });
      }
    }

    // Validate required fields in answers
    for (const answer of answers) {
      if (!answer.question_id) {
        return res.status(400).json({
          success: false,
          message: "question_id is required",
        });
      }

      if (!answer.selected_option_id) {
        return res.status(400).json({
          success: false,
          message:
            "selected_option_id is required",
        });
      }
    }

    // Mandatory Question Validation
    for (const question of poll.questions) {
      if (question.is_required) {
        const answeredQuestion =
          answers.find(
            (answer) =>
              answer.question_id.toString() ===
              question._id.toString()
          );

        if (!answeredQuestion) {

          return res.status(400).json({
            success: false,
            message: `Question "${question.question_text}" is required`,
          });
        }
      }
    }

    // Validate question & option existence
    for (const answer of answers) {
      const question = poll.questions.id(
        answer.question_id
      );

      if (!question) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid question selected",
        });
      }

      const optionExists =
        question.options.id(
          answer.selected_option_id
        );

      if (!optionExists) {
       
        return res.status(400).json({
          success: false,
          message:
            "Invalid option selected",
        });
      }
    }

    // Save response
    const response = await Response.create({
      poll_id: poll._id,
      respondent_id: req.user?.id || null,
      anonymous_identifier:
        anonymousIdentifier,
      answers,
    });

    // Aggregate analytics
    const allResponses =
      await Response.find({
        poll_id: poll._id,
      });

    const analytics = aggregateAnalytics(
      poll,
      allResponses
    );

    // Socket.io live updates
    const io = getIO();

    io.to(poll._id.toString()).emit(
      "live_analytics_update",
      analytics
    );

    // Success response
    res.status(201).json({
      success: true,
      message:
        "Response submitted successfully",
      response,
      analytics,
    });
  } catch (error) {
    console.error(
      "Submit Response Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    console.log(
      "Submit Response Controller Finished"
    );
  }
};