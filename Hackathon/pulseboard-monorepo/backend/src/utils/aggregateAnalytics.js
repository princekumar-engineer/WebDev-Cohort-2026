const aggregateAnalytics = (poll, responses) => {
  const analytics = {
    totalResponses: responses.length,
    questions: [],
  };

  poll.questions.forEach((question) => {
    const questionSummary = {
      questionId: question._id,
      question: question.question_text,
      options: [],
    };

    question.options.forEach((option) => {
      let count = 0;

      responses.forEach((response) => {
        response.answers.forEach((answer) => {
          if (
            answer.selected_option_id.toString() ===
            option._id.toString()
          ) {
            count++;
          }
        });
      });

      const percentage =
        responses.length === 0
          ? 0
          : ((count / responses.length) * 100).toFixed(2);

      questionSummary.options.push({
        optionId: option._id,
        option: option.option_text,
        votes: count,
        percentage,
      });
    });

    analytics.questions.push(questionSummary);
  });

  return analytics;
};

export default aggregateAnalytics;