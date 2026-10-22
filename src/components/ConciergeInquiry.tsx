import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Sparkles, Instagram, Linkedin, MessageSquare } from 'lucide-react';

export const ConciergeInquiry: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('Generative AI Cinema');
  const [selectedBudget, setSelectedBudget] = useState<string>('$50,000 - $100,000');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('Q2 2026 Production');

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [brief, setBrief] = useState<string>('');

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const projectTypes = [
    'Generative AI Cinema',
    'Commercial Brand World',
    'CGI, 3D & VFX Suite',
    'Spatial Art Installation',
    'Haute Couture Motion',
  ];

  const budgetTiers = [
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    '$250,000+ (Theatrical)',
  ];

  const timelines = [
    'Immediate (Fast-Track)',
    'Q2 2026 Production',
    'Q3-Q4 2026 Production',
    '2027 Pipeline Booking',
  ];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !brief.trim()) return;

    setSubmitted(true);
  };

  return (
    <section id="concierge" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <p className="text-xs uppercase tracking-[0.25em] font-mono text-[#D4AF37] font-medium">
          COMMISSION A PROJECT
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold text-[#F8FAFC] tracking-tight">
          CLIENT INQUIRY CONCIERGE
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
          Vayomira accepts a strictly curated slate of feature, commercial, and spatial commissions each year.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Interactive Commission Form */}
        <div className="lg:col-span-7 bg-[#090D1E]/80 backdrop-blur-xl border border-[#D4AF37]/20 rounded-3xl p-8 sm:p-12 shadow-2xl">
          {submitted ? (
            <div className="py-12 text-center space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#020617] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#F8FAFC]">
                INQUIRY REGISTERED
              </h3>
              <p className="text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-[#F3E5AB] font-semibold">{name}</span>. Your creative dossier has been transmitted directly to the desk of Creative Director Shivansh Malaviya. You will receive an executive response within 24–48 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 text-xs uppercase tracking-widest text-[#D4AF37] hover:text-[#F3E5AB] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 rounded-lg transition-colors"
                >
                  Submit Another Dossier
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Type Chips */}
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] font-mono text-[#F3E5AB] mb-3">
                  1. PROJECT DISCIPLINE
                </label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        selectedType === type
                          ? 'bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] text-[#020617] font-semibold shadow-[0_0_12px_rgba(212,175,55,0.35)]'
                          : 'bg-[#020617] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#D4AF37]/15'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Tier */}
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] font-mono text-[#F3E5AB] mb-3">
                  2. PRODUCTION SCALE / BUDGET BRACKET
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {budgetTiers.map((tier) => (
                    <button
                      type="button"
                      key={tier}
                      onClick={() => setSelectedBudget(tier)}
                      className={`px-3 py-2 text-xs text-center font-medium rounded-lg transition-all ${
                        selectedBudget === tier
                          ? 'bg-[#020617] text-[#F3E5AB] border border-[#D4AF37]/60 shadow-[0_0_10px_rgba(212,175,55,0.25)]'
                          : 'bg-[#020617]/50 text-[#94A3B8] hover:text-[#F8FAFC] border border-[#D4AF37]/10'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inquiry-name" className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="inquiry-name"
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Victoria Sterling"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#020617] border border-[#D4AF37]/20 text-[#F8FAFC] placeholder-[#94A3B8]/40 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="inquiry-email" className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1.5">
                    Corporate Email *
                  </label>
                  <input
                    id="inquiry-email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="v.sterling@maison.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#020617] border border-[#D4AF37]/20 text-[#F8FAFC] placeholder-[#94A3B8]/40 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="inquiry-company" className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1.5">
                  Brand, Studio or Production Company
                </label>
                <input
                  id="inquiry-company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Universal / Zenith Media"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#020617] border border-[#D4AF37]/20 text-[#F8FAFC] placeholder-[#94A3B8]/40 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="inquiry-brief" className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1.5">
                  Vision, Scope & Objectives *
                </label>
                <textarea
                  id="inquiry-brief"
                  required
                  rows={4}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="Describe your film narrative, brand atmosphere, target audience, or technical deliverables..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#020617] border border-[#D4AF37]/20 text-[#F8FAFC] placeholder-[#94A3B8]/40 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C59B27] text-[#020617] text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                <span>Initiate Project Commission</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Quick Connect Cards with 1-Click Copy */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#F8FAFC] mb-2">
              DIRECT EXECUTIVE CONNECT
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
              For urgent festival deadlines, broadcast acquisition, or confidential NDA inquiries, contact the director directly:
            </p>

            {/* Quick Card 1: Email */}
            <div className="p-5 rounded-2xl bg-[#090D1E] border border-[#D4AF37]/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#020617] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#94A3B8] block">DIRECT EMAIL</span>
                  <a
                    href="mailto:shivanshmalaviya@gmail.com"
                    className="text-sm font-semibold text-[#F8FAFC] hover:text-[#F3E5AB] transition-colors"
                  >
                    shivanshmalaviya@gmail.com
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy('shivanshmalaviya@gmail.com', 'email')}
                aria-label="Copy email address"
                className="p-2 rounded-lg bg-[#020617] border border-[#D4AF37]/20 text-[#94A3B8] hover:text-[#F3E5AB] transition-colors"
                title="Copy email to clipboard"
              >
                {copyFeedback === 'email' ? <Check className="w-4 h-4 text-[#D4AF37]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Quick Card 2: Instagram */}
            <div className="p-5 rounded-2xl bg-[#090D1E] border border-[#D4AF37]/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#020617] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#94A3B8] block">VISUAL REEL / INSTAGRAM</span>
                  <span className="text-sm font-semibold text-[#F8FAFC]">@vayomira.studio</span>
                </div>
              </div>

              <button
                onClick={() => handleCopy('@vayomira.studio', 'instagram')}
                aria-label="Copy Instagram handle"
                className="p-2 rounded-lg bg-[#020617] border border-[#D4AF37]/20 text-[#94A3B8] hover:text-[#F3E5AB] transition-colors"
                title="Copy Instagram handle"
              >
                {copyFeedback === 'instagram' ? <Check className="w-4 h-4 text-[#D4AF37]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Quick Card 3: LinkedIn */}
            <div className="p-5 rounded-2xl bg-[#090D1E] border border-[#D4AF37]/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#020617] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#94A3B8] block">PROFESSIONAL DOSSIER</span>
                  <span className="text-sm font-semibold text-[#F8FAFC]">in/shivanshmalaviya</span>
                </div>
              </div>

              <button
                onClick={() => handleCopy('https://www.linkedin.com/in/shivanshmalaviya', 'linkedin')}
                aria-label="Copy LinkedIn URL"
                className="p-2 rounded-lg bg-[#020617] border border-[#D4AF37]/20 text-[#94A3B8] hover:text-[#F3E5AB] transition-colors"
                title="Copy LinkedIn URL"
              >
                {copyFeedback === 'linkedin' ? <Check className="w-4 h-4 text-[#D4AF37]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Copy Toast Notification */}
          {copyFeedback && (
            <div className="p-3 rounded-xl bg-[#020617] border border-[#D4AF37]/40 text-center text-xs font-mono text-[#F3E5AB]">
              ✓ Copied to clipboard!
            </div>
          )}

          {/* Studio Guarantee Badge */}
          <div className="p-4 rounded-xl bg-[#020617]/50 border border-[#D4AF37]/10 text-xs text-[#94A3B8] flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>All inquiries are bound by mutual non-disclosure and intellectual property protection.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
