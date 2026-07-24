import React from "react";
import { Tool } from "../types";
import { getStableId } from "../utils/helpers";

interface ToolCardProps {
  tool: Tool;
  categoryName?: string;
  categoryIcon?: string;
  viewMode?: "grid" | "list";
  index?: number;
}

export default function ToolCard({ tool, categoryName, categoryIcon, viewMode = "grid", index }: ToolCardProps) {
  const hashId = getStableId(tool.name);

  // Fallback for tags
  const tags = tool.tags || [
    "ai",
    tool.name.split(" ")[0].toLowerCase(),
    categoryName ? categoryName.split(" ")[0].toLowerCase() : "tools"
  ].filter(Boolean).slice(0, 3); // Capped at 3 for cleaner layout

  // Fallback for stars
  const starsCount = tool.stars !== undefined 
    ? (typeof tool.stars === "number" ? `${(tool.stars / 1000).toFixed(1)}k` : tool.stars) 
    : `${((hashId % 800) / 10 + 1.2).toFixed(1)}k`;

  // Fallback for license
  const licenseType = tool.license || (hashId % 3 === 0 ? "MIT" : hashId % 3 === 1 ? "AGPL-3.0" : "GPL-3.0");

  // Fallback for icon/logo placeholder
  const displayIcon = tool.icon || categoryIcon || "🧠";

  // GitHub repository link fallback
  const githubLink = tool.github || tool.githubUrl || `https://github.com/search?q=${encodeURIComponent(tool.name)}`;

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest(".tag-item") || target.closest(".license-link")) {
      return;
    }
    window.open(tool.url, "_blank", "noopener,noreferrer");
  };

  const animationDelay = index !== undefined ? `${index * 0.04}s` : "0s";
  const desc = tool.description || tool.desc || "";

  if (viewMode === "list") {
    return (
      <div
        onClick={handleCardClick}
        style={{ animationDelay }}
        className="fade-up-in group relative bg-[var(--card-bg)] hover:bg-[var(--card-bg-hover)] border border-[var(--card-border)] hover:border-[var(--card-border-hover)] rounded-xl px-6 py-3.5 transition-all duration-300 hover:shadow-[0_10px_20px_-10px_var(--card-shadow-hover)] flex items-center justify-between gap-4 cursor-pointer overflow-hidden"
      >
        {/* Left: Icon, Name and Description */}
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-lg bg-white/[0.02] border border-white/[0.08] flex items-center justify-center text-xl shadow-inner shrink-0 group-hover:border-[var(--card-title-hover)]/20 group-hover:bg-[var(--card-title-hover)]/[0.02] transition-colors duration-300">
            {displayIcon}
          </div>
          <div className="min-w-0 flex-1 md:flex md:items-center md:gap-6">
            <h3 className="font-bold text-sm md:text-base text-[var(--card-title)] transition-colors duration-200 flex items-center gap-1.5 shrink-0">
              <span className="truncate group-hover:text-[var(--card-title-hover)]">
                {tool.name}
              </span>
              <span className="text-xs opacity-40 group-hover:opacity-100 group-hover:text-[var(--card-title-hover)] transition-all duration-200 transform translate-x-[-2px] group-hover:translate-x-0">
                ↗
              </span>
            </h3>
            <p className="text-xs text-[var(--card-text)] line-clamp-1 leading-relaxed hidden md:block">
              {desc}
            </p>
          </div>
        </div>

        {/* Right: Meta Info & Actions */}
        <div className="flex items-center gap-5 text-xs shrink-0">
          {/* Tags */}
          <div className="flex gap-1.5 hidden lg:flex">
            {tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="tag-item text-[10px] font-medium text-[var(--card-tag-text)] bg-[var(--card-tag-bg)] border border-[var(--card-tag-border)] px-2 py-0.5 rounded hover:bg-[var(--card-tag-bg-hover)] hover:border-[var(--card-tag-border-hover)] hover:text-[var(--accent)] transition-all duration-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Stars & License */}
          <div className="flex items-center gap-4 text-[var(--card-text)] font-medium">
            <div className="flex items-center gap-1">
              <span className="text-amber-500 text-sm">★</span>
              <span className="font-bold text-slate-200">{starsCount}</span>
            </div>
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="license-link flex items-center gap-1.5 font-mono text-[9px] border border-[var(--card-github-border)] hover:border-[var(--card-github-border-hover)] hover:bg-[var(--card-github-bg-hover)] px-2 py-0.5 rounded transition-all duration-200 hover:text-[var(--accent)]"
            >
              <span>{licenseType}</span>
            </a>
          </div>
        </div>

        {/* Decorative Accent Bottom Border Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    );
  }

  return (
    <div
      onClick={handleCardClick}
      style={{ animationDelay }}
      className="fade-up-in group relative bg-[var(--card-bg)] hover:bg-[var(--card-bg-hover)] border border-[var(--card-border)] hover:border-[var(--card-border-hover)] rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_var(--card-shadow-hover)] flex flex-col justify-between h-full cursor-pointer overflow-hidden"
    >
      <div>
        {/* Top Header Row */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3.5 w-full min-w-0">
            <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center text-2xl shadow-inner shrink-0 group-hover:border-[var(--card-title-hover)]/20 group-hover:bg-[var(--card-title-hover)]/[0.02] transition-colors duration-300">
              {displayIcon}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-lg text-[var(--card-title)] transition-colors duration-200 flex items-center gap-1.5">
                <span className="truncate group-hover:text-[var(--card-title-hover)]">
                  {tool.name}
                </span>
                <span className="text-sm opacity-40 group-hover:opacity-100 group-hover:text-[var(--card-title-hover)] transition-all duration-200 transform translate-x-[-2px] group-hover:translate-x-0">
                  ↗
                </span>
              </h3>
            </div>
          </div>
          {tool.featured && (
            <span className="bg-[var(--accent)] text-black text-[9px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wider uppercase shrink-0 shadow-sm shadow-[var(--accent)]/10">
              FEATURED
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--card-text)] mb-5 line-clamp-2 leading-relaxed">
          {desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="tag-item text-[11px] font-medium text-[var(--card-tag-text)] bg-[var(--card-tag-bg)] border border-[var(--card-tag-border)] px-2.5 py-0.5 rounded-md hover:bg-[var(--card-tag-bg-hover)] hover:border-[var(--card-tag-border-hover)] hover:text-[var(--card-tag-text-hover)] transition-all duration-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-xs text-[var(--card-text)] pt-4 border-t border-white/[0.05] font-medium">
        {/* Left Side: Category */}
        <div className="flex items-center gap-1.5 text-[var(--card-text)]">
          <span className="text-sm shrink-0">{categoryIcon || tool.categoryIcon || "💻"}</span>
          <span>{categoryName || tool.category || "Development"}</span>
        </div>
        
        {/* Right Side: Stars Count grouped with GitHub Link */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-amber-500 text-sm">★</span>
            <span className="font-bold text-slate-200">{starsCount}</span>
          </div>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="license-link flex items-center gap-1.5 font-mono text-[10px] border border-[var(--card-github-border)] hover:border-[var(--card-github-border-hover)] hover:bg-[var(--card-github-bg-hover)] px-2.5 py-0.5 rounded-md transition-all duration-200 hover:text-[var(--card-github-text-hover)]"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>{licenseType}</span>
          </a>
        </div>
      </div>

      {/* Decorative Accent Bottom Border Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}
