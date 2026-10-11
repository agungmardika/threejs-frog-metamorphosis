# LEMBAR KERJA MAHASISWA 8 (LKM 8)
## TESTING, DEBUGGING, DAN REVISI
*Menguji apakah produk bekerja sesuai rancangan dan memperbaiki masalah berdasarkan bukti*

---

### IDENTITAS MAHASISWA
- **Nama** : Dimas Nugroho
- **NIM** : 2510130110022
- **Kelas** : B
- **Mata Kuliah** : Pemrograman Komputer / Teknologi Pendidikan
- **Topik Proyek** : Pengujian Sistematis & Debugging Simulasi 3D Metamorfosis Katak

---

### 1. Tujuan
Anda mampu melakukan pengujian sistematis terhadap produk, mengidentifikasi perbedaan antara kondisi yang diharapkan dan kondisi aktual, mendiagnosis masalah, dan melakukan revisi.

---

### 2. Rencana Pengujian
| No. | Fungsi yang Diuji | Expected (Kondisi yang Diharapkan) | Actual (Kondisi Aktual) | Status |
| :---: | :--- | :--- | :--- | :---: |
| **1** | **Navigasi Siklus 6 Fase** | Mengklik salah satu fase pada stepper bar di bagian atas mengganti model 3D, judul fase, deskripsi, spesifikasi anatomi, dan titik pin seketika. | Model 3D dan seluruh kartu informasi berganti dengan transisi mulus sesuai fase yang dipilih. | **Berhasil** |
| **2** | **Hotspot Pin Anatomi 3D** | Mengklik titik pin biru yang melayang di atas tubuh model 3D membuka modal dialog deskripsi fungsi adaptasi organ tersebut. | Raycaster mendeteksi koordinat klik pin secara presisi dan memunculkan modal popup penjelasan anatomi. | **Berhasil** |
| **3** | **Audio Narasi & Efek Suara** | Menekan tombol narasi suara memutar audio penjelas fase dalam bahasa Indonesia; tombol katak dan kolam memicu efek suara amfibi. | Web Speech API menyuarakan teks narasi dengan lancar; Web Audio API menghasilkan suara katak dan ambient air. | **Berhasil** |
| **4** | **Modul Kuis Evaluasi Biologi** | Tombol "Kuis Interaktif" membuka modal kuis 6 butir; jawaban yang dipilih langsung memberi warna umpan balik dan menghitung akumulasi skor. | Modal kuis terbuka rapi, memberikan umpan balik visual instan (hijau/merah), dan menampilkan skor akhir dengan efek konfeti. | **Berhasil** |
| **5** | **Mode Fokus 3D (Layar Penuh)** | Menekan tombol "Fokus 3D" menyembunyikan panel samping kiri dan kanan sehingga canvas 3D meluas tanpa halangan untuk observasi mendalam. | Panel samping kiri dan kanan tersembunyi secara instan, canvas 3D meluas memenuhi layar, dan kamera Three.js otomatis menyesuaikan rasio aspek. | **Berhasil** |
| **6** | **Pencahayaan Biome & Kontrol Kamera** | Tombol reset kamera mengembalikan posisi sudut pandang; tombol siang/malam mengganti suasana pencahayaan tanpa menyilaukan mata. | GSAP menganimasikan posisi kamera kembali ke sudut ideal; pencahayaan bertransisi lembut antara siang dan malam. | **Berhasil** |

---

### 3. Bug Report
Pilih minimal dua masalah yang paling penting. Laporkan dengan format gejala–bukti–dugaan penyebab–perbaikan.

