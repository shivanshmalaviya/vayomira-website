import React, { useState } from 'react';
import { Project, validateAdminPin, saveProjects, resetProjects } from '../utils/projectData';
import { Lock, X, Plus, Trash2, ArrowUp, ArrowDown, Edit3, RotateCcw, Check, KeyRound } from 'lucide-react';

interface StudioManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onProjectsChange: (projects: Project[]) => void;
}

export const StudioManagerModal: React.FC<StudioManagerModalProps> = ({
  isOpen,
  onClose,
  projects,
  onProjectsChange,
}) => {
  const [pin, setPin] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinError, setPinError] = useState<string | null>(null);

  // Edit / Create state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('');
  const [client, setClient] = useState('');
  const [year, setYear] = useState('2026');
  const [runtime, setRuntime] = useState('12 min');
  const [aspectRatio, setAspectRatio] = useState('2.39:1 Anamorphic');
  const [synopsis, setSynopsis] = useState('');
  const [directorNotes, setDirectorNotes] = useState('');
  const [toolsStr, setToolsStr] = useState('Veo 2, Unreal Engine 5.5, Kling');

  if (!isOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAdminPin(pin)) {
      setIsAuthenticated(true);
      setPinError(null);
    } else {
      setPinError('Invalid Security PIN. The studio access PIN is 2026.');
    }
  };

  const startEdit = (p: Project) => {
    setEditingProject(p);
    setIsCreatingNew(false);
    setTitle(p.title);
    setSubtitle(p.subtitle);
    setCategory(p.category);
    setClient(p.client);
    setYear(p.year);
    setRuntime(p.runtime);
    setAspectRatio(p.aspectRatio);
    setSynopsis(p.synopsis);
    setDirectorNotes(p.directorNotes);
    setToolsStr(p.tools.join(', '));
  };

  const startCreate = () => {
    setIsCreatingNew(true);
    setEditingProject(null);
    setTitle('');
    setSubtitle('');
    setCategory('Generative AI Cinema');
    setClient('Global Studio Client');
    setYear('2026');
    setRuntime('10 min');
    setAspectRatio('2.39:1 CinemaScope');
    setSynopsis('');
    setDirectorNotes('');
    setToolsStr('ComfyUI, Veo 2, Unreal Engine, DaVinci Resolve');
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    const toolsArray = toolsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (isCreatingNew) {
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        title: title || 'UNTITLED CINEMA WORK',
        subtitle: subtitle || 'New Studio Production',
        category: category || 'Generative AI Cinema',
        client: client || 'Private Studio Commission',
        year: year || '2026',
        runtime: runtime || '12 min',
        aspectRatio: aspectRatio || '2.39:1 Anamorphic',
        synopsis: synopsis || 'Atmospheric cinematic world currently in production.',
        directorNotes: directorNotes || 'Pioneering custom neural cinematography frameworks.',
        tools: toolsArray.length ? toolsArray : ['Veo 2', 'Unreal Engine 5.5'],
        deliverables: ['Theatrical 4K DCI', 'Spatial Audio Mix'],
        awards: ['Official Studio Selection 2026'],
        accentColor: '#D4AF37',
        bgGradient: 'from-[#0B132B] via-[#1C2541] to-[#020617]',
        featured: true,
      };
      const updated = [newProj, ...projects];
      onProjectsChange(updated);
      saveProjects(updated);
    } else if (editingProject) {
      const updated = projects.map((p) =>
        p.id === editingProject.id
          ? {
              ...p,
              title,
              subtitle,
              category,
              client,
              year,
              runtime,
              aspectRatio,
              synopsis,
              directorNotes,
              tools: toolsArray,
            }
          : p
      );
      onProjectsChange(updated);
      saveProjects(updated);
    }

    setEditingProject(null);
    setIsCreatingNew(false);
  };

  const handleDelete = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    onProjectsChange(updated);
    saveProjects(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= projects.length) return;
    const clone = [...projects];
    const [moved] = clone.splice(index, 1);
    clone.splice(newIdx, 0, moved);
    onProjectsChange(clone);
    saveProjects(clone);
  };

  const handleReset = () => {
    if (confirm('Reset showcase to initial master studio projects?')) {
      const defaults = resetProjects();
      onProjectsChange(defaults);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#020617]/90 backdrop-blur-2xl overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="manager-title"
    >
      <div className="relative w-full max-w-4xl bg-[#090D1E] border border-[#D4AF37]/30 rounded-2xl shadow-2xl shadow-black overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/20 bg-[#020617]/80">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-[#D4AF37]" />
            <h2 id="manager-title" className="text-sm font-brand font-bold tracking-[0.22em] uppercase text-[#F8FAFC]">
              VAYOMIRA VISUAL STUDIO MANAGER
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Studio Manager"
            className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#020617] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center space-y-6 my-auto">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#020617] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <KeyRound className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#F8FAFC]">
                CONFIDENTIAL STUDIO CLEARANCE
              </h3>
              <p className="text-xs text-[#94A3B8]">
                Enter studio security PIN (<code className="text-[#F3E5AB]">2026</code>) to configure portfolio projects.
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="max-w-xs mx-auto space-y-4">
              <input
                type="password"
                maxLength={8}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN (2026)"
                autoFocus
                className="w-full text-center tracking-widest text-lg py-2.5 rounded-xl bg-[#020617] border border-[#D4AF37]/30 text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]"
              />

              {pinError && <p className="text-xs text-rose-400 font-mono">{pinError}</p>}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] text-[#020617] text-xs font-bold uppercase tracking-widest shadow-md hover:scale-[1.02] transition-transform"
              >
                Unlock Studio
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D4AF37]/15">
              <span className="text-xs font-mono uppercase text-[#F3E5AB]">
                ACTIVE PORTFOLIO SLATE ({projects.length} PROJECTS)
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#94A3B8] hover:text-[#F3E5AB] bg-[#020617] rounded-lg border border-[#D4AF37]/20 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Reset Defaults</span>
                </button>

                <button
                  onClick={startCreate}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#020617] bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] rounded-lg transition-transform hover:scale-105"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>
            </div>

            {/* Create / Edit Form Overlay */}
            {(isCreatingNew || editingProject) && (
              <form
                onSubmit={handleSaveForm}
                className="p-6 rounded-2xl bg-[#020617] border border-[#D4AF37]/30 space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase font-mono font-medium tracking-wider text-[#D4AF37]">
                    {isCreatingNew ? 'CREATE NEW FULL-SCREEN PROJECT' : `EDIT: ${editingProject?.title}`}
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingNew(false);
                      setEditingProject(null);
                    }}
                    className="text-xs text-[#94A3B8] hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#94A3B8] block mb-1">
                      Project Title *
                    </label>
                    <input
                      required
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. SOLARIS RISING"
                      className="w-full px-3 py-2 rounded-lg bg-[#090D1E] border border-[#D4AF37]/20 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#94A3B8] block mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="e.g. A Metaphysical Odyssey"
                      className="w-full px-3 py-2 rounded-lg bg-[#090D1E] border border-[#D4AF37]/20 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#94A3B8] block mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Generative AI Cinema"
                      className="w-full px-3 py-2 rounded-lg bg-[#090D1E] border border-[#D4AF37]/20 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#94A3B8] block mb-1">
                      Client
                    </label>
                    <input
                      type="text"
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
                      placeholder="Studio / Brand Client"
                      className="w-full px-3 py-2 rounded-lg bg-[#090D1E] border border-[#D4AF37]/20 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#94A3B8] block mb-1">
                      Year
                    </label>
                    <input
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="2026"
                      className="w-full px-3 py-2 rounded-lg bg-[#090D1E] border border-[#D4AF37]/20 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#94A3B8] block mb-1">
                    Synopsis
                  </label>
                  <textarea
                    rows={2}
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                    placeholder="Short editorial summary of the project..."
                    className="w-full px-3 py-2 rounded-lg bg-[#090D1E] border border-[#D4AF37]/20 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37] resize-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#94A3B8] block mb-1">
                    Tools (comma separated)
                  </label>
                  <input
                    type="text"
                    value={toolsStr}
                    onChange={(e) => setToolsStr(e.target.value)}
                    placeholder="Veo 2, Unreal Engine, Kling, DaVinci Resolve"
                    className="w-full px-3 py-2 rounded-lg bg-[#090D1E] border border-[#D4AF37]/20 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] text-[#020617] text-xs font-bold uppercase tracking-wider"
                >
                  Save to Showcase
                </button>
              </form>
            )}

            {/* Project List */}
            <div className="space-y-3">
              {projects.map((p, idx) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl bg-[#020617]/80 border border-[#D4AF37]/15 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#D4AF37] w-6">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-[#F8FAFC]">{p.title}</h4>
                      <p className="text-xs text-[#94A3B8]">
                        {p.category} · {p.client} · {p.year}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMove(idx, 'up')}
                      disabled={idx === 0}
                      aria-label="Move up"
                      className="p-1.5 rounded-lg bg-[#090D1E] text-[#94A3B8] hover:text-[#F3E5AB] disabled:opacity-20"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(idx, 'down')}
                      disabled={idx === projects.length - 1}
                      aria-label="Move down"
                      className="p-1.5 rounded-lg bg-[#090D1E] text-[#94A3B8] hover:text-[#F3E5AB] disabled:opacity-20"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => startEdit(p)}
                      aria-label="Edit project"
                      className="p-1.5 rounded-lg bg-[#090D1E] text-[#94A3B8] hover:text-[#D4AF37]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      aria-label="Delete project"
                      className="p-1.5 rounded-lg bg-[#090D1E] text-[#94A3B8] hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
