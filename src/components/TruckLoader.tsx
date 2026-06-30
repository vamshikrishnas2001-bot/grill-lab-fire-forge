import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Loading screen shown on first visit: a food truck drives in from the
 * left, parks center-screen, then the logo fades in. Replaces the old
 * fire-particle intro entirely.
 */
export function TruckLoader() {
  const [hidden, setHidden] = useState(true);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const skipped = typeof window !== "undefined" && localStorage.getItem("gl.skipIntro") === "1";
    if (!skipped) {
      setHidden(false);
      const t = setTimeout(() => setShowLogo(true), 1900);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = (remember = false) => {
    if (remember) localStorage.setItem("gl.skipIntro", "1");
    setHidden(true);
    requestAnimationFrame(() => {
      document.getElementById("truck-reveal")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.section
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[60] bg-black overflow-hidden flex flex-col items-center justify-center"
        >
          {/* road */}
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ember/10 via-transparent to-transparent" />

          {/* driving truck */}
          <motion.div
            initial={{ x: "-40vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <TruckSVG />

            {/* exhaust smoke */}
            <div className="absolute -left-3 bottom-10 w-10 h-10 pointer-events-none">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="absolute left-0 bottom-0 block w-6 h-6 rounded-full bg-white/15 blur-md"
                  style={{ animation: `smoke-rise ${2.6 + i * 0.4}s ease-out ${i * 0.5}s infinite` }}
                />
              ))}
            </div>
          </motion.div>

          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center mt-10 px-6"
              >
                <p className="label-mono mb-4">EST. 2021 · BANGALORE</p>
                <h1 className="display-xl forged">The Grill Lab</h1>
                <p className="mt-3 font-mono text-xs md:text-sm tracking-[0.5em] text-copper uppercase">
                  Burning Charcoal
                </p>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                  className="mt-10 flex flex-col items-center gap-4"
                >
                  <button
                    onClick={() => dismiss(false)}
                    className="pulse-ember bg-ember text-white px-8 py-4 text-xs font-semibold tracking-[0.3em] uppercase hover:scale-[1.02] transition"
                  >
                    Enter The Grill Lab
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

function TruckSVG() {
  return (
    <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* body */}
      <rect x="20" y="38" width="150" height="48" rx="4" fill="#161616" stroke="#3a3a3a" />
      <rect x="20" y="20" width="80" height="28" rx="4" fill="#1f1f1f" stroke="#3a3a3a" />
      {/* serving window */}
      <rect x="32" y="48" width="48" height="26" rx="2" fill="#FF6A1A" opacity="0.9" />
      <rect x="32" y="48" width="48" height="6" fill="#ffd9b3" opacity="0.5" />
      {/* cab */}
      <path d="M170 50 H198 a8 8 0 0 1 8 8 v20 a8 8 0 0 1 -8 8 H170 Z" fill="#1f1f1f" stroke="#3a3a3a" />
      <path d="M176 56 H196 a4 4 0 0 1 4 4 v8 H176 Z" fill="#8fb8d6" opacity="0.7" />
      {/* exhaust pipe */}
      <rect x="14" y="34" width="4" height="14" fill="#3a3a3a" />
      {/* chimney */}
      <rect x="40" y="6" width="6" height="16" fill="#3a3a3a" />
      {/* wheels */}
      <motion.circle
        cx="56" cy="92" r="13" fill="#0d0d0d" stroke="#4a4a4a" strokeWidth="3"
        animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
        style={{ originX: "56px", originY: "92px" }}
      />
      <motion.circle
        cx="150" cy="92" r="13" fill="#0d0d0d" stroke="#4a4a4a" strokeWidth="3"
        animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
        style={{ originX: "150px", originY: "92px" }}
      />
      {/* headlight */}
      <circle cx="201" cy="74" r="3" fill="#FFB066" />
    </svg>
  );
}
