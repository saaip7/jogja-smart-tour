
# Proyek Senior Project TI

## Kelompok Warlok 

| **Nama**                    | **NIM**            |
|-----------------------------|--------------------|
| Muhammad Grandiv Lava Putra | 22/493242/TK/54023 |
| Syaifullah Hilmi Ma'arij    | 22/497775/TK/54568 |
| Muhammad Farrel Akbar       | 22/492806/TK/53947 |

<p align="center">
Departemen Teknik Elektro dan Teknologi Informasi, Fakultas Teknik, Universitas Gadjah Mada
</p> 

## Nama Produk

Jogja Smart Tour – Platform Perencanaan Wisata Yogyakarta

## Jenis Produk 

Platform perencanaan wisata di Yogyakarta dengan *itinerary* perjalanan yang dipersonalisasi, menyesuaikan anggaran, serta mendapatkan rekomendasi destinasi terbaik sesuai preferensi mereka.

## Latar Belakang

Wisatawan yang berencana mengunjungi Yogyakarta seringkali menghadapi tantangan dalam menentukan destinasi, menyusun jadwal perjalanan, dan menghitung perkiraan biaya (transportasi, tiket, akomodasi, dan makan). Yogyakarta merupakan destinasi wisata terpopuler ke-2 di Indonesia dengan 16 juta kunjungan wisatawan pada 2023 (Dinas Pariwisata DIY, 2024). Proses manual yang memakan waktu dan kurangnya personalisasi membuat perencanaan perjalanan menjadi tidak efisien. 72% wisatawan mengeluhkan kesulitan menyusun rencana perjalanan karena banyak pilihan destinasi yang kaya akan budaya, sejarah, dan alam (Survei Kemenparekraf, 2023). Oleh karena itu, dibutuhkan sebuah solusi digital yang mengintegrasikan data dan analisis ulasan wisatawan untuk memberikan rekomendasi terbaik sesuai preferensi individu.

Tantangan utama yang dialami wisatawan Yogyakarta adalah sebagai berikut:

- Kurangnya Waktu untuk Riset

    Wisatawan sering kali harus menghabiskan banyak waktu untuk mencari destinasi, menyusun jadwal, dan memperkirakan biaya perjalanan secara manual. Proses ini menjadi tidak efisien mengingat banyaknya pilihan destinasi dan aktivitas yang ditawarkan di Yogyakarta. Menurut penelitian oleh Sarita Novie Damayanti (2015), distribusi kunjungan wisatawan mancanegara di Yogyakarta belum merata antara objek wisata di pusat dan pinggiran kota, yang menunjukkan perlunya integrasi dan informasi yang lebih baik untuk memudahkan perencanaan perjalanan. 

- Kendala Anggaran
    Menemukan rekomendasi perjalanan yang sesuai dengan anggaran tanpa melebihi batas pengeluaran merupakan tantangan bagi banyak wisatawan. Data dari Badan Pusat Statistik (2024) menunjukkan bahwa rata-rata pengeluaran wisatawan nusantara per perjalanan mencapai Rp2.570.000.

- Kurangnya Rekomendasi yang Dipersonalisasi
    Sebagian besar paket wisata yang ditawarkan di internet bersifat umum dan tidak menyesuaikan dengan preferensi individu seperti jenis wisata yang diminati (kuliner, alam, budaya, dll.). Penelitian oleh Sarita Novie Damayanti (2015) menekankan pentingnya integrasi antar objek daya tarik wisata di Yogyakarta berdasarkan preferensi wisatawan mancanegara untuk meningkatkan pengalaman wisata yang lebih personal dan memadai.

- Tidak Ada Integrasi   Navigasi & Estimasi Waktu
    
    Banyak wisatawan kesulitan dalam memperkirakan rute dan waktu perjalanan antar lokasi, yang dapat menyebabkan jadwal yang kurang optimal. Studi oleh Henny Widyastuti dkk. (2019) mengidentifikasi bahwa konektivitas antar destinasi wisata pantai di Yogyakarta dipengaruhi oleh faktor aksesibilitas, seperti kondisi infrastruktur jalan dan ketersediaan moda transportasi yang mempengaruhi kemudahan pergerakan wisatawan antar destinasi.

## Solusi 

