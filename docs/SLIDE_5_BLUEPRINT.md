# 📊 Google Slides: Slide 5 Production Layout Blueprint

Use this blueprint to build your deployment, CI/CD, and reliability slide in Google Slides or Keynote.

---

## 🎨 Visual Layout & Theme Variables

* **Background Canvas Color:** Parchment Cream (`#F7F4EB`)
* **Visual Layout Element:** A clean grid featuring two distinct data cards (`#FFFFFF` background with a solid 1px `#1E242B` line).
* **Left Card:** Labeled `FRONTEND HOSTING PIPELINE`.
* **Right Card:** Labeled `BACKEND RELIABILITY NODE`.

---

## 📝 On-Slide Text Fields

```text
[TOP LEFT METADATA LABEL - 11pt Roboto Mono - Cyan Color (#00A8B5)]
SECTION 05 // SYSTEM TOPOLOGY AND INFRASTRUCTURE DEPLOYMENT

[MAIN TITLE - 32pt Cinzel Bold - Deep Ink Color (#1E242B)]
DEPLOYMENT & CLOUD TOPOLOGY

[LEFT CARD - EDGE PLATFORM ROUTING - 13pt Body Text]
• Framework Stack: Web-optimized Flutter compiled directly to native JS/WASM.
• Automation CI/CD: Automated GitHub Actions pushing production code directly onto GitHub Pages hosting.
• Zero Asset Overhead: Uses custom canvas layout calculations instead of loading high-density WebGL models.

[RIGHT CARD - BACKEND INFRASTRUCTURE STACK - 13pt Body Text]
• Application Server: High-performance Python FastAPI engine running on Render cloud architecture.
• Client Resilience: Integrated local fail-safe circuit breaker embedded in the API Client class.
• Cold-Start Strategy: Instantly falls back to local JSON schemas to guarantee a fast page load for reviewers.
```

---

## 🎙️ Speaker Notes (Paste directly into Slide 5 notes)

> "Slide 5 transitions our architecture from a local prototype into a live, production-ready cloud deployment portfolio. The production web pipeline utilizes an automated GitHub Actions suite that compiles our code into web assets and hosts them directly on GitHub Pages. For the backend infrastructure, our FastAPI server runs on Render, communicating via strict REST endpoints with Google AI Studio. Most importantly, I have engineered for the realities of cloud hosting: if the backend server experiences a cold start or latency spike, a client-side circuit breaker automatically drops back to a pre-cached JSON payload. This ensures that when an engineering manager evaluates the portfolio site, it loads instantly and runs flawlessly without ever throwing a broken network exception."
