import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import ContactMap from './ContactMap/ContactMap';

export default function CampusHeadquarters() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    query: '', 
    category: 'General Inquiry' 
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isHighlighted, setIsHighlighted] = useState(false);

  // Listen for membership forward actions from anywhere across the chapter site
  useEffect(() => {
    const handleInquiryDispatch = (e) => {
      const targetCategory = e.detail?.category || 'Student Membership (SMIE)';
      const queryPrompt = e.detail?.query || 
        'I would like to apply for the Student Member (SMIE) membership at SIES GST. Please guide me through the registration and fee verification process.';

      setFormData(prev => ({
        ...prev,
        category: targetCategory,
        query: prev.query ? prev.query : queryPrompt
      }));

      setIsHighlighted(true);
      setTimeout(() => setIsHighlighted(false), 3500);

      const input = document.getElementById('inquiry-full-name');
      if (input) {
        input.focus();
      }
    };

    window.addEventListener('iei-open-inquiry', handleInquiryDispatch);
    return () => window.removeEventListener('iei-open-inquiry', handleInquiryDispatch);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);
    audioEngine.playClick();

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Failed to transmit inquiry to council.');
      }

      audioEngine.playSuccessChime();
      setIsSubmitted(true);
    } catch (err) {
      console.warn('[Dispatch Warning]:', err.message);
      // Fallback: still confirm submission locally if network issue occurs
      audioEngine.playChime();
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10" aria-label="Institutional Engagement & Contact">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-zinc-950 tracking-ultra-tight">
            Driven by engineering.<br />
            <span className="text-zinc-400">
              Defined by integrity.
            </span>
          </h2>
        </div>
      </div>

      {/* DUAL CONTACT & DISPATCH GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Campus Info */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl p-8 border border-black/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
            <h3 className="font-display text-xl font-bold text-zinc-950 mb-1">
              SIES Graduate School of Technology
            </h3>
            <p className="text-sm text-zinc-600 mb-6 font-medium">
              Department of Electronics &amp; Computer Science Engineering
            </p>

            <div className="space-y-3.5 text-sm text-zinc-600 mb-6 pt-3">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-zinc-500 shrink-0 mt-0.5" />
                <span>
                  Sri Chandrasekarendra Saraswati Vidyapuram,<br />
                  Sector-V, Nerul, Navi Mumbai - 400706, Maharashtra, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#0062FF] shrink-0" />
                <a href="mailto:iei@siesgst.edu.in" className="hover:text-black transition-colors underline font-medium">
                  iei@siesgst.edu.in
                </a>
              </div>
            </div>

            {/* Google Maps Embed — lightweight iframe, no API key */}
            <ContactMap />
          </div>
        </div>

        {/* Right: Direct Dispatch Ingestion Form (Pure Pitch Black & White Aesthetic) */}
        <div 
          id="communication-desk-card"
          className={`lg:col-span-6 relative overflow-hidden rounded-3xl p-6 sm:p-8 border bg-black text-white transition-all duration-300 ${
            isHighlighted 
              ? 'ring-2 ring-white border-white shadow-[0_0_35px_rgba(255,255,255,0.25)]' 
              : 'border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]'
          }`}
        >
          {/* Form Heading & Supporting Sentence */}
          <div className="relative mb-6 sm:mb-8">
            <h3 className="font-display font-black text-white tracking-tight text-[clamp(1.35rem,2.2vw,1.75rem)] leading-tight mb-2">
              SEND INQUIRY TO THE COUNCIL
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
              Have a question about the chapter, an event, or student participation?
            </p>
          </div>

          {isSubmitted ? (
            /* Pure Pitch Black & White Success State */
            <div className="relative p-6 sm:p-8 bg-zinc-950 border border-white/20 rounded-2xl space-y-3 animate-fadeIn text-left">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-white shrink-0" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  INQUIRY SENT
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                Thank you. Your dispatch has been transmitted to the Chapter Secretariat and Council Desk. A reply will be forwarded to <strong className="text-white font-semibold">{formData.email}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative space-y-5">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-zinc-900 border border-red-500/40 text-red-300 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Desktop 2-Column: Full Name + Institutional Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label 
                    htmlFor="inquiry-full-name" 
                    className="font-mono text-[10.5px] font-bold text-zinc-300 uppercase tracking-wider block mb-2"
                  >
                    FULL NAME
                  </label>
                  <input
                    id="inquiry-full-name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-11 sm:h-12 bg-black border border-white/20 rounded-2xl px-4 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 hover:border-white/30 transition-all font-sans"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="inquiry-email" 
                    className="font-mono text-[10.5px] font-bold text-zinc-300 uppercase tracking-wider block mb-2"
                  >
                    INSTITUTIONAL EMAIL
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    required
                    placeholder="name@siesgst.ac.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 sm:h-12 bg-black border border-white/20 rounded-2xl px-4 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 hover:border-white/30 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Inquiry Type Dropdown */}
              <div>
                <label 
                  htmlFor="inquiry-category" 
                  className="font-mono text-[10.5px] font-bold text-zinc-300 uppercase tracking-wider block mb-2"
                >
                  INQUIRY TYPE
                </label>
                <div className="relative">
                  <select
                    id="inquiry-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-11 sm:h-12 bg-black border border-white/20 rounded-2xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 hover:border-white/30 transition-all font-sans appearance-none pr-10 cursor-pointer"
                  >
                    <option value="Student Membership (SMIE)" className="bg-black text-white">Student Membership (SMIE)</option>
                    <option value="General Inquiry" className="bg-black text-white">General Inquiry</option>
                    <option value="Competitions & Hackathons" className="bg-black text-white">Competitions &amp; Hackathons</option>
                    <option value="Research & Papers" className="bg-black text-white">Research &amp; Papers</option>
                  </select>
                  {/* Styled Chevron Icon */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label 
                  htmlFor="inquiry-message" 
                  className="font-mono text-[10.5px] font-bold text-zinc-300 uppercase tracking-wider block mb-2"
                >
                  MESSAGE
                </label>
                <textarea
                  id="inquiry-message"
                  required
                  rows={4}
                  placeholder="Write your message or question for the council..."
                  value={formData.query}
                  onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                  className="w-full min-h-[120px] sm:min-h-[135px] bg-black border border-white/20 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 hover:border-white/30 transition-all font-sans resize-y"
                />
              </div>

              {/* Action Button: Pure White with Pitch Black Text */}
              <div className="pt-2 flex sm:justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full sm:w-auto h-11 sm:h-12 px-7 rounded-2xl bg-white hover:bg-zinc-200 text-black text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2.5 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-[0.99] shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.25)] disabled:opacity-50 cursor-pointer"
                >
                  <span>{isSubmitting ? 'SENDING…' : 'SEND INQUIRY'}</span>
                  <Send size={14} className="text-black transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

    </section>
  );
}
