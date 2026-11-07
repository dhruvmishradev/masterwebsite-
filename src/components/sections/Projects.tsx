"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/components/ui/Icons";
import { projectsConfig } from "@/config/projects";

const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeInOut" },
  }),
};

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);

  const featured = projectsConfig.slice(0, 2);
  const rest = projectsConfig.slice(2);

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-transparent">
      <div className="absolute top-1/4 left-1/2 w-[600px] h-[400px] rounded-full bg-purple-600/4 blur-[160px] pointer-events-none -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <span className="tag tag-purple mb-6 inline-flex">Projects</span>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={1}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.1]"
          >
            Selected<br />
            <span className="text-gradient">Work</span>
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={2}
            className="text-zinc-500 text-sm max-w-xs leading-relaxed"
          >
            A curated selection of projects I&apos;ve built — from RAG pipelines to agentic interfaces.
          </motion.p>
        </div>

        {/* Featured 2 large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {featured.map((project, idx) => {
            const isPlaceholder = !project.liveUrl && !project.githubUrl;
            const isHov = hovered === idx;

            return (
              <motion.div
                key={project.slug}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={idx * 0.1}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative p-8 rounded-2xl border transition-all duration-400 flex flex-col ${
                  isHov
                    ? "border-zinc-700 bg-zinc-900/60"
                    : "border-zinc-900 bg-zinc-950/40 hover:border-zinc-800"
                }`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    {project.category && (
                      <span className="tag tag-indigo mb-3 inline-flex">{project.category}</span>
                    )}
                    <h3 className="text-white font-bold text-xl leading-tight">{project.title}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-600 hover:text-zinc-200 transition-colors"
                      >
                        <GithubIcon className="w-4.5 h-4.5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-600 hover:text-zinc-200 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                  {project.shortDescription}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {project.technologies.slice(0, 5).map((t: string) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-500 bg-zinc-900/80 border border-zinc-800"
                    >
                      {t}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="text-[10px] font-mono text-zinc-700 self-center">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-zinc-900">
                  <span className="text-zinc-700 text-xs font-mono">
                    {isPlaceholder ? "Placeholder project" : "Public project"}
                  </span>
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors duration-200"
                    >
                      Case study <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 py-1.5 px-3.5 rounded-full transition-all duration-200"
                      >
                        Launch <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Remaining projects as compact list */}
        {rest.length > 0 && (
          <div className="border border-zinc-900 rounded-2xl divide-y divide-zinc-900 overflow-hidden">
            {rest.map((project, idx) => (
              <motion.div
                key={project.slug}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={(idx + 2) * 0.08}
                className="group flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-5 hover:bg-zinc-900/40 transition-colors duration-200"
              >
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-500 text-xs mt-1 line-clamp-1">{project.shortDescription}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:max-w-[260px]">
                  {project.technologies.slice(0, 3).map((t: string) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-600 bg-zinc-900 border border-zinc-800">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="text-zinc-700 hover:text-zinc-300 transition-colors">
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="text-zinc-700 hover:text-zinc-300 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
