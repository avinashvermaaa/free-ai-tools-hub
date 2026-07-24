import { useState } from "react";
import toolsDataRaw from "./constants/index";
import featuredDataRaw from "./constants/featured.json";
import ToolCard from "./components/ToolCard";
import Footer from "./components/Footer";
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
  const {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    filteredCategories,
    showingCount,
    filteredFeatured
  } = useTools(toolsData, featuredData);

  return (
    <div className="min-h-screen pb-0 w-full flex flex-col items-center justify-between">
      {/* Top Header & Search Area */}
      <header className="w-full max-w-[1600px] pt-16 pb-8 px-4 md:px-12 text-center relative">
        {/* Glow ambient background effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-yellow-500/[0.02] blur-[120px] rounded-full pointer-events-none -z-10" />

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
          <span className="text-[var(--accent)] font-black">Free-AI-Tools-Hub ✦</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mb-10 leading-relaxed">
          Discover a hand-picked, curated collection of free and open-source artificial intelligence tools to supercharge your workflow.
        </p>

        {/* Search Bar Container */}
        <div className="w-full mb-8">
          <div className="flex items-center gap-3 px-4.5 py-3.5 bg-white/[0.01] border border-white/[0.06] rounded-2xl focus-within:border-[#facc15]/30 focus-within:bg-white/[0.02] focus-within:shadow-[0_0_30px_rgba(250,204,21,0.1)] transition-all duration-300">
            <svg className="w-5 h-5 text-[#facc15] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap justify-start gap-2 mb-10 w-full">
          <button
            onClick={() => setActiveCategory(null)}
            className={`group flex items-center gap-3 px-4 py-2 rounded-none text-xs font-bold border transition-all cursor-pointer ${
              activeCategory === null
                ? "bg-[var(--accent)] text-black border-transparent shadow-md shadow-yellow-500/10"
                : "bg-white/[0.02] text-slate-200 border-white/[0.05] hover:border-transparent hover:bg-[#facc15] hover:text-black"
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
                  ? "bg-[var(--accent)] text-black border-transparent shadow-md shadow-yellow-500/10"
                  : "bg-white/[0.02] text-slate-200 border-white/[0.05] hover:border-transparent hover:bg-[#facc15] hover:text-black"
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
              <span className="text-[10px] tracking-widest text-[#facc15] font-mono font-bold uppercase">
                ⚡ FEATURED PICKS ⚡
              </span>
              <div className="h-[1px] bg-gradient-to-l from-transparent to-white/[0.08] grow"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredFeatured.map((tool, i) => (
                <ToolCard key={i} tool={tool} />
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.filteredTools?.map((tool, i) => (
                    <ToolCard
                      key={i}
                      tool={tool}
                      categoryName={cat.title}
                      categoryIcon={cat.icon}
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
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold border border-white/[0.05] bg-white/[0.02] text-slate-300 hover:border-transparent hover:bg-[#facc15] hover:text-black hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 cursor-pointer"
            >
              Show More Tools
              <span>↓</span>
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;