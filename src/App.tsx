import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ScrollFrame } from './components/ScrollNovel/ScrollFrame';
import { Tier1Genesis } from './components/ScrollNovel/Tier1Genesis';
import { Tier2ExplodedChamber } from './components/ScrollNovel/Tier2ExplodedChamber';
import { Tier3Monolith } from './components/ScrollNovel/Tier3Monolith';
import { ShilpinModal } from './components/ShilpinGuide/ShilpinModal';
import { BlueprintModal } from './components/BlueprintIngest/BlueprintModal';
import { CodexDrawer } from './components/CodexDrawer';
import { FlutterHubModal } from './components/FlutterRoadmap/FlutterHubModal';
import { SlideDeckModal } from './components/Presentation/SlideDeckModal';
import { HardwareSimulator } from './components/Simulator/HardwareSimulator';
import { BlueprintData, HardwareComponent, ParametricSettings } from './types';
import { sound } from './utils/audio';
import { Compass, Sparkles, BookOpen, Layers, ArrowDown, ChevronRight, ChevronDown, Smartphone, Sliders, Presentation } from 'lucide-react';

const initialComponents: HardwareComponent[] = [
  {
    id: "optics-stack",
    name: "7-Element Aspherical Optical Train & Periscope",
    category: "Optics",
    talamanaRole: "Chakshu (The Divine Eye)",
    specs: "50MP 1/1.31\" sensor, f/1.68 aperture, OIS voice-coil actuator, 82° FOV",
    philosophicalNote: "Like the focal bindu in a mandala, light rays refract through precision-molded polycarbonate and fluorite glass, concentrating chaotic ambient photons into coherent digital truth.",
    zExplode: 110,
  },
  {
    id: "tensor-soc",
    name: "Custom Tensor G-Series Neural Accelerator & APU",
    category: "Logic",
    talamanaRole: "Manas (The Processing Mind)",
    specs: "4nm GAAFET photolithography, 8-core CPU cluster, dual-core TPU, Edge TPU ML engine",
    philosophicalNote: "Billions of nanometer gates arranged in geometric matrix banks, executing matrix multiplication akin to ancient Vedic computational mnemonics.",
    zExplode: 20,
  },
  {
    id: "yantra-pcb",
    name: "High-Density Interconnect (HDI) Motherboard Yantra",
    category: "Logic",
    talamanaRole: "Nadi System (Conduits of Vital Flow)",
    specs: "12-layer substrate, micro-vias, impedance-matched 50-ohm copper traces, ENIG finish",
    philosophicalNote: "Copper pathways bend at deliberate 45° angles to prevent signal reflection, echoing the sacred diagonal radials of Vastu Purusha Mandalas.",
    zExplode: 20,
  },
  {
    id: "camera-visor",
    name: "Anodized Aerospace 7000-Series Aluminum Visor",
    category: "Chassis",
    talamanaRole: "Brahmasutra Mandorla (The Horizontal Arch)",
    specs: "CNC-milled unibody bar, laser-etched microphone ports, spectral/flicker sensor aperture",
    philosophicalNote: "Transforms the camera bump from a mechanical compromise into a defiant architectural pediment, anchoring the device's tactile equilibrium.",
    zExplode: 160,
  },
  {
    id: "thermal-chamber",
    name: "Sintered Copper Vapor Chamber & Graphite Array",
    category: "Thermal",
    talamanaRole: "Agni-Soma Balancing (Thermal Dissipation)",
    specs: "0.4mm vacuum-sealed capillary wick structure with deionized water coolant phase change",
    philosophicalNote: "Absorbs thermal agitation from the silicon core and disperses it symmetrically to the perimeter frame, preserving internal systemic equilibrium.",
    zExplode: -20,
  }
];

