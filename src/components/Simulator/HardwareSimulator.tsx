import React, { useState, useRef, useEffect } from 'react';
import { Sliders, Cpu, Eye, EyeOff, RotateCcw, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

// --- YantraTokens (exact match to user's Flutter tokens) ---
export const YantraTokens = {
  parchmentBg: '#F7F4EB',
  structuralInk: '#1E242B',
  geometricGold: '#D4AF37',
  blueprintCyan: '#00A8B5',
};

export const HardwareSimulator: React.FC = () => {
  // Interactive State Variables (Controllable by Recruiters)
  const [visorThickness, setVisorThickness] = useState<number>(24.0);
  const [chassisRadius, setChassisRadius] = useState<number>(16.0);
  const [explosionFactor, setExplosionFactor] = useState<number>(0.35); // 0.0 to 1.0
  const [showTracks, setShowTracks] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Exact reproduction of Flutter's BlueprintCanvasPainter logic on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const center = { x: width / 2, y: height / 2 };

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Background Sacred Math / Grid Lines (The Talamana Matrix)
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 168, 181, 0.4)'; // blueprintCyan with 0.4 opacity
    ctx.lineWidth = 1.0;

    // Concentric circle
    ctx.beginPath();
    ctx.arc(center.x, center.y, height * 0.38, 0, Math.PI * 2);
    ctx.stroke();

    // Central crosshair lines
    ctx.beginPath();
    ctx.moveTo(0, center.y);
    ctx.lineTo(width, center.y);
    ctx.moveTo(center.x, 0);
    ctx.lineTo(center.x, height);
    ctx.stroke();
    ctx.restore();

    // 2. Render Outer Chassis Geometry (Fades/Shifts when exploded)
    const mainWidth = 140.0;
    const mainHeight = 250.0;
    const chassisOffset = explosionFactor * 45.0;

    ctx.save();
    ctx.strokeStyle = YantraTokens.structuralInk;
    ctx.lineWidth = 2.0;

    const chassisX = center.x - mainWidth / 2;
    const chassisY = center.y - mainHeight / 2 + chassisOffset;

    // Draw rounded rect for chassis
    ctx.beginPath();
    ctx.roundRect(chassisX, chassisY, mainWidth, mainHeight, chassisRadius);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // 3. Render Internal Digital Yantra (PCB Tracks Layer)
    if (showTracks) {
      ctx.save();
      const pcbOffset = explosionFactor * -12.0;
      const pcbW = mainWidth - 18;
      const pcbH = mainHeight - 55;
      const pcbX = center.x - pcbW / 2;
      const pcbY = center.y - pcbH / 2 + pcbOffset;

      ctx.strokeStyle = 'rgba(0, 168, 181, 0.5)';
      ctx.lineWidth = 1.0;
      ctx.strokeRect(pcbX, pcbY, pcbW, pcbH);

      // Gold concentric circuit circles
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)'; // geometricGold
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 4; i++) {
        const innerStep = i * 16.0;
        ctx.beginPath();
        ctx.arc(center.x - 24 + innerStep, center.y + pcbOffset, 8 + innerStep, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    // 4. Render Dynamic Camera Visor Module Layer
    const visorOffset = explosionFactor * -70.0;
    const visorW = mainWidth - 10;
    const visorH = visorThickness;
    const visorX = center.x - visorW / 2;
    const visorY = center.y - mainHeight / 3 + visorOffset - visorH / 2;

    ctx.save();
    ctx.strokeStyle = YantraTokens.structuralInk;
    ctx.lineWidth = 2.5;
    ctx.fillStyle = 'rgba(247, 244, 235, 0.95)';

    ctx.beginPath();
    ctx.roundRect(visorX, visorY, visorW, visorH, 8.0);
    ctx.fill();
    ctx.stroke();

    // Render the physical frame and triple-lens array circles
    ctx.lineWidth = 1.8;
    const lensCenterY = visorY + visorH / 2;

    // Lens 1 (Wide)
    ctx.beginPath();
    ctx.arc(center.x - 30, lensCenterY, visorThickness * 0.25, 0, Math.PI * 2);
    ctx.stroke();

    // Lens 2 (Ultra-wide)
    ctx.beginPath();
    ctx.arc(center.x, lensCenterY, visorThickness * 0.25, 0, Math.PI * 2);
    ctx.stroke();

    // Lens 3 (Telephoto)
    ctx.beginPath();
    ctx.arc(center.x + 30, lensCenterY, visorThickness * 0.20, 0, Math.PI * 2);
    ctx.stroke();

    // 5. Optical Ray-Tracing Paths through Lens Elements
    if (explosionFactor > 0.1) {
      ctx.strokeStyle = 'rgba(0, 168, 181, 0.7)'; // blueprintCyan ray
      ctx.lineWidth = 1.0;
      const lensXs = [center.x - 30, center.x, center.x + 30];
      lensXs.forEach((lx) => {
        ctx.beginPath();
        ctx.moveTo(lx - 10, lensCenterY - 30);
        ctx.lineTo(lx, lensCenterY);
        ctx.lineTo(lx, center.y + chassisOffset + 20);
        ctx.moveTo(lx + 10, lensCenterY - 30);
        ctx.lineTo(lx, lensCenterY);
        ctx.stroke();
      });
    }

    ctx.restore();
  }, [visorThickness, chassisRadius, explosionFactor, showTracks]);

  const handleReset = () => {
    sound.playClick();
    setVisorThickness(24.0);
    setChassisRadius(16.0);
    setExplosionFactor(0.35);
    setShowTracks(true);
  };

  return (
    <div
      style={{ backgroundColor: YantraTokens.parchmentBg }}
      className="p-4 sm:p-6 rounded-lg border border-[#1E242B]/20 shadow-md text-[#1E242B]"
    >
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1E242B]/15 mb-4 gap-2">
        <div>
          <span
            style={{ color: YantraTokens.blueprintCyan }}
            className="font-technical text-xs font-bold tracking-widest uppercase block"
          >
            INTERACTIVE DESIGN LAB // REAL-TIME MODEL GENERATOR
          </span>
          <h3 className="font-display font-bold text-lg sm:text-xl tracking-wide text-[#1E242B] mt-0.5">
            Hardware Simulation Sandbox
          </h3>
        </div>

        <button
          onClick={handleReset}
          className="self-start sm:self-center px-3 py-1.5 rounded border border-[#1E242B]/20 hover:bg-[#1E242B]/5 text-xs font-technical flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Parameters</span>
        </button>
      </div>

      {/* Main Split Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Canvas Visual Viewport (Left) */}
        <div className="lg:col-span-7 bg-white/70 rounded-md border border-[#1E242B]/15 p-2 shadow-inner relative flex items-center justify-center min-h-[360px] overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-[340px] select-none cursor-crosshair"
          />

          {/* Coordinate HUD readout */}
          <div className="absolute top-2 left-2 px-2.5 py-1 bg-[#1E242B]/90 text-[#F7F4EB] text-[10px] font-technical rounded shadow-sm border border-[#D4AF37]/50 flex items-center gap-2">
            <span>VISOR: {visorThickness.toFixed(1)}mm</span>
            <span>·</span>
            <span>RADIUS: {chassisRadius.toFixed(1)}px</span>
            <span>·</span>
            <span style={{ color: YantraTokens.geometricGold }}>
              EXPLODE: {(explosionFactor * 100).toFixed(0)}%
            </span>
          </div>

          <div className="absolute bottom-2 right-2 text-[10px] font-technical text-[#00A8B5] font-bold">
            CUSTOM_PAINTER // 60 FPS
          </div>
        </div>

        {/* Parametric Controls Deck (Right) */}
        <div className="lg:col-span-5 space-y-4 p-2 sm:p-3">
          <div>
            <h4 className="font-display font-bold text-sm text-[#1E242B] uppercase tracking-wider">
              Parametric Controls (Talamana Matrix)
            </h4>
            <p className="text-xs font-technical text-[#645642] mt-0.5">
              Live vector recalculation based on slider positions.
            </p>
          </div>

          {/* Slider 1: Camera Visor Scale */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-technical text-[#1E242B]">
              <span>Camera Visor Scale</span>
              <span className="font-bold font-mono text-[#1E242B]">{visorThickness.toFixed(1)} mm</span>
            </div>
            <input
              type="range"
              min="10.0"
              max="45.0"
              step="0.5"
              value={visorThickness}
              onChange={(e) => {
                sound.playClick();
                setVisorThickness(parseFloat(e.target.value));
              }}
              className="w-full accent-[#D4AF37] h-1.5 bg-[#1E242B]/15 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-technical text-[#8C765E]">
              <span>10.0 (Minimal)</span>
              <span>24.0 (Nominal)</span>
              <span>45.0 (Prominent)</span>
            </div>
          </div>

          {/* Slider 2: Chassis Curvature */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-technical text-[#1E242B]">
              <span>Chassis Curvature (Corner Radius)</span>
              <span className="font-bold font-mono text-[#1E242B]">{chassisRadius.toFixed(1)} px</span>
            </div>
            <input
              type="range"
              min="4.0"
              max="32.0"
              step="1.0"
              value={chassisRadius}
              onChange={(e) => {
                sound.playClick();
                setChassisRadius(parseFloat(e.target.value));
              }}
              className="w-full accent-[#D4AF37] h-1.5 bg-[#1E242B]/15 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-technical text-[#8C765E]">
              <span>4.0 (Sharp)</span>
              <span>16.0 (Ergonomic)</span>
              <span>32.0 (Organic)</span>
            </div>
          </div>

          {/* Slider 3: Exploded Anatomy Split */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-technical text-[#1E242B]">
              <span>Exploded Anatomy Split</span>
              <span className="font-bold font-mono text-[#00A8B5]">{explosionFactor.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.02"
              value={explosionFactor}
              onChange={(e) => {
                sound.playClick();
                setExplosionFactor(parseFloat(e.target.value));
              }}
              className="w-full accent-[#00A8B5] h-1.5 bg-[#1E242B]/15 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-technical text-[#8C765E]">
              <span>0.0 (Assembled)</span>
              <span>0.5 (Mid-Flight)</span>
              <span>1.0 (Exploded)</span>
            </div>
          </div>

          {/* Toggle: PCB Copper Yantra Tracks */}
          <div className="pt-2 border-t border-[#1E242B]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-technical text-[#1E242B] font-semibold">
                Render PCB Copper 'Yantra' Tracks
              </span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setShowTracks(!showTracks);
              }}
              className={`px-3 py-1 rounded text-xs font-technical font-bold transition-all cursor-pointer ${
                showTracks
                  ? 'bg-[#00A8B5] text-white'
                  : 'bg-[#1E242B]/10 text-[#645642]'
              }`}
            >
              {showTracks ? 'ACTIVE' : 'MUTED'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
