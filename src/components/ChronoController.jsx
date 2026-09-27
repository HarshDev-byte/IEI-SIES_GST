import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sunrise, Sunset, Clock, Sparkles } from 'lucide-react';
import { LIGHTING_MODES } from '../utils/lightingEngine';
import { audioEngine } from '../utils/audioEngine';

export default function ChronoController({ 
  currentMode, 
  onSelectMode, 
  isAuto, 
  setIsAuto 
}) {
  const [localTime, setLocalTime] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toTimeString().split(' ')[0] + ' IST');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeOptions = [
    { mode: LIGHTING_MODES.midnight, icon: Moon, label: 'Midnight', range: '00:00 - 05:00', color: '#00F0FF' },
    { mode: LIGHTING_MODES.dawn, icon: Sunrise, label: 'Dawn', range: '05:00 - 11:00', color: '#FFB800' },
    { mode: LIGHTING_MODES.noon, icon: Sun, label: 'Noon', range: '11:00 - 17:00', color: '#00A8FF' },
    { mode: LIGHTING_MODES.dusk, icon: Sunset, label: 'Dusk', range: '17:00 - 24:00', color: '#FF007A' }
  ];

  return (
    <div className="relative inline-block text-left">
      
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          audioEngine.playClick();
          setIsExpanded(!isExpanded);
        }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono transition-all group"
        title="Circadian Chrono-Lighting Engine: Change lighting according to time"
        data-cursor="LIGHTING"
      >
        <span 
          className="w-2 h-2 rounded-full animate-ping inline-block"
          style={{ backgroundColor: currentMode.accentColor }}
        />
        <span className="text-white/80 group-hover:text-white font-medium flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" style={{ color: currentMode.accentColor }} />
          <span>{currentMode.name}</span>
        </span>
        <span className="text-[10px] text-white/40 hidden sm:inline">
          {localTime}
        </span>
      </button>

      {/* Dropdown Menu for Time-of-Day Selection */}
      {isExpanded && (
        <div 
          className="absolute right-0 mt-2 w-72 rounded-lg glass-panel-elevated border border-white/20 p-3 shadow-2xl z-50 animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
            <span className="font-mono text-[10px] uppercase text-white/50 tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#00D6FF]" />
              <span>Chrono-Lighting Engine</span>
            </span>
            <button
              type="button"
              onClick={() => {
                audioEngine.playClick();
                setIsAuto(!isAuto);
              }}
              className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-all ${
                isAuto 
                  ? 'border-[#00D6FF]/50 text-[#00D6FF] bg-[#00D6FF]/10' 
                  : 'border-white/10 text-white/40 hover:text-white'
              }`}
            >
              {isAuto ? 'AUTO CLOCK: ON' : 'MANUAL'}
            </button>
          </div>

          <div className="space-y-1.5">
            {timeOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = currentMode.id === opt.mode.id;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => {
                    audioEngine.playClick();
                    setIsAuto(false);
                    onSelectMode(opt.mode);
                    setIsExpanded(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded transition-all text-left ${
                    isSelected 
                      ? 'bg-white/[0.08] border border-white/20' 
                      : 'hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-7 h-7 rounded-full flex items-center justify-center border"
                      style={{ 
                        borderColor: `${opt.color}60`, 
                        backgroundColor: `${opt.color}15`,
                        color: opt.color 
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-xs text-white">
                        {opt.mode.name}
                      </div>
                      <div className="font-mono text-[10px] text-white/40">
                        {opt.range}
                      </div>
                    </div>
                  </div>

                  <span 
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: opt.color }}
                  />
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-white/10 text-[9px] font-mono text-white/40 text-center">
            REAL-TIME 3D SHADER & ATMOSPHERE SHIFT
          </div>
        </div>
      )}

    </div>
  );
}
