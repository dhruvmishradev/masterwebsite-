"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Binary, 
  Database, 
  Search, 
  Cpu, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Wrench,
  Bot,
  Terminal as TerminalIcon
} from "lucide-react";

interface NodeData {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  details: string;
  tech: string;
  color: string;
  logs: string[];
}

export default function AiArchitecture() {
  const [activeNode, setActiveNode] = useState<string>("input");
  const [flowPhase, setFlowPhase] = useState<number>(0);
  const [typedLogs, setTypedLogs] = useState<string[]>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState<number>(0);

  // Pipeline node list
  const nodes: NodeData[] = [
    {
      id: "input",
      label: "User Input & Intent",
      icon: MessageSquare,
      details: "The user submits a prompt or programming task. The system checks input sizes, filters for malicious intent, and determines query classification vectors.",
      tech: "FastAPI / Next.js Routing",
      color: "from-blue-500 to-indigo-500",
      logs: [
        "[SYS] Incoming POST /api/v1/query",
        "[SYS] Origin client verified (IP: 127.0.0.1)",
        "[SYS] Payload: { query: 'Explain vector indices.' }",
        "[SYS] Intent parsing complete. Class: RESEARCH_QA"
      ]
    },
    {
      id: "embedding",
      label: "Vector Embedding",
      icon: Binary,
      details: "Text query is converted into a high-dimensional mathematical vector (e.g., 768 dimensions) using dense sentence-transformer models.",
      tech: "HuggingFace Transformers",
      color: "from-indigo-500 to-purple-500",
      logs: [
        "[MODEL] Loading HuggingFace embeddings...",
        "[MODEL] Tokenizing inputs (5 words, 6 tokens)",
        "[MODEL] Vectorization computed in 14ms",
        "[MODEL] Generated matrix tensor: [1, 768]"
      ]
    },
    {
      id: "vectordb",
      label: "Vector Store (ChromaDB)",
      icon: Database,
      details: "The generated vector query scans indices in the vector database looking for chunks with the highest cosine similarity matching.",
      tech: "ChromaDB / PostgreSQL pgvector",
      color: "from-purple-500 to-fuchsia-500",
      logs: [
        "[CHROMA] Querying database collections...",
        "[CHROMA] Cosine similarity index scan initiated",
        "[CHROMA] doc_id_7701 matched (similarity: 0.893)",
        "[CHROMA] doc_id_3309 matched (similarity: 0.812)",
        "[CHROMA] Returned top 2 reference chunks (0.8ms)"
      ]
    },
    {
      id: "retrieval",
      label: "Context Retrieval & RAG",
      icon: Search,
      details: "Matches are retrieved and formatted as system rules, appending the private source document texts to the final LLM instruction context.",
      tech: "LangChain Retriever",
      color: "from-fuchsia-500 to-pink-500",
      logs: [
        "[RAG] Aggregating retrieved contexts",
        "[RAG] Extracted 2 text segments (640 chars total)",
        "[RAG] Re-ranking document matches using CrossEncoder",
        "[RAG] Augmented prompt structured size: 1420 tokens"
      ]
    },
    {
      id: "llm",
      label: "LLM Orchestration",
      icon: Cpu,
      details: "The augmented prompt containing the original question plus the retrieved contexts is served to Llama-3 for contextually grounded generation.",
      tech: "Llama-3 / GPT-4 / LangGraph",
      color: "from-pink-500 to-cyan-500",
      logs: [
        "[AGENT] Forwarding state to Llama-3 compiler node",
        "[LLM] Generative inference started (temp: 0.2)",
        "[LLM] Streaming response tokens... [Total: 84 tokens]",
        "[LLM] Synthesis complete. Stream closed.",
        "[API] Response status: 200 SUCCESS (latency: 152ms)"
      ]
    }
  ];

  // Rotate through pipeline steps in an animation loop to show flowing state
  useEffect(() => {
    const timer = setInterval(() => {
      setFlowPhase((prev) => {
        const nextPhase = (prev + 1) % 5;
        // Automatically match active node to flow phase for visual synching
        setActiveNode(nodes[nextPhase].id);
        return nextPhase;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Simulate typing effect in terminal logs
  useEffect(() => {
    const activeLogs = nodes.find(n => n.id === activeNode)?.logs || [];
    setTypedLogs([]);
    setCurrentLogIndex(0);

    let idx = 0;
    const logTimer = setInterval(() => {
      if (idx < activeLogs.length && activeLogs[idx] !== undefined) {
        setTypedLogs(prev => [...prev, activeLogs[idx]]);
        idx++;
        setCurrentLogIndex(idx);
      } else {
        clearInterval(logTimer);
      }
    }, 600);

    return () => clearInterval(logTimer);
  }, [activeNode]);

  return (
    <div className="w-full relative bg-zinc-950/40 border border-zinc-900/60 rounded-2xl p-6 md:p-8 overflow-hidden">
      {/* Background grid matrix lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:1.2rem_1.2rem] pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Interactive Diagram (Left side, takes 3/5 on large displays) */}
        <div className="flex-1 flex flex-col justify-between min-h-[380px] md:min-h-[420px] relative">
          
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Pipeline Simulation</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              Retrieval-Augmented Generation Architecture
            </h3>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Hover or click on the nodes to inspect each processing layer and witness live execution traces in the terminal console.
            </p>
          </div>

          {/* SVG Connection paths (absolute back layer) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
            <svg className="w-full h-full" style={{ minHeight: "400px" }}>
              <defs>
                <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#d946ef" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {/* Path connecting the nodes */}
              <path
                d="M 80 120 Q 200 240 320 240 T 560 380 T 800 240 T 960 120"
                fill="none"
                stroke="url(#line-grad)"
                strokeWidth="2"
                strokeDasharray="8 6"
              />
              
              {/* Flow particle animation */}
              <motion.circle
                r="4"
                fill="#06b6d4"
                filter="drop-shadow(0 0 8px #06b6d4)"
                style={{
                  offsetPath: `path("M 80 120 Q 200 240 320 240 T 560 380 T 800 240 T 960 120")`,
                  offsetDistance: "0%"
                } as any}
                animate={{
                  offsetDistance: "100%"
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </svg>
          </div>

          {/* Grid Layout of Pipeline nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 relative z-10 py-6">
            {nodes.map((node, index) => {
              const Icon = node.icon;
              const isActive = activeNode === node.id;
              const isFlowActive = flowPhase === index;

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  onMouseEnter={() => setActiveNode(node.id)}
                  className={`text-left relative flex flex-col p-4 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? "bg-zinc-900 border-indigo-500/40 border-[1.5px] shadow-[0_0_20px_rgba(99,102,241,0.12)] translate-y-[-4px]" 
                      : isFlowActive 
                        ? "bg-zinc-900/30 border-cyan-500/25 border"
                        : "bg-zinc-950/20 border-zinc-900/60 border hover:bg-zinc-900/40 hover:border-zinc-800"
                  }`}
                >
                  {/* Glowing core indicator */}
                  {isFlowActive && (
                    <span className="absolute top-2 right-2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                  )}
                  
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${node.color} text-white mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="text-zinc-600 text-[10px] font-mono mb-1">STEP 0{index + 1}</div>
                  <h4 className="text-sm font-semibold text-white tracking-wide">{node.label}</h4>
                  <div className="text-[11px] text-zinc-500 font-mono mt-2 line-clamp-1">{node.tech}</div>
                </button>
              );
            })}
          </div>

          {/* Core loop feedback detail */}
          <div className="grid grid-cols-2 gap-4 border-t border-zinc-900/60 pt-6">
            <div className="flex gap-3 bg-zinc-950/10 p-3 rounded-lg border border-zinc-900/60">
              <div className="p-2 rounded bg-zinc-900 text-indigo-400 h-9 w-9 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-semibold text-zinc-300">AI Agents Coordination</h5>
                <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">LangGraph State Routing</p>
              </div>
            </div>

            <div className="flex gap-3 bg-zinc-950/10 p-3 rounded-lg border border-zinc-900/60">
              <div className="p-2 rounded bg-zinc-900 text-indigo-400 h-9 w-9 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-semibold text-zinc-300">Tool Executions</h5>
                <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">Docker Sandboxed Workspaces</p>
              </div>
            </div>
          </div>

        </div>

        {/* 💻 Next-Level Tech Console & Terminal Logs (Right side, takes 2/5) */}
        <div className="w-full lg:w-[400px] flex flex-col justify-between gap-6">
          {/* Card node description */}
          <div className="bg-zinc-950/80 border border-zinc-900 rounded-xl p-6">
            <AnimatePresence mode="wait">
              {activeNode && (() => {
                const node = nodes.find(n => n.id === activeNode);
                if (!node) return null;
                const Icon = node.icon;
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 border-b border-zinc-900 pb-4 mb-4">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br ${node.color} text-white`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">{node.label}</h4>
                        <span className="text-[10px] font-mono text-indigo-400">{node.tech}</span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {node.details}
                    </p>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* Mac-style Live Terminal Console */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden flex-1 flex flex-col min-h-[220px]">
            {/* MacOS Window Control Buttons */}
            <div className="bg-zinc-900/60 px-4 py-2.5 flex items-center justify-between border-b border-zinc-900">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                <TerminalIcon className="w-3.5 h-3.5 text-zinc-500" />
                <span>rag_logger.sh</span>
              </div>
            </div>

            {/* Active Output logs display */}
            <div className="p-4 flex-1 font-mono text-[11px] text-cyan-400/90 leading-relaxed overflow-y-auto space-y-1">
              <AnimatePresence>
                {typedLogs.map((log, i) => (
                  <motion.div
                    key={`${log}-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={
                      log && log.includes("[SYS]") 
                        ? "text-zinc-500" 
                        : log && log.includes("[MODEL]") 
                          ? "text-purple-400"
                          : log && log.includes("[CHROMA]") 
                            ? "text-fuchsia-400" 
                            : log && log.includes("[RAG]")
                              ? "text-pink-400"
                              : "text-cyan-400"
                    }
                  >
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Pulsing blinking insertion cursor */}
              <div className="flex items-center gap-1 text-zinc-600 mt-2">
                <span>$</span>
                <span className="w-1.5 h-3.5 bg-zinc-500 animate-pulse" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
