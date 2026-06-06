import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";

import Modal from "../components/ui/Modal";

import { motion } from "framer-motion";

import { Code2, Layers3, Link2, NotebookPen, Star, CheckCircle2, Target } from "lucide-react";

import Input from "../components/ui/Input";

import Button from "../components/ui/Button";

import Card from "../components/ui/Card";

function AddProblem() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showLinkModal, setShowLinkModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",

    topic: "Arrays",

    difficulty: "Easy",

    platform: "LeetCode",

    link: "",

    notes: "",

    solved: false,

    favorite: false,

    coreSubject: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,

      [name]: value,
    });
  };

  const submitProblem = async () => {
    if (!formData.title.trim()) {
      toast.error("Problem title is required");

      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,

        userId: Number(localStorage.getItem("userId")),
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/api/problems`, payload);

      // STREAK UPDATE

      if (formData.solved) {
        const today = new Date().toDateString();

        const lastSolvedDate = localStorage.getItem("lastSolvedDate");
        let currentStreak = parseInt(localStorage.getItem("currentStreak")) || 0;

        let bestStreak = parseInt(localStorage.getItem("bestStreak")) || 0;

        if (lastSolvedDate !== today) {
          currentStreak += 1;

          if (currentStreak > bestStreak) {
            bestStreak = currentStreak;
          }

          localStorage.setItem("currentStreak", currentStreak);

          localStorage.setItem("bestStreak", bestStreak);

          localStorage.setItem("lastSolvedDate", today);
        }
      }

      toast.success("Problem Added Successfully");

      navigate("/problems");
    } catch (error) {
      console.log(error);

      toast.error("Failed to add problem");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast.error("Problem title is required");

      return;
    }

    if (!formData.link.trim()) {
      setShowLinkModal(true);

      return;
    }

    submitProblem();
  };

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
        {/* HERO */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 mb-10">
          {/* LEFT */}

          <div>
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] border border-white/10 mb-6">
              <Code2 size={18} className="text-purple-400" />

              <span className="text-gray-300">Smart Coding Problem Tracker</span>
            </div>

            <h1 className="text-6xl font-black tracking-tight leading-[1]">
              Add New
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Problem
              </span>
            </h1>

            <p className="text-gray-400 mt-5 text-xl leading-relaxed max-w-[650px]">
              Organize coding practice, monitor interview preparation, track patterns, and improve
              problem-solving consistency.
            </p>
          </div>

          {/* RIGHT CARD */}

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120] backdrop-blur-xl p-8 min-w-[340px] shadow-[0_0_45px_rgba(139,92,246,0.12)]">
            {/* GLOW */}

            <div className="absolute top-[-50px] right-[-50px] w-[180px] h-[180px] bg-purple-600/20 blur-[100px] rounded-full"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.4)] mb-6">
                <Target className="text-white" />
              </div>

              <p className="text-gray-400 mb-3">Interview Preparation Workspace</p>

              <h1 className="text-5xl font-black text-white">CodePulse</h1>

              <p className="text-purple-400 mt-3">Structured DSA Progress Tracking</p>
            </div>
          </div>
        </div>

        {/* FORM */}

        <Card className="relative overflow-hidden max-w-6xl mx-auto p-8 md:p-10 border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120] shadow-[0_0_50px_rgba(139,92,246,0.08)]">
          {/* GLOW */}

          <div className="absolute top-[-120px] right-[-120px] w-[280px] h-[280px] bg-purple-600/10 blur-[140px] rounded-full"></div>

          <div className="absolute bottom-[-120px] left-[-120px] w-[260px] h-[260px] bg-blue-600/10 blur-[140px] rounded-full"></div>

          <div className="relative z-10">
            {/* TOP */}

            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-black tracking-tight">Problem Details</h2>

                <p className="text-gray-400 mt-3 text-lg">
                  Add and organize your coding interview problems
                </p>
              </div>

              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-[0_0_35px_rgba(139,92,246,0.4)]">
                <Code2 size={34} className="text-white" />
              </div>
            </div>

            {/* GRID */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
              {/* TITLE */}

              <div>
                <label className="flex items-center gap-3 text-gray-300 mb-4 text-lg font-medium">
                  <Code2 size={18} className="text-purple-400" />
                  Problem Title
                </label>

                <Input
                  type="text"
                  name="title"
                  placeholder="Enter problem title"
                  value={formData.title}
                  onChange={handleChange}
                />

                <p className="text-gray-500 text-sm mt-3">
                  Example: Two Sum, Merge Intervals, Binary Search
                </p>
              </div>

              {/* DIFFICULTY */}

              <div>
                <label className="flex items-center gap-3 text-gray-300 mb-4 text-lg font-medium">
                  <Layers3 size={18} className="text-yellow-400" />
                  Difficulty
                </label>

                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full bg-[#0F172A]/80 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-purple-500/40 transition-all duration-300 backdrop-blur-xl"
                >
                  <option>Easy</option>

                  <option>Medium</option>

                  <option>Hard</option>
                </select>

                <p className="text-gray-500 text-sm mt-3">
                  Choose the complexity level of the problem
                </p>
              </div>

              {/* TOPIC */}

              <div>
                <label className="flex items-center gap-3 text-gray-300 mb-4 text-lg font-medium">
                  <NotebookPen size={18} className="text-green-400" />
                  Topic / Category
                </label>

                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="w-full bg-[#0F172A]/80 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-purple-500/40 transition-all duration-300 backdrop-blur-xl"
                >
                  <option>Arrays</option>

                  <option>Strings</option>

                  <option>Trees</option>

                  <option>Graphs</option>

                  <option>Dynamic Programming</option>
                </select>

                <p className="text-gray-500 text-sm mt-3">Select the primary DSA topic</p>
              </div>

              {/* PLATFORM */}

              <div>
                <label className="flex items-center gap-3 text-gray-300 mb-4 text-lg font-medium">
                  <Target size={18} className="text-blue-400" />
                  Platform
                </label>

                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full bg-[#0F172A]/80 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-purple-500/40 transition-all duration-300 backdrop-blur-xl"
                >
                  <option>LeetCode</option>

                  <option>Codeforces</option>

                  <option>GeeksforGeeks</option>

                  <option>HackerRank</option>
                </select>

                <p className="text-gray-500 text-sm mt-3">Source platform of the coding problem</p>
              </div>
            </div>

            {/* LINK */}

            <div className="mb-8">
              <label className="flex items-center gap-3 text-gray-300 mb-4 text-lg font-medium">
                <Link2 size={18} className="text-purple-400" />
                Problem Link
              </label>

              <Input
                type="text"
                name="link"
                placeholder="https://leetcode.com/problems/..."
                value={formData.link}
                onChange={handleChange}
              />

              <p className="text-gray-500 text-sm mt-3">
                Add the direct link for quick access later
              </p>
            </div>

            {/* NOTES */}

            <div className="mb-8">
              <label className="flex items-center gap-3 text-gray-300 mb-4 text-lg font-medium">
                <NotebookPen size={18} className="text-pink-400" />
                Notes & Observations
              </label>

              <textarea
                rows="7"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Write important observations, patterns, optimizations, edge cases, or interview notes..."
                className="w-full bg-[#0F172A]/80 border border-white/10 rounded-3xl px-6 py-5 text-white outline-none resize-none focus:border-purple-500/40 transition-all duration-300 backdrop-blur-xl"
              ></textarea>

              <p className="text-gray-500 text-sm mt-3">
                Store approaches, optimizations, and revision insights
              </p>
            </div>

            {/* CHECKBOXES */}

            <div className="flex flex-wrap items-center gap-5 mb-10">
              <label className="flex items-center gap-3 text-white bg-[#0F172A]/80 border border-green-500/10 px-6 py-4 rounded-2xl backdrop-blur-xl">
                <input
                  type="checkbox"
                  checked={formData.solved}
                  onChange={(e) =>
                    setFormData({
                      ...formData,

                      solved: e.target.checked,
                    })
                  }
                />
                <CheckCircle2 size={18} className="text-green-400" />
                Solved
              </label>

              <label className="flex items-center gap-3 text-white bg-[#0F172A]/80 border border-yellow-500/10 px-6 py-4 rounded-2xl backdrop-blur-xl">
                <input
                  type="checkbox"
                  checked={formData.favorite}
                  onChange={(e) =>
                    setFormData({
                      ...formData,

                      favorite: e.target.checked,
                    })
                  }
                />
                <Star size={18} className="text-yellow-400" />
                Favorite
              </label>
            </div>

            {/* BUTTON */}

            <Button onClick={handleSubmit} loading={loading} className="w-full">
              Add Problem
            </Button>
          </div>
        </Card>

        {/* LINK MODAL */}

        <Modal
          isOpen={showLinkModal}
          onClose={() => setShowLinkModal(false)}
          title="Add Problem Link?"
          description="You have not added a problem link. Do you want to continue without it?"
        >
          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => setShowLinkModal(false)} className="flex-1">
              Add Link
            </Button>

            <Button
              onClick={() => {
                setShowLinkModal(false);

                submitProblem();
              }}
              className="flex-1"
            >
              Continue
            </Button>
          </div>
        </Modal>
      </motion.div>
    </MainLayout>
  );
}

export default AddProblem;
