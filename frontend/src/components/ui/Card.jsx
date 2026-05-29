function Card({ children, className = "" }) {

  return (
    <div
      className={`bg-[#111827] border border-gray-800 rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_0_35px_rgba(139,92,246,0.18)] ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;