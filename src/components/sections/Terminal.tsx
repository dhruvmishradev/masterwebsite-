"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Sparkles } from "lucide-react";

interface HistoryItem {
  prompt: string;
  response: string;
}

const DHRUV_DATA: Record<string, string> = {
  what_you_do: `
<div style="line-height:1.7; color:#e4e4e7;">
  <div style="color:#38bdf8; font-weight:600; margin-bottom:6px;">Dhruv Mishra &bull; AI Systems &amp; Software Engineer</div>
  <div>I build production AI systems and full-stack software with a focus on reliability and clean architecture.</div>
  
  <div style="margin-top:10px;">
    <div style="color:#fff; font-weight:600;">Core focus areas:</div>
    <div style="margin-left:12px; margin-top:4px;">
      &bull; <strong>RAG &amp; Vector Search:</strong> Grounded document retrieval pipelines using LangChain and ChromaDB with zero-hallucination verification.<br/>
      &bull; <strong>Agent Workflows:</strong> Stateful multi-step agent graphs with LangGraph, tool calling, and strict schema validation.<br/>
      &bull; <strong>Backend Systems:</strong> High-performance async microservices with Python, FastAPI, and PostgreSQL.<br/>
      &bull; <strong>Frontend:</strong> Fast, minimalist web applications with Next.js, TypeScript, and Tailwind CSS.
    </div>
  </div>
</div>`,

  whoami: `
<div style="line-height:1.7; color:#e4e4e7;">
  <div><span style="color:#fff; font-weight:700;">Dhruv Mishra</span> &mdash; AI &amp; Software Developer</div>
  <div style="color:#a1a1aa; font-size:0.75rem;">GLA University, Mathura (B.Tech CSE '26) &bull; Mathura, India</div>
  <div style="margin-top:8px;">
    Undergrad focused on building practical, production-ready AI software rather than toy wrappers. Grounded in solid computer science fundamentals, data structures, and database design.
  </div>
  <div style="margin-top:10px; font-family:monospace; font-size:0.75rem;">
    <span style="color:#71717a;">github</span>   &nbsp; <a href="https://github.com/dhruvmishradev" target="_blank" style="color:#38bdf8; text-decoration:none;">github.com/dhruvmishradev</a><br/>
    <span style="color:#71717a;">linkedin</span> &nbsp; <a href="https://www.linkedin.com/in/dhruvmishra10" target="_blank" style="color:#38bdf8; text-decoration:none;">linkedin.com/in/dhruvmishra10</a><br/>
    <span style="color:#71717a;">email</span>    &nbsp; <a href="mailto:dhruvmishrain.dev@gmail.com" style="color:#34d399; text-decoration:none;">dhruvmishrain.dev@gmail.com</a>
  </div>
</div>`,

  skills: `
<div style="line-height:1.7; color:#e4e4e7;">
  <div style="color:#fff; font-weight:600; margin-bottom:6px;">Technical Skills:</div>
  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:10px; font-size:0.78rem;">
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px;">
      <div style="color:#38bdf8; font-weight:600;">AI &amp; RAG</div>
      <div style="color:#a1a1aa; margin-top:4px;">LangChain, LangGraph, ChromaDB, FAISS, Llama-3, Mistral, Embeddings, Prompt Engineering</div>
    </div>
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px;">
      <div style="color:#34d399; font-weight:600;">Backend &amp; Data</div>
      <div style="color:#a1a1aa; margin-top:4px;">Python (Asyncio), FastAPI, PostgreSQL, SQL Mastery, Power BI, RESTful APIs, Docker</div>
    </div>
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px;">
      <div style="color:#c084fc; font-weight:600;">Frontend &amp; Tools</div>
      <div style="color:#a1a1aa; margin-top:4px;">Next.js, React, TypeScript, Tailwind CSS, Git, Linux, Vercel</div>
    </div>
  </div>
</div>`,

  projects: `
<div style="line-height:1.7; color:#e4e4e7;">
  <div style="color:#fff; font-weight:600; margin-bottom:8px;">Projects:</div>
  
  <div style="margin-bottom:12px; padding:10px 12px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:8px;">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <span style="color:#34d399; font-weight:600;">CineSage AI</span>
      <span style="font-size:0.7rem; color:#71717a;">Live Production</span>
    </div>
    <div style="font-size:0.75rem; color:#a1a1aa; margin:4px 0;">
      Intelligent movie discovery powered by Mistral AI, structured JSON extraction, and streaming platform availability lookup.
    </div>
    <div style="font-size:0.75rem; font-family:monospace;">
      <a href="https://generative-ai-cyan.vercel.app/" target="_blank" style="color:#38bdf8; text-decoration:none;">&rarr; demo: generative-ai-cyan.vercel.app</a>
    </div>
  </div>

  <div style="padding:10px 12px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:8px;">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <span style="color:#818cf8; font-weight:600;">RAG Document Intelligence</span>
      <span style="font-size:0.7rem; color:#71717a;">System Architecture</span>
    </div>
    <div style="font-size:0.75rem; color:#a1a1aa; margin:4px 0;">
      Document synthesis with token-aware chunking, dense vector retrieval with ChromaDB, cross-encoder reranking, and citation guarantees.
    </div>
    <div style="font-size:0.72rem; color:#71717a;">
      Stack: LangChain, ChromaDB, FastAPI, Llama-3, Docker
    </div>
  </div>
</div>`,

  certs: `
<div style="line-height:1.7; color:#e4e4e7;">
  <div style="color:#fff; font-weight:600; margin-bottom:6px;">Verified Certifications:</div>
  <div style="font-size:0.78rem;">
    &bull; <strong style="color:#fff;">Microsoft Certified: Power BI Data Analyst Associate</strong><br/>
    &bull; <strong style="color:#fff;">SQL (Beginner to Advanced)</strong> &mdash; Complete Database Mastery<br/>
    &bull; <strong style="color:#fff;">Machine Learning &amp; Deep Learning Fundamentals</strong><br/>
    &bull; <strong style="color:#fff;">Generative AI Systems &amp; LLM Engineering</strong><br/>
    &bull; <strong style="color:#fff;">B.Tech Computer Science &amp; Engineering</strong> &mdash; GLA University (2022&ndash;2026)
  </div>
  <div style="margin-top:8px; font-size:0.75rem;">
    <a href="https://www.linkedin.com/in/dhruvmishra10" target="_blank" style="color:#38bdf8; text-decoration:none;">View verified credentials on LinkedIn &rarr;</a>
  </div>
</div>`,

  contact: `
<div style="line-height:1.7; color:#e4e4e7; font-size:0.78rem;">
  <div style="color:#fff; font-weight:600; margin-bottom:6px;">Contact Dhruv:</div>
  <div>Email: <a href="mailto:dhruvmishrain.dev@gmail.com" style="color:#34d399; text-decoration:none;">dhruvmishrain.dev@gmail.com</a></div>
  <div>LinkedIn: <a href="https://www.linkedin.com/in/dhruvmishra10" target="_blank" style="color:#38bdf8; text-decoration:none;">linkedin.com/in/dhruvmishra10</a></div>
  <div>GitHub: <a href="https://github.com/dhruvmishradev" target="_blank" style="color:#38bdf8; text-decoration:none;">github.com/dhruvmishradev</a></div>
  <div style="margin-top:6px; color:#71717a;">Available for AI engineering positions, internships, and high-impact software projects.</div>
</div>`,
};

