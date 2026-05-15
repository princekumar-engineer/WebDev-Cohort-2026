import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  selected_option_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const responseSchema = new mongoose.Schema(
  {
    poll_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },

    respondent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    

    anonymous_identifier: {
      type: String,
      default: null,
    },

    answers: [answerSchema],

    submitted_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Response = mongoose.model("Response", responseSchema);

export default Response;

responseSchema.index({
  poll_id: 1,
});

responseSchema.index({
  respondent_id: 1,
});