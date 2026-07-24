import React from "react";
import { Tool } from "../types";

interface SurpriseModalProps {
  isOpen: boolean;
  tool: Tool | null;
  onClose: () => void;
  onShuffle: () => void;
}

export default function SurpriseModal({ isOpen, tool, onClose, onShuffle }: SurpriseModalProps) {
  if (!isOpen || !tool) return null;

  const displayIcon = tool.icon || "🔧";
  const desc = tool.description || tool.desc || "";
  const tags = tool.tags || [];
  const starsCount = tool.stars || "0";
  const githubLink = tool.github || tool.githubUrl || "#";
  const licenseType = tool.license || "Open Source";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-8 border border-white/[0.08] shadow-[0_30px_60px_-15px_var(--card-shadow-hover)] animate-fade-up-in overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-[var(--accent)]/[0.05] blur-[50px] rounded-full pointer-events-none -z-10" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer transition-colors p-1"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <span className="text-4xl mb-3 inline-block animate-bounce">{displayIcon}</span>
          <h2 className="text-2xl font-black text-slate-100 mb-1">{tool.name}</h2>
          <span className="text-[10px] tracking-widest text-[var(--accent)] font-mono font-bold uppercase">
            ✦ Shuffled Pick ✦
          </span>
        </div>

        {/* Modal Content */}
        <div className="space-y-5 text-sm">
          <p className="text-slate-300 leading-relaxed text-center bg-white/[0.01] border border-white/[0.03] p-4 rounded-xl">
            {desc}
          </p>

          <div className="flex flex-wrap justify-center gap-1.5">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-[11px] font-medium text-[var(--card-tag-text)] bg-[var(--card-tag-bg)] border border-[var(--card-tag-border)] px-2.5 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 py-3 border-t border-b border-white/[0.05] font-medium">
            <span className="flex items-center gap-1">
              <span className="text-sm">{tool.categoryIcon || "💻"}</span>
              <span>{tool.category || "Development"}</span>
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-amber-500 font-bold">
                ★ <span className="text-slate-200">{starsCount}</span>
              </span>
              <span className="px-2 py-0.5 border border-white/[0.05] rounded-md font-mono text-[10px]">
                {licenseType}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center gap-3 mt-8">
          <button
            onClick={onShuffle}
            className="flex-1 py-3 px-4 rounded-xl border border-white/[0.05] bg-white/[0.02] text-slate-300 hover:text-black hover:bg-[var(--accent)] hover:border-transparent font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer text-center"
          >
            🔄 Shuffle Again
          </button>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 rounded-xl bg-white/[0.02] border border-[var(--accent)]/40 hover:border-transparent text-[var(--accent)] hover:text-black hover:bg-[var(--accent)] font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer text-center"
          >
            Visit Tool ↗
          </a>
        </div>
      </div>
    </div>
  );
}
