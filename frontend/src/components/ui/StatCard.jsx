import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  color = "text-white",
  icon,
  subtitle,
  glow = "bg-purple-500",
  graphColor = "#8b5cf6",
  trend = [],
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.015,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
      }}
      className="
        group
        relative
        overflow-hidden

        rounded-[26px]
        lg:rounded-[30px]

        border
        border-white/10

        bg-gradient-to-br
        from-[#0f172a]
        via-[#0b1120]
        to-[#09111f]

        backdrop-blur-xl

        p-5
        sm:p-6

        shadow-[0_0_45px_rgba(139,92,246,0.08)]

        hover:border-white/15

        transition-all
        duration-500
      "
    >
      {/* BACKGROUND GLOW */}

      <div
        className={`
          absolute
          top-[-50px]
          right-[-50px]

          w-[180px]
          h-[180px]

          rounded-full
          blur-[100px]
          opacity-20

          ${glow}
        `}
      ></div>

      {/* HOVER OVERLAY */}

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white/[0.02]"></div>

      {/* CONTENT */}

      <div className="relative z-10">
        {/* TOP */}

        <div className="flex items-start justify-between gap-4 mb-7">
          {/* TEXT */}

          <div className="min-w-0">
            <p
              className="
                text-gray-400
                text-xs
                sm:text-sm

                font-medium

                mb-2
                sm:mb-3

                tracking-wide
              "
            >
              {title}
            </p>

            <h2
              className={`
                text-4xl
                sm:text-5xl

                font-black
                tracking-tight

                break-words

                ${color}
              `}
            >
              {value}
            </h2>
          </div>

          {/* ICON */}

          <div
            className="
              relative

              w-14
              h-14

              sm:w-16
              sm:h-16

              min-w-[56px]

              rounded-2xl

              border
              border-white/10

              flex
              items-center
              justify-center

              text-xl
              sm:text-2xl

              overflow-hidden
              backdrop-blur-xl
            "
            style={{
              background: "rgba(255,255,255,0.04)",
              boxShadow: `0 0 25px ${graphColor}40`,
              color: graphColor,
            }}
          >
            {/* INNER GLOW */}

            <div
              className="absolute inset-0 opacity-40"
              style={{
                background: `radial-gradient(circle at center, ${graphColor}40 0%, transparent 70%)`,
              }}
            ></div>

            {/* ICON */}

            <div className="relative z-10">
              {icon}
            </div>
          </div>
        </div>

        {/* SUBTITLE */}

        <p
          className="
            text-gray-500

            text-xs
            sm:text-sm

            leading-relaxed

            min-h-[40px]
          "
        >
          {subtitle}
        </p>

        {/* MINI BAR GRAPH */}

        <div
          className="
            mt-6
            sm:mt-7

            flex
            items-end

            gap-[5px]
            sm:gap-[7px]

            h-[48px]
            sm:h-[52px]
          "
        >
          {(trend.length
            ? trend
            : [25, 45, 35, 70, 55, 90, 65]
          ).map((height, i) => (
            <motion.div
              key={i}
              initial={{
                height: 0,
              }}
              animate={{
                height: `${height}%`,
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
              }}
              className="
                rounded-full

                w-[5px]
                sm:w-[6px]
              "
              style={{
                background: `linear-gradient(to top, ${graphColor}90, ${graphColor})`,
                boxShadow: `0 0 14px ${graphColor}`,
                minWidth: "5px",
              }}
            />
          ))}
        </div>
      </div>

      {/* BORDER */}

      <div className="absolute inset-0 rounded-[26px] lg:rounded-[30px] border border-white/0 group-hover:border-white/10 transition-all duration-500"></div>
    </motion.div>
  );
}

export default StatCard;