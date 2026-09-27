import React, { useState, useEffect } from 'react';
import { BatteryCharging, Zap, ShieldAlert, Cpu, ArrowRight, CheckCircle2, Thermometer, Gauge } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function EsciSpotlight({ onEnrollProgram }) {
  const [chargeLevel, setChargeLevel] = useState(78);
  const [cellTemp, setCellTemp] = useState(28.4);

  // Dynamic simulation of EV Battery BMS
  useEffect(() => {
    const interval = setInterval(() => {
      setChargeLevel(prev => (prev >= 98 ? 65 : prev + 1));
      setCellTemp(prev => +(28 + Math.sin(Date.now() / 1000) * 1.5).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="esci-spotlight" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-white/[0.06]">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <div className="badge-cad-blue mb-3">
            ENGINEERING STAFF COLLEGE OF INDIA (ESCI) · HYDERABAD CAMPUS
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-ultra-tight">
            Learn what the next generation of engineering demands.
          </h2>
        </div>

        <p className="text-white/60 text-sm sm:text-base max-w-md mt-4 md:mt-0 font-normal">
          An autonomous organ of IEI dedicated to apex Continuous Professional Development (CPD), 
          emerging green-tech certifications, and executive industrial upskilling.
        </p>
      </div>

      {/* FLAGSHIP DUAL PANEL: PROGRAM DETAILS + LIVE BMS TELEMETRY SIMULATION */}
      <div className="glass-panel p-6 sm:p-10 rounded-lg border border-[#00D6FF]/30 relative overflow-hidden">
        <div className="crosshair-corner crosshair-tl" />
        <div className="crosshair-corner crosshair-br" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Program Dossier */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="badge-cad-blue text-xs">
                SPECIALIZED PROFESSIONAL CERTIFICATION
              </span>
              <span className="badge-cad-gold text-xs">
                2ND BATCH REGISTRATION OPEN
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              EV Battery Sustainability & Thermal Management Engineer
            </h3>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6 font-normal">
              A comprehensive industry-accredited diploma developed in partnership with leading EV OEMs, 
              covering Lithium-Iron Phosphate & Solid-State electrochemistry, dynamic BMS firmware, 
              second-life repurposing, and closed-loop hydrometallurgical recycling.
            </p>

            {/* Curriculum Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="p-3 rounded bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00D6FF] flex-shrink-0 mt-0.5" />
                <span className="text-xs text-white/80">Battery Pack Safety & AIS-156 Compliance</span>
              </div>
              <div className="p-3 rounded bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00D6FF] flex-shrink-0 mt-0.5" />
                <span className="text-xs text-white/80">Active Liquid Cooling & Thermal Runaway Mitigation</span>
              </div>
              <div className="p-3 rounded bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00D6FF] flex-shrink-0 mt-0.5" />
                <span className="text-xs text-white/80">State of Health (SoH) Machine Learning Estimation</span>
              </div>
              <div className="p-3 rounded bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00D6FF] flex-shrink-0 mt-0.5" />
                <span className="text-xs text-white/80">Urban Battery Circularity & Material Reclaim</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  audioEngine.playClick();
                  onEnrollProgram('ev-battery');
                }}
                className="btn-engineering-primary text-xs sm:text-sm py-3 px-6 font-semibold flex items-center gap-2"
                data-cursor="ENROLL"
              >
                <span>Enroll in 2nd Batch</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="font-mono text-xs text-white/40">
                <span>COMMENCING: 15 OCT 2026 · HYBRID MODE</span>
              </div>
            </div>
          </div>

          {/* Right: Live Interactive Battery Cell & BMS Telemetry Widget */}
          <div className="lg:col-span-5 glass-panel-elevated p-6 rounded-lg border border-white/10 relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00D6FF] animate-ping" />
                <span className="text-white/80 font-bold">BMS TELEMETRY DEMO</span>
              </div>
              <span className="text-[#00D6FF]">SYS-ACTIVE</span>
            </div>

            {/* Simulated 4-Cell Module Graphic */}
            <div className="space-y-3 mb-6">
              {[1, 2, 3, 4].map((cell) => (
                <div key={cell} className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-white/40 w-12">CELL {cell}</span>
                  <div className="flex-1 h-3 bg-white/5 rounded-sm overflow-hidden p-0.5 border border-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-[#075BFF] via-[#00A8FF] to-[#00D6FF] rounded-sm transition-all duration-500"
                      style={{ width: `${chargeLevel - (cell * 1.2)}%` }}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-[#00D6FF] w-12 text-right">
                    {(chargeLevel - (cell * 1.2)).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>

            {/* Telemetry Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 font-mono text-xs">
              <div className="p-2.5 rounded bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-white/40 text-[10px]">
                  <Thermometer className="w-3 h-3 text-[#00D6FF]" />
                  <span>PACK TEMPERATURE</span>
                </div>
                <div className="text-white font-bold text-sm mt-1">{cellTemp}°C</div>
                <div className="text-[9px] text-[#00D6FF]">OPTIMAL LIQUID COOL</div>
              </div>

              <div className="p-2.5 rounded bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-white/40 text-[10px]">
                  <Gauge className="w-3 h-3 text-[#D6A85F]" />
                  <span>CELL VOLTAGE</span>
                </div>
                <div className="text-white font-bold text-sm mt-1">3.65 V</div>
                <div className="text-[9px] text-white/50">BALANCED MATRIX</div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] text-center font-mono text-[10px] text-white/40">
              ESCI ADVANCED BATTERY DIAGNOSTICS SUITE
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
