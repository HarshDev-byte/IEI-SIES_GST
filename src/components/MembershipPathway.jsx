import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Building2, 
  Check, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function MembershipPathway({ onApplyMembership }) {
  const [activeTier, setActiveTier] = useState(2); // default to Member (MIE)

  const pathways = [
    {
      id: 'student',
      title: 'Student Member',
      designation: 'SMIE',
      tag: 'COLLEGIATE',
      eligibility: 'Enrolled in an AICTE/UGC approved B.E./B.Tech/Polytechnic diploma engineering program.',
      experience: 'Current Engineering Student',
      fee: '₹1,500 (Full Course Duration)',
      benefits: [
        'Access to IEI Student Chapters & Inter-college technical symposia',
        'Eligibility for national scholarships & R&D innovation grants',
        'Discounted access to Springer digital technical journals',
        'Mentorship from senior Corporate Fellows and industry leaders'
      ]
    },
    {
      id: 'associate',
      title: 'Associate Member',
      designation: 'AMIE',
      tag: 'EARLY CAREER',
      eligibility: 'Recognized engineering degree / Section A & B examination of IEI.',
      experience: '0–3 Years Post-Graduation',
      fee: '₹6,490 (Life Membership)',
      benefits: [
        'Formal recognition as qualified professional engineer in India',
        'Statutory eligibility for state/central engineering appointments',
        'Access to state centre facilities, libraries, and seminars',
        'Subsidized participation in Indian Engineering Congress'
      ]
    },
    {
      id: 'member',
      title: 'Member',
      designation: 'MIE',
      tag: 'MID CAREER & PRACTICE',
      eligibility: 'Recognized engineering degree with proven professional engineering experience.',
      experience: 'Minimum 4 Years Active Engineering Practice',
      fee: '₹9,440 (Life Membership)',
      benefits: [
        'Eligibility to apply for Chartered Engineer (CEng) certification',
        'Voting rights in National Council and Divisional Boards',
        'Authorized project appraisal and technical valuation rights',
        'Direct peer review participation in IEI-Springer journals'
      ]
    },
    {
      id: 'fellow',
      title: 'Fellow',
      designation: 'FIE',
      tag: 'APEX SENIOR LEADERSHIP',
      eligibility: 'Substantial contributions to engineering, leadership position, or exceptional innovations.',
      experience: 'Minimum 10–15 Years Significant Practice',
      fee: '₹15,340 (Life Membership)',
      benefits: [
        'The highest statutory honor bestowed by The Institution of Engineers',
        'Eligibility to serve on apex government advisory boards and senate panels',
        'Privilege to sponsor candidates for CEng, PE, and IntPE credentials',
        'Permanent inscribed recognition in the National IEI Archive'
      ]
    },
    {
      id: 'institutional',
      title: 'Institutional Member',
      designation: 'IM',
      tag: 'CORPORATIONS & ACADEMIA',
      eligibility: 'Universities, engineering colleges, PSUs, research organizations, and industrial giants.',
      experience: 'Registered Corporate / Academic Entity',
      fee: 'Custom Institutional Tariff',
      benefits: [
        'Establishment of an accredited on-campus IEI Centre of Excellence',
        'Corporate employee group certification pathways for CEng/PE',
        'Priority technical consulting from IEI expert committees',
        'National Industry Excellence Award nomination privileges'
      ]
    }
  ];

  const current = pathways[activeTier];

  return (
    <section id="membership-pathways" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-white/[0.06]">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <div className="badge-cad-blue mb-3">
            MEMBERSHIP ACCREDITATION LADDER
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-ultra-tight">
            Your engineering journey deserves a community.
          </h2>
        </div>

        <p className="text-white/60 text-sm sm:text-base max-w-md mt-4 md:mt-0 font-normal">
          From first-year student innovators to apex Fellows leading national mega-projects — 
          find your place in India's century-long engineering legacy.
        </p>
      </div>

      {/* HORIZONTAL STEPPER SELECTOR */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {pathways.map((tier, idx) => {
          const isSelected = activeTier === idx;
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => {
                audioEngine.playClick();
                setActiveTier(idx);
              }}
              className={`p-4 rounded border text-left transition-all relative ${
                isSelected 
                  ? 'bg-[#00D6FF]/10 border-[#00D6FF] shadow-lg shadow-cyan-950/40' 
                  : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
              }`}
              data-cursor="TIER"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-white/40">0{idx + 1}</span>
                <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-[#00D6FF]/20 text-[#00D6FF]' : 'bg-white/5 text-white/40'
                }`}>
                  {tier.designation}
                </span>
              </div>
              <div className="font-display font-bold text-sm sm:text-base text-white tracking-tight">
                {tier.title}
              </div>
              <div className="text-[11px] font-mono text-white/50 mt-1">
                {tier.tag}
              </div>
            </button>
          );
        })}
      </div>

      {/* ACTIVE TIER DETAILED DOSSIER CARD */}
      <div className="glass-panel p-6 sm:p-10 rounded-lg border border-white/15 relative overflow-hidden">
        <div className="crosshair-corner crosshair-tl" />
        <div className="crosshair-corner crosshair-br" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Grade Specs */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="badge-cad-gold text-xs">
                OFFICIAL GRADE: {current.designation}
              </span>
              <span className="font-mono text-xs text-white/40">TIER 0{activeTier + 1}</span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
              {current.title}
            </h3>

            <div className="space-y-3 my-6 font-mono text-xs">
              <div className="flex items-start gap-2">
                <span className="text-white/40 w-24 flex-shrink-0">ELIGIBILITY:</span>
                <span className="text-white/80">{current.eligibility}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-white/40 w-24 flex-shrink-0">EXPERIENCE:</span>
                <span className="text-[#00D6FF]">{current.experience}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-white/40 w-24 flex-shrink-0">TARIFF:</span>
                <span className="text-[#D6A85F] font-bold">{current.fee}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                audioEngine.playClick();
                onApplyMembership(current);
              }}
              className="btn-engineering-primary w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2"
              data-cursor="APPLY"
            >
              <span>Apply for {current.designation} Membership</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Key Privileges Checklist */}
          <div className="lg:col-span-7">
            <h4 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#00D6FF]" />
              <span>Statutory Privileges & Professional Rights</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {current.benefits.map((b, i) => (
                <div 
                  key={i} 
                  className="p-3.5 rounded bg-white/[0.02] border border-white/[0.06] flex items-start gap-3"
                >
                  <div className="w-4 h-4 rounded-full bg-[#00D6FF]/10 text-[#00D6FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-white/75 leading-relaxed">
                    {b}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-white/40">
              <span>ROYAL CHARTER BYE-LAWS COMPLIANT</span>
              <span className="text-[#00D6FF]">ONLINE ENROLMENT PORTAL 2026</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
