# LEMBAR KERJA MAHASISWA 9 (LKM 9)
## REFLEKSI DAN FINALISASI PORTOFOLIO
*Menyatukan seluruh perjalanan dari masalah pembelajaran hingga produk final*

---

### IDENTITAS MAHASISWA
- **Nama** : Dimas Nugroho
- **NIM** : 2510130110022
- **Kelas** : B
- **Mata Kuliah** : Pemrograman Komputer / Teknologi Pendidikan
- **Topik Proyek** : Portofolio Akhir Pengembangan Media Pembelajaran 3D Metamorfosis Katak (*Abstract-to-Concrete*)

---

### 1. Tujuan
Anda mampu mendokumentasikan proses pengembangan secara utuh, menjelaskan keputusan penting, merefleksikan penggunaan *computational thinking* dan AI, serta menyajikan produk final sebagai solusi terhadap masalah pembelajaran.

---

### 2. Rekonstruksi Perjalanan Proyek
| Tahap | Keputusan Utama Anda | Bukti |
| :--- | :--- | :--- |
| **LKM 1–2 — Masalah & Abstraksi** | Mengidentifikasi bahwa siswa SMP/SMA kesulitan memahami metamorfosis katak karena prosesnya berlangsung berminggu-minggu dan melibatkan transformasi organ dalam (insang ke paru-paru) yang tak terlihat. Memutuskan untuk memetakan konsep abstrak ke dalam representasi digital konkret 6 fase daur hidup. | Dokumen LKM 1 (Identifikasi Masalah & *Problem Statement*) dan LKM 2 (Tabel Pemetaan Konsep Abstrak-ke-Konkret). |
| **LKM 3–4 — Computational Thinking & Keputusan 3D** | Menerapkan 4 pilar *Computational Thinking* (Dekomposisi 6 fase, Pengenalan Pola transisi pernapasan & hormon tiroksin, Abstraksi fitur esensial, Model Input-Process-Output). Menetapkan bahwa representasi 3D interaktif mutlak diperlukan agar siswa dapat mengamati struktur dari 360° dan memanipulasi parameter waktu. | Dokumen LKM 3 (Model Konseptual IPO) dan LKM 4 (Uji Kesesuaian 3D & Argumen Pedagogis). |
| **LKM 5–6 — Object & Interaksi** | Membangun purwarupa 3D pertama menggunakan Three.js dan WebGL yang dapat dijalankan di peramban web lokal. Menambahkan interaksi fundamental berupa tombol pemilih fase daur hidup dan titik pin anatomi (*hotspot raycasting*) untuk menghubungkan bentuk fisik dengan nama organ. | Dokumen LKM 5–6, berkas `FrogModelFactory`, dan screenshot purwarupa awal katak 3D di browser. |
| **LKM 7 — Simulasi** | Mengembangkan objek tunggal menjadi *Learning Simulation* terpadu dengan 6 fase lengkap, alur pengalaman belajar 6 tahap (Orientasi hingga Kesimpulan), audio narasi suara berbahasa Indonesia, modul kuis biologi pilihan ganda, dan dukungan ekspor/impor format standar industri .GLB. | Dokumen LKM 7, berkas `js/data.js`, `js/audio.js`, `js/quiz.js`, dan screenshot prototipe versi pengembangan. |
| **LKM 8 — Testing/Debugging** | Melakukan pengujian sistematis pada seluruh fitur. Mendiagnosis masalah kelelahan visual (*harsh neon glare*), kepadatan toolbar, dan keterbatasan luas pandang 3D, lalu mengeksekusi redesain UI/UX *soft botanical* serta penambahan fitur *Mode Fokus 3D* layar penuh. | Dokumen LKM 8, matriks rencana pengujian, bug report komparatif, prompt debugging, dan uji regresi. |

---

