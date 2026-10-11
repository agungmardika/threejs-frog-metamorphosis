# LEMBAR KERJA MAHASISWA 7 (LKM 7)
## 3D OBJECT MENJADI LEARNING SIMULATION
*Mengembangkan interaksi agar peserta didik dapat mengamati, memanipulasi, dan memahami konsep*

---

### IDENTITAS MAHASISWA
- **Nama** : Dimas Nugroho
- **NIM** : 2510130110022
- **Kelas** : B
- **Mata Kuliah** : Pemrograman Komputer / Teknologi Pendidikan
- **Topik Proyek** : Simulasi Pembelajaran 3D Metamorfosis Katak (*Abstract-to-Concrete*)

---

### 1. Tujuan
Anda mampu mengembangkan 3D object hasil LKM 5–6 menjadi prototype *learning simulation* yang memiliki tujuan pembelajaran, alur penggunaan, interaksi utama, dan respons sistem yang jelas.

---

### 2. Tentukan Tujuan Belajar
Lengkapi satu tujuan pembelajaran yang dapat diamati:

| Pertanyaan | Jawaban |
| :--- | :--- |
| **Setelah menggunakan media, peserta didik mampu...** | Menganalisis tahapan transformasi struktur tubuh (pertumbuhan kaki, resorpsi ekor) dan transisi sistem pernapasan amfibi (insang luar $\rightarrow$ paru-paru dan kulit basah) dari fase telur hingga katak dewasa secara berurutan dan mandiri melalui manipulasi ruang 3D. |
| **Konsep yang harus dipahami...** | Mekanisme adaptasi morfologi dan fisiologi amfibi dari perairan (*aquatic*) menuju daratan (*terrestrial*) yang tergolong metamorfosis sempurna (*holometabola*), dipicu secara biokimiawi oleh hormon tiroksin, serta transisi pola makan dari herbivora alga ke karnivora serangga. |
| **Bukti bahwa peserta didik memahami konsep...** | Peserta didik mampu menjelaskan perbedaan organ pernapasan dan alat gerak pada tiap-tiap 6 fase daur hidup katak, menghubungkannya dengan adaptasi habitat, serta meraih skor evaluasi di atas 80 pada modul kuis biologi interaktif di dalam aplikasi. |

---

### 3. Tentukan Inti Simulasi
| Komponen | Keputusan Anda |
| :--- | :--- |
| **Fenomena/proses yang disimulasikan** | Siklus 6 fase metamorfosis katak secara kronologis: Telur (Ovum) $\rightarrow$ Berudu/Kecebong $\rightarrow$ Berudu 2 Kaki $\rightarrow$ Berudu 4 Kaki $\rightarrow$ Katak Muda $\rightarrow$ Katak Dewasa (*Anura adultus*). |
| **Objek utama** | Model 3D prosedural biologis katak pada setiap fase metamorfosis, lengkap dengan tekstur kulit berbintik (*spotted skin*), sirip transparan, tunas tungkai, dan daun teratai (*lily pad*) di atas air kolam. |
| **Parameter yang dapat diubah pengguna** | 1. Pemilihan fase daur hidup (Fase 1 s.d. 6 via *stepper timeline*).<br>2. Sudut kamera 360° (*orbit rotation*), *panning*, dan tingkat pembesaran (*zoom*).<br>3. Mode pengamatan: Mode Normal vs Mode Fokus 3D (*Fullscreen*).<br>4. Lingkungan biome: Waktu Siang (*Day*) vs Waktu Malam (*Night*).<br>5. Mode peraga rangka poligon (*Wireframe mode*).<br>6. Kontrol audio: Narasi suara, suara katak (*croak*), dan *ambient sound* kolam. |
| **Perubahan yang akan diamati** | Perubahan bentuk tubuh (munculnya tungkai belakang $\rightarrow$ tungkai depan $\rightarrow$ penyusutan ekor), pergantian warna kulit, pembaruan indikator morfologi, pernapasan, makanan, dan habitat, serta perubahan letak titik pin anatomi. |
| **Feedback/penjelasan yang muncul** | Narasi suara otomatis (*speech synthesis*), kartu spesifikasi biologi (durasi, respirasi, makanan, habitat), modal dialog penjelasan organ tubuh saat titik pin anatomi diklik, serta feedback kebenaran jawaban pada kuis biologi. |

---