Jogja Smart Tour hadir sebagai solusi digital yang menyederhanakan proses perencanaan wisata dengan memanfaatkan teknologi kecerdasan buatan dan komputasi awan. Aplikasi ini memungkinkan pengguna untuk dengan mudah menyusun itinerary perjalanan yang dipersonalisasi, menyesuaikan anggaran, serta mendapatkan rekomendasi destinasi terbaik sesuai preferensi mereka. Dengan fitur otomatisasi ini, wisatawan dapat menghemat waktu dalam riset dan merancang perjalanan yang lebih efisien.

Selain membantu dalam perencanaan, Jogja Smart Tour juga dilengkapi dengan estimasi biaya perjalanan yang mencakup akomodasi, transportasi, tiket masuk, dan konsumsi. Fitur ini memungkinkan wisatawan untuk menyesuaikan itinerary mereka agar tetap dalam batas anggaran yang diinginkan. Selain itu, aplikasi ini terintegrasi dengan peta dan navigasi untuk memberikan rute perjalanan terbaik berdasarkan estimasi waktu tempuh antar destinasi, sehingga wisatawan dapat mengoptimalkan waktu perjalanan mereka. Dengan adanya fitur ini, pengguna dapat menghindari rute yang kurang efisien dan mengatur jadwal perjalanan secara lebih optimal.

Untuk meningkatkan pengalaman pengguna, Jogja Smart Tour juga memanfaatkan AI dalam menganalisis ulasan wisatawan lain, sehingga dapat memberikan rekomendasi destinasi yang lebih akurat sesuai dengan preferensi pengguna. Selain itu, aplikasi ini menyediakan notifikasi dan pengingat terkait jadwal perjalanan berikutnya serta informasi cuaca real-time, membantu wisatawan dalam mempersiapkan perjalanan mereka dengan lebih baik. Dengan kombinasi fitur-fitur ini, Jogja Smart Tour menjadi asisten perjalanan pintar yang memudahkan wisatawan dalam menjelajahi keindahan Yogyakarta dengan lebih terstruktur, efisien, dan sesuai dengan kebutuhan mereka.

### Rancangan Fitur Solusi

| **Fitur**                                     | **Keterangan**                                                                                                                                                                                            |
|-----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Pembuatan Itinerary Otomatis & Personalisasi  | Pengguna dapat memasukkan tanggal perjalanan, durasi, budget, dan jenis wisata yang diminati. Kemudian, sistem akan menyusun jadwal perjalanan harian berdasarkan preferensi pengguna dengan panduan rute |
| Estimasi Biaya Traveling                      | Aplikasi memberikan perkiraan biaya total perjalanan, mencakup transportasi, tiket masuk, akomodasi, dan makan. Pengguna dapat menyesuaikan itinerary untuk tetap dalam batas anggaran                    |
| Integrasi Peta & Navigasi                     | Menggunakan API Google Maps atau semacamnya untuk memberikan panduan rute terbaik antara destinasi yang dipilih yang bertujuan untuk mengestimasikan waktu perjalanan antar lokasi yang paling efisien    |
| Ulasan & Rekomendasi Berbasis AI              | Menggunakan AI untuk menganalisis ulasan dari wisatawan lain dan memberikan rekomendasi destinasi terbaik sesuai preferensi pengguna                                                                      |
| Notikasi & Pengingat                          | Memberikan pengingat tentang jadwal perjalanan berikutnya dan informasi cuaca secara real-time untuk membantu perencanaan perjalanan                                                                      |

## Analisis Kompetitor

