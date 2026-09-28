import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Copy, 
  Check, 
  BookOpen, 
  Calendar, 
  Mail, 
  ExternalLink,
  QrCode,
  Users
} from 'lucide-react';
import { getMemberById, membersData, getInitials } from '../data/membersData';
import { audioEngine } from '../utils/audioEngine';

export default function MemberProfilePage({ memberId }) {
  const [copiedId, setCopiedId] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');

  // Fallback to first member if ID not found
  const member = getMemberById(memberId) || membersData[0];
  const initials = getInitials(member.name);

  // Static QR Code — URL locked to production domain via VITE_SITE_URL env var.
  // To change domain: update VITE_SITE_URL in Vercel dashboard → redeploy. QRs auto-update.
  useEffect(() => {
    if (!member) return;

    // Read from build-time env var (set in Vercel → Settings → Environment Variables)
    // e.g. VITE_SITE_URL=https://ieisiesgst.org
    const PRODUCTION_BASE =
      import.meta.env.VITE_SITE_URL ||
      'https://iei-sies-gst.vercel.app';
    const profileUrl = `${PRODUCTION_BASE}/#/member/${member.id}`;

    QRCode.toDataURL(profileUrl, {
      width: 140,
      margin: 1,
      color: {
        dark: '#09090b',
        light: '#ffffff'
      }
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error('Error generating QR Code:', err));
  }, [member]);

  const handleCopyId = () => {
    if (!member) return;
    navigator.clipboard.writeText(member.prn || member.id);
    audioEngine.playSuccessChime();
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const navigateBack = () => {
    audioEngine.playClick();
    window.location.hash = '#/team';
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* ========================================================================= */}
      {/* 1. TOP BREADCRUMB & HEADER SECTION */}
      {/* ========================================================================= */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/[0.08]">
          <div>
            <div className="font-mono text-xs font-semibold text-[#0062FF] uppercase tracking-wider mb-1">
              MEMBER PROFILE • {member.council?.toUpperCase() || 'IEI SIES GST'}
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">
              {member.name}
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="text-left sm:text-right">
              <div className="text-zinc-800 text-sm sm:text-base font-semibold">
                {member.position} {member.branch ? `— ${member.branch}` : ''}
              </div>
              <div className="mt-1">
                <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 border border-black/[0.06] font-semibold uppercase tracking-wider">
                  {member.council}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={navigateBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 border border-black/[0.08] text-zinc-800 font-mono text-xs font-semibold transition-all cursor-pointer shadow-xs shrink-0 mt-2 sm:mt-0"
            >
              <ArrowLeft size={14} />
              <span>Back to Team</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. UPPER HERO PROFILE CARD */}
      {/* ========================================================================= */}
      <div className="bg-white border border-black/[0.08] rounded-3xl p-6 sm:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Portrait Container */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-[280px] aspect-[3/4] bg-zinc-50 border border-black/[0.08] rounded-2xl p-4 relative flex flex-col items-center justify-between overflow-hidden shadow-xs">
              
              {/* Corner Engineering Tick Accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-black/[0.15]" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-black/[0.15]" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-black/[0.15]" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-black/[0.15]" />

              {/* Portrait Silhouette / Neutral Avatar Placeholder */}
              <div className="flex-1 flex items-center justify-center w-full">
                <div className="relative flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-zinc-200/80 border border-black/[0.06] flex items-center justify-center font-display font-black text-3xl text-zinc-700 mb-2">
                    {initials}
                  </div>
                  <div className="w-40 h-16 rounded-t-full bg-zinc-200/50" />
                </div>
              </div>

              {/* Bottom Portrait Status Bar */}
              <div className="w-full pt-3 border-t border-black/[0.06] flex items-center justify-between font-mono text-[11px] z-10 bg-zinc-50/90">
                <span className="font-semibold text-zinc-600 tracking-tight">
                  {member.council}
                </span>
                <span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 text-[10px]">
                  <Check size={11} className="stroke-[3]" />
                  VERIFIED ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* Right: Info Details & Official Verification Callout */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-2">
              {member.branch ? `${member.branch} / ` : ''}SESSION 2026–2027
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight mb-2">
              {member.name}
            </h2>

            <div className="font-display text-lg sm:text-2xl font-semibold text-[#0062FF] mb-6">
              {member.position}
            </div>

            {/* Official Verification Callout Box */}
            <div className="border-l-4 border-emerald-500 bg-emerald-50/20 border border-black/[0.06] p-4 sm:p-5 rounded-2xl flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-zinc-950">
                  Official IEI Verified Member
                </div>
                <div className="font-mono text-xs text-zinc-600 mt-1 leading-relaxed">
                  Authenticated under SIES GST Student Chapter (ECS) • Academic Session 2026–2027
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. LOWER SECTION: PHYSICAL DIGITAL BADGE & MANDATE */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* LEFT COLUMN: Physical Digital Smart Credential Badge */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-black/[0.1] shadow-md overflow-hidden relative">
            
            {/* Top Blue Accent Notch */}
            <div className="h-2 bg-[#0062FF] w-full" />
            <div className="w-16 h-2 bg-zinc-200 rounded-b-md mx-auto mb-2" />

            <div className="p-6">
              {/* Badge Official Header */}
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-display font-black text-xs tracking-wider">
                    IEI
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-bold text-zinc-900 tracking-wider">
                      THE INSTITUTION OF ENGINEERS (INDIA)
                    </div>
                    <div className="font-mono text-[9px] text-zinc-500 tracking-tight">
                      SIES GST STUDENT CHAPTER • 2026-27
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  VERIFIED
                </span>
              </div>

              {/* Member Core Identification */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-zinc-100 border border-black/[0.08] flex items-center justify-center font-display font-bold text-xl text-zinc-900 shrink-0">
                  {initials}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-zinc-950 leading-tight">
                    {member.name}
                  </h3>
                  <div className="font-mono text-xs font-semibold text-[#0062FF] mt-0.5">
                    {member.position}
                  </div>
                  {member.branch && (
                    <div className="font-mono text-[11px] text-zinc-500 mt-1">
                      Branch: {member.branch}
                    </div>
                  )}
                  <div className="font-mono text-[10px] text-zinc-400">
                    {member.council}
                  </div>
                </div>
              </div>

              {/* Member PRN / Record ID Bar with Copy Feature */}
              {member.prn && (
                <div className="bg-zinc-50 rounded-xl p-3 border border-black/[0.06] flex items-center justify-between mb-5 font-mono text-xs">
                  <span className="text-zinc-500 text-[11px]">STUDENT PRN</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-950 tracking-wider">{member.prn}</span>
                    <button
                      type="button"
                      onClick={handleCopyId}
                      title="Copy Student PRN"
                      className="p-1 rounded hover:bg-zinc-200 text-zinc-600 transition-colors cursor-pointer"
                    >
                      {copiedId ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Real SVG Scannable QR Code Box */}
              <div className="bg-zinc-50/60 rounded-xl p-4 border border-black/[0.08] flex items-center gap-4 mb-4">
                <div className="bg-white p-1.5 rounded-lg border border-black/[0.1] shadow-xs shrink-0">
                  {qrCodeDataUrl ? (
                    <img 
                      src={qrCodeDataUrl} 
                      alt={`Scannable Profile QR Code for ${member.name}`}
                      className="w-24 h-24 object-contain rounded"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-zinc-100 flex items-center justify-center text-zinc-400">
                      <QrCode size={28} />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="font-mono text-[11px] font-bold text-zinc-950 tracking-wider mb-1">
                    DIGITAL CREDENTIAL QR
                  </div>
                  <p className="font-mono text-[10px] text-zinc-500 leading-relaxed">
                    Resolves to stable member endpoint at{' '}
                    <span className="text-[#0062FF] font-semibold underline">
                      /member/{member.id}
                    </span>
                    . Validated against official SIES GST chapter records.
                  </p>
                </div>
              </div>

              {/* Card Footer: Institutional Signature & Issuer */}
              <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between font-mono text-[9px] text-zinc-500">
                <span>SESSION: 2026–2027</span>
                <span className="font-semibold text-zinc-700">
                  IEI SIES GST Council
                </span>
              </div>
            </div>
          </div>

          <p className="text-center font-mono text-[11px] text-zinc-500 mt-3 px-4 leading-relaxed">
            Cryptographic identity credential linked to official chapter roster. Validated through the IEI SIES GST verification protocol.
          </p>
        </div>

        {/* RIGHT COLUMN: Institutional Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-black/[0.08] p-6 sm:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)] relative">
            
            {/* Corner Engineering Tick Accents */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-black/20" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-black/20" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-black/20" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-black/20" />

            {/* Role & Council Mandate */}
            <div className="mb-6">
              <div className="font-mono text-xs font-semibold text-zinc-500 tracking-wider uppercase mb-2">
                OFFICIAL APPOINTMENT
              </div>
              <p className="font-normal text-sm sm:text-base text-zinc-700 leading-relaxed">
                Appointed as <span className="font-semibold text-zinc-950">{member.position}</span> serving within the <span className="font-semibold text-zinc-950">{member.council}</span> of the Institution of Engineers (India) SIES GST Student Chapter for the academic term 2026–2027.
              </p>
            </div>

            {/* Department & Academic Session Dual Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-zinc-50 border border-black/[0.06] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0062FF] flex items-center justify-center shrink-0">
                  <BookOpen size={16} />
                </div>
                <div>
                  <div className="font-mono text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                    {member.branch ? 'DEPARTMENT / BRANCH' : 'STATUS'}
                  </div>
                  <div className="font-display font-bold text-sm text-zinc-950 mt-0.5">
                    {member.branch || 'Institutional Advisory'}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-black/[0.06] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0062FF] flex items-center justify-center shrink-0">
                  <Calendar size={16} />
                </div>
                <div>
                  <div className="font-mono text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                    ACADEMIC SESSION
                  </div>
                  <div className="font-display font-bold text-sm text-zinc-950 mt-0.5">
                    2026–2027 (Active Term)
                  </div>
                </div>
              </div>
            </div>

            {/* Chapter Standing */}
            <div className="mb-6">
              <div className="font-mono text-xs font-semibold text-zinc-500 tracking-wider uppercase mb-2.5">
                COUNCIL STANDING
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3.5 py-1.5 rounded-lg bg-zinc-100 border border-black/[0.06] font-mono text-xs text-zinc-800 font-medium">
                  {member.council}
                </span>
                {member.domain && (
                  <span className="px-3.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200/60 font-mono text-xs text-[#0062FF] font-medium">
                    {member.domain} Wing
                  </span>
                )}
                {member.branch && (
                  <span className="px-3.5 py-1.5 rounded-lg bg-zinc-100 border border-black/[0.06] font-mono text-xs text-zinc-700 font-medium">
                    {member.branch}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Metadata Bar */}
            <div className="pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-zinc-500">
              <div>
                <span className="text-zinc-400">ORGANIZATION: </span>
                <span className="font-semibold text-zinc-800">IEI SIES GST</span>
              </div>
              <div>
                <span className="text-zinc-400">ISSUER: </span>
                <span className="font-semibold text-zinc-800">Faculty Advisory Board</span>
              </div>
              <div>
                <span className="text-zinc-400">STATUS: </span>
                <span className="text-emerald-600 font-semibold">VERIFIED</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. CHAPTER DOMAIN ROSTER SWITCHER */}
      {/* ========================================================================= */}
      <div className="border-t border-black/[0.08] pt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="font-mono text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              CHAPTER ROSTER
            </div>
            <h3 className="font-display text-2xl font-bold text-zinc-950">
              Browse Chapter Leadership Profiles
            </h3>
          </div>
          <button
            type="button"
            onClick={navigateBack}
            className="text-xs font-mono font-semibold text-[#0062FF] hover:underline"
          >
            Back to Team Grid ↗
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {membersData.slice(0, 16).map((m) => {
            const isCurrent = m.id === member.id;
            const itemInitials = getInitials(m.name);

            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  audioEngine.playClick();
                  window.location.hash = `#/member/${m.id}`;
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent 
                    ? 'bg-zinc-950 text-white border-zinc-950 shadow-md ring-2 ring-[#0062FF]' 
                    : 'bg-white hover:bg-zinc-50 border-black/[0.08] hover:border-black/20 text-zinc-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-display font-bold text-xs ${
                      isCurrent ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-800'
                    }`}>
                      {itemInitials}
                    </span>
                    {m.branch && (
                      <span className={`font-mono text-[9px] px-2 py-0.5 rounded font-semibold ${
                        isCurrent ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-600'
                      }`}>
                        {m.branch}
                      </span>
                    )}
                  </div>
                  <div className="font-display font-bold text-sm leading-snug">
                    {m.name}
                  </div>
                  <div className={`font-mono text-xs mt-0.5 ${isCurrent ? 'text-blue-400 font-semibold' : 'text-[#0062FF]'}`}>
                    {m.position}
                  </div>
                </div>

                <div className={`pt-3 mt-3 border-t font-mono text-[10px] flex items-center justify-between ${
                  isCurrent ? 'border-zinc-800 text-zinc-400' : 'border-black/[0.06] text-zinc-500'
                }`}>
                  <span>{m.council}</span>
                  <span className="font-semibold">View Profile →</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
