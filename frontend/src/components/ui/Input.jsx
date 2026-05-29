function Input({
  type = "text",

  name,

  placeholder,

  value,

  onChange,

  className = "",
}) {
  return (
    <div className="relative group">
      {/* GLOW */}

      <div className="absolute inset-0 rounded-2xl bg-purple-500/0 group-focus-within:bg-purple-500/10 blur-xl transition-all duration-500"></div>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`

          relative z-10

          w-full

          bg-[#0F172A]/80

          backdrop-blur-xl

          border border-white/10

          rounded-2xl

          px-5 py-4

          text-white

          placeholder:text-gray-500

          outline-none

          focus:border-purple-500/40

          focus:shadow-[0_0_25px_rgba(139,92,246,0.12)]

          transition-all duration-300

          ${className}

        `}
      />
    </div>
  );
}

export default Input;
