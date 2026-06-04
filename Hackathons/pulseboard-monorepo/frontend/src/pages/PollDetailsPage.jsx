import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

import PageContainer from "../components/layout/PageContainer";

import {
  Globe,
  Lock,
  Calendar,
  Users,
  Copy,
  Pencil,
  Trash2,
  BarChart3,
  CheckCircle2,
  Clock3,
  Share2,
} from "lucide-react";

import {
  getPollById,
  deletePoll,
  publishResults,
} from "../services/pollService";

export default function PollDetailsPage() {
  const { id: pollId } =
    useParams();

  const navigate =
    useNavigate();

  const [poll, setPoll] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

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

        setPoll(data.poll);
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.message ||
            "Failed to load poll"
        );
      } finally {
        setLoading(false);
      }
    };

  // DELETE
  const handleDelete =
    async () => {
      const confirmDelete =
        window.confirm(
          "Delete this poll?"
        );

      if (!confirmDelete)
        return;

      try {
        await deletePoll(
          pollId
        );

        alert(
          "Poll deleted successfully"
        );

        navigate(
          "/polls"
        );
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.message ||
            "Delete failed"
        );
      }
    };

  // PUBLISH RESULTS
  const handlePublish =
    async () => {
      try {
        await publishResults(
          pollId
        );

        alert(
          "Results published"
        );

        fetchPoll();
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.message ||
            "Publish failed"
        );
      }
    };

  // COPY LINK
  const copyLink = () => {
    const publicUrl = `${window.location.origin}/p/${pollId}`;

    navigator.clipboard.writeText(
      publicUrl
    );

    alert(
      "Poll link copied!"
    );
  };

  // LOADING
  if (loading) {
    return (
      <PageContainer>
        <div className="text-center py-20 text-2xl font-semibold">
          Loading Poll...
        </div>
      </PageContainer>
    );
  }

  // NOT FOUND
  if (!poll) {
    return (
      <PageContainer>
        <div className="text-center py-20 text-2xl font-semibold">
          Poll not found
        </div>
      </PageContainer>
    );
  }

  // STATUS
  const status =
    poll.is_published
      ? "Published"
      : poll.expiry_time &&
        new Date(
          poll.expiry_time
        ) < new Date()
      ? "Expired"
      : "Active";

  // PUBLIC LINK
  const publicLink = `${window.location.origin}/p/${pollId}`;

  return (
    <PageContainer>
      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            {/* STATUS */}
            <span
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                status ===
                "Active"
                  ? "bg-green-100 text-green-700"
                  : status ===
                    "Published"
                  ? "bg-violet-100 text-violet-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status}
            </span>

            {/* VISIBILITY */}
            <span className="flex items-center gap-2 text-gray-500 text-sm">
              {poll.requires_auth ? (
                <Lock
                  size={16}
                />
              ) : (
                <Globe
                  size={16}
                />
              )}

              {poll.requires_auth
                ? "Private"
                : "Public"}
            </span>
          </div>

          {/* TITLE */}
          <h1 className="text-4xl font-bold text-gray-900">
            {poll.title}
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-500 mt-4 max-w-3xl leading-relaxed">
            {
              poll.description
            }
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-3">
          {/* EDIT */}
          <Link
            to={`/polls/${poll._id}/edit`}
          >
            <button className="flex items-center gap-2 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition px-5 py-3 rounded-2xl font-medium">
              <Pencil
                size={18}
              />
              Edit
            </button>
          </Link>

          {/* ANALYTICS */}
          <Link
            to={`/polls/${poll._id}/analytics`}
          >
            <button className="flex items-center gap-2 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition px-5 py-3 rounded-2xl font-medium">
              <BarChart3
                size={18}
              />
              Analytics
            </button>
          </Link>

          {/* PUBLISH */}
          <button
            onClick={
              handlePublish
            }
            className="flex items-center gap-2 border border-green-200 text-green-700 hover:bg-green-50 transition px-5 py-3 rounded-2xl font-medium"
          >
            <CheckCircle2
              size={18}
            />
            Publish
          </button>

          {/* DELETE */}
          <button
            onClick={
              handleDelete
            }
            className="flex items-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 transition px-5 py-3 rounded-2xl font-medium"
          >
            <Trash2
              size={18}
            />
            Delete
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* QUESTIONS */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-8">
              Poll Questions
            </h2>

            <div className="space-y-8">
              {poll.questions.map(
                (
                  question,
                  index
                ) => (
                  <div
                    key={
                      question._id
                    }
                    className="border border-gray-100 rounded-3xl p-6"
                  >
                    {/* HEADER */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 font-bold">
                        {index + 1}
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900">
                        {
                          question.question_text
                        }
                      </h3>
                    </div>

                    {/* OPTIONS */}
                    <div className="space-y-3">
                      {question.options.map(
                        (
                          option
                        ) => (
                          <div
                            key={
                              option._id
                            }
                            className="border border-gray-200 rounded-2xl px-5 py-4 hover:border-violet-300 transition"
                          >
                            {
                              option.option_text
                            }
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          {/* OVERVIEW */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">
              Poll Overview
            </h2>

            <div className="space-y-5">
              {/* QUESTIONS */}
              <div className="flex items-center justify-between border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">
                    <Users className="text-violet-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Questions
                    </h3>

                    <p className="text-sm text-gray-500">
                      Total questions
                    </p>
                  </div>
                </div>

                <span className="text-3xl font-bold text-violet-600">
                  {
                    poll.questions
                      .length
                  }
                </span>
              </div>

              {/* CREATED */}
              <div className="flex items-center justify-between border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <Calendar className="text-blue-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Created
                    </h3>
                  </div>
                </div>

                <span className="font-semibold text-gray-700">
                  {new Date(
                    poll.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>

              {/* EXPIRY */}
              <div className="flex items-center justify-between border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
                    <Clock3 className="text-yellow-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Expires
                    </h3>
                  </div>
                </div>

                <span className="font-semibold text-gray-700">
                  {poll.expiry_time
                    ? new Date(
                        poll.expiry_time
                      ).toLocaleDateString()
                    : "No Expiry"}
                </span>
              </div>
            </div>
          </div>

          {/* SHARE */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">
              Share Poll
            </h2>

            <div className="border border-gray-200 rounded-2xl px-5 py-4 text-gray-500 break-all">
              {publicLink}
            </div>

            {/* COPY */}
            <button
              onClick={
                copyLink
              }
              className="mt-5 w-full bg-violet-600 hover:bg-violet-700 transition text-white py-4 rounded-2xl font-medium flex items-center justify-center gap-2"
            >
              <Copy
                size={18}
              />
              Copy Link
            </button>

            {/* SHARE */}
            <button className="mt-4 w-full border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition py-4 rounded-2xl font-medium flex items-center justify-center gap-2">
              <Share2
                size={18}
              />
              Share Poll
            </button>
          </div>

          {/* STATUS CARD */}
          <div className="bg-linear-to-br from-violet-600 to-indigo-600 rounded-3xl p-6 text-white shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
              <CheckCircle2
                size={28}
              />
            </div>

            <h2 className="text-2xl font-bold">
              {status ===
              "Expired"
                ? "Poll Expired"
                : status ===
                  "Published"
                ? "Results Published"
                : "Poll is Live"}
            </h2>

            <p className="text-violet-100 mt-4 leading-relaxed">
              Your poll is
              currently accepting
              responses.
            </p>

            <Link
              to={`/p/${poll._id}`}
            >
              <button className="mt-8 w-full bg-white text-violet-700 hover:bg-violet-50 transition py-4 rounded-2xl font-semibold">
                Open Public Poll
              </button>
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}