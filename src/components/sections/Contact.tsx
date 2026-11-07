"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { profileConfig } from "@/config/profile";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-transparent">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/4 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <span className="tag tag-indigo mb-6 inline-flex">Contact</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.1] mb-6">
              Let&apos;s build<br />
              <span className="text-gradient">something great.</span>
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed mb-10">
              I&apos;m open to internships, project collaborations, and interesting conversations about AI systems. Drop me a message.
            </p>

            {/* Links */}
            <div className="flex flex-col gap-4">
              {profileConfig.email && (
                <a
                  href={`mailto:${profileConfig.email}`}
                  className="group flex items-center gap-4 py-4 border-b border-zinc-900 hover:border-zinc-700 transition-colors duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300">
                    <Mail className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-zinc-400 group-hover:text-white text-sm transition-colors duration-300">
                    {profileConfig.email}
                  </span>
                  <ArrowRight className="ml-auto w-3.5 h-3.5 text-zinc-700 group-hover:text-white transition-all duration-300 group-hover:translate-x-1" />
                </a>
              )}
              {profileConfig.github && (
                <a
                  href={profileConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-4 border-b border-zinc-900 hover:border-zinc-700 transition-colors duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-700 transition-colors duration-300">
                    <GithubIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-zinc-400 group-hover:text-white text-sm transition-colors duration-300">
                    GitHub
                  </span>
                  <ArrowRight className="ml-auto w-3.5 h-3.5 text-zinc-700 group-hover:text-white transition-all duration-300 group-hover:translate-x-1" />
                </a>
              )}
              {profileConfig.linkedin && (
                <a
                  href={profileConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-4 border-b border-zinc-900 hover:border-zinc-700 transition-colors duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-blue-700 transition-colors duration-300">
                    <LinkedinIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-zinc-400 group-hover:text-white text-sm transition-colors duration-300">
                    LinkedIn
                  </span>
                  <ArrowRight className="ml-auto w-3.5 h-3.5 text-zinc-700 group-hover:text-white transition-all duration-300 group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mb-6">
                  <Send className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                <p className="text-zinc-500 text-sm">I&apos;ll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label className="text-zinc-500 text-xs font-mono uppercase tracking-widest block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-white text-sm placeholder-zinc-700 focus:outline-none focus:border-indigo-500/50 focus:bg-zinc-900 transition-all duration-200"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-zinc-500 text-xs font-mono uppercase tracking-widest block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-white text-sm placeholder-zinc-700 focus:outline-none focus:border-indigo-500/50 focus:bg-zinc-900 transition-all duration-200"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-zinc-500 text-xs font-mono uppercase tracking-widest block mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me what you're working on..."
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-white text-sm placeholder-zinc-700 focus:outline-none focus:border-indigo-500/50 focus:bg-zinc-900 transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="group flex items-center justify-center gap-2.5 px-6 py-4 bg-white hover:bg-zinc-100 text-black font-semibold text-sm rounded-full transition-all duration-300 disabled:opacity-50 mt-2"
                >
                  {sending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