### 3. Perbandingan Produk
| Tahap | Screenshot / Bukti | Perubahan Paling Penting |
| :--- | :---: | :--- |
| **Object Awal (LKM 5)** | Model dasar kubus/bola sederhana berwarna hijau polos di atas lingkaran teratai. | Keberhasilan pertama memunculkan objek 3D interaktif berbasis WebGL di browser yang dapat diputar dengan mouse. |
| **Object Revisi (LKM 5 Revisi)** | Model katak 3D dengan tekstur kulit loreng berbintik (*procedural spots*), mata berkantung, dan efek air. | Peningkatan fidelitas bentuk visual agar representasi morfologi biologis lebih menyerupai amfibi asli. |
| **Prototype Interaktif (LKM 6–7 Awal)** | `docs/screenshots/before_ui_phase1_cramped.png`<br>`docs/screenshots/before_ui_phase6_harsh.png` | Ditambahkannya navigasi fase 1-6, narasi suara, dan pin anatomi, namun antarmuka masih gelap neon pekat, sempit, dan melelahkan mata. |
| **Simulasi Versi Akhir (LKM 8–9 Final)** | `docs/screenshots/after_ui_stage1_telur_soft.png`<br>`docs/screenshots/after_ui_stage6_katak_soft.png`<br>`docs/screenshots/after_ui_focus_mode_3d.png` | **Transformasi UI/UX Modern Soft Botanical:** Kontras warna lembut (*sage & slate*), floating dock terpadu, mode observasi *Fokus 3D* layar penuh, modul kuis biologi berkonfeti, dan tata letak responsif yang sangat nyaman untuk belajar. |

---

### 4. Screenshot Produk Final
*Tangkapan layar resolusi tinggi produk akhir media simulasi 3D:*

#### 1. Tampilan Utama Fase Katak Dewasa (UI/UX Soft Botanical)
![Produk Final Katak Dewasa Soft UI](docs/screenshots/after_ui_stage6_katak_soft.png)

#### 2. Tampilan Mode Fokus 3D Layar Penuh (Observasi Tanpa Gangguan)
![Produk Final Focus Mode 3D](docs/screenshots/after_ui_focus_mode_3d.png)

#### 3. Tampilan Modul Kuis Evaluasi Biologi Interaktif
![Produk Final Kuis Modal Soft](docs/screenshots/after_ui_quiz_modal_soft.png)

---

### 5. Refleksi Computational Thinking

#### • Bagaimana *decomposition* membantu Anda memahami masalah?
*Decomposition* memecah masalah besar yang rumit—yakni metamorfosis katak yang berlangsung berminggu-minggu dengan puluhan perubahan fisiologis bersamaan—menjadi **enam komponen subsistem diskrit yang terukur**: (1) Telur dengan lapisan gelatin pelindung, (2) Berudu dengan insang luar dan ekor akuatik, (3) Berudu 2 kaki belakang, (4) Berudu 4 kaki, (5) Katak muda dengan ekor mereduksi, dan (6) Katak dewasa karnivora bernapas paru-paru/kulit. Pemecahan ini memungkinkan perancangan model 3D, struktur data JSON (`STAGES_DATA`), dan antarmuka yang terfokus pada setiap tonggak perkembangan amfibi.

#### • Pola apa yang paling penting dalam solusi Anda?
Pola yang paling fundamental adalah **pola keterkaitan sebab-akibat adaptasi habitat (*pattern recognition*)**:
1. *Pola Pernapasan*: Difusi membran $\rightarrow$ Insang luar berbulu $\rightarrow$ Insang dalam bertutup $\rightarrow$ Paru-paru & kulit lembap.
2. *Pola Penggerak*: Ekor bersirip tanpa kaki $\rightarrow$ Tumbuh tungkai belakang penendang $\rightarrow$ Tumbuh tungkai depan $\rightarrow$ Resorpsi ekor total.
3. *Pola Nutrisi*: Kuning telur $\rightarrow$ Herbivora pemakan alga dengan usus spiral panjang $\rightarrow$ Karnivora pemakan serangga dengan lidah lentur.
Pola ini diintegrasikan ke dalam antarmuka sehingga siswa selalu melihat hubungan sinkron antara bentuk fisik yang tampak dan fungsi biologisnya.

#### • Bagaimana *abstraction* membantu Anda menentukan apa yang perlu dimasukkan ke media?
*Abstraction* membantu memilah informasi esensial dan mengabaikan detail yang tidak relevan dengan tujuan pembelajaran. Saya membuang hal-hal sekunder seperti variasi spesies katak liar tertentu atau rumus biokimiawi seluler yang rumit, dan **memfokuskan simulasi pada indikator kunci yang dapat diamati siswa**: bentuk fisik organ, nama latin ilmiah, durasi fase, organ pernapasan aktif, jenis makanan, dan titik anatomi penting. Hal ini menjaga beban kognitif (*cognitive load*) peserta didik tetap ringan dan terarah.

