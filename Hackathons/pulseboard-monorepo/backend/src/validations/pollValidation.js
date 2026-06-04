const pollValidation = (
  req,
  res,
  next
) => {
  try {
    const { title, questions } =
      req.body;

    // Title required
    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Poll title is required",
      });
    }

    // Questions required
    if (
      !questions ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "At least one question is required",
      });
    }

    // Validate each question
    for (const question of questions) {
      if (
        !question.question_text?.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Question text is required",
        });
      }

      if (
        !question.options ||
        question.options.length < 2
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Each question needs at least 2 options",
        });
      }

      // Validate options
      for (const option of question.options) {
        if (
          !option.option_text?.trim()
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Option text is required",
          });
        }
      }
    }

    next();
  } catch (error) {
    console.log(
      "Poll Validation Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default pollValidation;