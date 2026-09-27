import React, { useState } from 'react';
import { LogIn, X, Shield, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function LoginModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('corporate');
  const [memberId, setMemberId] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    audioEngine.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      audioEngine.playSuccessChime();
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 sm:p-8 relative shadow-2xl text-zinc-950"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
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

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <img src="/iei-official-logo.png" alt="IEI" className="w-10 h-10 object-contain p-0.5 rounded-full bg-zinc-50 border border-black/10" />
          <div>
            <h3 className="font-display font-bold text-lg text-zinc-950">
              Member Portal Authentication
            </h3>
            <div className="font-mono text-[10px] text-[#0062FF] font-semibold">
              SECURE TLS 1.3 · ISO-27001
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-zinc-100 rounded-xl border border-black/[0.06] mb-6 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTab('corporate')}
            className={`py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'corporate' ? 'bg-zinc-950 text-white font-semibold shadow-xs' : 'text-zinc-600 hover:text-black'
            }`}
          >
            CORPORATE
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('non-corporate')}
            className={`py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'non-corporate' ? 'bg-zinc-950 text-white font-semibold shadow-xs' : 'text-zinc-600 hover:text-black'
            }`}
          >
            ASSOCIATE
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('student')}
            className={`py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'student' ? 'bg-zinc-950 text-white font-semibold shadow-xs' : 'text-zinc-600 hover:text-black'
            }`}
          >
            STUDENT
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center animate-fadeIn">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3 animate-bounce" />
            <div className="font-display font-bold text-lg text-zinc-950">
              Authentication Verified
            </div>
            <div className="font-mono text-xs text-zinc-500 mt-1">
              Redirecting to Chapter Dashboard...
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-[11px] text-zinc-500 uppercase mb-1 font-semibold">
                {activeTab === 'corporate' ? 'Membership No. (e.g., F-123456 / M-987654)' : 'Roll / Enrolment ID'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  placeholder={activeTab === 'corporate' ? 'M-102948/CV' : 'AM-504938'}
                  className="w-full bg-[#FAFAFC] border border-black/[0.1] focus:border-[#0062FF] focus:bg-white rounded-lg px-3.5 py-2 text-sm text-zinc-950 font-mono placeholder:text-zinc-400 outline-none transition-colors"
                />
                <User className="w-4 h-4 text-zinc-400 absolute right-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] text-zinc-500 uppercase mb-1 font-semibold">
                Password / Secure PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#FAFAFC] border border-black/[0.1] focus:border-[#0062FF] focus:bg-white rounded-lg px-3.5 py-2 text-sm text-zinc-950 font-mono placeholder:text-zinc-400 outline-none transition-colors"
                />
                <Lock className="w-4 h-4 text-zinc-400 absolute right-3 top-2.5" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
              <a href="#" className="hover:text-[#0062FF] transition-colors">Forgot Membership No?</a>
              <a href="#" className="hover:text-[#0062FF] transition-colors">Generate OTP</a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-minimal-primary w-full py-2.5 text-sm font-semibold flex items-center justify-center gap-2 mt-4"
            >
              {isSubmitting ? (
                <span className="font-mono text-xs">AUTHENTICATING TELEMETRY...</span>
              ) : (
                <>
                  <span>Access Member Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-black/[0.06] text-center font-mono text-[10px] text-zinc-400">
          CENTRAL HQ KOLKATA · STATUTORY CHARTER 1935
        </div>

      </div>
    </div>
  );
}
