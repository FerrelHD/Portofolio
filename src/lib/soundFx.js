// Web Audio API Sound Synthesizer (Native Zero-Bloat Sound Engine)
class SoundFXEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    // Load persisted mute state
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("spidey_sfx_muted");
        this.muted = saved === "true";
      } catch (e) {
        this.muted = false;
      }
    }
  }

  getAudioContext() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  setMuted(val) {
    this.muted = !!val;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("spidey_sfx_muted", this.muted ? "true" : "false");
      } catch (e) {}
    }
  }

  isMuted() {
    return this.muted;
  }

  // 1. "THWIP!" Web-Shooter Sound (Fast descending snap frequency)
  playThwip() {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // High-pass noise + rapid sine drop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.14);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {}
  }

  // 2. Chiptune Beep / UI Navigation (8-bit square blip)
  playBeep(freq = 580) {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.setValueAtTime(freq * 1.25, now + 0.03);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  // 3. Spider-Sense Buzz (Vibrating dual-oscillator frequency modulation)
  playSenseBuzz() {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(440, now);
      osc1.frequency.linearRampToValueAtTime(880, now + 0.25);
      osc1.frequency.linearRampToValueAtTime(520, now + 0.5);

      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(444, now);
      osc2.frequency.linearRampToValueAtTime(884, now + 0.25);
      osc2.frequency.linearRampToValueAtTime(524, now + 0.5);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.55);
      osc2.stop(now + 0.55);
    } catch (e) {}
  }

  // 4. Comic Punch / Burst Sound
  playPunch() {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) {}
  }

  // 5. Fanfare / Achievement Unlocked (3-note ascending victory chime)
  playFanfare() {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const start = ctx.currentTime + idx * 0.09;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.23);
      });
    } catch (e) {}
  }
}

export const soundFX = new SoundFXEngine();
