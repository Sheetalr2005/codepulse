import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import { Rocket, ArrowRight } from "lucide-react";

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      {/* BACKGROUND */}

      <div className="absolute inset-0">
        {/* GRID */}

        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        {/* GLOW */}

        <div className="absolute top-[-180px] left-[20%] w-[500px] h-[500px] bg-purple-700/20 blur-[160px] rounded-full"></div>

        <div className="absolute bottom-[-180px] right-[10%] w-[500px] h-[500px] bg-blue-600/20 blur-[160px] rounded-full"></div>
      </div>

      {/* CONTENT */}

      <div className="relative z-10 max-w-[1400px] mx-auto px-8">
        {/* NAVBAR */}

        <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#030712]/70 border-b border-white/5">
          <div className="flex items-center justify-between py-6">
            {/* LOGO */}

            <div>
              <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">
                CodeIQ
              </h1>

              <p className="text-gray-500 mt-2">Smart Coding Interview Tracker</p>
            </div>

            {/* BUTTONS */}

            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="px-6 py-3 rounded-2xl border border-white/10 bg-white/[0.02] text-gray-300 hover:bg-white/[0.05] hover:text-white transition-all duration-300"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 font-semibold hover:shadow-[0_0_35px_rgba(139,92,246,0.35)] transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* HERO */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 items-center min-h-[88vh]">
          {/* LEFT */}

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
            className="relative"
          >
            {/* TITLE GLOW */}

            <div className="absolute top-[60px] left-[120px] w-[250px] h-[250px] bg-purple-600/20 blur-[120px] rounded-full"></div>

            <div className="relative z-10">
              {/* BADGE */}

              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] border border-white/10 mb-10">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

                <span className="text-gray-300">Track • Analyze • Improve</span>
              </div>

              {/* TITLE */}

              <h1 className="text-7xl xl:text-8xl font-black leading-[0.98] tracking-tight">
                Level Up
                <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Your Coding
                </span>
                Journey
              </h1>

              {/* DESC */}

              <p className="text-xl text-gray-400 mt-8 leading-relaxed max-w-[580px]">
                Organize coding problems, monitor interview preparation, track consistency, and
                analyze your DSA progress with a premium developer-focused dashboard.
              </p>

              {/* CTA */}

              <div className="flex flex-wrap items-center gap-5 mt-10">
                <Link
                  to="/signup"
                  className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-lg font-semibold hover:shadow-[0_0_40px_rgba(139,92,246,0.35)] transition-all duration-300 flex items-center gap-3"
                >
                  Start Tracking
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all duration-300" />
                </Link>

                <Link
                  to="/login"
                  className="px-8 py-4 rounded-2xl border border-white/10 bg-white/[0.03] text-lg hover:bg-white/[0.06] transition-all duration-300"
                >
                  Login
                </Link>
              </div>

              {/* TRUST TEXT */}

              <p className="text-sm text-gray-500 mt-5">
                Built for DSA preparation and coding interview mastery.
              </p>

              {/* STATS */}

              <div className="flex flex-wrap gap-12 mt-16">
                <div>
                  <h2 className="text-5xl font-black">500+</h2>

                  <p className="text-gray-500 text-sm mt-3">Problems Tracked</p>
                </div>

                <div>
                  <h2 className="text-5xl font-black">95%</h2>

                  <p className="text-gray-500 text-sm mt-3">Interview Readiness</p>
                </div>

                <div>
                  <h2 className="text-5xl font-black">24/7</h2>

                  <p className="text-gray-500 text-sm mt-3">Progress Monitoring</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative"
          >
            {/* FLOAT GLOW */}

            <div className="absolute inset-0 bg-purple-500/10 blur-[120px] rounded-full"></div>

            {/* DASHBOARD */}

            <div className="relative rounded-[40px] border border-white/10 bg-[#0b1120]/80 backdrop-blur-xl p-8 shadow-[0_0_60px_rgba(139,92,246,0.12)] overflow-hidden hover:-translate-y-1 transition-all duration-500">
              {/* GLOW */}

              <div className="absolute top-[-60px] right-[-60px] w-[220px] h-[220px] bg-purple-600/20 blur-[100px] rounded-full"></div>

              {/* TOP */}

              <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                  <h2 className="text-3xl font-bold">Dashboard</h2>

                  <p className="text-gray-400 mt-2">Smart Interview Analytics</p>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                  <Rocket className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* CARDS */}

              <div className="grid grid-cols-2 gap-5 mb-6 relative z-10">
                <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6">
                  <p className="text-gray-400 mb-3">Solved</p>

                  <h2 className="text-5xl font-black text-purple-400">124</h2>
                </div>

                <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6">
                  <p className="text-gray-400 mb-3">Streak</p>

                  <h2 className="text-5xl font-black text-green-400">18</h2>
                </div>
              </div>

              {/* PROGRESS */}

              <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 relative z-10">
                <div className="flex justify-between mb-4">
                  <p className="text-gray-400">Interview Readiness</p>

                  <p className="text-white font-semibold">78%</p>
                </div>

                <div className="w-full h-5 bg-[#111827] rounded-full overflow-hidden">
                  <div className="h-full w-[78%] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-[0_0_25px_rgba(139,92,246,0.7)]"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
