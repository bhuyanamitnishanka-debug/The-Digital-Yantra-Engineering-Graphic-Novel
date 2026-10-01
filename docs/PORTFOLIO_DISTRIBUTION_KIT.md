# 🌐 Multi-Channel Portfolio Distribution Kit

This kit includes resources for distributing **The Digital Yantra** across social, web, and presentation channels:
1. **Interactive HTML5 Landing Page** (`standalone_landing_page.html`)
2. **LinkedIn Announcement Template**
3. **Google Slides Speaker Notes & Presentation Description**
4. **Production Git Push & Deployment Commands**

---

## 🖥️ 1. Standalone Web Landing Page
A self-contained, single-file HTML5/CSS3/JavaScript portfolio layout located at:
[`/standalone_landing_page.html`](../standalone_landing_page.html)

**Highlights:**
- Zero dependencies: runs locally by double-clicking in any browser.
- Interactive parameter sliders: Camera Visor Scale, Chassis Curvature Radius, Exploded Anatomy Split.
- Real-time 60 FPS HTML5 canvas vector rendering matching the Talamana grid and exploded PCB chassis.

---

## 💼 2. Accompanying LinkedIn Project Announcement
Copy and paste this high-engagement announcement to showcase this system design to your professional network:

```markdown
🚀 Re-imagining Mobile Hardware Documentation via Google AI Studio

How do we bridge the massive gap between raw mechanical engineering data (CAD coordinates, PCB trace grids, tolerances) and human-centric product storytelling?

Traditionally, engineering data lives in cold silos while product marketing abstracts hardware entirely. For my latest project, I wanted to merge these worlds together using full-stack system architecture.

Introducing 📜 The Digital Yantra — an interactive engineering visual novel platform.

The core concept fuses traditional Indian iconometry (Talamana Padhati / Shilpa Shastras) with modern industrial CAD constraints, unrolling a vertical parchment layout across three structural tiers:
1️⃣ The Talamana Genesis (Parametric Invariant Grids)
2️⃣ Yantra Deconstruction (High-Precision Exploded Assemblies)
3️⃣ The Polished Pratima (Materialized Monolithic Form)

🛠️ Behind the Tech Stack:
• Backend: FastAPI parsing complex device dimensions and piping them directly to Google AI Studio.
• AI Core Engine: Gemini 3.8 Flash / 1.5 Pro orchestrated using strict JSON Schema structured outputs—eliminating LLM schema drift or text formatting hallucinations.
• Frontend Viewport: Flutter Web running a high-performance CustomPainter layout that dynamically calculates and renders vector grid geometry at 60 FPS.
• Portfolio Fail-Safe: An asynchronous local circuit-breaker client that serves cached mock payloads during server cold starts, guaranteeing 100% platform uptime for recruiters.

Instead of writing another dry repository, I built this to demonstrate complete full-stack design control: from model constraints and API data contracts down to fluid browser rendering.

👉 Check out the live interactive applet, presentation deck, and full open-source repo:
GitHub: https://github.com/bhuyanamitnishanka/digital-yantra

#SystemsEngineering #ProductDesign #FlutterWeb #GoogleAIStudio #Gemini #FastAPI #FullStack #HardwareDesign #Portfolio
```

---

## 📊 3. Google Slides Speaker Notes & Presentation Description
Paste this text block into the "Speaker Notes" panel or the core description container inside your Google Slides file (`the_digital_yantra_deck.pptx`):

```text
PRESENTATION SYSTEM SUMMARY // PROJECT: THE DIGITAL YANTRA

[SLIDE INTENT]
This presentation outlines a production-ready web application architecture that addresses technical communication bottlenecks in mobile hardware product lifecycles. It demonstrates how to utilize Google AI Studio foundation models to systematically parse complex mechanical data and render it as structured human-centric visual content.

[KEY PLATFORM ANCHORS FOR THE SPEAKER]
- Slide 1-2 (Context): Emphasize that "The Digital Yantra" treats hardware engineering layout choices not as random cosmetic details, but as strict continuations of geometric constraints—mapping historical iconometric measurement methods (Talamana) to modern CAD parametric coordinates.
- Slide 3-4 (AI Engineering Core): Explicitly point out the technical implementation of Google AI Studio SDK configuration parameter choices. The architecture enforces zero-markdown response rules via strict JSON Schemas. This design eliminates runtime formatting errors and converts unstructured LLM capabilities into deterministic data feeds.
- Slide 5-6 (Performance and Scale): Explain how the frontend architecture avoids performance penalties on web viewports. By substituting resource-heavy 3D mesh loads with declarative canvas math, the UI remains perfectly performant on baseline mobile devices. Highlight the client-side mock network fallback layer engineered specifically to deliver zero-downtime application interactions for review panels.
```

---

## 🚀 4. Terminal Commands: Immediate GitHub & Cloud Deployment

Assuming GitHub username `bhuyanamitnishanka` and repo name `digital-yantra`:

```bash
# 1. Initialize git (if not already initialized) and stage all files
git init
git add .
git commit -m "feat: initial commit of The Digital Yantra architecture, cloud deployers, and presentation deck"

# 2. Add your remote GitHub repository
git remote add origin https://github.com/bhuyanamitnishanka/digital-yantra.git
git branch -M main

# 3. Push code to GitHub
git push -u origin main

# 4. Trigger GitHub Pages for Flutter Web
# The included GitHub Action (.github/workflows/deploy.yml) will automatically compile
# digital_yantra_frontend/ and deploy to the gh-pages branch.
# In GitHub Repo Settings -> Pages -> Source, set branch to 'gh-pages' / '(root)'.

# 5. Deploy FastAPI Backend on Render
# In Render Dashboard: New -> Blueprint -> Connect 'digital-yantra' repo.
# Render automatically detects render.yaml and provisions the FastAPI service.
# Add your GEMINI_API_KEY securely in Environment Variables.
```