export default function Terminal() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [inputVal, setInputVal] = useState("");
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  }, [history]);

  const processQuery = (raw: string): string => {
    const q = raw.trim().toLowerCase();
    if (!q) return "";
    if (q === "clear" || q === "cls") return "__CLEAR__";
    if (q === "help") {
      return `
<div style="line-height:1.65; color:#a1a1aa; font-size:0.78rem;">
  <div style="color:#fff; font-weight:600; margin-bottom:4px;">Available commands:</div>
  <div>&bull; <span style="color:#38bdf8;">what do you do?</span> &mdash; Overview of Dhruv's engineering work</div>
  <div>&bull; <span style="color:#38bdf8;">whoami</span> / <span style="color:#38bdf8;">about</span> &mdash; Bio and background</div>
  <div>&bull; <span style="color:#38bdf8;">skills</span> &mdash; Full technical stack</div>
  <div>&bull; <span style="color:#38bdf8;">projects</span> &mdash; CineSage AI &amp; RAG System</div>
  <div>&bull; <span style="color:#38bdf8;">certs</span> &mdash; Education &amp; LinkedIn licenses</div>
  <div>&bull; <span style="color:#38bdf8;">contact</span> &mdash; Email, GitHub, LinkedIn</div>
  <div>&bull; <span style="color:#38bdf8;">clear</span> &mdash; Clear terminal screen</div>
</div>`;
    }

    if (/what do you do|what does dhruv do|what is your work|what do you specialize|what do you build|service/i.test(q)) {
      return DHRUV_DATA.what_you_do;
    }
    if (/whoami|who are you|who is dhruv|tell me about yourself|tell me about dhruv|about|bio|intro/i.test(q)) {
      return DHRUV_DATA.whoami;
    }
    if (/skill|tech stack|technologies|language|framework|python|fastapi|langchain/i.test(q)) {
      return DHRUV_DATA.skills;
    }
    if (/project|cinesage|rag|movie|work|portfolio|built/i.test(q)) {
      return DHRUV_DATA.projects;
    }
    if (/cert|license|credential|power bi|microsoft|degree|education|college|university|gla/i.test(q)) {
      return DHRUV_DATA.certs;
    }
    if (/contact|email|hire|reach|phone|connect|talk/i.test(q)) {
      return DHRUV_DATA.contact;
    }

    return `
<div style="line-height:1.65; font-size:0.76rem; color:#a1a1aa;">
  Ask anything about Dhruv's work: try <span style="color:#38bdf8;">"what do you do?"</span>, <span style="color:#38bdf8;">"projects"</span>, or <span style="color:#38bdf8;">"skills"</span>.
</div>`;
  };

  const handleRun = (cmd: string) => {
    if (!cmd.trim()) return;
    const res = processQuery(cmd);
    if (res === "__CLEAR__") {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, { prompt: cmd, response: res }]);
    }
    setInputVal("");
  };

  return (
    <section id="terminal-section" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div>
          <span className="tag tag-indigo mb-6 inline-flex">Interactive Command Line</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.1] mb-3">
            Dhruv Mishra <span className="text-gradient">Terminal CLI</span>
          </h2>
          <p className="text-zinc-500 text-sm max-w-lg leading-relaxed">
            Type any question in your own words or click the quick chips to query my engineering specs and background.
          </p>
        </div>

        <div className="mt-8 rounded-2xl bg-[#07070a] border border-white/10 shadow-2xl overflow-hidden font-mono">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-white/[0.03] border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span className="text-xs text-zinc-500 ml-2">guest@dhruv-mishra:~ (bash)</span>
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold">
              &bull; SHELL ACTIVE
            </div>
          </div>

          {/* Quick Buttons */}
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.015] border-b border-white/[0.05] flex-wrap">
            <span className="text-[11px] text-zinc-600 uppercase">Quick inquiries:</span>
            <button
              onClick={() => handleRun("what do you do?")}
              className="px-3 py-1 rounded-full text-xs text-sky-400 bg-sky-400/10 border border-sky-400/30 hover:bg-sky-400/20 transition-colors"
            >
              &quot;What do you do?&quot;
            </button>
            <button
              onClick={() => handleRun("whoami")}
              className="px-3 py-1 rounded-full text-xs text-indigo-400 bg-indigo-400/10 border border-indigo-400/30 hover:bg-indigo-400/20 transition-colors"
            >
              whoami
            </button>
            <button
              onClick={() => handleRun("projects")}
              className="px-3 py-1 rounded-full text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 hover:bg-emerald-400/20 transition-colors"
            >
              projects
            </button>
            <button
              onClick={() => handleRun("skills")}
              className="px-3 py-1 rounded-full text-xs text-purple-400 bg-purple-400/10 border border-purple-400/30 hover:bg-purple-400/20 transition-colors"
            >
              skills
            </button>
            <button
              onClick={() => handleRun("certs")}
              className="px-3 py-1 rounded-full text-xs text-amber-400 bg-amber-400/10 border border-amber-400/30 hover:bg-amber-400/20 transition-colors"
            >
              certs
            </button>
            <button
              onClick={() => handleRun("contact")}
              className="px-3 py-1 rounded-full text-xs text-zinc-400 bg-zinc-400/10 border border-zinc-400/30 hover:bg-zinc-400/20 transition-colors"
            >
              contact
            </button>
            <button
              onClick={() => handleRun("clear")}
              className="px-3 py-1 rounded-full text-xs text-rose-400 bg-rose-400/10 border border-rose-400/30 hover:bg-rose-400/20 transition-colors"
            >
              clear
            </button>
          </div>

          {/* Screen */}
          <div ref={screenRef} className="p-5 min-h-[260px] max-h-[420px] overflow-y-auto text-xs leading-relaxed text-zinc-300">
            <div className="text-zinc-600 mb-3 text-[11px]">
              Dhruv Mishra Portfolio Terminal [Version 2.5.0]<br />
              Type any question in your own words or click the chips above.
            </div>
            {history.map((h, i) => (
              <div key={i} className="mb-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                  <span>dhruv@dev:~$</span>
                  <span className="text-white font-normal">{h.prompt}</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: h.response }} />
              </div>
            ))}
          </div>

          {/* Input line */}
          <div className="flex items-center gap-2.5 px-5 py-3 bg-black/60 border-t border-white/[0.06]">
            <span className="text-emerald-400 font-bold text-xs">dhruv@dev:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRun(inputVal)}
              placeholder="Ask anything in your own words (e.g. 'what do you do?', 'tell me about CineSage')..."
              className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono placeholder:text-zinc-700"
            />
            <button
              onClick={() => handleRun(inputVal)}
              className="px-3.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
            >
              Run
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
