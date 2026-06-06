import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, Flame } from "lucide-react";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post("${import.meta.env.VITE_API_URL}/api/auth/signup", formData);

      toast.success("Account created successfully 🚀");

      navigate("/login");
    } catch (error) {
      console.log(error);

      if (error.response?.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white flex items-center justify-center px-6 py-10">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        <div className="absolute top-[-150px] left-[15%] w-full max-w-[450px] h-[450px] bg-purple-700/20 blur-[140px] rounded-full"></div>

        <div className="absolute bottom-[-150px] right-[10%] w-full max-w-[450px] h-[450px] bg-blue-600/20 blur-[140px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden xl:block"
        >
          <div className="mb-10">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">
              CodePulse
            </h1>

            <p className="text-gray-400 text-xl mt-4 leading-relaxed max-w-[550px]">
              Build coding consistency, track DSA progress, and become interview ready with smart
              analytics.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-[-20px] right-[-20px] w-[100px] h-[100px] bg-purple-600/10 blur-[50px] rounded-full"></div>

              <div className="relative z-10 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Activity className="text-purple-400" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-3">Smart Dashboard</h2>

                  <p className="text-gray-400 leading-relaxed">
                    Track coding problems, solved questions, and preparation journey.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-[-20px] right-[-20px] w-[100px] h-[100px] bg-orange-600/10 blur-[50px] rounded-full"></div>

              <div className="relative z-10 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <Flame className="text-orange-400" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-3">Streak Tracking</h2>

                  <p className="text-gray-400 leading-relaxed">
                    Stay consistent and build long coding streaks for interview preparation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#0b1120]/80 backdrop-blur-xl p-8 md:p-12 shadow-[0_0_60px_rgba(139,92,246,0.12)] max-w-2xl w-full mx-auto"
        >
          <div className="absolute top-[-50px] right-[-50px] w-[220px] h-[220px] bg-purple-600/20 blur-[100px] rounded-full"></div>

          <div className="relative z-10">
            <div className="mb-10">
              <h1 className="text-5xl font-black tracking-tight mb-4">Create Account</h1>

              <p className="text-gray-400 text-lg leading-relaxed">
                Start your coding interview journey today.
              </p>
            </div>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleSignup();
              }}
            >
              <div>
                <label className="block text-gray-300 mb-3">Full Name</label>

                <Input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

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

              <div>
                <label className="block text-gray-300 mb-3">Password</label>

                <Input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" loading={loading} className="w-full mt-4">
                Create Account
              </Button>
            </form>

            <p className="text-gray-400 mt-8 text-center text-lg">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-400 hover:text-purple-300 transition-all duration-300 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;
