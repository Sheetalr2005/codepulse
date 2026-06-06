import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Circle, Star } from "lucide-react";
import MainLayout from "../layouts/MainLayout";

import { motion, animate } from "framer-motion";
import { Activity, BarChart3, BrainCircuit, Flame, Trophy, Code2 } from "lucide-react";

import StatCard from "../components/ui/StatCard";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

function Dashboard() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetchProblems();
  }, []);
  const currentStreak = Number(localStorage.getItem("currentStreak")) || 0;

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

  // ANALYTICS

  const totalProblems = problems.length;

  const easyProblems = problems.filter((p) => p.difficulty === "Easy").length;

  const mediumProblems = problems.filter((p) => p.difficulty === "Medium").length;

  const hardProblems = problems.filter((p) => p.difficulty === "Hard").length;

  const solvedProblems = problems.filter((p) => p.solved === true).length;
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [animatedSolved, setAnimatedSolved] = useState(0);
  const [animatedEasy, setAnimatedEasy] = useState(0);
  const [animatedMedium, setAnimatedMedium] = useState(0);
  const [animatedHard, setAnimatedHard] = useState(0);
  const solvedPercentage = totalProblems > 0 ? (solvedProblems / totalProblems) * 100 : 0;
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const controls = animate(0, solvedPercentage, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        setAnimatedPercentage(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [solvedPercentage]);
  useEffect(() => {
    const a1 = animate(0, totalProblems, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => setAnimatedTotal(Math.round(v)),
    });

    const a2 = animate(0, solvedProblems, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => setAnimatedSolved(Math.round(v)),
    });

    const a3 = animate(0, easyProblems, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => setAnimatedEasy(Math.round(v)),
    });

    const a4 = animate(0, mediumProblems, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => setAnimatedMedium(Math.round(v)),
    });

    const a5 = animate(0, hardProblems, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => setAnimatedHard(Math.round(v)),
    });

    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
      a4.stop();
      a5.stop();
    };
  }, [totalProblems, solvedProblems, easyProblems, mediumProblems, hardProblems]);
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
  // RECENT PROBLEMS

  const recentProblems = [...problems].sort((a, b) => b.id - a.id).slice(0, 5);

  // TOPICS

  const topicCounts = {};

  problems.forEach((problem) => {
    topicCounts[problem.topic] = (topicCounts[problem.topic] || 0) + 1;
  });

  const topicData = Object.entries(topicCounts);

  // RECOMMENDATION

  let recommendationTitle = "Maintain Daily Streak";
  let recommendationText = "Consistency is more important than intensity.";

  if (hardProblems === 0 && totalProblems > 0) {
    recommendationTitle = "Try Hard Problems";
    recommendationText = "Start solving hard questions to improve interview readiness.";
  }

  if (solvedPercentage < 50) {
    recommendationTitle = "Solve More Problems";
    recommendationText = "Focus on increasing your solved count this week.";
  }
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

                <span className="text-gray-300">Smart Interview Dashboard</span>
              </div>

              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1]">
                Welcome
                <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Back
                </span>
              </h1>

              <p className="text-gray-400 mt-4 text-lg max-w-[620px] leading-relaxed">
                Track coding interview preparation, monitor consistency, improve DSA performance,
                and stay interview ready every day.
              </p>
            </div>

            {/* RIGHT */}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="
                relative
                w-[220px]
                h-[220px]
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
                    strokeDashoffset: 690 - (690 * solvedPercentage) / 100,
                  }}
                  transition={{ duration: 1.6 }}
                />
              </svg>

              <div className="relative z-10 text-center">
                <p className="text-xs text-gray-400 mb-2 tracking-wide">Interview Readiness</p>
                <h1 className="text-5xl font-black leading-none text-white">
                  {animatedPercentage}%
                </h1>

                <p className="text-purple-400 mt-2 text-sm font-medium">Progress Score</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6 mb-8">
          <StatCard
            title="Total Problems"
            value={animatedTotal}
            trend={totalTrend}
            subtitle="All tracked problems"
            icon={<BarChart3 size={26} />}
            glow="bg-purple-500"
            graphColor="#a855f7"
          />

          <StatCard
            title="Solved Problems"
            value={animatedSolved}
            trend={solvedTrend}
            color="text-green-400"
            subtitle={`${Math.round(solvedPercentage)}% solved`}
            icon={<Trophy size={26} />}
            glow="bg-green-500"
            graphColor="#22c55e"
          />

          <StatCard
            title="Easy Problems"
            value={animatedEasy}
            trend={easyTrend}
            color="text-blue-400"
            subtitle="Strong fundamentals"
            icon={<Code2 size={26} />}
            glow="bg-blue-500"
            graphColor="#3b82f6"
          />

          <StatCard
            title="Medium Problems"
            value={animatedMedium}
            trend={mediumTrend}
            color="text-yellow-400"
            subtitle="Interview focused"
            icon={<BrainCircuit size={26} />}
            glow="bg-yellow-500"
            graphColor="#eab308"
          />

          <StatCard
            title="Hard Problems"
            value={animatedHard}
            trend={hardTrend}
            color="text-red-400"
            subtitle="Advanced preparation"
            icon={<Flame size={26} />}
            glow="bg-red-500"
            graphColor="#ef4444"
          />
        </div>
        {/* DASHBOARD CONTENT */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          {" "}
          {/* LEFT SIDE */}
          <div className="xl:col-span-2">
            <Card className="bg-[#0f172a]/80 border border-white/10 p-6 rounded-3xl min-h-[320px]">
              {" "}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                {" "}
                <h2 className="text-3xl font-bold">Recent Problems</h2>
                <Button onClick={() => (window.location.href = "/problems")}>View All</Button>
              </div>
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
                {" "}
                {recentProblems.map((problem) => (
                  <div
                    key={problem.id}
                    className="
flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4
bg-white/5
p-4
rounded-2xl
border border-white/5
transition-all duration-300
hover:bg-white/10
hover:border-purple-500/30
hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]
hover:-translate-y-1
cursor-pointer
"
                  >
                    <div>
                      <h3 className="font-bold text-lg text-white">{problem.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className="
    px-2 py-1
    rounded-full
    text-xs
    bg-purple-500/10
    text-purple-300
    border border-purple-500/20
  "
                        >
                          {problem.topic}
                        </span>
                      </div>{" "}
                    </div>

                    <div className="flex items-center gap-3">
                      <Star
                        size={18}
                        className={
                          problem.favorite ? "text-yellow-400 fill-yellow-400" : "text-gray-500"
                        }
                      />

                      {problem.solved ? (
                        <CheckCircle size={20} className="text-green-400" />
                      ) : (
                        <Circle size={20} className="text-red-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-3">
            {" "}
            <Card className="bg-[#0f172a]/80 border border-white/10 rounded-3xl overflow-hidden relative">
              {" "}
              <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-purple-500/20 blur-3xl rounded-full" />
              <div className="p-3 relative z-10">
                <h2 className="text-xl sm:text-2xl  font-bold mb-6">Consistency Tracker</h2>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-gray-400 text-sm">Current Streak</p>

                      <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        {currentStreak}
                      </h1>

                      <p className="text-gray-400 text-sm">Days</p>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center text-3xl">
                      🔥
                    </div>
                  </div>

                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Weekly Goal</span>

                    <span className="font-semibold">{Math.min(solvedProblems, 7)} / 7</span>
                  </div>

                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 transition-all duration-1000"
                      style={{
                        width: `${Math.min((solvedProblems / 7) * 100, 100)}%`,
                      }}
                    />
                  </div>

                  <div className="mt-5 flex justify-between text-sm">
                    <span className="text-purple-300">🚀 Keep solving daily</span>

                    <span className="text-gray-400">{7 - Math.min(solvedProblems, 7)} left</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-[#0f172a]/80 border border-white/10 rounded-3xl overflow-hidden relative min-h-[260px]">
              {" "}
              <div className="absolute top-[-40px] right-[-40px] w-32 h-32 bg-purple-500/20 blur-3xl rounded-full" />
              <div className="absolute bottom-[-40px] left-[-40px] w-32 h-32 bg-blue-500/20 blur-3xl rounded-full" />
              <h2 className="text-xl sm:text-2xl  font-bold mb-5 relative z-10">
                Daily Motivation 🚀
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                    🎯
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-white">Placement Goal</h3>

                    <p className="text-sm text-gray-400">Stay focused on the process</p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  Consistency beats intensity. Every problem solved today brings you one step closer
                  to your dream placement.
                </p>

                <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-white/10">
                  <p className="text-purple-300 font-medium text-sm">✨ Today's Reminder</p>

                  <p className="text-gray-300 mt-2 text-sm">
                    Don't aim for perfection. Aim for consistency.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
}

export default Dashboard;
