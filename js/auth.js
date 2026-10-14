/**
 * AUTHENTICATION & ATTENDANCE LOG MODULE (MAHASISWA & GUEST BUKU TAMU)
 * Modeled after university library/lab digital attendance.
 * Persists session and attendance history in localStorage.
 */

class AuthManager {
  constructor() {
    this.STORAGE_KEY = 'frog_metamorphosis_user';
    this.ATTENDANCE_KEY = 'frog_attendance_log';
    this.randomGuestNames = [
      'Penjelajah Rawa',
      'Sahabat Katak',
      'Bio-Explorer',
      'Petualang Amfibi',
      'Zoologis Muda',
      'Pengamat Ekosistem',
      'Rana Specialist',
      'Pecinta Sains 3D',
      'Sobat Metamorfosis',
      'Naturalis Cilik'
    ];
    this.currentUser = this.loadUser();
  }

  loadUser() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return null;
      const user = JSON.parse(data);
      if (user && user.roleLabel && user.roleLabel.includes('SIMARI')) {
        user.roleLabel = 'Mahasiswa';
      }
      if (user && user.avatar === '🏛️') {
        user.avatar = '🎓';
      }
      return user;
    } catch (e) {
      console.error('Gagal membaca data login dari localStorage:', e);
      return null;
    }
  }

  saveUser(userData) {
    this.currentUser = userData;
    try {
      if (userData) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));
        this.addAttendanceRecord(userData);
      } else {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    } catch (e) {
      console.error('Gagal menyimpan data login ke localStorage:', e);
    }
    this.dispatchAuthEvent();
  }

  // -------------------------------------------------------------
  // ATTENDANCE LOG (Buku Tamu / Daftar Kehadiran seperti di Perpus/Lab)
  // -------------------------------------------------------------
  getAttendanceLog() {
    try {
      const raw = localStorage.getItem(this.ATTENDANCE_KEY);
      if (!raw) return [];
      const logs = JSON.parse(raw);
      logs.forEach(l => {
        if (l.roleLabel && l.roleLabel.includes('SIMARI')) {
          l.roleLabel = 'Mahasiswa';
        }
      });
      return logs;
    } catch (e) {
      console.error('Gagal membaca log kehadiran:', e);
      return [];
    }
  }

  addAttendanceRecord(user) {
    if (!user) return;
    try {
      const log = this.getAttendanceLog();
      const now = new Date();
      const timeFormatted = now.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }) + ' ' + now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      });

      const record = {
        id: 'PRES-' + Date.now().toString(36).toUpperCase(),
        name: user.name,
        role: user.role,
        roleLabel: user.roleLabel,
        idNumber: user.idNumber || '-',
        institution: user.institution || '-',
        purpose: user.purpose || 'Praktikum Simulasi 3D Metamorfosis Katak',
        timestamp: now.toISOString(),
        timeFormatted: timeFormatted
      };

      // Keep latest 50 entries
      log.unshift(record);
      if (log.length > 50) log.pop();
      localStorage.setItem(this.ATTENDANCE_KEY, JSON.stringify(log));
    } catch (e) {
      console.error('Gagal menambah record presensi:', e);
    }
  }

  clearAttendanceLog() {
    localStorage.removeItem(this.ATTENDANCE_KEY);
  }

  dispatchAuthEvent() {
    window.dispatchEvent(new CustomEvent('user-auth-changed', {
      detail: { user: this.currentUser }
    }));
  }

  getUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  getRandomGuestName() {
    const idx = Math.floor(Math.random() * this.randomGuestNames.length);
    const num = Math.floor(100 + Math.random() * 900);
    return `${this.randomGuestNames[idx]} #${num}`;
  }

  // Login as Guest (Buku Tamu Pengunjung Bebas)
  loginAsGuest(customName, customCategory, customPurpose) {
    let name = (customName || '').trim();
    if (!name) {
      name = this.getRandomGuestName();
    }
    const user = {
      name: name,
      role: 'guest',
      roleLabel: 'Tamu (Guest)',
      avatar: '🐸',
      idNumber: 'GUEST-' + Math.floor(1000 + Math.random() * 9000),
      institution: customCategory || 'Pengunjung Umum / Bebas',
      purpose: customPurpose || 'Kunjungan Belajar Simulasi 3D',
      loginTime: new Date().toISOString()
    };
    this.saveUser(user);
    return user;
  }

  // Login as Mahasiswa (Presensi Perpus / Lab Kampus)
  loginAsSimari(name, nim, prodiKelas, purpose) {
    const cleanName = (name || '').trim();
    const cleanNim = (nim || '').trim();
    if (!cleanName) {
      throw new Error('Nama mahasiswa wajib diisi');
    }
    if (!cleanNim) {
      throw new Error('NIM Mahasiswa wajib diisi');
    }

    const user = {
      name: cleanName,
      role: 'simari',
      roleLabel: 'Mahasiswa',
      avatar: '🎓',
      idNumber: cleanNim,
      institution: prodiKelas || 'Teknologi Pendidikan - Kelas B',
      purpose: purpose || 'Praktikum Simulasi 3D Metamorfosis Katak',
      loginTime: new Date().toISOString()
    };
    this.saveUser(user);
    return user;
  }

  logout() {
    this.saveUser(null);
  }
}

