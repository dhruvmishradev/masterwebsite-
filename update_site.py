import os

file_path = r"C:\Users\Asus\.gemini\antigravity\scratch\WebSite-Premium\portfolio.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Replace brand name dhruv.ai -> Dhruv Mishra
content = content.replace("<span>dhruv.ai</span>", "<span>Dhruv Mishra</span>")

# 2. Add About to desktop nav and mobile drawer
content = content.replace(
    '<a href="#projects" class="nav-link">Work</a>',
    '<a href="#about" class="nav-link">About</a>\n      <a href="#projects" class="nav-link">Work</a>'
)

# 3. Add responsive style for .about-grid
if "@media (max-width: 860px) {" in content and ".about-grid" not in content:
    content = content.replace(
        "@media (max-width: 860px) {",
        "@media (max-width: 860px) {\n  .about-grid { grid-template-columns: 1fr !important; gap: 24px !important; }"
    )

# 4. About section HTML
about_section_html = """
  <!-- ══════════════════════════════════════════════════════════════════
       ABOUT ME & CORE SKILLS SECTION
  ══════════════════════════════════════════════════════════════════ -->
  <section id="about">
    <div>
      <div class="section-meta">Background &amp; Philosophy</div>
      <h2 class="section-h2">About Me</h2>
      <p class="section-p">Bridging mathematical machine learning theory with robust, production-ready software engineering.</p>
    </div>

    <div class="about-grid" style="display:grid; grid-template-columns:1.2fr 0.8fr; gap:32px; margin-top:40px; align-items:start;">
      <!-- Story Card -->
      <div class="spotlight-card" style="padding:32px;">
        <div style="font-size:1.15rem; font-weight:700; color:#fff; line-height:1.5; margin-bottom:16px;">
          "I don't just study neural theory — I build functional, grounded implementations that solve real latency and reliability challenges."
        </div>
        <p style="color:var(--text-muted); font-size:0.92rem; line-height:1.75; margin-bottom:18px;">
          I am a Computer Science undergraduate specializing in Artificial Intelligence at GLA University, Mathura. My engineering focus centers on bridging mathematical modeling with rock-solid software practices: constructing index retrievers that anchor LLMs with verified sources, coding low-latency APIs in FastAPI, and structuring modular state graphs that allow agents to iteratively solve tasks in safe sandboxes.
        </p>
        <p style="color:var(--text-muted); font-size:0.92rem; line-height:1.75;">
          Whether it is eliminating hallucinations through deterministic schema parsing or accelerating embedding retrieval, I am dedicated to learning, testing, and shipping clean software.
        </p>

        <!-- Key Focus Areas checklist -->
        <div style="margin-top:28px; padding-top:24px; border-top:1px solid var(--border);">
          <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--text-dim); text-transform:uppercase; margin-bottom:14px; letter-spacing:0.05em;">Core Engineering Focus Areas</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div style="font-size:0.83rem; color:var(--text-main); display:flex; align-items:center; gap:8px;"><span style="color:#34d399;">●</span> Cognitive Architectures</div>
            <div style="font-size:0.83rem; color:var(--text-main); display:flex; align-items:center; gap:8px;"><span style="color:#34d399;">●</span> Retrieval-Augmented Data (RAG)</div>
            <div style="font-size:0.83rem; color:var(--text-main); display:flex; align-items:center; gap:8px;"><span style="color:#34d399;">●</span> Multi-Agent Orchestration</div>
            <div style="font-size:0.83rem; color:var(--text-main); display:flex; align-items:center; gap:8px;"><span style="color:#34d399;">●</span> Robust REST &amp; WebSocket APIs</div>
            <div style="font-size:0.83rem; color:var(--text-main); display:flex; align-items:center; gap:8px;"><span style="color:#34d399;">●</span> Interactive Full-Stack Builds</div>
            <div style="font-size:0.83rem; color:var(--text-main); display:flex; align-items:center; gap:8px;"><span style="color:#34d399;">●</span> High-Performance Algorithms &amp; DSA</div>
          </div>
        </div>
      </div>

      <!-- Core Skills Panel right beside About Me -->
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div class="spotlight-card" style="padding:26px;">
          <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--accent-light); margin-bottom:6px; letter-spacing:0.05em;">CORE SKILLS // ARSENAL</div>
          <div style="font-size:1.1rem; font-weight:800; color:#fff; margin-bottom:18px;">Primary Technologies</div>
          
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div>
              <div style="font-size:0.75rem; font-family:var(--font-mono); color:var(--text-dim); margin-bottom:8px;">AI, RAG &amp; ORCHESTRATION</div>
              <div style="display:flex; flex-wrap:wrap; gap:6px;">
                <span class="tech-pill">LangChain</span>
                <span class="tech-pill">LangGraph</span>
                <span class="tech-pill">ChromaDB</span>
                <span class="tech-pill">Llama-3</span>
                <span class="tech-pill">Mistral AI</span>
                <span class="tech-pill">PyTorch</span>
                <span class="tech-pill">HuggingFace</span>
              </div>
            </div>

            <div>
              <div style="font-size:0.75rem; font-family:var(--font-mono); color:var(--text-dim); margin-bottom:8px;">BACKEND &amp; DATA</div>
              <div style="display:flex; flex-wrap:wrap; gap:6px;">
                <span class="tech-pill">FastAPI</span>
                <span class="tech-pill">Python (Asyncio)</span>
                <span class="tech-pill">PostgreSQL</span>
                <span class="tech-pill">Redis</span>
                <span class="tech-pill">REST / WebSockets</span>
                <span class="tech-pill">Pydantic</span>
              </div>
            </div>

            <div>
              <div style="font-size:0.75rem; font-family:var(--font-mono); color:var(--text-dim); margin-bottom:8px;">FRONTEND &amp; DEVOPS</div>
              <div style="display:flex; flex-wrap:wrap; gap:6px;">
                <span class="tech-pill">Next.js</span>
                <span class="tech-pill">React</span>
                <span class="tech-pill">TypeScript</span>
                <span class="tech-pill">Tailwind CSS</span>
                <span class="tech-pill">Docker</span>
                <span class="tech-pill">Git</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Academic Bio -->
        <div class="spotlight-card" style="padding:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:0.88rem; font-weight:700; color:#fff;">GLA University, Mathura</div>
              <div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-dim);">B.Tech CSE &bull; AI/ML Track &bull; 2026</div>
            </div>
            <span style="font-family:var(--font-mono); font-size:0.68rem; color:#34d399; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.25); padding:4px 8px; border-radius:6px;">ACADEMIC</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="divider"></div>
"""

# Insert right after hero section divider
marker = "</section>\n\n  <div class=\"divider\"></div>"
if marker in content:
    content = content.replace(marker, marker + "\n" + about_section_html, 1)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

index_path = r"C:\Users\Asus\.gemini\antigravity\scratch\WebSite-Premium\index.html"
with open(index_path, "w", encoding="utf-8") as f:
    f.write(content)

print("SUCCESS: Portfolio updated with About Me and Core Skills, and brand set to Dhruv Mishra.")
