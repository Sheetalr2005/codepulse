import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/ui/StatCard";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, animate } from "framer-motion";
import { Flame, Trophy, BarChart3, Star, Activity, BrainCircuit, Target } from "lucide-react";
function Analytics() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/problems/user/${localStorage.getItem("userId")}`,
      );

      setProblems(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // BASIC STATS
  // =========================

  const totalProblems = problems.length;

  const solvedProblems = problems.filter((p) => p.solved === true).length;

  const favoriteProblems = problems.filter((p) => p.favorite).length;

  const easyProblems = problems.filter((p) => p.difficulty === "Easy").length;

  const mediumProblems = problems.filter((p) => p.difficulty === "Medium").length;

  const hardProblems = problems.filter((p) => p.difficulty === "Hard").length;

  const difficultyData = [
    { name: "Easy", value: easyProblems, color: "#22c55e" },
    { name: "Medium", value: mediumProblems, color: "#eab308" },
    { name: "Hard", value: hardProblems, color: "#ef4444" },
  ].filter((item) => item.value > 0);

  const successRate = totalProblems > 0 ? ((solvedProblems / totalProblems) * 100).toFixed(0) : 0;
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const controls = animate(0, Number(successRate), {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        setAnimatedPercentage(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [successRate]);
  const bestStreak = parseInt(localStorage.getItem("bestStreak")) || 0;
  const currentStreak = Number(localStorage.getItem("currentStreak")) || 0;
  const today = new Date();

  const dates = [];
  const totalDays = window.innerWidth < 640 ? 56 : 90;

  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);

    dates.push(d);
  }
  const solveCountMap = {};

  problems.forEach((problem) => {
    if (problem.solvedDate) {
      solveCountMap[problem.solvedDate] = (solveCountMap[problem.solvedDate] || 0) + 1;
    }
  });
  // =========================
  // MONTHS
  // =========================

  const months = Array.from({ length: 3 }, (_, i) => {
    const date = new Date();

    date.setMonth(date.getMonth() - (2 - i));

    return date.toLocaleString("default", {
      month: "short",
    });
  });

  // =========================
  // TOPICS
  // =========================
  const allTopics = ["Arrays", "Strings", "Trees", "Graphs", "Dynamic Programming"];
  const topicCounts = useMemo(() => {
    const counts = {};

    problems.forEach((problem) => {
      const topic = problem.topic || "Others";

      counts[topic] = (counts[topic] || 0) + 1;
    });

    return Object.entries(counts);
  }, [problems]);

  const maxTopicValue = Math.max(...topicCounts.map(([, count]) => count), 1);
  const topicMap = {};

  topicCounts.forEach(([topic, count]) => {
    topicMap[topic] = count;
  });
  // =========================
  // HEATMAP
  // =========================

  const heatmapData = Array(70).fill(0);

  problems.forEach((problem) => {
    if (!problem.solvedDate) return;

    const date = new Date(problem.solvedDate + "T00:00:00");

    const daysAgo = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (daysAgo >= 0 && daysAgo < 70) {
      heatmapData[69 - daysAgo] += 1;
    }
  });

  // =========================
  // DYNAMIC RECOMMENDATIONS
  // =========================

  const recommendations = [];

  if (mediumProblems < easyProblems) {
    recommendations.push({
      title: "Focus on Medium Problems",
      text: "Medium problems improve interview readiness faster.",
      color: "text-purple-300",
    });
  }

  if (hardProblems === 0 && totalProblems > 3) {
    recommendations.push({
      title: "Start Solving Hard Problems",
      text: "Hard problems improve confidence for real interviews.",
      color: "text-red-300",
    });
  }

  if (currentStreak < 3) {
    recommendations.push({
      title: "Maintain Daily Streak",
      text: "Consistency is more important than intensity.",
      color: "text-green-300",
    });
  }

  if (favoriteProblems > 0) {
    recommendations.push({
      title: "Revise Favorite Problems",
      text: "Revising improves retention and speed.",
      color: "text-yellow-300",
    });
  }

  return (
    <MainLayout>
      <div className="space-y-8 pb-32 lg:pb-0">
        {" "}
        {/* HERO */}
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-r from-[#111827] via-[#0f172a] to-[#071226] p-8 lg:p-12">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-purple-300 text-sm mb-7">
                ⚡ Advanced Coding Analytics
              </div>

              <h1 className="text-5xl lg:text-7xl font-black leading-none">
                <span className="text-white">Performance</span>

                <br />

                <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  Insights
                </span>
              </h1>

              <p className="text-gray-400 text-lg mt-6 max-w-2xl leading-relaxed">
                Monitor coding consistency and interview readiness.
              </p>
            </div>

            {/* SCORE */}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="
    relative
    w-[220px]
    h-[220px]
    flex
    items-center
    justify-center
  "
            >
              <div className="absolute inset-0 rounded-full border-[14px] border-[#1e293b]"></div>

              <svg
                className="absolute inset-0 -rotate-90"
                width="220"
                height="220"
                viewBox="0 0 220 220"
              >
                <defs>
                  <linearGradient id="analyticsGradient">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>

                <motion.circle
                  cx="110"
                  cy="110"
                  r="92"
                  fill="transparent"
                  stroke="url(#analyticsGradient)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={690}
                  initial={{ strokeDashoffset: 690 }}
                  animate={{
                    strokeDashoffset: 690 - (690 * Number(successRate)) / 100,
                  }}
                  transition={{ duration: 1.6 }}
                />
              </svg>

              <div className="relative z-10 text-center">
                <p className="text-xs text-gray-400 mb-2 tracking-wide">Interview Readiness</p>

                <h1 className="text-5xl font-black leading-none text-white">
                  {animatedPercentage}%
                </h1>

                <p className="text-purple-400 mt-2 text-sm font-medium">Performance Score</p>
              </div>
            </motion.div>
          </div>
        </div>
        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StatCard
              title="Total Problems"
              value={totalProblems}
              subtitle="All tracked problems"
              color="text-blue-400"
              glow="bg-blue-500"
              graphColor="#3b82f6"
              icon={<BarChart3 size={24} />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StatCard
              title="Solved"
              value={solvedProblems}
              subtitle="Problems completed"
              color="text-green-400"
              glow="bg-green-500"
              graphColor="#22c55e"
              icon={<Trophy size={24} />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StatCard
              title="Favorites"
              value={favoriteProblems}
              subtitle="Saved for revision"
              color="text-yellow-400"
              glow="bg-yellow-500"
              graphColor="#facc15"
              icon={<Star size={24} />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StatCard
              title="Success Rate"
              value={`${successRate}%`}
              subtitle="Overall performance"
              color="text-purple-400"
              glow="bg-purple-500"
              graphColor="#c084fc"
              icon={<Activity size={24} />}
            />
          </motion.div>
        </div>
        {/* HEATMAP + DIFFICULTY */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_0.8fr] gap-6">
          {/* HEATMAP */}

          <div className="bg-[#0f172a]/80 border border-white/10 rounded-[32px] p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-4xl font-black text-white">Submission Heatmap</h2>

                <p className="text-gray-400 mt-2">Your coding activity</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <Flame className="text-orange-400" size={24} />
              </div>{" "}
            </div>

            {/* MONTHS */}
            <div className="hidden md:flex text-sm text-gray-500 mb-6 ml-[145px]">
              <span className="mr-[160px]">Apr</span>
              <span className="mr-[160px]">May</span>
              <span>Jun</span>
            </div>
            <div className="md:hidden flex justify-around text-xs text-gray-500 mb-4 ml-10">
              <span>May</span>
              <span>Jun</span>
            </div>
            <div className="flex  xl:flex-row items-start gap-6">
              {" "}
              {/* DAYS */}
              <div className="flex flex-col gap-[16px] sm:gap-[30px] text-xs text-gray-500 pt-[2px] mr-3">
                {" "}
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
              {/* GRID */}
              <div className="grid grid-flow-col grid-rows-7 gap-[9px] sm:gap-[8px] xl:gap-[10px]">
                {" "}
                {dates.map((date, index) => {
                  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

                  const intensity = solveCountMap[formattedDate] || 0;

                  const rowStart = date.getDay() === 0 ? 7 : date.getDay();

                  return (
                    <motion.div
                      key={index}
                      style={{
                        gridRowStart: rowStart,
                      }}
                      whileHover={{
                        scale: 1.15,
                      }}
                      className={`
            w-5 h-5 sm:w-5 sm:h-6 xl:w-11 xl:h-11 rounded-[7px]

              ${
                intensity === 0
                  ? "bg-[#111827] border border-white/[0.04]"
                  : intensity === 1
                    ? "bg-green-900"
                    : intensity === 2
                      ? "bg-green-700 shadow-[0_0_6px_rgba(34,197,94,0.35)]"
                      : intensity === 3
                        ? "bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]"
                        : intensity === 4
                          ? "bg-green-400 shadow-[0_0_18px_rgba(34,197,94,0.85)]"
                          : "bg-green-300 border border-green-200/20 shadow-[0_0_28px_rgba(34,197,94,1)]"
              }
            `}
                    />
                  );
                })}
              </div>
              {/* STREAK */}
              <div className="hidden xl:flex flex-col gap-5">
                {" "}
                <div className="bg-[#111827] border border-orange-500/10 rounded-3xl p-5 w-full xl:w-[170px]">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <Flame className="text-orange-400" size={22} />
                  </div>
                  <p className="text-gray-400 text-sm mt-3">Current Streak</p>

                  <h3 className="text-5xl font-black text-orange-400 mt-1">{currentStreak}</h3>

                  <p className="text-xs text-gray-500 mt-2">Keep the streak alive</p>
                </div>
                <div className="bg-[#111827] border border-purple-500/10 rounded-3xl p-5 w-full xl:w-[170px]">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <Trophy className="text-purple-400" size={22} />
                  </div>
                  <p className="text-gray-400 text-sm mt-3">Best Streak</p>

                  <h3 className="text-5xl font-black text-purple-400 mt-1">{bestStreak}</h3>

                  <p className="text-xs text-gray-500 mt-2">Personal best</p>
                </div>
              </div>
            </div>

            {/* LEGEND */}

            <div className="flex justify-end items-center gap-3 mt-8 text-xs text-gray-500">
              <span>Less</span>

              <div className="flex gap-1">
                <div className="w-4 h-4 rounded bg-[#111827]" />
                <div className="w-4 h-4 rounded bg-green-700" />
                <div className="w-4 h-4 rounded bg-green-500" />
                <div className="w-4 h-4 rounded bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
              </div>

              <span>More</span>
            </div>
          </div>

          {/* DIFFICULTY BREAKDOWN */}

          <div className="bg-[#0f172a]/80 border border-white/10 rounded-[32px] p-5 sm:p-8 overflow-hidden">
            {" "}
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-2">
              Difficulty Breakdown
            </h2>
            <p className="text-gray-400 mb-8">Problem distribution</p>
            <div className="relative h-[260px] sm:h-[300px] min-h-[260px] overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                {" "}
                <PieChart>
                  <Pie
                    data={difficultyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={105}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.color}
                        style={{
                          filter: `drop-shadow(0 0 12px ${entry.color})`,
                        }}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center">
                {" "}
                <h2 className="text-5xl font-black text-white">{totalProblems}</h2>
                <p className="text-gray-400 mt-2">Problems</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {difficultyData.map((item) => (
                <div key={item.name} className="bg-[#111827]/60 rounded-2xl p-4 text-center">
                  <div
                    className="w-3 h-3 rounded-full mx-auto mb-3"
                    style={{
                      background: item.color,
                      boxShadow: `0 0 10px ${item.color}`,
                    }}
                  />

                  <p className="text-gray-400 text-sm">{item.name}</p>

                  <h3
                    className="text-2xl font-bold mt-2"
                    style={{
                      color: item.color,
                    }}
                  >
                    {item.value}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_0.8fr] gap-6">
          {" "}
          {/* TOPICS */}
          <div className="bg-[#0f172a]/80 border border-white/10 rounded-[32px] p-8">
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-8">Problems by Topic</h2>

            {topicCounts.length > 0 ? (
              <div className="space-y-7">
                {allTopics.map((topic) => {
                  const count = topicMap[topic] || 0;

                  return (
                    <div key={topic}>
                      <div className="flex justify-between mb-2">
                        <span className="text-white">{topic}</span>

                        <span className={count > 0 ? "text-purple-400" : "text-gray-500"}>
                          {count}
                        </span>
                      </div>

                      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            count > 0
                              ? "bg-gradient-to-r from-purple-500 to-blue-500"
                              : "bg-white/10"
                          }`}
                          style={{
                            width: count > 0 ? `${(count / maxTopicValue) * 100}%` : "12%",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-14">
                <h3 className="text-2xl font-bold text-white">No Topic Data Yet</h3>
              </div>
            )}
          </div>
          {/* RECOMMENDATIONS */}
          <div className="bg-[#0f172a]/80 border border-white/10 rounded-[32px] p-8">
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-8">Recommended For You</h2>

            <div className="space-y-5">
              {recommendations.map((item, index) => (
                <div key={index} className="bg-[#111827]/70 border border-white/5 rounded-3xl p-5">
                  <h3 className={`${item.color} text-2xl font-bold`}>{item.title}</h3>

                  <p className="text-gray-400 mt-3 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-28 lg:hidden"></div>
    </MainLayout>
  );
}

export default Analytics;
