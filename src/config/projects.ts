export interface Project {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  video?: string;
  category: "Generative AI" | "AI & ML" | "Backend" | "Full-Stack";
  date: string;
  featured: boolean;
  status: "In Progress" | "Completed" | "Prototype";
  architecture?: {
    description: string;
    diagramSteps: string[];
  };
  challenges?: string;
  lessonsLearned?: string;
  futureImprovements?: string[];
}

export const projectsConfig: Project[] = [
  {
    title: "CineSage AI — Structured Movie Extractor",
    slug: "cinesage-ai",
    shortDescription: "An advanced movie metadata extraction and chat engine powered by Mistral AI, delivering structured, zero-hallucination film parsing.",
    description: "CineSage AI is a production-ready Generative AI movie metadata extraction system. It processes raw text synopses to extract structured factual metadata (directors, release date, cast, genres, plot points) using strict schema extraction from Mistral models. It also features MoodBot Chat, an conversational agent that recommends films based on user sentiments.",
    problem: "Factual information extraction from unstructured texts like synopses often results in hallucinations, incomplete fields, and unformatted text responses from standard LLM prompts.",
    solution: "We implement JSON schema-constrained generation using Mistral Large/Medium APIs with structured output specifications, guaranteeing zero-hallucination extraction of actors, directors, and narrative milestones.",
    technologies: ["Next.js", "Mistral AI", "Structured Generation", "TypeScript", "Tailwind CSS"],
    features: [
      "Metadata Extractor: Constrained JSON schema extraction from raw synopsis",
      "Model Parameter Controls: Custom temperature and API provider selection",
      "MoodBot Chat: Movie recommendation agent reacting to user emotional inputs",
      "OLED HUD Design: Sleek, high-contrast dark interface optimized for usability"
    ],
    githubUrl: "https://github.com/dhruvmishradev/Generative-AI",
    liveUrl: "https://generative-ai-cyan.vercel.app/",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop",
    category: "Generative AI",
    date: "July 2026",
    featured: true,
    status: "Completed",
    architecture: {
      description: "Structured JSON data extraction and routing pipeline.",
      diagramSteps: [
        "Unstructured Synopsis text ingestion",
        "Prompt formulation with Pydantic JSON schemas",
        "API Dispatch to Mistral API models",
        "Response validation and factual grounding check",
        "OLED UI parsing and MoodBot Recommendation routing"
      ]
    },
    challenges: "Handling multiple actors and cross-referenced summaries was initially prone to splitting errors and context truncation.",
    lessonsLearned: "I learned how to enforce strict JSON syntax boundaries on LLM generations and write validation parsers to catch schema mismatches.",
    futureImprovements: [
      "Integrate TMDB API validation checks",
      "Support batch uploading synopses files",
      "Extend chat memories using Vector Embeddings"
    ]
  },
  {
    title: "RAG Document Q&A System",
    slug: "rag-document-qa",
    shortDescription: "A custom RAG pipeline designed to ingest, chunk, and index PDF documents into ChromaDB, providing context-aware Q&A using LangChain.",
    description: "This is a Retrieval-Augmented Generation system. It implements custom semantic chunking, embeds text with HuggingFace embeddings, stores them in a local ChromaDB instance, and utilizes LangChain to structure prompts and interface with models like Llama-3.",
    problem: "Static LLMs suffer from hallucinations and lack access to private or newly updated documents. Manual document analysis is time-consuming for large datasets.",
    solution: "By building a local pipeline that dynamically extracts context from private PDFs, matches query embeddings via cosine similarity, and builds a rich prompt containing the documents, we guarantee contextually grounded answers.",
    technologies: ["Python", "FastAPI", "LangChain", "ChromaDB", "HuggingFace", "Llama-3"],
    features: [
      "Semantic-driven PDF parser and text chunker",
      "Vector search using ChromaDB and local embeddings",
      "Context-constrained prompts to prevent model hallucinations",
      "FastAPI backend serving real-time query endpoints"
    ],
    githubUrl: "https://github.com/dhruvmishradev",
    liveUrl: "", 
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    category: "Generative AI",
    date: "July 2026",
    featured: true,
    status: "Completed",
    architecture: {
      description: "Standard RAG architectural pipeline where documents are vectorized and retrieved.",
      diagramSteps: [
        "PDF Document Ingestion & Text Extraction",
        "Recursive Character Text Splitting (500 token overlap)",
        "Embedding Generation via HuggingFace SentenceTransformers",
        "Vector indexing in ChromaDB storage",
        "User Query -> Vector Match Retrieval",
        "Prompt formulation -> Llama-3 inference"
      ]
    },
    challenges: "Handling tables and image layouts inside PDF files created noisy chunks, which diluted the relevance of retrieved matches.",
    lessonsLearned: "I learned how to write custom document pre-processing scripts and configured hybrid search (combining dense vector search with sparse keyword search) to improve retrieval precision.",
    futureImprovements: [
      "Implement OCR capabilities for scanned documents",
      "Introduce query expansion to rewrite vague user questions",
      "Deploy the system in a lightweight Docker container"
    ]
  }
];