### 4. Rancang Alur Pengalaman Belajar
| Tahap | Aktivitas Peserta Didik | Respons Media | Tujuan Pembelajaran |
| :--- | :--- | :--- | :--- |
| **Orientasi** | Membuka simulasi, melihat judul, membaca pengantar fase telur, dan memperhatikan lingkungan kolam 3D. | Sistem memuat scene 3D dengan pencahayaan lembut (*soft botanical*), memunculkan model kumpulan telur berlendir di atas tangkai tanaman, dan menampilkan kartu identitas fase 1. | Menumbuhkan rasa ingin tahu dan memberikan orientasi awal tentang titik awal kehidupan amfibi di perairan. |
| **Eksplorasi** | Menggeser kursor untuk memutar kamera 360°, melakukan zoom in untuk mengamati embrio di dalam lendir telur, dan mengaktifkan suara kolam. | Kamera Three.js merespons rotasi mouse secara halus; suara gemericik air kolam berputar lembut di latar belakang. | Mengenalkan ruang observasi 3D dan memberi pengalaman pengamatan spasial yang bebas dari berbagai sudut. |
| **Manipulasi** | Menekan tombol stepper fase (misal Fase 2: Berudu, Fase 3: Berudu 2 Kaki), serta mencoba tombol *Fokus 3D*. | Model 3D bertransisi mulus menampilkan bentuk berudu; panel samping menyesuaikan diri, atau menyembunyikan diri saat mode fokus aktif agar objek terlihat utuh. | Memberikan kendali aktif kepada siswa untuk mengatur laju pembelajaran dan membandingkan bentuk tubuh antar fase. |
| **Observasi** | Mengamati titik pin biru (*hotspot*) yang melayang di dekat bagian tubuh (seperti insang luar berbulu, paruh tanduk, atau kaki belakang) dan mengkliknya. | Titik pin memancarkan gelombang animasi; ketika diklik, modal informasi ilmiah muncul dengan penjelasan fungsi adaptasi organ tersebut. | Mengamati detail anatomi penting yang menghubungkan fitur fisik visual dengan fungsi biologis spesifik. |
| **Interpretasi** | Menekan tombol "Putar Narasi Suara" dan membaca panel "Ciri Morfologi & Adaptasi" serta kartu "Tahukah Kamu?". | Sistem membacakan narasi audio penjelas, menampilkan mekanisme hormon tiroksin dan perbedaan pernapasan insang ke paru-paru. | Menghubungkan fenomena fisik visual yang diamati dengan konsep abstrak biokimia dan adaptasi habitat amfibi. |
| **Kesimpulan** | Menekan tombol "Kuis Interaktif" untuk mengerjakan 6 butir soal pemahaman dan menekan "Ambil Screenshot" untuk tugas portofolio. | Media membuka modul kuis interaktif dengan umpan balik warna instan, menghitung skor evaluasi akhir, dan mengunduh tangkapan layar HD berlabel ilmiah. | Mengukur tingkat pemahaman konsep secara terukur dan menghasilkan bukti belajar konkret (*authentic learning evidence*). |

---

### 5. Kembangkan Fitur Satu per Satu dengan Vibe Coding
| Iterasi | Fitur yang Ditambahkan | Prompt Singkat | Hasil | Status |
| :---: | :--- | :--- | :--- | :---: |
| **1** | Integrasi Audio Narasi Suara & Efek Suara Alam | *"Tambahkan AudioManager dengan Web Speech API narasi bahasa Indonesia, tombol play/pause, dan Web Audio synthesizer untuk suara katak dan ambient kolam air."* | Tombol narasi suara dapat membacakan teks tiap fase dan suara alam kolam dapat dinyalakan/dimatikan. | [x] Berhasil |
| **2** | Sistem Pin Anatomi Hotspot 3D Interaktif | *"Tambahkan Three.js raycasting dan 3D billboard hotspot pins pada koordinat spesifik tiap model fase katak yang memunculkan popup dialog saat diklik."* | Hotspot pin biru melayang di atas organ utama dan menampilkan penjelasan anatomi mendalam saat diklik. | [x] Berhasil |
| **3** | Modul Kuis Evaluasi Biologi Interaktif | *"Buat FrogQuiz class dengan 6 butir soal pilihan ganda biologi amfibi, scoring bar, feedback instan benar/salah, dan konfeti perayaan kelulusan."* | Modal kuis interaktif lengkap dengan sistem penilaian dan animasi penjelas jawaban. | [x] Berhasil |
| **4** | Ekspor/Impor Model GLB & Screenshot HD | *"Tambahkan fitur ekspor model 3D ke file format .glb (glTF 2.0), upload file glb kustom, dan screenshot HD canvas dengan watermark laporan otomatis."* | Pengguna dapat mengunduh model .glb dan mengambil screenshot laporan berkualitas tinggi. | [x] Berhasil |
| **5** | Redesain UI/UX Soft Botanical & Mode Fokus 3D | *"UI/UX dirapikan dan disederhanakan lebih soft dengan tema botanical slate yang tidak menyilaukan mata, floating dock minimalis, dan tombol Fokus 3D."* | Tampilan visual jauh lebih bersih, modern, kontras warna lembut, dan siswa dapat beralih ke mode layar penuh 3D tanpa halangan. | [x] Berhasil |

---

