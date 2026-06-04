import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  option_text: {
  type: String,
  required: true,
  trim: true,
},
});

const questionSchema = new mongoose.Schema({
    question_text: {
    type: String,
    required: true,
    trim: true,
  },

  is_required: {
    type: Boolean,
    default: false,
  },

  options: {
  type: [optionSchema],
  validate: [
    (val) => val.length >= 2,
    "At least two options are required",
  ],
},
});

const pollSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 364,
    },

    description: String,

    allow_anonymous: {
      type: Boolean,
      default: true,
    },

    requires_auth: {
      type: Boolean,
      default: false,
    },

    is_published: {
      type: Boolean,
      default: false,
    },

    expiry_time: Date,

    questions: {
    type: [questionSchema],
    validate: [
      (val) => val.length > 0,
      "At least one question is required",
    ],
  },
  },
  {
    timestamps: true,
  }
);

const Poll = mongoose.model("Poll", pollSchema);

pollSchema.index({
  creator: 1,
});

export default Poll;