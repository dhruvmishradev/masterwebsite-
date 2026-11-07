"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profileConfig } from "@/config/profile";

const links = [
  { name: "About", href: "#about" },
  { name: "Terminal", href: "#terminal-section" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Journey", href: "#journey" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 sm:px-6"
      >
        <div
          className={`flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-500 ${
            scrolled
              ? "glass shadow-2xl shadow-black/40"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <a
            href="#hero"
            className="text-sm font-black tracking-tight text-white hover:text-indigo-300 transition-colors duration-200"
          >
            {profileConfig.name.split(" ")[0]}
            <span className="text-indigo-400">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.name}
                href={l.href}
                className="px-3 py-1.5 text-xs font-medium text-zinc-500 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {l.name}
              </a>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-zinc-100 text-black text-xs font-semibold transition-all duration-200"
            >
              Hire Me
            </a>
            <button
              className="md:hidden p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-2 glass rounded-2xl overflow-hidden"
            >
              <div className="flex flex-col py-3">
                {links.map((l) => (
                  <a
                    key={l.name}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="px-5 py-3 text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    {l.name}
                  </a>
                ))}
                <div className="px-5 pt-3 pb-4 border-t border-zinc-900 mt-2">
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 w-full justify-center rounded-full bg-white text-black text-xs font-semibold transition-all duration-200"
                  >
                    Hire Me
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
