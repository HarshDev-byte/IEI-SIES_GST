import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, Volume2, VolumeX, Sliders, Zap, 
  RotateCcw, Sparkles, Radio, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function InteractiveOscilloscope() {
  const canvasRef = useRef(null);
  const [waveType, setWaveType] = useState('sine'); // 'sine' | 'square' | 'triangle' | 'sawtooth' | 'pwm'
  const [frequency, setFrequency] = useState(440); // Hz (A4)
  const [amplitude, setAmplitude] = useState(3.3); // Volts (Standard 3.3V Logic)
  const [phase, setPhase] = useState(0); // Degrees
  const [dutyCycle, setDutyCycle] = useState(50); // % for PWM
  const [isAudioLive, setIsAudioLive] = useState(false);
  const [timebase, setTimebase] = useState(1);

  const audioCtxRef = useRef(null);
  const oscNodeRef = useRef(null);
  const gainNodeRef = useRef(null);
  const animFrameRef = useRef(null);

  // Synchronize Live Web Audio Synthesizer
  useEffect(() => {
    if (isAudioLive) {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current && AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        if (!oscNodeRef.current) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = waveType === 'pwm' ? 'square' : waveType;
          osc.frequency.setValueAtTime(frequency, ctx.currentTime);

          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.1);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();

          oscNodeRef.current = osc;
          gainNodeRef.current = gain;
        } else {
          oscNodeRef.current.type = waveType === 'pwm' ? 'square' : waveType;
          oscNodeRef.current.frequency.setTargetAtTime(frequency, ctx.currentTime, 0.03);
        }
      } catch (err) {
        console.warn('Web Audio synth error:', err);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        try {
          gainNodeRef.current.gain.setTargetAtTime(0.0001, audioCtxRef.current.currentTime, 0.05);
          setTimeout(() => {
            if (oscNodeRef.current) {
              oscNodeRef.current.stop();
              oscNodeRef.current.disconnect();
              oscNodeRef.current = null;
            }
          }, 100);
        } catch {}
      }
    }

    return () => {
      if (oscNodeRef.current) {
        try {
          oscNodeRef.current.stop();
          oscNodeRef.current.disconnect();
          oscNodeRef.current = null;
        } catch {}
      }
    };
  }, [isAudioLive, waveType, frequency]);

  // Update dynamic frequency on active audio node
  useEffect(() => {
    if (isAudioLive && oscNodeRef.current && audioCtxRef.current) {
      oscNodeRef.current.frequency.setTargetAtTime(frequency, audioCtxRef.current.currentTime, 0.02);
    }
  }, [frequency, isAudioLive]);

  // Real-time Canvas Rendering of the Oscilloscope Screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let t = 0;

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      t += 0.05 * timebase;

      const w = canvas.width;
      const h = canvas.height;
      const midY = h / 2;

      // Dark Engineering CRT Screen Background
      ctx.fillStyle = '#090D16';
      ctx.fillRect(0, 0, w, h);

      // CRT Phosphor Grid Lines
      ctx.strokeStyle = 'rgba(0, 98, 255, 0.12)';
      ctx.lineWidth = 1;

      const gridSpacing = 32;
      for (let x = 0; x <= w; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Center Coordinate Axis Crosshairs with tick marks
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);

      // X-Axis
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(w, midY);
      ctx.stroke();

      // Y-Axis
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.stroke();

      ctx.setLineDash([]); // Reset line dash

      // Glow Bloom Effect for Waveform
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 12;
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.beginPath();

      const scaleY = (amplitude / 5.0) * (h * 0.38);
      const radPhase = (phase * Math.PI) / 180;
      const cyclesAcrossScreen = (frequency / 120) * (1 / timebase);

      for (let px = 0; px < w; px++) {
        const normX = px / w;
        const angle = normX * Math.PI * 2 * cyclesAcrossScreen + t + radPhase;
        let sample = 0;

        if (waveType === 'sine') {
          sample = Math.sin(angle);
        } else if (waveType === 'square') {
          sample = Math.sin(angle) >= 0 ? 1 : -1;
        } else if (waveType === 'triangle') {
          sample = (2 / Math.PI) * Math.asin(Math.sin(angle));
        } else if (waveType === 'sawtooth') {
          sample = 2 * ((angle / (2 * Math.PI)) - Math.floor(0.5 + (angle / (2 * Math.PI))));
        } else if (waveType === 'pwm') {
          const mod = (angle % (2 * Math.PI) + (2 * Math.PI)) % (2 * Math.PI);
          sample = mod < (dutyCycle / 100) * 2 * Math.PI ? 1 : -1;
        }

        const py = midY - sample * scaleY;
        if (px === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }

      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow

      // Phosphor Sweep Line Scanner Beam
      const scanX = ((t * 40) % w);
      const scanGrad = ctx.createLinearGradient(scanX - 30, 0, scanX, 0);
      scanGrad.addColorStop(0, 'rgba(0, 240, 255, 0)');
      scanGrad.addColorStop(1, 'rgba(0, 240, 255, 0.2)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(scanX - 30, 0, 30, h);

      // Top Telemetry Stats on Canvas
      ctx.fillStyle = '#00F0FF';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText(`FREQ: ${frequency}Hz`, 12, 20);
      ctx.fillText(`V_PP: ${(amplitude * 2).toFixed(1)}V`, 110, 20);
      ctx.fillText(`RMS: ${(amplitude * 0.707).toFixed(2)}V`, 200, 20);
      ctx.fillText(`T: ${(1000 / frequency).toFixed(2)}ms`, 290, 20);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [waveType, frequency, amplitude, phase, dutyCycle, timebase]);

  // Presets
  const applyPreset = (name, w, f, a, p, d = 50) => {
    audioEngine.playClick();
    setWaveType(w);
    setFrequency(f);
    setAmplitude(a);
    setPhase(p);
    setDutyCycle(d);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-black/[0.08]" aria-label="Interactive Hardware Testbench">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-zinc-950 tracking-ultra-tight leading-tight">
            Interactive Signal Playground
          </h2>
        </div>

        <p className="text-zinc-600 text-sm sm:text-base max-w-md leading-relaxed font-normal">
          Explore real-time electronic waveforms generated directly in your browser. Tweak frequencies, adjust peak amplitudes, and listen to the acoustic synthesis live.
        </p>
      </div>

      {/* OSCILLOSCOPE HUD WORKBENCH */}
      <div className="bg-white rounded-3xl border border-black/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08),_0_0_0_1px_rgba(0,0,0,0.02)] p-6 sm:p-8 lg:p-10 overflow-hidden">
        
        {/* Top Control Strip */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-black/[0.08] gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-950 text-white flex items-center justify-center shadow-md">
              <Activity size={18} className="text-[#00F0FF]" />
            </div>
            <div>
              <div className="font-display font-bold text-base text-zinc-950">
                TEKTRONIX DIGITAL OSCILLOSCOPE SIMULATOR
              </div>
              <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                DEPARTMENT OF ELECTRONICS &amp; COMPUTER SCIENCE · SIES GST LABS
              </div>
            </div>
          </div>

          {/* Interactive Live Audio Output Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const next = !isAudioLive;
                setIsAudioLive(next);
                if (next) audioEngine.playSuccessChime();
              }}
              className={`px-4 py-2 rounded-full font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                isAudioLive 
                  ? 'bg-[#0062FF] text-white shadow-[0_4px_20px_rgba(0,98,255,0.4)] animate-pulse' 
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-black/10'
              }`}
            >
              {isAudioLive ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span>{isAudioLive ? 'AUDIO OUTPUT: LIVE [440Hz]' : 'LISTEN TO WAVEFORM'}</span>
            </button>
          </div>
        </div>

        {/* Oscilloscope Grid Display & Controls Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Authentic CRT Oscilloscope Screen */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border-2 border-zinc-800 shadow-[0_12px_40px_rgba(0,0,0,0.25)] bg-[#090D16]">
              {/* Screen Bezel Branding */}
              <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between font-mono text-[10px] text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-emerald-400 font-bold">CH1: ACTIVE [AUTO-TRIGGER]</span>
                </span>
                <span>COUPLING: DC · 50Ω</span>
              </div>

              {/* High-Resolution HTML5 Canvas */}
              <canvas 
                ref={canvasRef} 
                width={700} 
                height={380} 
                className="w-full aspect-[16/9] object-cover block"
              />

              {/* Bottom Screen Status Bar */}
              <div className="px-4 py-2 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between font-mono text-[10px] text-zinc-400">
                <span>TIME/DIV: {(timebase * 2.5).toFixed(1)}ms</span>
                <span className="text-zinc-500">SAMPLE RATE: 100 kSa/s · 12-BIT ADC</span>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="font-mono text-[10px] text-zinc-400 uppercase font-semibold">PRESETS:</span>
              <button
                onClick={() => applyPreset('sine', 'sine', 440, 3.3, 0)}
                className="px-2.5 py-1 rounded-lg border border-black/10 bg-zinc-50 hover:bg-zinc-100 font-mono text-[11px] text-zinc-700 cursor-pointer"
              >
                A4 Reference (440Hz)
              </button>
              <button
                onClick={() => applyPreset('clock', 'square', 100, 3.3, 0)}
                className="px-2.5 py-1 rounded-lg border border-black/10 bg-zinc-50 hover:bg-zinc-100 font-mono text-[11px] text-zinc-700 cursor-pointer"
              >
                MCU Clock (100Hz)
              </button>
              <button
                onClick={() => applyPreset('pwm', 'pwm', 250, 4.5, 0, 25)}
                className="px-2.5 py-1 rounded-lg border border-black/10 bg-zinc-50 hover:bg-zinc-100 font-mono text-[11px] text-zinc-700 cursor-pointer"
              >
                Servo PWM (25% Duty)
              </button>
              <button
                onClick={() => applyPreset('saw', 'sawtooth', 880, 2.8, 45)}
                className="px-2.5 py-1 rounded-lg border border-black/10 bg-zinc-50 hover:bg-zinc-100 font-mono text-[11px] text-zinc-700 cursor-pointer"
              >
                Analog Ramp (880Hz)
              </button>
            </div>
          </div>

          {/* Right Column: Tactile Engineering Rotary & Slider Controls */}
          <div className="lg:col-span-5 space-y-5 bg-[#FAFAFC] p-6 sm:p-7 rounded-2xl border border-black/[0.08]">
            
            {/* Waveform Selector */}
            <div>
              <label className="font-mono text-xs font-bold text-zinc-800 uppercase block mb-2">
                1. Waveform Geometry
              </label>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                {['sine', 'square', 'triangle', 'sawtooth', 'pwm'].map((w) => (
                  <button
                    key={w}
                    onClick={() => {
                      setWaveType(w);
                      audioEngine.playClick();
                    }}
                    className={`py-2 px-2 rounded-xl border transition-all uppercase font-bold text-center cursor-pointer ${
                      waveType === w 
                        ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm' 
                        : 'bg-white text-zinc-600 border-black/10 hover:border-black/25'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency Slider */}
            <div>
              <div className="flex justify-between font-mono text-xs mb-1.5">
                <span className="font-bold text-zinc-800">2. Frequency</span>
                <span className="font-bold text-[#0062FF]">{frequency} Hz</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="1200" 
                step="10"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full accent-[#0062FF] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-400 mt-0.5">
                <span>40 Hz (Sub-Bass)</span>
                <span>1200 Hz (High Pitch)</span>
              </div>
            </div>

            {/* Amplitude Slider */}
            <div>
              <div className="flex justify-between font-mono text-xs mb-1.5">
                <span className="font-bold text-zinc-800">3. Peak Amplitude</span>
                <span className="font-bold text-emerald-700">{amplitude.toFixed(1)} V</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="5.0" 
                step="0.1"
                value={amplitude}
                onChange={(e) => setAmplitude(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-400 mt-0.5">
                <span>0.5 V</span>
                <span>5.0 V (TTL Logic)</span>
              </div>
            </div>

            {/* Duty Cycle (If PWM) or Phase Slider */}
            {waveType === 'pwm' ? (
              <div>
                <div className="flex justify-between font-mono text-xs mb-1.5">
                  <span className="font-bold text-zinc-800">4. Duty Cycle (PWM)</span>
                  <span className="font-bold text-amber-700">{dutyCycle}%</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="95" 
                  step="5"
                  value={dutyCycle}
                  onChange={(e) => setDutyCycle(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            ) : (
              <div>
                <div className="flex justify-between font-mono text-xs mb-1.5">
                  <span className="font-bold text-zinc-800">4. Phase Angle</span>
                  <span className="font-bold text-zinc-900">{phase}°</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  step="15"
                  value={phase}
                  onChange={(e) => setPhase(Number(e.target.value))}
                  className="w-full accent-zinc-700 cursor-pointer"
                />
              </div>
            )}

            {/* Reset Defaults */}
            <div className="pt-2 flex justify-between items-center font-mono text-xs text-zinc-500">
              <span>Standard ECS Bench Calibration</span>
              <button
                onClick={() => {
                  audioEngine.playClick();
                  setWaveType('sine');
                  setFrequency(440);
                  setAmplitude(3.3);
                  setPhase(0);
                  setDutyCycle(50);
                }}
                className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Reset Defaults</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
