"use client";

import React from "react";
import { motion } from "framer-motion";
import { profileConfig } from "@/config/profile";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  const focuses = profileConfig.aboutMe.focusAreas;

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-transparent">
      {/* Ambient */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/4 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="tag tag-purple mb-6 inline-flex">About</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: headline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.1] mb-6">
              Building AI systems<br />
              <span className="text-gradient">that actually work.</span>
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              {profileConfig.aboutMe.story}
            </p>

            {/* Stat row */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-zinc-900">
              {[
                { label: "Focus", value: "AI/ML" },
                { label: "Year", value: "B.Tech" },
                { label: "Status", value: "Building" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-white mb-1">{s.value}</div>
                  <div className="text-zinc-600 text-xs font-mono uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: focus areas */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
          >
            <div className="text-zinc-600 text-xs font-mono uppercase tracking-widest mb-6">
              Focus Areas
            </div>
            <div className="flex flex-col gap-3">
              {focuses.map((area, i) => (
                <motion.div
                  key={area}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={2 + i * 0.3}
                  className="group flex items-center gap-4 py-4 border-b border-zinc-900 hover:border-zinc-700 transition-colors duration-300"
                >
                  <span className="text-zinc-800 group-hover:text-indigo-500 text-xs font-mono transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-zinc-300 group-hover:text-white font-medium transition-colors duration-300 text-sm">
                    {area}
                  </span>
                  <span className="ml-auto text-zinc-800 group-hover:text-zinc-500 transition-colors duration-300 text-xs">→</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
