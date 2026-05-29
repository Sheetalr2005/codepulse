import { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import { motion } from "framer-motion";

import { Activity, Flame, BrainCircuit, Target, Trophy, BarChart3 } from "lucide-react";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import Card from "../components/ui/Card";

import StatCard from "../components/ui/StatCard";

function Analytics() {
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

  const solvedProblems = problems.filter((problem) => problem.solved).length;

  const favoriteProblems = problems.filter((problem) => problem.favorite).length;

  const easyProblems = problems.filter((problem) => problem.difficulty === "Easy").length;

  const mediumProblems = problems.filter((problem) => problem.difficulty === "Medium").length;

  const hardProblems = problems.filter((problem) => problem.difficulty === "Hard").length;

  const successRate = totalProblems > 0 ? ((solvedProblems / totalProblems) * 100).toFixed(1) : 0;

  // DONUT CHART

  const difficultyData = [
    {
      name: "Easy",
      value: easyProblems,
      color: "#22c55e",
    },
    {
      name: "Medium",
      value: mediumProblems,
      color: "#eab308",
    },
    {
      name: "Hard",
      value: hardProblems,
      color: "#ef4444",
    },
  ];

  // STREAK

  const solvedDates = problems
    .filter((problem) => problem.solvedDate)
    .map((problem) => problem.solvedDate)
    .sort();

  let currentStreak = 0;

  let bestStreak = 0;

  let streak = 0;

  for (let i = 0; i < solvedDates.length; i++) {
    if (i === 0) {
      streak = 1;
    } else {
      const prev = new Date(solvedDates[i - 1]);

      const curr = new Date(solvedDates[i]);

      const diff = (curr - prev) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        streak++;
      } else if (diff > 1) {
        streak = 1;
      }
    }

    if (streak > bestStreak) {
      bestStreak = streak;
    }
  }

  currentStreak = streak;

  // HEATMAP

  const today = new Date();

  const dates = [];

  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);

    d.setDate(today.getDate() - i);

    d.setHours(0, 0, 0, 0);

    dates.push(d);
  }

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const getDayIndex = (date) => {
    const day = date.getDay();

    return day === 0 ? 6 : day - 1;
  };
  const solveCountMap = {};

  problems.forEach((problem) => {
    if (problem.solvedDate) {
      const d = new Date(problem.solvedDate);

      const localDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
        d.getDate(),
      ).padStart(2, "0")}`;
      solveCountMap[localDate] = (solveCountMap[localDate] || 0) + 1;
    }
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

  const solvedTrend = problems
    .filter((p) => p.solved)
    .slice(-7)
    .map((problem, index) => {
      let score = 40 + index * 5;

      if (problem.favorite) {
        score += 10;
      }

      return Math.max(15, Math.min(score, 95));
    });

  const favoriteTrend = problems
    .filter((p) => p.favorite)
    .slice(-7)
    .map((problem, index) => {
      let score = 25 + index * 6;

      if (problem.solved) {
        score += 12;
      } else {
        score -= 8;
      }

      return Math.max(10, Math.min(score, 85));
    });

  const successTrend = problems.slice(-7).map((problem, index) => {
    let score = 30 + index * 3;

    if (problem.solved) {
      score += 20;
    } else {
      score -= 15;
    }

    return Math.max(10, Math.min(score, 90));
  });
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
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

        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120] backdrop-blur-xl p-7 mb-7 shadow-[0_0_45px_rgba(139,92,246,0.08)]">
          <div className="absolute top-[-120px] left-[20%] w-[320px] h-[320px] bg-purple-600/20 blur-[120px] rounded-full"></div>

          <div className="absolute bottom-[-100px] right-[-80px] w-[280px] h-[280px] bg-blue-600/20 blur-[120px] rounded-full"></div>

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
            {/* LEFT */}

            <div>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] border border-white/10 mb-6">
                <Activity size={18} className="text-purple-400" />

                <span className="text-gray-300">Advanced Coding Analytics</span>
              </div>

              <h1 className="text-5xl xl:text-6xl font-black tracking-tight leading-[1]">
                Performance
                <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Insights
                </span>
              </h1>

              <p className="text-gray-400 mt-4 text-lg max-w-[620px] leading-relaxed">
                Monitor coding consistency, interview readiness, and performance analytics.
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
              <div className="absolute inset-0 rounded-full border-[14px] border-[#334155]"></div>

              <svg
                className="absolute inset-0 -rotate-90"
                width="220"
                height="220"
                viewBox="0 0 220 220"
              >
                <defs>
                  <linearGradient id="gradient">
                    <stop offset="0%" stopColor="#8b5cf6" />

                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>

                <motion.circle
                  cx="110"
                  cy="110"
                  r="92"
                  fill="transparent"
                  stroke="url(#gradient)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={690}
                  initial={{
                    strokeDashoffset: 690,
                  }}
                  animate={{
                    strokeDashoffset: 690 - (690 * successRate) / 100,
                  }}
                  transition={{
                    duration: 1.6,
                  }}
                />
              </svg>

              <div className="relative z-10 text-center">
                <p className="text-xs text-gray-400 mb-2">Interview Readiness</p>

                <h1 className="text-4xl font-black leading-none">{successRate}%</h1>

                <p className="text-purple-400 mt-2 text-sm">Performance Score</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Problems"
            value={totalProblems}
            trend={totalTrend}
            graphType="wave"
            subtitle="All tracked problems"
            icon={<BarChart3 size={24} />}
            glow="bg-blue-500"
            graphColor="#3b82f6"
            color="text-blue-400"
          />

          <StatCard
            title="Solved"
            value={solvedProblems}
            trend={solvedTrend}
            graphType="upward"
            color="text-green-400"
            subtitle="Problems completed"
            icon={<Trophy size={24} />}
            glow="bg-green-500"
            graphColor="#22c55e"
          />

          <StatCard
            title="Favorites"
            value={favoriteProblems}
            trend={favoriteTrend}
            graphType="pulse"
            color="text-yellow-400"
            subtitle="Saved for revision"
            icon={<Target size={24} />}
            glow="bg-yellow-500"
            graphColor="#eab308"
          />

          <StatCard
            title="Success Rate"
            value={`${successRate}%`}
            trend={successTrend}
            graphType="zigzag"
            color="text-purple-400"
            subtitle="Overall performance"
            icon={<Activity size={24} />}
            glow="bg-purple-500"
            graphColor="#a855f7"
          />
        </div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-[1.55fr_0.65fr] gap-6">
          {" "}
          {/* LEFT */}
          <div className="space-y-6">
            {/* HEATMAP */}

            <Card className="bg-gradient-to-br from-[#0f172a] to-[#111827] overflow-hidden min-h-[500px]">
              {" "}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Submission Heatmap</h2>

                  <p className="text-gray-400 mt-2">Your coding activity</p>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shadow-[0_0_25px_rgba(249,115,22,0.3)]">
                  <Flame className="text-orange-400" />
                </div>
              </div>
              <div className="grid grid-cols-[1.7fr_200px] gap-5">
                {" "}
                {/* LEFT */}
                <div>
                  {/* MONTHS */}

                  <div className="flex text-sm text-gray-400 mb-5 ml-[58px]">
                    {" "}
                    <div className="flex text-sm text-gray-400 mb-5 ml-[58px] gap-[120px]">
                      {" "}
                      {[...new Set(dates.map((d) => months[d.getMonth()]))]
                        .filter((month) => month !== "Feb")
                        .map((month) => (
                          <span key={month}>{month}</span>
                        ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {/* DAYS */}

                    <div className="flex flex-col justify-between h-[320px] text-xs text-gray-500 pt-[6px]">
                      {weekDays.map((day) => (
                        <span key={day}>{day}</span>
                      ))}
                    </div>

                    {/* BLOCKS */}

                    <div className="grid grid-flow-col grid-rows-7 gap-[7px] mt-4">
                      {" "}
                      {dates.map((date, index) => {
                        const formattedDate = `${date.getFullYear()}-${String(
                          date.getMonth() + 1,
                        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

                        const rowStart = getDayIndex(date) + 1;
                        const intensity = solveCountMap[formattedDate] || 0;
                        return (
                          <motion.div
                            key={index}
                            style={{
                              gridRowStart: rowStart,
                            }}
                            whileHover={{
                              scale: 1.12,
                            }}
                            className={`
w-8 h-8 rounded-[7px]
transition-all duration-300

${
  intensity === 0
    ? "bg-[#111827] border border-white/[0.04]"
    : intensity === 1
      ? "bg-green-700 shadow-[0_0_10px_rgba(34,197,94,0.45)]"
      : intensity === 3
        ? "bg-green-500 shadow-[0_0_16px_rgba(34,197,94,0.7)]"
        : "bg-green-400 shadow-[0_0_24px_rgba(34,197,94,1)] border border-green-300/20"
}
`}
                          ></motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* LEGEND */}

                  <div className="flex items-center justify-end gap-3 mt-7 text-xs text-gray-500">
                    <span>Less</span>

                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded bg-[#111827]"></div>

                      <div className="w-4 h-4 rounded bg-green-900"></div>

                      <div className="w-4 h-4 rounded bg-green-700"></div>

                      <div className="w-4 h-4 rounded bg-green-500"></div>

                      <div className="w-4 h-4 rounded bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                    </div>

                    <span>More</span>
                  </div>
                </div>
                {/* RIGHT */}
                <div className="flex flex-col gap-5">
                  {/* CURRENT */}

                  <div className="bg-gradient-to-br from-[#111827] to-[#0b1120] border border-orange-500/10 rounded-3xl p-5">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                        <Flame className="text-orange-400" />
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm">Current Streak</p>

                        <h2 className="text-5xl font-black leading-none text-orange-400">
                          {currentStreak}
                        </h2>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      Keep the streak alive 🔥
                    </p>
                  </div>

                  {/* BEST */}

                  <div className="bg-[#0b1120]/80 border border-purple-500/10 rounded-3xl p-5">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                        <Trophy className="text-purple-400" />
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm">Best Streak</p>

                        <h2 className="text-5xl font-black leading-none text-purple-400">
                          {bestStreak}
                        </h2>
                      </div>
                    </div>

                    <p className="text-gray-500 text-sm">Personal best consistency</p>
                  </div>
                </div>
              </div>
            </Card>
            {/* TOPICS */}

            <Card className="bg-gradient-to-br from-[#0f172a] to-[#111827] min-h-[500px]">
              {" "}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Problems by Topic</h2>

                  <p className="text-gray-400 mt-2">Your strongest DSA areas</p>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-[0_0_25px_rgba(139,92,246,0.3)]">
                  <BrainCircuit className="text-purple-400" />
                </div>
              </div>
              <div className="space-y-6 mt-8">
                {" "}
                {[
                  {
                    topic: "Arrays",
                    value: problems.filter((p) => p.topic === "Arrays").length,
                  },
                  {
                    topic: "Strings",
                    value: problems.filter((p) => p.topic === "Strings").length,
                  },
                  {
                    topic: "Trees",
                    value: problems.filter((p) => p.topic === "Trees").length,
                  },
                  {
                    topic: "Graphs",
                    value: problems.filter((p) => p.topic === "Graphs").length,
                  },
                  {
                    topic: "DP",
                    value: problems.filter((p) => p.topic === "Dynamic Programming").length,
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-5">
                    <div className="w-[150px]">
                      <p className="text-gray-200 text-lg font-semibold">{item.topic}</p>
                    </div>

                    <div className="flex-1">
                      <div className="w-full h-2 bg-[#111827] rounded-full overflow-hidden">
                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width: `${Math.min((item.value / totalProblems) * 100 || 0, 100)}%`,
                          }}
                          transition={{
                            duration: 1,
                            delay: index * 0.1,
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_14px_rgba(139,92,246,0.6)]"
                        />
                      </div>
                    </div>

                    <div className="w-[30px] text-right">
                      <p className="text-purple-400 text-lg font-bold">{item.value}</p>
                    </div>
                  </div>
                ))}
                {/* BUTTON */}
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
              </div>
            </Card>
          </div>
          <div className="space-y-6">
            {/* DONUT */}

            <Card className="bg-gradient-to-br from-[#0f172a] to-[#111827]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Difficulty Breakdown</h2>

                  <p className="text-gray-400 mt-2">Problem distribution</p>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-[0_0_25px_rgba(139,92,246,0.3)]">
                  <Target className="text-purple-400" />
                </div>
              </div>

              <div className="h-[320px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={difficultyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={105}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {difficultyData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          style={{
                            filter: `drop-shadow(0 0 10px ${entry.color})`,
                          }}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <h2 className="text-5xl font-black">{totalProblems}</h2>

                  <p className="text-gray-400 mt-2">Problems</p>
                </div>
              </div>

              {/* LEGEND */}

              <div className="grid grid-cols-3 gap-4 mt-2">
                {difficultyData.map((item) => (
                  <div
                    key={item.name}
                    className="bg-[#0f172a]/80 border border-white/5 rounded-2xl p-4 text-center"
                  >
                    <div
                      className="w-3 h-3 rounded-full mx-auto mb-3"
                      style={{
                        background: item.color,
                        boxShadow: `0 0 12px ${item.color}`,
                      }}
                    ></div>

                    <p className="text-gray-400 text-sm">{item.name}</p>

                    <h2
                      className="text-2xl font-bold mt-2"
                      style={{
                        color: item.color,
                      }}
                    >
                      {item.value}
                    </h2>
                  </div>
                ))}
              </div>
            </Card>
            {/* RIGHT SIDE */}
            <div className="space-y-3">
              {/* RECOMMENDATIONS */}

              <Card className="bg-gradient-to-br from-[#0f172a] to-[#111827]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">Recommended For You</h2>

                    <p className="text-gray-400 mt-2">Personalized coding insights</p>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                    <BrainCircuit className="text-blue-400" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-[#0b1120]/80 border border-purple-500/10 rounded-3xl p-4 hover:border-purple-500/20 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                        <Target className="text-purple-400" />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-1">Focus on Medium Problems</h3>

                        <p className="text-gray-400">
                          Medium difficulty problems improve interview readiness the fastest.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0b1120]/80 border border-green-500/10 rounded-3xl p-4 hover:border-green-500/20 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <Flame className="text-green-400" />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-1">Maintain Daily Streak</h3>

                        <p className="text-gray-400">
                          Solving one problem daily builds long-term interview confidence.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0b1120]/80 border border-yellow-500/10 rounded-3xl p-4 hover:border-yellow-500/20 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                        <Trophy className="text-yellow-400" />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-1">Revise Favorite Problems</h3>

                        <p className="text-gray-400">
                          Revision improves retention and coding speed during interviews.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            {/* RIGHT */}
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
}

export default Analytics;
