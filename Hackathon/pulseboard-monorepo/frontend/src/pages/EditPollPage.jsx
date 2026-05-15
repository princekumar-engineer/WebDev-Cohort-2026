import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import {
  Plus,
  Trash2,
  Calendar,
  Globe,
  Lock,
  Save,
  ArrowLeft,
} from "lucide-react";

import {
  getPollById,
  updatePoll,
} from "../services/pollService";

export default function EditPollPage() {
  const navigate =
    useNavigate();

  const {
    id: pollId,
  } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [pollData, setPollData] =
    useState({
      title: "",
      description: "",
      allow_anonymous: true,
      requires_auth: false,
      expiry_time: "",
      questions: [],
    });

  // FETCH POLL
  useEffect(() => {
    if (!pollId) return;

    fetchPoll();
  }, [pollId]);

  const fetchPoll =
    async () => {
      try {
        const data =
          await getPollById(
            pollId
          );

        setPollData({
          ...data.poll,
          questions:
            data.poll
              .questions || [],
        });
      } catch (error) {
        console.error(error);

        alert(
          "Failed to load poll"
        );
      } finally {
        setLoading(false);
      }
    };

  // UPDATE FIELD
  const updatePollField = (
    field,
    value
  ) => {
    setPollData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ADD QUESTION
  const addQuestion = () => {
    setPollData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question_text: "",
          is_required: false,
          options: [
            {
              option_text: "",
            },
            {
              option_text: "",
            },
          ],
        },
      ],
    }));
  };

  // REMOVE QUESTION
  const removeQuestion = (
    questionIndex
  ) => {
    setPollData((prev) => ({
      ...prev,
      questions:
        prev.questions.filter(
          (_, index) =>
            index !==
            questionIndex
        ),
    }));
  };

  // UPDATE QUESTION
  const updateQuestion = (
    questionIndex,
    value
  ) => {
    setPollData((prev) => ({
      ...prev,
      questions:
        prev.questions.map(
          (
            question,
            index
          ) =>
            index ===
            questionIndex
              ? {
                  ...question,
                  question_text:
                    value,
                }
              : question
        ),
    }));
  };

  // ADD OPTION
  const addOption = (
    questionIndex
  ) => {
    setPollData((prev) => ({
      ...prev,
      questions:
        prev.questions.map(
          (
            question,
            index
          ) =>
            index ===
            questionIndex
              ? {
                  ...question,
                  options: [
                    ...question.options,
                    {
                      option_text:
                        "",
                    },
                  ],
                }
              : question
        ),
    }));
  };

  // UPDATE OPTION
  const updateOption = (
    questionIndex,
    optionIndex,
    value
  ) => {
    setPollData((prev) => ({
      ...prev,
      questions:
        prev.questions.map(
          (
            question,
            qIndex
          ) => {
            if (
              qIndex ===
              questionIndex
            ) {
              return {
                ...question,
                options:
                  question.options.map(
                    (
                      option,
                      oIndex
                    ) =>
                      oIndex ===
                      optionIndex
                        ? {
                            ...option,
                            option_text:
                              value,
                          }
                        : option
                  ),
              };
            }

            return question;
          }
        ),
    }));
  };

  // REMOVE OPTION
  const removeOption = (
    questionIndex,
    optionIndex
  ) => {
    setPollData((prev) => ({
      ...prev,
      questions:
        prev.questions.map(
          (
            question,
            qIndex
          ) => {
            if (
              qIndex ===
              questionIndex
            ) {
              return {
                ...question,
                options:
                  question.options.filter(
                    (
                      _,
                      oIndex
                    ) =>
                      oIndex !==
                      optionIndex
                  ),
              };
            }

            return question;
          }
        ),
    }));
  };

  // SAVE
  const handleSave =
    async () => {
      try {
        setSaving(true);

        await updatePoll(
          pollId,
          pollData
        );

        alert(
          "Poll updated successfully"
        );

        navigate(
          `/polls/${pollId}`
        );
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.message ||
            "Failed to update poll"
        );
      } finally {
        setSaving(false);
      }
    };

  if (loading) {
    return (
      <PageContainer>
        <div className="text-center py-20 text-xl font-semibold">
          Loading Poll...
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">
        <div>
          <Link
            to="/polls"
            className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium mb-4"
          >
            <ArrowLeft
              size={18}
            />
            Back to Polls
          </Link>

          <h1 className="text-4xl font-bold text-gray-900">
            Edit Poll
          </h1>

          <p className="text-gray-500 mt-2">
            Update your poll
            questions and
            settings.
          </p>
        </div>

        <button
          onClick={
            handleSave
          }
          disabled={saving}
          className="bg-violet-600 hover:bg-violet-700 transition text-white px-6 py-3 rounded-2xl font-medium flex items-center gap-2"
        >
          <Save size={20} />

          {saving
            ? "Saving..."
            : "Save Changes"}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Poll Title
                </label>

                <input
                  type="text"
                  value={
                    pollData.title
                  }
                  onChange={(
                    e
                  ) =>
                    updatePollField(
                      "title",
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  rows="4"
                  value={
                    pollData.description
                  }
                  onChange={(
                    e
                  ) =>
                    updatePollField(
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* QUESTIONS */}
          <div className="space-y-6">
            {pollData.questions.map(
              (
                question,
                qIndex
              ) => (
                <div
                  key={qIndex}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">
                      Question{" "}
                      {qIndex + 1}
                    </h2>

                    {pollData
                      .questions
                      .length >
                      1 && (
                      <button
                        onClick={() =>
                          removeQuestion(
                            qIndex
                          )
                        }
                        className="w-11 h-11 rounded-2xl bg-red-100 hover:bg-red-200 transition flex items-center justify-center text-red-500"
                      >
                        <Trash2
                          size={20}
                        />
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    value={
                      question.question_text
                    }
                    onChange={(
                      e
                    ) =>
                      updateQuestion(
                        qIndex,
                        e.target
                          .value
                      )
                    }
                    className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-violet-500 mb-6"
                  />

                  <div className="space-y-4">
                    {question.options.map(
                      (
                        option,
                        oIndex
                      ) => (
                        <div
                          key={
                            oIndex
                          }
                          className="flex items-center gap-3"
                        >
                          <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 font-semibold">
                            {oIndex +
                              1}
                          </div>

                          <input
                            type="text"
                            value={
                              option.option_text
                            }
                            onChange={(
                              e
                            ) =>
                              updateOption(
                                qIndex,
                                oIndex,
                                e
                                  .target
                                  .value
                              )
                            }
                            className="flex-1 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-violet-500"
                          />

                          {question
                            .options
                            .length >
                            2 && (
                            <button
                              onClick={() =>
                                removeOption(
                                  qIndex,
                                  oIndex
                                )
                              }
                              className="w-11 h-11 rounded-2xl bg-red-100 hover:bg-red-200 transition flex items-center justify-center text-red-500"
                            >
                              <Trash2
                                size={
                                  18
                                }
                              />
                            </button>
                          )}
                        </div>
                      )
                    )}

                    <button
                      onClick={() =>
                        addOption(
                          qIndex
                        )
                      }
                      className="flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium mt-3"
                    >
                      <Plus
                        size={18}
                      />
                      Add Option
                    </button>
                  </div>
                </div>
              )
            )}

            <button
              onClick={
                addQuestion
              }
              className="w-full bg-violet-50 hover:bg-violet-100 transition border-2 border-dashed border-violet-200 rounded-3xl p-8 flex flex-col items-center justify-center text-violet-600"
            >
              <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mb-4">
                <Plus
                  size={24}
                />
              </div>

              <h3 className="text-xl font-semibold">
                Add New
                Question
              </h3>
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">
              Poll Settings
            </h2>

            <div className="space-y-5">
              <button
                onClick={() =>
                  setPollData(
                    (
                      prev
                    ) => ({
                      ...prev,
                      allow_anonymous:
                        true,
                      requires_auth:
                        false,
                    })
                  )
                }
                className={`w-full border rounded-2xl p-4 flex items-start gap-4 transition ${
                  pollData.allow_anonymous
                    ? "border-violet-200 bg-violet-50"
                    : "border-gray-200"
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600">
                  <Globe />
                </div>

                <div className="text-left">
                  <h3 className="font-semibold">
                    Public Poll
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    Anyone can
                    vote
                  </p>
                </div>
              </button>

              <button
                onClick={() =>
                  setPollData(
                    (
                      prev
                    ) => ({
                      ...prev,
                      allow_anonymous:
                        false,
                      requires_auth:
                        true,
                    })
                  )
                }
                className={`w-full border rounded-2xl p-4 flex items-start gap-4 transition ${
                  pollData.requires_auth
                    ? "border-violet-200 bg-violet-50"
                    : "border-gray-200"
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-700">
                  <Lock />
                </div>

                <div className="text-left">
                  <h3 className="font-semibold">
                    Private Poll
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    Login
                    required
                  </p>
                </div>
              </button>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiration
                  Date
                </label>

                <div className="relative">
                  <Calendar
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="date"
                    value={
                      pollData.expiry_time?.split(
                        "T"
                      )[0] || ""
                    }
                    onChange={(
                      e
                    ) =>
                      updatePollField(
                        "expiry_time",
                        e.target
                          .value
                      )
                    }
                    className="w-full border border-gray-200 rounded-2xl pl-12 pr-5 py-4 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}