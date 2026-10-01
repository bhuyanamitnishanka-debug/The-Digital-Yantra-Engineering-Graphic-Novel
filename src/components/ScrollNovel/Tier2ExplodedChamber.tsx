import React, { useState } from 'react';
import { Eye, Layers, Cpu, Maximize2, Zap, Sparkles, SlidersHorizontal, Info } from 'lucide-react';
import { HardwareComponent, ParametricSettings } from '../../types';
import { sound } from '../../utils/audio';

interface Tier2ExplodedChamberProps {
  settings: ParametricSettings;
  components: HardwareComponent[];
  selectedComponent: HardwareComponent | null;
  onSelectComponent: (comp: HardwareComponent) => void;
  onOpenShilpinChatWithComponent: (comp: HardwareComponent) => void;
}

export const Tier2ExplodedChamber: React.FC<Tier2ExplodedChamberProps> = ({
  settings,
  components,
  selectedComponent,
  onSelectComponent,
  onOpenShilpinChatWithComponent,
}) => {
  const [explosionDepth, setExplosionDepth] = useState<number>(65); // 0 (assembled) to 100 (fully exploded)
  const [isXRayMode, setIsXRayMode] = useState<boolean>(false);
  const [showRayTracing, setShowRayTracing] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Layer filter handler
  const handleCategorySelect = (category: string) => {
    sound.playClick();
    setActiveCategory(category);
  };

  const handleComponentClick = (comp: HardwareComponent) => {
    sound.playChime(comp.category === 'Optics' ? 580 : comp.category === 'Logic' ? 440 : 360);
    onSelectComponent(comp);
  };

  const toggleRayTracing = () => {
    sound.playLaserPing();
    setShowRayTracing(!showRayTracing);
  };

  // Find components by ID or use defaults
  const opticsComp = components.find(c => c.category === 'Optics') || components[0];
  const logicComp = components.find(c => c.id === 'yantra-pcb') || components[2] || components[0];
  const socComp = components.find(c => c.id === 'tensor-soc') || components[1] || components[0];
  const visorComp = components.find(c => c.id === 'camera-visor') || components[3] || components[0];
  const thermalComp = components.find(c => c.id === 'thermal-chamber') || components[4] || components[0];

  // Dynamic explosion factor
  const ef = explosionDepth / 100;

  const handleConsolidateForm = () => {
    sound.playChime(720);
    setExplosionDepth(0);
    setTimeout(() => {
      const el = document.getElementById('tier3');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Narrative Dialogue Box from Storyboard Scene 2 */}
      <div className="p-4 bg-[#211A13] border-l-4 border-[#8C3A27] rounded-r text-[#FFF8E7] shadow-md space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-technical text-xs font-bold text-[#E8BD56] uppercase tracking-wider">
            FRAME 02 // YANTRA DECONSTRUCTION
          </span>
          <span className="text-[10px] font-technical text-[#A8987E] uppercase">
            AI System Narrator
          </span>
        </div>
        <p className="font-serif-prose italic text-sm text-[#EBE5D8] leading-relaxed">
          "The smartphone body splits apart along parallel 3D spatial axes. Floating in midair, seven aspherical lenses expand like glass accordions, and the motherboard substrate glows with neon cyan copper traces routing electron prana."
        </p>
      </div>

      {/* Control Strip & Sub-system Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 bg-[#FAF4E6]/95 border-2 border-[#8C6D3B]/80 rounded shadow-md">
        {/* Layer Filters */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-technical text-[#735A42] uppercase mr-1 hidden sm:inline">
            Sub-Systems:
          </span>
          {['All', 'Optics', 'Logic', 'Chassis', 'Thermal'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-3 py-1.5 text-xs font-technical rounded border transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'border-[#8C3A27] bg-[#8C3A27] text-white font-bold shadow-xs'
                  : 'border-[#CBB89A] bg-[#F5ECDA] text-[#4A3B2C] hover:bg-[#EBDDC5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View Mode Toggles */}
        <div className="flex items-center gap-3">
          {/* Ray Tracing toggle */}
          <button
            onClick={toggleRayTracing}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-technical rounded border transition-all cursor-pointer ${
              showRayTracing
                ? 'border-[#0EA5E9] bg-[#0EA5E9]/15 text-[#0284C7] font-semibold'
                : 'border-[#CBB89A] bg-[#F5ECDA] text-[#69553F]'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${showRayTracing ? 'text-[#0EA5E9]' : ''}`} />
            <span>Ray Tracing: {showRayTracing ? 'ON' : 'OFF'}</span>
          </button>

          {/* X-Ray / Blueprint toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setIsXRayMode(!isXRayMode);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-technical rounded border transition-all cursor-pointer ${
              isXRayMode
                ? 'border-[#2563EB] bg-[#0C121E] text-[#60A5FA] font-semibold'
                : 'border-[#CBB89A] bg-[#F5ECDA] text-[#69553F]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isXRayMode ? 'Blueprint Mode' : 'Parchment Mode'}</span>
          </button>
        </div>
      </div>

      {/* Main Exploded Isometric Canvas & Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Multi-Layered Exploded Viewport */}
        <div
          className={`lg:col-span-8 border-2 rounded p-3 sm:p-5 shadow-lg relative overflow-hidden transition-colors duration-300 ${
            isXRayMode
              ? 'dark-blueprint border-[#38BDF8]/60 text-[#E0F2FE]'
              : 'bg-[#FAF4E6]/95 border-[#8C6D3B]/80 text-[#2B1F16]'
          }`}
        >
          {/* Viewport Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-current opacity-60 mb-3 text-xs font-technical">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#8C3A27]" />
              <span className="font-semibold uppercase tracking-wider">
                Isometric Exploded Chamber · Axonometric 30°
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>EXPLODE DEPTH: {explosionDepth}%</span>
              <span>·</span>
              <span>LAYERS: 6 ACTIVE</span>
            </div>
          </div>

          {/* SVG Isometric Exploded Rendering Canvas */}
          <div className="relative aspect-[16/11] w-full border border-current/20 rounded shadow-inner flex items-center justify-center overflow-hidden select-none">
            <svg
              viewBox="0 0 700 500"
              className="w-full h-full select-none"
              style={{ filter: isXRayMode ? 'drop-shadow(0 0 10px rgba(56,189,248,0.25))' : 'none' }}
            >
              <defs>
                {/* Glow filter for ray tracing lasers */}
                <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Metallic gradient for aluminum visor */}
                <linearGradient id="aluminumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e2e8f0" />
                  <stop offset="50%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>

                {/* Golden copper gradient for PCB Yantra */}
                <linearGradient id="goldCopperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
              </defs>

              {/* Guide Alignment Centerlines */}
              <line x1="160" y1="120" x2="480" y2="440" stroke="#8C6D3B" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.3" />
              <line x1="350" y1="50" x2="350" y2="480" stroke="#8C6D3B" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.3" />

              {/* ============================================================== */}
              {/* LAYER 1: BASE STRUCTURAL CHASSIS & DISPLAY UNIBODY */}
              {/* ============================================================== */}
              {(activeCategory === 'All' || activeCategory === 'Chassis') && (
                <g
                  transform={`translate(0, ${ef * 50})`}
                  className="transition-transform duration-200"
                >
                  {/* Phone Midframe (Isometric rectangular slab) */}
                  <polygon
                    points="220,380 500,240 540,260 260,400"
                    fill={isXRayMode ? 'rgba(30, 58, 138, 0.4)' : '#334155'}
                    stroke={isXRayMode ? '#60A5FA' : '#1E293B'}
                    strokeWidth="1.8"
                  />
                  {/* Bottom glass/body face */}
                  <polygon
                    points="220,380 500,240 460,220 180,360"
                    fill={isXRayMode ? 'rgba(15, 23, 42, 0.6)' : '#E2E8F0'}
                    stroke={isXRayMode ? '#93C5FD' : '#64748B'}
                    strokeWidth="2"
                    opacity={isXRayMode ? 0.7 : 0.95}
                  />
                  {/* Battery cutout / Pouch cell */}
                  <polygon
                    points="250,345 420,260 395,248 225,333"
                    fill={isXRayMode ? '#1E3A8A' : '#1E293B'}
                    stroke="#475569"
                    strokeWidth="1"
                  />
                  <text x="310" y="305" fill="#94A3B8" fontSize="9" fontFamily="monospace" transform="rotate(-26, 310, 305)">
                    LITHIUM 5050mAh CELL
                  </text>
                </g>
              )}

              {/* ============================================================== */}
              {/* LAYER 2: GRAPHITE THERMAL SPREADER & VAPOR CHAMBER */}
              {/* ============================================================== */}
              {(activeCategory === 'All' || activeCategory === 'Thermal') && (
                <g
                  transform={`translate(0, ${ef * 20})`}
                  className="transition-transform duration-200 cursor-pointer"
                  onClick={() => handleComponentClick(thermalComp)}
                >
                  <polygon
                    points="270,335 450,245 430,235 250,325"
                    fill={isXRayMode ? 'rgba(217, 119, 6, 0.25)' : '#C27835'}
                    stroke="#B45309"
                    strokeWidth="1.5"
                    opacity="0.85"
                  />
                  {/* Capillary Wick Lines */}
                  {[-15, 0, 15].map((off, idx) => (
                    <line
                      key={idx}
                      x1={280 + off}
                      y1={320 + off / 2}
                      x2={420 + off}
                      y2={250 + off / 2}
                      stroke="#FBBF24"
                      strokeWidth="0.8"
                      strokeDasharray="2 2"
                    />
                  ))}
                  <text x="315" y="280" fill={isXRayMode ? '#FBBF24' : '#FFF'} fontSize="9" fontFamily="monospace" transform="rotate(-26, 315, 280)">
                    COPPER VAPOR CHAMBER (0.4mm)
                  </text>
                </g>
              )}

              {/* ============================================================== */}
              {/* LAYER 3: THE HIGH-DENSITY INTERCONNECT (HDI) MOTHERBOARD YANTRA */}
              {/* ============================================================== */}
              {(activeCategory === 'All' || activeCategory === 'Logic') && (
                <g
                  transform={`translate(0, ${-ef * 20})`}
                  className="transition-transform duration-200 cursor-pointer"
                  onClick={() => handleComponentClick(logicComp)}
                >
                  {/* PCB Substrate Board */}
                  <polygon
                    points="240,310 470,195 440,180 210,295"
                    fill={isXRayMode ? '#0A2540' : '#143828'}
                    stroke={isXRayMode ? '#38BDF8' : '#22543D'}
                    strokeWidth="2"
                    opacity={isXRayMode ? 0.9 : 0.95}
                  />

                  {/* Sacred Yantra Etched Copper Bus Traces (Gold/Copper) */}
                  <path
                    d="M 260 290 L 300 270 L 330 285 L 360 270 L 400 250"
                    fill="none"
                    stroke="url(#goldCopperGrad)"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M 280 280 L 310 265 L 340 280 L 370 265"
                    fill="none"
                    stroke="url(#goldCopperGrad)"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M 250 275 L 290 255 L 320 270 L 350 255"
                    fill="none"
                    stroke="url(#goldCopperGrad)"
                    strokeWidth="1.8"
                  />

                  {/* Micro-via clusters (concentric bindu points) */}
                  {[
                    { cx: 300, cy: 260 },
                    { cx: 310, cy: 255 },
                    { cx: 320, cy: 250 },
                    { cx: 360, cy: 230 },
                    { cx: 370, cy: 225 },
                  ].map((pt, i) => (
                    <circle key={i} cx={pt.cx} cy={pt.cy} r="2.5" fill="#F59E0B" stroke="#78350F" strokeWidth="0.5" />
                  ))}

                  {/* Silicon SoC Die: Tensor Neural Accelerator */}
                  <g onClick={(e) => { e.stopPropagation(); handleComponentClick(socComp); }}>
                    <polygon
                      points="310,245 370,215 350,205 290,235"
                      fill={isXRayMode ? '#1E1B4B' : '#0F172A'}
                      stroke="#818CF8"
                      strokeWidth="2"
                    />
                    <text x="320" y="228" fill="#A5B4FC" fontSize="8" fontFamily="monospace" fontWeight="bold">
                      TENSOR G4
                    </text>
                    <text x="315" y="238" fill="#6366F1" fontSize="7" fontFamily="monospace">
                      4nm TPU DIE
                    </text>
                  </g>

                  {/* Micron RAM / UFS Storage ICs */}
                  <polygon points="380,210 420,190 410,185 370,205" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
                  <polygon points="260,265 290,250 280,245 250,260" fill="#1E293B" stroke="#64748B" strokeWidth="1" />

                  {/* Callout Indicator to Logic Board */}
                  <line x1="230" y1="285" x2="160" y2="285" stroke="#D97706" strokeWidth="1" />
                  <circle cx="160" cy="285" r="3" fill="#D97706" />
                  <text x="80" y="282" fill="#D97706" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    DIGITAL YANTRA PCB
                  </text>
                  <text x="80" y="293" fill="#8C765E" fontSize="8" fontFamily="monospace">
                    12-LAYER HDI SUBSTRATE
                  </text>
                </g>
              )}

              {/* ============================================================== */}
              {/* LAYER 4: ADVANCED CMOS SENSORS & PERISCOPE PRISM */}
              {/* ============================================================== */}
              {(activeCategory === 'All' || activeCategory === 'Optics') && (
                <g
                  transform={`translate(0, ${-ef * 65})`}
                  className="transition-transform duration-200 cursor-pointer"
                  onClick={() => handleComponentClick(opticsComp)}
                >
                  {/* Primary 50MP Wide Sensor Die (Gold-pinned ceramic carrier) */}
                  <polygon
                    points="310,165 370,135 355,127 295,157"
                    fill={isXRayMode ? '#0284C7' : '#1E293B'}
                    stroke="#38BDF8"
                    strokeWidth="1.8"
                  />
                  {/* Silicon Active Pixel Array (Metallic mirror shimmer) */}
                  <polygon
                    points="318,160 362,138 352,133 308,155"
                    fill={isXRayMode ? '#38BDF8' : '#0EA5E9'}
                    opacity="0.9"
                  />

                  {/* Telephoto Periscope Sensor Module & 90° Folded Prism */}
                  <polygon
                    points="390,125 435,102 425,97 380,120"
                    fill={isXRayMode ? '#0369A1' : '#334155'}
                    stroke="#38BDF8"
                    strokeWidth="1.5"
                  />
                  {/* Glass Prism Reflection */}
                  <polygon
                    points="395,120 425,105 418,101 388,116"
                    fill="#7DD3FC"
                    opacity="0.7"
                  />

                  {/* Sensor Annotations */}
                  <line x1="375" y1="110" x2="490" y2="90" stroke="#0284C7" strokeWidth="1" />
                  <circle cx="490" cy="90" r="3" fill="#0284C7" />
                  <text x="500" y="90" fill="#0284C7" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    50MP 1/1.31" CMOS SENSOR
                  </text>
                  <text x="500" y="101" fill="#64748B" fontSize="8" fontFamily="monospace">
                    1.2µm DUAL-PIXEL AF
                  </text>
                </g>
              )}

              {/* ============================================================== */}
              {/* LAYER 5: 7-ELEMENT ASPHERICAL OPTICAL LENS TRAIN */}
              {/* ============================================================== */}
              {(activeCategory === 'All' || activeCategory === 'Optics') && (
                <g
                  transform={`translate(0, ${-ef * 110})`}
                  className="transition-transform duration-200 cursor-pointer"
                  onClick={() => handleComponentClick(opticsComp)}
                >
                  {/* Floating Aspherical Glass Lens Stack (7 Lenses along optical axis) */}
                  {[
                    { x: 300, y: 110, rx: 18, ry: 9, label: 'L7 Asphere' },
                    { x: 285, y: 98, rx: 19, ry: 9.5, label: 'L6 Meniscus' },
                    { x: 270, y: 86, rx: 20, ry: 10, label: 'L5 Biconcave' },
                    { x: 255, y: 74, rx: 21, ry: 10.5, label: 'L4 Fluorite' },
                    { x: 240, y: 62, rx: 22, ry: 11, label: 'L3 Doublet' },
                    { x: 225, y: 50, rx: 23, ry: 11.5, label: 'L2 Dispersion' },
                    { x: 210, y: 38, rx: 24, ry: 12, label: 'L1 Front Glass' },
                  ].map((lens, i) => {
                    // Spread lenses out when exploded
                    const spreadX = lens.x - (i * ef * 12);
                    const spreadY = lens.y - (i * ef * 14);
                    return (
                      <g key={i}>
                        {/* Lens Glass Body */}
                        <ellipse
                          cx={spreadX}
                          cy={spreadY}
                          rx={lens.rx}
                          ry={lens.ry}
                          fill={isXRayMode ? 'rgba(56, 189, 248, 0.35)' : 'rgba(219, 234, 254, 0.75)'}
                          stroke={isXRayMode ? '#38BDF8' : '#2563EB'}
                          strokeWidth="1.6"
                        />
                        {/* Specular curved reflection glint */}
                        <path
                          d={`M ${spreadX - lens.rx * 0.6} ${spreadY - lens.ry * 0.2} Q ${spreadX} ${spreadY - lens.ry * 0.8} ${spreadX + lens.rx * 0.6} ${spreadY - lens.ry * 0.2}`}
                          fill="none"
                          stroke="#FFF"
                          strokeWidth="1.2"
                          opacity="0.8"
                        />
                      </g>
                    );
                  })}

                  {/* Ray Tracing Light Beams (Cyan/Amber beams refracting through the lenses) */}
                  {showRayTracing && (
                    <g filter="url(#laserGlow)" className="pointer-events-none">
                      {/* Central chief ray */}
                      <path
                        d={`M 150 10 L 210 ${38 - ef * 14 * 6} L 255 ${74 - ef * 14 * 3} L 310 ${110} L 335 ${145 + ef * 45}`}
                        fill="none"
                        stroke="#0EA5E9"
                        strokeWidth="2.5"
                        strokeDasharray="6 3"
                        className="animate-pulse"
                      />
                      {/* Marginal ray top */}
                      <path
                        d={`M 140 0 L 200 ${32 - ef * 14 * 6} L 250 ${68 - ef * 14 * 3} L 305 ${105} L 335 ${145 + ef * 45}`}
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth="1.5"
                      />
                      {/* Marginal ray bottom */}
                      <path
                        d={`M 160 20 L 220 ${44 - ef * 14 * 6} L 260 ${80 - ef * 14 * 3} L 315 ${115} L 335 ${145 + ef * 45}`}
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth="1.5"
                      />
                      {/* Convergence bindu focal point */}
                      <circle cx="335" cy={145 + ef * 45} r="4" fill="#38BDF8" />
                      <circle cx="335" cy={145 + ef * 45} r="8" fill="none" stroke="#0EA5E9" strokeWidth="1" className="animate-ping" />
                    </g>
                  )}

                  {/* Optics Stack Callout */}
                  <line x1="210" y1="38" x2="90" y2="40" stroke="#2563EB" strokeWidth="1" />
                  <circle cx="90" cy="40" r="3" fill="#2563EB" />
                  <text x="15" y="38" fill="#2563EB" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    7-ELEMENT ASPHERICAL TRAIN
                  </text>
                  <text x="15" y="49" fill="#64748B" fontSize="8" fontFamily="monospace">
                    f/1.68 · RAY-TRACED CONIC DISK
                  </text>
                </g>
              )}

              {/* ============================================================== */}
              {/* LAYER 6: ANODIZED AEROSPACE 7000 ALUMINUM CAMERA VISOR */}
              {/* ============================================================== */}
              {(activeCategory === 'All' || activeCategory === 'Chassis') && (
                <g
                  transform={`translate(0, ${-ef * 160})`}
                  className="transition-transform duration-200 cursor-pointer"
                  onClick={() => handleComponentClick(visorComp)}
                >
                  {/* Visor Bar Housing (Aluminum unibody extrusion) */}
                  <polygon
                    points="170,180 500,15 540,35 210,200"
                    fill={isXRayMode ? 'rgba(71, 85, 105, 0.4)' : 'url(#aluminumGrad)'}
                    stroke={isXRayMode ? '#94A3B8' : '#475569'}
                    strokeWidth="2.2"
                  />
                  {/* Visor Bevel / Chamfered Border */}
                  <polygon
                    points="170,180 210,200 210,215 170,195"
                    fill="#64748B"
                    stroke="#334155"
                    strokeWidth="1"
                  />
                  <polygon
                    points="210,200 540,35 540,50 210,215"
                    fill="#94A3B8"
                    stroke="#475569"
                    strokeWidth="1"
                  />

                  {/* Visor Glass Window Inset */}
                  <polygon
                    points="200,170 480,30 470,25 190,165"
                    fill={isXRayMode ? '#0284C7' : '#0F172A'}
                    stroke="#334155"
                    strokeWidth="1.5"
                  />

                  {/* Triple Camera Apertures inside visor */}
                  <ellipse cx="240" cy="148" rx="14" ry="9" fill="#000" stroke="#64748B" strokeWidth="1.5" />
                  <ellipse cx="290" cy="123" rx="12" ry="8" fill="#000" stroke="#64748B" strokeWidth="1.5" />
                  <ellipse cx="340" cy="98" rx="11" ry="7" fill="#000" stroke="#64748B" strokeWidth="1.5" />

                  {/* Spectral flicker sensor & LED Flash */}
                  <circle cx="410" cy="65" r="4.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
                  <circle cx="430" cy="55" r="3" fill="#38BDF8" />

                  {/* Visor Callout */}
                  <line x1="500" y1="35" x2="600" y2="40" stroke="#475569" strokeWidth="1" />
                  <circle cx="600" cy="40" r="3" fill="#475569" />
                  <text x="530" y="28" fill={isXRayMode ? '#E2E8F0' : '#1E293B'} fontSize="10" fontFamily="monospace" fontWeight="bold">
                    AEROSPACE ALUMINUM VISOR
                  </text>
                  <text x="530" y="39" fill="#64748B" fontSize="8" fontFamily="monospace">
                    CNC-MILLED UNIBODY PEDIMENT
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Interactive Parallax Explode/Collate Slider & Consolidate Form CTA */}
          <div className="mt-4 pt-3 border-t border-current/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-technical w-full sm:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-[#8C3A27]" />
              <span className="font-semibold uppercase tracking-wider">Explosion Parallax:</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-1/2">
              <span className="text-[11px] font-technical opacity-75 whitespace-nowrap">0% Assembled</span>
              <input
                type="range"
                min="0"
                max="100"
                value={explosionDepth}
                onChange={(e) => {
                  sound.playClick();
                  setExplosionDepth(parseInt(e.target.value));
                }}
                className="w-full accent-[#8C3A27] h-2 bg-current/20 rounded cursor-pointer"
              />
              <span className="text-[11px] font-technical opacity-75 whitespace-nowrap">100% Exploded</span>
            </div>

            <button
              onClick={handleConsolidateForm}
              className="px-4 py-1.5 bg-[#8C3A27] hover:bg-[#A3442E] text-white rounded font-technical text-xs font-bold uppercase tracking-wider shadow transition-all cursor-pointer whitespace-nowrap"
            >
              Consolidate Form
            </button>
          </div>
        </div>

        {/* Right Column: Component Inspector & AI Shilpin Tooltip */}
        <div className="lg:col-span-4 bg-[#FAF4E6]/95 border-2 border-[#8C6D3B]/80 rounded p-4 sm:p-5 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#8C6D3B]/30 mb-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#8C3A27]" />
                <h3 className="font-display text-sm font-bold text-[#2B1F16] uppercase tracking-wider">
                  Micro-Component Inspector
                </h3>
              </div>
              <span className="text-[10px] font-technical px-2 py-0.5 rounded bg-[#8C6D3B]/20 text-[#543E2B]">
                TAP TARGET ACTIVE
              </span>
            </div>

            {selectedComponent ? (
              <div className="space-y-3.5">
                <div>
                  <span className="text-[10px] font-technical text-[#8C3A27] font-semibold uppercase tracking-wider block">
                    {selectedComponent.category} Sub-Assembly
                  </span>
                  <h4 className="text-base sm:text-lg font-display font-bold text-[#2B1F16] leading-snug">
                    {selectedComponent.name}
                  </h4>
                  <div className="text-xs font-serif-prose italic text-[#735A42] mt-0.5">
                    Talamana Role: <span className="font-semibold text-[#8C3A27]">{selectedComponent.talamanaRole}</span>
                  </div>
                </div>

                <div className="p-3 bg-[#F5ECDA] rounded border border-[#CBB89A] space-y-1.5 font-technical text-xs">
                  <span className="text-[10px] uppercase text-[#735A42] block font-semibold">
                    Technical Specifications
                  </span>
                  <p className="text-[#2B1F16] leading-relaxed">
                    {selectedComponent.specs}
                  </p>
                </div>

                <div className="p-3 bg-[#EFE4CE] rounded border border-[#8C6D3B]/50 space-y-1.5 font-serif-prose text-xs text-[#3E2F23]">
                  <span className="text-[10px] font-technical uppercase text-[#8C3A27] block font-bold">
                    Shilpa Shastra Philosophical Commentary
                  </span>
                  <p className="italic leading-relaxed">
                    "{selectedComponent.philosophicalNote}"
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-[#735A42] space-y-2">
                <Layers className="w-8 h-8 mx-auto text-[#8C6D3B] opacity-60" />
                <p className="text-xs font-serif-prose italic">
                  Tap any component in the exploded view or select below to examine its internal anatomy.
                </p>
              </div>
            )}

            {/* Quick Component Selection Buttons */}
            <div className="mt-4 pt-3 border-t border-[#8C6D3B]/30">
              <span className="text-[10px] font-technical text-[#735A42] uppercase block mb-2">
                Quick Select Assemblies:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {components.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => handleComponentClick(comp)}
                    className={`p-2 text-left text-xs font-technical rounded border transition-all cursor-pointer truncate ${
                      selectedComponent?.id === comp.id
                        ? 'border-[#8C3A27] bg-[#8C3A27] text-white font-bold'
                        : 'border-[#CBB89A] bg-[#F5ECDA] text-[#4A3B2C] hover:bg-[#EBDDC5]'
                    }`}
                  >
                    {comp.name.split(' ')[0]} {comp.name.split(' ')[1] || ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Ask Shilpin Guide About This Component */}
          {selectedComponent && (
            <div className="pt-3 border-t border-[#8C6D3B]/30">
              <button
                onClick={() => onOpenShilpinChatWithComponent(selectedComponent)}
                className="w-full py-2.5 px-4 rounded bg-[#8A251E] hover:bg-[#A32F27] text-white font-technical text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFD199]" />
                <span>Ask Shilpin About {selectedComponent.name.split(' ')[0]}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
