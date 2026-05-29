import { motion, AnimatePresence } from "framer-motion";

function Modal({
  isOpen,

  onClose,

  title,

  description,

  children,

  maxWidth = "max-w-md",
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
        >
          {/* MODAL */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 10,
            }}
            transition={{
              duration: 0.25,
            }}
            className={`

              relative overflow-hidden

              w-full ${maxWidth}

              rounded-[32px]

              border border-white/10

              bg-[#0b1120]/90

              backdrop-blur-xl

              p-8

              shadow-[0_0_60px_rgba(139,92,246,0.15)]

            `}
          >
            {/* GLOW */}

            <div className="absolute top-[-50px] right-[-50px] w-[220px] h-[220px] bg-purple-600/20 blur-[100px] rounded-full"></div>

            {/* CONTENT */}

            <div className="relative z-10">
              {/* HEADER */}

              {(title || description) && (
                <div className="mb-8">
                  {title && (
                    <h2 className="text-3xl font-black tracking-tight text-white mb-3">{title}</h2>
                  )}

                  {description && (
                    <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
                  )}
                </div>
              )}

              {/* BODY */}

              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
