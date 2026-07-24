import { useState, useEffect } from "react";

interface ToastMessage {
  id: string;
  text: string;
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const text = (e as CustomEvent<string>).detail;
      const id = Math.random().toString(36).substring(2, 9);
      
      setToasts((prev) => [...prev, { id, text }]);
      
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    };

    window.addEventListener("app-toast", handleToast);
    return () => window.removeEventListener("app-toast", handleToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50 pointer-events-none w-full max-w-sm px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="px-4 py-2.5 bg-black/80 border border-[var(--accent)]/30 text-slate-200 text-xs font-semibold rounded-lg shadow-lg shadow-[var(--accent)]/10 backdrop-blur-md text-center transition-all duration-300 transform translate-y-0 animate-fade-in-up"
        >
          {toast.text}
        </div>
      ))}
    </div>
  );
}
