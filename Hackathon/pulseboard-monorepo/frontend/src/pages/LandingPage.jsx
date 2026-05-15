import { Link } from "react-router-dom";

import {
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Rocket,
  Users,
  PieChart,
} from "lucide-react";

import Button from "../components/ui/Button";

const features = [
  {
    icon: <BarChart3 size={28} />,
    title: "Real-time Analytics",
    description:
      "Track responses instantly with beautiful live charts.",
  },
  {
    icon: <Users size={28} />,
    title: "Collect Responses",
    description:
      "Gather poll answers from teams, events, and customers.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Secure & Scalable",
    description:
      "Enterprise-grade architecture with secure authentication.",
  },
  {
    icon: <PieChart size={28} />,
    title: "Public Results",
    description:
      "Share interactive poll results with anyone instantly.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-37.5] left-[-25] w-[100] h-[100] bg-violet-600 opacity-20 blur-[120px]" />

      <div className="absolute bottom-[-37.5] right-[-25] w-[100] h-[100] bg-blue-500 opacity-20 blur-[120px]" />

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-violet-500" />
          <h1 className="text-3xl font-bold">
            Pulse<span className="text-violet-400">Board</span>
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <a href="#features" className="hover:text-white">
            Features
          </a>

          <a href="#how-it-works" className="hover:text-white">
            How it Works
          </a>

          <a href="#pricing" className="hover:text-white">
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <button className="text-gray-300 hover:text-white">
              Login
            </button>
          </Link>

          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-16 pb-24 grid lg:grid-cols-2 gap-14 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 mb-6 backdrop-blur-md">
            <Rocket size={16} className="text-violet-400" />

            <span className="text-sm text-gray-200">
              Full-Stack Polling & Feedback Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Instant Polls.
            <br />
            <span className="text-violet-400">
              Real-time Insights.
            </span>
          </h1>

          <p className="text-gray-400 text-lg mt-8 max-w-xl leading-relaxed">
            Create powerful polls, collect responses, analyze
            feedback live, and share public results with your
            audience in seconds.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 mt-10">
            <Link to="/register">
              <Button className="px-8 py-4 text-lg">
                Create a Poll
              </Button>
            </Link>

            <button className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
              View Demo
            </button>
          </div>

          {/* Benefits */}
          <div className="grid sm:grid-cols-2 gap-4 mt-12">
            {[
              "Create Powerful Polls",
              "Collect Responses",
              "Real-time Analytics",
              "Publish Results",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <CheckCircle2
                  className="text-green-400"
                  size={20}
                />

                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Hero Card */}
        <div className="relative">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-[#111827] rounded-2xl p-5">
                <div className="text-gray-400 text-sm">
                  Live Responses
                </div>

                <h2 className="text-4xl font-bold mt-3">
                  231
                </h2>

                <p className="text-green-400 mt-2 text-sm">
                  +12% this hour
                </p>
              </div>

              <div className="bg-[#111827] rounded-2xl p-5">
                <div className="text-gray-400 text-sm">
                  Active Polls
                </div>

                <h2 className="text-4xl font-bold mt-3">
                  12
                </h2>

                <p className="text-violet-400 mt-2 text-sm">
                  Running live
                </p>
              </div>
            </div>

            {/* Fake Chart */}
            <div className="mt-8 bg-[#111827] rounded-2xl p-6">
              <div className="flex justify-between mb-6">
                <h3 className="font-semibold">
                  Analytics Overview
                </h3>

                <span className="text-green-400 text-sm">
                  ● Live
                </span>
              </div>

              <div className="flex items-end gap-3 h-40">
                {[40, 65, 55, 90, 75, 120, 95].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="bg-linear-to-t from-violet-600 to-violet-400 rounded-md flex-1"
                      style={{ height }}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-6 -left-6 bg-violet-600 rounded-2xl p-5 shadow-xl">
            <p className="text-sm text-violet-100">
              Responses Today
            </p>

            <h2 className="text-3xl font-bold mt-2">
              +1,245
            </h2>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 max-w-7xl mx-auto px-8 pb-28"
      >
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">
            Everything You Need
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            PulseBoard helps teams, educators, and businesses
            collect valuable feedback effortlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-violet-500/40 transition duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center text-violet-400 mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-8 pb-24">
        <div className="max-w-5xl mx-auto bg-linear-to-r from-violet-600 to-indigo-600 rounded-[40px] p-14 text-center">
          <h2 className="text-5xl font-bold leading-tight">
            Start Creating Polls Today
          </h2>

          <p className="text-violet-100 text-lg mt-6 max-w-2xl mx-auto">
            Launch surveys, gather responses, and analyze
            insights in real-time with PulseBoard.
          </p>

          <Link to="/register">
            <button className="mt-10 bg-white text-violet-700 px-10 py-4 rounded-2xl font-semibold hover:scale-105 transition">
              Get Started Free
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}