import { useEffect, useState } from "react";
import axios from "axios";

import MainLayout from "../layouts/MainLayout";

import { motion } from "framer-motion";

import {
  Activity,
  BarChart3,
  BrainCircuit,
  Flame,
  Trophy,
  Code2,
} from "lucide-react";

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

  const easyProblems = problems.filter(
    (p) => p.difficulty === "Easy"
  ).length;

  const mediumProblems = problems.filter(
    (p) => p.difficulty === "Medium"
  ).length;

  const hardProblems = problems.filter(
    (p) => p.difficulty === "Hard"
  ).length;

  const solvedProblems = problems.filter(
    (p) => p.solved === true
  ).length;

  const solvedPercentage =
    totalProblems > 0
      ? (solvedProblems / totalProblems) * 100
      : 0;

  // TRENDS

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
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
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
            to-[#0b1120]/80
            backdrop-blur-xl

            p-5
            sm:p-6
            lg:p-7

            mb-7
          "
        >
          {/* GLOW */}

          <div className="absolute top-[-120px] left-[20%] w-[320px] h-[320px] bg-purple-600/20 blur-[120px] rounded-full"></div>

          <div className="absolute bottom-[-100px] right-[-80px] w-[280px] h-[280px] bg-blue-600/20 blur-[120px] rounded-full"></div>

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
            {/* LEFT */}

            <div>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] border border-white/10 mb-6">
                <Activity size={18} className="text-purple-400" />

                <span className="text-gray-300">
                  Smart Interview Dashboard
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1]">
                Welcome
                <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Back
                </span>
              </h1>

              <p className="text-gray-400 mt-4 text-lg max-w-[620px] leading-relaxed">
                Track coding interview preparation, monitor consistency,
                improve DSA performance, and stay interview ready every day.
              </p>
            </div>

            {/* RIGHT */}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
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
              <div className="absolute inset-0 rounded-full border-[14px] border-[#1e293b]"></div>

              <svg
                className="absolute inset-0 -rotate-90"
                width="220"
                height="220"
                viewBox="0 0 220 220"
              >
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
                  initial={{ strokeDashoffset: 690 }}
                  animate={{
                    strokeDashoffset:
                      690 - (690 * solvedPercentage) / 100,
                  }}
                  transition={{ duration: 1.6 }}
                />
              </svg>

              <div className="relative z-10 text-center">
                <p className="text-xs text-gray-400 mb-2 tracking-wide">
                  Interview Readiness
                </p>

                <h1 className="text-5xl font-black leading-none text-white">
                  {Math.round(solvedPercentage)}%
                </h1>

                <p className="text-purple-400 mt-2 text-sm font-medium">
                  Progress Score
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6 mb-8">
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
      </motion.div>
    </MainLayout>
  );
}

export default Dashboard;