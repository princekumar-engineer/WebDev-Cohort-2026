import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  Eye,
  EyeOff,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import { registerUser } from "../services/authService";

export default function RegisterPage() {
  const navigate =
    useNavigate();

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  const [formData,
    setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  // UPDATE FIELD
  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

      const response =
        await registerUser(
          formData
        );

        // SAVE TOKEN
        localStorage.setItem(
          "token",
          response.token
        );

        // SAVE USER
        localStorage.setItem(
          "user",
          JSON.stringify(
            response.user
          )
        );

        alert(
          "Registration Successful"
        );

        navigate(
          "/dashboard"
        );
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Registration failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex overflow-hidden">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-1 relative flex-col justify-center px-20">
        {/* Glow Effects */}
        <div className="absolute top-[-25] left-[-25] w-[87.5] h-[87.5] bg-violet-600 opacity-20 blur-[120px]" />

        <div className="absolute bottom-[-25] right-[-25] w-[87.5] h-[87.5] bg-blue-500 opacity-20 blur-[120px]" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-3 h-3 rounded-full bg-violet-500" />

            <h1 className="text-4xl font-bold">
              Pulse
              <span className="text-violet-400">
                Board
              </span>
            </h1>
          </div>

          <h2 className="text-6xl font-bold leading-tight max-w-xl">
            Create Your
            <span className="text-violet-400">
              {" "}
              Account
            </span>
          </h2>

          <p className="text-gray-400 text-lg mt-8 max-w-lg leading-relaxed">
            Join PulseBoard and start creating interactive polls,
            collecting responses, and analyzing insights in real time.
          </p>

          {/* Features */}
          <div className="space-y-5 mt-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center">
                <BarChart3 className="text-violet-400" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Real-time Analytics
                </h3>

                <p className="text-gray-400 text-sm">
                  Monitor poll performance instantly.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <ShieldCheck className="text-green-400" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Secure Platform
                </h3>

                <p className="text-gray-400 text-sm">
                  Safe and scalable infrastructure.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                <CheckCircle2 className="text-blue-400" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Easy Poll Creation
                </h3>

                <p className="text-gray-400 text-sm">
                  Build polls in minutes with no complexity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        {/* Mobile Logo */}
        <div className="absolute top-8 left-8 lg:hidden">
          <h1 className="text-3xl font-bold">
            Pulse
            <span className="text-violet-400">
              Board
            </span>
          </h1>
        </div>

        {/* Register Card */}
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold">
              Create Your Account
            </h2>

            <p className="text-gray-400 mt-3">
              Join PulseBoard and start creating polls
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >
            {/* NAME */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Full Name
              </label>

              <Input
                type="text"
                name="name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                placeholder="John Doe"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Email Address
              </label>

              <Input
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                placeholder="you@example.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Password
              </label>

              <div className="relative">
                <Input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 pr-12"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* TERMS */}
            <div className="flex items-start gap-3 text-sm text-gray-400">
              <input
                type="checkbox"
                required
                className="mt-1 accent-violet-500"
              />

              <p>
                I agree to the{" "}
                <span className="text-violet-400">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-violet-400">
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* SUBMIT */}
            <Button
              type="submit"
              className="w-full py-3 text-lg"
            >
              {loading
                ? "Creating..."
                : "Create Account"}
            </Button>

            {/* FOOTER */}
            <p className="text-center text-gray-400 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-violet-400 hover:text-violet-300 font-medium"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}