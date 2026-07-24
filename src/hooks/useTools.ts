import { useState, useEffect } from "react";
import { Tool, Category } from "../types";

export function useTools(toolsData: Category[], featuredData: Tool[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"default" | "name" | "stars">("default");

  // Load bookmarks on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("fav-tools");
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load bookmarks", e);
    }
  }, []);

  const toggleBookmark = (toolId: string) => {
    const next = bookmarks.includes(toolId)
      ? bookmarks.filter((id) => id !== toolId)
      : [...bookmarks, toolId];
    setBookmarks(next);
    localStorage.setItem("fav-tools", JSON.stringify(next));
  };

  // Helper to extract tool ID (name is stable/clean)
  const getToolId = (tool: Tool) => tool.id || tool.name;

  // Gather all tools to support global bookmarks & sorting
  const allTools = toolsData.flatMap((cat) => cat.tools);

  // Sorting function
  const sortTools = (list: Tool[]) => {
    const cloned = [...list];
    if (sortBy === "name") {
      return cloned.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === "stars") {
      const getNum = (t: Tool) => {
        if (!t.stars) return 0;
        if (typeof t.stars === "number") return t.stars;
        if (t.stars.endsWith("k")) return parseFloat(t.stars) * 1000;
        return parseFloat(t.stars) || 0;
      };
      return cloned.sort((a, b) => getNum(b) - getNum(a));
    }
    return cloned;
  };

  // Determine categories to display
  let computedCategories: Category[] = [];

  if (activeCategory === "bookmarks") {
    const bookmarkedTools = allTools.filter((t) => bookmarks.includes(getToolId(t)));
    const filtered = bookmarkedTools.filter((tool) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        tool.name.toLowerCase().includes(q) ||
        (tool.description || tool.desc || "").toLowerCase().includes(q)
      );
    });
    computedCategories = [
      {
        title: "My Bookmarks",
        icon: "❤️",
        slug: "bookmarks",
        tools: bookmarkedTools,
        filteredTools: sortTools(filtered),
        matchesCategory: true
      }
    ];
  } else {
    computedCategories = toolsData
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
        return { ...cat, filteredTools: sortTools(filtered), matchesCategory };
      })
      .filter((cat) => (cat.filteredTools?.length ?? 0) > 0 && cat.matchesCategory);
  }

  // Calculate current showing tools count
  const showingCount = computedCategories.reduce(
    (sum, cat) => sum + (cat.filteredTools?.length ?? 0),
    0
  );

  // Filter featured tools based on search query (not shown when Bookmarks active)
  const filteredFeatured = sortTools(
    featuredData.filter((tool) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        tool.name.toLowerCase().includes(q) ||
        (tool.description || tool.desc || "").toLowerCase().includes(q) ||
        (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(q)))
      );
    })
  );

  return {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    filteredCategories: computedCategories,
    showingCount,
    filteredFeatured,
    bookmarks,
    toggleBookmark,
    sortBy,
    setSortBy
  };
}
