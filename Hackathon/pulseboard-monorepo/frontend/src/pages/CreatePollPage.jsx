import { useState } from "react";

import { useNavigate } from "react-router-dom";

import PageContainer from "../components/layout/PageContainer";

import {
  Plus,
  Trash2,
  Calendar,
  Globe,
  Lock,
  CheckCircle2,
} from "lucide-react";

import { createPoll } from "../services/pollService";

export default function CreatePollPage() {
  const navigate = useNavigate();

  // LOADING
  const [loading, setLoading] =
    useState(false);

  // POLL FORM
  const [pollData, setPollData] =
    useState({
      title: "",
      description: "",

      allow_anonymous: true,

      requires_auth: false,

      expiry_time: "",

      questions: [
        {
          id: Date.now(),

          question_text: "",

          is_required: false,

          options: [
            { option_text: "" },

            { option_text: "" },
          ],
        },
      ],
    });

  // HANDLE POLL INFO
  const handleChange = (e) => {
    setPollData({
      ...pollData,
      [e.target.name]:
        e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value,
    });
  };

  // ADD QUESTION
  const addQuestion = () => {
    setPollData({
      ...pollData,

      questions: [
        ...pollData.questions,

        {
          id: Date.now(),

          question_text: "",

          is_required: false,

          options: [
            { option_text: "" },

            { option_text: "" },
          ],
        },
      ],
    });
  };

  // REMOVE QUESTION
  const removeQuestion = (id) => {
    setPollData({
      ...pollData,

      questions:
        pollData.questions.filter(
          (q) => q.id !== id
        ),
    });
  };

  // QUESTION CHANGE
  const handleQuestionChange = (
    questionId,
    value
  ) => {
    setPollData({
      ...pollData,

      questions:
        pollData.questions.map((q) =>
          q.id === questionId
            ? {
                ...q,
                question_text: value,
              }
            : q
        ),
    });
  };

  // ADD OPTION
  const addOption = (questionId) => {
    setPollData({
      ...pollData,

      questions:
        pollData.questions.map((q) =>
          q.id === questionId
            ? {
                ...q,

                options: [
                  ...q.options,

                  {
                    option_text: "",
                  },
                ],
              }
            : q
        ),
    });
  };

  // REMOVE OPTION
  const removeOption = (
    questionId,
    optionIndex
  ) => {
    setPollData({
      ...pollData,

      questions:
        pollData.questions.map((q) => {
          if (q.id === questionId) {
            return {
              ...q,

              options: q.options.filter(
                (_, index) =>
                  index !== optionIndex
              ),
            };
          }

          return q;
        }),
    });
  };

  // OPTION CHANGE
  const handleOptionChange = (
    questionId,
    optionIndex,
    value
  ) => {
    setPollData({
      ...pollData,

      questions:
        pollData.questions.map((q) => {
          if (q.id === questionId) {
            return {
              ...q,

              options: q.options.map(
                (option, index) =>
                  index === optionIndex
                    ? {
                        option_text:
                          value,
                      }
                    : option
              ),
            };
          }

          return q;
        }),
    });
  };

  // SUBMIT POLL
  const handleSubmit = async () => {
    try {
      // TITLE VALIDATION
      if (!pollData.title.trim()) {
        return alert(
          "Poll title is required"
        );
      }

      // REMOVE LOCAL IDS + FILTER EMPTY OPTIONS
      const formattedQuestions =
        pollData.questions.map(
          ({ id, ...question }) => ({
            ...question,

            options:
              question.options.filter(
                (option) =>
                  option.option_text.trim() !== ""
              ),
          })
        );

      // EMPTY QUESTION VALIDATION
      const hasEmptyQuestion =
        formattedQuestions.some(
          (q) =>
            !q.question_text.trim()
        );

      if (hasEmptyQuestion) {
        return alert(
          "All questions are required"
        );
      }

      // MINIMUM OPTIONS VALIDATION
      const invalidQuestion =
        formattedQuestions.some(
          (q) => q.options.length < 2
        );

      if (invalidQuestion) {
        return alert(
          "Each question must have at least 2 options"
        );
      }

      setLoading(true);

      const payload = {
        ...pollData,

        questions:
          formattedQuestions,
      };

      const data =
        await createPoll(
          payload
        );

      alert(
        "Poll created successfully"
      );

      navigate(
        `/polls/${data.poll._id}`
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data
          ?.message ||
          "Failed to create poll"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Create New Poll
          </h1>

          <p className="text-gray-500 mt-2">
            Build interactive polls and collect
            responses in real time.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-violet-600 hover:bg-violet-700 transition text-white px-6 py-3 rounded-2xl font-medium"
        >
          {loading
            ? "Publishing..."
            : "Publish Poll"}
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">
          {/* POLL INFO */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">
              Poll Information
            </h2>

            <div className="space-y-5">
              {/* TITLE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Poll Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={pollData.title}
                  onChange={handleChange}
                  placeholder="Enter poll title..."
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  rows="4"
                  name="description"
                  value={
                    pollData.description
                  }
                  onChange={handleChange}
                  placeholder="Describe your poll..."
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* QUESTIONS */}
          <div className="space-y-6">
            {pollData.questions.map(
              (question, index) => (
                <div
                  key={question.id}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
                >
                  {/* HEADER */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">
                      Question{" "}
                      {index + 1}
                    </h2>

                    {pollData.questions
                      .length > 1 && (
                      <button
                        onClick={() =>
                          removeQuestion(
                            question.id
                          )
                        }
                        className="w-11 h-11 rounded-2xl bg-red-100 hover:bg-red-200 transition flex items-center justify-center text-red-500"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>

                  {/* QUESTION */}
                  <input
                    type="text"
                    value={
                      question.question_text
                    }
                    onChange={(e) =>
                      handleQuestionChange(
                        question.id,
                        e.target.value
                      )
                    }
                    placeholder="Enter your question..."
                    className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-violet-500 mb-6"
                  />

                  {/* OPTIONS */}
                  <div className="space-y-4">
                    {question.options.map(
                      (option, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3"
                        >
                          <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 font-semibold">
                            {i + 1}
                          </div>

                          <input
                            type="text"
                            value={
                              option.option_text
                            }
                            onChange={(e) =>
                              handleOptionChange(
                                question.id,
                                i,
                                e.target.value
                              )
                            }
                            placeholder={`Option ${
                              i + 1
                            }`}
                            className="flex-1 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-violet-500"
                          />

                          {question.options
                            .length > 2 && (
                            <button
                              onClick={() =>
                                removeOption(
                                  question.id,
                                  i
                                )
                              }
                              className="w-11 h-11 rounded-2xl bg-red-100 hover:bg-red-200 transition flex items-center justify-center text-red-500"
                            >
                              <Trash2
                                size={18}
                              />
                            </button>
                          )}
                        </div>
                      )
                    )}

                    {/* ADD OPTION */}
                    <button
                      onClick={() =>
                        addOption(
                          question.id
                        )
                      }
                      className="flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium mt-3"
                    >
                      <Plus size={18} />
                      Add Option
                    </button>
                  </div>
                </div>
              )
            )}

            {/* ADD QUESTION */}
            <button
              onClick={addQuestion}
              className="w-full bg-violet-50 hover:bg-violet-100 transition border-2 border-dashed border-violet-200 rounded-3xl p-8 flex flex-col items-center justify-center text-violet-600"
            >
              <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mb-4">
                <Plus size={24} />
              </div>

              <h3 className="text-xl font-semibold">
                Add New Question
              </h3>
            </button>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          {/* SETTINGS */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">
              Poll Settings
            </h2>

            <div className="space-y-5">
              {/* PUBLIC */}
              <button
                onClick={() =>
                  setPollData({
                    ...pollData,
                    allow_anonymous:
                      true,
                    requires_auth:
                      false,
                  })
                }
                className={`w-full border rounded-2xl p-4 flex items-start gap-4 transition ${
                  pollData.allow_anonymous
                    ? "border-violet-200 bg-violet-50"
                    : "border-gray-200"
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">
                  <Globe className="text-violet-600" />
                </div>

                <div className="text-left">
                  <h3 className="font-semibold">
                    Public Poll
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    Anyone can vote
                  </p>
                </div>
              </button>

              {/* PRIVATE */}
              <button
                onClick={() =>
                  setPollData({
                    ...pollData,
                    allow_anonymous:
                      false,
                    requires_auth:
                      true,
                  })
                }
                className={`w-full border rounded-2xl p-4 flex items-start gap-4 transition ${
                  pollData.requires_auth
                    ? "border-violet-200 bg-violet-50"
                    : "border-gray-200"
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <Lock className="text-gray-700" />
                </div>

                <div className="text-left">
                  <h3 className="font-semibold">
                    Private Poll
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    Login required
                  </p>
                </div>
              </button>

              {/* EXPIRY */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiration Date
                </label>

                <div className="relative">
                  <Calendar
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="date"
                    name="expiry_time"
                    value={
                      pollData.expiry_time
                    }
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-2xl pl-12 pr-5 py-4 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="bg-linear-to-br from-violet-600 to-indigo-600 rounded-3xl p-6 text-white shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
              <CheckCircle2 size={28} />
            </div>

            <h2 className="text-2xl font-bold">
              Ready to Publish?
            </h2>

            <p className="text-violet-100 mt-4 leading-relaxed">
              Your poll is almost ready.
            </p>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-8 w-full bg-white text-violet-700 hover:bg-violet-50 transition py-4 rounded-2xl font-semibold"
            >
              {loading
                ? "Publishing..."
                : "Publish Poll"}
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}