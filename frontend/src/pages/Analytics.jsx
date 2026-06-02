import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import StatCard from "../components/ui/StatCard.jsx";

function Analytics() {
  const navigate = useNavigate();

  const problems = JSON.parse(localStorage.getItem("problems")) || [];

  const totalProblems = problems.length;

  const solvedProblems = problems.filter((p) => p.status === "Solved").length;

  const favoriteProblems = problems.filter((p) => p.favorite).length;

  const easyProblems = problems.filter((p) => p.difficulty === "Easy").length;

  const mediumProblems = problems.filter((p) => p.difficulty === "Medium").length;

  const hardProblems = problems.filter((p) => p.difficulty === "Hard").length;

  const successRate = totalProblems > 0 ? ((solvedProblems / totalProblems) * 100).toFixed(1) : 0;

  const streak = parseInt(localStorage.getItem("streak")) || 0;

  const bestStreak = parseInt(localStorage.getItem("bestStreak")) || 0;

  const months = Array.from({ length: 3 }, (_, i) => {
    const date = new Date();

    date.setMonth(date.getMonth() - (2 - i));

    return date.toLocaleString("default", {
      month: "short",
    });
  });

  const topicCounts = useMemo(() => {
    const counts = {};

    problems.forEach((problem) => {
      const topic = problem.topic || "Others";

      counts[topic] = (counts[topic] || 0) + 1;
    });

    return Object.entries(counts);
  }, [problems]);

  const maxTopicValue = Math.max(...topicCounts.map(([, count]) => count), 1);

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* HERO */}

        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-r from-[#111827] via-[#0f172a] to-[#071226] p-8 lg:p-12">
          <div className="absolute top-[-120px] left-[30%] w-[300px] h-[300px] bg-purple-500/20 blur-[120px] rounded-full"></div>

          <div className="absolute bottom-[-120px] right-[10%] w-[300px] h-[300px] bg-blue-500/20 blur-[120px] rounded-full"></div>

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
                Monitor coding consistency, interview readiness, and performance analytics.
              </p>
            </div>

            {/* SCORE */}

            <div className="relative w-[220px] h-[220px]">
              <div className="absolute inset-0 rounded-full border-[12px] border-white/10"></div>

              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(#3b82f6 ${successRate * 3.6}deg, #8b5cf6 ${
                    successRate * 3.6
                  }deg, rgba(255,255,255,0.08) 0deg)`,
                  borderRadius: "999px",
                }}
              ></div>

              <div className="absolute inset-[22px] rounded-full bg-[#0f172a] flex flex-col items-center justify-center">
                <span className="text-gray-400 text-sm">Interview Readiness</span>

                <h2 className="text-5xl font-black text-white mt-2">{successRate}%</h2>

                <p className="text-purple-400 mt-2">Performance Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* STAT CARDS */}

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

        {/* HEATMAP + DIFFICULTY */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* HEATMAP */}

          <div className="xl:col-span-2 bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-black text-white">Submission Heatmap</h2>

                <p className="text-gray-400 mt-2">Your coding activity</p>
              </div>

              <div className="text-3xl text-orange-400">🔥</div>
            </div>

            <div className="grid grid-cols-[auto_1fr_auto] gap-8">
              {/* LEFT */}

              <div className="space-y-3 mt-10 text-gray-500 text-sm">
                <p>Mon</p>
                <p>Tue</p>
                <p>Wed</p>
                <p>Thu</p>
                <p>Fri</p>
                <p>Sat</p>
                <p>Sun</p>
              </div>

              {/* GRID */}

              <div>
                <div className="flex justify-between text-gray-500 text-sm mb-5">
                  {months.map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>

                <div className="grid grid-cols-14 gap-2">
                  {Array.from({ length: 70 }).map((_, i) => {
                    const active = i > 70 - Math.min(streak + 1, 10);

                    return (
                      <div
                        key={i}
                        className={`w-5 h-5 rounded-md ${
                          active
                            ? "bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)]"
                            : "bg-white/5"
                        }`}
                      />
                    );
                  })}
                </div>

                <div className="flex items-center justify-end gap-3 mt-6 text-xs text-gray-500">
                  <span>Less</span>

                  <div className="flex gap-1">
                    <div className="w-4 h-4 rounded bg-white/10"></div>

                    <div className="w-4 h-4 rounded bg-green-900"></div>

                    <div className="w-4 h-4 rounded bg-green-600"></div>

                    <div className="w-4 h-4 rounded bg-green-400"></div>
                  </div>

                  <span>More</span>
                </div>
              </div>

              {/* RIGHT */}

              <div className="space-y-5">
                <div className="bg-[#111827] border border-white/5 rounded-3xl p-6 w-[150px]">
                  <div className="text-2xl">🔥</div>

                  <p className="text-gray-400 text-sm mt-4">Current Streak</p>

                  <h3 className="text-5xl font-black text-orange-400 mt-2">{streak}</h3>

                  <p className="text-gray-500 text-sm mt-2">Keep the streak alive 🔥</p>
                </div>

                <div className="bg-[#111827] border border-white/5 rounded-3xl p-6 w-[150px]">
                  <div className="text-2xl">🏆</div>

                  <p className="text-gray-400 text-sm mt-4">Best Streak</p>

                  <h3 className="text-5xl font-black text-purple-400 mt-2">{bestStreak}</h3>

                  <p className="text-gray-500 text-sm mt-2">Personal best consistency</p>
                </div>
              </div>
            </div>
          </div>

          {/* DONUT */}

          <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-black text-white">Difficulty Breakdown</h2>

                <p className="text-gray-400 mt-2">Problem distribution</p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                📊
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <div
                className="relative w-[190px] h-[190px] rounded-full"
                style={{
                  background: `conic-gradient(
                  #22c55e 0deg ${(easyProblems / Math.max(totalProblems, 1)) * 360}deg,
                  #facc15 ${(easyProblems / Math.max(totalProblems, 1)) * 360}deg ${
                    ((easyProblems + mediumProblems) / Math.max(totalProblems, 1)) * 360
                  }deg,
                  #ef4444 ${
                    ((easyProblems + mediumProblems) / Math.max(totalProblems, 1)) * 360
                  }deg 360deg
                )`,
                }}
              >
                <div className="absolute inset-[35px] rounded-full bg-[#0f172a] flex flex-col items-center justify-center">
                  <h3 className="text-5xl font-black text-white">{totalProblems}</h3>

                  <p className="text-gray-400">Problems</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="bg-[#111827] border border-white/5 rounded-2xl p-5 text-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mx-auto"></div>

                <p className="text-gray-400 mt-3">Easy</p>

                <h3 className="text-3xl font-black text-white mt-2">{easyProblems}</h3>
              </div>

              <div className="bg-[#111827] border border-white/5 rounded-2xl p-5 text-center">
                <div className="w-4 h-4 rounded-full bg-yellow-400 mx-auto"></div>

                <p className="text-gray-400 mt-3">Medium</p>

                <h3 className="text-3xl font-black text-white mt-2">{mediumProblems}</h3>
              </div>

              <div className="bg-[#111827] border border-white/5 rounded-2xl p-5 text-center">
                <div className="w-4 h-4 rounded-full bg-red-500 mx-auto"></div>

                <p className="text-gray-400 mt-3">Hard</p>

                <h3 className="text-3xl font-black text-white mt-2">{hardProblems}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* TOPICS */}

          <div className="xl:col-span-2 bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-black text-white">Problems by Topic</h2>

                <p className="text-gray-400 mt-2">Your strongest DSA areas</p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-xl">
                📊
              </div>
            </div>

            {topicCounts.length > 0 ? (
              <>
                <div className="space-y-7">
                  {topicCounts.map(([topic, count]) => (
                    <div key={topic}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-medium">{topic}</span>

                        <span className="text-purple-400 font-semibold">{count}</span>
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

                <button
                  onClick={() => navigate("/problems")}
                  className="mt-10 w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold text-lg hover:scale-[1.01] transition-all duration-300"
                >
                  View More Problems →
                </button>
              </>
            ) : (
              <div className="text-center py-14">
                <h3 className="text-2xl font-bold text-white">No Topic Data Yet</h3>

                <p className="text-gray-400 mt-3">Add problems to generate topic analytics.</p>
              </div>
            )}
          </div>

          {/* RECOMMENDATIONS */}

          <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-black text-white">Recommended For You</h2>

                <p className="text-gray-400 mt-2">Personalized coding insights</p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xl">
                📈
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-[#111827]/70 border border-white/5 rounded-3xl p-5">
                <h3 className="text-purple-300 text-2xl font-bold">Focus on Medium Problems</h3>

                <p className="text-gray-400 mt-3 leading-relaxed">
                  Medium difficulty problems improve interview readiness the fastest.
                </p>
              </div>

              <div className="bg-[#111827]/70 border border-white/5 rounded-3xl p-5">
                <h3 className="text-green-300 text-2xl font-bold">Maintain Daily Streak</h3>

                <p className="text-gray-400 mt-3 leading-relaxed">
                  Solving one problem daily builds long-term interview confidence.
                </p>
              </div>

              <div className="bg-[#111827]/70 border border-white/5 rounded-3xl p-5">
                <h3 className="text-yellow-300 text-2xl font-bold">Revise Favorite Problems</h3>

                <p className="text-gray-400 mt-3 leading-relaxed">
                  Revision improves retention and coding speed during interviews.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Analytics;
