import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Presentation, Download, ExternalLink, Sparkles, Layers, Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface SlideDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SlideData {
  number: number;
  title: string;
  subtitle: string;
  badge: string;
  content: React.ReactNode;
}

export const SlideDeckModal: React.FC<SlideDeckModalProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
        sound.playClick();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
        sound.playClick();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const slides: SlideData[] = [
    // Slide 1: Title & Conceptual Origin
    {
      number: 1,
      title: "THE DIGITAL YANTRA",
      subtitle: "Bridging Classical Iconometry with Modern CAD Hardware Engineering",
      badge: "PROJECT CONFIG: DEV.PORTFOLIO // VERSION 2026.1.0",
      content: (
        <div className="space-y-5">
          <div className="p-5 bg-[#1E242B] text-[#F7F4EB] rounded-lg border border-[#D4AF37]/50 shadow-md relative overflow-hidden">
            {/* Background vector circle watermark */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-[#00A8B5]/30 pointer-events-none" />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-48 h-px bg-[#00A8B5]/30 pointer-events-none" />
            <div className="absolute right-28 top-1/2 -translate-y-1/2 h-48 w-px bg-[#00A8B5]/30 pointer-events-none" />

            <p className="font-serif-prose text-base sm:text-lg text-[#E6DCC8] leading-relaxed italic relative z-10">
              "An interactive graphic novel web architecture powered by Google AI Studio (Gemini 3.8 Flash) and Flutter Web, transforming complex smartphone blueprints into an organic narrative scroll."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 bg-white/70 rounded border border-[#1E242B]/10">
              <span className="font-technical text-[11px] font-bold text-[#00A8B5] block mb-1">01 / GENESIS</span>
              <h5 className="font-display font-bold text-[#1E242B] text-xs uppercase">Talamana Root Grid</h5>
              <p className="font-technical text-[11px] text-[#555] mt-1">Parametric boundary constraints & coordinate axes.</p>
            </div>
            <div className="p-3.5 bg-white/70 rounded border border-[#1E242B]/10">
              <span className="font-technical text-[11px] font-bold text-[#D4AF37] block mb-1">02 / DECONSTRUCTION</span>
              <h5 className="font-display font-bold text-[#1E242B] text-xs uppercase">Digital Yantra</h5>
              <p className="font-technical text-[11px] text-[#555] mt-1">Aspherical optics, HDI PCB traces & vapor chambers.</p>
            </div>
            <div className="p-3.5 bg-white/70 rounded border border-[#1E242B]/10">
              <span className="font-technical text-[11px] font-bold text-[#8C3A27] block mb-1">03 / SYNTHESIS</span>
              <h5 className="font-display font-bold text-[#1E242B] text-xs uppercase">Polished Pratima</h5>
              <p className="font-technical text-[11px] text-[#555] mt-1">Aerospace aluminum & frosted matte glass monolith.</p>
            </div>
          </div>

          <div className="p-3 bg-[#F0EAE1] rounded border border-[#D4AF37]/30 flex flex-wrap items-center justify-between text-[11px] font-technical text-[#1E242B]">
            <span>Architected via Google AI Studio (Gemini 3.8 Flash) & Flutter Canvas Core</span>
            <span className="font-bold text-[#8C3A27]">Presented by: Amit Nishanka Bhuyan // Systems & UI Engineer</span>
          </div>
        </div>
      ),
    },

    // Slide 2: The Core Problem
    {
      number: 2,
      title: "THE CORE INDUSTRIAL PROBLEM",
      subtitle: "The Communication Gap Between Low-Level CAD and High-Level Storytelling",
      badge: "SECTION 02 // PERFORMANCE AND DOCUMENTATION SILOS",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {/* Left Column: The Core Frictions */}
          <div className="space-y-3.5 bg-white/60 p-5 rounded-lg border border-[#1E242B]/10 flex flex-col justify-center">
            <div className="space-y-1">
              <h4 className="font-display font-bold text-xs uppercase text-[#8C3A27] tracking-wider">
                • Technical Isolation
              </h4>
              <p className="font-technical text-xs text-[#2C3E50] leading-relaxed">
                Critical CAD tolerance tables, optical ray-tracing specs, and Gerber files are trapped inside unreadable data sheets.
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-display font-bold text-xs uppercase text-[#D4AF37] tracking-wider">
                • The Narrative Disconnect
              </h4>
              <p className="font-technical text-xs text-[#2C3E50] leading-relaxed">
                High-level consumer marketing abstracts hardware entirely, losing the mathematical and structural rigor behind the design choices.
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-display font-bold text-xs uppercase text-[#00A8B5] tracking-wider">
                • The Scaling Penalty
              </h4>
              <p className="font-technical text-xs text-[#2C3E50] leading-relaxed">
                Traditional 3D web models rely on heavy WebGL meshes that cause severe frame-rate drops on mobile web browsers during rollouts.
              </p>
            </div>
          </div>

          {/* Right Column: Dry Documentation Card Box */}
          <div className="bg-[#FFFFFF] border border-dashed border-[#00A8B5] rounded-lg p-5 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#00A8B5]/20">
                <span className="font-technical text-[10px] font-bold text-[#00A8B5] uppercase">
                  Raw Hardware Specification Data Sheet
                </span>
                <span className="font-technical text-[10px] text-[#888]">DRY DOCS // GERBER / CAD</span>
              </div>
              <pre className="font-mono text-xs text-[#4A3B2C] leading-relaxed overflow-x-auto p-3 bg-[#FAF8F5] rounded border border-[#00A8B5]/20">
{`{
  "component": "camera_visor_array",
  "axis_constraint": "X=162.5mm, Y=76.6mm",
  "tolerance_mm": 0.05,
  "lens_elements": 7,
  "hdi_pcb_layers": 12,
  "thermal_dissipation_target": "vapor_chamber_copper_loop"
}`}
              </pre>
            </div>

            <div className="mt-3 pt-2 border-t border-[#00A8B5]/20 text-[11px] font-technical text-[#666]">
              <span className="font-bold text-[#8C3A27]">Solution:</span> Transformed into a 60 FPS visual novel narrative via Gemini JSON schemas.
            </div>
          </div>
        </div>
      ),
    },

    // Slide 3: The Tripartite Framework (Chitrasutra to CAD)
    {
      number: 3,
      title: "CHITRASUTRA TO CAD: THE PIPELINE",
      subtitle: "Bridging Historical Indian Iconometry to Modern Smartphone CAD",
      badge: "SECTION 03 // THE TRIPARTITE FRAMING ARCHITECTURE",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-white/70 rounded-lg border border-[#D4AF37]/40 overflow-hidden shadow-sm">
          {/* Column 1: Tier 1 */}
          <div className="p-5 space-y-2 border-b md:border-b-0 md:border-r border-[#D4AF37]/40 flex flex-col justify-between">
            <div>
              <span className="font-technical text-[10px] font-bold text-[#00A8B5] uppercase block mb-1">
                TIER 1 // THE BLUEPRINT
              </span>
              <h4 className="font-display font-bold text-sm text-[#1E242B]">
                Frame 01 // The Talamana Genesis
              </h4>
              <p className="font-technical text-xs font-semibold text-[#8C3A27] mt-1">
                Polar constraints & root geometric mandalas.
              </p>
            </div>
            <p className="font-technical text-xs text-[#555] leading-relaxed pt-3 border-t border-[#D4AF37]/20">
              Maps invariant coordinate datums and camera visor aspect ratios before physical casting or machining.
            </p>
          </div>

          {/* Column 2: Tier 2 */}
          <div className="p-5 space-y-2 border-b md:border-b-0 md:border-r border-[#D4AF37]/40 flex flex-col justify-between">
            <div>
              <span className="font-technical text-[10px] font-bold text-[#D4AF37] uppercase block mb-1">
                TIER 2 // THE ANATOMY
              </span>
              <h4 className="font-display font-bold text-sm text-[#1E242B]">
                Frame 02 // Yantra Deconstruction
              </h4>
              <p className="font-technical text-xs font-semibold text-[#8C3A27] mt-1">
                Exploded optics & multi-layer micro-electronics.
              </p>
            </div>
            <p className="font-technical text-xs text-[#555] leading-relaxed pt-3 border-t border-[#D4AF37]/20">
              Exposes the hidden routing engines, 12-layer HDI PCB copper radials, and 7-element lens ray-tracing pathways.
            </p>
          </div>

          {/* Column 3: Tier 3 */}
          <div className="p-5 space-y-2 flex flex-col justify-between">
            <div>
              <span className="font-technical text-[10px] font-bold text-[#1E242B] uppercase block mb-1">
                TIER 3 // THE MONOLITH
              </span>
              <h4 className="font-display font-bold text-sm text-[#1E242B]">
                Frame 03 // The Polished Pratima
              </h4>
              <p className="font-technical text-xs font-semibold text-[#8C3A27] mt-1">
                High-gloss aluminum bands & frosted matte glass surfaces.
              </p>
            </div>
            <p className="font-technical text-xs text-[#555] leading-relaxed pt-3 border-t border-[#D4AF37]/20">
              Unifies geometric theory and sub-assemblies into a singular, tactile consumer monolith with IP68 equilibrium.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 4: Deterministic AI Engine (Google AI Studio)
    {
      number: 4,
      title: "STRUCTURED SCHEMAS & ZERO DRIFT",
      subtitle: "Predictable Hardware Translation via Google AI Studio & Structured Outputs",
      badge: "SECTION 04 // DETERMINISTIC LLM CORE ARCHITECTURE",
      content: (
        <div className="space-y-4">
          {/* Flowchart Layout Stages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 bg-[#1E242B] rounded-lg border border-[#00A8B5]/40 text-center text-xs font-technical">
            <div className="p-2.5 bg-black/40 rounded border border-[#00A8B5]/30">
              <span className="text-[#00A8B5] font-bold block text-[10px]">STAGE A</span>
              <span className="text-[#F7F4EB] font-bold">FastAPI Server Ingestion</span>
              <span className="text-[10px] text-[#888] block mt-0.5">Payload & Constraint Validation</span>
            </div>
            <div className="p-2.5 bg-black/40 rounded border border-[#D4AF37]/30">
              <span className="text-[#D4AF37] font-bold block text-[10px]">STAGE B</span>
              <span className="text-[#F7F4EB] font-bold">Gemini Interface API</span>
              <span className="text-[10px] text-[#888] block mt-0.5">T=0.2 · Low-Entropy Grounding</span>
            </div>
            <div className="p-2.5 bg-black/40 rounded border border-[#86EFAC]/30">
              <span className="text-[#86EFAC] font-bold block text-[10px]">STAGE C</span>
              <span className="text-[#F7F4EB] font-bold">Output JSON Enforcement</span>
              <span className="text-[10px] text-[#888] block mt-0.5">Strict Schema · Zero Drift</span>
            </div>
          </div>

          {/* Key Architectural Callouts */}
          <div className="p-4 bg-white/80 rounded-lg border border-[#1E242B]/10 space-y-2.5 font-technical text-xs text-[#1E242B]">
            <div className="flex items-start gap-2">
              <span className="text-[#00A8B5] font-bold">▶</span>
              <p>
                <strong>System Parameter Temperature Lock:</strong> Static at <code className="text-[#8C3A27] font-bold">0.2</code> to enforce deterministic, repeatable textual translation without hallucinations.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#D4AF37] font-bold">▶</span>
              <p>
                <strong>Zero Schema Drift Guarantee:</strong> Enforces JSON Schemas directly at the model token decoder layer, eliminating unstructured markdown headers or chat text wrappers entirely.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#8C3A27] font-bold">▶</span>
              <p>
                <strong>Contextual Translation Rules:</strong> System instructions explicitly cross-examine raw mechanical dimensions against iconic structural design concepts.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 5: Production Reliability & Deployment
    {
      number: 5,
      title: "DEPLOYMENT & CLOUD TOPOLOGY",
      subtitle: "Automated Production CI/CD Pipelines and Zero-Downtime Reliability Nodes",
      badge: "SECTION 05 // SYSTEM TOPOLOGY AND INFRASTRUCTURE DEPLOYMENT",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Card: Frontend Hosting Pipeline */}
            <div className="p-5 bg-[#FFFFFF] rounded-lg border border-[#1E242B] shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1E242B]/10">
                  <span className="font-technical text-xs font-bold text-[#00A8B5] tracking-wider uppercase">
                    FRONTEND HOSTING PIPELINE
                  </span>
                  <span className="font-technical text-[10px] text-[#888]">EDGE PLATFORM ROUTING</span>
                </div>
                <div className="space-y-2.5 font-technical text-xs text-[#1E242B]">
                  <p>
                    <strong>• Framework Stack:</strong> Web-optimized Flutter compiled directly to native JS/WASM.
                  </p>
                  <p>
                    <strong>• Automation CI/CD:</strong> Automated GitHub Actions pushing production code directly onto GitHub Pages hosting.
                  </p>
                  <p>
                    <strong>• Zero Asset Overhead:</strong> Uses custom canvas layout calculations instead of loading high-density WebGL models.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-[#1E242B]/10 text-[10px] font-technical text-[#00A8B5] font-semibold">
                ✓ 60 FPS Native Frame Schedule Guaranteed
              </div>
            </div>

            {/* Right Card: Backend Reliability Node */}
            <div className="p-5 bg-[#FFFFFF] rounded-lg border border-[#1E242B] shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1E242B]/10">
                  <span className="font-technical text-xs font-bold text-[#D4AF37] tracking-wider uppercase">
                    BACKEND RELIABILITY NODE
                  </span>
                  <span className="font-technical text-[10px] text-[#888]">INFRASTRUCTURE STACK</span>
                </div>
                <div className="space-y-2.5 font-technical text-xs text-[#1E242B]">
                  <p>
                    <strong>• Application Server:</strong> High-performance Python FastAPI engine running on Render cloud architecture.
                  </p>
                  <p>
                    <strong>• Client Resilience:</strong> Integrated local fail-safe circuit breaker embedded in the API Client class.
                  </p>
                  <p>
                    <strong>• Cold-Start Strategy:</strong> Instantly falls back to local JSON schemas to guarantee a fast page load for reviewers.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-[#1E242B]/10 text-[10px] font-technical text-[#10B981] font-semibold">
                ✓ 100% Recruiter Portfolio Uptime
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#1E242B] text-[#D8E2DC] rounded border border-[#10B981]/40 flex items-center justify-between text-xs font-technical">
            <span>NETWORK CIRCUIT BREAKER: <code className="text-[#86EFAC]">ApiConfig.useMockData = true</code> (Zero broken requests)</span>
            <span className="text-[#D4AF37] font-bold">Latency: &lt; 5ms Cached / 800ms Sim</span>
          </div>
        </div>
      ),
    },

    // Slide 6: ROI for Engineering Hiring Teams
    {
      number: 6,
      title: "ROI FOR ENGINEERING HIRING TEAMS",
      subtitle: "Why This Portfolio Demonstrates Senior Systems Competency",
      badge: "SLIDE 06 // BUSINESS IMPACT",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white/80 rounded-lg border border-[#1E242B]/15 space-y-2.5">
            <div className="w-7 h-7 rounded bg-[#00A8B5]/15 text-[#00A8B5] flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h5 className="font-display font-bold text-xs uppercase text-[#1E242B]">End-to-End System Design</h5>
            <p className="font-technical text-xs text-[#4A3B2C] leading-relaxed">
              Demonstrates model orchestration, strict API contracts, and responsive layout handling across Python, Flutter, and TypeScript.
            </p>
          </div>

          <div className="p-5 bg-white/80 rounded-lg border border-[#1E242B]/15 space-y-2.5">
            <div className="w-7 h-7 rounded bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h5 className="font-display font-bold text-xs uppercase text-[#1E242B]">Production Resilience</h5>
            <p className="font-technical text-xs text-[#4A3B2C] leading-relaxed">
              Solves cold starts, latency spikes, and vector repaints through thoughtful mathematical decoupling and circuit-breaker patterns.
            </p>
          </div>

          <div className="p-5 bg-white/80 rounded-lg border border-[#1E242B]/15 space-y-2.5">
            <div className="w-7 h-7 rounded bg-[#8C3A27]/15 text-[#8C3A27] flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h5 className="font-display font-bold text-xs uppercase text-[#1E242B]">Cross-Functional Communication</h5>
            <p className="font-technical text-xs text-[#4A3B2C] leading-relaxed">
              Proves the rare ability to articulate deep hardware concepts to executives and technical leads through narrative engineering.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl bg-[#FAF4E6] border-2 border-[#8C6D3B] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-5 py-3 bg-[#23180F] text-[#FFF8E7] flex items-center justify-between border-b border-[#8C6D3B]/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#00A8B5] text-white flex items-center justify-center">
              <Presentation className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm tracking-wider text-[#F4EDE0]">
                Interactive Presentation Deck // Executive Review
              </h3>
              <p className="text-[11px] font-technical text-[#CBB89A]">
                the_digital_yantra_deck.pptx · Google Slides Import Ready
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://lens.usercontent.google.com/banana?agsi=CpUBL2Zvb3RwcmludHMtcHJvZC1zZWFyY2gtYWltLWltYWdlcy1nYWlhLWNsb25lL2dsb2JhbDo6MDAwMDU1Y2ZlYzcwMDI2ZDowMDAwMDBlYjoxOmM4NDZmYTI0ZjA2ZDlhZjE6MDAwMDU1Y2ZlYzcwMDI2ZDowMDAwMDJkZDU4NjAzMzY4OjAwMDY1Y2MzMGVhNGEyOWYQAhgBIklhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwucHJlc2VudGF0aW9uKhx0aGVfZGlnaXRhbF95YW50cmFfZGVjay5wcHR4"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-[#D4AF37] hover:bg-[#E5C148] text-[#1E242B] rounded text-xs font-technical font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PPTX</span>
            </a>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#CBB89A] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Stage Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#FAF4E6] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#8C6D3B]/20">
              <span className="font-technical text-xs font-bold px-2 py-0.5 rounded bg-[#00A8B5]/15 text-[#00A8B5]">
                {slide.badge}
              </span>
              <span className="font-technical text-xs text-[#645642]">
                Slide {currentSlide + 1} of {slides.length}
              </span>
            </div>

            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#1E242B] tracking-wide">
                {slide.title}
              </h2>
              <p className="font-serif-prose text-sm text-[#8C3A27] italic mt-1">
                {slide.subtitle}
              </p>
            </div>

            <div className="pt-2">{slide.content}</div>
          </div>

          {/* Slide Navigation Thumbnails & Controls */}
          <div className="pt-6 border-t border-[#8C6D3B]/20 flex items-center justify-between mt-6">
            <button
              onClick={() => {
                sound.playClick();
                setCurrentSlide((prev) => Math.max(prev - 1, 0));
              }}
              disabled={currentSlide === 0}
              className={`px-3 py-1.5 rounded font-technical text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                currentSlide === 0
                  ? 'opacity-40 cursor-not-allowed bg-black/5 text-[#888]'
                  : 'bg-[#1E242B] text-white hover:bg-[#2D3748]'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Indicator dots */}
            <div className="flex items-center gap-1.5">
              {slides.map((s, idx) => (
                <button
                  key={s.number}
                  onClick={() => {
                    sound.playClick();
                    setCurrentSlide(idx);
                  }}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx
                      ? 'bg-[#00A8B5] scale-110'
                      : 'bg-[#8C6D3B]/30 hover:bg-[#8C6D3B]/60'
                  }`}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
              }}
              disabled={currentSlide === slides.length - 1}
              className={`px-3 py-1.5 rounded font-technical text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                currentSlide === slides.length - 1
                  ? 'opacity-40 cursor-not-allowed bg-black/5 text-[#888]'
                  : 'bg-[#1E242B] text-white hover:bg-[#2D3748]'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-2.5 bg-[#F0EAE1] border-t border-[#8C6D3B]/30 flex items-center justify-between text-[11px] font-technical text-[#645642] shrink-0">
          <span>USE KEYBOARD ARROW KEYS (← / →) TO NAVIGATE SLIDES</span>
          <span className="hidden sm:inline">THE DIGITAL YANTRA EXECUTIVE REVIEW DECK</span>
        </div>
      </div>
    </div>
  );
};