export default function App() {
  const [activeTier, setActiveTier] = useState<number>(1);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false);
  const [isCodexOpen, setIsCodexOpen] = useState<boolean>(false);
  const [isIngestOpen, setIsIngestOpen] = useState<boolean>(false);
  const [isShilpinOpen, setIsShilpinOpen] = useState<boolean>(false);
  const [isFlutterOpen, setIsFlutterOpen] = useState<boolean>(false);
  const [isDeckOpen, setIsDeckOpen] = useState<boolean>(false);

  const [components, setComponents] = useState<HardwareComponent[]>(initialComponents);
  const [selectedComponent, setSelectedComponent] = useState<HardwareComponent | null>(initialComponents[0]);

  const [settings, setSettings] = useState<ParametricSettings>({
    visorRadius: 24,
    focalAxis: 50,
    busDensity: 16,
    symmetryDivisions: 8,
    goldenRatioMode: true,
  });

  const [activeBlueprintTitle, setActiveBlueprintTitle] = useState<string>(
    "Flagship Smartphone Monolith with Dual-Perimeter Visor"
  );
  const [activeNarrative, setActiveNarrative] = useState<{ concept: string; anatomy: string; monolith: string }>({
    concept: "The foundational grid establishes a 19.5:9 divine rectangle, rooted in the Sulba Sutras' cord-stretching geometry.",
    anatomy: "Exploding into seven concentric sub-assemblies. The multi-element aspherical optical train channels photon prana.",
    monolith: "Resolved into a singular monolithic artifact of bead-blasted 100% recycled aerospace aluminum and Corning Gorilla Glass Victus 2."
  });

  // Track active scroll tier
  useEffect(() => {
    const handleScroll = () => {
      const tier1 = document.getElementById('tier1');
      const tier2 = document.getElementById('tier2');
      const tier3 = document.getElementById('tier3');

      const scrollPos = window.scrollY + 250;

      if (tier3 && scrollPos >= tier3.offsetTop) {
        setActiveTier(3);
      } else if (tier2 && scrollPos >= tier2.offsetTop) {
        setActiveTier(2);
      } else {
        setActiveTier(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const nextState = !isAudioOn;
    setIsAudioOn(nextState);
    sound.toggleDrone(nextState);
  };

  const handleApplyBlueprint = (data: BlueprintData) => {
    setActiveBlueprintTitle(data.title);
    if (data.narrative) {
      setActiveNarrative(data.narrative);
    }
    if (data.components && data.components.length > 0) {
      setComponents(data.components);
      setSelectedComponent(data.components[0]);
    }
  };

  const scrollToTier = (tierId: string) => {
    sound.playClick();
    const el = document.getElementById(tierId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#110F0D] text-[#EBE5D8] flex flex-col font-sans selection:bg-[#8C3A27]/40 selection:text-[#FFF8E7]">
      {/* Universal Top Bar */}
      <Header
        onOpenCodex={() => setIsCodexOpen(true)}
        onOpenIngest={() => setIsIngestOpen(true)}
        onOpenShilpin={() => setIsShilpinOpen(true)}
        onOpenFlutter={() => setIsFlutterOpen(true)}
        onOpenDeck={() => setIsDeckOpen(true)}
        isAudioOn={isAudioOn}
        onToggleAudio={handleToggleAudio}
        activeTier={activeTier}
      />

      {/* Hero Visual Novel Prologue Banner */}
      <section className="relative px-4 pt-10 pb-6 max-w-5xl mx-auto text-center space-y-4">
        {/* Subtle Sacred Geometry Watermark Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-[#8C6D3B]/15 pointer-events-none -z-0" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-technical tracking-widest uppercase text-[#D4AF37]">
            <span>Google AI Studio</span>
            <span>·</span>
            <span>Engineering Graphic Novel</span>
            <span>·</span>
            <span>Chitrasutra to CAD</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-[#F7EFE1] uppercase">
            The Digital Yantra
          </h1>

          <p className="text-base sm:text-lg font-serif-prose italic text-[#C7B698] max-w-2xl mx-auto leading-relaxed">
            Mapping Flagship Hardware via Sacred Geometry, Classical Iconometry (Talamana Padhati), and Multimodal AI
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollToTier('tier1')}
              className="px-5 py-2.5 bg-[#8C3A27] hover:bg-[#A3442E] text-white rounded font-technical text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <span>Begin Scroll Narrative</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsFlutterOpen(true)}
              className="px-4 py-2.5 bg-[#00A8B5]/15 hover:bg-[#00A8B5]/25 border border-[#00A8B5]/60 text-[#00A8B5] rounded font-technical text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Flutter Architecture Hub</span>
            </button>

            <button
              onClick={() => setIsCodexOpen(true)}
              className="px-4 py-2.5 bg-[#231E18] hover:bg-[#2F2921] border border-[#594834] text-[#D8CCA9] rounded font-technical text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Read Shilpin Script</span>
            </button>

            <button
              onClick={() => setIsDeckOpen(true)}
              className="px-4 py-2.5 bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/60 text-[#D4AF37] rounded font-technical text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>View Slide Deck</span>
            </button>
          </div>
        </div>

        {/* Current Active Blueprint Info Bar */}
        <div className="pt-4 max-w-3xl mx-auto flex items-center justify-between text-xs font-technical p-3 bg-[#1C1713] border border-[#3E3123] rounded">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[#8C3A27] font-semibold uppercase whitespace-nowrap">Active Blueprint:</span>
            <span className="text-[#E6DAC3] truncate font-medium">{activeBlueprintTitle}</span>
          </div>
          <button
            onClick={() => setIsIngestOpen(true)}
            className="text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap ml-2"
          >
            <span>Change</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Main Parallax Scroll Narrative Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 space-y-2">
        {/* TIER 1: CONCEPT & RESEARCH (The Parametric Genesis) */}
        <ScrollFrame
          id="tier1"
          tierNumber={1}
          title="Concept & Research"
          subtitle="The Parametric Genesis: Talamana Root Grids, Sulba Sutras Coordinate Matrices, and Divine Harmonics"
          showConduitDown={true}
          conduitLabel="Parametric Constraints Propagating Downward to Assembly Chamber"
        >
          <Tier1Genesis
            settings={settings}
            onUpdateSettings={setSettings}
            onSelectComponentForChat={(name, cat) => {
              setSelectedComponent({
                id: 'grid-concept',
                name: 'Parametric Root Grid',
                category: 'Logic',
                talamanaRole: 'Sulba Sutra Matrix',
                specs: `Curvature ${settings.visorRadius}mm, Focal Axis ${settings.focalAxis}mm, Symmetry ${settings.symmetryDivisions}-fold`,
                philosophicalNote: activeNarrative.concept,
                zExplode: 0,
              });
              setIsShilpinOpen(true);
            }}
          />
        </ScrollFrame>

        {/* INTERACTIVE DESIGN LAB / RECRUITER HARDWARE SIMULATOR */}
        <section id="simulator-lab" className="w-full max-w-6xl mx-auto my-8 px-2 sm:px-4">
          <HardwareSimulator />
        </section>

        {/* TIER 2: ENGINEERING & ASSEMBLY (The Exploded Assembly Chamber) */}
        <ScrollFrame
          id="tier2"
          tierNumber={2}
          title="Engineering & Assembly"
          subtitle="The Exploded Assembly Chamber: 7-Element Aspherical Ray-Tracing, Digital Yantra HDI Motherboard, & Silicon Dies"
          showConduitDown={true}
          conduitLabel="Exploded Micro-Electronics Collating Into Unified Monolithic Twin"
        >
          <Tier2ExplodedChamber
            settings={settings}
            components={components}
            selectedComponent={selectedComponent}
            onSelectComponent={setSelectedComponent}
            onOpenShilpinChatWithComponent={(comp) => {
              setSelectedComponent(comp);
              setIsShilpinOpen(true);
            }}
          />
        </ScrollFrame>

        {/* TIER 3: FINISHED PRODUCT (The Monolithic Resolution) */}
        <ScrollFrame
          id="tier3"
          tierNumber={3}
          title="Finished Product"
          subtitle="The Monolithic Resolution: Aluminum Pediment Visor, Hermetic Glass, and the Divine Golden Mandorla"
          showConduitDown={false}
        >
          <Tier3Monolith
            settings={settings}
            onOpenShilpinChat={() => {
              setSelectedComponent({
                id: 'monolith-device',
                name: 'The Finished Monolith',
                category: 'Chassis',
                talamanaRole: 'Navatala Symmetrical Twin',
                specs: 'Frosted Gorilla Glass Victus 2, Aerospace 7000 Aluminum, IP68 hermetic seal',
                philosophicalNote: activeNarrative.monolith,
                zExplode: 0,
              });
              setIsShilpinOpen(true);
            }}
          />
        </ScrollFrame>
      </main>

      {/* Floating Story Scrubber Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#1A1612]/90 backdrop-blur-md border border-[#4A3B2C] rounded-full px-4 py-2 shadow-2xl flex items-center gap-3 text-xs font-technical">
        <span className="text-[#8C6D3B] font-semibold text-[10px] uppercase hidden sm:inline">
          Narrative Tier:
        </span>
        <button
          onClick={() => scrollToTier('tier1')}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
            activeTier === 1
              ? 'bg-[#8C3A27] text-white font-bold'
              : 'text-[#B8A88E] hover:text-white'
          }`}
        >
          1. Genesis Grid
        </button>
        <span className="text-[#4A3B2C]">·</span>
        <button
          onClick={() => scrollToTier('tier2')}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
            activeTier === 2
              ? 'bg-[#8C3A27] text-white font-bold'
              : 'text-[#B8A88E] hover:text-white'
          }`}
        >
          2. Exploded Chamber
        </button>
        <span className="text-[#4A3B2C]">·</span>
        <button
          onClick={() => scrollToTier('tier3')}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
            activeTier === 3
              ? 'bg-[#8C3A27] text-white font-bold'
              : 'text-[#B8A88E] hover:text-white'
          }`}
        >
          3. Monolith
        </button>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#0E0C0A] border-t border-[#2B231B] text-center text-xs font-technical text-[#7A6C58] space-y-2 mt-12 mb-14 sm:mb-0">
        <p className="font-serif-prose italic text-sm text-[#A8987E]">
          "Where geometry is sacred, engineering becomes an art of cosmic continuity."
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] pt-1">
          <span>The Digital Yantra Application Architecture Proposal (AAP)</span>
          <span>·</span>
          <span>Google AI Studio Showcase</span>
          <span>·</span>
          <span>Chitrasutra Chapter 41 & Sulba Sutras Grounding</span>
        </div>
      </footer>

      {/* Modals and Drawers */}
      <ShilpinModal
        isOpen={isShilpinOpen}
        onClose={() => setIsShilpinOpen(false)}
        activeComponent={selectedComponent}
        activeTier={activeTier}
      />

      <BlueprintModal
        isOpen={isIngestOpen}
        onClose={() => setIsIngestOpen(false)}
        onApplyBlueprint={handleApplyBlueprint}
      />

      <FlutterHubModal
        isOpen={isFlutterOpen}
        onClose={() => setIsFlutterOpen(false)}
      />

      <CodexDrawer
        isOpen={isCodexOpen}
        onClose={() => setIsCodexOpen(false)}
      />

      <SlideDeckModal
        isOpen={isDeckOpen}
        onClose={() => setIsDeckOpen(false)}
      />
    </div>
  );
}
