import React, { useState } from 'react';
import { ShieldCheck, Compass, Sparkles, Check, RotateCw, Eye } from 'lucide-react';
import { ParametricSettings } from '../../types';
import { sound } from '../../utils/audio';

interface Tier3MonolithProps {
  settings: ParametricSettings;
  onOpenShilpinChat: () => void;
}

export const Tier3Monolith: React.FC<Tier3MonolithProps> = ({
  settings,
  onOpenShilpinChat,
}) => {
  const [showMandorlaGrid, setShowMandorlaGrid] = useState<boolean>(true);
  const [activeMaterial, setActiveMaterial] = useState<string>('glass');
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // -10 to +10 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15; // -7.5 to +7.5 deg
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const materialsInfo: Record<string, { name: string; specs: string; philosophy: string }> = {
    glass: {
      name: "Frosted Matte Gorilla Glass Victus 2",
      specs: "Chemically strengthened alkali-aluminosilicate glass with micro-etched satin surface texture. Resists 2m drops on asphalt.",
      philosophy: "Reflects the Shilpa concept of 'Kanti' (subtle luminescence) — diffusing harsh ambient glare into a tranquil, skin-like tactile warmth."
    },
    aluminum: {
      name: "Aerospace 7000-Series Recycled Aluminum Unibody",
      specs: "100% recycled alloy, cold-forged and 5-axis CNC-milled, bead-blasted with zirconia media and type-II anodized.",
      philosophy: "The structural spine (Kavacha) distributing kinetic impact symmetrically throughout the perimeter frame."
    },
    visor: {
      name: "Architectural Camera Visor Pediment",
      specs: "Hermetically laser-welded dual-perimeter visor containing the 50MP wide, 48MP periscope telephoto, and spectral sensor.",
      philosophy: "The physical incarnation of the Brahmasutra: a definitive horizontal datum line that establishes perfect balance when held or resting upon a flat plane."
    },
    seal: {
      name: "Hermetic IP68 Submersion Barrier",
      specs: "Liquid silicone injection gaskets and acoustic-permeable ePTFE membranes preventing ingress up to 1.5m depth for 30 minutes.",
      philosophy: "The sacred boundary (Rekha) separating the delicate inner prana (micro-electronics) from the turbulent external elements."
    }
  };

  const currentMat = materialsInfo[activeMaterial];

  return (
    <div className="space-y-6">
      {/* Narrative Dialogue Box from Storyboard Scene 3 */}
      <div className="p-4 bg-[#211A13] border-l-4 border-[#8C3A27] rounded-r text-[#FFF8E7] shadow-md space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-technical text-xs font-bold text-[#E8BD56] uppercase tracking-wider">
            FRAME 03 // THE POLISHED PRATIMA
          </span>
          <span className="text-[10px] font-technical text-[#A8987E] uppercase">
            AI System Narrator
          </span>
        </div>
        <p className="font-serif-prose italic text-sm text-[#EBE5D8] leading-relaxed">
          "The mathematical equations of the top tier have hardened into physical truth. Forged aluminum perimeter bands, a satin-finished camera visor, and frosted matte glass form a balanced, material monolith. The cycle is complete."
        </p>
      </div>

      {/* Viewport Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 bg-[#FAF4E6]/95 border-2 border-[#8C6D3B]/80 rounded shadow-md">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#8C3A27]" />
          <span className="font-technical text-xs font-semibold text-[#4A3B2C] uppercase tracking-wider">
            Monolithic Resolution · Divine Symmetrical Twin
          </span>
        </div>

        {/* Mandorla Overlay Toggle */}
        <button
          onClick={() => {
            sound.playClick();
            setShowMandorlaGrid(!showMandorlaGrid);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-technical rounded border transition-all cursor-pointer ${
            showMandorlaGrid
              ? 'border-[#8C3A27] bg-[#8C3A27] text-white font-semibold'
              : 'border-[#CBB89A] bg-[#F5ECDA] text-[#69553F]'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Sacred Mandorla Grid: {showMandorlaGrid ? 'VISIBLE' : 'HIDDEN'}</span>
        </button>
      </div>

      {/* Main Resolution Canvas & Material Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 3D-Tilt Monolith Viewport */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-8 bg-[#FAF4E6]/95 border-2 border-[#8C6D3B]/80 rounded p-4 sm:p-6 shadow-lg relative overflow-hidden flex flex-col items-center justify-center min-h-[440px] cursor-grab active:cursor-grabbing select-none"
        >
          {/* Subtle Canvas Background Texture */}
          <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(140,109,59,0.15) 0%, transparent 70%)'
          }} />

          {/* Device and Mandorla SVG Graphic with 3D tilt */}
          <div
            className="w-full max-w-[540px] transition-transform duration-150 ease-out"
            style={{
              transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <svg
              viewBox="0 0 540 380"
              className="w-full h-auto select-none"
              style={{ filter: 'drop-shadow(0 15px 35px rgba(40,25,10,0.35))' }}
            >
              <defs>
                {/* Frosted ceramic back glass gradient */}
                <linearGradient id="backGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F9F6F0" />
                  <stop offset="45%" stopColor="#EFECE5" />
                  <stop offset="100%" stopColor="#DDD8CE" />
                </linearGradient>

                {/* Polished aerospace visor bar */}
                <linearGradient id="visorBarGrad" x1="0%" y1="0%" x2="100%" y2="30%">
                  <stop offset="0%" stopColor="#E8E4DC" />
                  <stop offset="50%" stopColor="#C8C3B8" />
                  <stop offset="100%" stopColor="#B3ACA0" />
                </linearGradient>

                {/* Specular Glint */}
                <linearGradient id="glintSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#FFF" stopOpacity="0" />
                  <stop offset="100%" stopColor="#FFF" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* ========================================================== */}
              {/* SACRED MANDORLA GRID BACKGROUND (Talamana Coordinate Lines) */}
              {/* ========================================================== */}
              {showMandorlaGrid && (
                <g className="transition-opacity duration-300 pointer-events-none">
                  {/* Concentric Golden Mandorla Ovals */}
                  <ellipse cx="270" cy="190" rx="230" ry="140" fill="none" stroke="#8C6D3B" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
                  <ellipse cx="270" cy="190" rx="180" ry="110" fill="none" stroke="#8C6D3B" strokeWidth="0.6" strokeDasharray="6 3" opacity="0.5" />
                  <ellipse cx="270" cy="190" rx="130" ry="80" fill="none" stroke="#8C6D3B" strokeWidth="0.8" opacity="0.7" />

                  {/* Golden Ratio Rays & Harmonics */}
                  <line x1="40" y1="190" x2="500" y2="190" stroke="#8C3A27" strokeWidth="1" strokeDasharray="4 2" opacity="0.7" />
                  <line x1="270" y1="40" x2="270" y2="340" stroke="#8C3A27" strokeWidth="1" strokeDasharray="4 2" opacity="0.7" />

                  {/* Diagonal Root Rectangles */}
                  <rect x="135" y="85" width="270" height="210" rx="10" fill="none" stroke="#8C6D3B" strokeWidth="0.7" opacity="0.4" />
                  <line x1="135" y1="85" x2="405" y2="295" stroke="#A88B58" strokeWidth="0.5" opacity="0.4" />
                  <line x1="135" y1="295" x2="405" y2="85" stroke="#A88B58" strokeWidth="0.5" opacity="0.4" />

                  {/* Sanskrit / Technical Labels */}
                  <text x="280" y="60" fill="#8C3A27" fontSize="8" fontFamily="monospace" fontWeight="bold">
                    BRAHMASUTRA AXIS
                  </text>
                  <text x="440" y="185" fill="#8C6D3B" fontSize="8" fontFamily="monospace">
                    MADHYASUTRA
                  </text>
                </g>
              )}

              {/* ========================================================== */}
              {/* THE FINISHED SMARTPHONE MONOLITH (Isometric Perspective)  */}
              {/* ========================================================== */}
              {/* Cast Drop Shadow under device */}
              <ellipse cx="270" cy="275" rx="190" ry="45" fill="rgba(60, 40, 20, 0.25)" filter="blur(10px)" />

              {/* Phone Unibody Chassis Base (Curved Corners, 19.5:9 proportion) */}
              <g
                className="cursor-pointer"
                onClick={() => {
                  sound.playChime(480);
                  setActiveMaterial('glass');
                }}
              >
                {/* 3D Isometric Thickness Rim (Aluminum Edge) */}
                <path
                  d="M 120 220 C 120 250, 150 280, 190 285 L 390 190 C 430 170, 440 140, 440 115 L 440 100 L 120 205 Z"
                  fill="#948D80"
                  stroke="#6B6458"
                  strokeWidth="1.5"
                />

                {/* Back Glass Plate (Smooth, rounded corners) */}
                <path
                  d="M 160 210 C 130 225, 125 210, 140 185 L 290 85 C 310 70, 340 75, 360 90 L 415 130 C 435 145, 430 165, 410 180 L 220 265 C 190 280, 175 270, 160 210 Z"
                  fill="url(#backGlassGrad)"
                  stroke="#B8B0A2"
                  strokeWidth="2"
                />

                {/* Specular Light Sheen sweep across back glass */}
                <path
                  d="M 170 190 L 320 85 L 350 105 L 200 210 Z"
                  fill="url(#glintSheen)"
                  opacity="0.35"
                />

                {/* Subtle Google 'G' Monogram Glyph in center of glass */}
                <circle cx="280" cy="180" r="10" fill="none" stroke="#A89E90" strokeWidth="2.5" />
                <path d="M 280 180 L 290 180" stroke="#A89E90" strokeWidth="2.5" />
              </g>

              {/* The Iconic Aerospace Aluminum Camera Visor Bar */}
              <g
                className="cursor-pointer"
                onClick={() => {
                  sound.playChime(560);
                  setActiveMaterial('visor');
                }}
              >
                {/* Visor Bar 3D Chamfered Housing */}
                <path
                  d="M 270 95 L 395 155 C 410 162, 415 152, 405 145 L 290 90 C 275 82, 260 88, 270 95 Z"
                  fill="url(#visorBarGrad)"
                  stroke="#787064"
                  strokeWidth="1.8"
                />

                {/* Camera Visor Glass Inset Window (Dark polished pill) */}
                <path
                  d="M 285 102 L 380 148 C 388 152, 392 148, 386 144 L 298 100 C 290 96, 280 98, 285 102 Z"
                  fill="#111827"
                  stroke="#374151"
                  strokeWidth="1.2"
                />

                {/* Optical Lenses peering through visor glass */}
                {/* Main 50MP Wide lens */}
                <ellipse cx="310" cy="112" rx="7" ry="5" fill="#030712" stroke="#4B5563" strokeWidth="1" />
                <circle cx="309" cy="111" r="2.5" fill="#1E40AF" />
                <circle cx="311" cy="110" r="1" fill="#FFF" opacity="0.9" />

                {/* Ultra-wide lens */}
                <ellipse cx="330" cy="122" rx="6" ry="4.5" fill="#030712" stroke="#4B5563" strokeWidth="1" />
                <circle cx="329" cy="121" r="2" fill="#0369A1" />
                <circle cx="331" cy="120" r="0.8" fill="#FFF" opacity="0.9" />

                {/* Periscope 5x Telephoto prism aperture */}
                <rect x="350" y="130" width="10" height="9" rx="2" fill="#030712" stroke="#4B5563" strokeWidth="1" transform="rotate(-25, 355, 134)" />
                <circle cx="355" cy="134" r="2" fill="#0284C7" />

                {/* Dual LED Flash & Spectral Temperature sensor */}
                <circle cx="380" cy="144" r="2.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.8" />
              </g>

              {/* Antenna Band Splits (Dielectric Insulation) */}
              <line x1="210" y1="240" x2="210" y2="250" stroke="#787064" strokeWidth="1.5" />
              <line x1="390" y1="125" x2="390" y2="135" stroke="#787064" strokeWidth="1.5" />

              {/* Material Callout Pointer Dots */}
              <circle cx="280" cy="180" r="4" fill="#8C3A27" stroke="#FFF" strokeWidth="1.5" className="animate-pulse" />
              <line x1="280" y1="180" x2="220" y2="140" stroke="#8C3A27" strokeWidth="1" />
              <text x="140" y="138" fill="#8C3A27" fontSize="9" fontFamily="monospace" fontWeight="bold">
                MATTE FROSTED GLASS
              </text>

              <circle cx="330" cy="110" r="4" fill="#0284C7" stroke="#FFF" strokeWidth="1.5" className="animate-pulse" />
              <line x1="330" y1="110" x2="410" y2="80" stroke="#0284C7" strokeWidth="1" />
              <text x="420" y="80" fill="#0284C7" fontSize="9" fontFamily="monospace" fontWeight="bold">
                ALUMINUM VISOR PEDIMENT
              </text>
            </svg>
          </div>

          {/* Interactive Hint */}
          <div className="mt-2 flex items-center gap-2 text-xs font-technical text-[#735A42] opacity-80">
            <RotateCw className="w-3.5 h-3.5" />
            <span>Hover or drag cursor across viewport to tilt and examine surface reflections</span>
          </div>
        </div>

        {/* Right Column: Material & Finish Inspector */}
        <div className="lg:col-span-4 bg-[#FAF4E6]/95 border-2 border-[#8C6D3B]/80 rounded p-4 sm:p-5 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#8C6D3B]/30 mb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#8C3A27]" />
                <h3 className="font-display text-sm font-bold text-[#2B1F16] uppercase tracking-wider">
                  Material & Finish Inspector
                </h3>
              </div>
              <span className="text-[10px] font-technical px-2 py-0.5 rounded bg-[#8C6D3B]/20 text-[#543E2B]">
                HERMETIC CRAFT
              </span>
            </div>

            {/* Material Selector Tabs */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { id: 'glass', label: 'Frosted Glass' },
                { id: 'aluminum', label: 'Aerospace Al' },
                { id: 'visor', label: 'Camera Visor' },
                { id: 'seal', label: 'IP68 Seal' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveMaterial(tab.id);
                  }}
                  className={`py-2 px-2.5 text-left text-xs font-technical rounded border transition-all cursor-pointer truncate ${
                    activeMaterial === tab.id
                      ? 'border-[#8C3A27] bg-[#8C3A27] text-white font-bold'
                      : 'border-[#CBB89A] bg-[#F5ECDA] text-[#4A3B2C] hover:bg-[#EBDDC5]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Detailed Material Breakdown */}
            <div className="space-y-3.5">
              <div>
                <h4 className="text-base font-display font-bold text-[#2B1F16] leading-snug">
                  {currentMat.name}
                </h4>
              </div>

              <div className="p-3 bg-[#F5ECDA] rounded border border-[#CBB89A] space-y-1 font-technical text-xs text-[#2B1F16]">
                <span className="text-[10px] uppercase text-[#735A42] block font-semibold">
                  Engineering Treatment & Stress Rigor
                </span>
                <p className="leading-relaxed">
                  {currentMat.specs}
                </p>
              </div>

              <div className="p-3 bg-[#EFE4CE] rounded border border-[#8C6D3B]/50 space-y-1 font-serif-prose text-xs text-[#3E2F23]">
                <span className="text-[10px] font-technical uppercase text-[#8C3A27] block font-bold">
                  Iconometric Continuity
                </span>
                <p className="italic leading-relaxed">
                  "{currentMat.philosophy}"
                </p>
              </div>
            </div>
          </div>

          {/* Full Harmony Verification & Summary */}
          <div className="pt-3 border-t border-[#8C6D3B]/30 space-y-3">
            <div className="p-3 bg-[#23180F] text-[#FFF8E7] rounded border border-[#8C6D3B] text-xs font-technical flex items-center justify-between">
              <div>
                <span className="text-[#CBB89A] block text-[10px] uppercase">
                  Talamana Validation
                </span>
                <span className="font-bold text-[#D4AF37]">98.4% Divine Proportion</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#15803D] flex items-center justify-center text-white">
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>

            <button
              onClick={onOpenShilpinChat}
              className="w-full py-2.5 px-4 rounded bg-[#8A251E] hover:bg-[#A32F27] text-white font-technical text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD199]" />
              <span>Discuss Monolith with Shilpin Guide</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
