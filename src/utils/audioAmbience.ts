/**
 * Web Audio API procedural ambient soundscape
 * Synthesizes a warm, ethereal cinematic golden chord drone with subtle harmonic resonance.
 */

class AmbientSoundscape {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isPlaying: boolean = false;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.stop();

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    // Smooth fade in
    masterGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);

    // Warm Low-Pass Filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    filter.Q.setValueAtTime(2, this.ctx.currentTime);

    masterGain.connect(filter);
    filter.connect(this.ctx.destination);
    this.masterGain = masterGain;

    // Harmonic frequencies for majestic cosmic horizon (Root, 5th, Octave, 9th)
    const baseFreq = 55; // A1
    const freqs = [baseFreq, baseFreq * 1.5, baseFreq * 2, baseFreq * 2.25, baseFreq * 3];

    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle LFO detune modulation for organic life
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.1 + idx * 0.05, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(1.5, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.detune);
      lfo.start();

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.2 / freqs.length, this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(masterGain);

      osc.start();
      this.oscillators.push(osc);
    });

    this.isPlaying = true;
  }

  public stop() {
    if (!this.ctx || !this.isPlaying) return;

    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
    }

    setTimeout(() => {
      this.oscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      this.oscillators = [];
      this.isPlaying = false;
    }, 1200);
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const ambientSound = new AmbientSoundscape();
