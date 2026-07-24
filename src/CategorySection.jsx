import ToolCard from "./ToolCard";

export default function CategorySection({ title, icon, tools, searchQuery }) {
  // Filter tools by search query
  const filtered = tools.filter((tool) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.desc.toLowerCase().includes(q)
    );
  });

  if (filtered.length === 0) return null;

  return (
    <section className="category">
      <h2 className="category-title">
        <span className="category-icon">{icon}</span>
        {title}
        <span className="tool-count">{filtered.length}</span>
      </h2>
      <div className="tools-grid">
        {filtered.map((tool, i) => (
          <ToolCard key={i} tool={tool} />
        ))}
      </div>
    </section>
  );
}