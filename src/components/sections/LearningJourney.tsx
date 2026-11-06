"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Flag } from "lucide-react";
import { profileConfig } from "@/config/profile";

interface TimelineItem {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
}

const timeline: TimelineItem[] = [
  {
    period: "2023 — Present",
    title: "B.Tech CSE Foundation",
    subtitle: "GLA University, Mathura",
    description:
      "Entered undergraduate program specializing in AI/ML. Mastered data structures, algorithms, discrete mathematics, OOP, and database systems.",
    skills: ["Data Structures", "Algorithms", "Python", "SQL"],
  },
  {
    period: "Late 2024 — 2025",
    title: "Machine Learning & Deep Learning",
    subtitle: "AI/ML Track",
    description:
      "Dived into predictive analytics and neural architectures. Focused on linear algebra, calculus, statistical modeling, regression, and MLP architectures.",
    skills: ["Machine Learning", "Deep Learning", "Statistics", "NumPy"],
  },
  {
    period: "2025 — 2026",
    title: "Generative AI & RAG Systems",
    subtitle: "LLM Orchestration & System Design",
    description:
      "Built semantic search pipelines using LangChain. Connected local models to vector stores. Served prediction endpoints via FastAPI.",
    skills: ["Generative AI", "RAG", "LangChain", "FastAPI", "ChromaDB"],
  },
  {
    period: "Active Phase",
    title: "Agentic Systems & Full-Stack",
    subtitle: "Current Focus",
    description:
      "Building multi-agent state machines with LangGraph, Docker sandboxing, and polished React/Next.js interfaces for AI products.",
    skills: ["LangGraph", "React", "Next.js", "Docker", "AI Agents"],
  },
  {
    period: "2027 & Beyond",
    title: "Production-Grade AI Engineering",
    subtitle: "Target Goals",
    description:
      "Transitioning to industry-ready AI engineer: cloud deployment, distributed training, scalable LLM orchestrations, and CI/CD pipelines.",
    skills: ["Cloud Deploy", "MLOps", "Microservices", "CI/CD"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, x: -20 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function LearningJourney() {
  return (
    <section id="journey" className="py-32 relative overflow-hidden bg-transparent">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/4 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <span className="tag tag-indigo mb-6 inline-flex">Journey</span>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.1]"
          >
            Learning<br />
            <span className="text-gradient">Timeline</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
            className="text-zinc-500 text-sm max-w-xs leading-relaxed"
          >
            A chronological map of my academic progression and technical growth.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-[200px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-800 to-transparent" />

          <div className="flex flex-col gap-0">
            {timeline.map((item, idx) => {
              const isLast = idx === timeline.length - 1;
              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={idx * 0.15}
                  className="group relative flex flex-col md:flex-row gap-0 md:gap-12 pb-12 last:pb-0"
                >
                  {/* Period label (desktop) */}
                  <div className="hidden md:flex flex-col items-end justify-start pt-6 w-[200px] shrink-0 pr-12">
                    <span className="text-xs font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300 text-right leading-tight">
                      {item.period}
                    </span>
                  </div>

                  {/* Node */}
                  <div className="absolute left-0 md:left-[200px] top-6 -translate-x-1/2 z-10">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isLast
                          ? "border-indigo-500 bg-indigo-500/20 group-hover:bg-indigo-500/40"
                          : "border-zinc-700 bg-zinc-950 group-hover:border-indigo-500"
                      }`}
                    >
                      {isLast && <Flag className="w-2 h-2 text-indigo-400" />}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pl-8 md:pl-0 md:flex-1 py-4">
                    {/* Period label (mobile) */}
                    <div className="flex items-center gap-1.5 md:hidden mb-2">
                      <Calendar className="w-3 h-3 text-indigo-400" />
                      <span className="text-xs font-mono text-indigo-400">{item.period}</span>
                    </div>

                    <h3 className="text-white font-bold text-base mb-1 group-hover:text-indigo-300 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-zinc-600 text-xs font-mono mb-4">{item.subtitle}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-5">{item.description}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {item.skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-500 bg-zinc-900/60 border border-zinc-800"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
