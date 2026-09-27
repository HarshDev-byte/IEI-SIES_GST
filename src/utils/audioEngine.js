// ==========================================================================
// CLIENT-SIDE WEB AUDIO SYNTHESIZER
// High-tech tactile soundscapes & micro-interaction audio feedback
// ==========================================================================

let audioCtx = null;
let ambientGain = null;
let ambientOsc = null;
let isAudioActive = false;

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export const audioEngine = {
  get isActive() {
    return isAudioActive;
  },

  toggle() {
    if (isAudioActive) {
      this.mute();
      return false;
    } else {
      this.unmute();
      return true;
    }
  },

  unmute() {
    const ctx = getAudioContext();
    if (!ctx) return;
    isAudioActive = true;
    this.startAmbientHum();
    this.playTone(880, 0.05, 'sine', 0.05);
  },

  mute() {
    isAudioActive = false;
    if (ambientGain && audioCtx) {
      try {
        ambientGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
      } catch {
        // ignore
      }
    }
  },

  // Subtle ambient engineering sub-drone
  startAmbientHum() {
    if (!isAudioActive) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    if (!ambientOsc) {
      try {
        ambientOsc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        ambientGain = ctx.createGain();

        ambientOsc.type = 'sawtooth';
        ambientOsc.frequency.setValueAtTime(55, ctx.currentTime); // Low A

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(110, ctx.currentTime);

        ambientGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        ambientGain.gain.exponentialRampToValueAtTime(0.015, ctx.currentTime + 1.5);

        ambientOsc.connect(filter);
        filter.connect(ambientGain);
        ambientGain.connect(ctx.destination);

        ambientOsc.start();
      } catch (e) {
        console.warn('Ambient audio could not be initialized:', e);
      }
    } else if (ambientGain) {
      try {
        ambientGain.gain.exponentialRampToValueAtTime(0.015, ctx.currentTime + 0.3);
      } catch {
        // ignore
      }
    }
  },

  // Tactile micro-click for buttons & interactive elements
  playClick() {
    if (!isAudioActive) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } catch {
      // ignore
    }
  },

  // Verification success harmonic chime
  playSuccessChime() {
    if (!isAudioActive) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major
    notes.forEach((freq, idx) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + idx * 0.06;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.05, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.65);
      } catch {
        // ignore
      }
    });
  },

  playChime() {
    this.playSuccessChime();
  },

  // Chapter transition pulse
  playChapterPulse() {
    if (!isAudioActive) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.32);
    } catch {
      // ignore
    }
  },

  playTone(freq, duration = 0.1, type = 'sine', vol = 0.05) {
    if (!isAudioActive) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // ignore
    }
  },

  // High-precision architectural plotter micro-tick
  playPlotterTick() {
    if (!isAudioActive) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(3200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.015);

      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.018);
    } catch {
      // ignore
    }
  },

  // Resonant collegiate milestone ping
  playMilestonePing(milestoneIndex = 1) {
    if (!isAudioActive) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    // Harmonic pentatonic frequencies based on milestone index
    const baseFreqs = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51];
    const freq = baseFreqs[(milestoneIndex - 1) % baseFreqs.length] || 880;

    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, ctx.currentTime);
      osc2.frequency.setValueAtTime(freq * 1.5, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.5);
      osc2.stop(ctx.currentTime + 0.5);
    } catch {
      // ignore
    }
  },

  // Epic cinematic architectural portal warp entry
  playWarpEntry() {
    if (!isAudioActive) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      // Sub-bass sweep
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(80, ctx.currentTime);
      sub.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.8);
      subGain.gain.setValueAtTime(0.08, ctx.currentTime);
      subGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
      sub.connect(subGain);
      subGain.connect(ctx.destination);
      sub.start();
      sub.stop(ctx.currentTime + 0.85);

      // Ascending harmonic sweep
      const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      chord.forEach((note, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, ctx.currentTime + i * 0.05);
        g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.05);
        g.gain.linearRampToValueAtTime(0.04, ctx.currentTime + i * 0.05 + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.05 + 0.7);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.05);
        osc.stop(ctx.currentTime + i * 0.05 + 0.75);
      });
    } catch {
      // ignore
    }
  }
};
