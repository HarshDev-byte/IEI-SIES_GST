import React from 'react';
import { 
  ArrowRight, Sparkles, Building2
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function MembershipGrades({ onOpenMembership }) {
  return (
    <section id="membership" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-black/[0.08]" aria-label="Official IEI Membership Grades">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="badge-minimal badge-blue">
              04 // ACCREDITATION &amp; GRADES
            </span>
            <span className="badge-minimal badge-gold">
              ROYAL CHARTER BYE-LAWS
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 tracking-ultra-tight">
            Membership Grades
          </h2>
        </div>

        <div className="max-w-md">
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-normal">
            From first-year collegiate student engineers (SMIE) at SIES GST to chartered corporate practitioners (AMIE, MIE) and apex Fellows (FIE).
          </p>
          <div className="mt-2 flex items-center gap-2 font-mono text-[11px] text-zinc-400">
            <Building2 size={12} className="text-[#0062FF]" />
            <span>STATUTORY RECOGNITION UNDER 1935 CHARTER &amp; ARTICLE 372</span>
          </div>
        </div>
      </div>

      {/* COLLEGIATE ONBOARDING BANNER (STUDENT MEMBER — SMIE) */}
      <div className="bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/40 rounded-3xl p-6 sm:p-9 border border-[#0062FF]/20 shadow-[0_12px_40px_rgba(0,98,255,0.06)] relative overflow-hidden">
        
        {/* Subtle Background CAD Grid Accent */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0062FF 1px, transparent 1px),
              linear-gradient(to bottom, #0062FF 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0062FF] text-white font-mono text-xs font-bold shadow-xs">
              <Sparkles size={13} />
              <span>COLLEGIATE CHAPTER ONBOARDING // SIES GST #602</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight">
              How to Join as a Student Member (SMIE)
            </h3>

            <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
              Enrolled students in the Department of Electronics &amp; Computer Science or allied branches at SIES GST can enroll as official <strong>Student Members (SMIE)</strong>. Gain national credentials, chapter voting rights, workshop subsidies, and direct eligibility for SIRO Grant-in-Aid project funding.
            </p>

            {/* 3 Step Process Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-2xs">
                <span className="text-[10px] text-[#0062FF] font-bold block mb-0.5">STEP 01</span>
                <strong className="text-zinc-950 block font-sans text-xs mb-0.5">Enrolment Form</strong>
                <span className="text-zinc-500 text-[11px] block">Submit chapter application with your SIES GST college ID</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-2xs">
                <span className="text-[10px] text-[#0062FF] font-bold block mb-0.5">STEP 02</span>
                <strong className="text-zinc-950 block font-sans text-xs mb-0.5">Nominal Tariff</strong>
                <span className="text-zinc-500 text-[11px] block">One-time student rate covering your entire 4-year degree course</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-2xs">
                <span className="text-[10px] text-[#0062FF] font-bold block mb-0.5">STEP 03</span>
                <strong className="text-zinc-950 block font-sans text-xs mb-0.5">SMIE Pass &amp; Card</strong>
                <span className="text-zinc-500 text-[11px] block">Receive national registration card &amp; active chapter pass</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                audioEngine.playClick();
                if (onOpenMembership) {
                  onOpenMembership('Student Member (SMIE)');
                } else {
                  const contactEl = document.getElementById('contact');
                  if (contactEl) {
                    contactEl.scrollIntoView({ behavior: 'smooth' });
                  }
                  window.dispatchEvent(
                    new CustomEvent('iei-open-inquiry', {
                      detail: {
                        category: 'Student Membership (SMIE)',
                        query: 'I would like to apply for the Student Member (SMIE) membership at SIES GST. Please guide me through the registration and fee verification process.'
                      }
                    })
                  );
                }
              }}
              className="px-6 py-4 rounded-2xl bg-zinc-950 hover:bg-[#0062FF] text-white font-mono text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2 group"
            >
              <span>Apply for SMIE at SIES GST</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
            <span className="font-mono text-[10px] text-zinc-400">
              Validated by Kolkata Apex Secretariat
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}
