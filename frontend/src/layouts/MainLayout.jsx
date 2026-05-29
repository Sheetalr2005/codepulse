import Sidebar from "./Sidebar";

function MainLayout({ children }) {
  const username = localStorage.getItem("email")?.split("@")[0];

  return (
    <div className="flex h-screen bg-[#030712] text-white overflow-hidden">
      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div className="flex-1 relative overflow-y-auto">
        {/* GLOBAL BACKGROUND */}

        <div className="absolute inset-0 bg-[#030712]">
          {/* GRID */}

          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

          {/* PURPLE GLOW */}

          <div className="absolute top-[-180px] left-[35%] w-[500px] h-[500px] bg-purple-700/20 blur-[160px] rounded-full"></div>

          {/* BLUE GLOW */}

          <div className="absolute bottom-[-200px] right-[-120px] w-[500px] h-[500px] bg-blue-600/20 blur-[160px] rounded-full"></div>
        </div>

        {/* CONTENT */}

        <div className="relative z-10 max-w-[1600px] mx-auto px-8 py-7">
          {/* TOP BAR */}

          <div className="flex items-center justify-between mb-10">
            {/* LEFT */}

            <div>
              <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">
                CodePulse
              </h1>

              <p className="text-gray-400 mt-3 text-lg">Smart Coding Interview Tracker</p>
            </div>

            {/* USER PROFILE */}

            <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl px-5 py-3 flex items-center gap-4 shadow-[0_0_40px_rgba(139,92,246,0.08)] hover:shadow-[0_0_50px_rgba(139,92,246,0.12)] transition-all duration-300">
              {/* AVATAR */}

              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-lg font-bold text-white uppercase shadow-[0_0_25px_rgba(139,92,246,0.35)]">
                {username?.charAt(0)}
              </div>

              {/* USER INFO */}

              <div className="leading-tight">
                <h2 className="text-white font-semibold capitalize text-lg">{username}</h2>

                <p className="text-gray-400 text-sm">{localStorage.getItem("email")}</p>
              </div>
            </div>
          </div>

          {/* PAGE CONTENT */}

          <div className="pb-10">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
