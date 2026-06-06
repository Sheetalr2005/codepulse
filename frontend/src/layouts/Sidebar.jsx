import { FaHome, FaPlus, FaCode, FaChartBar, FaSignOutAlt } from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Sidebar() {
  const navigate = useNavigate();

  const username = localStorage.getItem("email")?.split("@")[0];
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const currentStreak = parseInt(localStorage.getItem("currentStreak")) || 0;

    console.log("LOCAL STORAGE STREAK =", localStorage.getItem("currentStreak"));

    setStreak(currentStreak);
  }, []);

  const navItemStyle = `
    flex items-center gap-4
    px-5 py-4 rounded-2xl
    transition-all duration-300
    text-base lg:text-lg font-medium
    border border-transparent
  `;

  return (
    <>
      {/* MOBILE TOP NAVBAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#040B1A]/95 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold">
            {"</>"}
          </div>

          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">
              CodePulse
            </h1>
          </div>
        </div>

        {/* USER */}
        <div className="text-sm text-gray-300 capitalize">{username}</div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div
        className="
hidden lg:flex
w-[320px]
h-screen
fixed
left-0
top-0
bg-[#040B1A]/95
backdrop-blur-xl
border-r
border-white/5
px-6
py-7
flex-col
z-[9999]
overflow-hidden
"
      >
        {/* SIDEBAR GLOW */}
        <div className="absolute top-[100px] left-[-120px] w-[260px] h-[260px] bg-purple-600/20 blur-[120px] rounded-full"></div>

        {/* TOP */}
        <div className="relative z-10">
          {/* LOGO */}
          <div className="flex items-center gap-4 mb-14">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-[0_0_35px_rgba(139,92,246,0.45)]">
              {"</>"}
            </div>

            <div>
              <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">
                CodePulse
              </h1>

              <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                Smart Coding Interview Tracker
              </p>
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="flex flex-col gap-3">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${navItemStyle}
                ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-[0_0_25px_rgba(139,92,246,0.35)]"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                }`
              }
            >
              <FaHome />
              Dashboard
            </NavLink>

            <NavLink
              to="/add-problem"
              className={({ isActive }) =>
                `${navItemStyle}
                ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-[0_0_25px_rgba(139,92,246,0.35)]"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                }`
              }
            >
              <FaPlus />
              Add Problem
            </NavLink>

            <NavLink
              to="/problems"
              className={({ isActive }) =>
                `${navItemStyle}
                ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-[0_0_25px_rgba(139,92,246,0.35)]"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                }`
              }
            >
              <FaCode />
              Problems
            </NavLink>

            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `${navItemStyle}
                ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-[0_0_25px_rgba(139,92,246,0.35)]"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                }`
              }
            >
              <FaChartBar />
              Analytics
            </NavLink>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="relative z-10 mt-auto">
          {/* MOTIVATION CARD */}
          <div className="rounded-[30px] overflow-hidden relative border border-white/10 bg-gradient-to-br from-[#141B34] to-[#0B1120] p-6 shadow-[0_0_35px_rgba(139,92,246,0.12)]">
            <div className="absolute bottom-[-50px] right-[-50px] w-[140px] h-[140px] bg-purple-600/30 blur-[80px] rounded-full"></div>

            <div className="relative z-10">
              <h3 className="text-purple-300 font-bold text-2xl">Keep Grinding! 🚀</h3>

              <p className="text-gray-400 mt-3 leading-relaxed">
                Consistency is the key to cracking interviews.
              </p>

              <div className="mt-6">
                <p className="text-gray-400 text-sm mb-2">Current Streak</p>

                <h2 className="text-5xl font-black text-purple-400">{streak} Days</h2>
              </div>
            </div>
          </div>

          {/* LOGOUT */}
          <div className="mt-5 pt-5 border-t border-white/5">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("email");
                localStorage.removeItem("userId");

                navigate("/login");
              }}
              className="
                w-full flex items-center gap-4
                px-5 py-4 rounded-2xl
                text-red-400 hover:text-red-300
                bg-red-500/5 hover:bg-red-500/10
                border border-red-500/10
                transition-all duration-300
                text-lg font-medium
              "
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      {/* MOBILE BOTTOM NAV */}
      <div
        className="
    lg:hidden
    fixed
    bottom-0
    left-0
    right-0
    z-[9999]
    bg-[#040B1A]/95
    backdrop-blur-xl
    border-t border-white/10
    flex justify-around
    py-3
    shadow-[0_-10px_30px_rgba(0,0,0,0.5)]
    pb-safe
  "
      >
        {" "}
        <NavLink to="/dashboard">
          {({ isActive }) => (
            <FaHome className={`text-2xl ${isActive ? "text-purple-400" : "text-gray-300"}`} />
          )}
        </NavLink>
        <NavLink to="/add-problem">
          {({ isActive }) => (
            <FaPlus className={`text-2xl ${isActive ? "text-purple-400" : "text-gray-300"}`} />
          )}
        </NavLink>
        <NavLink to="/problems">
          {({ isActive }) => (
            <FaCode className={`text-2xl ${isActive ? "text-purple-400" : "text-gray-300"}`} />
          )}
        </NavLink>
        <NavLink to="/analytics">
          {({ isActive }) => (
            <FaChartBar className={`text-2xl ${isActive ? "text-purple-400" : "text-gray-300"}`} />
          )}
        </NavLink>
      </div>
    </>
  );
}

export default Sidebar;
