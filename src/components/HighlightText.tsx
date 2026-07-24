import React from "react";

interface HighlightTextProps {
  text: string;
  search: string;
}

export default function HighlightText({ text, search }: HighlightTextProps) {
  if (!search.trim()) {
    return <>{text}</>;
  }

  const regex = new RegExp(`(${search.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-[var(--accent)]/20 text-[var(--accent)] font-bold px-0.5 rounded">
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}