### 6. Uji Setiap Fitur Setelah Ditambahkan
| Fitur | Expected (Seharusnya) | Actual (Yang Terjadi) | Status | Tindakan |
| :--- | :--- | :--- | :--- | :--- |
| **Navigasi Stepper 6 Fase** | Mengklik salah satu tombol fase akan mengganti model 3D dan seluruh panel informasi seketika. | Objek 3D berganti sesuai fase yang dipilih, kartu morfologi terupdate, dan indikator stepper aktif berpindah. | Berhasil | Dipertahankan |
| **Narasi Suara Pembelajaran** | Menekan tombol "Putar Narasi" akan menyuarakan penjelasan fase dalam bahasa Indonesia. | Web Speech API melafalkan narasi dengan intonasi jelas; tombol berubah menjadi status aktif. | Berhasil | Dipertahankan |
| **Pin Anatomi Hotspot** | Mengklik pin biru pada tubuh objek 3D akan membuka jendela modal penjelasan organ. | Raycaster mendeteksi klik pada pin dan modal penjelasan anatomi terbuka seketika. | Berhasil | Dipertahankan |
| **Kuis Interaktif** | Mengklik opsi jawaban pada kuis memberikan warna umpan balik instan (hijau/merah) dan menghitung skor. | Opsi jawaban langsung memberikan umpan balik visual dan skor terakumulasi hingga layar hasil akhir. | Berhasil | Dipertahankan |
| **Mode Fokus 3D (Fullscreen)** | Mengklik tombol "Fokus 3D" akan menyembunyikan panel samping sehingga objek 3D dapat diamati leluasa. | Side panel kiri dan kanan tersembunyi secara responsif, Three.js canvas meluas ke seluruh layar, dan tombol berubah menjadi "Keluar Fokus". | Berhasil | Dipertahankan |

---

### 7. Screenshot Prototype Versi Pengembangan
*Bukti visual prototipe simulasi hasil pengembangan dengan UI/UX yang telah dirapikan dan disederhanakan secara soft:*

#### Tampilan Fase 1: Telur (Ovum) — Soft Botanical UI
![Fase 1 Telur Soft UI](docs/screenshots/after_ui_stage1_telur_soft.png)

#### Tampilan Fase 2: Berudu / Kecebong — Insang Luar & Ekor
![Fase 2 Berudu Soft UI](docs/screenshots/after_ui_stage2_berudu_soft.png)

---

### 8. Jelaskan Perkembangan Produk
| Pertanyaan | Jawaban |
| :--- | :--- |
| **Apa yang berbeda dari produk LKM 6?** | Pada LKM 6 produk masih berupa objek 3D awal dengan antarmuka yang sangat padat (*cramped*), warna neon pekat yang menyilaukan, dan hanya memiliki tombol navigasi dasar. Pada LKM 7, produk telah berevolusi menjadi simulasi pembelajaran holistik dengan 6 fase lengkap, narasi suara interaktif, kuis evaluasi materi, kontrol pencahayaan halus (*soft daylight*), floating dock yang terpadu, serta mode Fokus 3D layar penuh. |
| **Fitur apa yang paling penting untuk pembelajaran?** | Fitur **Kombinasi Navigasi Stepper 6 Fase, Hotspot Pin Anatomi, dan Narasi Suara**. Fitur ini memungkinkan proses pembelajaran multi-sensori (visual 3D spasial, tekstual ilmiah, dan audio naratif) yang saling memperkuat. |
| **Bagaimana fitur tersebut membantu membuat konsep menjadi konkret?** | Konsep abstrak seperti perubahan organ pernapasan (difusi membran $\rightarrow$ insang luar $\rightarrow$ insang dalam $\rightarrow$ paru-paru dan kulit) serta apoptosis ekor dapat disaksikan transisinya secara visual 3D dari fase ke fase, tidak lagi hanya berupa hafalan bagan teks 2D di buku paket. |
| **Apa yang masih belum selesai?** | Fitur animasi transisi *morphing* mulus antar-geometri organ dalam (jantung amfibi dan paru-paru transparan) serta integrasi penyimpanan riwayat nilai kuis ke sistem *Learning Management System* (LMS). |

---

### 9. Output LKM 7
- [x] Prototype learning simulation yang dikembangkan dari 3D object.
- [x] Minimal satu alur pengalaman belajar yang jelas (Orientasi $\rightarrow$ Eksplorasi $\rightarrow$ Manipulasi $\rightarrow$ Observasi $\rightarrow$ Interpretasi $\rightarrow$ Kesimpulan).
- [x] Minimal dua fitur/interaksi yang mendukung tujuan pembelajaran (Audio Narasi, Hotspot Pin, Kuis Interaktif, Mode Fokus 3D).
- [x] Catatan prompt dan iterasi vibe coding.
- [x] Screenshot prototype versi pengembangan.

---

### 10. Kriteria Keberhasilan LKM 7
- [x] Produk tidak lagi hanya berupa 3D object, tetapi memiliki fungsi belajar yang komprehensif.
- [x] Interaksi berhubungan erat dengan konsep biologi yang dipelajari.
- [x] Alur pengalaman pengguna (*user learning journey*) dapat dijelaskan secara pedagogis.
- [x] Fitur dikembangkan secara bertahap dan diuji fungsionalitasnya di peramban web.
- [x] Mahasiswa dapat menunjukkan bukti perkembangan produk secara empiris.
