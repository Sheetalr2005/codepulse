import { useState } from "react";

import toast from "react-hot-toast";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

import { motion } from "framer-motion";

import { Activity, BarChart3, Flame, ShieldCheck } from "lucide-react";
import Input from "../components/ui/Input";

import Button from "../components/ui/Button";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",

    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");

      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "${import.meta.env.VITE_API_URL}/api/auth/login",

        formData,
      );

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("userId", response.data.userId);

      localStorage.setItem("email", response.data.email);

      localStorage.setItem("name", response.data.name);

      toast.success("Login successful 🚀");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white flex items-center justify-center px-6 py-10">
      {/* BACKGROUND */}

      <div className="absolute inset-0">
        {/* GRID */}

        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        {/* GLOW */}

        <div className="absolute top-[-150px] left-[15%] w-[450px] h-[450px] bg-purple-700/20 blur-[140px] rounded-full"></div>

        <div className="absolute bottom-[-150px] right-[10%] w-[450px] h-[450px] bg-blue-600/20 blur-[140px] rounded-full"></div>
      </div>

      {/* CONTENT */}

      <div className="relative z-10 w-full max-w-[1400px] grid grid-cols-1 xl:grid-cols-2 gap-16 items-start pt-10">
        {/* LEFT */}

        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="hidden xl:block"
        >
          {/* LOGO */}

          <div className="mb-10">
            <h1 className="text-7xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">
              CodePulse
            </h1>

            <p className="text-gray-400 text-xl mt-4 leading-relaxed max-w-[550px]">
              Smart coding interview tracker designed to help developers stay consistent, organized,
              and interview ready.
            </p>
          </div>

          {/* FEATURES */}

          <div className="space-y-6">
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-[-20px] right-[-20px] w-[100px] h-[100px] bg-purple-600/10 blur-[50px] rounded-full"></div>

              <div className="relative z-10 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Activity className="text-purple-400" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-3">Track Progress</h2>

                  <p className="text-gray-400 leading-relaxed">
                    Organize coding problems, monitor solved questions, and build coding
                    consistency.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-[-20px] right-[-20px] w-[100px] h-[100px] bg-blue-600/10 blur-[50px] rounded-full"></div>

              <div className="relative z-10 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <BarChart3 className="text-blue-400" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-3">Smart Analytics</h2>

                  <p className="text-gray-400 leading-relaxed">
                    Analyze performance, coding streaks, and interview readiness.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* MINI STATS */}

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-center">
              <h2 className="text-3xl font-black text-purple-400">450+</h2>

              <p className="text-gray-500 text-sm mt-2">Problems</p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-center">
              <h2 className="text-3xl font-black text-blue-400">92%</h2>

              <p className="text-gray-500 text-sm mt-2">Readiness</p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-center">
              <h2 className="text-3xl font-black text-green-400">30+</h2>

              <p className="text-gray-500 text-sm mt-2">Streak</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#0b1120]/80 backdrop-blur-xl p-8 md:p-12 shadow-[0_0_60px_rgba(139,92,246,0.12)] max-w-xl w-full mx-auto"
        >
          {/* GLOW */}

          <div className="absolute top-[-50px] right-[-50px] w-[220px] h-[220px] bg-purple-600/20 blur-[100px] rounded-full"></div>

          {/* CONTENT */}

          <div className="relative z-10">
            {/* HEADER */}

            <div className="mb-10">
              <h1 className="text-5xl font-black tracking-tight mb-4">Welcome Back </h1>

              <p className="text-gray-400 text-lg leading-relaxed">
                Login to continue your coding journey.
              </p>
            </div>

            {/* FORM */}

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();

                handleLogin();
              }}
            >
              {/* EMAIL */}

              <div>
                <label className="block text-gray-300 mb-3">Email Address</label>

                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* PASSWORD */}

              <div>
                <label className="block text-gray-300 mb-3">Password</label>

                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* BUTTON */}

              <Button type="submit" loading={loading} className="w-full mt-4">
                Login
              </Button>
            </form>

            {/* FOOTER */}

            <p className="text-gray-400 mt-8 text-center text-lg">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-400 hover:text-purple-300 transition-all duration-300 font-semibold"
              >
                Create Account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
