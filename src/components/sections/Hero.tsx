"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { profileConfig } from "@/config/profile";

export default function Hero() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Cursor glow */}
      <div ref={cursorRef} className="cursor-glow" />

      {/* Ambient orbs */}
      <div className="absolute top-[-15%] left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-600/8 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full bg-purple-600/6 blur-[160px] pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Thin horizontal rule at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start max-w-3xl"
        >
          {/* Status pill */}
          <motion.div variants={item}>
            <span className="tag tag-indigo mb-8 group cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={item} className="mb-6">
            <div className="text-zinc-500 text-sm font-mono tracking-widest uppercase mb-4">
              {profileConfig.university}
            </div>
            <h1 className="text-[clamp(2.8rem,8vw,5.5rem)] font-black leading-[0.95] tracking-tight">
              <span className="text-white">Hi, I&apos;m </span>
              <span className="text-gradient">{profileConfig.name}</span>
            </h1>
          </motion.div>

          {/* Role */}
          <motion.div variants={item}>
            <p className="text-zinc-400 text-lg font-light tracking-wide mb-8 max-w-xl leading-relaxed">
              {profileConfig.role} — {profileConfig.headline}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-16">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-black font-semibold text-sm rounded-full transition-all duration-300 hover:bg-zinc-100 hover:gap-4 hover:shadow-lg hover:shadow-white/10"
            >
              View Projects
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 glass glass-hover text-zinc-300 font-medium text-sm rounded-full transition-all duration-300 hover:text-white"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Social row */}
          <motion.div variants={item} className="flex items-center gap-6">
            <div className="h-px w-8 bg-zinc-800" />
            <div className="flex items-center gap-4">
              {profileConfig.github && (
                <a
                  href={profileConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
                >
                  <Github className="w-4.5 h-4.5" />
                </a>
              )}
              {profileConfig.linkedin && (
                <a
                  href={profileConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>
              )}
              {profileConfig.email && (
                <a
                  href={`mailto:${profileConfig.email}`}
                  className="text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
                >
                  <Mail className="w-4.5 h-4.5" />
                </a>
              )}
            </div>
            <div className="h-px w-8 bg-zinc-800" />
            <span className="text-zinc-700 text-xs font-mono">
              {profileConfig.specialization ?? "AI/ML Developer"}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-700"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </motion.div>
    </section>
  );
}
