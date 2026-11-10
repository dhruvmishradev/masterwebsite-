"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Users, Calendar, ExternalLink, Zap, Medal } from "lucide-react";

interface Hackathon {
  name: string;
  organizer: string;
  date: string;
  position?: string;
  positionLabel?: string;
  team?: string;
  description: string;
  techStack: string[];
  projectName: string;
  link?: string;
  highlight?: boolean;
}

const hackathons: Hackathon[] = [
  {
    name: "Smart India Hackathon (SIH)",
    organizer: "Ministry of Education, Govt. of India",
    date: "2024",
    position: "College Finalist",
    positionLabel: "College Finalist",
    team: "Team of 6",
    projectName: "AI-Powered Grievance Redressal System",
    description:
      "Built a full-stack AI grievance management system using LLM-powered intent classification to auto-route citizen complaints to relevant government departments with automated priority scoring.",
    techStack: ["Python", "FastAPI", "LangChain", "React", "PostgreSQL"],
    highlight: true,
  },
  {
    name: "GLA Hackathon",
    organizer: "GLA University, Mathura",
    date: "2024",
    position: "Top 3",
    positionLabel: "Top 3",
    team: "Team of 4",
    projectName: "CampusBot — AI Student Assistant",
    description:
      "Developed an intelligent campus assistant chatbot using RAG pipelines on university documents, enabling students to get instant structured answers for admission, fees, and academic queries.",
    techStack: ["Python", "ChromaDB", "HuggingFace", "Streamlit", "LangChain"],
    highlight: true,
  },
  {
    name: "Hackathon @ OpenHacks",
    organizer: "DevCommunity India",
    date: "2025",
    position: "Participant",
    positionLabel: "Participant",
    team: "Team of 3",
    projectName: "RAG-Powered Resume Analyzer",
    description:
      "Engineered an automated resume screening tool that extracts structured candidate data using constrained JSON schema generation from Mistral AI, ranked candidates with semantic similarity scoring against job descriptions.",
    techStack: ["Mistral AI", "Next.js", "TypeScript", "ChromaDB", "Tailwind CSS"],
  },
  {
    name: "AI for Good Hackathon",
    organizer: "Tech For Change India",
    date: "2025",
    position: "Finalist",
    positionLabel: "Finalist",
    team: "Solo",
    projectName: "MedQuery — Clinical Document RAG",
    description:
      "Built a medical document Q&A system enabling factual grounding of clinical queries against PDFs, with citation-level traceability, zero hallucination guarantees, and HIPAA-aware data handling.",
    techStack: ["LangChain", "FastAPI", "ChromaDB", "HuggingFace", "Docker"],
    highlight: true,
  },
];

const positionColors: Record<string, string> = {
  "College Finalist": "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
  "Top 3": "text-amber-400 bg-amber-500/10 border-amber-500/30",
  Finalist: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  Participant: "text-zinc-400 bg-zinc-500/10 border-zinc-700",
};

const positionIcons: Record<string, React.ReactNode> = {
  "College Finalist": <Medal className="w-3.5 h-3.5" />,
  "Top 3": <Trophy className="w-3.5 h-3.5" />,
  Finalist: <Zap className="w-3.5 h-3.5" />,
  Participant: <Users className="w-3.5 h-3.5" />,
};

const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.1 },
  }),
};

export default function Hackathons() {
  return (
    <section id="hackathons" className="py-24 max-w-6xl mx-auto px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase">
            Competitive Building
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
          Hackathons
        </h2>
        <p className="text-zinc-400 text-base max-w-2xl leading-relaxed">
          High-pressure 24–48 hour builds where constraints force creativity. Each event sharpened
          decision-making, rapid prototyping, and production-first thinking under real deadlines.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {hackathons.map((h, idx) => {
          const posColor = positionColors[h.positionLabel ?? ""] ?? positionColors["Participant"];
          const posIcon = positionIcons[h.positionLabel ?? ""] ?? positionIcons["Participant"];

          return (
            <motion.div
              key={h.name + idx}
              custom={idx * 0.08}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={`group relative flex flex-col p-6 rounded-2xl border transition-all duration-300 ${
                h.highlight
                  ? "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
                  : "border-zinc-900 bg-zinc-950/30 hover:border-zinc-800"
              }`}
            >
              {/* Top Row: Name + Position Badge */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
                    <span className="text-[11px] font-mono text-zinc-500">{h.date}</span>
                    {h.team && (
                      <>
                        <span className="text-zinc-700">·</span>
                        <Users className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
                        <span className="text-[11px] font-mono text-zinc-500">{h.team}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-base leading-tight group-hover:text-indigo-200 transition-colors duration-200">
                    {h.name}
                  </h3>
                  <p className="text-zinc-500 text-xs mt-0.5">{h.organizer}</p>
                </div>

                {/* Position Badge */}
                {h.positionLabel && (
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium border flex-shrink-0 ${posColor}`}
                  >
                    {posIcon}
                    {h.positionLabel}
                  </span>
                )}
              </div>

              {/* Project Name */}
              <div className="mb-3">
                <span className="text-xs font-mono text-zinc-600 uppercase tracking-wider">Project</span>
                <div className="text-sm font-semibold text-indigo-300 mt-0.5">{h.projectName}</div>
              </div>

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed mb-5 flex-1">{h.description}</p>

              {/* Footer: Tech tags + link */}
              <div className="flex items-end justify-between gap-3 pt-4 border-t border-zinc-900">
                <div className="flex flex-wrap gap-1.5">
                  {h.techStack.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-500 bg-zinc-900/80 border border-zinc-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {h.link && (
                  <a
                    href={h.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-zinc-600 hover:text-zinc-300 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {[
          { label: "Hackathons", value: "4+" },
          { label: "Top Finishes", value: "3" },
          { label: "Projects Built", value: "4" },
          { label: "Team Roles", value: "Lead / Solo" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 text-center"
          >
            <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
            <div className="text-xs font-mono text-zinc-500">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
