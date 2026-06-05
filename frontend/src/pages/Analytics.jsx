import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/ui/StatCard";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function Analytics() {
  const navigate = useNavigate();

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

  const bestStreak = parseInt(localStorage.getItem("bestStreak")) || 0;
  const currentStreak = Number(localStorage.getItem("currentStreak")) || 0;
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

  const topicCounts = useMemo(() => {
    const counts = {};

    problems.forEach((problem) => {
      const topic = problem.topic || "Others";

      counts[topic] = (counts[topic] || 0) + 1;
    });

    return Object.entries(counts);
  }, [problems]);

  const maxTopicValue = Math.max(...topicCounts.map(([, count]) => count), 1);

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
      <div className="space-y-8">
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

            <div className="relative w-[220px] h-[220px]">
              <div className="absolute inset-0 rounded-full border-[12px] border-white/10"></div>

              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(
                    #3b82f6 ${successRate * 3.6}deg,
                    #8b5cf6 ${successRate * 3.6}deg,
                    rgba(255,255,255,0.08) 0deg
                  )`,
                }}
              />

              <div className="absolute inset-[22px] rounded-full bg-[#0f172a] flex flex-col items-center justify-center">
                <span className="text-gray-400 text-sm">Interview Readiness</span>

                <h2 className="text-5xl font-black text-white mt-2">{successRate}%</h2>

                <p className="text-purple-400 mt-2">Performance Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title="Total Problems"
            value={totalProblems}
            subtitle="All tracked problems"
            color="text-blue-400"
            glow="bg-blue-500"
            graphColor="#3b82f6"
            icon="📊"
          />

          <StatCard
            title="Solved"
            value={solvedProblems}
            subtitle="Problems completed"
            color="text-green-400"
            glow="bg-green-500"
            graphColor="#22c55e"
            icon="🏆"
          />

          <StatCard
            title="Favorites"
            value={favoriteProblems}
            subtitle="Saved for revision"
            color="text-yellow-400"
            glow="bg-yellow-500"
            graphColor="#facc15"
            icon="⭐"
          />

          <StatCard
            title="Success Rate"
            value={`${successRate}%`}
            subtitle="Overall performance"
            color="text-purple-400"
            glow="bg-purple-500"
            graphColor="#c084fc"
            icon="📈"
          />
        </div>

        {/* HEATMAP */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="bg-[#0f172a]/80 border border-white/10 rounded-[32px] p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-black text-white">Submission Heatmap</h2>

                <p className="text-gray-400 mt-2">Your coding activity</p>
              </div>

              <div className="text-3xl text-orange-400">🔥</div>
            </div>

            <div className="grid grid-cols-3 max-w-[500px] text-gray-500 text-sm mb-5">
              <span>Apr</span>
              <span className="text-center">May</span>
              <span className="text-right">Jun</span>
            </div>

            <div className="flex gap-10 items-start">
              {/* FIXED GRID */}

              <div className="grid grid-cols-10 gap-3">
                {heatmapData.map((count, i) => (
                  <div
                    key={i}
                    title={`Day ${i + 1} • ${count} solved`}
                    className={`w-4 h-4 rounded-md transition-all ${
                      count === 0
                        ? "bg-white/5"
                        : count === 1
                          ? "bg-green-400"
                          : count <= 3
                            ? "bg-green-500"
                            : count <= 5
                              ? "bg-green-600"
                              : "bg-green-700 shadow-[0_0_12px_rgba(74,222,128,0.8)]"
                    }`}
                  />
                ))}
              </div>

              {/* STREAK */}

              <div className="flex flex-col gap-6">
                <div className="bg-[#111827] border border-white/5 rounded-3xl p-6 w-full xl:w-[180px]">
                  <div className="text-2xl">🔥</div>

                  <p className="text-gray-400 text-sm mt-4">Current Streak</p>

                  <h3 className="text-5xl font-black text-orange-400 mt-2">{currentStreak}</h3>
                </div>

                <div className="bg-[#111827] border border-white/5 rounded-3xl p-6 w-full xl:w-[180px]">
                  <div className="text-2xl">🏆</div>

                  <p className="text-gray-400 text-sm mt-4">Best Streak</p>

                  <h3 className="text-5xl font-black text-purple-400 mt-2">{bestStreak}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* DIFFICULTY */}

          <div className="bg-[#0f172a]/80 border border-white/10 rounded-[32px] p-8">
            <h2 className="text-4xl font-black text-white mb-8">Difficulty Breakdown</h2>

            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={difficultyData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3 mt-4">
              {difficultyData.map((item) => (
                <div key={item.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                    <span className="text-white">{item.name}</span>
                  </div>

                  <span className="text-gray-300">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* TOPICS */}

          <div className="bg-[#0f172a]/80 border border-white/10 rounded-[32px] p-8">
            <h2 className="text-4xl font-black text-white mb-8">Problems by Topic</h2>

            {topicCounts.length > 0 ? (
              <div className="space-y-7">
                {topicCounts.map(([topic, count]) => (
                  <div key={topic}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white">{topic}</span>

                      <span className="text-purple-400">{count}</span>
                    </div>

                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                        style={{
                          width: `${(count / maxTopicValue) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-14">
                <h3 className="text-2xl font-bold text-white">No Topic Data Yet</h3>
              </div>
            )}
          </div>

          {/* RECOMMENDATIONS */}

          <div className="bg-[#0f172a]/80 border border-white/10 rounded-[32px] p-8">
            <h2 className="text-4xl font-black text-white mb-8">Recommended For You</h2>

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
    </MainLayout>
  );
}

export default Analytics;
