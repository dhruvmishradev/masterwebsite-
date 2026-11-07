import os

files = [
    r"C:\Project\WebSite\index.html",
    r"C:\Project\WebSite\portfolio.html",
    r"C:\Users\Asus\.gemini\antigravity\scratch\WebSite-Premium\index.html",
    r"C:\Users\Asus\.gemini\antigravity\scratch\WebSite-Premium\portfolio.html"
]

terminal_section_html = """
  <!-- ══════════════════════════════════════════════════════════════════
       INTERACTIVE ON-SITE TERMINAL (Tells everything about Dhruv's work)
  ══════════════════════════════════════════════════════════════════ -->
  <section id="terminal-section">
    <div>
      <div class="section-meta">Interactive Command Line</div>
      <h2 class="section-h2">Dhruv Mishra <span class="hero-title-accent">Terminal CLI</span></h2>
      <p class="section-p">Type commands or click the shortcut chips below to query everything about my work, engineering philosophy, and background.</p>
    </div>

    <!-- Terminal Container -->
    <div style="margin-top:36px; border-radius:18px; background:#07070a; border:1px solid rgba(255,255,255,0.12); box-shadow:0 30px 80px -15px rgba(0,0,0,0.9), 0 0 35px -5px rgba(99,102,241,0.25); overflow:hidden; font-family:var(--font-mono);">
      
      <!-- Terminal Header Bar -->
      <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 18px; background:rgba(255,255,255,0.03); border-bottom:1px solid rgba(255,255,255,0.08);">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="width:11px; height:11px; border-radius:50%; background:#ef4444; display:inline-block;"></span>
          <span style="width:11px; height:11px; border-radius:50%; background:#f59e0b; display:inline-block;"></span>
          <span style="width:11px; height:11px; border-radius:50%; background:#10b981; display:inline-block;"></span>
          <span style="font-size:0.75rem; color:var(--text-dim); margin-left:8px;">guest@dhruv-mishra:~ (bash)</span>
        </div>
        <div style="font-size:0.68rem; color:#34d399; font-weight:600;">
          ● SHELL ACTIVE &bull; UTF-8
        </div>
      </div>

      <!-- Quick Command Buttons Bar -->
      <div style="display:flex; align-items:center; gap:8px; padding:12px 18px; background:rgba(255,255,255,0.015); border-bottom:1px solid rgba(255,255,255,0.05); flex-wrap:wrap;">
        <span style="font-size:0.68rem; color:var(--text-dim); text-transform:uppercase;">Quick Commands:</span>
        <button onclick="runTermCmd('whoami')" class="tech-pill" style="cursor:pointer; color:#38bdf8; border-color:rgba(56,189,248,0.3); background:rgba(56,189,248,0.06);">whoami</button>
        <button onclick="runTermCmd('about')" class="tech-pill" style="cursor:pointer; color:#818cf8; border-color:rgba(129,140,248,0.3); background:rgba(129,140,248,0.06);">about</button>
        <button onclick="runTermCmd('skills')" class="tech-pill" style="cursor:pointer; color:#c084fc; border-color:rgba(192,132,252,0.3); background:rgba(192,132,252,0.06);">skills</button>
        <button onclick="runTermCmd('projects')" class="tech-pill" style="cursor:pointer; color:#34d399; border-color:rgba(52,211,153,0.3); background:rgba(52,211,153,0.06);">projects</button>
        <button onclick="runTermCmd('certs')" class="tech-pill" style="cursor:pointer; color:#f59e0b; border-color:rgba(245,158,11,0.3); background:rgba(245,158,11,0.06);">certs</button>
        <button onclick="runTermCmd('contact')" class="tech-pill" style="cursor:pointer; color:#e4e4e7; border-color:rgba(255,255,255,0.2);">contact</button>
        <button onclick="runTermCmd('clear')" class="tech-pill" style="cursor:pointer; color:#ef4444; border-color:rgba(239,68,68,0.3); background:rgba(239,68,68,0.06);">clear</button>
      </div>

      <!-- Terminal Output Screen -->
      <div id="term-screen" style="padding:22px; min-height:280px; max-height:440px; overflow-y:auto; font-size:0.8rem; line-height:1.65; color:#e4e4e7;">
        <div style="color:var(--text-dim); margin-bottom:12px;">
          Dhruv Mishra Portfolio Terminal [Version 2.4.0]<br/>
          (c) 2026 Dhruv Mishra. All engineering specs loaded.<br/>
          Type <span style="color:#38bdf8;">'help'</span> or click any shortcut chip above to inspect my work.
        </div>
        <div id="term-history"></div>
      </div>

      <!-- Terminal Input Line -->
      <div style="display:flex; align-items:center; gap:10px; padding:14px 20px; background:rgba(0,0,0,0.6); border-top:1px solid rgba(255,255,255,0.06);">
        <span style="color:#34d399; font-weight:700;">dhruv@dev:~$</span>
        <input type="text" id="term-input" placeholder="type a command (e.g. whoami, about, skills, projects, certs, help)..." autocomplete="off" spellcheck="false" style="flex:1; background:transparent; border:none; outline:none; color:#fff; font-family:var(--font-mono); font-size:0.82rem; caret-color:#34d399;"/>
        <button onclick="handleTermSubmit()" class="tech-pill" style="cursor:pointer; background:var(--accent); color:#fff; border:none; font-weight:600; padding:4px 12px;">Run</button>
      </div>

    </div>
  </section>

  <div class="divider"></div>
"""

