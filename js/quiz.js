/**
 * INTERACTIVE BIOLOGY QUIZ MODULE (Teknologi Pendidikan)
 */

class FrogQuiz {
  constructor(questions, containerId) {
    this.questions = questions || [];
    this.container = document.getElementById(containerId);
    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    this.isAnswered = false;
  }

  start() {
    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    this.renderQuestion();
  }

  renderQuestion() {
    if (!this.container) return;
    this.isAnswered = false;

    if (this.currentIndex >= this.questions.length) {
      this.renderResults();
      return;
    }

    const q = this.questions[this.currentIndex];
    const progressPercent = ((this.currentIndex + 1) / this.questions.length) * 100;

    this.container.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-header">
          <div class="quiz-badge">Soal ${this.currentIndex + 1} dari ${this.questions.length}</div>
          <div class="quiz-score-badge">Skor Saat Ini: ${this.score * 20}</div>
        </div>

        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width: ${progressPercent}%;"></div>
        </div>

        <h3 class="quiz-question-text">${q.question}</h3>

        <div class="quiz-options-list">
          ${q.options.map((opt, i) => `
            <button class="quiz-option-btn" data-index="${i}">
              <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
              <span class="opt-text">${opt}</span>
            </button>
          `).join('')}
        </div>

        <div id="quiz-feedback" class="quiz-feedback hidden"></div>

        <div class="quiz-footer">
          <button id="quiz-next-btn" class="btn btn-primary hidden">
            Lanjut ke Soal Berikutnya →
          </button>
        </div>
      </div>
    `;

    // Bind option click
    const optionBtns = this.container.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selectedIdx = parseInt(btn.getAttribute('data-index'), 10);
        this.selectAnswer(selectedIdx, btn, optionBtns);
      });
    });

    const nextBtn = this.container.querySelector('#quiz-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.currentIndex++;
        this.renderQuestion();
      });
    }
  }

  selectAnswer(selectedIdx, clickedBtn, allBtns) {
    if (this.isAnswered) return;
    this.isAnswered = true;

    const q = this.questions[this.currentIndex];
    const isCorrect = selectedIdx === q.answer;

    if (isCorrect) {
      this.score++;
      clickedBtn.classList.add('correct');
      if (window.confetti) {
        window.confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      }
    } else {
      clickedBtn.classList.add('wrong');
      allBtns[q.answer].classList.add('correct');
    }

    allBtns.forEach(b => b.disabled = true);

    const feedbackEl = this.container.querySelector('#quiz-feedback');
    if (feedbackEl) {
      feedbackEl.classList.remove('hidden');
      feedbackEl.classList.add(isCorrect ? 'feedback-correct' : 'feedback-wrong');
      feedbackEl.innerHTML = `
        <div class="feedback-title">${isCorrect ? '✅ Jawaban Benar!' : '❌ Jawaban Kurang Tepat'}</div>
        <p class="feedback-desc">${q.explanation}</p>
      `;
    }

    const nextBtn = this.container.querySelector('#quiz-next-btn');
    if (nextBtn) {
      nextBtn.classList.remove('hidden');
    }
  }

  renderResults() {
    const total = this.questions.length;
    const finalScore = Math.round((this.score / total) * 100);
    const passed = finalScore >= 70;

    if (window.confetti && passed) {
      window.confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }

    this.container.innerHTML = `
      <div class="quiz-results-card">
        <div class="results-icon">${passed ? '🏆' : '🌱'}</div>
        <h2 class="results-title">${passed ? 'Selamat! Pemahaman Luar Biasa!' : 'Tetap Semangat Belajar!'}</h2>
        <p class="results-subtitle">Evaluasi Pembelajaran Metamorfosis Katak Interaktif</p>

        <div class="results-score-circle">
          <span class="score-number">${finalScore}</span>
          <span class="score-label">Nilai Akhir</span>
        </div>

        <div class="results-stats">
          <div class="stat-item">
            <span class="stat-val correct-color">${this.score}</span>
            <span class="stat-lbl">Jawaban Benar</span>
          </div>
          <div class="stat-item">
            <span class="stat-val wrong-color">${total - this.score}</span>
            <span class="stat-lbl">Jawaban Salah</span>
          </div>
          <div class="stat-item">
            <span class="stat-val">${total}</span>
            <span class="stat-lbl">Total Soal</span>
          </div>
        </div>

        <div class="results-actions">
          <button id="quiz-retry-btn" class="btn btn-secondary">
            🔄 Ulangi Kuis
          </button>
          <button id="quiz-close-btn" class="btn btn-primary">
            Kembali ke 3D Viewer
          </button>
        </div>
      </div>
    `;

    document.getElementById('quiz-retry-btn')?.addEventListener('click', () => this.start());
    document.getElementById('quiz-close-btn')?.addEventListener('click', () => {
      const modal = document.getElementById('quiz-modal');
      if (modal) modal.classList.add('hidden');
    });
  }
}

window.FrogQuiz = FrogQuiz;
