/**
 * DATA METAMORFOSIS KATAK (e-BIOLOGI & TEKNOLOGI PENDIDIKAN)
 * Berdasarkan siklus 6 fase: Telur -> Berudu -> Berudu 2 Kaki -> Berudu 4 Kaki -> Katak Muda -> Katak Dewasa
 */

const STAGES_DATA = [
  {
    id: "telur",
    index: 0,
    title: "1. Fase Telur (Ovum)",
    subtitle: "Awal Kehidupan Sang Amfibi",
    latinName: "Ovum Amphibiorum",
    duration: "1 - 3 Minggu",
    respiration: "Difusi Membran / Yolk Gelatin",
    diet: "Cadangan Kuning Telur (Yolk)",
    habitat: "Permukaan Perairan Tenang / Melekat pada Tanaman Air",
    modelColor: "#e2e8f0",
    badgeColor: "#38bdf8",
    modelFileName: "telur.glb",
    summary: "Katak betina mengeluarkan ratusan hingga ribuan telur di air tawar yang tenang. Telur diselimuti lapisan gelatin berlendir bening yang berfungsi melindungi embrio dari predator, infeksi jamur/bakteri, dan menjaga kelembapan.",
    narration: "Fase pertama adalah Telur Katak. Induk katak meletakkan ratusan butir telur di perairan yang tenang. Setiap telur diselubungi kapsul lendir bening yang kenyal dan tebal. Lendir ini mengembang di dalam air untuk melindungi embrio hitam dari predator serta menjaga suhu dan kelembapan. Di dalam lendir ini, embrio berkembang selama satu hingga tiga minggu sebelum akhirnya siap menetas.",
    morphology: [
      { label: "Bentuk Fisik", value: "Bulatan gelatin bening transparan dengan titik hitam (embrio) di tengah" },
      { label: "Lapisan Pelindung", value: "Kapsul gelatin hidrofilik penyerap air" },
      { label: "Jumlah Telur", value: "Sekitar 1.000 hingga 4.000 butir per kelompok" },
      { label: "Adaptasi Kritis", value: "Mengapung di perairan hangat kaya oksigen dan tersamar dari pemangsa" }
    ],
    hotspots: [
      {
        id: "hs-telur-1",
        label: "Lendir Gelatin",
        position: { x: 0, y: 0.6, z: 0.6 },
        title: "Kapsul Lendir Hidrofilik",
        description: "Lapisan gelatin elastis yang menyerap air untuk meredam getaran benturan, mencegah dehidrasi, dan menangkal bakteri."
      },
      {
        id: "hs-telur-2",
        label: "Embrio (Zigot)",
        position: { x: 0.4, y: 0.2, z: 0.2 },
        title: "Inti Embrio Hitam",
        description: "Sel zigot yang terus membelah (cleavage) dan berkembang menjadi larva amfibi, menyerap nutrisi dari kantung kuning telur."
      },
      {
        id: "hs-telur-3",
        label: "Tanaman Air",
        position: { x: -0.7, y: -0.4, z: 0 },
        title: "Vegetasi Penyangga",
        description: "Kelompok telur menempel pada ganggang atau batang teratai agar tidak terbawa arus air ke tempat yang berbahaya."
      }
    ],
    didYouKnow: "Lendir telur katak memiliki rasa yang tidak disukai oleh sebagian besar ikan predator, menjadikannya perisai pertahanan kimiawi alami!"
  },
  {
    id: "berudu",
    index: 1,
    title: "2. Fase Berudu / Kecebong",
    subtitle: "Larva Akuatik Berenang Bebas",
    latinName: "Larva Anura (Tadpole)",
    duration: "3 - 5 Minggu",
    respiration: "Insang Luar Berbulu (External Gills)",
    diet: "Herbivora (Alga, Lumut, Mikroalga Air)",
    habitat: "Kolam / Perairan Dangkal yang Tenang",
    modelColor: "#22c55e",
    badgeColor: "#10b981",
    modelFileName: "berudu.glb",
    summary: "Setelah menetas, muncullah berudu tanpa kaki dengan tubuh memanjang menyerupai ikan kecil. Berudu hidup 100% di air, memiliki ekor pipih untuk berenang lincah, serta insang luar berbulu halus untuk menyerap oksigen terlarut.",
    narration: "Fase kedua adalah Berudu atau Kecebong. Setelah menetas, berudu hidup seutuhnya di dalam air seperti ikan kecil. Pada fase awal ini, berudu belum memiliki kaki sama sekali. Mereka bernapas dengan sepasang insang luar berbulu dan menggerakkan ekor pipihnya yang berotot untuk berenang cepat. Mulut berudu dilengkapi paruh tanduk mikro untuk mengerok lumut dan alga di dasar air.",
    morphology: [
      { label: "Bentuk Tubuh", value: "Kepala dan perut bulat menyatu (streamlined), ekor pipih panjang bersirip" },
      { label: "Alat Gerak", value: "Ekor fleksibel dengan sirip dorsal dan ventral transparan" },
      { label: "Sistem Pernapasan", value: "3 pasang insang luar berbulu halus kaya pembuluh darah kapiler" },
      { label: "Sistem Pencernaan", value: "Saluran usus spiral panjang untuk mencerna selulosa tanaman alga" }
    ],
    hotspots: [
      {
        id: "hs-berudu-1",
        label: "Insang Luar",
        position: { x: 0.35, y: 0.25, z: 0.5 },
        title: "Insang Luar Berbulu (External Gills)",
        description: "Menyaring oksigen langsung dari molekul air yang mengalir di sekitar kepalanya."
      },
      {
        id: "hs-berudu-2",
        label: "Ekor Pipih",
        position: { x: -1.2, y: 0, z: 0 },
        title: "Ekor Bersirip Fleksibel",
        description: "Menghasilkan dorongan gelombang sinusoidal saat berenang menghindari ikan pemangsa."
      },
      {
        id: "hs-berudu-3",
        label: "Mulut Pengerok",
        position: { x: 0.9, y: -0.15, z: 0 },
        title: "Paruh Tanduk Pemakan Alga",
        description: "Gigi tanduk mikro (keratin) yang berputar untuk memotong alga dan fitoplankton air tawar."
      }
    ],
    didYouKnow: "Usus berudu berbentuk melingkar spiral seperti obat nyamuk karena serat tanaman alga memerlukan waktu cerna yang sangat panjang!"
  },
  {
    id: "berudu_2kaki",
    index: 2,
    title: "3. Fase Berudu 2 Kaki",
    subtitle: "Tumbuhnya Kaki Belakang Perkasa",
    latinName: "Tadpole with Hindlimbs",
    duration: "6 - 9 Minggu",
    respiration: "Insang Dalam & Transisi Paru-paru",
    diet: "Omnivora / Alga dan Detritus Organik",
    habitat: "Zona Dangkal Kolam Bervegetasi",
    modelColor: "#84cc16",
    badgeColor: "#84cc16",
    modelFileName: "berudu_2kaki.glb",
    summary: "Memasuki usia 6 sampai 9 minggu, sepasang kaki belakang mulai menonjol di pangkal ekor. Kaki belakang memiliki selaput renang awal. Insang luar mulai tertutup lipatan kulit (operkulum) menjadi insang dalam.",
    narration: "Fase ketiga adalah Berudu Dua Kaki. Pada tahap ini, metamorfosis fisik besar dimulai. Sepasang kaki belakang yang kuat mulai tumbuh di pangkal ekornya, lengkap dengan selaput renang tipis. Sementara itu, insang luar mulai tertutup lipatan kulit dan menjadi insang dalam. Paru-paru primitif mulai terbentuk di dalam rongga tubuhnya, mempersiapkan berudu menghirup udara atmosfer.",
    morphology: [
      { label: "Ekstremitas", value: "Sepasang kaki belakang dengan 5 jari berselaput renang tumbuh memanjang" },
      { label: "Perubahan Ekor", value: "Ekor masih panjang dan fungsional, bersinergi dengan kayuhan kaki belakang" },
      { label: "Pernapasan", value: "Lipatan operkulum menutupi insang; spirakel menyemburkan air keluar" },
      { label: "Pola Tubuh", value: "Mulai muncul pigmen bintik hijau-kecokelatan di punggungnya" }
    ],
    hotspots: [
      {
        id: "hs-b2k-1",
        label: "Kaki Belakang",
        position: { x: -0.3, y: -0.4, z: 0.6 },
        title: "Kaki Belakang Berselaput",
        description: "Memberikan kekuatan kayuhan tambahan saat berenang cepat melawan arus kecil."
      },
      {
        id: "hs-b2k-2",
        label: "Tunas Kaki Depan",
        position: { x: 0.35, y: -0.2, z: 0.45 },
        title: "Tunas Kaki Depan Tersembunyi",
        description: "Kaki depan sedang bertumbuh di balik dinding ruang insang dan belum menembus kulit luar."
      },
      {
        id: "hs-b2k-3",
        label: "Ekor Masih Utuh",
        position: { x: -1.3, y: 0.1, z: 0 },
        title: "Ekor Pengayuh Utama",
        description: "Tetap menjadi propulsi utama berenang sebelum kaki belakang matang seutuhnya."
      }
    ],
    didYouKnow: "Hormon tiroid (tiroksin) yang diproduksi kelenjar tiroid berudu adalah pemicu utama tumbuhnya kaki dan pemendekan ekor ini!"
  },
  {
    id: "berudu_4kaki",
    index: 3,
    title: "4. Fase Berudu 4 Kaki",
    subtitle: "Kaki Depan Menerobos Keluar",
    latinName: "Tadpole with 4 Limbs",
    duration: "9 - 10 Minggu",
    respiration: "Paru-paru Berkembang & Insang Memudar",
    diet: "Omnivora Aktif (Mikro-invertebrata & Alga)",
    habitat: "Tepian Air Dangkal / Dekat Batu Kolam",
    modelColor: "#a3e635",
    badgeColor: "#eab308",
    modelFileName: "berudu_4kaki.glb",
    summary: "Kaki depan kini telah menerobos keluar dari dinding tubuh. Tubuh berudu membesar dan semakin menyerupai bentuk katak. Ekornya masih panjang namun mulai mengendur dan nutrisinya perlahan diserap kembali ke tubuh.",
    narration: "Fase keempat adalah Berudu Empat Kaki. Sekarang, sepasang kaki depan telah menembus kulit tubuhnya, melengkapi sepasang kaki belakang yang sudah kokoh. Bentuk kepala mulai melebar dan mata mulai menonjol ke atas. Ekornya masih ada, tetapi mulai menunjukkan tanda-tanda penyerapan nutrisi. Berudu ini mulai sering naik ke permukaan air untuk mencoba bernapas menghirup udara langsung.",
    morphology: [
      { label: "Ekstremitas Lengkap", value: "4 tungkai (2 kaki depan pendek dengan 4 jari, 2 kaki belakang panjang dengan 5 jari)" },
      { label: "Bentuk Kepala", value: "Mulai memipih dan melebar, mata bergeser ke bagian atas kepala" },
      { label: "Perubahan Pola", value: "Bintik-bintik loreng hijau zaitun semakin tegas di sepanjang punggung" },
      { label: "Perilaku", value: "Sering mengapung di dekat dedaunan air dangkal untuk menghirup oksigen" }
    ],
    hotspots: [
      {
        id: "hs-b4k-1",
        label: "Kaki Depan",
        position: { x: 0.45, y: -0.35, z: 0.45 },
        title: "Kaki Depan Penyeimbang",
        description: "Berguna untuk menyeimbangkan posisi tubuh dan merangkak di dasar bebatuan air dangkal."
      },
      {
        id: "hs-b4k-2",
        label: "Mata Dorsal",
        position: { x: 0.65, y: 0.35, z: 0.3 },
        title: "Mata Menonjol ke Atas",
        description: "Mata bergeser ke atas kepala agar katak bisa melihat di atas permukaan air saat tubuhnya terendam."
      },
      {
        id: "hs-b4k-3",
        label: "Pangkal Ekor",
        position: { x: -0.6, y: 0.05, z: 0 },
        title: "Zona Awal Resorpsi Ekor",
        description: "Pembuluh darah dan jaringan otot ekor mulai diurai enzim litik untuk diserap kembali."
      }
    ],
    didYouKnow: "Kaki depan kiri biasanya muncul terlebih dahulu menerobos celah lubang spirakel pernapasan berudu!"
  },
  {
    id: "katak_muda",
    index: 4,
    title: "5. Fase Katak Muda (Katak Berekor)",
    subtitle: "Peralihan Menuju Daratan",
    latinName: "Froglet (Juvenile Frog)",
    duration: "10 - 12 Minggu",
    respiration: "Paru-Paru Aktif & Kulit Lembap",
    diet: "Karnivora Pemula (Jentik, Serangga Kecil, Nyamuk)",
    habitat: "Semi-akuatik (Batu Kolam, Daun Teratai, Daratan Lembap)",
    modelColor: "#4ade80",
    badgeColor: "#f97316",
    modelFileName: "katak_muda.glb",
    summary: "Katak muda atau froglet telah memiliki struktur tubuh katak sempurna namun masih menyisakan sisa ekor kecil. Ekor ini mengalami proses apoptosis (pemendekan nutrisi). Katak mulai berani naik ke daratan dan daun teratai.",
    narration: "Fase kelima adalah Katak Muda atau Katak Berekor. Tubuhnya kini sudah berwujud katak yang lincah dengan empat tungkai yang sangat berotot. Namun jika diperhatikan, masih ada sisa ekor pendek di bagian belakang tubuhnya. Ekor ini sedang diserap kembali oleh tubuh sebagai sumber energi protein tanpa perlu banyak makan. Paru-parunya sudah berfungsi penuh, dan katak muda mulai berani melompat naik ke daun teratai atau daratan basah.",
    morphology: [
      { label: "Bentuk Tubuh", value: "Struktur katak sejati, postur duduk tegak, dengan tunggul sisa ekor pendek" },
      { label: "Organ Pernapasan", value: "Paru-paru sejati telah aktif sepenuhnya; insang hilang tanpa bekas" },
      { label: "Kemampuan Lompat", value: "Otot paha belakang sangat elastis, mampu melompat dari air ke daun teratai" },
      { label: "Peralihan Makanan", value: "Beralih dari herbivora menjadi predator karnivora pemakan serangga lalat" }
    ],
    hotspots: [
      {
        id: "hs-km-1",
        label: "Sisa Ekor",
        position: { x: -0.85, y: -0.1, z: 0 },
        title: "Tunggul Ekor (Proses Apoptosis)",
        description: "Ekor menyusut pesat karena jaringan seluler diubah menjadi nutrisi energi pertumbuhan."
      },
      {
        id: "hs-km-2",
        label: "Mulut Lebar",
        position: { x: 0.75, y: 0.15, z: 0 },
        title: "Rahang Karnivora Lebar",
        description: "Rahang melebar dengan lidah elastis yang siap menyambar jentik nyamuk dan serangga kecil."
      },
      {
        id: "hs-km-3",
        label: "Kaki Lompat",
        position: { x: -0.4, y: -0.3, z: 0.55 },
        title: "Otot Paha Pelompat",
        description: "Otot femoris yang kuat memungkinkannya meloloskan diri dari air ke darat dalam satu lompatan."
      }
    ],
    didYouKnow: "Selama sisa ekornya memendek, katak muda hampir tidak perlu berburu makanan karena nutrisi dari sel-sel ekornya mencukupi kebutuhan energinya!"
  },
  {
    id: "katak_dewasa",
    index: 5,
    title: "6. Fase Katak Dewasa",
    subtitle: "Puncak Metamorfosis Sempurna",
    latinName: "Anura Adultus",
    duration: "12 - 16 Minggu+",
    respiration: "Paru-Paru & Kulit Basah (Kutaneus)",
    diet: "Karnivora Sejati (Serangga, Cacing, Jangkrik, Laba-laba)",
    habitat: "Daratan Lembap, Rawa, Kolam Air Tawar",
    modelColor: "#15803d",
    badgeColor: "#22c55e",
    modelFileName: "katak_dewasa.glb",
    summary: "Ekor telah lenyap 100%. Katak dewasa memiliki tubuh kokoh bercak hijau-kecokelatan, kantung suara (vokal) untuk bernyanyi, mata bulat berkedip dengan membran pengedip (niktitans), serta kaki belakang berselaput yang mampu melompat sejauh 20 kali panjang tubuhnya.",
    narration: "Fase keenam dan puncak metamorfosis adalah Katak Dewasa. Pada tahap ini, ekor katak telah hilang seutuhnya. Katak dewasa adalah hewan amfibi sejati yang dapat hidup di darat maupun di air. Katak bernapas menggunakan paru-paru dan permukaan kulitnya yang selalu basah berlendir. Di bawah dagunya terdapat kantung suara elastis yang dapat menggembung besar untuk mengeluarkan suara derik merdu guna memanggil pasangannya di malam hari.",
    morphology: [
      { label: "Bentuk Tubuh", value: "Katak tanpa ekor (Anura), tubuh kekar dengan bercak loreng kamuflase alami" },
      { label: "Kantung Suara", value: "Kantung vokal subgular di bawah tenggorokan yang menggembung saat bersuara" },
      { label: "Indra Penglihatan", value: "Mata besar dengan penglihatan binokular 360° dan membran niktitans transparan" },
      { label: "Selaput Renang", value: "Selaput penuh di antara 5 jari kaki belakang untuk renang bertenaga tinggi" }
    ],
    hotspots: [
      {
        id: "hs-kd-1",
        label: "Kantung Suara",
        position: { x: 0.55, y: -0.2, z: 0 },
        title: "Kantung Vokal (Gular Sac)",
        description: "Menggembung seperti balon beresonansi untuk memperkeras suara 'kwekkk-kwekkk' katak jantan."
      },
      {
        id: "hs-kd-2",
        label: "Membran Timpani",
        position: { x: 0.4, y: 0.25, z: 0.45 },
        title: "Gendang Telinga Luar (Tympanum)",
        description: "Lingkaran di belakang mata untuk menangkap gelombang getaran suara di udara dan air."
      },
      {
        id: "hs-kd-3",
        label: "Kulit Respirasi",
        position: { x: 0, y: 0.4, z: 0 },
        title: "Kulit Kutaneus Berlendir",
        description: "Kelenjar mukosa menjaga kulit tetap licin dan lembap agar oksigen larut dan masuk ke pembuluh darah."
      },
      {
        id: "hs-kd-4",
        label: "Kaki Belakang Kuat",
        position: { x: -0.65, y: -0.3, z: 0.65 },
        title: "Tungkai Lompat Z-Shape",
        description: "Tulang paha dan betis terlipat rapat siap meledakkan tenaga lompatan hingga 2 meter."
      }
    ],
    didYouKnow: "Katak tidak minum air melalui mulutnya! Katak menyerap semua air yang dibutuhkannya langsung melalui pori-pori kulit perutnya (pelvic patch)!"
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Apa fungsi utama lapisan lendir gelatin pada telur katak?",
    options: [
      "Memberi makanan utama bagi ikan predator",
      "Melindungi embrio dari benturan, bakteri, dan kekeringan",
      "Membuat telur tenggelam ke lumpur terdalam",
      "Mengubah telur langsung menjadi katak berkaki"
    ],
    answer: 1,
    explanation: "Lapisan lendir bening menyerap air untuk meredam goncangan dan melindungi embrio dari infeksi serta predator air."
  },
  {
    id: 2,
    question: "Alat pernapasan utama pada berudu/kecebong yang baru menetas adalah...",
    options: [
      "Paru-paru sejati",
      "Insang luar berbulu halus",
      "Kantung udara",
      "Trakea serangga"
    ],
    answer: 1,
    explanation: "Berudu awal hidup 100% di air dan menyerap oksigen melalui sepasang insang luar berbulu halus."
  },
  {
    id: 3,
    question: "Tungkai (kaki) manakah yang pertama kali muncul pada tubuh berudu?",
    options: [
      "Kaki depan bagian kanan",
      "Kaki depan bagian kiri",
      "Sepasang kaki belakang",
      "Semua kaki muncul bersamaan"
    ],
    answer: 2,
    explanation: "Sepasang kaki belakang tumbuh terlebih dahulu di pangkal ekor pada usia 6-9 minggu."
  },
  {
    id: 4,
    question: "Mengapa ekor katak muda (froglet) memendek dan akhirnya menghilang?",
    options: [
      "Putus karena digigit predator",
      "Diserap kembali oleh tubuh sebagai cadangan nutrisi (apoptosis)",
      "Rontok terkena sinar matahari",
      "Berubah bentuk menjadi lidah panjang"
    ],
    answer: 1,
    explanation: "Ekor diserap kembali oleh tubuh katak melalui proses apoptosis untuk menyediakan energi saat bertransisi ke darat."
  },
  {
    id: 5,
    question: "Organ apa yang digunakan katak dewasa untuk bernapas saat berada di darat dan air?",
    options: [
      "Paru-paru dan permukaan kulit basah berlendir",
      "Insang luar dan insang dalam",
      "Hanya menggunakan mulut",
      "Menggunakan selaput renang di kaki"
    ],
    answer: 0,
    explanation: "Katak dewasa bernapas menggunakan paru-paru dan respirasi kutaneus melalui kulitnya yang selalu basah berlendir."
  },
  {
    id: 6,
    question: "Apakah fungsi kantung suara elastis di bawah dagu katak jantan dewasa?",
    options: [
      "Menyimpan cadangan air minum saat kemarau",
      "Menyimpan serangga hidup sebelum ditelan",
      "Memperkeras suara panggilan kawin (croaking)",
      "Membantu katak melayang di udara saat melompat"
    ],
    answer: 2,
    explanation: "Kantung vokal (vocal sac) berfungsi sebagai kotak resonansi untuk melipatgandakan suara panggilan khas katak."
  }
];
