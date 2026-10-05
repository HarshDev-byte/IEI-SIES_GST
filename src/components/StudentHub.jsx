import React, { useState } from 'react';
import { Trophy, CheckCircle2, QrCode, ArrowRight, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function StudentHub({ onApplyStudentMembership }) {
  const [studentName, setStudentName] = useState('Arjun M. Sharma');
  const [studentCollege, setStudentCollege] = useState('SIES GST, Navi Mumbai');
  const [studentBranch, setStudentBranch] = useState('Electronics & Computer Science (ECS)');
  const [activeTab, setActiveTab] = useState('projects');

  const hackathons = [
    {
      title: 'Collegiate Systems Hackathon 2026',
      tag: 'CHAPTER FLAGSHIP',
      prize: '₹2,50,000 Pool',
      deadline: '18 JAN 2026',
      teams: '36-Hour Continuous Sprint',
      theme: 'Real-World Hardware & Software Interfacing'
    },
    {
      title: 'SIES GST Innovation Conclave & Robotics',
      tag: 'DEPARTMENTAL SPRINT',
      prize: '₹1,50,000 Pool',
      deadline: '15 FEB 2026',
      teams: 'Combat & Autonomous Bots',
      theme: 'Microcontroller Telemetry & Embedded Vision'
    }
  ];

  const studentProjects = [
    {
      title: 'Project Vayu: Swarm Drone Atmospheric Mapper',
      team: 'SIES GST Aero Club',
      desc: 'Autonomous hexacopter mesh telemetry for real-time PM2.5 air-quality 3D contour mapping.',
      grant: 'IEI Chapter Seed Support',
      status: 'PROTOTYPE TESTED'
    },
    {
      title: 'Distributed Neural Inference on ARM Cortex',
      team: 'ECS AI Working Group',
      desc: 'INT8 quantized transformer pipeline executing on low-power microcontrollers.',
      grant: 'Departmental Lab Funded',
      status: 'BENCHMARK VERIFIED'
    }
  ];

  return (
    <section id="student-hub" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-zinc-950 tracking-ultra-tight">
            Student Innovation Lab
          </h2>
        </div>

        <p className="text-zinc-600 text-sm sm:text-base max-w-md leading-relaxed font-normal">
          Personalized digital membership credentials, student hardware project incubator, and collegiate hackathons.
        </p>
      </div>

      {/* DUAL WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Live Student Pass Generator */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-7 sm:p-8 border border-black/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-3 mb-6 text-xs text-zinc-500 font-medium">
            <span>Student Pass Preview</span>
            <span>Interactive</span>
          </div>

          {/* Form Inputs */}
          <div className="space-y-3 mb-6 text-xs">
            <div>
              <label className="text-zinc-600 text-xs font-medium block mb-1">
                Student Name:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-[#FAFAFC] border border-black/[0.1] rounded-lg px-3 py-2 text-zinc-950 font-sans focus:outline-none focus:border-[#0062FF] focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-zinc-600 text-xs font-medium block mb-1">
                  College / Campus:
                </label>
                <input
                  type="text"
                  value={studentCollege}
                  onChange={(e) => setStudentCollege(e.target.value)}
                  className="w-full bg-[#FAFAFC] border border-black/[0.1] rounded-lg px-3 py-2 text-zinc-950 font-sans focus:outline-none focus:border-[#0062FF] focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="text-zinc-600 text-xs font-medium block mb-1">
                  Engineering Branch:
                </label>
                <input
                  type="text"
                  value={studentBranch}
                  onChange={(e) => setStudentBranch(e.target.value)}
                  className="w-full bg-[#FAFAFC] border border-black/[0.1] rounded-lg px-3 py-2 text-zinc-950 font-sans focus:outline-none focus:border-[#0062FF] focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* 3D Holographic Interactive Student Pass Card */}
          <div 
            className="p-7 rounded-3xl bg-gradient-to-br from-white via-zinc-50 to-zinc-100 border-2 border-black/15 relative shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden group transition-all duration-300 hover:shadow-[0_30px_70px_rgba(0,98,255,0.18)] cursor-pointer"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotX = ((y - centerY) / centerY) * -12;
              const rotY = ((x - centerX) / centerX) * 12;
              e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
              
              const sheen = e.currentTarget.querySelector('.hologram-glare');
              if (sheen) {
                sheen.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.85) 0%, rgba(0,98,255,0.2) 30%, rgba(194,139,56,0.25) 50%, transparent 80%)`;
                sheen.style.opacity = '1';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
              const sheen = e.currentTarget.querySelector('.hologram-glare');
              if (sheen) sheen.style.opacity = '0';
            }}
            style={{ transition: 'transform 0.15s ease-out, box-shadow 0.3s ease' }}
          >
            {/* Dynamic Interactive Hologram Glare Layer */}
            <div 
              className="hologram-glare absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-200 z-20 mix-blend-color-dodge" 
            />

            {/* Subtle Vector Guilloche Security Pattern */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.035]"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, #000 1.5px, transparent 1.5px)`,
                backgroundSize: '16px 16px'
              }}
            />

            {/* Top Pass Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-black/[0.08] pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-black/10 bg-white p-1 shadow-sm flex items-center justify-center">
                  <img src="/iei-official-logo.png" alt="IEI" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="font-display font-black text-xs sm:text-sm text-zinc-950 tracking-tight">
                    THE INSTITUTION OF ENGINEERS (INDIA)
                  </div>
                  <div className="text-[10px] text-zinc-500 font-medium">
                    SIES GST Student Chapter · Royal Charter 1935
                  </div>
                </div>
              </div>

              <div className="text-xs text-zinc-500 font-medium">
                Session 2026–2027
              </div>
            </div>

            {/* Pass Body Content */}
            <div className="relative z-10 space-y-3 mb-5 text-xs">
              <div>
                <span className="text-zinc-500 text-xs block font-medium mb-0.5">
                  Student Member
                </span>
                <span className="font-display font-black text-lg sm:text-xl text-zinc-950 tracking-tight">
                  {studentName || 'Student Member'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-black/[0.05]">
                <div>
                  <span className="text-zinc-500 text-xs block font-medium mb-0.5">
                    Institution
                  </span>
                  <span className="text-zinc-800 font-semibold">{studentCollege}</span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-500 text-xs block font-medium mb-0.5">
                    Discipline
                  </span>
                  <span className="text-zinc-900 font-semibold">{studentBranch}</span>
                </div>
              </div>
            </div>

            {/* Bottom Pass Verification Strip */}
            <div className="relative z-10 pt-3 border-t border-black/[0.08] flex items-center justify-between text-xs text-zinc-500 font-medium">
              <div className="flex items-center gap-2">
                <QrCode size={16} className="text-zinc-800" />
                <span className="font-semibold text-zinc-800">IEI-GST-2026-PASS</span>
              </div>
              <div className="text-zinc-500">
                Verified Credential
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-medium">Official Collegiate Pass</span>
            <button
              onClick={() => {
                audioEngine.playChime();
                if (onApplyStudentMembership) onApplyStudentMembership({ name: studentName, college: studentCollege });
              }}
              className="btn-minimal-primary text-xs"
            >
              <span>Download Digital Pass</span>
              <ArrowRight size={13} />
            </button>
          </div>

        </div>

        {/* Right: Hackathons & Project Showcase */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex gap-2 p-1.5 bg-zinc-100/80 border border-black/[0.06] rounded-xl w-fit mb-2">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                activeTab === 'projects' ? 'bg-zinc-950 text-white font-semibold shadow-sm' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Student Projects
            </button>
            <button
              onClick={() => setActiveTab('hackathons')}
              className={`px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                activeTab === 'hackathons' ? 'bg-zinc-950 text-white font-semibold shadow-sm' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Hackathons
            </button>
          </div>

          {activeTab === 'projects' && (
            <div className="space-y-3">
              {studentProjects.map((p, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-5 hover:border-black/20 hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)] transition-all">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-zinc-700 font-semibold">{p.team}</span>
                    <span className="text-emerald-700 font-medium text-xs">{p.status}</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-zinc-950 mb-1.5">{p.title}</h3>
                  <p className="text-zinc-600 text-xs leading-relaxed mb-3">{p.desc}</p>
                  <div className="text-xs text-zinc-500 pt-2 border-t border-black/[0.06]">
                    {p.grant}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'hackathons' && (
            <div className="space-y-3">
              {hackathons.map((h, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-5 hover:border-black/20 hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)] transition-all">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-zinc-700 font-semibold">{h.tag}</span>
                    <span className="text-zinc-500 text-xs">Deadline: {h.deadline}</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-zinc-950 mb-1">{h.title}</h3>
                  <p className="text-zinc-600 text-xs leading-relaxed mb-3">{h.theme}</p>
                  <div className="flex justify-between text-xs text-zinc-700 pt-2 border-t border-black/[0.06]">
                    <span>Prize: <strong className="text-zinc-950">{h.prize}</strong></span>
                    <span className="text-zinc-600 font-medium">{h.teams}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </section>
  );
}
