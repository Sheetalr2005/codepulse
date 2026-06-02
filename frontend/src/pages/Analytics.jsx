import { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import { motion } from "framer-motion";

import {
  Activity,
  Flame,
  BrainCircuit,
  Target,
  Trophy,
  BarChart3,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

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
        `https://codepulse-backend-a9xg.onrender.com/api/problems/user/${localStorage.getItem(
          "userId"
        )}`
      );

      setProblems(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  // ANALYTICS

  const totalProblems = problems.length;

  const solvedProblems = problems.filter(
    (problem) => problem.solved
  ).length;

  const favoriteProblems = problems.filter(
    (problem) => problem.favorite
  ).length;

  const easyProblems = problems.filter(
    (problem) => problem.difficulty === "Easy"
  ).length;

  const mediumProblems = problems.filter(
    (problem) => problem.difficulty === "Medium"
  ).length;

  const hardProblems = problems.filter(
    (problem) => problem.difficulty === "Hard"
  ).length;

  const successRate =
    totalProblems > 0
      ? ((solvedProblems / totalProblems) * 100).toFixed(1)
      : 0;

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

      const diff =
        (curr - prev) / (1000 * 60 * 60 * 24);

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

  localStorage.setItem(
    "currentStreak",
    currentStreak
  );

  // HEATMAP

  const today = new Date();

  const dates = [];

  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);

    d.setDate(today.getDate() - i);

    d.setHours(0, 0, 0, 0);

    dates.push(d);
  }

  const weekDays = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  const getDayIndex = (date) => {
    const day = date.getDay();

    return day === 0 ? 6 : day - 1;
  };

  const solveCountMap = {};

  problems.forEach((problem) => {
    if (problem.solvedDate) {
      const d = new Date(problem.solvedDate);

      const localDate = `${d.getFullYear()}-${String(
        d.getMonth() + 1
      ).padStart(2, "0")}-${String(
        d.getDate()
      ).padStart(2, "0")}`;

      solveCountMap[localDate] =
        (solveCountMap[localDate] || 0) + 1;
    }
  });

  // TRENDS

  const totalTrend = problems
    .slice(-7)
    .map((problem, index) => {
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

  const successTrend = problems
    .slice(-7)
    .map((problem, index) => {
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

        <div
          className="
            relative overflow-hidden

            rounded-[30px] lg:rounded-[40px]

            border border-white/10

            bg-gradient-to-br
            from-[#0f172a]
            via-[#111827]
            to-[#0b1120]

            backdrop-blur-xl

            p-5
            sm:p-6
            lg:p-7

            mb-7

            shadow-[0_0_45px_rgba(139,92,246,0.08)]
          "
        >
          <div className="absolute top-[-120px] left-[20%] w-[320px] h-[320px] bg-purple-600/20 blur-[120px] rounded-full"></div>

          <div className="absolute bottom-[-100px] right-[-80px] w-[280px] h-[280px] bg-blue-600/20 blur-[120px] rounded-full"></div>

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
            {/* LEFT */}

            <div>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] border border-white/10 mb-6">
                <Activity
                  size={18}
                  className="text-purple-400"
                />

                <span className="text-gray-300">
                  Advanced Coding Analytics
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1]">
                Performance
                <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Insights
                </span>
              </h1>

              <p className="text-gray-400 mt-4 text-lg max-w-[620px] leading-relaxed">
                Monitor coding consistency,
                interview readiness, and
                performance analytics.
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
              className="
                relative

                w-[170px]
                h-[170px]

                sm:w-[220px]
                sm:h-[220px]

                mx-auto
                xl:mx-0

                flex
                items-center
                justify-center
              "
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
                    <stop
                      offset="0%"
                      stopColor="#8b5cf6"
                    />

                    <stop
                      offset="100%"
                      stopColor="#3b82f6"
                    />
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
                    strokeDashoffset:
                      690 -
                      (690 * successRate) / 100,
                  }}
                  transition={{
                    duration: 1.6,
                  }}
                />
              </svg>

              <div className="relative z-10 text-center">
                <p className="text-xs text-gray-400 mb-2">
                  Interview Readiness
                </p>

                <h1 className="text-4xl font-black leading-none">
                  {successRate}%
                </h1>

                <p className="text-purple-400 mt-2 text-sm">
                  Performance Score
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-6 mb-8">
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
      </motion.div>
    </MainLayout>
  );
}

export default Analytics;