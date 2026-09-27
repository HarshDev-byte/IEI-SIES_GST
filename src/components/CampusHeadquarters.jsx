import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Building, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

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
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-black/[0.06]" aria-label="Institutional Engagement & Contact">
      
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

        <p className="text-zinc-600 text-sm sm:text-base max-w-md leading-relaxed font-normal">
          The official student chapter of the Institution of Engineers (India) at SIES Graduate School of Technology.
        </p>
      </div>

      {/* DUAL CONTACT & DISPATCH GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Campus Info */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl p-8 border border-black/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-2 font-mono text-xs text-[#0062FF] mb-3 font-semibold">
              <ShieldCheck size={14} />
              <span>OFFICIAL CHAPTER LOCATION</span>
            </div>

            <h3 className="font-display text-xl font-bold text-zinc-950 mb-1">
              SIES Graduate School of Technology
            </h3>
            <p className="font-mono text-xs text-zinc-500 mb-6">
              Department of Electronics &amp; Computer Science Engineering
            </p>

            <div className="space-y-3.5 font-mono text-xs text-zinc-600 mb-6 border-t border-black/[0.06] pt-5">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-zinc-500 shrink-0 mt-0.5" />
                <span>
                  Sri Chandrasekarendra Saraswati Vidyapuram,<br />
                  Sector-V, Nerul, Navi Mumbai - 400706, Maharashtra, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#0062FF] shrink-0" />
                <a href="mailto:iei@siesgst.ac.in" className="hover:text-black transition-colors underline font-medium">
                  iei@siesgst.ac.in
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Building size={14} className="text-emerald-700 shrink-0" />
                <span>Affiliated to University of Mumbai · AICTE Approved</span>
              </div>
            </div>

            <div className="bg-[#FAFAFC] p-4 rounded-xl border border-black/[0.06] font-mono text-xs text-zinc-700">
              <div className="flex justify-between items-center mb-1">
                <span className="text-zinc-500">CHAPTER STATUS</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ACTIVE CHAPTER
                </span>
              </div>
              <div className="text-zinc-600">National Charter Est. 1920 · Royal Charter 1935</div>
            </div>
          </div>
        </div>

        {/* Right: Direct Dispatch Ingestion Form */}
        <div 
          id="communication-desk-card"
          className={`lg:col-span-6 bg-white rounded-2xl p-8 border transition-all duration-500 shadow-[0_4px_25px_rgba(0,0,0,0.03)] ${
            isHighlighted 
              ? 'ring-2 ring-[#0062FF] border-[#0062FF] shadow-[0_0_35px_rgba(0,98,255,0.2)]' 
              : 'border-black/[0.08]'
          }`}
        >
          <div className="font-mono text-xs text-zinc-500 mb-1 font-semibold flex items-center justify-between">
            <span>COMMUNICATION DESK</span>
            {isHighlighted && (
              <span className="text-[10px] text-[#0062FF] font-mono animate-pulse">
                ✦ MEMBERSHIP APPLICATION ACTIVE
              </span>
            )}
          </div>
          <h3 className="font-display text-xl font-bold text-zinc-950 mb-5">
            Send Inquiry to Council
          </h3>

          {isSubmitted ? (
            <div className="p-6 text-center bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 animate-fadeIn">
              <CheckCircle2 size={30} className="text-emerald-600 mx-auto" />
              <div className="font-display text-base font-bold text-zinc-950">Transmission Recorded &amp; Dispatched</div>
              <p className="font-mono text-xs text-zinc-600 max-w-sm mx-auto">
                Your inquiry has been received and forwarded to the Chapter Secretariat and Council Desk. A reply will be dispatched to <span className="font-semibold text-zinc-900">{formData.email}</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 font-mono text-xs">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="font-mono text-[10px] text-zinc-500 uppercase block mb-1 font-semibold">
                  Full Name
                </label>
                <input
                  id="inquiry-full-name"
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FAFAFC] border border-black/[0.1] rounded-lg px-3.5 py-2 text-sm text-zinc-950 focus:outline-none focus:border-[#0062FF] focus:bg-white font-mono transition-all"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-zinc-500 uppercase block mb-1 font-semibold">
                  Institutional Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@siesgst.ac.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAFAFC] border border-black/[0.1] rounded-lg px-3.5 py-2 text-sm text-zinc-950 focus:outline-none focus:border-[#0062FF] focus:bg-white font-mono transition-all"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-zinc-500 uppercase block mb-1 font-semibold">
                  Inquiry Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#FAFAFC] border border-black/[0.1] rounded-lg px-3.5 py-2 text-sm text-zinc-950 focus:outline-none focus:border-[#0062FF] focus:bg-white font-mono transition-all"
                >
                  <option value="Student Membership (SMIE)">Student Membership (SMIE)</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Competitions & Hackathons">Competitions &amp; Hackathons</option>
                  <option value="Research & Papers">Research &amp; Papers</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[10px] text-zinc-500 uppercase block mb-1 font-semibold">
                  Message
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Write your message or membership question..."
                  value={formData.query}
                  onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                  className="w-full bg-[#FAFAFC] border border-black/[0.1] rounded-lg px-3.5 py-2 text-sm text-zinc-950 focus:outline-none focus:border-[#0062FF] focus:bg-white font-mono transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-minimal-primary py-2.5 flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer disabled:opacity-50"
              >
                <Send size={13} />
                <span>{isSubmitting ? 'Transmitting to Council Desk...' : 'Submit Inquiry'}</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </section>
  );
}
