

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.05] bg-white/[0.01] mt-24 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle footer glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-[var(--accent)]/[0.01] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">✦</span>
            <span className="font-extrabold text-base tracking-tight text-white">
              <span className="text-[var(--accent)] font-black">Free AI Tools Hub</span>
            </span>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
            A carefully curated repository of premium quality, free-to-use artificial intelligence tools and utilities designed to optimize developers' and creators' workflows.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-3">
          <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider">Resources</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="https://github.com/avinashvermaaa/free-ai-tools-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[var(--accent)] transition-colors"
              >
                GitHub Repository
              </a>
            </li>
            <li>
              <a
                href="https://react.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[var(--accent)] transition-colors"
              >
                React Framework
              </a>
            </li>
            <li>
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[var(--accent)] transition-colors"
              >
                Tailwind CSS
              </a>
            </li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-3">
          <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider">Project</h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            Suggest new tools or contribute to the list by submitting a pull request on our GitHub repository.
          </p>
          <a
            href="https://github.com/avinashvermaaa/free-ai-tools-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] hover:underline transition-colors mt-1"
          >
            Contribute on GitHub ↗
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 border-t border-white/[0.03] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-mono">
        <div>
          &copy; {new Date().getFullYear()} Free AI Tools Hub. All rights reserved.
        </div>
        <div className="flex items-center gap-2">
          <span>Built with Vite ⚡ + React ⚛️ + Tailwind CSS 🎨</span>
        </div>
      </div>
    </footer>
  );
}
