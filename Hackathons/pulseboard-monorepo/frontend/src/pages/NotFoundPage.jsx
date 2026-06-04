import { Rocket } from "lucide-react";

import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-6">
      {/* CARD */}
      <div className="w-full max-w-6xl bg-white rounded-4xl shadow-sm border border-gray-100 overflow-hidden">
        {/* TOP BORDER */}
        <div className="h-2 bg-linear-to-r from-violet-600 to-indigo-600" />

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-10 md:p-14">
          {/* LEFT */}
          <div>
            {/* 404 */}
            <h1 className="text-[120px] md:text-[160px] font-black leading-none bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              404
            </h1>

            {/* TITLE */}
            <h2 className="text-5xl font-bold text-gray-900 mt-2">
              Page Not Found
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-500 text-xl leading-relaxed mt-6 max-w-lg">
              The page you’re looking for doesn’t exist or
              may have been moved.
            </p>

            {/* BUTTON */}
            <Link to="/">
              <button className="mt-10 bg-violet-600 hover:bg-violet-700 transition text-white px-10 py-5 rounded-2xl font-medium text-lg shadow-lg shadow-violet-200">
                Go Home
              </button>
            </Link>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center">
            {/* GLOW */}
            <div className="absolute w-72 h-72 bg-violet-100 rounded-full blur-3xl opacity-50" />

            {/* ASTRONAUT CONTAINER */}
            <div className="relative">
              {/* STARS */}
              <div className="absolute top-0 left-0 w-4 h-4 bg-violet-400 rounded-full" />

              <div className="absolute top-10 right-0 w-3 h-3 bg-indigo-400 rounded-full" />

              <div className="absolute bottom-16 left-10 w-2 h-2 bg-violet-300 rounded-full" />

              <div className="absolute bottom-0 right-10 w-4 h-4 bg-indigo-300 rounded-full" />

              {/* ASTRONAUT */}
              <div className="w-80 h-80 rounded-full bg-violet-50 flex items-center justify-center border border-violet-100 shadow-inner">
                <div className="w-52 h-52 rounded-full bg-white border-10 border-violet-200 relative flex items-center justify-center shadow-lg rotate-12">
                  {/* HELMET */}
                  <div className="absolute top-10 w-28 h-20 rounded-full bg-linear-to-br from-indigo-900 to-violet-700 border-4 border-violet-200" />

                  {/* BODY */}
                  <div className="absolute bottom-12 w-24 h-28 rounded-[30px] bg-violet-100 border-4 border-violet-200" />

                  {/* LEFT ARM */}
                  <div className="absolute left-4 top-28 w-16 h-5 rounded-full bg-violet-200 rotate-[-30deg]" />

                  {/* RIGHT ARM */}
                  <div className="absolute right-4 top-28 w-16 h-5 rounded-full bg-violet-200 rotate-30" />

                  {/* LEFT LEG */}
                  <div className="absolute left-16 bottom-0 w-5 h-20 rounded-full bg-violet-200 rotate-15" />

                  {/* RIGHT LEG */}
                  <div className="absolute right-16 bottom-0 w-5 h-20 rounded-full bg-violet-200 rotate-[-15deg]" />

                  {/* CENTER ICON */}
                  <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
                    <Rocket
                      size={24}
                      className="text-violet-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}