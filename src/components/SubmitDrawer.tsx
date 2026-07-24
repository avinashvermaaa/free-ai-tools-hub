import React, { useState } from "react";

interface SubmitDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitDrawer({ isOpen, onClose }: SubmitDrawerProps) {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    category: "Development",
    tags: "",
    description: "",
    github: "",
    license: "MIT",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const title = encodeURIComponent(`Add Tool: ${formData.name}`);
    const issueBody = `### Tool Name
${formData.name}

### Website URL
${formData.url}

### Category
${formData.category}

### Description
${formData.description}

### Tags / Keywords
${formData.tags}

### GitHub Repository (if open-source)
${formData.github || "N/A"}

### License
${formData.license}
`;
    const body = encodeURIComponent(issueBody);
    const githubIssuesUrl = `https://github.com/avinashvermaaa/free-ai-tools-hub/issues/new?title=${title}&body=${body}`;
    
    window.open(githubIssuesUrl, "_blank");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer Container Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-white/[0.08] shadow-2xl p-6 md:p-8 flex flex-col h-full justify-between animate-fade-in relative">
          
          {/* Header */}
          <div className="flex justify-between items-center pb-5 border-b border-white/[0.05]">
            <div>
              <h2 className="text-xl font-black text-slate-100">Submit an AI Tool</h2>
              <p className="text-xs text-slate-400">Suggest a tool to be added to the Hub</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white cursor-pointer transition-colors p-1"
              aria-label="Close drawer"
            >
              ✕
            </button>
          </div>

          {/* Form Scroll Container */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto my-6 space-y-4 pr-1">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Tool Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. DrawDB"
                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-2.5 text-slate-200 outline-none focus:border-[var(--accent)]/50 focus:bg-white/[0.04] transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Website URL *
              </label>
              <input
                type="url"
                name="url"
                required
                value={formData.url}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-2.5 text-slate-200 outline-none focus:border-[var(--accent)]/50 focus:bg-white/[0.04] transition-all text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-[#0d0d16] border border-white/[0.08] rounded-xl px-4 py-2.5 text-slate-200 outline-none focus:border-[var(--accent)]/50 transition-all text-sm cursor-pointer"
                >
                  <option value="Development">Development</option>
                  <option value="Audio & Music">Audio & Music</option>
                  <option value="Image & Design">Image & Design</option>
                  <option value="Video">Video</option>
                  <option value="Writing & Chat">Writing & Chat</option>
                  <option value="Productivity">Productivity</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  License
                </label>
                <input
                  type="text"
                  name="license"
                  value={formData.license}
                  onChange={handleChange}
                  placeholder="e.g. MIT"
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-2.5 text-slate-200 outline-none focus:border-[var(--accent)]/50 focus:bg-white/[0.04] transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                GitHub Repository
              </label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-2.5 text-slate-200 outline-none focus:border-[var(--accent)]/50 focus:bg-white/[0.04] transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="database, design, visualizer"
                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-2.5 text-slate-200 outline-none focus:border-[var(--accent)]/50 focus:bg-white/[0.04] transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief explanation of what the tool does..."
                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-2.5 text-slate-200 outline-none focus:border-[var(--accent)]/50 focus:bg-white/[0.04] transition-all text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-xl bg-[var(--accent)] text-black hover:opacity-90 font-bold text-xs tracking-wider uppercase transition-opacity cursor-pointer shadow-md"
            >
              🚀 Create GitHub Issue
            </button>
          </form>

          {/* Guidelines info */}
          <div className="pt-4 border-t border-white/[0.05] text-[10px] text-slate-400 leading-relaxed font-mono">
            * Submissions are processed through our GitHub issue queue. A pull request is created upon approval.
          </div>
        </div>
      </div>
    </div>
  );
}
