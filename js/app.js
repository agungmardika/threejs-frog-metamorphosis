/**
 * MAIN CONTROLLER & APPLICATION LOGIC
 * Integrates 3D Scene, Audio Narration, UI Stepper, Hotspots, and Quiz
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  // Initialize Core Engines
  const audioManager = new AudioManager();
  const sceneManager = new FrogScene(container);
  let currentStageIndex = 0;
  let autoTourInterval = null;
  let isAutoTouring = false;

  // -------------------------------------------------------------
  // RENDER STAGE NAVIGATION & CYCLE STEPPER
  // -------------------------------------------------------------
  const stagesNavContainer = document.getElementById('stages-nav');
  function renderStagesNavigation() {
    if (!stagesNavContainer) return;
    stagesNavContainer.innerHTML = STAGES_DATA.map((stage, idx) => {
      const shortTitle = stage.title.replace(/^\d+\.\s*/, '').replace(/\s*\(.*\)/, '');
      return `
        <button class="stage-nav-btn ${idx === currentStageIndex ? 'active' : ''}" data-index="${idx}" id="stage-btn-${idx}">
          <div class="stage-btn-num">${idx + 1}</div>
          <div class="stage-btn-info">
            <span class="stage-btn-title">${shortTitle}</span>
            <span class="stage-btn-dur">${stage.duration}</span>
          </div>
        </button>
      `;
    }).join('');

    // Bind click events
    stagesNavContainer.querySelectorAll('.stage-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        goToStage(idx, true);
      });
    });
  }

  // -------------------------------------------------------------
  // UPDATE UI FOR CURRENT STAGE
  // -------------------------------------------------------------
  function updateUIForStage(stageIndex) {
    const data = STAGES_DATA[stageIndex];
    if (!data) return;

    // Active button in stepper
    document.querySelectorAll('.stage-nav-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx === stageIndex);
    });

    // Stage Header & Subtitle
    const titleEl = document.getElementById('stage-title');
    const subtitleEl = document.getElementById('stage-subtitle');
    const latinEl = document.getElementById('stage-latin');
    const durationBadge = document.getElementById('badge-duration');
    const respirationBadge = document.getElementById('badge-respiration');
    const dietBadge = document.getElementById('badge-diet');
    const habitatBadge = document.getElementById('badge-habitat');

    if (titleEl) titleEl.textContent = data.title;
    if (subtitleEl) subtitleEl.textContent = data.subtitle;
    if (latinEl) latinEl.textContent = data.latinName;
    if (durationBadge) durationBadge.textContent = data.duration;
    if (respirationBadge) respirationBadge.textContent = data.respiration;
    if (dietBadge) dietBadge.textContent = data.diet;
    if (habitatBadge) habitatBadge.textContent = data.habitat;

    // Narration text display
    const narrationTextEl = document.getElementById('narration-text');
    if (narrationTextEl) narrationTextEl.textContent = data.narration;

    // Summary description
    const summaryEl = document.getElementById('stage-summary');
    if (summaryEl) summaryEl.textContent = data.summary;

    // Morphology specifications table
    const morphTable = document.getElementById('morphology-table');
    if (morphTable && data.morphology) {
      morphTable.innerHTML = data.morphology.map(item => `
        <div class="morph-row">
          <span class="morph-label">${item.label}</span>
          <span class="morph-value">${item.value}</span>
        </div>
      `).join('');
    }

    // Did you know fact
    const factEl = document.getElementById('fact-text');
    if (factEl && data.didYouKnow) {
      factEl.textContent = data.didYouKnow;
    }

    // Step counter
    const stepCountEl = document.getElementById('step-counter');
    if (stepCountEl) {
      stepCountEl.textContent = `Fase ${stageIndex + 1} dari ${STAGES_DATA.length}`;
    }

    // Disable/enable prev & next buttons
    const prevBtn = document.getElementById('prev-stage-btn');
    const nextBtn = document.getElementById('next-stage-btn');
    if (prevBtn) prevBtn.disabled = stageIndex === 0;
    if (nextBtn) nextBtn.disabled = stageIndex === STAGES_DATA.length - 1;
  }

  // -------------------------------------------------------------
  // CHANGE STAGE (TRANSITION, 3D LOAD, AUDIO)
  // -------------------------------------------------------------
  async function goToStage(stageIndex, autoPlaySpeech = true) {
    if (stageIndex < 0 || stageIndex >= STAGES_DATA.length) return;

    currentStageIndex = stageIndex;
    updateUIForStage(stageIndex);

    // Play stage transition chime
    audioManager.playStageTransition();

    // Load 3D model
    await sceneManager.loadStage(stageIndex);

    // Narration
    if (autoPlaySpeech) {
      playNarrationForCurrentStage();
    }
  }

  function playNarrationForCurrentStage() {
    const data = STAGES_DATA[currentStageIndex];
    if (!data) return;

    const btn = document.getElementById('toggle-speech-btn');
    if (btn) {
      btn.innerHTML = `<span class="icon">🔊</span> Memutar Narasi...`;
      btn.classList.add('playing');
    }

    audioManager.speakNarration(data.narration, () => {
      if (btn) {
        btn.innerHTML = `<span class="icon">▶️</span> Putar Narasi Suara`;
        btn.classList.remove('playing');
      }

      // If auto-touring, move to next stage after narration finishes
      if (isAutoTouring) {
        setTimeout(() => {
          if (isAutoTouring) {
            const nextIdx = (currentStageIndex + 1) % STAGES_DATA.length;
            goToStage(nextIdx, true);
          }
        }, 2000);
      }
    });
  }

  // -------------------------------------------------------------
  // HOTSPOT CLICK HANDLER
  // -------------------------------------------------------------
  const hotspotModal = document.getElementById('hotspot-modal');
  const hsTitle = document.getElementById('hs-title');
  const hsDesc = document.getElementById('hs-desc');
  const hsClose = document.getElementById('hs-close');

  sceneManager.onHotspotClickCallback = (hotspotData) => {
    audioManager.playWaterRipple();
    if (hsTitle) hsTitle.textContent = hotspotData.title || hotspotData.label;
    if (hsDesc) hsDesc.textContent = hotspotData.description;
    if (hotspotModal) {
      hotspotModal.classList.remove('hidden');
    }
  };

  if (hsClose) {
    hsClose.addEventListener('click', () => {
      if (hotspotModal) hotspotModal.classList.add('hidden');
    });
  }

  // -------------------------------------------------------------
  // NAVIGATION BUTTONS
  // -------------------------------------------------------------
  document.getElementById('prev-stage-btn')?.addEventListener('click', () => {
    if (currentStageIndex > 0) goToStage(currentStageIndex - 1, true);
  });

  document.getElementById('next-stage-btn')?.addEventListener('click', () => {
    if (currentStageIndex < STAGES_DATA.length - 1) goToStage(currentStageIndex + 1, true);
  });

  // Narration Play/Pause button
  const toggleSpeechBtn = document.getElementById('toggle-speech-btn');
  if (toggleSpeechBtn) {
    toggleSpeechBtn.addEventListener('click', () => {
      if (audioManager.isSpeaking) {
        audioManager.stopNarration();
        toggleSpeechBtn.innerHTML = `<span class="icon">▶️</span> Putar Narasi Suara`;
        toggleSpeechBtn.classList.remove('playing');
      } else {
        playNarrationForCurrentStage();
      }
    });
  }

  // -------------------------------------------------------------
  // 3D VIEWER CONTROLS
  // -------------------------------------------------------------
  document.getElementById('btn-reset-cam')?.addEventListener('click', () => {
    audioManager.playWaterRipple();
    sceneManager.resetCamera();
  });

  const autoRotateBtn = document.getElementById('btn-auto-rotate');
  autoRotateBtn?.addEventListener('click', () => {
    const isRotating = sceneManager.toggleAutoRotate();
    autoRotateBtn.classList.toggle('active', isRotating);
  });

  const nightModeBtn = document.getElementById('btn-night-mode');
  nightModeBtn?.addEventListener('click', () => {
    const isNight = sceneManager.toggleNightMode();
    nightModeBtn.classList.toggle('active', isNight);
    nightModeBtn.innerHTML = isNight ? `<span class="icon">🌙</span> Malam` : `<span class="icon">☀️</span> Siang`;
  });

  const wireframeBtn = document.getElementById('btn-wireframe');
  wireframeBtn?.addEventListener('click', () => {
    const isWire = sceneManager.toggleWireframe();
    wireframeBtn.classList.toggle('active', isWire);
  });

  // Sound effects: Frog Croak & Ambient Pond Water
  document.getElementById('btn-sound-croak')?.addEventListener('click', () => {
    audioManager.playFrogCroak();
  });

  const ambientBtn = document.getElementById('btn-ambient');
  ambientBtn?.addEventListener('click', () => {
    const playing = audioManager.toggleAmbientSound();
    ambientBtn.classList.toggle('active', playing);
  });

  const muteBtn = document.getElementById('btn-mute');
  muteBtn?.addEventListener('click', () => {
    const muted = audioManager.toggleMute();
    muteBtn.classList.toggle('active', muted);
    muteBtn.innerHTML = muted ? `<span class="icon">🔇</span>` : `<span class="icon">🔊</span>`;
  });

  // -------------------------------------------------------------
  // AUTO TOUR (MODE PRESENTASI OTOMATIS)
  // -------------------------------------------------------------
  const autoTourBtn = document.getElementById('btn-auto-tour');
  autoTourBtn?.addEventListener('click', () => {
    isAutoTouring = !isAutoTouring;
    autoTourBtn.classList.toggle('active', isAutoTouring);
    autoTourBtn.innerHTML = isAutoTouring
      ? `<span class="icon">⏸️</span> Hentikan Tur Presentasi`
      : `<span class="icon">✨</span> Tur Presentasi Otomatis`;

    if (isAutoTouring) {
      playNarrationForCurrentStage();
    } else {
      audioManager.stopNarration();
    }
  });

  // -------------------------------------------------------------
  // HIGH-RESOLUTION SCREENSHOT FOR REPORT
  // -------------------------------------------------------------
  document.getElementById('btn-screenshot')?.addEventListener('click', () => {
    const metadata = STAGES_DATA[currentStageIndex];
    sceneManager.captureScreenshot(metadata);
  });

  // -------------------------------------------------------------
  // GLB EXPORT & UPLOAD
  // -------------------------------------------------------------
  document.getElementById('btn-export-glb')?.addEventListener('click', () => {
    const data = STAGES_DATA[currentStageIndex];
    sceneManager.exportCurrentGLB(data.modelFileName || `metamorfosis_${data.id}.glb`);
  });

  const glbFileInput = document.getElementById('glb-file-input');
  document.getElementById('btn-upload-glb')?.addEventListener('click', () => {
    glbFileInput?.click();
  });

  glbFileInput?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await sceneManager.loadCustomGLBFile(file, currentStageIndex);
        alert(`Model 3D "${file.name}" berhasil dimuat pada fase ${currentStageIndex + 1}!`);
      } catch (err) {
        alert("Gagal memuat file .glb. Pastikan file valid dalam format glTF binary (.glb).");
      }
    }
  });

  // -------------------------------------------------------------
  // TABS & INTERACTIVE QUIZ
  // -------------------------------------------------------------
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.toggle('active', b === btn));
      tabPanes.forEach(p => p.classList.toggle('active', p.id === `tab-${targetTab}`));
    });
  });

  // Quiz Modal Trigger
  const quiz = new FrogQuiz(QUIZ_QUESTIONS, 'quiz-modal-body');
  const quizModal = document.getElementById('quiz-modal');

  document.getElementById('btn-open-quiz')?.addEventListener('click', () => {
    quizModal?.classList.remove('hidden');
    quiz.start();
  });

  document.getElementById('quiz-modal-close')?.addEventListener('click', () => {
    quizModal?.classList.add('hidden');
  });

  // -------------------------------------------------------------
  // KEYBOARD SHORTCUTS
  // -------------------------------------------------------------
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      if (currentStageIndex < STAGES_DATA.length - 1) goToStage(currentStageIndex + 1, true);
    } else if (e.key === 'ArrowLeft') {
      if (currentStageIndex > 0) goToStage(currentStageIndex - 1, true);
    } else if (e.key === ' ' && e.target === document.body) {
      e.preventDefault();
      toggleSpeechBtn?.click();
    }
  });

  // Initial Boot
  renderStagesNavigation();
  goToStage(0, false);
});
