import { useState } from "react";
import { Tool, Category } from "../types";

export function useTools(toolsData: Category[], featuredData: Tool[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Filter categories and their tools based on active category selection and search query
  const filteredCategories = toolsData
    .map((cat): Category => {
      const matchesCategory = !activeCategory || cat.slug === activeCategory;
      const filtered = cat.tools.filter((tool) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          tool.name.toLowerCase().includes(q) ||
          (tool.description || tool.desc || "").toLowerCase().includes(q)
        );
      });
      return { ...cat, filteredTools: filtered, matchesCategory };
    })
    .filter((cat) => (cat.filteredTools?.length ?? 0) > 0 && cat.matchesCategory);

  // Calculate current showing tools count
  const showingCount = filteredCategories.reduce(
    (sum, cat) => sum + (cat.filteredTools?.length ?? 0),
    0
  );

  // Filter featured tools based on search query
  const filteredFeatured = featuredData.filter((tool) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      tool.name.toLowerCase().includes(q) ||
      (tool.description || tool.desc || "").toLowerCase().includes(q) ||
      (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(q)))
    );
  });

  return {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    filteredCategories,
    showingCount,
    filteredFeatured
  };
}
