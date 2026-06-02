import Sidebar from "./Sidebar";

function MainLayout({ children }) {
  const username = localStorage.getItem("email")?.split("@")[0];

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div
        className="
          lg:ml-[320px]
          min-h-screen
          relative
          overflow-y-auto
        "
      >
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
        <div
          className="
            relative
            z-10
            max-w-[1600px]
            mx-auto

            px-4
            sm:px-6
            lg:px-8
            xl:px-10

            py-5
            sm:py-6
            lg:py-7

            pt-[90px]
            lg:pt-7
          "
        >
          {/* TOP BAR */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 lg:mb-10">
            {/* LEFT */}
            <div className="min-w-0">
              <h1
                className="
                  text-3xl
                  sm:text-4xl
                  lg:text-5xl
                  font-black
                  tracking-tight
                  leading-tight
                  bg-gradient-to-r
                  from-white
                  via-purple-200
                  to-purple-500
                  bg-clip-text
                  text-transparent
                  break-words
                "
              >
                CodePulse
              </h1>

              <p
                className="
                  text-gray-400
                  mt-2
                  sm:mt-3
                  text-sm
                  sm:text-base
                  lg:text-lg
                "
              >
                Smart Coding Interview Tracker
              </p>
            </div>

            {/* USER PROFILE */}
            <div
              className="
                w-full
                sm:w-auto

                bg-[#0f172a]/80
                backdrop-blur-xl
                border
                border-white/10
                rounded-3xl

                px-4
                sm:px-5
                py-3

                flex
                items-center
                gap-4

                shadow-[0_0_40px_rgba(139,92,246,0.08)]
              "
            >
              {/* AVATAR */}
              <div
                className="
                  w-11 h-11
                  sm:w-12 sm:h-12

                  rounded-full
                  bg-gradient-to-br
                  from-purple-600
                  to-blue-500

                  flex
                  items-center
                  justify-center

                  text-base
                  sm:text-lg

                  font-bold
                  text-white
                  uppercase

                  shadow-[0_0_25px_rgba(139,92,246,0.35)]
                "
              >
                {username?.charAt(0)}
              </div>

              {/* USER INFO */}
              <div className="leading-tight overflow-hidden">
                <h2
                  className="
                    text-white
                    font-semibold
                    capitalize

                    text-sm
                    sm:text-base
                    lg:text-lg

                    truncate
                    max-w-[180px]
                    sm:max-w-[240px]
                  "
                >
                  {username}
                </h2>

                <p
                  className="
                    text-gray-400
                    text-xs
                    sm:text-sm
                    truncate
                    max-w-[180px]
                    sm:max-w-[240px]
                  "
                >
                  {localStorage.getItem("email")}
                </p>
              </div>
            </div>
          </div>

          {/* PAGE CONTENT */}
          <div className="pb-8 sm:pb-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;