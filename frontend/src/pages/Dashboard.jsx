import { useEffect, useState } from "react";

import axios from "axios";

import MainLayout from "../layouts/MainLayout";

import { motion } from "framer-motion";

import { Activity, BarChart3, BrainCircuit, Flame, Trophy, Code2 } from "lucide-react";

import StatCard from "../components/ui/StatCard";

import Card from "../components/ui/Card";

import Button from "../components/ui/Button";

function Dashboard() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/problems/user/${localStorage.getItem("userId")}`,
      );

      setProblems(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  // ANALYTICS

  const totalProblems = problems.length;

  const easyProblems = problems.filter((p) => p.difficulty === "Easy").length;

  const mediumProblems = problems.filter((p) => p.difficulty === "Medium").length;

  const hardProblems = problems.filter((p) => p.difficulty === "Hard").length;

  const solvedProblems = problems.filter((p) => p.solved === true).length;

  const solvedPercentage = totalProblems > 0 ? (solvedProblems / totalProblems) * 100 : 0;

  const solvedTrend = problems.slice(-7).map((problem, index) => {
    let score = 40;

    if (problem.solved) {
      score += 25 + index * 3;
    } else {
      score -= 15;
    }

    return Math.max(10, Math.min(score, 90));
  });

  const easyTrend = problems
    .filter((p) => p.difficulty === "Easy")
    .slice(-7)
    .map((problem, index) => {
      let score = 30 + index * 5;

      if (problem.solved) {
        score += 18;
      } else {
        score -= 8;
      }

      return Math.max(10, Math.min(score, 85));
    });

  const mediumTrend = problems
    .filter((p) => p.difficulty === "Medium")
    .slice(-7)
    .map((problem, index) => {
      let score = 45 - index * 2;

      if (problem.solved) {
        score += 12;
      } else {
        score -= 18;
      }

      return Math.max(10, Math.min(score, 85));
    });

  const hardTrend = problems
    .filter((p) => p.difficulty === "Hard")
    .slice(-7)
    .map((problem, index) => {
      let score = 25 + index * 6;

      if (problem.solved) {
        score += 22;
      } else {
        score -= 12;
      }

      return Math.max(10, Math.min(score, 95));
    });

  const totalTrend = problems.slice(-7).map((problem, index) => {
    let score = 35 + index * 4;

    if (problem.solved) {
      score += 15;
    } else {
      score -= 10;
    }

    return Math.max(10, Math.min(score, 90));
  });

  return (
    <MainLayout>
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="text-white"
      >
        {/* HERO */}

        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120]/80 backdrop-blur-xl p-7 mb-7">
          {/* GLOW */}

          <div className="absolute top-[-120px] left-[20%] w-[320px] h-[320px] bg-purple-600/20 blur-[120px] rounded-full"></div>

          <div className="absolute bottom-[-100px] right-[-80px] w-[280px] h-[280px] bg-blue-600/20 blur-[120px] rounded-full"></div>

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
            {/* LEFT */}

            <div>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] border border-white/10 mb-6">
                <Activity size={18} className="text-purple-400" />

                <span className="text-gray-300">Smart Interview Dashboard</span>
              </div>

              <h1 className="text-5xl xl:text-6xl font-black tracking-tight leading-[1]">
                {" "}
                Welcome
                <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Back
                </span>
              </h1>

              <p className="text-gray-400 mt-4 text-lg max-w-[620px] leading-relaxed">
                {" "}
                Track coding interview preparation, monitor consistency, improve DSA performance,
                and stay interview ready every day.
              </p>
            </div>

            {/* RIGHT */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
              }}
              className="relative w-[220px] h-[220px] flex items-center justify-center"
            >
              {/* OUTER */}
              <div className="absolute inset-0 rounded-full border-[14px] border-[#1e293b]"></div>
              {/* SVG */}
              <svg
                className="absolute inset-0 -rotate-90"
                width="220"
                height="220"
                viewBox="0 0 220 220"
              >
                {" "}
                <defs>
                  <linearGradient id="dashboardGradient">
                    <stop offset="0%" stopColor="#8b5cf6" />

                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <motion.circle
                  cx="110"
                  cy="110"
                  r="92"
                  fill="transparent"
                  stroke="url(#dashboardGradient)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={690}
                  initial={{
                    strokeDashoffset: 690,
                  }}
                  animate={{
                    strokeDashoffset: 690 - (690 * solvedPercentage) / 100,
                  }}
                  transition={{
                    duration: 1.6,
                  }}
                />
              </svg>
              {/* CENTER */}{" "}
              <div className="relative z-10 text-center">
                <p className="text-xs text-gray-400 mb-2 tracking-wide">Interview Readiness</p>

                <h1 className="text-5xl font-black leading-none text-white">
                  {Math.round(solvedPercentage)}%
                </h1>

                <p className="text-purple-400 mt-2 text-sm font-medium">Progress Score</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">
          <StatCard
            title="Total Problems"
            value={totalProblems}
            trend={totalTrend}
            subtitle="All tracked problems"
            icon={<BarChart3 size={26} />}
            glow="bg-purple-500"
            graphColor="#a855f7"
          />

          <StatCard
            title="Solved Problems"
            value={solvedProblems}
            trend={solvedTrend}
            color="text-green-400"
            subtitle={`${Math.round(solvedPercentage)}% solved`}
            icon={<Trophy size={26} />}
            glow="bg-green-500"
            graphColor="#22c55e"
          />

          <StatCard
            title="Easy Problems"
            value={easyProblems}
            trend={easyTrend}
            color="text-blue-400"
            subtitle="Strong fundamentals"
            icon={<Code2 size={26} />}
            glow="bg-blue-500"
            graphColor="#3b82f6"
          />

          <StatCard
            title="Medium Problems"
            value={mediumProblems}
            trend={mediumTrend}
            color="text-yellow-400"
            subtitle="Interview focused"
            icon={<BrainCircuit size={26} />}
            glow="bg-yellow-500"
            graphColor="#eab308"
          />

          <StatCard
            title="Hard Problems"
            value={hardProblems}
            trend={hardTrend}
            color="text-red-400"
            subtitle="Advanced preparation"
            icon={<Flame size={26} />}
            glow="bg-red-500"
            graphColor="#ef4444"
          />
        </div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
          {/* LEFT */}

          <div className="space-y-6">
            {/* RECENT PROBLEMS */}

            <Card className="overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Recent Problems</h2>

                  <p className="text-gray-400 mt-2">Latest coding activity</p>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Code2 className="text-purple-400" />
                </div>
              </div>

              {problems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                    <Code2 size={40} className="text-purple-400" />
                  </div>

                  <h2 className="text-3xl font-bold mb-3">No Problems Added</h2>

                  <p className="text-gray-400 mb-8">Start tracking your coding journey.</p>

                  <Button>Add Problem</Button>
                </div>
              ) : (
                <>
                  {/* SCROLL AREA */}

                  <div className="space-y-4 h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                    {" "}
                    {[...problems]
                      .reverse()
                      .slice(0, 7)
                      .map((problem) => (
                        <motion.div
                          key={problem.id}
                          whileHover={{
                            scale: 1.01,
                          }}
                          className="
                  bg-[#0f172a]/70
                  border
                  border-white/5
                  rounded-3xl
                  p-5
                  flex
                  items-center
                  justify-between
                  transition-all
                  duration-300
                  hover:border-purple-500/20
                  hover:shadow-[0_0_40px_rgba(139,92,246,0.12)]
                  backdrop-blur-xl
                "
                        >
                          {/* LEFT */}

                          <div>
                            <h3 className="text-xl font-semibold">{problem.title}</h3>

                            <p className="text-gray-400 mt-2">{problem.topic}</p>
                          </div>

                          {/* RIGHT */}

                          <div className="flex items-center gap-4">
                            {/* SOLVED */}

                            {/* SOLVED */}

                            <div
                              className={`
    w-7 h-7 rounded-xl
    flex items-center justify-center
    border transition-all duration-300

    ${
      problem.solved
        ? "bg-green-500/10 border-green-500/30 text-green-400"
        : "bg-[#0F172A]/80 border-white/10 text-gray-500"
    }
  `}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            {/* FAVORITE */}

                            {/* FAVORITE */}

                            <div
                              className={`
    w-7 h-7 rounded-xl
    flex items-center justify-center
    border transition-all duration-300

    ${
      problem.favorite
        ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
        : "bg-[#0F172A]/80 border-white/10 text-gray-500"
    }
  `}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill={problem.favorite ? "currentColor" : "none"}
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.386a.562.562 0 01-.84.61L12 17.77l-4.718 2.77a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557L3.34 10.385a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                />
                              </svg>
                            </div>
                            {/* DIFFICULTY */}

                            <span
                              className={`
                      px-4 py-2 rounded-2xl text-sm font-medium

                      ${
                        problem.difficulty === "Easy"
                          ? "bg-green-500/10 text-green-400"
                          : problem.difficulty === "Medium"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-red-500/10 text-red-400"
                      }
                    `}
                            >
                              {problem.difficulty}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                  </div>

                  {/* FIXED BUTTON */}

                  <div className="pt-6 flex justify-center">
                    <button
                      onClick={() => (window.location.href = "/problems")}
                      className="
              px-10 py-4
              rounded-2xl
              bg-gradient-to-r
              from-purple-600
              to-blue-500
              hover:scale-105
              transition-all
              duration-300
              text-white
              font-semibold
              text-lg
              shadow-[0_0_30px_rgba(139,92,246,0.35)]
            "
                    >
                      View More Problems →
                    </button>
                  </div>
                </>
              )}
            </Card>
          </div>

          {/* RIGHT */}

          <div className="space-y-6">
            {/* PROGRESS */}

            <Card className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120] shadow-[0_0_45px_rgba(59,130,246,0.12)]">
              {" "}
              <div className="absolute top-[-60px] right-[-60px] z-0 w-[180px] h-[180px] bg-blue-500/20 blur-[90px] rounded-full"></div>{" "}
              <div className="relative z-10 flex items-center justify-between mb-8">
                {" "}
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Progress</h2>

                  <p className="text-gray-400 mt-2">Coding consistency tracker</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Activity className="text-blue-400" />
                </div>
              </div>
              {/* BAR */}
              <div className="relative z-10 mb-8">
                {" "}
                <div className="flex justify-between mb-4">
                  <p className="text-gray-400">Solved Problems</p>

                  <p className="font-semibold text-white">
                    {solvedProblems}/{totalProblems}
                  </p>
                </div>
                <div className="w-full h-5 bg-[#111827] rounded-full overflow-hidden">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${solvedPercentage}%`,
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                    }}
                    className="relative h-full rounded-full bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 shadow-[0_0_35px_rgba(139,92,246,0.95)] overflow-hidden"
                  >
                    {/* SHINE */}

                    <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.35),transparent)] animate-pulse"></div>
                  </motion.div>
                </div>
              </div>
              {/* MINI STATS */}
              <div className="relative z-10 grid grid-cols-2 gap-4">
                {" "}
                <div className="rounded-3xl bg-[#0f172a]/80 border border-white/10 p-6 backdrop-blur-xl shadow-[0_0_25px_rgba(59,130,246,0.06)]">
                  <p className="text-gray-400 text-sm mb-2">Success Rate</p>

                  <h2 className="text-4xl font-bold text-purple-400">
                    {Math.round(solvedPercentage)}%
                  </h2>
                  <div className="mt-4 flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          delay: i * 0.15,
                        }}
                        className="h-[4px] flex-1 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl bg-[#0f172a]/80 border border-white/10 p-6 backdrop-blur-xl shadow-[0_0_25px_rgba(59,130,246,0.06)]">
                  <p className="text-gray-400 text-sm mb-2">Remaining</p>

                  <h2 className="text-4xl font-bold text-red-400">
                    {totalProblems - solvedProblems}
                  </h2>
                </div>
              </div>
            </Card>

            {/* MOTIVATION */}

            <Card className="relative overflow-hidden">
              <div className="absolute bottom-[-40px] right-[-40px] w-[180px] h-[180px] bg-purple-600/10 blur-[80px] rounded-full"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-[0_0_25px_rgba(139,92,246,0.35)]">
                    <Flame className="text-white" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">Daily Motivation</h2>

                    <p className="text-gray-400">Keep building momentum</p>
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-gray-300">
                  Consistency beats intensity. Solve at least one problem every day, and your
                  interview confidence will grow automatically.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
}

export default Dashboard;