#### • Bagaimana *computational thinking* memengaruhi desain produk?
*Computational thinking* mengubah media pembelajaran dari sekadar "tontonan animasi pasif" menjadi **"lingkungan eksplorasi interaktif berbasis sistem"**. Desain produk dirancang berbasis logika Input–Process–Output: pengguna memberikan input (memilih fase, memutar sudut pandang 360°, mengklik pin), sistem memproses logika keadaan (*state machine* dan *event listener*), dan menghasilkan output komprehensif berupa render 3D spasial, narasi audio, kartu fakta morfologi, serta evaluasi interaktif.

---

### 6. Refleksi Vibe Coding dan AI

#### • Apa yang dapat Anda kerjakan sendiri sebelum meminta bantuan AI?
Saya merumuskan konsep pedagogis, menentukan target kurikulum biologi, merancang skenario alur belajar 6 tahap (Orientasi hingga Kesimpulan), menyusun teks narasi ilmiah dan butir soal kuis, menentukan identitas visual (keinginan desain yang *soft*, ramah mata, dan modern), serta menguji langsung kelayakan setiap iterasi di browser.

#### • Bagaimana Anda memastikan hasil AI sesuai dengan kebutuhan Anda?
Dengan memberikan prompt yang memiliki batasan teknis dan pedagogis yang ketat (*contextual prompting*), memverifikasi struktur kode yang dihasilkan, serta menguji langsung setiap komponen di runtime peramban web (memeriksa Three.js console logs, menguji event klik, menguji respon audio, dan memvalidasi akurasi materi biologi).

#### • Pernahkah AI menghasilkan solusi yang salah/tidak sesuai? Apa yang Anda lakukan?
Pernah. Pada iterasi awal, AI menghasilkan antarmuka dengan warna hijau neon yang terlalu terang dan bayangan glow berlebihan yang membuat teks sulit dibaca dan menyilaukan mata. Selain itu, toolbar 3D sempat terpecah menjadi dua bar terpisah yang menutupi bagian tengah viewport 3D. Saya mengoreksinya dengan memberikan prompt perbaikan spesifik (*debugging prompt*): menginstruksikan AI menggunakan palet *soft botanical sage*, menggabungkan kontrol tombol ke dalam satu *floating dock* minimalis di sudut atas, dan menambahkan *Focus Mode* untuk memperluas canvas 3D.

#### • Apa keputusan penting yang tetap harus dibuat oleh manusia?
Keputusan esensial mengenai **relevansi pedagogis, estetika pengalaman pengguna (UX), dan validitas isi keilmuan**. AI dapat menuliskan kode JavaScript atau CSS dalam hitungan detik, tetapi hanya manusia yang dapat menilai apakah warna antarmuka nyaman dipandang selama jam pelajaran sekolah, apakah interaksi benar-benar mempermudah pemahaman siswa SMP/SMA, dan apakah materi biologi yang disajikan akurat sesuai kaidah ilmiah.

---

### 7. Refleksi Abstract-to-Concrete
Lengkapi pernyataan berikut secara utuh:

> “Masalah pembelajaran yang saya pilih adalah **kesulitan peserta didik SMP/SMA dalam memahami mekanisme daur hidup dan metamorfosis katak secara utuh**. Konsep yang sulit diamati adalah **proses transisi biologis bertahap yang memerlukan waktu berminggu-minggu serta perubahan organ dalam (insang menjadi paru-paru dan resorpsi ekor secara apoptosis)**. Saya mengonkretkannya melalui **simulasi web 3D interaktif berbasis Three.js dengan 6 fase metamorfosis, kontrol rotasi 360°, dan peraga tekstur fisik biologis yang nyata**. Interaksi yang paling membantu peserta didik adalah **kombinasi tombol stepper fase daur hidup dengan hotspot pin anatomi dan Mode Fokus 3D**, karena **siswa dapat memanipulasi waktu secara mandiri, mengamati perubahan bentuk tubuh tanpa terhalang panel teks, serta menghubungkan bagian fisik visual dengan fungsi adaptasi organ tubuh amfibi**. Berdasarkan evaluasi, media saya **sangat efektif** membantu menyelesaikan masalah awal karena **mengubah materi abstrak berbasis hafalan buku teks menjadi pengalaman belajar visual-spasial multi-sensori yang konkret, menyenangkan, dan dapat diuji pemahamannya melalui kuis biologi interaktif**.”

