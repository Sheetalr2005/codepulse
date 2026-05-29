import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import MainLayout from "../layouts/MainLayout";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Card from "../components/ui/Card";
import { useNavigate } from "react-router-dom";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function Problems() {
  const [problems, setProblems] = useState([]);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("All");

  const [sortOrder, setSortOrder] = useState("Latest");

  const [editProblem, setEditProblem] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const fetchProblems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/problems/user/${localStorage.getItem("userId")}`,
      );

      setProblems(response.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch problems");
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const deleteProblem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/problems/${id}`);

      fetchProblems();

      toast.success("Problem deleted");
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  const updateProblem = async () => {
    try {
      await axios.put(`http://localhost:8080/api/problems/${editProblem.id}`, editProblem);

      setEditProblem(null);

      fetchProblems();

      toast.success("Problem updated");
    } catch (error) {
      console.log(error);

      toast.error("Update failed");
    }
  };

  // FILTER + SORT

  const filteredProblems = [...problems]
    .filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(search.toLowerCase()) ||
        problem.topic.toLowerCase().includes(search.toLowerCase());

      const matchesDifficulty =
        difficultyFilter === "All" ? true : problem.difficulty === difficultyFilter;

      const matchesStatus =
        statusFilter === "All"
          ? true
          : statusFilter === "Favorite"
            ? problem.favorite === true
            : statusFilter === "Solved"
              ? problem.solved === true
              : problem.solved === false;

      return matchesSearch && matchesDifficulty && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === "Latest") {
        return b.id - a.id;
      }

      if (sortOrder === "Oldest") {
        return a.id - b.id;
      }

      if (sortOrder === "A-Z") {
        return a.title.localeCompare(b.title);
      }

      if (sortOrder === "Z-A") {
        return b.title.localeCompare(a.title);
      }

      return 0;
    });

  return (
    <MainLayout>
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="text-white"
      >
        {/* HEADER */}

        <div className="mb-10">
          <h1 className="text-6xl font-black tracking-tight">
            Problem
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Tracker
            </span>
          </h1>

          <p className="text-gray-400 mt-5 text-xl max-w-[700px] leading-relaxed">
            Organize coding problems, monitor preparation progress, and stay interview ready with
            structured tracking.
          </p>
        </div>

        {/* FILTERS */}

        <div className="bg-[#0b1120]/70 border border-white/10 backdrop-blur-xl rounded-[32px] p-5 flex flex-col lg:flex-row gap-4 mb-10">
          {/* SEARCH */}

          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search Problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* DIFFICULTY */}

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-400 font-medium">Difficulty</p>

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="
                bg-[#111827]/90
                border
                border-white/10
                rounded-2xl
                px-5
                py-3
                text-white
                outline-none
                focus:border-purple-500/40
                focus:shadow-[0_0_20px_rgba(139,92,246,0.2)]
                transition-all
                duration-300
                backdrop-blur-xl
                hover:border-purple-500/20
              "
            >
              <option>All</option>

              <option>Easy</option>

              <option>Medium</option>

              <option>Hard</option>
            </select>
          </div>

          {/* STATUS */}

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-400 font-medium">Status</p>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="
                bg-[#111827]/90
                border
                border-white/10
                rounded-2xl
                px-5
                py-3
                text-white
                outline-none
                focus:border-purple-500/40
                focus:shadow-[0_0_20px_rgba(139,92,246,0.2)]
                transition-all
                duration-300
                backdrop-blur-xl
                hover:border-purple-500/20
              "
            >
              <option>All</option>

              <option>Favorite</option>

              <option>Solved</option>

              <option>Unsolved</option>
            </select>
          </div>

          {/* SORT */}

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-400 font-medium">Sort By</p>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="
                bg-[#111827]/90
                border
                border-white/10
                rounded-2xl
                px-5
                py-3
                text-white
                outline-none
                focus:border-purple-500/40
                focus:shadow-[0_0_20px_rgba(139,92,246,0.2)]
                transition-all
                duration-300
                backdrop-blur-xl
                hover:border-purple-500/20
              "
            >
              <option>Latest</option>

              <option>Oldest</option>

              <option>A-Z</option>

              <option>Z-A</option>
            </select>
          </div>
        </div>

        {/* PROBLEMS */}

        <div className="space-y-4 overflow-x-auto">
          {filteredProblems.length === 0 ? (
            <Card className="flex flex-col items-center justify-center text-center py-20">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                }}
                className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-[0_0_35px_rgba(139,92,246,0.35)] mb-8"
              >
                <FaStar className="text-white text-4xl" />
              </motion.div>

              <h2 className="text-3xl font-bold text-white mb-3">No Problems Yet</h2>

              <p className="text-gray-400 mb-8">Start tracking your coding journey.</p>

              <Button onClick={() => navigate("/add-problem")}>Add First Problem</Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
              {filteredProblems.map((problem) => (
                <motion.div
                  key={problem.id}
                  whileHover={{
                    y: -6,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                  }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1120]/80 backdrop-blur-xl p-6 transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_45px_rgba(139,92,246,0.14)] min-h-[320px]">
                    {/* GLOW */}

                    <div className="absolute top-[-60px] right-[-60px] w-[180px] h-[180px] bg-purple-600/10 blur-[100px] rounded-full"></div>

                    <div className="relative z-10 flex flex-col h-full">
                      {/* TOP */}

                      <div className="flex items-start justify-between mb-6">
                        {/* DIFFICULTY */}

                        <span
                          className={`px-4 py-2 rounded-2xl text-sm font-semibold border

                            ${
                              problem.difficulty === "Easy"
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : problem.difficulty === "Medium"
                                  ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                  : "bg-red-500/10 text-red-400 border-red-500/20"
                            }`}
                        >
                          {problem.difficulty}
                        </span>

                        {/* FAVORITE */}

                        {problem.favorite && (
                          <div className="w-10 h-10 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                            <FaStar className="text-yellow-400" />
                          </div>
                        )}
                      </div>

                      {/* TITLE */}

                      <div className="mb-5">
                        <h2 className="text-3xl font-bold text-white leading-tight">
                          {problem.title}
                        </h2>

                        <div className="mt-3 space-y-2">
                          <p className="text-gray-400 text-lg">{problem.topic}</p>

                          <div className="flex items-center gap-3 flex-wrap">
                            {/* PLATFORM */}

                            <span
                              className={`px-3 py-1 rounded-xl text-sm font-medium border

                                ${
                                  problem.platform === "LeetCode"
                                    ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                                    : problem.platform === "GeeksforGeeks"
                                      ? "bg-green-500/10 border-green-500/20 text-green-400"
                                      : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                                }`}
                            >
                              {problem.platform}
                            </span>

                            {/* LINK */}

                            {problem.link && (
                              <a
                                href={problem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 text-sm hover:text-purple-300 transition-all duration-300"
                              >
                                View Problem
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* STATUS */}

                      <div className="mt-auto">
                        <div className="border-t border-white/5 pt-5 flex items-center justify-between">
                          {/* STATUS */}

                          <span
                            className={`text-sm font-semibold

                              ${problem.solved ? "text-green-400" : "text-red-400"}`}
                          >
                            {problem.solved ? "Solved" : "Unsolved"}
                          </span>

                          {/* ACTIONS */}

                          <div className="flex items-center gap-3">
                            <Button
                              variant="secondary"
                              onClick={() => setEditProblem(problem)}
                              className="px-4 py-2 text-sm"
                            >
                              Edit
                            </Button>

                            <Button
                              variant="danger"
                              onClick={() => setDeleteId(problem.id)}
                              className="px-4 py-2 text-sm"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* EDIT MODAL */}

        {editProblem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-[#111827] p-4 md:p-8 rounded-3xl w-full max-w-[500px] border border-gray-800">
              <h2 className="text-3xl font-bold mb-6 text-white">Edit Problem</h2>

              {/* TITLE */}

              <input
                type="text"
                value={editProblem.title}
                onChange={(e) =>
                  setEditProblem({
                    ...editProblem,
                    title: e.target.value,
                  })
                }
                className="w-full bg-[#0f172a] border border-gray-700 rounded-2xl px-5 py-3 text-white mb-4 outline-none"
              />

              {/* DIFFICULTY */}

              <select
                value={editProblem.difficulty}
                onChange={(e) =>
                  setEditProblem({
                    ...editProblem,
                    difficulty: e.target.value,
                  })
                }
                className="w-full bg-[#0f172a] border border-gray-700 rounded-2xl px-5 py-3 text-white mb-6 outline-none"
              >
                <option>Easy</option>

                <option>Medium</option>

                <option>Hard</option>
              </select>

              {/* CHECKBOXES */}

              <div className="flex items-center gap-6 mb-8">
                <label className="flex items-center gap-2 text-white">
                  <input
                    type="checkbox"
                    checked={editProblem.solved}
                    onChange={(e) =>
                      setEditProblem({
                        ...editProblem,
                        solved: e.target.checked,
                      })
                    }
                  />
                  Solved
                </label>

                <label className="flex items-center gap-2 text-white">
                  <input
                    type="checkbox"
                    checked={editProblem.favorite}
                    onChange={(e) =>
                      setEditProblem({
                        ...editProblem,
                        favorite: e.target.checked,
                      })
                    }
                  />
                  Favorite
                </label>
              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-4">
                <Button variant="secondary" onClick={() => setEditProblem(null)}>
                  Cancel
                </Button>

                <Button onClick={updateProblem}>Save</Button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}

        {deleteId && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#111827] border border-gray-700 rounded-3xl p-8 w-[90%] max-w-md shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">Delete Problem?</h2>

              <p className="text-gray-400 mb-8">This action cannot be undone.</p>

              <div className="flex gap-4">
                {/* CANCEL */}

                <Button variant="secondary" onClick={() => setDeleteId(null)} className="flex-1">
                  Cancel
                </Button>

                {/* DELETE */}

                <Button
                  variant="danger"
                  onClick={() => {
                    deleteProblem(deleteId);

                    setDeleteId(null);
                  }}
                  className="flex-1"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </MainLayout>
  );
}

export default Problems;