// Global Auth & Attendance UI Controller
class AuthUI {
  constructor(authManager) {
    this.auth = authManager;
    this.modal = null;
    this.init();
  }

  init() {
    this.modal = document.getElementById('login-modal');
    this.bindEvents();
    this.renderNavbarProfile();

    // Listen to auth changes
    window.addEventListener('user-auth-changed', () => {
      this.renderNavbarProfile();
      this.renderAttendanceTable();
    });

    // If first time visit or not logged in, prompt user gently
    if (!this.auth.isLoggedIn()) {
      setTimeout(() => {
        this.openModal('simari');
      }, 700);
    } else {
      const user = this.auth.getUser();
      this.showToast(`Selamat datang kembali, ${user.name}! 🟢 Hadir Aktif`, 'info', 3500);
    }
  }

  bindEvents() {
    // Open modal buttons (Navbar & Body triggers)
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-action="open-login"]');
      if (target) {
        e.preventDefault();
        this.openModal('simari');
      }

      const attTarget = e.target.closest('[data-action="open-attendance"]');
      if (attTarget) {
        e.preventDefault();
        this.openModal('attendance');
      }
    });

    // Close button
    const closeBtn = document.getElementById('login-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    // Backdrop click
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });
    }

    // Modal Tabs
    const tabBtns = document.querySelectorAll('.auth-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // Quick Fill Mahasiswa Dimas Nugroho (Tekpend 25)
    const btnQuickDimas = document.getElementById('btn-quick-fill-dimas');
    if (btnQuickDimas) {
      btnQuickDimas.addEventListener('click', () => {
        const nimInput = document.getElementById('simari-nim-input');
        const nameInput = document.getElementById('simari-name-input');
        const prodiInput = document.getElementById('simari-prodi-input');
        if (nimInput) nimInput.value = '2510130110022';
        if (nameInput) nameInput.value = 'Dimas Nugroho';
        if (prodiInput) prodiInput.value = 'Teknologi Pendidikan - Kelas B (ULM)';
        this.highlightInput(nameInput);
      });
    }

    // Mahasiswa Submit Form
    const simariForm = document.getElementById('simari-login-form');
    if (simariForm) {
      simariForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nimInput = document.getElementById('simari-nim-input');
        const nameInput = document.getElementById('simari-name-input');
        const prodiInput = document.getElementById('simari-prodi-input');
        const purposeInput = document.getElementById('simari-purpose-input');

        try {
          const user = this.auth.loginAsSimari(
            nameInput ? nameInput.value : '',
            nimInput ? nimInput.value : '',
            prodiInput ? prodiInput.value : '',
            purposeInput ? purposeInput.value : ''
          );
          this.closeModal();
          this.showToast(`Presensi Berhasil! Selamat datang, ${user.name} (${user.idNumber}) 🎓`, 'success');
          if (window.audioManager) {
            window.audioManager.playStageTransition();
          }
        } catch (err) {
          alert(err.message || 'Mohon lengkapi data presensi');
        }
      });
    }

    // Random Name Generator for Guest
    const btnRandomName = document.getElementById('btn-random-guest-name');
    const guestInput = document.getElementById('guest-name-input');
    if (btnRandomName && guestInput) {
      btnRandomName.addEventListener('click', () => {
        guestInput.value = this.auth.getRandomGuestName();
        guestInput.focus();
        this.highlightInput(guestInput);
      });
    }

    // Guest Submit Form
    const guestForm = document.getElementById('guest-login-form');
    if (guestForm) {
      guestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameVal = guestInput ? guestInput.value : '';
        const catVal = document.getElementById('guest-category-input')?.value || '';
        const purpVal = document.getElementById('guest-purpose-input')?.value || '';
        const user = this.auth.loginAsGuest(nameVal, catVal, purpVal);
        this.closeModal();
        this.showToast(`Presensi Tamu Berhasil! Selamat datang, ${user.name}! 🌿`, 'success');
        if (window.audioManager) {
          window.audioManager.playStageTransition();
        }
      });
    }

    // Quick Anonymous Guest Entry
    const quickGuestBtn = document.getElementById('btn-quick-guest');
    if (quickGuestBtn) {
      quickGuestBtn.addEventListener('click', () => {
        const user = this.auth.loginAsGuest('Tamu Penjelajah');
        this.closeModal();
        this.showToast(`Masuk sebagai ${user.name}! 🌿`, 'success');
        if (window.audioManager) {
          window.audioManager.playStageTransition();
        }
      });
    }

    // Clear Attendance Log
    const clearAttBtn = document.getElementById('btn-clear-attendance');
    if (clearAttBtn) {
      clearAttBtn.addEventListener('click', () => {
        if (confirm('Apakah Anda yakin ingin mengosongkan riwayat daftar kehadiran?')) {
          this.auth.clearAttendanceLog();
          this.renderAttendanceTable();
          this.showToast('Riwayat daftar kehadiran telah dikosongkan.', 'info');
        }
      });
    }

    // Export Attendance CSV
    const exportAttBtn = document.getElementById('btn-export-attendance');
    if (exportAttBtn) {
      exportAttBtn.addEventListener('click', () => {
        this.exportAttendanceToCSV();
      });
    }
  }

  highlightInput(inputEl) {
    if (!inputEl) return;
    inputEl.style.transition = 'all 0.3s ease';
    inputEl.style.borderColor = 'var(--accent-sage)';
    inputEl.style.boxShadow = '0 0 12px rgba(82, 183, 136, 0.4)';
    setTimeout(() => {
      inputEl.style.boxShadow = '';
    }, 800);
  }

  switchTab(tabName) {
    const tabBtns = document.querySelectorAll('.auth-tab-btn');
    const tabPanes = document.querySelectorAll('.auth-tab-pane');

    tabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });

    tabPanes.forEach(pane => {
      pane.classList.toggle('active', pane.id === `auth-pane-${tabName}`);
    });

    if (tabName === 'attendance') {
      this.renderAttendanceTable();
    } else if (tabName === 'guest') {
      const guestInput = document.getElementById('guest-name-input');
      if (guestInput) setTimeout(() => guestInput.focus(), 100);
    } else if (tabName === 'simari') {
      const nameInput = document.getElementById('simari-name-input');
      if (nameInput) setTimeout(() => nameInput.focus(), 100);
    }
  }

  openModal(defaultTab = 'simari') {
    if (!this.modal) return;
    this.modal.classList.remove('hidden');
    this.switchTab(defaultTab);

    // Pre-fill if current user exists
    const user = this.auth.getUser();
    if (user) {
      if (user.role === 'guest') {
        const guestInput = document.getElementById('guest-name-input');
        if (guestInput) guestInput.value = user.name;
      } else {
        const nameInput = document.getElementById('simari-name-input');
        const nimInput = document.getElementById('simari-nim-input');
        const prodiInput = document.getElementById('simari-prodi-input');
        if (nameInput) nameInput.value = user.name;
        if (nimInput) nimInput.value = user.idNumber || '';
        if (prodiInput) prodiInput.value = user.institution || '';
      }
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.add('hidden');
    }
  }

  renderNavbarProfile() {
    const container = document.getElementById('user-profile-section');
    if (!container) return;

    const user = this.auth.getUser();

    if (!user) {
      container.innerHTML = `
        <button class="btn btn-secondary btn-sm nav-login-btn" data-action="open-login" title="Presensi Mahasiswa atau Masuk Tamu">
          <span class="icon">🎓</span> Presensi / Login
        </button>
      `;
      return;
    }

    const shortName = user.name.length > 15 ? user.name.substring(0, 13) + '..' : user.name;
    const isSimari = user.role === 'simari';

    container.innerHTML = `
      <div class="user-pill-dropdown" id="user-pill-dropdown">
        <button class="user-profile-pill" id="btn-user-profile-toggle" title="Presensi Aktif: ${user.name}">
          <span class="user-avatar-badge">${user.avatar || (isSimari ? '🎓' : '🐸')}</span>
          <div class="user-meta">
            <span class="user-name-display">${shortName}</span>
            <span class="user-badge-tag ${isSimari ? 'tag-simari' : 'tag-guest'}">${isSimari ? 'Mahasiswa' : 'Tamu'}</span>
          </div>
          <span class="user-dropdown-arrow">▾</span>
        </button>

        <div class="user-dropdown-menu hidden" id="user-dropdown-menu">
          <div class="dropdown-header">
            <div class="dropdown-user-avatar">${user.avatar || '🎓'}</div>
            <div class="dropdown-user-details">
              <div class="dropdown-name">${user.name}</div>
              <div class="dropdown-role">${user.roleLabel}</div>
              ${user.idNumber ? `<div class="dropdown-sub">${user.idNumber}</div>` : ''}
              <div class="dropdown-status-pill">🟢 Status: Hadir Aktif</div>
            </div>
          </div>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item" data-action="open-attendance">
            <span class="dropdown-icon">📋</span> Lihat Daftar Kehadiran (Buku Tamu)
          </button>
          <button class="dropdown-item" id="btn-edit-user-profile">
            <span class="dropdown-icon">✏️</span> Ganti Identitas / Presensi Ulang
          </button>
          <button class="dropdown-item text-danger" id="btn-logout-user">
            <span class="dropdown-icon">🚪</span> Keluar / Selesaikan Presensi
          </button>
        </div>
      </div>
    `;

    // Dropdown toggle logic
    const toggleBtn = document.getElementById('btn-user-profile-toggle');
    const menu = document.getElementById('user-dropdown-menu');
    if (toggleBtn && menu) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
      });

      document.addEventListener('click', () => {
        if (!menu.classList.contains('hidden')) {
          menu.classList.add('hidden');
        }
      });

      menu.addEventListener('click', (e) => e.stopPropagation());
    }

    // Edit profile action
    const editBtn = document.getElementById('btn-edit-user-profile');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        if (menu) menu.classList.add('hidden');
        this.openModal(user.role === 'simari' ? 'simari' : 'guest');
      });
    }

    // Logout action
    const logoutBtn = document.getElementById('btn-logout-user');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        if (menu) menu.classList.add('hidden');
        const oldName = user.name;
        this.auth.logout();
        this.showToast(`Sesi presensi ${oldName} telah selesai.`, 'info');
      });
    }
  }

  renderAttendanceTable() {
    const listContainer = document.getElementById('attendance-list-table');
    if (!listContainer) return;

    const logs = this.auth.getAttendanceLog();
    if (!logs || logs.length === 0) {
      listContainer.innerHTML = `
        <div class="att-empty-state">
          <div class="att-empty-icon">📋</div>
          <p class="att-empty-text">Belum ada riwayat presensi kehadiran tercatat.</p>
          <p class="att-empty-sub">Silakan isi form Mahasiswa atau Buku Tamu Guest untuk mencatat kehadiran Anda.</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = `
      <div class="att-table-wrapper">
        <table class="att-table">
          <thead>
            <tr>
              <th>Waktu</th>
              <th>Nama Mahasiswa / Tamu</th>
              <th>NIM / Identitas</th>
              <th>Status</th>
              <th>Keperluan</th>
            </tr>
          </thead>
          <tbody>
            ${logs.map((item, idx) => `
              <tr class="${idx === 0 ? 'row-latest' : ''}">
                <td class="col-time">${item.timeFormatted || '-'}</td>
                <td class="col-name"><strong>${item.name}</strong></td>
                <td class="col-id"><span class="att-id-pill">${item.idNumber}</span></td>
                <td class="col-role">
                  <span class="att-badge ${item.role === 'simari' ? 'badge-simari' : 'badge-guest'}">
                    ${item.role === 'simari' ? '🎓 Mahasiswa' : '👤 Tamu'}
                  </span>
                </td>
                <td class="col-purpose">${item.purpose || '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  exportAttendanceToCSV() {
    const logs = this.auth.getAttendanceLog();
    if (!logs || logs.length === 0) {
      alert('Belum ada data presensi untuk diunduh.');
      return;
    }

    const headers = ['ID Presensi', 'Waktu Masuk', 'Nama', 'NIM/Identitas', 'Tipe', 'Institusi/Kelas', 'Keperluan'];
    const rows = logs.map(item => [
      `"${item.id}"`,
      `"${item.timeFormatted}"`,
      `"${item.name}"`,
      `"${item.idNumber}"`,
      `"${item.roleLabel}"`,
      `"${item.institution}"`,
      `"${item.purpose}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Daftar_Kehadiran_Presensi_Metamorfosis_3D_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  showToast(message, type = 'info', duration = 3000) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-text">${message}</span>
      </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-fadeout');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 350);
    }, duration);
  }
}

// Instantiate globally
window.authManager = new AuthManager();
window.authUI = null;
