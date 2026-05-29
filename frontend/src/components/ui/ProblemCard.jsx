import { FaStar, FaCheckCircle, FaRegClock } from "react-icons/fa";

import { motion } from "framer-motion";

import Card from "./Card";

import Button from "./Button";

function ProblemCard({
  problem,

  setEditProblem,

  setDeleteId,
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
      }}
    >
      <Card className="relative overflow-hidden border border-white/10 bg-[#0b1120]/80 backdrop-blur-xl rounded-3xl p-6 hover:border-purple-500/20 hover:shadow-[0_0_35px_rgba(139,92,246,0.12)] transition-all duration-300">
        {/* GLOW */}

        <div className="absolute top-[-50px] right-[-50px] w-[160px] h-[160px] bg-purple-600/10 blur-[90px] rounded-full"></div>

        {/* CONTENT */}

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
          {/* LEFT */}

          <div className="flex items-start gap-5">
            {/* STATUS ICON */}

            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-lg

              ${
                problem.solved
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {problem.solved ? <FaCheckCircle /> : <FaRegClock />}
            </div>

            {/* TEXT */}

            <div>
              {/* TITLE */}

              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold text-white tracking-tight">{problem.title}</h2>

                {/* FAVORITE */}

                {problem.favorite && (
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <FaStar className="text-yellow-400" />
                  </div>
                )}
              </div>

              {/* TOPIC */}

              <p className="text-gray-400 mt-3 text-lg">{problem.topic}</p>

              {/* BADGES */}

              <div className="flex flex-wrap items-center gap-3 mt-5">
                {/* DIFFICULTY */}

                <span
                  className={`px-4 py-2 rounded-2xl text-sm font-medium

                  ${
                    problem.difficulty === "Easy"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : problem.difficulty === "Medium"
                        ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}
                >
                  {problem.difficulty}
                </span>

                {/* STATUS */}

                <span
                  className={`px-4 py-2 rounded-2xl text-sm font-medium

                  ${
                    problem.solved
                      ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                      : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                  }`}
                >
                  {problem.solved ? "Solved" : "Unsolved"}
                </span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-3 xl:self-end">
            <Button variant="secondary" onClick={() => setEditProblem(problem)}>
              Edit
            </Button>

            <Button variant="danger" onClick={() => setDeleteId(problem.id)}>
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default ProblemCard;
