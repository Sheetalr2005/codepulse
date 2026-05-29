import { motion } from "framer-motion";

function Button({
  children,

  onClick,

  type = "button",

  variant = "primary",

  loading = false,

  className = "",
}) {
  const baseStyles =
    "relative overflow-hidden px-6 py-3.5 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 text-white hover:shadow-[0_0_35px_rgba(139,92,246,0.35)]",

    secondary:
      "bg-[#111827]/80 backdrop-blur-xl border border-white/10 text-white hover:bg-[#1e293b]",

    danger:
      "bg-red-500/90 text-white hover:bg-red-500 hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]",
  };

  return (
    <motion.button
      whileTap={{
        scale: 0.98,
      }}
      whileHover={{
        y: -1,
      }}
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {/* GLOW */}

      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 hover:opacity-100 transition-all duration-500"></div>
      )}

      {/* LOADING */}

      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>

          <span>Loading...</span>
        </>
      ) : (
        <span className="relative z-10">{children}</span>
      )}
    </motion.button>
  );
}

export default Button;
