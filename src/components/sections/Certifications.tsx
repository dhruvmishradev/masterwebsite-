"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Award, CheckCircle2 } from "lucide-react";

interface Cert {
  title: string;
  issuer: string;
  detail: string;
  skills: string[];
  link: string;
}

const certsList: Cert[] = [
  {
    title: "Microsoft Certified: Power BI Data Analyst Associate",
    issuer: "Microsoft",
    detail: "Demonstrated advanced business intelligence, data modeling, DAX query optimization, and enterprise dashboard architecture.",
    skills: ["Power BI", "DAX", "Data Modeling", "Business Intelligence"],
    link: "https://www.linkedin.com/in/dhruvmishra10",
  },
  {
    title: "SQL (Beginner to Advanced) - Complete Database Mastery",
    issuer: "Database Engineering Track",
    detail: "Mastered complex relational joins, CTEs, subqueries, analytical window functions, query execution planning, and database normalization.",
    skills: ["PostgreSQL", "SQL Optimization", "Relational Architecture", "CTEs"],
    link: "https://www.linkedin.com/in/dhruvmishra10",
  },
  {
    title: "Machine Learning & Deep Learning Fundamentals",
    issuer: "GLA University / AI Track",
    detail: "Rigorous mathematical foundation in linear algebra, gradient descent algorithms, loss landscapes, backpropagation, and multi-layer perceptron neural networks.",
    skills: ["Neural Networks", "Gradient Descent", "Loss Optimization", "PyTorch"],
    link: "https://www.linkedin.com/in/dhruvmishra10",
  },
  {
    title: "Generative AI Systems & LLM Engineering",
    issuer: "Advanced AI Systems",
    detail: "Deep specialization in prompt engineering patterns, vector embedding latent spaces, retrieval-augmented generation architectures, and agentic state loops.",
    skills: ["LangChain", "Vector Embeddings", "RAG Systems", "Agent Graphs"],
    link: "https://www.linkedin.com/in/dhruvmishra10",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <span className="tag tag-indigo mb-6 inline-flex">Credentials &amp; Licenses</span>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.1]"
          >
            Verified<br />
            <span className="text-gradient">Certifications</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
            className="text-zinc-500 text-sm max-w-sm leading-relaxed"
          >
            Verified industry credentials across data analytics, database engineering, and machine learning architectures.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certsList.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={idx * 0.1}
              className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono">
                    <Award className="w-4 h-4 text-indigo-400" />
                    <span>{cert.issuer}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>

                <h3 className="text-white font-bold text-base mb-2 group-hover:text-indigo-300 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                  {cert.detail}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                >
                  <span>Verify on LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