| Komponen | Bug 1 (Ergonomi Visual & Kelelahan Mata) | Bug 2 (Ketiadaan Mode Observasi Fokus 3D) |
| :--- | :--- | :--- |
| **Gejala yang terlihat** | Antarmuka pengguna terasa terlalu gelap dan pekat, dipenuhi border hijau neon menyilaukan yang membuat mata cepat lelah; tombol toolbar 3D bertumpuk dalam dua bar terpisah sehingga menutupi sebagian objek 3D di viewport. | Peserta didik yang ingin mengamati detail anatomi atau bentuk tubuh katak 3D merasa terhalang oleh dua panel samping (kiri dan kanan) yang terus terbuka, sehingga area pandang 3D menjadi sempit. |
| **Expected** | Tampilan antarmuka yang bersih, lembut (*soft botanical slate*), warna aksen yang menenangkan mata, serta tombol toolbar 3D yang terkonsolidasi rapi dalam satu floating dock di sudut atas. | Tersedia fitur "Fokus 3D" (*Focus Mode*) dengan tombol toggle praktis yang dapat menyembunyikan panel samping saat observasi 3D dan memunculkannya kembali saat diperlukan. |
| **Actual** | Border neon glow pekat (`rgba(52, 211, 153, 0.45)`), background sangat hitam kontras, dan toolbar 3D terpecah menjadi dua kotak tebal yang mengambang canggung di atas model. | Layout CSS terkunci statis pada 3 kolom (`330px 1fr 330px`) tanpa ada mekanisme pengguna untuk menyembunyikan panel teks samping. |
| **Bukti / Screenshot / Pesan Error** | `docs/screenshots/before_ui_phase1_cramped.png` dan `docs/screenshots/before_ui_phase6_harsh.png` (Tampilan awal sebelum redesain). | Area 3D terbatas hanya pada sepertiga bagian tengah layar laptop standar, membatasi keleluasaan rotasi 360°. |
| **Dugaan Penyebab** | Variabel CSS memakai saturasi warna tinggi dan bayangan neon tebal; markup HTML memisahkan tombol kamera dan audio ke dalam dua div `.view-controls-group` terpisah. | Belum ada kelas *state modifier* pada elemen `body` dan belum ada listener event toggle untuk merestrukturisasi grid CSS. |
| **Perbaikan yang Dilakukan** | 1. Merancang ulang `style.css` dengan palet soft sage (`#52b788`, `#74c69d`), border halus 1px transparan, dan frosted glass lembut.<br>2. Menyatukan tombol ke dalam `.floating-controls-dock` minimalis di sudut kanan atas.<br>3. Menyesuaikan intensitas cahaya Three.js agar lebih alami. | 1. Menambahkan tombol `<button id="btn-toggle-panels">` pada top navbar.<br>2. Menambahkan aturan CSS `.focus-mode .side-panel { display: none; }` dan `.focus-mode .main-workspace { grid-template-columns: 1fr; }`.<br>3. Menambahkan event listener toggle pada `app.js` disertai pemanggilan `sceneManager.onWindowResize()`. |
| **Hasil Setelah Perbaikan** | Antarmuka terasa sangat nyaman, modern, ramah untuk pembelajaran jangka panjang, dan ruang pengamatan 3D menjadi bersih tanpa gangguan visual. | Siswa dapat berpindah ke mode observasi 3D penuh dengan satu klik; simulasi melebar ke seluruh layar dengan sangat leluasa. |

---

### 4. Prompt Debugging

#### Prompt Debugging 1: Redesain Palet Warna dan Ergonomi UI
> *"Sederhanakan dan rapikan UI/UX style.css agar lebih soft. Ganti warna neon green yang menyilaukan dengan palet natural botanical sage (#52b788, #74c69d) yang tenang dan elegan. Kurangi ketebalan border glow menjadi hairline 1px lembut dengan efek frosted glass translucent, serta perbaiki spasi padding agar kartu informasi tidak berdesakan."*

#### Prompt Debugging 2: Konsolidasi Toolbar Kontrol 3D Menjadi Floating Dock
> *"Satukan tombol-tombol floating pada center-viewport (reset kamera, putar otomatis, siang/malam, wireframe, suara katak, suara kolam) ke dalam satu floating dock minimalis di pojok kanan atas. Berikan pembatas tipis (tool divider) dan hilangkan teks panjang pada tombol agar tidak menutupi objek 3D."*

#### Prompt Debugging 3: Pembuatan Fitur Mode Fokus 3D Layar Penuh
> *"Tambahkan fitur Mode Fokus 3D pada tombol navigasi atas. Ketika tombol diklik, sembunyikan panel samping kiri dan kanan secara instan sehingga viewport 3D mengambil 100% lebar layar, ubah teks tombol menjadi 'Keluar Fokus', dan panggil onWindowResize agar kamera Three.js memperbarui rasio aspek."*

---

### 5. Screenshot Sebelum dan Sesudah Perbaikan

