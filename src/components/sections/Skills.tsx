"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit, Cpu, Server, Layout, Database, Wrench, LucideIcon,
} from "lucide-react";
import { skillsConfig, SkillCategory } from "@/config/skills";

const iconMap: Record<string, LucideIcon> = {
  BrainCircuit, Cpu, Server, Layout, Database, Wrench,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Skills() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-transparent">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-cyan-500/4 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <span className="tag tag-cyan mb-6 inline-flex">Skills</span>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.1]"
          >
            Tech Stack &<br />
            <span className="text-gradient">Expertise</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
            className="text-zinc-500 text-sm max-w-xs leading-relaxed"
          >
            Technologies I learn, build with, and use to engineer intelligent software systems.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillsConfig.map((category: SkillCategory, idx: number) => {
            const Icon = iconMap[category.iconName] || Wrench;
            const isActive = active === idx;

            return (
              <motion.div
                key={category.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx * 0.1}
                onMouseEnter={() => setActive(idx)}
                onMouseLeave={() => setActive(null)}
                className={`group relative p-6 rounded-2xl border transition-all duration-400 cursor-default ${
                  isActive
                    ? "border-indigo-500/30 bg-indigo-500/5 shadow-lg shadow-indigo-500/5"
                    : "border-zinc-900 bg-zinc-950/50 hover:border-zinc-800"
                }`}
              >
                {/* Number */}
                <div className="text-zinc-800 text-xs font-mono mb-6 select-none">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Icon + Title */}
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className={`p-2.5 rounded-xl transition-all duration-300 ${
                      isActive ? "bg-indigo-600 text-white" : "bg-zinc-900 text-zinc-500"
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm leading-tight">{category.title}</h3>
                    <p className="text-zinc-600 text-xs mt-1 leading-relaxed line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-5 border-t border-zinc-900">
                  {category.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono text-zinc-500 bg-zinc-900/80 border border-zinc-800/60 hover:text-zinc-200 hover:border-zinc-700 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
