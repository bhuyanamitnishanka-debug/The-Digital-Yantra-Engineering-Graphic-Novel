import React, { useState } from 'react';
import { X, Upload, Sparkles, Layers, Cpu, Compass, Check, FileText, Code2, Copy, CheckCheck } from 'lucide-react';
import { BlueprintData } from '../../types';
import { sound } from '../../utils/audio';

interface BlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyBlueprint: (blueprint: BlueprintData) => void;
}

export const BlueprintModal: React.FC<BlueprintModalProps> = ({
  isOpen,
  onClose,
  onApplyBlueprint,
}) => {
  const [activeTab, setActiveTab] = useState<'ingest' | 'spec'>('ingest');
  const [selectedPreset, setSelectedPreset] = useState<string>('pixel_flagship');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isIngesting, setIsIngesting] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const presets = [
    {
      id: 'pixel_flagship',
      title: 'Flagship Smartphone & Visor Monolith',
      tag: 'Navatala 9-Fold Proportion',
      desc: '19.5:9 golden rectangle, horizontal Brahmasutra camera visor, 7-element aspherical lens stack, and 12-layer HDI PCB Yantra.',
      icon: Layers,
    },
    {
      id: 'tpu_monolith',
      title: 'Neural TPU Systolic Array Architecture',
      tag: 'Manduka 64-Square Mandala',
      desc: '128x128 systolic matrix multiplier unit with high-bandwidth memory (HBM3e) and cold-forged liquid cooling channels.',
      icon: Cpu,
    },
    {
      id: 'periscope_optics',
      title: 'Periscope 5x Telephoto Optical Train',
      tag: 'Chakshu Ray Refractor',
      desc: '90-degree folded optical prism, dual voice-coil actuators, floating glass doublet elements, and 48MP Quad-Bayer sensor.',
      icon: Compass,
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      sound.playClick();
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIngest = async () => {
    setIsIngesting(true);
    sound.playChime(600);

    try {
      const res = await fetch('/api/shilpin/analyze-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blueprintType: selectedPreset,
          customImageBase64: customImage,
          customPrompt,
        }),
      });

      const responseData = await res.json();
      if (responseData.success && responseData.data) {
        sound.playChime(720);
        onApplyBlueprint(responseData.data);
        onClose();
      }
    } catch (err) {
      console.error('Failed to ingest blueprint', err);
    } finally {
      setIsIngesting(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const systemPromptString = `You are the "Shilpin Architecture Agent," a highly specialized AI core running inside an interactive engineering graphic novel application. Your purpose is to ingest technical engineering data (schematics, CAD data summaries, or component lists) and translate them into a tripartite, scroll-style narrative that bridges modern systems engineering with classical Indian iconometry (Shilpa Shastras, Talamana padhati, and Yantra design).

CRITICAL DOMAIN MAPPINGS:
- Phase 1 (Concept/Constraints): Map to "Talamana Grid" / "Mandala". Focus on mathematical logic, root grids, constraints, and sacred geometry.
- Phase 2 (Exploded Anatomy): Map to "Yantra Deconstruction". Focus on sub-assemblies, logic boards (digital yantras), optical rays, thermal dissipation paths, and mechanical tolerances.
- Phase 3 (Assembled Monolith): Map to "Polished Murti" / "Pratima". Focus on the final, materialized, tactile form factor, material harmony, and surface finishes.

TONE & STYLE:
Maintain an authoritative, elegant, and academic-yet-accessible tone. Use precise engineering vocabulary combined with traditional architectural terms. Keep structural text crisp, punchy, and highly scannable. Avoid conversational filler. Always respond in the strict JSON format requested by the client application.`;

  const jsonSchemaString = JSON.stringify(
    {
      type: "object",
      properties: {
        project_title: { type: "string" },
        frame_1_concept_tier: {
          type: "object",
          properties: {
            title: { type: "string" },
            talamana_grid_parameters: {
              type: "array",
              items: { type: "string" }
            },
            philosophical_grounding: { type: "string" },
            vector_descent_description: { type: "string" }
          },
          required: ["title", "talamana_grid_parameters", "philosophical_grounding", "vector_descent_description"]
        },
        frame_2_engineering_tier: {
          type: "object",
          properties: {
            title: { type: "string" },
            optical_subsystem_analysis: { type: "string" },
            digital_yantra_pcb_layout: { type: "string" },
            mechanical_tolerances_and_thermals: { type: "string" }
          },
          required: ["title", "optical_subsystem_analysis", "digital_yantra_pcb_layout", "mechanical_tolerances_and_thermals"]
        },
        frame_3_monolith_tier: {
          type: "object",
          properties: {
            title: { type: "string" },
            material_harmony_description: { type: "string" },
            synthesis_summary: { type: "string" }
          },
          required: ["title", "material_harmony_description", "synthesis_summary"]
        }
      },
      required: ["project_title", "frame_1_concept_tier", "frame_2_engineering_tier", "frame_3_monolith_tier"]
    },
    null,
    2
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl bg-[#FAF4E6] border-2 border-[#8C6D3B] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with Tab Navigation */}
        <div className="px-5 py-3.5 bg-[#23180F] text-[#FFF8E7] flex items-center justify-between border-b border-[#8C6D3B]/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#8C3A27] flex items-center justify-center text-white border border-[#D4AF37]">
              <Layers className="w-4 h-4 text-[#FFD199]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm sm:text-base tracking-wider text-[#F4EDE0]">
                Multimodal Blueprint Lab
              </h3>
              <p className="text-[11px] font-serif-prose italic text-[#CBB89A]">
                Google AI Studio Grounding & Structured Outputs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switchers */}
            <div className="hidden sm:flex items-center p-1 bg-[#150F0A] rounded border border-[#483726] text-xs font-technical">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('ingest');
                }}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'ingest'
                    ? 'bg-[#8C3A27] text-white font-bold'
                    : 'text-[#A8987E] hover:text-white'
                }`}
              >
                1. Blueprint Ingest
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('spec');
                }}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'spec'
                    ? 'bg-[#8C3A27] text-white font-bold'
                    : 'text-[#A8987E] hover:text-white'
                }`}
              >
                2. AI Studio Schema & Code
              </button>
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
        </div>

        {/* Mobile Tab Switcher */}
        <div className="sm:hidden flex border-b border-[#CBB89A] bg-[#F5ECDA] text-xs font-technical">
          <button
            onClick={() => setActiveTab('ingest')}
            className={`flex-1 py-2 text-center font-bold ${
              activeTab === 'ingest' ? 'bg-[#8C3A27] text-white' : 'text-[#5A4533]'
            }`}
          >
            Blueprint Ingest
          </button>
          <button
            onClick={() => setActiveTab('spec')}
            className={`flex-1 py-2 text-center font-bold ${
              activeTab === 'spec' ? 'bg-[#8C3A27] text-white' : 'text-[#5A4533]'
            }`}
          >
            AI Studio Spec & Code
          </button>
        </div>

        {/* Tab 1: Blueprint Ingestion */}
        {activeTab === 'ingest' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#FDFBF7]">
            {/* Preset Selector */}
            <div>
              <label className="text-xs font-technical uppercase font-bold text-[#4A3B2C] block mb-2">
                Select Flagship Architecture Blueprint:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {presets.map((preset) => {
                  const Icon = preset.icon;
                  const isSelected = selectedPreset === preset.id;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedPreset(preset.id);
                        setCustomImage(null);
                      }}
                      className={`p-3.5 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#8C3A27] bg-[#F5ECDA] shadow-sm'
                          : 'border-[#CBB89A]/80 bg-[#FAF4E6] hover:border-[#8C6D3B]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-[#8C3A27]' : 'text-[#735A42]'}`} />
                        {isSelected && <Check className="w-4 h-4 text-[#8C3A27]" />}
                      </div>
                      <h4 className="font-display font-bold text-xs text-[#2B1F16] leading-tight mb-1">
                        {preset.title}
                      </h4>
                      <span className="text-[10px] font-technical text-[#8C3A27] block mb-1">
                        {preset.tag}
                      </span>
                      <p className="text-[11px] font-serif-prose text-[#5A4533] line-clamp-3">
                        {preset.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upload Custom Blueprint Section */}
            <div className="pt-2 border-t border-[#8C6D3B]/30">
              <label className="text-xs font-technical uppercase font-bold text-[#4A3B2C] block mb-2">
                Or Ingest Custom CAD / Gerber PCB / Patent Schematic:
              </label>
              
              <div className="border-2 border-dashed border-[#CBB89A] hover:border-[#8C6D3B] rounded-lg p-4 sm:p-5 text-center bg-[#FAF4E6] transition-colors relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                {customImage ? (
                  <div className="flex items-center justify-center gap-3">
                    <img
                      src={customImage}
                      alt="Custom Blueprint"
                      className="w-16 h-16 object-cover rounded border border-[#8C6D3B]"
                    />
                    <div className="text-left">
                      <span className="text-xs font-technical text-[#8C3A27] font-bold block">
                        Custom Schematic Loaded
                      </span>
                      <span className="text-[10px] font-technical text-[#735A42]">
                        Click to replace image
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <Upload className="w-6 h-6 mx-auto text-[#8C6D3B]" />
                    <p className="text-xs font-technical text-[#4A3B2C]">
                      Drag and drop blueprint image or click to browse
                    </p>
                    <p className="text-[10px] font-technical text-[#8C765E]">
                      Parsed via Gemini Multimodal Vision API into tripartite graphic novel chapters
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Custom Directive Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-technical uppercase font-bold text-[#4A3B2C] block">
                Engineering Directive:
              </label>
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. 'Focus on high-speed copper trace geometry and 7-element lens ray refraction'"
                className="w-full px-3 py-2 bg-white border border-[#CBB89A] rounded text-xs font-technical text-[#2B1F16] placeholder:text-[#A89E90] focus:outline-none focus:border-[#8C3A27]"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Google AI Studio Spec & Code Generator */}
        {activeTab === 'spec' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#FDFBF7] text-xs font-technical">
            {/* System Prompt Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#8C3A27] uppercase">
                  1. Google AI Studio System Prompt (Shilpin Architecture Agent)
                </span>
                <button
                  onClick={() => copyToClipboard(systemPromptString, 'prompt')}
                  className="flex items-center gap-1 text-[11px] text-[#8C3A27] hover:underline cursor-pointer"
                >
                  {copiedKey === 'prompt' ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'prompt' ? 'Copied' : 'Copy Prompt'}</span>
                </button>
              </div>
              <pre className="p-3 bg-[#1C1713] text-[#E0D5C1] rounded border border-[#483726] text-[11px] font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {systemPromptString}
              </pre>
            </div>

            {/* JSON Schema Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#8C3A27] uppercase">
                  2. Structured Outputs JSON Schema
                </span>
                <button
                  onClick={() => copyToClipboard(jsonSchemaString, 'schema')}
                  className="flex items-center gap-1 text-[11px] text-[#8C3A27] hover:underline cursor-pointer"
                >
                  {copiedKey === 'schema' ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'schema' ? 'Copied' : 'Copy Schema'}</span>
                </button>
              </div>
              <pre className="p-3 bg-[#1C1713] text-[#A5B4FC] rounded border border-[#483726] text-[11px] font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {jsonSchemaString}
              </pre>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-4 bg-[#FAF4E6] border-t border-[#8C6D3B]/40 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-technical text-[#5A4533] hover:text-[#2B1F16] cursor-pointer"
          >
            Close
          </button>

          {activeTab === 'ingest' ? (
            <button
              onClick={handleIngest}
              disabled={isIngesting}
              className="px-5 py-2.5 bg-[#8C3A27] hover:bg-[#A3442E] text-white rounded font-technical text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow transition-all cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isIngesting ? 'animate-spin' : ''}`} />
              <span>{isIngesting ? 'Generating Graphic Novel Chapters...' : 'Ingest & Generate Narrative'}</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('ingest')}
              className="px-4 py-2 bg-[#8C3A27] hover:bg-[#A3442E] text-white rounded font-technical text-xs font-bold uppercase cursor-pointer"
            >
              Back to Ingestion
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

