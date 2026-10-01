import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Layers, Presentation } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  onOpenCodex: () => void;
  onOpenIngest: () => void;
  onOpenShilpin: () => void;
  onOpenFlutter?: () => void;
  onOpenDeck?: () => void;
  isAudioOn: boolean;
  onToggleAudio: () => void;
  activeTier: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCodex,
  onOpenIngest,
  onOpenShilpin,
  onOpenFlutter,
  onOpenDeck,
  isAudioOn,
  onToggleAudio,
  activeTier,
}) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 bg-[#141210]/90 backdrop-blur-md border-b border-[#3d3222]/60 text-[#EBE5D8]">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="text-lg md:text-xl font-display font-bold tracking-wider text-[#F4EDE0] hover:text-[#D4AF37] transition-colors whitespace-nowrap"
      >
        The Digital Yantra
      </a>

      {/* Zone 2: 4 Clean Text Navigation Links */}
      <nav className="hidden lg:flex items-center gap-7 text-xs tracking-widest uppercase font-medium text-[#C8BA9E]">
        <a
          href="#tier1"
          onClick={() => sound.playClick()}
          className={`transition-colors hover:text-[#E8BD56] ${
            activeTier === 1 ? 'text-[#E8BD56] font-semibold border-b border-[#E8BD56] pb-0.5' : ''
          }`}
        >
          I. Concept & Grid
        </a>
        <a
          href="#tier2"
          onClick={() => sound.playClick()}
          className={`transition-colors hover:text-[#E8BD56] ${
            activeTier === 2 ? 'text-[#E8BD56] font-semibold border-b border-[#E8BD56] pb-0.5' : ''
          }`}
        >
          II. Exploded Chamber
        </a>
        <a
          href="#tier3"
          onClick={() => sound.playClick()}
          className={`transition-colors hover:text-[#E8BD56] ${
            activeTier === 3 ? 'text-[#E8BD56] font-semibold border-b border-[#E8BD56] pb-0.5' : ''
          }`}
        >
          III. Monolith
        </a>
        <button
          onClick={() => {
            sound.playClick();
            onOpenCodex();
          }}
          className="hover:text-[#E8BD56] transition-colors flex items-center gap-1.5 cursor-pointer text-xs uppercase tracking-widest"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Codex</span>
        </button>
      </nav>

      {/* Zone 3: Action Points */}
      <div className="flex items-center gap-2">
        {/* Ambience audio toggle */}
        <button
          onClick={onToggleAudio}
          title={isAudioOn ? "Mute sacred ambient soundscape" : "Enable sacred ambient soundscape"}
          className={`p-2 rounded-md border transition-all cursor-pointer ${
            isAudioOn
              ? 'border-[#D4AF37]/80 bg-[#D4AF37]/15 text-[#E6C665]'
              : 'border-[#3D3425] bg-[#1E1B16] text-[#A69982] hover:text-[#EBE5D8]'
          }`}
        >
          {isAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Slide Deck trigger */}
        {onOpenDeck && (
          <button
            onClick={() => {
              sound.playClick();
              onOpenDeck();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-technical rounded-md border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] transition-all cursor-pointer whitespace-nowrap"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Slide Deck</span>
          </button>
        )}

        {/* Flutter Suite trigger */}
        {onOpenFlutter && (
          <button
            onClick={() => {
              sound.playClick();
              onOpenFlutter();
            }}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-technical rounded-md border border-[#00A8B5]/40 bg-[#00A8B5]/10 text-[#00A8B5] hover:bg-[#00A8B5]/20 hover:border-[#00A8B5] transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Flutter Spec</span>
          </button>
        )}

        {/* Blueprint Ingestion trigger */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenIngest();
          }}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-[#524430] bg-[#221D17] text-[#D8CCA9] hover:bg-[#2F271D] hover:border-[#856C42] hover:text-[#FFF5DC] transition-all cursor-pointer whitespace-nowrap"
        >
          <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Blueprint Lab</span>
        </button>

        {/* Ask Shilpin Guide button */}
        <button
          onClick={() => {
            sound.playChime(540);
            onOpenShilpin();
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-[#8A251E] hover:bg-[#A32F27] text-[#FFF6E9] shadow-sm transition-all cursor-pointer whitespace-nowrap border border-[#B83E34]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFD199]" />
          <span>Ask Shilpin</span>
        </button>
      </div>
    </header>
  );
};
