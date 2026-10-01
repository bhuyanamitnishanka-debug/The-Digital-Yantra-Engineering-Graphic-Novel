import React, { useState, useEffect } from 'react';
import { Sliders, RefreshCw, Compass, CheckCircle2, ChevronRight, Binary } from 'lucide-react';
import { ParametricSettings } from '../../types';
import { sound } from '../../utils/audio';

interface Tier1GenesisProps {
  settings: ParametricSettings;
  onUpdateSettings: (settings: ParametricSettings) => void;
  onSelectComponentForChat: (name: string, category: string) => void;
}

export const Tier1Genesis: React.FC<Tier1GenesisProps> = ({
  settings,
  onUpdateSettings,
  onSelectComponentForChat,
}) => {
  const [harmonyScore, setHarmonyScore] = useState<number>(98.4);
  const [commentary, setCommentary] = useState<string>(
    "The 19.5:9 flagship aspect ratio derives from the Sulba Sutras' root-rectangle construction. The central camera visor meridian aligns with the Brahmasutra (the divine vertical axis)."
  );
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [hoveredCoordinate, setHoveredCoordinate] = useState<string | null>(null);

  // Re-calculate harmony when sliders change
  const handleSliderChange = (key: keyof ParametricSettings, value: number | boolean) => {
    sound.playClick();
    const newSettings = { ...settings, [key]: value };
    onUpdateSettings(newSettings);

    // Dynamic mathematical calculation
    const phi = 1.6180339887;
    const rFactor = newSettings.visorRadius / 24;
    const fFactor = newSettings.focalAxis / 50;
    const delta = Math.abs(rFactor * fFactor - 1 / phi);
    const score = Math.max(91.2, Math.min(99.8, 100 - delta * 20));
    setHarmonyScore(parseFloat(score.toFixed(1)));
  };

  const handleRecalculateAI = async () => {
    setIsCalculating(true);
    sound.playChime(640);
    try {
      const res = await fetch('/api/shilpin/calculate-grid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setHarmonyScore(data.harmonyIndex);
        setCommentary(data.commentary);
      }
    } catch (e) {
      console.warn('Recalculation fallback', e);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Narrative Dialogue Box from Storyboard Scene 1 */}
      <div className="p-4 bg-[#211A13] border-l-4 border-[#8C3A27] rounded-r text-[#FFF8E7] shadow-md space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-technical text-xs font-bold text-[#E8BD56] uppercase tracking-wider">
            FRAME 01 // THE TALAMANA GENESIS
          </span>
          <span className="text-[10px] font-technical text-[#A8987E] uppercase">
            AI System Narrator
          </span>
        </div>
        <p className="font-serif-prose italic text-sm text-[#EBE5D8] leading-relaxed">
          "No form manifests by chance. Before silicon is etched or metal forged, the device exists purely as mathematical truth. We lay down the root parameters—defining the arc of the camera visor and the focal alignment of the lenses within a strict iconometric grid."
        </p>
        <div className="pt-1 flex items-center justify-end">
          <button
            onClick={() => {
              sound.playClick();
              const el = document.getElementById('tier2');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3.5 py-1.5 bg-[#8C3A27] hover:bg-[#A3442E] text-white rounded font-technical text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow transition-all cursor-pointer"
          >
            <span>Swipe Down to Materialize</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Intro Narrative Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Parametric Vector Canvas */}
        <div className="lg:col-span-8 bg-[#FAF4E6]/95 border-2 border-[#8C6D3B]/80 rounded p-3 sm:p-5 shadow-md relative overflow-hidden">
          {/* Canvas Blueprint Grid Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#8C6D3B]/30 mb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#8C3A27]" />
              <span className="font-technical text-xs font-semibold text-[#4A3B2C] uppercase tracking-wider">
                Coordinate Matrix: Talamana Root Grid
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-technical text-[#7A624A]">
              <span>X: 0 → 400</span>
              <span>·</span>
              <span>Y: 0 → 300</span>
              <span>·</span>
              <span className="text-[#8C3A27] font-semibold">Φ: 1.61803</span>
            </div>
          </div>

          {/* SVG Vector Drawing of Sacred Geometry & Engineering Grids */}
          <div className="relative aspect-[16/10] w-full bg-[#FDFBF7] border border-[#CBB89A] rounded shadow-inner flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 400 250"
              className="w-full h-full select-none"
              style={{ filter: 'drop-shadow(0 1px 2px rgba(80,50,20,0.1))' }}
            >
              <defs>
                {/* Millimeter grid pattern */}
                <pattern id="millimeterGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#8C6D3B" strokeWidth="0.25" opacity="0.3" />
                </pattern>
                <pattern id="majorGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#8C6D3B" strokeWidth="0.75" opacity="0.5" />
                </pattern>
              </defs>

              {/* Grid Backgrounds */}
              <rect width="400" height="250" fill="url(#millimeterGrid)" />
              <rect width="400" height="250" fill="url(#majorGrid)" />

              {/* Central Coordinate Axes (Brahmasutra / Madhyasutra) */}
              <line x1="200" y1="0" x2="200" y2="250" stroke="#8C3A27" strokeWidth="1" strokeDasharray="3 2" />
              <line x1="0" y1="125" x2="400" y2="125" stroke="#8C3A27" strokeWidth="1" strokeDasharray="3 2" />

              {/* Concentric Talamana Circles (Based on symmetry and radius settings) */}
              {[40, 70, 95, 115].map((r, i) => (
                <circle
                  key={i}
                  cx="200"
                  cy="125"
                  r={(r * settings.visorRadius) / 24}
                  fill="none"
                  stroke="#8C6D3B"
                  strokeWidth={i === 1 ? '1.5' : '0.75'}
                  strokeDasharray={i % 2 === 0 ? '4 2' : 'none'}
                  opacity={0.65}
                />
              ))}

              {/* Radial Symmetry Rays (Ashtanga / Navagraha) */}
              {Array.from({ length: settings.symmetryDivisions }).map((_, i) => {
                const angle = (i * 360) / settings.symmetryDivisions;
                const rad = (angle * Math.PI) / 180;
                const x2 = 200 + Math.cos(rad) * 120;
                const y2 = 125 + Math.sin(rad) * 120;
                return (
                  <line
                    key={i}
                    x1="200"
                    y1="125"
                    x2={x2}
                    y2={y2}
                    stroke="#A88B58"
                    strokeWidth="0.6"
                    opacity="0.5"
                  />
                );
              })}

              {/* Interlocking Sacred Triangles (Sri Yantra Foundation) */}
              <polygon
                points="200,45 285,185 115,185"
                fill="none"
                stroke="#69857B"
                strokeWidth="1.2"
                opacity="0.75"
              />
              <polygon
                points="200,205 120,75 280,75"
                fill="none"
                stroke="#69857B"
                strokeWidth="1.2"
                opacity="0.75"
              />

              {/* Smartphone Chassis Geometric Outline (19.5:9 Golden Rectangle) */}
              <rect
                x="85"
                y="20"
                width="230"
                height="210"
                rx="28"
                fill="none"
                stroke="#2B1F16"
                strokeWidth="2"
                opacity="0.85"
              />

              {/* Camera Visor Boundary (Dynamically adjusted by visorRadius) */}
              <rect
                x="85"
                y="55"
                width="230"
                height={(settings.visorRadius / 24) * 44}
                rx={(settings.visorRadius / 24) * 18}
                fill="rgba(140, 109, 59, 0.08)"
                stroke="#8C3A27"
                strokeWidth="1.8"
              />

              {/* Optical Lens Apertures Inside Visor */}
              <circle cx="145" cy={55 + ((settings.visorRadius / 24) * 44) / 2} r="14" fill="none" stroke="#2B1F16" strokeWidth="1.5" />
              <circle cx="145" cy={55 + ((settings.visorRadius / 24) * 44) / 2} r="8" fill="#1D2A3A" opacity="0.3" />
              
              <circle cx="185" cy={55 + ((settings.visorRadius / 24) * 44) / 2} r="12" fill="none" stroke="#2B1F16" strokeWidth="1.5" />
              <circle cx="185" cy={55 + ((settings.visorRadius / 24) * 44) / 2} r="6" fill="#1D2A3A" opacity="0.3" />

              <rect
                x="225"
                y={55 + ((settings.visorRadius / 24) * 44) / 2 - 10}
                width="24"
                height="20"
                rx="4"
                fill="none"
                stroke="#2B1F16"
                strokeWidth="1.5"
              />
              <circle cx="237" cy={55 + ((settings.visorRadius / 24) * 44) / 2} r="7" fill="#1D2A3A" opacity="0.3" />

              {/* Simulated Light Rays entering lenses (Focal axis ray-tracing) */}
              <path
                d={`M 145 0 L 145 55 Q 145 ${85 + (settings.focalAxis / 50) * 40} 200 ${125 + (settings.focalAxis / 50) * 30}`}
                fill="none"
                stroke="#0EA5E9"
                strokeWidth="1.2"
                strokeDasharray="4 2"
                className="animate-pulse"
              />

              {/* Copper PCB Bus Tracks (Simulated based on busDensity) */}
              {Array.from({ length: Math.min(settings.busDensity, 20) }).map((_, i) => {
                const step = i * 4;
                return (
                  <path
                    key={i}
                    d={`M ${110 + step} 130 L ${130 + step} 150 L ${130 + step} 200`}
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="1.2"
                    opacity="0.8"
                  />
                );
              })}

              {/* Central Bindu (Focal Center) */}
              <circle cx="200" cy="125" r="3" fill="#8C3A27" />
              <circle cx="200" cy="125" r="7" fill="none" stroke="#8C3A27" strokeWidth="0.8" />

              {/* Interactive Coordinate Hotspots */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredCoordinate("Brahmasutra / Optical Meridian Axis (0,0)")}
                onMouseLeave={() => setHoveredCoordinate(null)}
              >
                <circle cx="200" cy="125" r="12" fill="transparent" />
              </g>

              {/* Coordinate Annotation Text */}
              <text x="210" y="122" fill="#8C3A27" fontSize="9" fontFamily="monospace" fontWeight="bold">
                BINDU (200, 125)
              </text>
              <text x="90" y="48" fill="#5A4736" fontSize="8" fontFamily="monospace">
                R={settings.visorRadius}mm · VISOR CURVATURE
              </text>
              <text x="240" y="225" fill="#0EA5E9" fontSize="8" fontFamily="monospace">
                F={settings.focalAxis}mm · RAY AXIS
              </text>
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredCoordinate && (
              <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-[#23180F] text-[#FFF8E7] text-xs font-technical rounded shadow-md border border-[#8C6D3B]">
                {hoveredCoordinate}
              </div>
            )}
          </div>

          {/* Real-time Math Matrix & Harmony Readout */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-[#8C6D3B]/30 font-technical text-xs">
            <div className="p-2 bg-[#F3EAD5] rounded border border-[#CBB89A]">
              <span className="text-[#7A624A] block text-[10px] uppercase">Harmony Index</span>
              <span className="text-base font-bold text-[#8C3A27]">{harmonyScore}%</span>
            </div>
            <div className="p-2 bg-[#F3EAD5] rounded border border-[#CBB89A]">
              <span className="text-[#7A624A] block text-[10px] uppercase">Golden Ratio Delta</span>
              <span className="text-base font-bold text-[#2B1F16]">
                {(Math.abs(settings.visorRadius / 24 - 1.618)).toFixed(3)}
              </span>
            </div>
            <div className="p-2 bg-[#F3EAD5] rounded border border-[#CBB89A]">
              <span className="text-[#7A624A] block text-[10px] uppercase">Optical F-Stop</span>
              <span className="text-base font-bold text-[#0D5B75]">
                f/{(settings.focalAxis / 29.7).toFixed(2)}
              </span>
            </div>
            <div className="p-2 bg-[#F3EAD5] rounded border border-[#CBB89A]">
              <span className="text-[#7A624A] block text-[10px] uppercase">Bus Track Pitch</span>
              <span className="text-base font-bold text-[#B45309]">
                {(100 / settings.busDensity).toFixed(1)} µm
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Google AI Studio Parametric Controls Deck */}
        <div className="lg:col-span-4 bg-[#FAF4E6]/95 border-2 border-[#8C6D3B]/80 rounded p-4 sm:p-5 shadow-md flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#8C6D3B]/30 mb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#8C3A27]" />
                <h3 className="font-display text-sm font-bold text-[#2B1F16] uppercase tracking-wider">
                  Parametric Generator
                </h3>
              </div>
              <span className="text-[10px] font-technical px-2 py-0.5 rounded bg-[#8C6D3B]/20 text-[#543E2B]">
                AI STUDIO LIVE
              </span>
            </div>

            <p className="text-xs font-serif-prose text-[#5A4533] leading-relaxed mb-4">
              Adjust foundational iconometric parameters. The Shilpin engine re-calculates the root grid vectors and transmits optical-mechanical constraints down to the assembly tier.
            </p>

            {/* Slider 1: Camera Visor Radius */}
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-xs font-technical text-[#3C2D20]">
                <span>Visor Curvature Radius</span>
                <span className="font-bold text-[#8C3A27]">{settings.visorRadius} mm</span>
              </div>
              <input
                type="range"
                min="16"
                max="36"
                step="1"
                value={settings.visorRadius}
                onChange={(e) => handleSliderChange('visorRadius', parseInt(e.target.value))}
                className="w-full accent-[#8C3A27] bg-[#D7C4A5] h-1.5 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-technical text-[#8C765E]">
                <span>16mm (Compact)</span>
                <span>24mm (Nominal)</span>
                <span>36mm (Broad)</span>
              </div>
            </div>

            {/* Slider 2: Optical Ray Focal Axis */}
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-xs font-technical text-[#3C2D20]">
                <span>Optical Ray Focal Axis</span>
                <span className="font-bold text-[#0D5B75]">{settings.focalAxis} mm</span>
              </div>
              <input
                type="range"
                min="24"
                max="75"
                step="1"
                value={settings.focalAxis}
                onChange={(e) => handleSliderChange('focalAxis', parseInt(e.target.value))}
                className="w-full accent-[#0D5B75] bg-[#D7C4A5] h-1.5 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-technical text-[#8C765E]">
                <span>24mm (Wide)</span>
                <span>50mm (Human Eye)</span>
                <span>75mm (Telephoto)</span>
              </div>
            </div>

            {/* Slider 3: Copper Bus Density */}
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-xs font-technical text-[#3C2D20]">
                <span>Copper Bus Yantra Density</span>
                <span className="font-bold text-[#B45309]">{settings.busDensity} tracks</span>
              </div>
              <input
                type="range"
                min="8"
                max="32"
                step="2"
                value={settings.busDensity}
                onChange={(e) => handleSliderChange('busDensity', parseInt(e.target.value))}
                className="w-full accent-[#B45309] bg-[#D7C4A5] h-1.5 rounded cursor-pointer"
              />
            </div>

            {/* Radial Symmetry Selector */}
            <div className="space-y-1.5 mb-5">
              <label className="text-xs font-technical text-[#3C2D20] block">
                Sacred Proportion Fold (Symmetry)
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[6, 8, 9, 12].map((folds) => (
                  <button
                    key={folds}
                    onClick={() => handleSliderChange('symmetryDivisions', folds)}
                    className={`py-1.5 text-xs font-technical rounded border transition-all cursor-pointer ${
                      settings.symmetryDivisions === folds
                        ? 'border-[#8C3A27] bg-[#8C3A27] text-white font-bold'
                        : 'border-[#CBB89A] bg-[#F3EAD5] text-[#5A4533] hover:bg-[#EAE0C8]'
                    }`}
                  >
                    {folds}-Fold
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Recalculate Trigger & Narrative Commentary */}
          <div className="pt-3 border-t border-[#8C6D3B]/30 space-y-3">
            <button
              onClick={handleRecalculateAI}
              disabled={isCalculating}
              className="w-full py-2.5 px-4 rounded bg-[#8C3A27] hover:bg-[#A3442E] text-white font-technical text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCalculating ? 'animate-spin' : ''}`} />
              <span>{isCalculating ? 'Computing Harmonics...' : 'Gemini Harmonize Grid'}</span>
            </button>

            <div className="p-3 bg-[#EFE4CE] border border-[#CBB89A] rounded text-xs font-serif-prose text-[#3E2F23] italic leading-relaxed">
              "{commentary}"
            </div>

            <button
              onClick={() => onSelectComponentForChat("Talamana Geometric Grid", "Genesis")}
              className="w-full text-center text-xs font-technical text-[#8C3A27] hover:underline flex items-center justify-center gap-1 cursor-pointer pt-1"
            >
              <span>Query Shilpin on Sacred Proportions</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
