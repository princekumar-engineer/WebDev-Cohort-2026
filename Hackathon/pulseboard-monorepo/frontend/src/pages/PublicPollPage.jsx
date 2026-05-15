import { useEffect, useState } from "react";

import {
  CheckCircle2,
  Clock3,
  Globe,
  ShieldCheck,
  Send,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import api from "../lib/axios";

export default function PublicPollPage() {
  const navigate =
    useNavigate();

  const {
    id: pollId,
  } = useParams();

  const [poll, setPoll] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [answers, setAnswers] =
    useState({});

  // FETCH POLL
  useEffect(() => {
    if (!pollId) return;

    const fetchPoll =
      async () => {
        try {
          const response =
            await api.get(
              `/polls/${pollId}`
            );

          setPoll(
            response.data.poll
          );
        } catch (error) {
          console.log(error);

          navigate("/404");
        } finally {
          setLoading(false);
        }
      };

    fetchPoll();
  }, [pollId, navigate]);

  // SELECT OPTION
  const handleSelect = (
    questionId,
    optionId
  ) => {
    setAnswers({
      ...answers,
      [questionId]:
        optionId,
    });
  };

  // SUBMIT
  const handleSubmit =
    async () => {
      // VALIDATE
      if (
        Object.keys(answers)
          .length !==
        poll.questions.length
      ) {
        return alert(
          "Please answer all questions"
        );
      }

      try {
        setSubmitting(true);

        const formattedAnswers =
          Object.entries(
            answers
          ).map(
            ([
              questionId,
              optionId,
            ]) => ({
              question_id:
                questionId,

              selected_option_id:
                optionId,
            })
          );

        await api.post(
          `/responses/${pollId}`,
          {
            answers:
              formattedAnswers,
          }
        );

        navigate(
          `/p/${pollId}/success`
        );
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Submission failed"
        );
      } finally {
        setSubmitting(false);
      }
    };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Loading Poll...
        </h1>
      </div>
    );
  }

  // NO POLL
  if (!poll) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Poll Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      {/* HEADER */}
      <div className="bg-linear-to-r from-violet-600 to-indigo-600 text-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* LOGO */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-3 h-3 rounded-full bg-white" />

            <h1 className="text-3xl font-bold">
              PulseBoard
            </h1>
          </div>

          {/* TITLE */}
          <h1 className="text-5xl font-bold leading-tight">
            {poll.title}
          </h1>

          <p className="text-violet-100 text-lg mt-6 max-w-3xl leading-relaxed">
            {poll.description}
          </p>

          {/* META */}
          <div className="flex flex-wrap gap-6 mt-8">
            {/* PUBLIC */}
            <div className="flex items-center gap-2 text-violet-100">
              <Globe size={18} />

              <span>
                Public Poll
              </span>
            </div>

            {/* SECURE */}
            <div className="flex items-center gap-2 text-violet-100">
              <ShieldCheck
                size={18}
              />

              <span>
                Secure
                Submission
              </span>
            </div>

            {/* EXPIRY */}
            {poll.expiry_time && (
              <div className="flex items-center gap-2 text-violet-100">
                <Clock3
                  size={18}
                />

                <span>
                  Expires{" "}
                  {new Date(
                    poll.expiry_time
                  ).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* QUESTIONS */}
        <div className="space-y-6">
          {poll.questions.map(
            (
              question,
              index
            ) => (
              <div
                key={
                  question._id
                }
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
              >
                {/* QUESTION HEADER */}
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 font-bold text-lg">
                    {index + 1}
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {
                        question.question_text
                      }
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Select one
                      option
                      below.
                    </p>
                  </div>
                </div>

                {/* OPTIONS */}
                <div className="space-y-4">
                  {question.options.map(
                    (
                      option
                    ) => {
                      const selected =
                        answers[
                          question
                            ._id
                        ] ===
                        option._id;

                      return (
                        <button
                          key={
                            option._id
                          }
                          onClick={() =>
                            handleSelect(
                              question._id,
                              option._id
                            )
                          }
                          className={`w-full text-left rounded-2xl border px-5 py-5 transition flex items-center justify-between ${
                            selected
                              ? "border-violet-500 bg-violet-50"
                              : "border-gray-200 hover:border-violet-300 hover:bg-violet-50/40"
                          }`}
                        >
                          <span className="font-medium text-gray-800">
                            {
                              option.option_text
                            }
                          </span>

                          {selected && (
                            <CheckCircle2 className="text-violet-600" />
                          )}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )
          )}
        </div>

        {/* SUBMIT CARD */}
        <div className="mt-10 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Ready to
                Submit?
              </h2>

              <p className="text-gray-500 mt-3 max-w-2xl">
                Once
                submitted,
                your responses
                will be
                securely
                recorded.
              </p>
            </div>

            <button
              onClick={
                handleSubmit
              }
              disabled={
                submitting
              }
              className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 transition text-white px-8 py-4 rounded-2xl font-medium flex items-center gap-3"
            >
              <Send
                size={20}
              />

              {submitting
                ? "Submitting..."
                : "Submit Responses"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}