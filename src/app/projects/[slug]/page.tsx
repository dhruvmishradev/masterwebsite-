"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  ExternalLink, 
  Cpu, 
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Workflow,
  Wrench,
  HelpCircle,
  Sparkles
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projectsConfig } from "@/config/projects";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProjectCaseStudy() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  // Find project in central config
  const project = projectsConfig.find((p) => p.slug === slug);

  // If project not found, render fallback card
  if (!project) {
    return (
      <>
        <Navbar />
        <main className="flex-1 min-h-screen bg-black flex items-center justify-center px-6 py-24">
          <div className="glass-panel max-w-md w-full rounded-2xl p-8 text-center border-dashed border-zinc-800">
            <HelpCircle className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-white mb-2">Case Study Not Found</h1>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              The project case study you requested could not be resolved. It may have been renamed or removed.
            </p>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Catalog</span>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const isPlaceholder = project.title.includes("[PLACEHOLDER]");

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-black text-[#fafafa] pt-32 pb-24 relative overflow-hidden">
        {/* Background glow filters */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Back button */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>BACK TO GALLERY</span>
          </Link>

          {/* Case study Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-zinc-900 pb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-zinc-900 border border-white/5 text-[10px] font-mono text-cyan-400 mb-3">
                {project.category}
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                {project.title.replace("[PLACEHOLDER] ", "")}
              </h1>
              <p className="text-zinc-400 text-sm mt-3 max-w-2xl leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            {/* Links and Status Panel */}
            <div className="flex flex-wrap items-center gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2.5 px-4 rounded-lg bg-zinc-950/80 hover:bg-zinc-900 text-white font-medium text-xs border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Repository Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors shadow-lg shadow-indigo-600/10"
                >
                  <span>Launch Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Placeholder Notice */}
          {isPlaceholder && (
            <div className="flex items-start gap-3 bg-indigo-950/20 border border-indigo-500/15 p-4 rounded-xl mb-12">
              <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Configuration Notice</h4>
                <p className="text-xs text-indigo-300/80 leading-relaxed">
                  This page acts as a structured case study design. You can populate it with your actual project details, workflow, metrics, and architecture steps by modifying the project entry in <code className="text-indigo-200 font-semibold">src/config/projects.ts</code>.
                </p>
              </div>
            </div>
          )}

          {/* Project Media Showcase */}
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-zinc-950/40 border border-zinc-900 mb-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-full opacity-70"
            />
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Left Narrative Column (Takes 2 cols) */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Overview */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-indigo-500 rounded" />
                  <span>Project Overview</span>
                </h2>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Problem vs Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="bg-zinc-950/40 border border-zinc-900 rounded-xl p-5 md:p-6">
                  <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-1.5 mb-3">
                    <AlertTriangle className="w-4.5 h-4.5 text-amber-500" />
                    <span>THE CHALLENGE</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">Problem Statement</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="bg-zinc-950/40 border border-zinc-900 rounded-xl p-5 md:p-6">
                  <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-1.5 mb-3">
                    <Lightbulb className="w-4.5 h-4.5 text-indigo-400" />
                    <span>THE RESOLUTION</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">Engineered Solution</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Challenges & Lessons */}
              {(project.challenges || project.lessonsLearned) && (
                <div className="pt-4 space-y-6">
                  {project.challenges && (
                    <div>
                      <h2 className="text-xl font-bold text-white mb-3">Technical Hurdles</h2>
                      <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                        {project.challenges}
                      </p>
                    </div>
                  )}

                  {project.lessonsLearned && (
                    <div>
                      <h2 className="text-xl font-bold text-white mb-3">Lessons Learned</h2>
                      <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                        {project.lessonsLearned}
                      </p>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Right Sidebar Column (Takes 1 col) */}
            <div className="space-y-8">
              
              {/* Technology details */}
              <div className="glass-panel bg-zinc-950/20 rounded-xl p-6">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                  <Wrench className="w-4 h-4 text-cyan-400" />
                  <span>Technologies Utilized</span>
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-[#030303] border border-zinc-900 text-xs font-mono text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="glass-panel bg-zinc-950/20 rounded-xl p-6">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                  <CheckCircle className="w-4 h-4 text-indigo-400" />
                  <span>Key Features</span>
                </h3>

                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex gap-2.5 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                      <span className="text-xs text-zinc-400 leading-normal">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture Steps (if defined) */}
              {project.architecture && (
                <div className="glass-panel bg-zinc-950/20 rounded-xl p-6">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                    <Workflow className="w-4 h-4 text-purple-400" />
                    <span>System Workflow</span>
                  </h3>
                  <p className="text-[11px] text-zinc-500 mb-4">{project.architecture.description}</p>

                  <div className="relative border-l border-zinc-900 pl-4 space-y-4">
                    {project.architecture.diagramSteps.map((step, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute left-0 -translate-x-[20px] w-2.5 h-2.5 rounded-full bg-zinc-950 border border-zinc-800" />
                        <div className="text-[11px] font-mono text-indigo-400">STEP 0{idx + 1}</div>
                        <div className="text-xs text-zinc-300 mt-0.5 leading-normal">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Future Improvements */}
              {project.futureImprovements && project.futureImprovements.length > 0 && (
                <div className="glass-panel bg-zinc-950/20 rounded-xl p-6">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                    <Cpu className="w-4 h-4 text-amber-500" />
                    <span>Future Roadmap</span>
                  </h3>

                  <ul className="space-y-2">
                    {project.futureImprovements.map((imp, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-xs text-zinc-400">
                        <span className="font-mono text-zinc-600">0{idx + 1}.</span>
                        <span className="leading-normal">{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