| **Kompetitor 1**                         | **Traveloka**                                                                                                                                                                                                                                                                                                                            |   |   |
|------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---|---|
| Jenis Kompetitor                         | **Direct Competitor** (kompetitor langsung di industri perjalanan dan penyusunan itinerary)                                                                                                                                                                                                                                                  |   |   |
| Jenis Produk                             | Platform pemesanan tiket perjalanan, hotel, dan aktivitas wisata                                                                                                                                                                                                                                                                         |   |   |
| Target Customer                          | Wisatawan yang sedang mencari tiket pesawat, hotel, dan paket wisata dalam satu platform                                                                                                                                                                                                                                                 |   |   |
| Kelebihan                                | Satu platform untuk semua kebutuhan perjalanan (tiket, hotel, transportasi, aktivitas wisata)                                                                                                                                                                                                                                            |   |   |
|                                          | Banyak promo dan diskon yang menarik                                                                                                                                                                                                                                                                                                     |   |   |
|                                          | Aplikasi mobile yang responsif dan mudah digunakan                                                                                                                                                                                                                                                                                       |   |   |
|                                          | Fitur “Traveloka Xperience” untuk rekomendasi aktivitas wisata                                                                                                                                                                                                                                                                           |   |   |
| Kekurangan                               | Tidak memiliki fitur Itinerary otomatis berbasis AI                                                                                                                                                                                                                                                                                      |   |   |
|                                          | Kurang dalam personalisasi pengalaman perjalanan berdasarkan preferensi pengguna                                                                                                                                                                                                                                                         |   |   |
|                                          | Estimasi biaya perjalanan hanya sebatas total biaya tiket & hotel, tanpa perhitungan transportasi lokal & makan                                                                                                                                                                                                                          |   |   |
| Key Competitive Advantage & Unique Value | Traveloka unggul dalam pemesanan tiket dan akomodasi yang seamless, tetapi kurang dalam penyusunan itinerary otomatis dan rekomendasi berbasis AI. Jogja Smart Tour menawarkan AI itinerary planner yang lebih personal berdasarkan budget, durasi, dan preferensi wisatawan, serta memberikan estimasi biaya perjalanan secara lengkap. |   |   |


| **Kompetitor 2**                         | **Google Travel**                                                                                                                                                                                                                                                                                                                                          |   |   |
|------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---|---|
| Jenis Kompetitor                         | **Direct Competitor** (platform penyusunan itinerary otomatis dan pencarian tempat wisata)                                                                                                                                                                                                                                                                 |   |   |
| Jenis Produk                             | Platform online untuk merencanakan perjalanan dengan rekomendasi destinasi, hotel, dan aktivitas                                                                                                                                                                                                                                                           |   |   |
| Target Customer                          | Wisatawan yang ingin menemukan destinasi baru berdasarkan lokasi mereka, orang yang mencari inspirasi perjalanan tanpa harus membuka banyak situs web, dan turis yang ingin melihat harga dan tren perjalanan di berbagai lokasi                                                                                                                           |   |   |
| Kelebihan                                | Integrasi langsung dengan Google Maps untuk peta dan navigasi rute                                                                                                                                                                                                                                                                                         |   |   |
|                                          | Menyediakan itinerary otomatis dengan tempat wisata terdekat                                                                                                                                                                                                                                                                                               |   |   |
|                                          | Bisa melihat harga hotel dan tren perjalanan berdasarkan waktu terbaik                                                                                                                                                                                                                                                                                     |   |   |
|                                          | Terhubung dengan pencarian Google untuk mendapatkan informasi tambahan                                                                                                                                                                                                                                                                                     |   |   |
| Kekurangan                               | Tidak memiliki estimasi total biaya perjalanan secara lengkap                                                                                                                                                                                                                                                                                              |   |   |
|                                          | Kurang dalam analisis ulasan wisatawan untuk rekomendasi personal                                                                                                                                                                                                                                                                                          |   |   |
|                                          | Tidak bisa menyesuaikan *itinerary* berdasarkan preferensi pengguna yang spesifik                                                                                                                                                                                                                                                                          |   |   |
| Key Competitive Advantage & Unique Value | Google Travel unggul dalam integrasi dengan Google Maps dan pencarian tempat wisata otomatis, tetapi masih kurang dalam fitur personalisasi itinerary. Jogja Smart Tour menawarkan AI itinerary planner yang lebih fleksibel, menyesuaikan rekomendasi berdasarkan analisis ulasan wisatawan, serta memberikan estimasi biaya perjalanan yang lebih rinci. |   |   |

