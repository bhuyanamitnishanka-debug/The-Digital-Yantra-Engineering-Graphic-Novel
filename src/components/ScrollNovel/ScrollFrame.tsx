import React from 'react';

interface ScrollFrameProps {
  id?: string;
  tierNumber: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showConduitDown?: boolean;
  conduitLabel?: string;
}

export const ScrollFrame: React.FC<ScrollFrameProps> = ({
  id,
  tierNumber,
  title,
  subtitle,
  children,
  showConduitDown = true,
  conduitLabel,
}) => {
  return (
    <div id={id} className="relative w-full max-w-6xl mx-auto my-12 px-2 sm:px-4">
      {/* Top Turned Wooden Scroll Roller */}
      <div className="relative flex items-center justify-center -mb-2 z-20">
        {/* Left turned finial handle */}
        <div className="w-6 sm:w-10 h-7 sm:h-9 bg-gradient-to-r from-[#21150c] via-[#482b17] to-[#1a0e07] rounded-l-full shadow-lg border-l border-t border-b border-[#73512e] flex items-center justify-center">
          <div className="w-1.5 sm:w-2 h-4 sm:h-5 rounded-full bg-[#a37939] shadow-inner" />
        </div>

        {/* Main top horizontal roller rod */}
        <div className="flex-1 h-5 sm:h-7 bg-gradient-to-b from-[#3a2012] via-[#5c371d] to-[#241309] shadow-md border-t border-b border-[#79562f] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1px] bg-[#d4af37]/40" />
        </div>

        {/* Right turned finial handle */}
        <div className="w-6 sm:w-10 h-7 sm:h-9 bg-gradient-to-l from-[#21150c] via-[#482b17] to-[#1a0e07] rounded-r-full shadow-lg border-r border-t border-b border-[#73512e] flex items-center justify-center">
          <div className="w-1.5 sm:w-2 h-4 sm:h-5 rounded-full bg-[#a37939] shadow-inner" />
        </div>
      </div>

      {/* The Silk Brocade & Parchment Canvas Container */}
      <div className="relative z-10 p-2.5 sm:p-5 md:p-6 bg-gradient-to-b from-[#1b2b2b] via-[#152323] to-[#101b1b] rounded-sm shadow-2xl border border-[#3f524e]">
        {/* Decorative Silk Weave Border Pattern */}
        <div className="relative p-2 sm:p-4 bg-[#0d1616] rounded-sm border border-[#5a746e]/40 shadow-inner">
          {/* Inner Parchment Leaf */}
          <div className="relative parchment-texture text-[#281e14] rounded-sm p-4 sm:p-6 md:p-8 border-2 border-[#8C6D3B] shadow-[inset_0_0_40px_rgba(110,75,30,0.35)] overflow-hidden">
            {/* Classical Ornate Corner Accents */}
            <div className="absolute top-2 left-2 w-8 h-8 pointer-events-none border-t-2 border-l-2 border-[#8C6D3B] flex items-start justify-start p-1">
              <div className="w-3 h-3 border-t border-l border-[#8C6D3B]" />
            </div>
            <div className="absolute top-2 right-2 w-8 h-8 pointer-events-none border-t-2 border-r-2 border-[#8C6D3B] flex items-start justify-end p-1">
              <div className="w-3 h-3 border-t border-r border-[#8C6D3B]" />
            </div>
            <div className="absolute bottom-2 left-2 w-8 h-8 pointer-events-none border-b-2 border-l-2 border-[#8C6D3B] flex items-end justify-start p-1">
              <div className="w-3 h-3 border-b border-l border-[#8C6D3B]" />
            </div>
            <div className="absolute bottom-2 right-2 w-8 h-8 pointer-events-none border-b-2 border-r-2 border-[#8C6D3B] flex items-end justify-end p-1">
              <div className="w-3 h-3 border-b border-r border-[#8C6D3B]" />
            </div>

            {/* Traditional Title Header Ribbon */}
            <div className="relative mb-6 pb-3 border-b-2 border-[#8C6D3B]/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-technical text-xs font-semibold text-[#8C3A27] tracking-wider">
                    [TIER {tierNumber}]
                  </span>
                  <span className="text-[#8C6D3B] font-display text-xs tracking-widest uppercase">
                    CHITRASUTRA TO CAD ARCHIVE
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-black tracking-widest text-[#2B1F16] uppercase mt-1">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-xs sm:text-sm font-serif-prose italic text-[#594230] mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Red Lacquer Shilpin Stamp (Chhap) */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[#8C3A27]/60 bg-[#8C3A27]/10 rounded text-[#8C3A27]">
                <div className="w-5 h-5 rounded-full border border-[#8C3A27] flex items-center justify-center text-[10px] font-display font-bold">
                  शिल्प
                </div>
                <div className="text-[10px] font-technical tracking-wider uppercase">
                  TALAMANA PROTOCOL
                </div>
              </div>
            </div>

            {/* Scroll Content Slot */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Turned Wooden Scroll Roller */}
      <div className="relative flex items-center justify-center -mt-2 z-20">
        <div className="w-6 sm:w-10 h-7 sm:h-9 bg-gradient-to-r from-[#21150c] via-[#482b17] to-[#1a0e07] rounded-l-full shadow-lg border-l border-t border-b border-[#73512e] flex items-center justify-center">
          <div className="w-1.5 sm:w-2 h-4 sm:h-5 rounded-full bg-[#a37939] shadow-inner" />
        </div>
        <div className="flex-1 h-5 sm:h-7 bg-gradient-to-b from-[#3a2012] via-[#5c371d] to-[#241309] shadow-md border-t border-b border-[#79562f] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1px] bg-[#d4af37]/40" />
        </div>
        <div className="w-6 sm:w-10 h-7 sm:h-9 bg-gradient-to-l from-[#21150c] via-[#482b17] to-[#1a0e07] rounded-r-full shadow-lg border-r border-t border-b border-[#73512e] flex items-center justify-center">
          <div className="w-1.5 sm:w-2 h-4 sm:h-5 rounded-full bg-[#a37939] shadow-inner" />
        </div>
      </div>

      {/* Downward Vertical Conduit Connecting Cords (As seen in the proposal illustration) */}
      {showConduitDown && (
        <div className="relative h-20 sm:h-28 flex items-center justify-center overflow-hidden my-1">
          {/* Central alignment cord */}
          <div className="w-[2px] h-full bg-gradient-to-b from-[#8C6D3B] via-[#E8BD56] to-[#8C6D3B] relative">
            {/* Animated traveling pulse */}
            <div className="absolute w-2 h-5 -left-[3px] bg-gradient-to-b from-transparent via-[#FFF8E7] to-transparent rounded-full animate-bounce" />
          </div>

          {/* Left and right guide cords */}
          <div className="absolute left-1/4 w-[1px] h-full bg-gradient-to-b from-[#8C6D3B]/40 via-[#E8BD56]/70 to-[#8C6D3B]/40" />
          <div className="absolute right-1/4 w-[1px] h-full bg-gradient-to-b from-[#8C6D3B]/40 via-[#E8BD56]/70 to-[#8C6D3B]/40" />

          {/* Golden conduit label badge */}
          {conduitLabel && (
            <div className="absolute px-3 py-1 bg-[#141210] border border-[#8C6D3B] rounded text-[11px] font-technical text-[#E8BD56] shadow-lg tracking-widest uppercase">
              {conduitLabel} ↓
            </div>
          )}
        </div>
      )}
    </div>
  );
};
