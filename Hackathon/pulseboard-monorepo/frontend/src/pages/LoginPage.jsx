import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, BarChart3, ShieldCheck, Activity } from "lucide-react";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

// FIXED: Removed direct service import and replaced with useAuth
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  // FIXED: Destructure login from context
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // FIXED: Call context login instead of direct service.
      // This ensures 'user' state is updated so ProtectedRoute doesn't block you.
      await login(formData.email, formData.password);

      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex overflow-hidden">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-1 relative flex-col justify-center px-20">
        {/* GLOW */}
        <div className="absolute top-25 left-25 w-87.5 h-87.5 bg-violet-600 opacity-20 blur-[120px]" />
        <div className="absolute bottom-25 right-25 w-87.5 h-87.5 bg-blue-500 opacity-20 blur-[120px]" />

        {/* CONTENT */}
        <div className="relative z-10">
          {/* LOGO */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-3 h-3 rounded-full bg-violet-500" />
            <h1 className="text-4xl font-bold">
              Pulse
              <span className="text-violet-400"> Board</span>
            </h1>
          </div>

          {/* HEADING */}
          <h2 className="text-6xl font-bold leading-tight max-w-xl">
            Welcome
            <span className="text-violet-400"> Back</span>
          </h2>

          <p className="text-gray-400 text-lg mt-8 max-w-lg leading-relaxed">
            Login to manage polls, monitor analytics, and collect feedback in
            real time.
          </p>

          {/* FEATURES */}
          <div className="space-y-5 mt-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center">
                <BarChart3 className="text-violet-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Live Poll Analytics</h3>
                <p className="text-gray-400 text-sm">Monitor results instantly.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <ShieldCheck className="text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Secure Authentication</h3>
                <p className="text-gray-400 text-sm">Enterprise-grade login system.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                <Activity className="text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Real-time Feedback</h3>
                <p className="text-gray-400 text-sm">Track responses live.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        {/* MOBILE LOGO */}
        <div className="absolute top-8 left-8 lg:hidden">
          <h1 className="text-3xl font-bold">
            Pulse<span className="text-violet-400"> Board</span>
          </h1>
        </div>

        {/* CARD */}
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* HEADING */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold">Login</h2>
            <p className="text-gray-400 mt-3">Login to your PulseBoard account.</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* REMEMBER */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400">
                <input type="checkbox" className="accent-violet-500" />
                Remember me
              </label>
              <button
                type="button"
                className="text-violet-400 hover:text-violet-300"
              >
                Forgot password?
              </button>
            </div>

            {/* SUBMIT */}
            <Button type="submit" className="w-full py-3 text-lg">
              {loading ? "Logging in..." : "Login"}
            </Button>

            {/* FOOTER */}
            <p className="text-center text-gray-400 mt-6">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-violet-400 hover:text-violet-300 font-medium"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}