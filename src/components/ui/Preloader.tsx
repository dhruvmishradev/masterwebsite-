"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1800;

    const raf = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.floor(eased * 100));
      if (p < 1) {
        requestAnimationFrame(raf);
      } else {
        setTimeout(() => setDone(true), 300);
      }
    };
    requestAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center select-none"
        >
          {/* Logo / name */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white font-black text-2xl tracking-tight mb-12"
          >
            Dhruv<span className="text-indigo-400">.</span>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-px bg-zinc-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.05 }}
            />
          </div>

          {/* Percent */}
          <div className="mt-5 text-zinc-700 text-xs font-mono tabular-nums">
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
