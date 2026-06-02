import { useEffect, useState } from "react";
import axios from "axios";

import { motion } from "framer-motion";

import MainLayout from "../layouts/MainLayout";
import Card from "../components/ui/Card";
import StatCard from "../components/ui/StatCard";

import {
  Activity,
  Trophy,
  Star,
  Flame,
  BarChart3,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

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

      setProblems(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // STATS
  // =========================

  const totalProblems = problems.length;

  const solvedProblems = problems.filter(
    (p) => p.solved
  ).length;

  const favoriteProblems = problems.filter(
    (p) => p.favorite
  ).length;

  const easyProblems = problems.filter(
    (p) => p.difficulty === "Easy"
  ).length;

  const mediumProblems = problems.filter(
    (p) => p.difficulty === "Medium"
  ).length;

  const hardProblems = problems.filter(
    (p) => p.difficulty === "Hard"
  ).length;

  const successRate =
    totalProblems > 0
      ? (
          (solvedProblems /
            totalProblems) *
          100
        ).toFixed(1)
      : 0;

  // =========================
  // STREAK
  // =========================

  const solvedDates = problems
    .filter((p) => p.solvedDate)
    .map((p) => p.solvedDate)
    .sort();

  let currentStreak = 0;
  let bestStreak = 0;
  let streak = 0;

  for (
    let i = 0;
    i < solvedDates.length;
    i++
  ) {
    if (i === 0) {
      streak = 1;
    } else {
      const prev = new Date(
        solvedDates[i - 1]
      );

      const curr = new Date(
        solvedDates[i]
      );

      const diff =
        (curr - prev) /
        (1000 * 60 * 60 * 24);

      if (diff === 1) {
        streak++;
      } else if (diff > 1) {
        streak = 1;
      }
    }

    bestStreak = Math.max(
      bestStreak,
      streak
    );
  }

  currentStreak = streak;

  localStorage.setItem(
    "currentStreak",
    currentStreak
  );

  // =========================
  // PIE CHART
  // =========================

  const difficultyData = [
    {
      name: "Easy",
      value: easyProblems,
      color: "#22c55e",
    },
    {
      name: "Medium",
      value: mediumProblems,
      color: "#facc15",
    },
    {
      name: "Hard",
      value: hardProblems,
      color: "#ef4444",
    },
  ];

  // =========================
  // HEATMAP
  // =========================

  const today = new Date();

  const dates = [];

  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);

    d.setDate(today.getDate() - i);

    d.setHours(0, 0, 0, 0);

    dates.push(d);
  }

  const solveCountMap = {};

  problems.forEach((problem) => {
    if (problem.solvedDate) {
      const d = new Date(
        problem.solvedDate
      );

      const key = `${d.getFullYear()}-${String(
        d.getMonth() + 1
      ).padStart(2, "0")}-${String(
        d.getDate()
      ).padStart(2, "0")}`;

      solveCountMap[key] =
        (solveCountMap[key] || 0) + 1;
    }
  });

  const months = [
    "Mar",
    "Apr",
    "May",
  ];

  const weekdays = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  return (
    <MainLayout>
      <div className="text-white">
        
        {/* HERO */}

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
            duration: 0.4,
          }}
          className="relative overflow-hidden rounded-[38px] border border-white/10 bg-gradient-to-br from-[#131c2f] via-[#111827] to-[#0b1324] p-7 lg:p-10 mb-8"
        >
          
          <div className="absolute top-[-100px] left-[30%] w-[320px] h-[320px] bg-purple-600/20 blur-[120px] rounded-full"></div>

          <div className="absolute bottom-[-100px] right-[-80px] w-[280px] h-[280px] bg-blue-600/20 blur-[120px] rounded-full"></div>

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
            
            {/* LEFT */}

            <div>
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/[0.03] mb-7">
                
                <Activity
                  size={16}
                  className="text-purple-400"
                />

                <span className="text-gray-300 text-sm">
                  Advanced Coding Analytics
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight">
                Performance

                <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Insights
                </span>
              </h1>

              <p className="mt-6 text-gray-400 text-lg max-w-[700px] leading-relaxed">
                Monitor coding consistency,
                interview readiness, and
                performance analytics.
              </p>
            </div>

            {/* RIGHT */}

            <div className="relative w-[220px] h-[220px] flex items-center justify-center mx-auto xl:mx-0">
              
              <div className="absolute inset-0 rounded-full border-[14px] border-[#334155]"></div>

              <svg
                className="absolute inset-0 -rotate-90"
                viewBox="0 0 220 220"
              >
                <defs>
                  <linearGradient id="circleGradient">
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
                  stroke="url(#circleGradient)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={578}
                  initial={{
                    strokeDashoffset: 578,
                  }}
                  animate={{
                    strokeDashoffset:
                      578 -
                      (578 * successRate) /
                        100,
                  }}
                  transition={{
                    duration: 1.5,
                  }}
                />
              </svg>

              <div className="relative z-10 text-center">
                <p className="text-gray-400 text-sm mb-2">
                  Interview Readiness
                </p>

                <h1 className="text-5xl font-black">
                  {successRate}%
                </h1>

                <p className="text-purple-400 mt-2">
                  Performance Score
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          
          <StatCard
            title="Total Problems"
            value={totalProblems}
            subtitle="All tracked problems"
            icon={<BarChart3 size={24} />}
            glow="bg-blue-500"
            graphColor="#3b82f6"
            color="text-blue-400"
          />

          <StatCard
            title="Solved"
            value={solvedProblems}
            subtitle="Problems completed"
            icon={<Trophy size={24} />}
            glow="bg-green-500"
            graphColor="#22c55e"
            color="text-green-400"
          />

          <StatCard
            title="Favorites"
            value={favoriteProblems}
            subtitle="Saved for revision"
            icon={<Star size={24} />}
            glow="bg-yellow-500"
            graphColor="#facc15"
            color="text-yellow-400"
          />

          <StatCard
            title="Success Rate"
            value={`${successRate}%`}
            subtitle="Overall performance"
            icon={<Activity size={24} />}
            glow="bg-purple-500"
            graphColor="#a855f7"
            color="text-purple-400"
          />
        </div>

        {/* MIDDLE SECTION */}

        <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_0.7fr] gap-6">
          
          {/* HEATMAP */}

          <Card className="rounded-[30px] border border-white/10 bg-[#0f172a]/80 p-6 backdrop-blur-xl">
            
            <div className="flex items-center justify-between mb-6">
              
              <div>
                <h2 className="text-2xl font-bold">
                  Submission Heatmap
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  Your coding activity
                </p>
              </div>

              <Flame className="text-orange-400" />
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* LEFT */}

              <div className="flex-1 overflow-x-auto">
                
                <div className="min-w-[520px]">
                  
                  <div className="flex ml-14 mb-4 text-xs text-gray-500">
                    {months.map((month) => (
                      <div
                        key={month}
                        className="flex-1"
                      >
                        {month}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    
                    <div className="flex flex-col gap-2 mr-3 text-xs text-gray-500">
                      {weekdays.map((day) => (
                        <div
                          key={day}
                          className="h-4"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-flow-col grid-rows-7 gap-2">
                      {dates.map(
                        (
                          date,
                          index
                        ) => {
                          const key = `${date.getFullYear()}-${String(
                            date.getMonth() +
                              1
                          ).padStart(
                            2,
                            "0"
                          )}-${String(
                            date.getDate()
                          ).padStart(
                            2,
                            "0"
                          )}`;

                          const count =
                            solveCountMap[
                              key
                            ] || 0;

                          let bg =
                            "bg-[#1e293b]";

                          if (count >= 1)
                            bg =
                              "bg-green-700";

                          if (count >= 2)
                            bg =
                              "bg-green-500";

                          if (count >= 3)
                            bg =
                              "bg-green-400";

                          return (
                            <div
                              key={
                                index
                              }
                              className={`w-4 h-4 rounded-[4px] ${bg}`}
                            ></div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-5 text-xs text-gray-500">
                    
                    <span>
                      Less
                    </span>

                    <div className="flex gap-1">
                      
                      <div className="w-3 h-3 rounded bg-[#1e293b]"></div>

                      <div className="w-3 h-3 rounded bg-green-700"></div>

                      <div className="w-3 h-3 rounded bg-green-500"></div>

                      <div className="w-3 h-3 rounded bg-green-400"></div>
                    </div>

                    <span>
                      More
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT */}

              <div className="flex flex-row lg:flex-col gap-4 lg:w-[160px]">
                
                <Card className="flex-1 rounded-[22px] border border-white/10 bg-[#111827]/80 p-5">
                  
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                    
                    <Flame
                      size={18}
                      className="text-orange-400"
                    />
                  </div>

                  <p className="text-gray-400 text-xs">
                    Current
                    Streak
                  </p>

                  <h1 className="text-4xl font-black text-orange-400 mt-2">
                    {
                      currentStreak
                    }
                  </h1>

                  <p className="text-gray-500 text-xs mt-2">
                    Keep the
                    streak alive
                    🔥
                  </p>
                </Card>

                <Card className="flex-1 rounded-[22px] border border-white/10 bg-[#111827]/80 p-5">
                  
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                    
                    <Trophy
                      size={18}
                      className="text-purple-400"
                    />
                  </div>

                  <p className="text-gray-400 text-xs">
                    Best
                    Streak
                  </p>

                  <h1 className="text-4xl font-black text-purple-400 mt-2">
                    {
                      bestStreak
                    }
                  </h1>

                  <p className="text-gray-500 text-xs mt-2">
                    Personal
                    best
                    consistency
                  </p>
                </Card>
              </div>
            </div>
          </Card>

          {/* DONUT */}

          <Card className="rounded-[30px] border border-white/10 bg-[#0f172a]/80 p-6 backdrop-blur-xl">
            
            <div className="flex items-center justify-between mb-5">
              
              <div>
                <h2 className="text-2xl font-bold">
                  Difficulty Breakdown
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  Problem distribution
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                
                <BarChart3
                  size={18}
                  className="text-purple-400"
                />
              </div>
            </div>

            <div className="h-[280px]">
              
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={
                      difficultyData
                    }
                    dataKey="value"
                    innerRadius={65}
                    outerRadius={100}
                  >
                    {difficultyData.map(
                      (
                        entry,
                        index
                      ) => (
                        <Cell
                          key={index}
                          fill={
                            entry.color
                          }
                        />
                      )
                    )}
                  </Pie>

                  <text
                    x="50%"
                    y="47%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-white text-3xl font-bold"
                  >
                    {
                      totalProblems
                    }
                  </text>

                  <text
                    x="50%"
                    y="57%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-gray-400 text-sm"
                  >
                    Problems
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              
              {difficultyData.map(
                (item) => (
                  <div
                    key={item.name}
                    className="rounded-2xl border border-white/10 bg-[#111827]/60 p-3 text-center"
                  >
                    <div
                      className="w-3 h-3 rounded-full mx-auto mb-2"
                      style={{
                        background:
                          item.color,
                      }}
                    ></div>

                    <p className="text-xs text-gray-400">
                      {item.name}
                    </p>

                    <h3 className="text-lg font-bold mt-1">
                      {item.value}
                    </h3>
                  </div>
                )
              )}
            </div>
          </Card>
        </div>

        {/* BOTTOM SECTION */}

        <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_0.7fr] gap-6 mt-6">
          
          {/* TOPICS */}

          <Card className="rounded-[30px] border border-white/10 bg-[#0f172a]/80 p-6 backdrop-blur-xl">
            
            <div className="flex items-center justify-between mb-6">
              
              <div>
                <h2 className="text-2xl font-bold">
                  Problems by Topic
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  Your strongest DSA areas
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                
                <BarChart3
                  size={18}
                  className="text-purple-400"
                />
              </div>
            </div>

            <div className="space-y-5">
              
              {[
                {
                  name: "Arrays",
                  value: 4,
                },
                {
                  name: "Strings",
                  value: 1,
                },
                {
                  name: "Trees",
                  value: 2,
                },
                {
                  name: "Graphs",
                  value: 2,
                },
                {
                  name: "DP",
                  value: 2,
                },
              ].map(
                (
                  topic,
                  index
                ) => (
                  <div
                    key={index}
                  >
                    
                    <div className="flex items-center justify-between mb-2">
                      
                      <span className="text-sm font-medium">
                        {
                          topic.name
                        }
                      </span>

                      <span className="text-sm text-purple-400">
                        {
                          topic.value
                        }
                      </span>
                    </div>

                    <div className="w-full h-2 bg-[#1e293b] rounded-full overflow-hidden">
                      
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                        style={{
                          width: `${
                            topic.value *
                            20
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )
              )}
            </div>

            <button className="mt-8 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 py-4 font-semibold hover:opacity-90 transition">
              View More Problems →
            </button>
          </Card>

          {/* RECOMMENDATIONS */}

          <Card className="rounded-[30px] border border-white/10 bg-[#0f172a]/80 p-6 backdrop-blur-xl">
            
            <div className="flex items-center justify-between mb-6">
              
              <div>
                <h2 className="text-2xl font-bold">
                  Recommended For You
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  Personalized coding insights
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                
                <Activity
                  size={18}
                  className="text-blue-400"
                />
              </div>
            </div>

            <div className="space-y-4">
              
              <div className="rounded-2xl border border-white/10 bg-[#111827] p-4">
                
                <h3 className="font-semibold text-purple-300">
                  Focus on Medium Problems
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  Medium difficulty problems improve interview readiness the fastest.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827] p-4">
                
                <h3 className="font-semibold text-green-300">
                  Maintain Daily Streak
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  Solving one problem daily builds long-term interview confidence.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827] p-4">
                
                <h3 className="font-semibold text-yellow-300">
                  Revise Favorite Problems
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  Revision improves retention and coding speed during interviews.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

export default Analytics;