import { 
  BrainCircuit, 
  Cpu, 
  Server, 
  Layout, 
  Database, 
  Wrench,
  LucideIcon
} from "lucide-react";

export interface Skill {
  name: string;
  category: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string; // Used to select which icon to display
  skills: string[];
}

export const skillsConfig: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    description: "Foundational predictive modeling, architectures, and optimization.",
    iconName: "BrainCircuit",
    skills: ["Python", "Machine Learning", "Deep Learning", "NLP", "Artificial Intelligence", "Generative AI"]
  },
  {
    title: "LLM Engineering",
    description: "Harnessing language models, cognitive architecture, and context synthesis.",
    iconName: "Cpu",
    skills: ["Large Language Models", "RAG", "LangChain", "AI Agents", "Prompt Engineering", "Vector Databases", "Embeddings"]
  },
  {
    title: "Backend Development",
    description: "Developing robust APIs and server side business logic.",
    iconName: "Server",
    skills: ["FastAPI", "REST APIs", "Python Backend Development"]
  },
  {
    title: "Frontend Development",
    description: "Building responsive, modern, and high-performance interactive interfaces.",
    iconName: "Layout",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Databases & Vector Stores",
    description: "Storing relational data and high-dimensional semantic vectors.",
    iconName: "Database",
    skills: ["SQL", "PostgreSQL", "ChromaDB"]
  },
  {
    title: "Development Tools",
    description: "Version control, containerization, and modern developer workflow tools.",
    iconName: "Wrench",
    skills: ["Git", "GitHub", "Docker"]
  }
];
