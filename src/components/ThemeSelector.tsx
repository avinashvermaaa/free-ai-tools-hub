import React, { useEffect, useState } from "react";

type Theme = "yellow" | "purple" | "green" | "pink";

export default function ThemeSelector() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("hub-theme");
    return (saved as Theme) || "yellow";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("hub-theme", theme);
  }, [theme]);

  const themes: { id: Theme; name: string; color: string }[] = [
    { id: "yellow", name: "Amber Gold", color: "bg-[#facc15]" },
    { id: "purple", name: "Cyber Violet", color: "bg-[#a78bfa]" },
    { id: "green", name: "Emerald Mint", color: "bg-[#34d399]" },
    { id: "pink", name: "Rose Pink", color: "bg-[#f472b6]" },
  ];

  return (
    <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05] backdrop-blur-md">
      <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase font-bold pl-1">
        Theme
      </span>
      <div className="flex gap-2">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            title={t.name}
            className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-all duration-300 relative ${t.color} ${
              theme === t.id
                ? "ring-2 ring-white ring-offset-2 ring-offset-[#05050a] scale-110"
                : "opacity-60 hover:opacity-100 hover:scale-105"
            }`}
            aria-label={`Switch to ${t.name} theme`}
          />
        ))}
      </div>
    </div>
  );
}
