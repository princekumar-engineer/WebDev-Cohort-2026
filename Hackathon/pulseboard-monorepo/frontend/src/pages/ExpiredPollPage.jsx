import {
  AlertTriangle,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import { getPollById } from "../services/pollService";

export default function ExpiredPollPage() {
  const {
    id: pollId,
  } = useParams();

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
      if (!pollId) return;

      try {
        const data =
          await getPollById(
            pollId
          );

        setPoll(data.poll);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  // FORMAT DATE
  const formatDate = (
    date
  ) => {
    if (!date)
      return "Unknown";

    return new Date(
      date
    ).toLocaleString();
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold bg-[#f5f7fb]">
        Loading...
      </div>
    );
  }

  // NOT FOUND
  if (!poll) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-red-500 bg-[#f5f7fb]">
        Poll not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-6 py-10">
      {/* CARD */}
      <div className="w-full max-w-4xl bg-white rounded-4xl shadow-sm border border-gray-100 overflow-hidden">
        {/* TOP BORDER */}
        <div className="h-2 bg-linear-to-r from-violet-600 to-indigo-600" />

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-10 md:p-14">
          {/* LEFT */}
          <div className="relative flex justify-center">
            {/* GLOW */}
            <div className="absolute w-72 h-72 bg-violet-100 rounded-full blur-3xl opacity-40" />

            {/* CLOCK CONTAINER */}
            <div className="relative w-72 h-72 rounded-full bg-violet-50 flex items-center justify-center">
              {/* CLOCK */}
              <div className="w-52 h-52 rounded-full border-10 border-violet-400 bg-white relative shadow-lg">
                {/* CENTER */}
                <div className="absolute top-1/2 left-1/2 w-5 h-5 rounded-full bg-violet-500 -translate-x-1/2 -translate-y-1/2" />

                {/* HOUR HAND */}
                <div className="absolute top-1/2 left-1/2 w-1 h-16 bg-violet-500 origin-bottom rounded-full rotate-320 -translate-x-1/2 -translate-y-full" />

                {/* MINUTE HAND */}
                <div className="absolute top-1/2 left-1/2 w-1 h-24 bg-gray-500 origin-bottom rounded-full rotate-140 -translate-x-1/2 -translate-y-full" />

                {/* MARKERS */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-6 bg-violet-300 rounded-full" />

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-6 bg-violet-300 rounded-full" />

                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-2 bg-violet-300 rounded-full" />

                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-2 bg-violet-300 rounded-full" />
              </div>

              {/* WARNING */}
              <div className="absolute bottom-10 right-10 w-20 h-20 rounded-3xl bg-red-500 flex items-center justify-center shadow-xl rotate-[-10deg]">
                <AlertTriangle
                  size={40}
                  className="text-white"
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            {/* TITLE */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Poll Expired
            </h1>

            {/* POLL TITLE */}
            <h2 className="text-2xl font-semibold text-violet-600 mt-5">
              {poll.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-500 text-lg leading-relaxed mt-8">
              This poll expired on{" "}
              <span className="font-semibold text-gray-700">
                {formatDate(
                  poll.expiry_time
                )}
              </span>
              .
            </p>

            <p className="text-gray-500 text-lg leading-relaxed mt-4">
              Thank you to
              everyone who
              participated!
            </p>

            {/* RESULTS */}
            {poll.is_published && (
              <Link
                to={`/p/${pollId}/results`}
              >
                <button className="mt-10 bg-violet-600 hover:bg-violet-700 transition text-white px-10 py-5 rounded-2xl font-medium text-lg shadow-lg shadow-violet-200">
                  View Results
                </button>
              </Link>
            )}

            {/* HOME */}
            <Link
              to="/"
              className="mt-10 inline-flex items-center gap-3 text-violet-600 hover:text-violet-700 font-semibold text-lg"
            >
              ← Go Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}