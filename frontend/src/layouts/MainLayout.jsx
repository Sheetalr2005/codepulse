import Sidebar from "./Sidebar";

function MainLayout({ children }) {
  const username =
    localStorage.getItem("email")?.split("@")[0] || "User";

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="lg:ml-[320px] min-h-screen relative">
        
        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden">
          
          {/* GRID */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

          {/* PURPLE GLOW */}
          <div className="absolute top-[-180px] left-[35%] w-[500px] h-[500px] bg-purple-700/20 blur-[160px] rounded-full" />

          {/* BLUE GLOW */}
          <div className="absolute bottom-[-200px] right-[-120px] w-[500px] h-[500px] bg-blue-600/20 blur-[160px] rounded-full" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-10 py-6">
          
          {/* TOP SECTION */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
            
            {/* LEFT */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">
                CodePulse
              </h1>

              <p className="text-gray-400 mt-2 text-sm lg:text-base">
                Smart Coding Interview Tracker
              </p>
            </div>

            {/* USER CARD */}
            <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl px-5 py-3 flex items-center gap-4 shadow-[0_0_40px_rgba(139,92,246,0.08)] w-fit">
              
              {/* AVATAR */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-lg font-bold text-white uppercase">
                {username.charAt(0)}
              </div>

              {/* INFO */}
              <div>
                <h2 className="text-white font-semibold capitalize">
                  {username}
                </h2>

                <p className="text-gray-400 text-sm">
                  {localStorage.getItem("email")}
                </p>
              </div>
            </div>
          </div>

          {/* PAGE CONTENT */}
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;