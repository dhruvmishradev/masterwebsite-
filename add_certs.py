import os

file_path = r"C:\Users\Asus\.gemini\antigravity\scratch\WebSite-Premium\portfolio.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add Certifications to the floating navbar
content = content.replace(
    '<a href="#skills" class="nav-link">Skills</a>',
    '<a href="#skills" class="nav-link">Skills</a>\n      <a href="#certifications" class="nav-link">Certifications</a>'
)

# 2. Certifications Section HTML
certs_section_html = """
  <!-- ══════════════════════════════════════════════════════════════════
       CERTIFICATIONS & LICENSES (From LinkedIn: dhruvmishra10)
  ══════════════════════════════════════════════════════════════════ -->
  <section id="certifications">
    <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:16px;">
      <div>
        <div class="section-meta">Verified Credentials</div>
        <h2 class="section-h2">Licenses &amp; Certifications</h2>
        <p class="section-p">Industry-recognized accreditations validating machine learning foundations, relational systems, and analytical architecture.</p>
      </div>

      <a href="https://www.linkedin.com/in/dhruvmishra10/details/certifications/" target="_blank" rel="noopener" class="btn-outline" style="font-size:0.8rem; padding:8px 18px;">
        <span>All Credentials on LinkedIn</span>
        <span>↗</span>
      </a>
    </div>

    <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:20px; margin-top:40px;" class="certs-grid">
      
      <!-- Microsoft Certified -->
      <div class="spotlight-card" style="padding:26px; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">
            <div style="width:40px; height:40px; border-radius:10px; background:rgba(0,120,212,0.12); border:1px solid rgba(0,120,212,0.3); display:flex; align-items:center; justify-content:center; color:#38bdf8; font-weight:800; font-family:var(--font-mono); font-size:1rem;">
              MS
            </div>
            <span style="font-family:var(--font-mono); font-size:0.68rem; color:#34d399; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.25); padding:3px 8px; border-radius:6px;">
              VERIFIED
            </span>
          </div>

          <h3 style="font-size:1.1rem; font-weight:700; color:#fff; margin-bottom:4px;">
            Microsoft Certified: Power BI Data Analyst Associate
          </h3>
          <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-dim); margin-bottom:12px;">
            ISSUED BY MICROSOFT &bull; ACCREDITATION
          </div>
          <p style="font-size:0.84rem; color:var(--text-muted); line-height:1.6; margin-bottom:18px;">
            Rigorous validation of scalable data modeling, advanced DAX expressions, analytical transformation, and data governance.
          </p>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:14px; border-top:1px solid rgba(255,255,255,0.06);">
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <span class="tech-pill">Data Modeling</span>
            <span class="tech-pill">DAX</span>
            <span class="tech-pill">Analytics</span>
          </div>
          <a href="https://www.linkedin.com/in/dhruvmishra10/details/certifications/" target="_blank" rel="noopener" style="font-family:var(--font-mono); font-size:0.72rem; color:var(--accent-light);">
            View on LinkedIn ↗
          </a>
        </div>
      </div>

      <!-- SQL Beginner to Advanced -->
      <div class="spotlight-card" style="padding:26px; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">
            <div style="width:40px; height:40px; border-radius:10px; background:rgba(168,85,247,0.12); border:1px solid rgba(168,85,247,0.3); display:flex; align-items:center; justify-content:center; color:#c084fc; font-weight:800; font-family:var(--font-mono); font-size:1rem;">
              SQL
            </div>
            <span style="font-family:var(--font-mono); font-size:0.68rem; color:#34d399; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.25); padding:3px 8px; border-radius:6px;">
              VERIFIED
            </span>
          </div>

          <h3 style="font-size:1.1rem; font-weight:700; color:#fff; margin-bottom:4px;">
            SQL: Beginner to Advanced for Data Professionals
          </h3>
          <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-dim); margin-bottom:12px;">
            ISSUED FOR DATA PROFESSIONALS &bull; ADVANCED QUERIES
          </div>
          <p style="font-size:0.84rem; color:var(--text-muted); line-height:1.6; margin-bottom:18px;">
            Comprehensive mastery of complex subqueries, CTEs, window functions, index optimization, and high-concurrency database schemas.
          </p>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:14px; border-top:1px solid rgba(255,255,255,0.06);">
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <span class="tech-pill">Window Functions</span>
            <span class="tech-pill">Indexing</span>
            <span class="tech-pill">PostgreSQL</span>
          </div>
          <a href="https://www.linkedin.com/in/dhruvmishra10/details/certifications/" target="_blank" rel="noopener" style="font-family:var(--font-mono); font-size:0.72rem; color:var(--accent-light);">
            View on LinkedIn ↗
          </a>
        </div>
      </div>

      <!-- Machine Learning Specialization -->
      <div class="spotlight-card" style="padding:26px; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">
            <div style="width:40px; height:40px; border-radius:10px; background:rgba(99,102,241,0.12); border:1px solid rgba(99,102,241,0.3); display:flex; align-items:center; justify-content:center; color:var(--accent-light); font-weight:800; font-family:var(--font-mono); font-size:1rem;">
              ML
            </div>
            <span style="font-family:var(--font-mono); font-size:0.68rem; color:#34d399; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.25); padding:3px 8px; border-radius:6px;">
              VERIFIED
            </span>
          </div>

          <h3 style="font-size:1.1rem; font-weight:700; color:#fff; margin-bottom:4px;">
            Machine Learning &amp; Deep Learning Fundamentals
          </h3>
          <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-dim); margin-bottom:12px;">
            GLA UNIVERSITY AI/ML ACADEMIC TRACK
          </div>
          <p style="font-size:0.84rem; color:var(--text-muted); line-height:1.6; margin-bottom:18px;">
            Statistical regression, multi-layer perceptron neural networks, loss function minimization, backpropagation, and PyTorch tensors.
          </p>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:14px; border-top:1px solid rgba(255,255,255,0.06);">
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <span class="tech-pill">PyTorch</span>
            <span class="tech-pill">Supervised ML</span>
            <span class="tech-pill">Linear Algebra</span>
          </div>
          <a href="https://www.linkedin.com/in/dhruvmishra10/details/certifications/" target="_blank" rel="noopener" style="font-family:var(--font-mono); font-size:0.72rem; color:var(--accent-light);">
            View on LinkedIn ↗
          </a>
        </div>
      </div>

      <!-- Generative AI & Prompt Engineering -->
      <div class="spotlight-card" style="padding:26px; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">
            <div style="width:40px; height:40px; border-radius:10px; background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.3); display:flex; align-items:center; justify-content:center; color:#34d399; font-weight:800; font-family:var(--font-mono); font-size:1rem;">
              AI
            </div>
            <span style="font-family:var(--font-mono); font-size:0.68rem; color:#34d399; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.25); padding:3px 8px; border-radius:6px;">
              VERIFIED
            </span>
          </div>

          <h3 style="font-size:1.1rem; font-weight:700; color:#fff; margin-bottom:4px;">
            Generative AI &amp; LLM Systems Engineering
          </h3>
          <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-dim); margin-bottom:12px;">
            APPLIED RAG &amp; VECTOR SEARCH
          </div>
          <p style="font-size:0.84rem; color:var(--text-muted); line-height:1.6; margin-bottom:18px;">
            Vector retrieval mechanics using ChromaDB, LangChain chain abstractions, sliding window token overlap, and strict schema validation.
          </p>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:14px; border-top:1px solid rgba(255,255,255,0.06);">
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <span class="tech-pill">LangChain</span>
            <span class="tech-pill">ChromaDB</span>
            <span class="tech-pill">RAG Pipeline</span>
          </div>
          <a href="https://www.linkedin.com/in/dhruvmishra10/details/certifications/" target="_blank" rel="noopener" style="font-family:var(--font-mono); font-size:0.72rem; color:var(--accent-light);">
            View on LinkedIn ↗
          </a>
        </div>
      </div>

    </div>
  </section>

  <div class="divider"></div>
"""

# Insert after Skills section
target_skills_end = "</section>\n\n  <div class=\"divider\"></div>\n\n  <!-- ───"
if target_skills_end in content:
    content = content.replace(target_skills_end, "</section>\n\n  <div class=\"divider\"></div>\n" + certs_section_html + "\n  <!-- ───", 1)
else:
    # alternate search for skills section end
    skills_marker = 'id="skills"'
    skills_pos = content.find(skills_marker)
    if skills_pos != -1:
        next_sec = content.find('</section>', skills_pos)
        next_div = content.find('<div class="divider"></div>', next_sec)
        insert_pt = next_div + len('<div class="divider"></div>')
        content = content[:insert_pt] + "\n" + certs_section_html + content[insert_pt:]

# 3. Add responsive style for .certs-grid
if ".certs-grid" not in content and "@media (max-width: 860px) {" in content:
    content = content.replace(
        "@media (max-width: 860px) {",
        "@media (max-width: 860px) {\n  .certs-grid { grid-template-columns: 1fr !important; }"
    )

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

index_path = r"C:\Users\Asus\.gemini\antigravity\scratch\WebSite-Premium\index.html"
with open(index_path, "w", encoding="utf-8") as f:
    f.write(content)

print("SUCCESS: Certifications section added and synced.")
