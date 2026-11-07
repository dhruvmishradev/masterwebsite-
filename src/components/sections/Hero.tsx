"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Check, Copy } from "lucide-react";
import { profileConfig } from "@/config/profile";

export default function Hero() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const container: any = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const item: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent py-24"
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

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Status pill */}
            <motion.div variants={item}>
              <span className="tag tag-indigo mb-6 group cursor-default inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for high-impact roles &amp; projects
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={item} className="mb-4">
              <div className="text-zinc-500 text-xs font-mono tracking-widest uppercase mb-3">
                {profileConfig.university} &bull; B.Tech CSE &apos;26
              </div>
              <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-black leading-[1.02] tracking-tight">
                <span className="text-white">Hi, I&apos;m </span>
                <span className="text-gradient">{profileConfig.name}</span>
              </h1>
            </motion.div>

            {/* Role */}
            <motion.div variants={item}>
              <p className="text-zinc-400 text-base sm:text-lg font-light tracking-wide mb-8 max-w-xl leading-relaxed">
                {profileConfig.role} &bull; {profileConfig.headline}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-3 mb-10">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold text-sm rounded-full transition-all duration-300 hover:bg-zinc-200 hover:shadow-lg hover:shadow-white/10"
              >
                <span>Explore Work</span>
                <span>&darr;</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800/80 text-sm font-medium transition-colors duration-200 text-zinc-300 hover:text-white"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Social pills */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-6 border-t border-zinc-800/80 w-full">
              {profileConfig.github && (
                <a
                  href={profileConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.08] text-xs font-medium text-zinc-400 hover:text-white transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  <span>GitHub</span>
                </a>
              )}
              {profileConfig.linkedin && (
                <a
                  href={profileConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.08] text-xs font-medium text-zinc-400 hover:text-white transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  <span>LinkedIn</span>
                </a>
              )}
              {profileConfig.email && (
                <a
                  href={`mailto:${profileConfig.email}`}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.08] text-xs font-medium text-zinc-400 hover:text-white transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <span>Email</span>
                </a>
              )}
            </motion.div>
          </div>

          {/* Right Column: Editorial Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              variants={item}
              className="relative w-full max-w-[340px] rounded-2xl p-2.5 bg-gradient-to-b from-white/10 via-white/5 to-white/0 border border-white/15 shadow-2xl backdrop-blur-sm"
            >
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-zinc-900 border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.jpg"
                  alt={profileConfig.name}
                  className="w-full h-full object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div className="flex items-center justify-between px-3 py-2.5 mt-1">
                <div>
                  <div className="text-xs font-bold text-white">{profileConfig.name}</div>
                  <div className="text-[11px] text-zinc-500 font-mono">GLA University &bull; &apos;26</div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </motion.div>
    </section>
  );
}
