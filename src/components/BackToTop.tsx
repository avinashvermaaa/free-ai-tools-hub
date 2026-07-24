import React, { useEffect, useState } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-11 G-11 h-11 rounded-xl bg-[#0d0d16]/80 hover:bg-[#0d0d16] border border-white/[0.08] hover:border-[var(--accent)]/40 text-slate-300 hover:text-[var(--accent)] flex items-center justify-center shadow-lg hover:shadow-[var(--accent)]/10 backdrop-blur-md cursor-pointer transition-all duration-300 transform active:scale-95 animate-fade-in"
      aria-label="Scroll back to top"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
