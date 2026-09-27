import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, FileCheck, Building2, User, Mail, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioEngine';

export default function MembershipModal({ isOpen, onClose, selectedTier }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    discipline: 'Civil Engineering (CV)',
    grade: selectedTier?.designation || 'MIE',
    institution: '',
    experienceYears: '5'
  });
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState('');

  if (!isOpen) return null;

  const disciplines = [
    'Civil Engineering (CV)',
    'Mechanical Engineering (MC)',
    'Electrical Engineering (EL)',
    'Electronics & Telecommunication (ET)',
    'Computer Science & Engineering (CP)',
    'Chemical Engineering (CH)',
    'Aerospace Engineering (AS)',
    'Environmental Engineering (EN)',
    'Mining Engineering (MN)',
    'Metallurgical & Material Engineering (MM)',
    'Production Engineering (PR)'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    audioEngine.playClick();
    const generatedRef = `IEI-ENR-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefNumber(generatedRef);
    setSubmitted(true);
    audioEngine.playSuccessChime();

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00D6FF', '#075BFF', '#D6A85F']
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-xl rounded-2xl border border-black/10 bg-white p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto text-zinc-950"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => {
            audioEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-black hover:bg-black/[0.05] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center animate-fadeIn">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4 animate-bounce" />
            <div className="font-display font-black text-2xl text-zinc-950 mb-2">
              Application Dossier Inscribed
            </div>
            <p className="text-sm text-zinc-600 max-w-md mx-auto mb-6">
              Your enrolment proposal for <strong className="text-zinc-950">{formData.grade}</strong> grade has been registered with the Chapter Secretariat.
            </p>

            <div className="p-4 rounded-xl bg-[#FAFAFC] border border-black/[0.08] max-w-sm mx-auto mb-6 font-mono text-xs">
              <span className="text-zinc-500 block text-[10px] font-semibold">ENROLMENT TRACKING NUMBER</span>
              <span className="text-lg font-bold text-[#0062FF] mt-1 block">{refNumber}</span>
              <span className="text-zinc-500 text-[10px] mt-1 block">CONFIRMATION DISPATCHED TO {formData.email || 'YOUR EMAIL'}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="btn-minimal-primary py-2.5 px-6 text-sm font-semibold"
            >
              Done &amp; Return to Chapter
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/iei-official-logo.png" alt="IEI" className="w-10 h-10 object-contain p-0.5 rounded-full bg-zinc-50 border border-black/10" />
              <div>
                <h3 className="font-display font-bold text-xl text-zinc-950">
                  Official Membership Enrolment
                </h3>
                <div className="font-mono text-xs text-[#0062FF] font-semibold">
                  STATUTORY GRADE PROPOSAL · 2026 INTAKE
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-zinc-500 uppercase mb-1 font-semibold">
                  Full Legal Name (as per college ID / passport)
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Arjun M. Sharma"
                  className="w-full bg-[#FAFAFC] border border-black/[0.1] focus:border-[#0062FF] focus:bg-white rounded-lg px-3.5 py-2 text-sm text-zinc-950 font-mono placeholder:text-zinc-400 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-zinc-500 uppercase mb-1 font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="engineer@siesgst.ac.in"
                    className="w-full bg-[#FAFAFC] border border-black/[0.1] focus:border-[#0062FF] focus:bg-white rounded-lg px-3.5 py-2 text-sm text-zinc-950 font-mono placeholder:text-zinc-400 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-zinc-500 uppercase mb-1 font-semibold">
                    Mobile / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#FAFAFC] border border-black/[0.1] focus:border-[#0062FF] focus:bg-white rounded-lg px-3.5 py-2 text-sm text-zinc-950 font-mono placeholder:text-zinc-400 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-zinc-500 uppercase mb-1 font-semibold">
                    Target Grade
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full bg-[#FAFAFC] border border-black/[0.1] focus:border-[#0062FF] focus:bg-white rounded-lg px-3 py-2 text-sm text-zinc-950 font-mono outline-none transition-all"
                  >
                    <option value="SMIE">Student Member (SMIE)</option>
                    <option value="AMIE">Associate Member (AMIE)</option>
                    <option value="MIE">Member (MIE)</option>
                    <option value="FIE">Fellow (FIE)</option>
                    <option value="IM">Institutional Partner (IM)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs text-zinc-500 uppercase mb-1 font-semibold">
                    Engineering Discipline
                  </label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="w-full bg-[#FAFAFC] border border-black/[0.1] focus:border-[#0062FF] focus:bg-white rounded-lg px-3 py-2 text-sm text-zinc-950 font-mono outline-none transition-all"
                  >
                    {disciplines.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-zinc-500 uppercase mb-1 font-semibold">
                  University / College / Organization
                </label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="e.g. SIES Graduate School of Technology / IIT Bombay"
                  className="w-full bg-[#FAFAFC] border border-black/[0.1] focus:border-[#0062FF] focus:bg-white rounded-lg px-3.5 py-2 text-sm text-zinc-950 font-mono placeholder:text-zinc-400 outline-none transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-minimal-primary w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Enrolment Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
