import { useState } from "react";
import toolsDataRaw from "./constants/index";
import featuredDataRaw from "./constants/featured.json";
import ToolCard from "./components/ToolCard";
import Footer from "./components/Footer";
import ThemeSelector from "./components/ThemeSelector";
import BackToTop from "./components/BackToTop";
import SurpriseModal from "./components/SurpriseModal";
import SubmitDrawer from "./components/SubmitDrawer";
import { Tool, Category } from "./types";
import { useTools } from "./hooks/useTools";
import "./styles/App.css";

// Assert types
const toolsData = toolsDataRaw as Category[];
const featuredData = featuredDataRaw as Tool[];

// Calculate counts
const totalTools = toolsData.reduce((sum, cat) => sum + cat.tools.length, 0);

function App() {
  const [showAll, setShowAll] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [surpriseTool, setSurpriseTool] = useState<Tool | null>(null);

  const {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    filteredCategories,
    showingCount,
    filteredFeatured
  } = useTools(toolsData, featuredData);

  const handleSurprise = () => {
    const allTools = toolsData.flatMap((cat) => cat.tools);
    if (allTools.length === 0) return;
    const randomTool = allTools[Math.floor(Math.random() * allTools.length)];
    setSurpriseTool(randomTool);
    setIsSurpriseOpen(true);
  };

  return (
    <div className="min-h-screen pb-0 w-full flex flex-col items-center justify-between">
      {/* Top Header & Search Area */}
      <header className="w-full max-w-[1600px] pt-24 pb-8 px-4 md:px-12 text-center relative">
        {/* Glow ambient background effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[var(--accent)]/[0.02] blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Top Controls Row */}
        <div className="absolute top-6 right-4 md:right-12 flex flex-wrap items-center justify-end gap-3 z-20">
          <button
            onClick={handleSurprise}
            className="px-3 py-1.5 rounded-full bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] text-[11px] font-bold text-slate-300 hover:text-[var(--accent)] hover:border-[var(--accent)]/30 backdrop-blur-md transition-all cursor-pointer"
            title="Pick a random tool"
          >
            🎲 Surprise Me
          </button>
          <button
            onClick={() => setIsSubmitOpen(true)}
            className="px-3 py-1.5 rounded-full bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] text-[11px] font-bold text-slate-300 hover:text-[var(--accent)] hover:border-[var(--accent)]/30 backdrop-blur-md transition-all cursor-pointer"
          >
            ➕ Submit Tool
          </button>
          <ThemeSelector />
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
          <span className="text-[var(--accent)] font-black">Free-AI-Tools-Hub ✦</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mb-10 leading-relaxed">
          Discover a hand-picked, curated collection of free and open-source artificial intelligence tools to supercharge your workflow.
        </p>

        {/* Search Bar Container */}
        <div className="w-full mb-8">
          <div className="flex items-center gap-3 px-4.5 py-3.5 bg-white/[0.01] border border-white/[0.06] rounded-2xl focus-within:border-[var(--accent)]/30 focus-within:bg-white/[0.02] focus-within:shadow-[0_0_30px_var(--card-shadow-hover)] transition-all duration-300">
            <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="w-full bg-transparent text-slate-100 placeholder:text-slate-500 outline-none text-sm font-medium"
              placeholder="Search tools by name, tag, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.1] transition-colors"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
            <div className="w-[1px] h-5 bg-white/10 shrink-0 mx-1" />
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg cursor-pointer transition-colors ${viewMode === "grid" ? "text-[var(--accent)] bg-white/[0.04]" : "text-slate-400 hover:text-white"}`}
                title="Grid View"
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg cursor-pointer transition-colors ${viewMode === "list" ? "text-[var(--accent)] bg-white/[0.04]" : "text-slate-400 hover:text-white"}`}
                title="List View"
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap justify-start gap-2 mb-10 w-full">
          <button
            onClick={() => setActiveCategory(null)}
            className={`group flex items-center gap-3 px-4 py-2 rounded-none text-xs font-bold border transition-all cursor-pointer ${
              activeCategory === null
                ? "bg-[var(--accent)] text-black border-transparent shadow-md shadow-[var(--accent)]/10"
                : "bg-white/[0.02] text-slate-200 border-white/[0.05] hover:border-transparent hover:bg-[var(--accent)] hover:text-black"
            }`}
          >
            <span className="text-sm shrink-0">◈</span>
            <span className={`w-[1px] h-3 shrink-0 transition-colors ${activeCategory === null ? 'bg-black/20' : 'bg-white/15 group-hover:bg-black/20'}`} />
            <span className="font-semibold">All</span>
            <span className={`w-[1px] h-3 shrink-0 transition-colors ${activeCategory === null ? 'bg-black/20' : 'bg-white/15 group-hover:bg-black/20'}`} />
            <span className={`font-mono text-[10px] transition-colors ${
              activeCategory === null ? 'text-black font-extrabold' : 'text-slate-300 group-hover:text-black group-hover:font-extrabold'
            }`}>
              {totalTools}
            </span>
          </button>
          {toolsData.map((cat) => (
            <button
              key={cat.slug}
              onClick={() =>
                setActiveCategory(activeCategory === cat.slug ? null : cat.slug)
              }
              className={`group flex items-center gap-3 px-4 py-2 rounded-none text-xs font-bold border transition-all cursor-pointer ${
                activeCategory === cat.slug
                  ? "bg-[var(--accent)] text-black border-transparent shadow-md shadow-[var(--accent)]/10"
                  : "bg-white/[0.02] text-slate-200 border-white/[0.05] hover:border-transparent hover:bg-[var(--accent)] hover:text-black"
              }`}
            >
              <span className="text-sm shrink-0">{cat.icon}</span>
              <span className={`w-[1px] h-3 shrink-0 transition-colors ${activeCategory === cat.slug ? 'bg-black/20' : 'bg-white/15 group-hover:bg-black/20'}`} />
              <span className="font-semibold">{cat.title}</span>
              <span className={`w-[1px] h-3 shrink-0 transition-colors ${activeCategory === cat.slug ? 'bg-black/20' : 'bg-white/15 group-hover:bg-black/20'}`} />
              <span className={`font-mono text-[10px] transition-colors ${
                activeCategory === cat.slug ? 'text-black font-extrabold' : 'text-slate-300 group-hover:text-black group-hover:font-extrabold'
              }`}>
                {cat.tools.length}
              </span>
            </button>
          ))}
        </div>

        {/* Showing statistics row */}
        <div className="text-md tracking-widest text-slate-500 font-mono font-bold text-center uppercase">
          ✦ SHOWING {showingCount} OF {totalTools} TOOLS ✦
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-[1600px] px-4 md:px-12">
        {/* Featured Section */}
        {filteredFeatured.length > 0 && !activeCategory && (
          <div className="mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] bg-gradient-to-r from-transparent to-white/[0.08] grow"></div>
              <span className="text-[10px] tracking-widest text-[var(--accent)] font-mono font-bold uppercase">
                ⚡ FEATURED PICKS ⚡
              </span>
              <div className="h-[1px] bg-gradient-to-l from-transparent to-white/[0.08] grow"></div>
            </div>
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "grid grid-cols-1 gap-3.5"}>
              {filteredFeatured.map((tool, i) => (
                <ToolCard key={i} tool={tool} viewMode={viewMode} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Category lists */}
        {showAll || searchQuery || activeCategory ? (
          filteredCategories.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.01] border border-white/[0.05] rounded-3xl w-full max-w-lg mx-auto">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-slate-400 text-sm font-semibold">
                No tools found matching your search.
              </p>
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <section key={cat.slug} className="mb-16 w-full">
                <div className="flex items-center gap-2.5 mb-8 pb-3 border-b border-white/[0.03]">
                  <span className="text-2xl">{cat.icon}</span>
                  <h2 className="text-xl font-bold text-[var(--category-title)]">
                    {cat.title}
                  </h2>
                  <span className="text-[11px] text-slate-400 bg-white/[0.03] border border-white/[0.06] rounded-md px-2 py-0.5 font-mono font-bold">
                    {cat.filteredTools?.length ?? 0}
                  </span>
                </div>
                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "grid grid-cols-1 gap-3.5"}>
                  {cat.filteredTools?.map((tool, i) => (
                    <ToolCard
                      key={i}
                      tool={tool}
                      categoryName={cat.title}
                      categoryIcon={cat.icon}
                      viewMode={viewMode}
                      index={i}
                    />
                  ))}
                </div>
              </section>
            ))
          )
        ) : (
          <div className="text-center mt-12 mb-6">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold border border-white/[0.05] bg-white/[0.02] text-slate-300 hover:border-transparent hover:bg-[var(--accent)] hover:text-black hover:shadow-lg hover:shadow-[var(--accent)]/10 transition-all duration-300 cursor-pointer"
            >
              Show More Tools
              <span>↓</span>
            </button>
          </div>
        )}
      </main>

      <Footer />

      {/* Floating features & Modals */}
      <BackToTop />
      <SurpriseModal 
        isOpen={isSurpriseOpen} 
        tool={surpriseTool} 
        onClose={() => setIsSurpriseOpen(false)} 
        onShuffle={handleSurprise} 
      />
      <SubmitDrawer 
        isOpen={isSubmitOpen} 
        onClose={() => setIsSubmitOpen(false)} 
      />
    </div>
  );
}

export default App;