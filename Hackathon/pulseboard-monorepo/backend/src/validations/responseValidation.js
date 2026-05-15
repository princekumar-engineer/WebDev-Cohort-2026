const responseValidation = (
  req,
  res,
  next
) => {
  try {
    const { answers } = req.body;

    // Answers required
    if (
      !answers ||
      !Array.isArray(answers) ||
      answers.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "At least one answer is required",
      });
    }

    // Validate answer structure
    for (const answer of answers) {
      if (!answer.question_id) {
        return res.status(400).json({
          success: false,
          message:
            "question_id is required",
        });
      }

      if (
        !answer.selected_option_id
      ) {
        return res.status(400).json({
          success: false,
          message:
            "selected_option_id is required",
        });
      }
    }

    next();
  } catch (error) {
    console.log(
      "Response Validation Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default responseValidation;