| SEBELUM PERBAIKAN | SESUDAH PERBAIKAN |
| :---: | :---: |
| **Tampilan Awal (Neon Berlebih & Terjepit)**<br>![Sebelum Perbaikan Phase 1](docs/screenshots/before_ui_phase1_cramped.png)<br>*Panel sempit, kontras neon hijau keras, tombol bertumpuk.* | **Tampilan Sesudah (Soft Botanical UI)**<br>![Sesudah Perbaikan Phase 1](docs/screenshots/after_ui_stage1_telur_soft.png)<br>*Palet sage lembut, floating dock ringkas, nyaman di mata.* |
| **Tampilan Awal Fase 6 (Katak Dewasa)**<br>![Sebelum Perbaikan Phase 6](docs/screenshots/before_ui_phase6_harsh.png)<br>*Cahaya bawah air terlalu silau, tata letak kaku.* | **Tampilan Sesudah Fase 6 & Mode Fokus 3D**<br>![Sesudah Perbaikan Focus Mode](docs/screenshots/after_ui_focus_mode_3d.png)<br>*Mode Fokus 3D layar penuh, pencahayaan alami & tenang.* |

---

### 6. Regression Check
Setelah memperbaiki tata letak visual dan menambahkan mode fokus, periksa kembali fungsi yang sebelumnya sudah bekerja:

| Fungsi Sebelumnya | Masih Bekerja? | Bukti |
| :--- | :---: | :--- |
| **Pergantian Objek 3D Antar 6 Fase** | **Ya** | Stepper button 1 s.d. 6 tetap memicu pemuatan model 3D telur, berudu, berudu 2 kaki, berudu 4 kaki, katak muda, dan katak dewasa tanpa kendala. |
| **Rotasi Orbit 360° & Zoom Mouse** | **Ya** | `OrbitControls` Three.js tetap berputar mulus dan dapat di-zoom baik dalam mode normal maupun saat mode Fokus 3D aktif. |
| **Audio Narasi & Web Speech API** | **Ya** | Tombol narasi suara tetap membacakan teks berbahasa Indonesia dengan kontrol jeda (*pause*) dan bisu (*mute*). |
| **Pin Anatomi Hotspot & Modal Penjelasan** | **Ya** | Pin 3D tetap dapat diklik melalui raycaster dan menampilkan modal popup anatomi tanpa ada konflik gaya tampilan. |
| **Modul Kuis Interaktif & Scoring** | **Ya** | Modal kuis biologi tetap dapat dibuka, menjawab soal, menghitung persentase skor, dan memicu efek konfeti kelulusan. |

---

### 7. Keputusan Revisi
Tentukan apakah masalah membutuhkan kembali ke tahap desain atau cukup diperbaiki pada kode:

| Masalah | Kembali ke Desain? | Perbaikan Teknis? | Alasan |
| :--- | :---: | :---: | :--- |
| **Antarmuka visual terlalu silau dan melelahkan mata (*eye strain*)** | **Ya** | **Ya** | Memerlukan perumusan ulang sistem desain (*design tokens*) palet warna alam (*soft botanical*) pada tahap desain, yang kemudian dieksekusi secara teknis pada berkas `style.css`. |
| **Bidang pandang observasi 3D terhalang sidebar teks** | **Ya** | **Ya** | Membutuhkan perancangan alur interaksi baru berupa *Focus Mode* pada wireframe, lalu diimplementasikan melalui penambahan tombol toggle dan kelas CSS dinamis. |
| **Pencahayaan caustic bawah air membakar tekstur model** | **Tidak** | **Ya** | Masalah murni teknis pada nilai parameter `intensity` dan `color` dari `THREE.PointLight` pada kode `scene.js`, cukup diturunkan nilainya tanpa mengubah desain konseptual. |

---

### 8. Kriteria Keberhasilan LKM 8
- [x] Pengujian dilakukan berdasarkan skenario terstruktur, bukan hanya perasaan bahwa produk 'sudah berjalan'.
- [x] Bug dijelaskan secara sistematis dengan perbandingan *Expected vs Actual*.
- [x] Ada bukti empiris perbaikan visual (*Before vs After screenshots*).
- [x] Perbaikan tidak merusak fungsi yang sebelumnya sudah bekerja (*Regression test passed*).
- [x] Mahasiswa dapat menjelaskan penyebab masalah dan keputusan perbaikannya secara rasional dan terukur.
