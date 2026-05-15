import Poll from "../models/Poll.js";
import Response from "../models/Response.js";

import aggregateAnalytics from "../utils/aggregateAnalytics.js";

export const getAnalytics = async (req, res) => {
  console.log("Analytics Controller Started");

  try {
    const poll = await Poll.findById(req.params.pollId);

    if (!poll) {
      return res.status(404).json({
        success: false,
        message: "Poll not found",
      });
    }

    const responses = await Response.find({
      poll_id: poll._id,
    });

    const analytics = aggregateAnalytics(
      poll,
      responses
    );

    res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    console.log("Analytics Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    console.log("Analytics Controller Finished");
  }
};

export const getPublicResults = async (
  req,
  res
) => {
  console.log(
    "Public Results Controller Started"
  );

  try {
    const { pollId } = req.params;

    const poll = await Poll.findById(
      pollId
    );

    if (!poll) {
      return res.status(404).json({
        success: false,
        message: "Poll not found",
      });
    }

    const responses = await Response.find({
      poll_id: poll._id,
    });

    const analytics =
      aggregateAnalytics(
        poll,
        responses
      );

    res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    console.error(
      "Public Results Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    console.log(
      "Public Results Controller Finished"
    );
  }
};