import Poll from "../models/Poll.js";
import Response from "../models/Response.js";

// Create Poll
export const createPoll = async (req, res) => {
  console.log("Create Poll Controller Started");

  try {
    const poll = await Poll.create({
      ...req.body,
      creator: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Poll created successfully",
      poll,
    });
  } catch (error) {
    console.log(
      "Create Poll Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    console.log(
      "Create Poll Controller Finished"
    );
  }
};

// Get Poll By ID
export const getPollById = async (
  req,
  res
) => {
  console.log("Get Poll Controller Started");

  try {
    const poll = await Poll.findById(
      req.params.id
    );

    if (!poll) {
      return res.status(404).json({
        success: false,
        message: "Poll not found",
      });
    }

    res.status(200).json({
      success: true,
      poll,
    });
  } catch (error) {
    console.log(
      "Get Poll Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    console.log(
      "Get Poll Controller Finished"
    );
  }
};

// Get My Polls
export const getMyPolls = async (
  req,
  res
) => {
  console.log(
    "Get My Polls Controller Started"
  );

  try {
    const polls = await Poll.find({
      creator: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      totalPolls: polls.length,
      polls,
    });
  } catch (error) {
    console.log(
      "Get My Polls Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    console.log(
      "Get My Polls Controller Finished"
    );
  }
};

// Publish Poll Results
export const publishPollResults =
  async (req, res) => {
    console.log(
      "Publish Poll Results Controller Started"
    );

    try {
      const poll = await Poll.findById(
        req.params.id
      );

      if (!poll) {
        return res.status(404).json({
          success: false,
          message: "Poll not found",
        });
      }

      // Ownership Authorization
      if (
        poll.creator.toString() !==
        req.user.id
      ) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }

      poll.is_published = true;

      await poll.save();

      res.status(200).json({
        success: true,
        message:
          "Poll results published successfully",
        poll,
      });
    } catch (error) {
      console.log(
        "Publish Poll Results Error:",
        error.message
      );

      res.status(500).json({
        success: false,
        message: error.message,
      });
    } finally {
      console.log(
        "Publish Poll Results Controller Finished"
      );
    }
  };

// Update Poll
export const updatePoll = async (
  req,
  res
) => {
  console.log("Update Poll Controller Started");

  try {
    const poll = await Poll.findById(
      req.params.id
    );

    if (!poll) {
      return res.status(404).json({
        success: false,
        message: "Poll not found",
      });
    }

    // Ownership Authorization
    if (
      poll.creator.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedPoll =
      await Poll.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message: "Poll updated successfully",
      poll: updatedPoll,
    });
  } catch (error) {
    console.log(
      "Update Poll Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    console.log(
      "Update Poll Controller Finished"
    );
  }
};

// Delete Poll
export const deletePoll = async (
  req,
  res
) => {
  console.log("Delete Poll Controller Started");

  try {
    const poll = await Poll.findById(
      req.params.id
    );
    console.log("poll.creator:", poll.creator.toString());
    console.log("req.user.id:", req.user.id);
    console.log("req.user:", req.user);
    if (!poll) {
      return res.status(404).json({
        success: false,
        message: "Poll not found",
      });
    }

    // Ownership Authorization
    if (!poll.creator.equals(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Delete all related responses
    await Response.deleteMany({
      poll_id: poll._id,
    });

    // Delete poll
    await poll.deleteOne();

    res.status(200).json({
      success: true,
      message: "Poll deleted successfully",
    });
  } catch (error) {
    console.log(
      "Delete Poll Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    console.log(
      "Delete Poll Controller Finished"
    );
  }
};