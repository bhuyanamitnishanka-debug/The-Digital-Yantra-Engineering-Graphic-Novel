import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User, CornerDownLeft, RefreshCw, HelpCircle } from 'lucide-react';
import { HardwareComponent, ChatMessage } from '../../types';
import { sound } from '../../utils/audio';

interface ShilpinModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeComponent: HardwareComponent | null;
  activeTier: number;
}

export const ShilpinModal: React.FC<ShilpinModalProps> = ({
  isOpen,
  onClose,
  activeComponent,
  activeTier,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'shilpin',
      text: "Namaste, Engineer. I am The Shilpin Guide — bridging the sacred geometry of the Chitrasutra and Sulba Sutras with modern semiconductor photolithography and precision optics. What mysteries of the digital yantra shall we examine together?",
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeComponent && isOpen) {
      setMessages((prev) => [
        ...prev,
        {
          id: `inspect-${Date.now()}`,
          sender: 'shilpin',
          text: `You are examining the ${activeComponent.name} (${activeComponent.talamanaRole}). Ask me about its ray-tracing equations, 4nm silicon photolithography, or how its physical dimensions reflect classical Talamana proportions.`,
          timestamp: 'Just now',
          componentRef: activeComponent.name,
        },
      ]);
    }
  }, [activeComponent, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    sound.playClick();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/shilpin/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          activeComponent,
          activeTier: activeTier === 1 ? 'Concept Grid' : activeTier === 2 ? 'Exploded Assembly' : 'Monolith',
        }),
      });

      const data = await res.json();
      sound.playChime(520);
      setMessages((prev) => [
        ...prev,
        {
          id: `shilpin-${Date.now()}`,
          sender: 'shilpin',
          text: data.answer || "The copper circuits follow the cosmic balance of current and ground.",
          timestamp: 'Now',
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `shilpin-err-${Date.now()}`,
          sender: 'shilpin',
          text: "Like the ancient stone carvers before a tempest, my connection hesitated briefly. Know that all electronics strive toward minimum energy potential, reflecting nature's profound equilibrium.",
          timestamp: 'Now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQuestions = [
    "Why are the PCB traces routed at 45° like a Sri Yantra?",
    "How does the 7-element lens array eliminate spherical aberration?",
    "Explain the Talamana Padhati 19.5:9 proportion of the chassis",
    "How does the copper vapor chamber achieve thermodynamic Agni-Soma balance?",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-[#FAF4E6] border-2 border-[#8C6D3B] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-[#23180F] text-[#FFF8E7] flex items-center justify-between border-b border-[#8C6D3B]/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#8C3A27] flex items-center justify-center text-white border border-[#D4AF37]">
              <Sparkles className="w-4 h-4 text-[#FFD199]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-sm sm:text-base tracking-wider text-[#F4EDE0]">
                  The Shilpin Guide
                </h3>
                <span className="text-[10px] font-technical px-2 py-0.5 rounded bg-[#8C3A27] text-white">
                  GEMINI 3.8 FLASH
                </span>
              </div>
              <p className="text-[11px] font-serif-prose italic text-[#CBB89A]">
                AI Studio Philosophical Engineering Engine
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

        {/* Focused Component Context Ribbon */}
        {activeComponent && (
          <div className="px-5 py-2 bg-[#EFE4CE] border-b border-[#CBB89A] flex items-center justify-between text-xs font-technical text-[#4A3B2C]">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-[#8C3A27] font-semibold">Active Lens:</span>
              <span className="font-bold truncate">{activeComponent.name}</span>
            </div>
            <span className="text-[10px] text-[#7A624A] whitespace-nowrap">
              Role: {activeComponent.talamanaRole}
            </span>
          </div>
        )}

        {/* Chat Message Scrollport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#FDFBF7]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'shilpin' && (
                <div className="w-7 h-7 rounded-full bg-[#8C3A27] text-white flex items-center justify-center shrink-0 border border-[#8C6D3B] mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-lg p-3 sm:p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#8C3A27] text-white font-technical rounded-tr-none'
                    : 'bg-[#FAF4E6] border border-[#CBB89A] text-[#2B1F16] font-serif-prose rounded-tl-none shadow-xs'
                }`}
              >
                {msg.sender === 'shilpin' && (
                  <span className="block text-[10px] font-technical uppercase font-semibold text-[#8C3A27] mb-1">
                    Master Architect Shilpin
                  </span>
                )}
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <span className="block text-[9px] font-technical text-right mt-1.5 opacity-60">
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-[#23180F] text-white flex items-center justify-center shrink-0 border border-[#8C6D3B] mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center">
              <div className="w-7 h-7 rounded-full bg-[#8C3A27] text-white flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 bg-[#FAF4E6] border border-[#CBB89A] rounded-lg text-xs font-technical text-[#7A624A] flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#8C3A27]" />
                <span>The Shilpin contemplates the geometric harmonics...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Pre-populated Prompt Suggestions */}
        <div className="p-2 sm:p-3 bg-[#F5ECDA] border-t border-[#CBB89A] overflow-x-auto flex gap-1.5 scrollbar-thin">
          {sampleQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 bg-[#FAF4E6] border border-[#CBB89A] rounded text-[11px] font-technical text-[#4A3B2C] hover:bg-[#EAE0C8] hover:border-[#8C3A27] transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#FAF4E6] border-t border-[#8C6D3B]/40 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Ask the Shilpin about circuits, optics, or sacred geometry..."
            className="flex-1 px-3.5 py-2.5 bg-white border border-[#CBB89A] rounded-md text-xs sm:text-sm font-technical text-[#2B1F16] placeholder:text-[#A89E90] focus:outline-none focus:border-[#8C3A27]"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="px-4 py-2.5 bg-[#8C3A27] hover:bg-[#A3442E] text-white rounded-md font-technical text-xs font-bold uppercase transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Inquire</span>
          </button>
        </div>
      </div>
    </div>
  );
};