| **Kompetitor 3**                         | **TravelSpend**                                                                                                                                                                                                                                                                                                        |   |   |
|------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---|---|
| Jenis Kompetitor                         | **Direct Competitor** (aplikasi pengelola anggaran perjalanan yang membantu wisatawan mengatur keuangan saat bepergian)                                                                                                                                                                                                |   |   |
| Jenis Produk                             | Aplikasi manajemen keuangan untuk perjalanan, membantu pengguna mencatat pengeluaran dan memperkirakan budget.                                                                                                                                                                                                         |   |   |
| Target Customer                          | Wisatawan yang ingin mencatat dan mengontrol pengelauran perjalanan mereka, backpackers atau solo travelers yang memiliki anggaran terbatas dan perlu mengelola pengeluaran dengan baik, dan turis yang bepergian dalam grup dan ingin membagi pengeluaran dengan teman atau keluarga.                                 |   |   |
| Kelebihan                                | Fitur pencatatan pengeluaran perjalanan yang mudah dan intuitif                                                                                                                                                                                                                                                        |   |   |
|                                          | Dapat digunakan secara offline, sehingga tetap bisa digunakan tanpa koneksi internet                                                                                                                                                                                                                                   |   |   |
| Kekurangan                               | Tidak memiliki itinerary generator otomatis untuk menyusun jadwal perjalanan                                                                                                                                                                                                                                           |   |   |
|                                          | Hanya berfokus pada pencatatan pengeluaran, tidak ada rekomendasi wisata atau prediksi biaya berdasarkan destinasi                                                                                                                                                                                                     |   |   |
|                                          | Tidak memiliki fitur AI untuk menganalisis biaya perjalanan atau memberikan estimasi anggaran sebelum bepergian.                                                                                                                                                                                                       |   |   |
| Key Competitive Advantage & Unique Value | TravelSpend unggul dalam manajemen keuangan perjalanan, tetapi tidak memiliki fitur AI itinerary generator dan estimasi biaya otomatis. Jogja Smart Tour menggabungkan kemampuan manajemen budget seperti TravelSpend, tetapi dengan AI yang bisa langsung memperkirakan biaya perjalanan sebelum wisatawan berangkat. |   |   |

## Metodologi SDLC

Metode Scrum digunakan karena metodologi ini memberikan fleksibilitas tinggi, yang memungkinkan penyesuaian berdasarkan feedback pengguna. Metodologi scrum mendukung pendekatan yang iteratif dan inkremental yang mana fitur yang dikembangan akan berada dalam sprint yang bertahap sehingga evaluasi dan perbaikan dapat dilakukan secara berkala.
Selain itu, metodologi ini mendukung kolaborasi tim yang kuat yang mana masing-masing anggota tim memiliki peran yang spesifik (Project Manager, UI/UX, Frontend Engineer, Backend engineer, Cloud Engineer, AI Engineer), serta mampu beradaptasi dengan cepat tanpa mengganggu keseluruhan proyek.

### Perancangan Tahap 1-3 SDLC 

#### Tujuan Produk 

Jogja Smart Tour bertujuan untuk mempermudah wisatawan merencanakan dan menjalankan perjalanan wisata di Yogyakarta dengan sistem penyusunan *itinerary* otomatis berbasis rekomendasi model AI, yang didampingi dengan API maps untuk memandu perjalanan mereka. 

#### Target User

    1. Wisatawan domestik dan mancanegara yang membutuhkan rencana perjalanan tanpa harus mencari informasi secara manual.
    2. Backpackers atau solo travelers yang membutuhkan fleksibilitas dalam perencanaan serta rekomendasi tempat wisata yang menarik.
    3. Wisatawan yang baru pertama kali ke Yogyakarta yang membutuhkan navigasi dan rekomendasi tempat wisata yang jelas. 

#### Use-Case Diagram

#### Functional Requirements

| **FR** | **Deskripsi**                                                                                                                                                                          |
|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| FR 1   | User Wisatawan dapat melihat rekomendasi destinasi wisata di Yogyakarta.                                                                                                               |
| FR 2   | User Wisatawan dapat melakukan Sign Up & Sign In dengan Google.                                                                                                                        |
| FR 3   | User Wisatawan dapat mengisi preferensi wisatanya dalam bentuk form jika sudah melakukan Sign Up & Sign In dengan Google.                                                              |
| FR 4   | Model AI harus menganalisis preferensi yang di-input user Wisatawan untuk memberikan rekomendasi itinerary dan biaya yang mencakup, misalnya transportasi, akomodasi, dan tiket masuk. |
| FR 5   | Sistem harus dapat menampilkan rencana perjalanan (itinerary) otomatis berdasarkan tanggal, durasi, budget, dan preferensi wisata pengguna.                                            |
| FR 6   | Sistem harus dapat memanggil API maps, misalnya Google Maps, untuk menampilkan navigasi dan estimasi waktu yang diperlukan wisatawan.                                                  |
| FR 7   | User Wisatawan dapat memilih untuk menyalakan notifikasi pengingat perjalanan berikutnya.                                                                                              |
| FR 8   | User Wisatawan dapat menyesuaikan itinerary & biaya jika dirasa belum cocok dengan agendanya.                                                                                          |

#### Lo-Fi Wireframe

#### Gantt-Chart Timeline
