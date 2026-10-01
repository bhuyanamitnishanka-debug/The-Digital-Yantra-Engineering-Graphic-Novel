import React from 'react';
import { X, BookOpen, Scroll, Quote, ExternalLink, Bookmark } from 'lucide-react';
import { sound } from '../utils/audio';

interface CodexDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodexDrawer: React.FC<CodexDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="w-full max-w-xl bg-[#FAF4E6] border-l-2 border-[#8C6D3B] shadow-2xl h-full flex flex-col overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#23180F] text-[#FFF8E7] flex items-center justify-between border-b border-[#8C6D3B]/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h3 className="font-display font-bold text-base tracking-wider text-[#F4EDE0]">
                The Shilpin Codex
              </h3>
              <p className="text-[11px] font-serif-prose italic text-[#CBB89A]">
                Graphic Novel Storyboard Script & Philosophical Footnotes
              </p>
            </div>
          </div>

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

        {/* Storyboard Script & Footnotes Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-[#2B1F16]">
          {/* Executive Preface */}
          <div className="p-4 bg-[#EFE4CE] rounded border border-[#8C6D3B]/50 font-serif-prose text-xs sm:text-sm italic leading-relaxed text-[#3E2F23]">
            <Quote className="w-4 h-4 text-[#8C3A27] mb-1 opacity-70" />
            "Before the first copper line was etched by laser, the priest-architects of antiquity stretched flax cords across the red soil to measure temple foundations. The smartphone in your palm is not merely a tool of telecommunications; it is a portable temple, its silicon sanctum pulsating with billions of deliberate intentions."
          </div>

          {/* Scene 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-technical text-xs font-bold text-[#8C3A27] uppercase">
                SCENE I: THE PARAMETRIC GENESIS
              </span>
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base text-[#2B1F16]">
              The Coordinate Cord & The Brahmasutra
            </h4>
            <p className="text-xs sm:text-sm font-serif-prose leading-relaxed text-[#4A3B2C]">
              <strong>NARRATOR (V.O.):</strong> "In the beginning was the grid. Not the Cartesian coldness of empty space, but the Talamana Padhati — the living proportion of the human hand and eye. When industrial designers sketch the horizontal visor of the flagship monolith, they do not invent; they remember."
            </p>
            <p className="text-xs sm:text-sm font-serif-prose leading-relaxed text-[#4A3B2C]">
              <strong>THE SHILPIN:</strong> "Observe the central datum line. In sculpture, this is the Brahmasutra, the plum-line from crown to heel that maintains spiritual equilibrium. In modern hardware, it is the optical visor, anchoring the camera lenses so the monolith rests without rock upon any surface."
            </p>
          </div>

          {/* Scene 2 */}
          <div className="space-y-2 pt-3 border-t border-[#8C6D3B]/30">
            <div className="flex items-center gap-2">
              <span className="font-technical text-xs font-bold text-[#8C3A27] uppercase">
                SCENE II: THE EXPLODED CHAMBER
              </span>
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base text-[#2B1F16]">
              The Slicing of Light & The Copper Yantra
            </h4>
            <p className="text-xs sm:text-sm font-serif-prose leading-relaxed text-[#4A3B2C]">
              <strong>NARRATOR (V.O.):</strong> "The phone pulls apart into seven celestial tiers. Floating in midair, seven aspherical lenses hover like drops of petrified dew. Light enters as chaos and emerges as sharp, digitized reality."
            </p>
            <p className="text-xs sm:text-sm font-serif-prose leading-relaxed text-[#4A3B2C]">
              <strong>THE SHILPIN:</strong> "Look at the printed circuit board. Why do the traces bend at forty-five degrees rather than right angles? An engineer will speak of transmission-line reflection and characteristic impedance. The Shilpin smiles: it is the same reason sacred yantras employ diagonal radials — to keep the flow of Prana from colliding with itself."
            </p>
          </div>

          {/* Scene 3 */}
          <div className="space-y-2 pt-3 border-t border-[#8C6D3B]/30">
            <div className="flex items-center gap-2">
              <span className="font-technical text-xs font-bold text-[#8C3A27] uppercase">
                SCENE III: THE MONOLITHIC RESOLUTION
              </span>
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base text-[#2B1F16]">
              The Unyielding Artifact
            </h4>
            <p className="text-xs sm:text-sm font-serif-prose leading-relaxed text-[#4A3B2C]">
              <strong>NARRATOR (V.O.):</strong> "The exploded layers snap back with a resonant chime. What was hundreds of fragile microscopic components is now a single monolithic stone of glass and aluminum. Sealed against dust and water, it enters the pocket of modern humanity."
            </p>
          </div>

          {/* Academic & Historical Footnotes */}
          <div className="pt-4 border-t-2 border-[#8C6D3B]/40 space-y-3">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#8C3A27]" />
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#2B1F16]">
                Scholarly Citations & Historical Foundations
              </h4>
            </div>

            <div className="space-y-2 text-xs font-technical text-[#5A4533]">
              <div className="p-2.5 bg-[#F5ECDA] rounded border border-[#CBB89A]">
                <span className="font-bold text-[#8C3A27] block">1. Chitrasutra, Chapter 41 (Pramana & Rupa-Bheda)</span>
                Details the five canonical measurements (Mana, Pramana, Parimana, Lambamana, and Unmana) governing anatomical and architectural proportions.
              </div>

              <div className="p-2.5 bg-[#F5ECDA] rounded border border-[#CBB89A]">
                <span className="font-bold text-[#8C3A27] block">2. Baudhayana Sulba Sutra (c. 800 BCE)</span>
                The earliest recorded geometric treatise on cord-stretching, root-two approximations, and concentric altar circumscriptions.
              </div>

              <div className="p-2.5 bg-[#F5ECDA] rounded border border-[#CBB89A]">
                <span className="font-bold text-[#8C3A27] block">3. EUV Photolithography as Sacred Inscription</span>
                Modern 13.5nm extreme ultraviolet lithography projects mask reticles onto silicon wafers through reflective Bragg mirrors, repeating the ancient rite of micro-inscribing sacred mantras onto copper talisman plates.
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-[#FAF4E6] border-t border-[#8C6D3B]/40 flex justify-between items-center text-xs font-technical text-[#7A624A] shrink-0">
          <span>THE DIGITAL YANTRA ARCHIVE</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#8C3A27] hover:bg-[#A3442E] text-white rounded font-bold uppercase transition-colors cursor-pointer"
          >
            Close Codex
          </button>
        </div>
      </div>
    </div>
  );
};