---

### 8. Dokumentasi Penggunaan AI
| Tahap | Peran AI | Keputusan / Validasi Saya |
| :--- | :--- | :--- |
| **Analisis Teknis** | Membantu merekomendasikan pustaka WebGL ringan (Three.js dan OrbitControls) yang dapat berjalan cepat di browser tanpa instalasi rumit. | Memilih arsitektur berbasis vanilla HTML5, CSS, dan JavaScript murni agar dapat di-host dengan mudah di XAMPP localhost atau server web sekolah mana pun. |
| **Pembuatan Object** | Menghasilkan kode prosedural Three.js (`FrogModelFactory`) untuk membangun geometri telur, berudu, dan katak beserta kanvas tekstur berbintik. | Menyesuaikan proporsi anatomis tiap fase agar akurat secara biologi (misal memastikan berudu fase awal belum memiliki kaki dan berudu 4 kaki masih memiliki sisa ekor). |
| **Penambahan Fitur** | Menuliskan implementasi raycasting untuk pin anatomi, integrasi Web Speech API narasi suara, dan struktur modul kuis `FrogQuiz`. | Mengatur teks narasi berbahasa Indonesia yang edukatif, menyusun 6 butir soal pilihan ganda yang relevan dengan kurikulum, dan menentukan alur feedback kuis. |
| **Debugging** | Membantu melacak galat CSS layout, memperbaiki perataan grid 3-kolom, dan menyesuaikan perhitungan ukuran canvas saat resize jendela. | Menguji langsung di browser pada berbagai resolusi layar untuk memastikan tidak ada teks yang terpotong atau tumpang tindih. |
| **Revisi / Finalisasi** | Mengeksekusi penulisan ulang stylesheet dengan palet warna *soft botanical slate*, membuat floating dock terpadu, dan menerapkan mode *Focus 3D*. | Memvalidasi bahwa antarmuka baru terasa lembut di mata, elegan, mudah dipelajari (*high usability*), dan siap dinilai dalam portofolio akademik LKM 7–9. |

---

### 9. Kriteria Keberhasilan LKM 9
- [x] Mahasiswa dapat menceritakan hubungan yang jelas antara masalah pembelajaran awal dan produk akhir yang dihasilkan.
- [x] Produk final dapat dipertanggungjawabkan secara teknis (kode bersih, performa ringan), isi (konsep biologi akurat), dan pedagogis (alur belajar jelas).
- [x] Bukti proses pengembangan tersusun secara kronologis dari LKM 1 hingga LKM 9 dengan dokumentasi screenshot lengkap.
- [x] Refleksi menunjukkan pemahaman mendalam tentang *computational thinking* dan pemanfaatan AI, bukan sekadar menceritakan rutinitas aktivitas.
- [x] Mahasiswa dapat menjelaskan batasan produk serta rencana pengembangan lanjutan di masa depan.

---

### PENUTUP PROYEK
#### Dari Masalah Pembelajaran Menjadi Media Pembelajaran 3D

Proyek ini telah berhasil menyelesaikan seluruh siklus pengembangan produk pembelajaran:

$$\text{MASALAH} \longrightarrow \text{KONSEP ABSTRAK} \longrightarrow \text{COMPUTATIONAL THINKING} \longrightarrow \text{3D OBJECT} \longrightarrow \text{INTERAKSI} \longrightarrow \text{SIMULASI} \longrightarrow \text{TESTING} \longrightarrow \text{EVALUASI} \longrightarrow \text{PRODUK FINAL}$$

Produk final **Simulasi 3D Metamorfosis Katak Interaktif** ini tidak hanya berfungsi sebagai visualisasi grafis, melainkan menjadi media pembelajaran mandiri yang mampu mengonkretkan fenomena biologis amfibi yang rumit menjadi pengalaman belajar yang interaktif, menyenangkan, dan berdaya guna tinggi.
