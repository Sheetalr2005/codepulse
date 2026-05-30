import { FaHome, FaPlus, FaCode, FaChartBar, FaFire, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/codeiq-logo.png";

function Sidebar() {
  const navigate = useNavigate();

  const username = localStorage.getItem("email")?.split("@")[0];

  const navItemStyle = `
    flex items-center gap-4
    px-5 py-4 rounded-2xl
    transition-all duration-300
    text-lg font-medium
    border border-transparent
  `;

  return (
    <div className="w-[350px] h-screen sticky top-0 bg-[#040B1A]/95 backdrop-blur-xl border-r border-white/5 px-6 py-7 flex flex-col relative overflow-hidden">
      {" "}
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
            <FaHome className="text-lg" />
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
            <FaPlus className="text-lg" />
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
            <FaCode className="text-lg" />
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
            <FaChartBar className="text-lg" />
            Analytics
          </NavLink>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="relative z-10 mt-auto">
        {/* KEEP GRINDING */}

        <div className="rounded-[30px] overflow-hidden relative border border-white/10 bg-gradient-to-br from-[#141B34] to-[#0B1120] p-6 shadow-[0_0_35px_rgba(139,92,246,0.12)]">
          {/* glow */}

          <div className="absolute bottom-[-50px] right-[-50px] w-[140px] h-[140px] bg-purple-600/30 blur-[80px] rounded-full"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-purple-300 font-bold text-2xl">Keep Grinding! 🚀</h3>

                <p className="text-gray-400 mt-3 leading-relaxed">
                  Consistency is the key to cracking interviews.
                </p>
              </div>

              <div className="w-20 h-20 rounded-full border border-purple-500/20 flex items-center justify-center bg-purple-500/10 shadow-[0_0_30px_rgba(139,92,246,0.35)]">
                <FaFire className="text-purple-400 text-3xl" />
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-2">Current Streak</p>

              <h2 className="text-5xl font-black text-purple-400">12 Days</h2>
            </div>
          </div>
        </div>

        {/* SETTINGS + LOGOUT */}

        <div className="mt-5 pt-5 border-t border-white/5 space-y-3">
          {" "}
          {/* LOGOUT */}
          <button
            onClick={() => {
              localStorage.clear();
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
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
