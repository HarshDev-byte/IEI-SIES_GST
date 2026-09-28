import React, { useState } from 'react';
import { ShieldCheck, X, Search, CheckCircle2, Award, FileText, Download, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioEngine';

export default function VerifyModal({ isOpen, onClose }) {
  const [certId, setCertId] = useState('CENG-2024-8841');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleVerify = (e) => {
    e.preventDefault();
    audioEngine.playClick();
    setIsVerifying(true);
    setResult(null);

    setTimeout(() => {
      setIsVerifying(false);
      audioEngine.playSuccessChime();

      setResult({
        certNo: certId.toUpperCase() || 'CENG-2024-8841',
        engineerName: 'Er. Rajeshwar Sundaram Rao',
        grade: 'Fellow (FIE) & Chartered Engineer (CEng)',
        division: 'Mechanical & Production Engineering Division',
        dateOfInscription: '14 August 2018',
        validTill: 'Life Inscription (Permanent Standing)',
        accreditation: 'Royal Charter Statutory Bye-Laws Section 11',
        accord: 'International Engineering Alliance (Washington & Sydney Accords)',
        stateCentre: 'Maharashtra State Centre, Mumbai',
        status: 'ACTIVE & STATUTORILY VALIDATED'
      });

      // Fire festive precision confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#00D6FF', '#075BFF', '#D6A85F', '#B8C1CC']
        });
      } catch {
        // ignore
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl rounded-2xl border border-black/10 bg-white p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto text-zinc-950"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
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

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0062FF]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-zinc-950">
              National Credential Verification Engine
            </h3>
            <div className="font-mono text-xs text-[#0062FF] font-semibold">
              OFFICIAL STATUTORY REGISTRY · CENG &amp; PE (INDIA)
            </div>
          </div>
        </div>

        {/* Search / Verification Form */}
        <form onSubmit={handleVerify} className="mb-6">
          <label className="block font-mono text-xs text-zinc-500 uppercase mb-2 font-semibold">
            Enter Certificate / Registration Number or PE License Code
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              required
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              placeholder="e.g., CENG-2024-8841 or PE-IND-10492"
              className="flex-1 bg-[#FAFAFC] border border-black/[0.1] focus:border-[#0062FF] focus:bg-white rounded-lg px-4 py-2.5 text-sm text-zinc-950 font-mono placeholder:text-zinc-400 outline-none uppercase tracking-wider transition-all"
            />
            <button
              type="submit"
              disabled={isVerifying}
              className="btn-minimal-primary px-6 font-semibold flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>{isVerifying ? 'Searching Registry...' : 'Verify Now'}</span>
            </button>
          </div>
          <div className="flex items-center gap-3 mt-2.5 font-mono text-[11px] text-zinc-500">
            <span>SAMPLE IDS:</span>
            <button 
              type="button" 
              onClick={() => setCertId('CENG-2024-8841')}
              className="text-[#0062FF] hover:underline cursor-pointer"
            >
              CENG-2024-8841
            </button>
            <button 
              type="button" 
              onClick={() => setCertId('PE-IND-9942')}
              className="text-[#0062FF] hover:underline cursor-pointer"
            >
              PE-IND-9942
            </button>
          </div>
        </form>

        {/* Verification Result Dossier */}
        {result && (
          <div className="border border-black/[0.08] rounded-2xl bg-[#FAFAFC] p-6 relative animate-fadeIn">
            {/* Status Stamp */}
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-4 mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-xs text-emerald-700 font-semibold">
                  {result.status}
                </span>
              </div>
              <span className="text-xs text-zinc-500 font-medium">
                Royal Charter Sealed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-zinc-500 block mb-0.5">Registered Engineer Name</span>
                <span className="text-zinc-950 font-display font-bold text-base block">{result.engineerName}</span>
              </div>

              <div>
                <span className="text-zinc-500 block mb-0.5">Statutory Inscription Grade</span>
                <span className="text-zinc-900 font-semibold block">{result.grade}</span>
              </div>

              <div>
                <span className="text-zinc-500 block mb-0.5">Discipline Division</span>
                <span className="text-zinc-700 block">{result.division}</span>
              </div>

              <div>
                <span className="text-zinc-500 block mb-0.5">Jurisdiction Centre</span>
                <span className="text-zinc-700 block">{result.stateCentre}</span>
              </div>

              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Date of Inscription</span>
                <span className="text-zinc-700 mt-0.5 block">{result.dateOfInscription}</span>
              </div>

              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Validity &amp; Standing</span>
                <span className="text-[#C28B38] font-semibold mt-0.5 block">{result.validTill}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
              <span>{result.accord}</span>
              <button 
                type="button" 
                onClick={() => {
                  audioEngine.playClick();
                  alert('Digital Verification Dossier (PDF) Generated.');
                }}
                className="text-[#0062FF] hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Verification PDF</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
