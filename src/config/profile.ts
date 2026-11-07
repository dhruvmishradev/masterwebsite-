export interface FocusArea {
  title: string;
  desc: string;
}

export interface AboutMe {
  story: string;
  focusAreas: FocusArea[];
}

export interface ProfileConfig {
  name: string;
  role: string;
  headline: string;
  university: string;
  specialization: string;
  email: string;
  github: string;
  linkedin: string;
  aboutMe: AboutMe;
}

export const profileConfig: ProfileConfig = {
  name: "Dhruv Mishra",
  role: "AI Systems Engineer",
  headline: "Building Grounded RAG & Agentic Architectures",
  university: "GLA University",
  specialization: "Artificial Intelligence & Systems",
  email: "dhruvmishrain.dev@gmail.com",
  github: "https://github.com/dhruvmishradev",
  linkedin: "https://www.linkedin.com/in/dhruvmishra10",
  aboutMe: {
    story:
      "I am a Computer Science undergraduate specializing in Artificial Intelligence at GLA University. I construct index retrievers that anchor LLMs with verified sources, code low-latency microservices in FastAPI, and structure modular state graphs that allow agents to iterate on code sandboxes.",
    focusAreas: [
      {
        title: "Production RAG Pipelines",
        desc: "Deterministic document retrieval using LangChain, ChromaDB, and FAISS with zero-hallucination verification.",
      },
      {
        title: "Agentic Workflows",
        desc: "Stateful multi-step agent loops with LangGraph, tool calling, and schema validation.",
      },
      {
        title: "FastAPI Microservices",
        desc: "Asynchronous RESTful APIs and low-latency backends in Python.",
      },
      {
        title: "Vector Indexing",
        desc: "Hybrid dense and sparse semantic search with cross-encoder reranking.",
      },
      {
        title: "Modern Frontend",
        desc: "Minimalist tier-1 interfaces in Next.js, React, and Tailwind CSS.",
      },
      {
        title: "Database Optimization",
        desc: "Relational database architecture, complex SQL indexing, and analytics.",
      },
    ],
  },
};
