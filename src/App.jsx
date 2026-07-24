import { useState } from "react";
import toolsData from "./data/index.js";
import featuredData from "./data/featured.json";
import ToolCard from "./ToolCard";
import "./App.css";

// Calculate counts
const totalTools = toolsData.reduce((sum, cat) => sum + cat.tools.length, 0);

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  // Filter categories and their tools based on active category selection and search query
  const filteredCategories = toolsData
    .map((cat) => {
      const matchesCategory = !activeCategory || cat.slug === activeCategory;
      const filtered = cat.tools.filter((tool) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          tool.name.toLowerCase().includes(q) ||
          tool.desc.toLowerCase().includes(q)
        );
      });
      return { ...cat, filteredTools: filtered, matchesCategory };
    })
    .filter((cat) => cat.filteredTools.length > 0 && cat.matchesCategory);

  // Calculate current showing tools count
  const showingCount = filteredCategories.reduce(
    (sum, cat) => sum + cat.filteredTools.length,
    0
  );

  // Filter featured tools based on search query
  const filteredFeatured = featuredData.filter((tool) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.desc.toLowerCase().includes(q) ||
      (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] pb-12 w-full flex flex-col items-center">
      {/* Top Header & Search Area - Full Width Responsive Layout */}
      <header className="w-full max-w-[1600px] pt-12 pb-6 px-4 md:px-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#e6edf3] mb-3">
          🧠 Free AI Tools Hub
        </h1>
        <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-sm md:text-base mb-8">
          A curated directory of premium AI utilities and services for creators, developers, and writers.
        </p>

        {/* Search Bar Container - Responsive Full Width */}
        <div className="w-full mb-6">
          <div className="flex items-center gap-3 px-4 py-3.5 bg-[#12131a] border border-[#262930] rounded-xl focus-within:border-[#ff0055] focus-within:shadow-[0_0_0_1px_#ff0055] transition-all">
            <span className="text-[#ff0055] font-extrabold text-base select-none">&gt;</span>
            <input
              type="text"
              className="w-full bg-transparent text-[#e6edf3] placeholder:text-[#8b949e]/50 outline-none text-sm font-medium"
              placeholder="Search tools by name, tag, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="text-[#8b949e] hover:text-[#e6edf3] text-xs px-2 py-0.5 rounded bg-[#262930] transition-colors"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Chips - Wrapping with ◈All Prefix */}
        <div className="flex flex-wrap justify-start gap-2.5 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
              activeCategory === null
                ? "bg-[#ff0055] text-white border-[#ff0055]"
                : "bg-[#12131a] text-[#8b949e] border-[#262930] hover:border-[#ff0055]/50 hover:text-[#e6edf3]"
            }`}
          >
            <span className="text-sm">◈</span>All {totalTools}
          </button>
          {toolsData.map((cat) => (
            <button
              key={cat.slug}
              onClick={() =>
                setActiveCategory(activeCategory === cat.slug ? null : cat.slug)
              }
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                activeCategory === cat.slug
                  ? "bg-[#ff0055] text-white border-[#ff0055]"
                  : "bg-[#12131a] text-[#8b949e] border-[#262930] hover:border-[#ff0055]/50 hover:text-[#e6edf3]"
              }`}
            >
              <span className="text-sm shrink-0">{cat.icon}</span>
              <span>
                {cat.title} {cat.tools.length}
              </span>
            </button>
          ))}
        </div>

        {/* Showing statistics row */}
        <div className="text-[10px] tracking-widest text-[#8b949e] font-mono font-extrabold text-left uppercase">
          SHOWING {showingCount} OF {totalTools} TOOLS
        </div>
      </header>

      {/* Main Content Area - Full Screen Responsive Width */}
      <main className="w-full max-w-[1600px] px-4 md:px-12">
        {/* Featured Section */}
        {filteredFeatured.length > 0 && !activeCategory && (
          <div className="mb-14">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] bg-[#262930] grow"></div>
              <span className="text-[10px] tracking-widest text-[#8b949e] font-mono font-extrabold uppercase">
                FEATURED
              </span>
              <div className="h-[1px] bg-[#262930] grow"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredFeatured.map((tool, i) => (
                <ToolCard key={i} tool={tool} />
              ))}
            </div>
          </div>
        )}

        {/* Category lists */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-24 bg-[#12131a] border border-[#262930] rounded-2xl w-full">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-[#8b949e] text-base font-medium">
              No tools found matching your search query.
            </p>
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <section key={cat.slug} className="mb-14 w-full">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">{cat.icon}</span>
                <h2 className="text-xl font-extrabold text-[#e6edf3]">
                  {cat.title}
                </h2>
                <span className="text-xs text-[#8b949e] bg-[#12131a] border border-[#262930] rounded-md px-2.5 py-0.5 font-mono font-bold">
                  {cat.filteredTools.length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.filteredTools.map((tool, i) => (
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
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-[1600px] border-t border-[#262930] mt-20 pt-8 px-4 md:px-12 text-center text-xs text-[#8b949e] font-mono">
        Built with Vite ⚡ + React ⚛️ + Tailwind CSS 🎨 &nbsp;|&nbsp; Free AI Tools Hub ✨
      </footer>
    </div>
  );
}

export default App;