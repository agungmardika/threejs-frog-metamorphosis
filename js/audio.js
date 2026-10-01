/**
 * AUDIO & NARRATION CONTROLLER
 * - Web Speech API (Indonesian Natural Voice)
 * - Web Audio API Procedural Synthesizer for Frog Croaks, Water Splashes, and Pond Nature Ambience
 */

class AudioManager {
  constructor() {
    this.speechSynth = window.speechSynthesis || null;
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.isMuted = false;
    this.ambientPlaying = false;
    this.audioCtx = null;
    this.ambientNodes = null;
    this.onStateChange = null;
    this.selectedVoice = null;

    this.initAudioContext();
    this.loadVoices();

    if (this.speechSynth && this.speechSynth.onvoiceschanged !== undefined) {
      this.speechSynth.onvoiceschanged = () => this.loadVoices();
    }
  }

  initAudioContext() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    } catch (e) {
      console.warn("AudioContext not supported", e);
    }
  }

  resumeAudioContext() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  loadVoices() {
    if (!this.speechSynth) return;
    const voices = this.speechSynth.getVoices();
    // Prioritize Indonesian voices (id-ID)
    const indonesianVoice = voices.find(v => v.lang && (v.lang.includes('id') || v.lang.includes('ID') || v.name.toLowerCase().includes('indonesia')));
    this.selectedVoice = indonesianVoice || voices.find(v => v.lang && v.lang.startsWith('en')) || voices[0] || null;
  }

  speakNarration(text, onEndCallback = null) {
    if (!this.speechSynth) {
      console.warn("SpeechSynthesis not available in this browser");
      return;
    }

    this.stopNarration();
    if (this.isMuted) return;

    this.resumeAudioContext();

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.lang = this.selectedVoice && this.selectedVoice.lang ? this.selectedVoice.lang : 'id-ID';
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (this.onStateChange) this.onStateChange({ speaking: true, paused: false });
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (this.onStateChange) this.onStateChange({ speaking: false, paused: false });
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error:", e);
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (this.onStateChange) this.onStateChange({ speaking: false, paused: false });
    };

    this.currentUtterance = utterance;
    this.speechSynth.speak(utterance);
  }

  pauseNarration() {
    if (this.speechSynth && this.isSpeaking) {
      this.speechSynth.pause();
      if (this.onStateChange) this.onStateChange({ speaking: true, paused: true });
    }
  }

  resumeNarration() {
    if (this.speechSynth && this.speechSynth.paused) {
      this.speechSynth.resume();
      if (this.onStateChange) this.onStateChange({ speaking: true, paused: false });
    }
  }

  stopNarration() {
    if (this.speechSynth) {
      this.speechSynth.cancel();
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (this.onStateChange) this.onStateChange({ speaking: false, paused: false });
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopNarration();
      this.stopAmbientSound();
    }
    return this.isMuted;
  }

  // --- PROCEDURAL SOUND EFFECTS (Web Audio API) ---

  playStageTransition() {
    if (this.isMuted || !this.audioCtx) return;
    this.resumeAudioContext();

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.4);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  }

  playWaterRipple() {
    if (this.isMuted || !this.audioCtx) return;
    this.resumeAudioContext();

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.12);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  playFrogCroak() {
    if (this.isMuted || !this.audioCtx) return;
    this.resumeAudioContext();

    const now = this.audioCtx.currentTime;
    
    // Create dual-formant filtered pulse train for realistic frog vocal croak "kwekkk"
    const bufferSize = this.audioCtx.sampleRate * 0.35;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    const pulseFreq = 38; // 38 Hz vocal cord clicks
    const period = Math.floor(this.audioCtx.sampleRate / pulseFreq);

    for (let i = 0; i < bufferSize; i++) {
      const pos = i % period;
      if (pos < 5) {
        data[i] = (Math.random() * 2 - 1) * 0.9;
      } else {
        data[i] = 0;
      }
    }

    const source = this.audioCtx.createBufferSource();
    source.buffer = buffer;

    // Formant 1: around 450Hz
    const filter1 = this.audioCtx.createBiquadFilter();
    filter1.type = 'bandpass';
    filter1.frequency.setValueAtTime(450, now);
    filter1.Q.setValueAtTime(7.0, now);

    // Formant 2: around 1100Hz
    const filter2 = this.audioCtx.createBiquadFilter();
    filter2.type = 'bandpass';
    filter2.frequency.setValueAtTime(1100, now);
    filter2.Q.setValueAtTime(5.0, now);

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    source.connect(filter1);
    source.connect(filter2);
    filter1.connect(gain);
    filter2.connect(gain);
    gain.connect(this.audioCtx.destination);

    source.start(now);
    source.stop(now + 0.36);
  }

  toggleAmbientSound() {
    if (this.ambientPlaying) {
      this.stopAmbientSound();
      return false;
    } else {
      this.startAmbientSound();
      return true;
    }
  }

  startAmbientSound() {
    if (this.isMuted || !this.audioCtx) return;
    this.resumeAudioContext();
    if (this.ambientPlaying) return;

    try {
      // Gentle stream / pond ambient noise + crickets
      const bufferSize = this.audioCtx.sampleRate * 2;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink noise filter
        lastOut = (lastOut + (0.02 * white)) / 1.02;
        data[i] = lastOut * 3.5;
      }

      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, this.audioCtx.currentTime);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.035, this.audioCtx.currentTime + 1.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      noise.start(0);

      this.ambientNodes = { noise, gain };
      this.ambientPlaying = true;
    } catch (e) {
      console.warn("Could not start ambient sound:", e);
    }
  }

  stopAmbientSound() {
    if (this.ambientNodes) {
      try {
        const { noise, gain } = this.ambientNodes;
        const now = this.audioCtx.currentTime;
        gain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
        setTimeout(() => {
          try {
            noise.stop();
            noise.disconnect();
          } catch (e) {}
        }, 850);
      } catch (e) {}
      this.ambientNodes = null;
    }
    this.ambientPlaying = false;
  }
}

window.AudioManager = AudioManager;