terminal_script_js = """
/* ─────────────────────────────────────────────────────────────
   ON-SITE INTERACTIVE TERMINAL LOGIC
───────────────────────────────────────────────────────────── */
const termCommands = {
  'help': `
<span style="color:#38bdf8; font-weight:bold;">AVAILABLE SYSTEM COMMANDS:</span>
  <span style="color:#818cf8;">whoami</span>        - Quick identity and professional summary
  <span style="color:#818cf8;">about</span>         - Detailed story, academic background, philosophy
  <span style="color:#818cf8;">skills</span>        - Technical stack across AI, backend, and frontend
  <span style="color:#818cf8;">projects</span>      - Production systems (CineSage AI, RAG Document Q&A)
  <span style="color:#818cf8;">certs</span>         - Verified LinkedIn licenses & Microsoft credentials
  <span style="color:#818cf8;">architecture</span>  - How vector retrieval and deterministic extraction work
  <span style="color:#818cf8;">contact</span>       - Direct email, GitHub, and LinkedIn channels
  <span style="color:#818cf8;">clear</span>         - Clear the terminal screen
`,
  'whoami': `
<span style="color:#34d399; font-weight:bold;">Dhruv Mishra</span> &bull; AI &amp; Machine Learning Developer
Location: GLA University, Mathura (UTC+05:30)
Specialization: Retrieval-Augmented Generation (RAG) &amp; Agentic Graphs
Status: <span style="color:#34d399;">● Available for Select Projects &amp; Internships</span>
`,
  'about': `
<span style="color:#c084fc; font-weight:bold;">[ABOUT DHRUV MISHRA]</span>
I am a Computer Science undergraduate specializing in Artificial Intelligence at GLA University.
I don't just study neural theory — I build functional implementations:
&bull; Constructing index retrievers that anchor LLMs with verified sources
&bull; Coding low-latency microservices in FastAPI
&bull; Structuring modular state graphs that allow agents to iterate on code sandboxes
Dedicated to learning, testing, and shipping clean software.
`,
  'skills': `
<span style="color:#f59e0b; font-weight:bold;">[TECHNICAL MATRIX]</span>
&bull; <span style="color:#818cf8;">AI &amp; LLM Orchestration:</span> LangChain, LangGraph, ChromaDB, Llama-3, Mistral AI, HuggingFace, PyTorch
&bull; <span style="color:#818cf8;">Backend &amp; Microservices:</span> FastAPI, Python (Asyncio), PostgreSQL, Redis, RESTful, WebSockets, Pydantic
&bull; <span style="color:#818cf8;">Frontend &amp; UI:</span> Next.js, React, TypeScript, Tailwind CSS, Turbopack
&bull; <span style="color:#818cf8;">DevOps &amp; Tools:</span> Docker, Git, Linux, GitHub Actions, CI/CD
`,
  'projects': `
<span style="color:#34d399; font-weight:bold;">[FEATURED PRODUCTION WORK]</span>
1. <span style="color:#fff; font-weight:bold;">CineSage AI &bull; Structured Movie Extractor</span>
   - Mistral AI JSON schema enforcement, zero-hallucination film parsing
   - Live URL: <a href="https://generative-ai-cyan.vercel.app/" target="_blank" style="color:#38bdf8;">https://generative-ai-cyan.vercel.app/ ↗</a>
   - Repository: <a href="https://github.com/dhruvmishradev/Generative-AI" target="_blank" style="color:#38bdf8;">github.com/dhruvmishradev/Generative-AI ↗</a>

2. <span style="color:#fff; font-weight:bold;">RAG Document Q&A System</span>
   - PDF chunking, ChromaDB vector search, HuggingFace dense embeddings
   - Real-time grounded answers with Llama-3
`,
  'certs': `
<span style="color:#f59e0b; font-weight:bold;">[VERIFIED CERTIFICATIONS &amp; LICENSES]</span>
&bull; <span style="color:#fff;">Microsoft Certified: Power BI Data Analyst Associate</span> (Issued by Microsoft)
&bull; <span style="color:#fff;">SQL: Beginner to Advanced for Data Professionals</span>
&bull; <span style="color:#fff;">Machine Learning &amp; Deep Learning Fundamentals</span> (PyTorch &amp; ML Track)
&bull; <span style="color:#fff;">Generative AI &amp; LLM Systems Engineering</span> (LangChain &amp; Vector Search)
Verify directly on LinkedIn: <a href="https://www.linkedin.com/in/dhruvmishra10/details/certifications/" target="_blank" style="color:#38bdf8;">linkedin.com/in/dhruvmishra10/details/certifications/ ↗</a>
`,
  'architecture': `
<span style="color:#c084fc; font-weight:bold;">[HOW MY AI SYSTEMS WORK]</span>
1. Ingestion: Raw PDF/text chunking with 500-token sliding overlap.
2. Embedding: 384-dimension vector mapping via HuggingFace SentenceTransformers.
3. Indexing: ChromaDB HNSW dense vector space.
4. Retrieval: Cosine similarity Top-K nearest neighbors.
5. Synthesis: Pydantic JSON schema prompt formulation to guarantee zero hallucination.
`,
  'contact': `
<span style="color:#38bdf8; font-weight:bold;">[GET IN TOUCH]</span>
&bull; Email:    <a href="mailto:dhruvmishrain.dev@gmail.com" style="color:#38bdf8;">dhruvmishrain.dev@gmail.com</a>
&bull; GitHub:   <a href="https://github.com/dhruvmishradev" target="_blank" style="color:#38bdf8;">github.com/dhruvmishradev ↗</a>
&bull; LinkedIn: <a href="https://www.linkedin.com/in/dhruvmishra10" target="_blank" style="color:#38bdf8;">linkedin.com/in/dhruvmishra10 ↗</a>
`,
  'sudo': `<span style="color:#ef4444;">Permission denied: you do not have root access on Dhruv's machine 😉</span>`
};

function runTermCmd(cmd) {
  cmd = cmd.trim().toLowerCase();
  const history = document.getElementById('term-history');
  const screen = document.getElementById('term-screen');

  if (cmd === 'clear') {
    history.innerHTML = '';
    return;
  }

  const promptLine = `
    <div style="margin-top:10px;">
      <span style="color:#34d399; font-weight:700;">dhruv@dev:~$</span> 
      <span style="color:#fff;">${cmd}</span>
    </div>
  `;

  let response = termCommands[cmd];
  if (!response) {
    response = `<div style="color:#ef4444;">command not found: ${cmd}. Type <span style="color:#38bdf8;">'help'</span> to see available commands.</div>`;
  }

  history.innerHTML += promptLine + `<div>${response}</div>`;
  screen.scrollTop = screen.scrollHeight;
}

function handleTermSubmit() {
  const input = document.getElementById('term-input');
  const cmd = input.value;
  if (!cmd) return;
  runTermCmd(cmd);
  input.value = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('term-input');
  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        handleTermSubmit();
      }
    });
  }
});
"""

for path in files:
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            c = f.read()
        
        # 1. Update navigation to include Terminal
        if '<a href="#terminal-section"' not in c:
            c = c.replace(
                '<a href="#about" class="nav-link">About</a>',
                '<a href="#about" class="nav-link">About</a>\n      <a href="#terminal-section" class="nav-link">Terminal</a>'
            )

        # 2. Add terminal section right after about section
        target_after_about = '</section>\n\n  <div class="divider"></div>'
        # find the one after about
        about_idx = c.find('id="about"')
        if about_idx != -1 and 'id="terminal-section"' not in c:
            next_sec = c.find('</section>', about_idx)
            next_div = c.find('<div class="divider"></div>', next_sec)
            insert_pt = next_div + len('<div class="divider"></div>')
            c = c[:insert_pt] + "\n" + terminal_section_html + c[insert_pt:]

        # 3. Add JS script before </script>
        if "termCommands" not in c:
            c = c.replace("</script>", terminal_script_js + "\n</script>")

        with open(path, "w", encoding="utf-8") as f:
            f.write(c)
        print(f"Updated {path} with on-site interactive terminal!")

print("ALL FILES UPDATED!")
