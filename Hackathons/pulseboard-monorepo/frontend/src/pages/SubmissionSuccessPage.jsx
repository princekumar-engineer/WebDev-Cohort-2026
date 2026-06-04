import {
  Link,
  useParams,
} from "react-router-dom";

import {
  Check,
  Share2,
  BarChart3,
} from "lucide-react";

export default function SubmissionSuccessPage() {
  const {
    id: pollId,
  } = useParams();

  // SHARE POLL
  const handleShare =
    async () => {
      const pollUrl =
        `${window.location.origin}/p/${pollId}`;

      try {
        // MOBILE SHARE API
        if (
          navigator.share
        ) {
          await navigator.share({
            title:
              "PulseBoard Poll",
            text:
              "Share this poll",
            url: pollUrl,
          });
        } else {
          // FALLBACK
          await navigator.clipboard.writeText(
            pollUrl
          );

          alert(
            "Poll link copied!"
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-6">
      {/* CARD */}
      <div className="w-full max-w-2xl bg-white rounded-4xl shadow-sm border border-gray-100 p-10 md:p-14 text-center relative overflow-hidden">
        {/* TOP BORDER */}
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-violet-600 to-indigo-600" />

        {/* CONFETTI */}
        <div className="absolute top-24 left-20 w-3 h-3 bg-pink-500 rounded-sm rotate-12" />

        <div className="absolute top-28 right-24 w-3 h-3 bg-yellow-400 rounded-sm rotate-45" />

        <div className="absolute top-36 left-32 w-2 h-2 bg-green-500 rounded-full" />

        <div className="absolute top-40 right-36 w-2 h-2 bg-blue-500 rounded-full" />

        <div className="absolute top-20 right-44 w-2 h-6 bg-violet-500 rounded-full rotate-45" />

        <div className="absolute top-20 left-44 w-2 h-6 bg-indigo-400 rounded-full -rotate-45" />

        {/* SUCCESS ICON */}
        <div className="relative flex justify-center">
          {/* OUTER */}
          <div className="w-36 h-36 rounded-full bg-green-100 flex items-center justify-center">
            {/* INNER */}
            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
              <Check
                size={52}
                className="text-white stroke-3"
              />
            </div>
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-5xl font-bold text-gray-900 mt-10">
          Thank You! 🎉
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-500 text-lg leading-relaxed mt-6 max-w-xl mx-auto">
          Your response
          has been
          submitted
          successfully.
          <br />
          We appreciate
          your time and
          feedback.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          {/* VIEW RESULTS */}
          <Link
            to={`/p/${pollId}/results`}
          >
            <button className="bg-violet-600 hover:bg-violet-700 transition text-white px-8 py-4 rounded-2xl font-medium flex items-center gap-3 shadow-lg shadow-violet-200">
              <BarChart3
                size={20}
              />
              View Results
            </button>
          </Link>

          {/* SHARE */}
          <button
            onClick={
              handleShare
            }
            className="border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition px-8 py-4 rounded-2xl font-medium flex items-center gap-3 text-gray-700"
          >
            <Share2
              size={20}
            />
            Share This Poll
          </button>
        </div>

        {/* BACK */}
        <Link
          to={`/p/${pollId}`}
          className="inline-block mt-10 text-violet-600 hover:text-violet-700 font-medium"
        >
          Submit Another
          Response
        </Link>
      </div>
    </div>
  );
}