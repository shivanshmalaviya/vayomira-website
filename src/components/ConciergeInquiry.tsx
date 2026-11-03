import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Sparkles, Instagram, X, HeartHandshake, Film } from 'lucide-react';

export const ConciergeInquiry: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>('Generative AI Cinema');

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const projectTypes = [
    'Generative AI Cinema',
    'Commercial Brand Film',
    'CGI & 3D Worldcraft',
    'Post-Production & Sound',
    'Creative Collaboration',
  ];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (submitted) {
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setMessage('');
      }, 300);
    }
  };

  return (
    <section id="concierge" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
        <p className="text-xs uppercase tracking-[0.28em] font-mono text-[#D4AF37] font-medium">
          COMMISSION & COLLABORATION
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold text-[#F8FAFC] tracking-tight">
          LET&apos;S CREATE SOMETHING EXTRAORDINARY
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
          Whether you are an ambitious brand, an independent filmmaker, or a visionary creative team, we welcome collaborations of every scale.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Left Column: Warm Welcoming Invitation Card */}
        <div className="lg:col-span-7 bg-[#090D1E]/80 backdrop-blur-xl border border-[#D4AF37]/25 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#020617] border border-[#D4AF37]/30 text-xs font-mono text-[#F3E5AB]">
              <HeartHandshake className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Welcoming Visionaries & Collaborators</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] leading-snug">
              Every Masterpiece Begins With A Conversation.
            </h3>

            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              At <strong className="text-[#F8FAFC] font-semibold">Vayomira</strong>, we believe the greatest cinematic works are born from genuine human curiosity and bold imagination. You don&apos;t need an intimidating corporate dossier to reach out. Whether you have a fully formulated script, a commercial campaign brief, or simply an ambitious visual concept waiting to take flight, we&apos;re excited to listen.
            </p>

            {/* Approachable Collaboration Pillars */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#020617] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <p className="text-xs sm:text-sm text-[#F8FAFC]">
                  <strong className="text-[#F3E5AB]">Direct Creative Dialogue:</strong> Work directly with Creative Director Shivansh Malaviya and our core artists.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#020617] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <p className="text-xs sm:text-sm text-[#F8FAFC]">
                  <strong className="text-[#F3E5AB]">Bespoke Production Paths:</strong> Tailored treatments for narrative films, fashion worlds, commercial CGI, and neural experiments.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#020617] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <p className="text-xs sm:text-sm text-[#F8FAFC]">
                  <strong className="text-[#F3E5AB]">Personal & Timely:</strong> We respect your time. Expect a thoughtful, personal reply within 24–48 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Primary Action Button (Triggers Pop-up Modal) */}
          <div className="pt-8 relative z-10">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C59B27] text-[#020617] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:shadow-[0_0_35px_rgba(212,175,55,0.65)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Initiate Commission</span>
              <Sparkles className="w-4 h-4 text-[#020617]" />
            </button>
          </div>
        </div>

        {/* Right Column: Clean, Approachable Direct Connect Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#F8FAFC]">
                DIRECT FOUNDER CONNECT
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Prefer to drop a quick line directly? Connect with Shivansh and the studio team through our official channels:
              </p>
            </div>

            {/* Direct Card 1: Email (shivansh@vayomira.com) */}
            <div className="p-6 rounded-2xl bg-[#090D1E] border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 transition-all flex items-center justify-between gap-4 shadow-lg group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#020617] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 group-hover:text-[#F3E5AB] transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#94A3B8] block font-mono">
                    DIRECT EMAIL
                  </span>
                  <a
                    href="mailto:shivansh@vayomira.com"
                    className="text-sm sm:text-base font-semibold text-[#F8FAFC] hover:text-[#F3E5AB] transition-colors break-all"
                  >
                    shivansh@vayomira.com
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy('shivansh@vayomira.com', 'email')}
                aria-label="Copy email address"
                className="p-2.5 rounded-xl bg-[#020617] border border-[#D4AF37]/20 text-[#94A3B8] hover:text-[#F3E5AB] hover:border-[#D4AF37]/50 transition-colors shrink-0 cursor-pointer"
                title="Copy email to clipboard"
              >
                {copyFeedback === 'email' ? <Check className="w-4 h-4 text-[#D4AF37]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Direct Card 2: Instagram (@vayomira.co) */}
            <div className="p-6 rounded-2xl bg-[#090D1E] border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 transition-all flex items-center justify-between gap-4 shadow-lg group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#020617] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 group-hover:text-[#F3E5AB] transition-all">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#94A3B8] block font-mono">
                    INSTAGRAM / VISUAL REEL
                  </span>
                  <a
                    href="https://instagram.com/vayomira.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base font-semibold text-[#F8FAFC] hover:text-[#F3E5AB] transition-colors"
                  >
                    @vayomira.co
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy('@vayomira.co', 'instagram')}
                aria-label="Copy Instagram handle"
                className="p-2.5 rounded-xl bg-[#020617] border border-[#D4AF37]/20 text-[#94A3B8] hover:text-[#F3E5AB] hover:border-[#D4AF37]/50 transition-colors shrink-0 cursor-pointer"
                title="Copy Instagram handle"
              >
                {copyFeedback === 'instagram' ? <Check className="w-4 h-4 text-[#D4AF37]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Copy Toast Feedback */}
          {copyFeedback && (
            <div className="p-3 rounded-xl bg-[#020617] border border-[#D4AF37]/50 text-center text-xs font-mono text-[#F3E5AB] animate-fade-in">
              ✓ {copyFeedback === 'email' ? 'Email' : 'Handle'} copied to clipboard!
            </div>
          )}

          {/* Studio Reassurance Note */}
          <div className="p-5 rounded-2xl bg-[#090D1E]/60 border border-[#D4AF37]/15 text-xs text-[#94A3B8] flex items-start gap-3 leading-relaxed">
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <span>
              All inquiries and original concepts are handled with mutual non-disclosure and artistic respect. We are excited to collaborate with ambitious creators worldwide.
            </span>
          </div>
        </div>
      </div>

      {/* POP-UP MODAL: Interactive Client Inquiry Form */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#020617]/85 backdrop-blur-xl animate-fade-in"
          role="dialog"
          aria-modal="true"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-xl bg-[#090D1E] border border-[#D4AF37]/35 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#D4AF37]/15">
              <div>
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37] block">
                  START A CONVERSATION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                  Initiate Commission
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                aria-label="Close dialog"
                className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-5">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#020617] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-[#F8FAFC]">
                  THANK YOU, {name.toUpperCase()}
                </h4>
                <p className="text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                  Your note has landed directly with Creative Director Shivansh Malaviya. We will review your vision and reach back out to you at <span className="text-[#F3E5AB] font-semibold">{email}</span> within 24–48 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#020617] bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Discipline Chips */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] font-mono text-[#F3E5AB] mb-2.5">
                    What discipline fits your vision best?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                          selectedType === type
                            ? 'bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] text-[#020617] font-semibold shadow-[0_0_12px_rgba(212,175,55,0.35)]'
                            : 'bg-[#020617] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#D4AF37]/20'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="modal-name" className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      id="modal-name"
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Victoria Sterling"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#020617] border border-[#D4AF37]/25 text-[#F8FAFC] placeholder-[#94A3B8]/40 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-email" className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="modal-email"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="v.sterling@maison.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#020617] border border-[#D4AF37]/25 text-[#F8FAFC] placeholder-[#94A3B8]/40 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                {/* Message / Vision */}
                <div>
                  <label htmlFor="modal-message" className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1.5">
                    What are you dreaming of creating? *
                  </label>
                  <textarea
                    id="modal-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your story, timeline, visual style, or what you'd like to collaborate on..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#020617] border border-[#D4AF37]/25 text-[#F8FAFC] placeholder-[#94A3B8]/40 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C59B27] text-[#020617] text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Message to Shivansh</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
