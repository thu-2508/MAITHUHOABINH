/**
 * Web Audio Synthesizer for educational feedback sounds and ambient background music.
 * Completely client-side, zero latency, no external assets required.
 */

class SoundSystem {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private bgmPlaying: boolean = false;
  private bgmGain: GainNode | null = null;
  private bgmInterval: number | null = null;

  constructor() {
    // Read user preference from localStorage if available
    try {
      const saved = localStorage.getItem('smart_tutor_sound_enabled');
      if (saved !== null) {
        this.soundEnabled = saved === 'true';
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    try {
      localStorage.setItem('smart_tutor_sound_enabled', String(enabled));
    } catch {
      // Ignore
    }
    if (!enabled && this.bgmPlaying) {
      this.stopBgm();
    }
  }

  public toggleSound(): boolean {
    this.setEnabled(!this.soundEnabled);
    return this.soundEnabled;
  }

  public playCorrect() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Bright cheerful arpeggio)
      
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.3);
      });
    } catch {
      // Ignore audio failure
    }
  }

  public playIncorrect() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Gentle, friendly low downward chime (F4 -> Eb4)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(349.23, now); // F4
      osc.frequency.exponentialRampToValueAtTime(311.13, now + 0.25); // Eb4

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {
      // Ignore
    }
  }

  public playTimeWarning() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Soft double tick
      [0, 0.1].forEach((delay) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now + delay); // A5

        gain.gain.setValueAtTime(0.05, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.06);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.07);
      });
    } catch {
      // Ignore
    }
  }

  public playVictoryFanfare() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Fanfare sequence: C4 - G4 - C5 - E5 - G5 - C6
      const seq = [
        { freq: 261.63, delay: 0.0, dur: 0.15 },
        { freq: 392.00, delay: 0.15, dur: 0.15 },
        { freq: 523.25, delay: 0.3, dur: 0.15 },
        { freq: 659.25, delay: 0.45, dur: 0.18 },
        { freq: 783.99, delay: 0.63, dur: 0.2 },
        { freq: 1046.5, delay: 0.85, dur: 0.7 },
      ];

      seq.forEach(({ freq, delay, dur }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + delay);

        gain.gain.setValueAtTime(0.0001, now + delay);
        gain.gain.linearRampToValueAtTime(0.2, now + delay + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + dur);
      });
    } catch {
      // Ignore
    }
  }

  public playCertificateSound() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Gentle harp-like celestial arpeggio
      const notes = [587.33, 739.99, 880.00, 1174.66, 1479.98, 1760.00];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.15, now + idx * 0.07 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.55);
      });
    } catch {
      // Ignore
    }
  }

  public startBgm() {
    if (!this.soundEnabled || this.bgmPlaying) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      this.bgmPlaying = true;
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.025, this.ctx.currentTime);
      this.bgmGain.connect(this.ctx.destination);

      // Soft ambient calming loop (Fmaj7 -> Gsus4 -> Am7 -> Cmaj7)
      const chords = [
        [174.61, 261.63, 329.63, 440.0],  // F maj9
        [196.00, 261.63, 293.66, 392.0],  // G sus4
        [220.00, 261.63, 329.63, 392.0],  // Am7
        [130.81, 261.63, 329.63, 392.0],  // C
      ];

      let chordIdx = 0;
      const playNextChord = () => {
        if (!this.bgmPlaying || !this.ctx || !this.bgmGain) return;
        const now = this.ctx.currentTime;
        const chord = chords[chordIdx % chords.length];
        chordIdx++;

        chord.forEach((freq) => {
          if (!this.ctx || !this.bgmGain) return;
          const osc = this.ctx.createOscillator();
          const noteGain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          noteGain.gain.setValueAtTime(0.0001, now);
          noteGain.gain.linearRampToValueAtTime(0.08, now + 0.8);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

          osc.connect(noteGain);
          noteGain.connect(this.bgmGain);

          osc.start(now);
          osc.stop(now + 4.0);
        });
      };

      playNextChord();
      this.bgmInterval = window.setInterval(playNextChord, 4000);
    } catch {
      // Ignore
    }
  }

  public stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    if (this.bgmGain && this.ctx) {
      try {
        this.bgmGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      } catch {
        // Ignore
      }
    }
  }

  public isBgmActive(): boolean {
    return this.bgmPlaying;
  }
}

export const sound = new SoundSystem();
