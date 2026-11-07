"use client";

import React from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { profileConfig } from "@/config/profile";

const links = [
  { name: "About",    href: "#about" },
  { name: "Skills",   href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Journey",  href: "#journey" },
  { name: "Contact",  href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-zinc-900 py-12">
      {/* Thin gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="text-white font-black text-lg tracking-tight mb-1">
              {profileConfig.name.split(" ")[0]}
              <span className="text-indigo-400">.</span>
            </div>
            <div className="text-zinc-600 text-xs font-mono">{profileConfig.role}</div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {links.map((l) => (
              <a
                key={l.name}
                href={l.href}
                className="text-zinc-600 hover:text-zinc-300 text-xs font-mono transition-colors duration-200"
              >
                {l.name}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {profileConfig.github && (
              <a
                href={profileConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700 flex items-center justify-center transition-all duration-200"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {profileConfig.linkedin && (
              <a
                href={profileConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700 flex items-center justify-center transition-all duration-200"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {profileConfig.email && (
              <a
                href={`mailto:${profileConfig.email}`}
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700 flex items-center justify-center transition-all duration-200"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-zinc-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-zinc-700 text-[10px] font-mono">
            &copy; {year} {profileConfig.name}. All rights reserved.
          </span>
          <span className="text-zinc-800 text-[10px] font-mono">
            Built with Next.js &amp; Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
}
