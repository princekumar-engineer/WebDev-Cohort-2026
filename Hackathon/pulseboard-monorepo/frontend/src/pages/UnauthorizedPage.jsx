import {
  ShieldAlert,
  LogIn,
  Home,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getUser,
} from "../utils/auth";

export default function UnauthorizedPage() {
  const navigate =
    useNavigate();

  const user =
    getUser();

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-6">
      {/* CARD */}
      <div className="w-full max-w-xl bg-white rounded-4xl shadow-sm border border-gray-100 p-10 md:p-14 text-center relative overflow-hidden">
        {/* TOP BORDER */}
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-violet-600 to-indigo-600" />

        {/* BACKGROUND GLOW */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-72 h-40 bg-violet-100 rounded-full blur-3xl opacity-50" />

        {/* ICON */}
        <div className="relative flex justify-center">
          <div className="w-36 h-36 rounded-full bg-violet-100 flex items-center justify-center">
            <div className="w-24 h-24 rounded-[28px] bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-xl">
              <ShieldAlert
                size={48}
                className="text-white"
              />
            </div>
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-5xl font-bold text-gray-900 mt-10">
          Access Denied
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-500 text-xl leading-relaxed mt-6 max-w-md mx-auto">
          You don’t have permission to access this page.
        </p>

        {/* USER INFO */}
        {!user && (
          <p className="text-sm text-red-500 mt-4">
            You must login first.
          </p>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12">
          {/* GO BACK */}
          <button
            onClick={() =>
              navigate(-1)
            }
            className="w-full sm:w-auto border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition px-10 py-4 rounded-2xl font-medium text-gray-700"
          >
            Go Back
          </button>

          {/* HOME */}
          <button
            onClick={() =>
              navigate("/")
            }
            className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 transition text-white px-10 py-4 rounded-2xl font-medium shadow-lg shadow-violet-200 flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Go Home
          </button>
        </div>

        {/* LOGIN BUTTON */}
        {!user && (
          <button
            onClick={() =>
              navigate(
                "/login"
              )
            }
            className="mt-6 w-full border border-violet-200 text-violet-600 hover:bg-violet-50 transition px-10 py-4 rounded-2xl font-medium flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            Login
          </button>
        )}
      </div>
    </div>
  );
}