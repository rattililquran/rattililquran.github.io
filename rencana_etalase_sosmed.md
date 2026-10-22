# Rencana — Etalase Video Sosmed di Beranda

> Status: **SELESAI DIBANGUN** (22 Okt 2026), menunggu deploy. Keputusan pemilik di §8.

## 0. Ringkasan

| | Isi |
|---|---|
| **Apa** | Deretan thumbnail Reels Rattil di beranda. Diketuk → video diputar di halaman itu juga, pengunjung tidak dilempar keluar situs. |
| **Di mana** | Tepat **sebelum bagian "Pernah Merasakan Ini?"** (bab 01), yaitu langsung setelah hero. |
| **Sumber video** | Tetap di **Instagram** dan/atau **YouTube** Rattil. Situs hanya menyimpan daftar tautan dan gambar sampul kecil. Tidak ada file video di situs. |

## 1. Sumber video: Instagram atau YouTube

| | YouTube Shorts | Instagram Reels |
|---|---|---|
| Diputar di halaman | Ya. Pemutar YouTube stabil di dalam halaman. | Lewat sematan resmi Instagram; pemutar ikut menampilkan kepala akun dan tombol "Lihat di Instagram". Perilakunya ditentukan Meta, jadi **diuji dulu dengan satu tautan asli** di HP dan laptop. |
| Yang tersedia sekarang | 3 Shorts: *tartil tidak ribet*, *microteaching*, *buta huruf alquran* | Semua Reels yang sudah tayang. Tautannya dari Anda; pelacak konten belum mencatat satu tautan pun. |
| Daftar otomatis | Tidak (dikurasi manual) | Tidak. API Instagram untuk umum dihentikan Des 2024; jalur resminya butuh akun profesional, aplikasi Meta, dan token yang diperbarui tiap 60 hari. |

**Rekomendasi: campuran.** Tiap video diputar dari YouTube bila ada di sana (lebih stabil),
selain itu dari Instagram. Pengunjung tidak melihat bedanya: kartunya sama, pemutarnya sama-sama
terbuka di lapisan yang sama.

## 2. Pengalaman pengunjung

- **HP**: satu baris kartu yang digeser ke samping (scroll-snap), ±2 kartu terlihat sekaligus.
  **Laptop**: 4 kartu sejajar dengan tombol panah.
- **Kartu**: sampul 3:4 (seperti grid profil Instagram), ikon putar, judul singkat, durasi.
- **Diketuk** → lapisan pemutar 9:16 di tengah layar, video langsung main dengan suara.
  Ada tombol tutup (juga tombol Esc), geser atau panah ke video berikutnya, dan tautan
  "Buka di Instagram"/"Buka di YouTube" untuk menyukai dan berkomentar.
- **Ditutup** → pemutar dibongkar, suara berhenti.
- **Kartu terakhir**: "Ikuti @rattililquran" → profil Instagram.
- Tidak ada yang main sendiri saat halaman dibuka.

## 3. Kinerja dan privasi

- **Pola "sampul dulu"**: sebelum kartu diketuk, halaman tidak memuat skrip, iframe, atau cookie
  Instagram/YouTube sama sekali. Yang dimuat hanya gambar sampul WebP kecil, dan baru saat
  bagiannya hampir terlihat. Kecepatan beranda tidak berubah berarti.
- YouTube disematkan lewat `youtube-nocookie.com`.
- **Sampul memakai gambar kita sendiri** (`sampul-grid-3x4.png` yang sudah dicetak tiap Reels),
  juga untuk video YouTube: thumbnail otomatis YouTube untuk Shorts berbentuk mendatar dengan
  pita hitam, tidak serasi dengan kartu tegak.

## 4. Data dan perawatan

- Daftar Reels ditulis langsung sebagai HTML di `index.html`, bagian `#reels` (komentar `[EDIT]`
  menjelaskan setiap atribut). Kartu tetap tampil tanpa JavaScript, dan tanpa JavaScript kartu
  menjadi tautan biasa ke Instagram.
- Per Reels: `data-ig` (kode posting), `data-yt` (ID Shorts, bila ada), `data-judul`, durasi, sampul.
- Sampul WebP 300/600 px di `assets/images/reels/`, dibuat dari `sampul-grid-3x4.png` Reels-nya
  (7–34 KB per gambar).
- Durasi: video YouTube = durasi resmi YouTube (`lengthSeconds`); video Instagram = durasi videonya,
  dibulatkan ke bawah. Angka di pemutar YouTube bisa selisih ±1 detik antar-versi stream.
- **Alur kerja**: setiap Reels baru tayang, Claude menambahkan satu kartu (kode posting dibaca dari
  profil publik @rattililquran; ID Shorts dari kanal YouTube), lalu deploy saat pemilik mengetik "deploy".
- Reels sebelum 14 Okt 2026 tidak ditampilkan (keputusan pemilik).

## 5. Isi awal yang diusulkan (±6 video)

| Reels | YouTube | Catatan |
|---|---|---|
| 04 · Belajar tartil itu tidak ribet | ✓ | |
| 05 · Belajar, lalu mengajarkannya (microteaching) | ✓ | |
| 06b · 72,25% masih buta huruf Al-Qur'an | ✓ (perlu dipastikan: versi 06 atau 06b) | |
| 07 · Ingin mengajari anak mengaji | — | tautan IG |
| 01 · Rekaman dalil makhraj & sifat | — | memuat rekaman Syaikh Dr. Yahya Al-Ghautsani; izinnya diberikan untuk Instagram, perlu dipastikan mencakup situs |
| 08 · Thaha 2 / 09 · Asy-Syarh 5–6 | — | bila sudah tayang |

## 6. Langkah kerja

1. Keputusan Anda (§8).
2. Uji satu sematan Instagram asli di halaman uji: bisa diputar di HP dan laptop?
3. Bangun bagian etalase dan lapisan pemutar di `index.html`, mengikuti gaya beranda (tema terang dan gelap).
4. Sampul WebP dan data video.
5. Verifikasi:
   - lebar 390 dan 1280, tema terang dan gelap, tanpa overflow dan tanpa galat;
   - tidak ada permintaan ke Instagram/YouTube sebelum kartu diketuk;
   - keyboard: Tab, Enter, Esc;
   - Safari iPhone: video diputar di lapisan, bukan dipaksa layar penuh.
6. Tangkapan layar untuk Anda, lalu deploy setelah Anda mengetik "deploy".
7. Catat alur perawatan di `konten-sosmed/CLAUDE.md`.

## 7. Risiko

| Risiko | Penanganan |
|---|---|
| Meta mengubah perilaku sematan Instagram | Kartu tetap berfungsi sebagai tautan ke posting di Instagram |
| Posting dihapus atau diarsipkan | Tautan dicek setiap kali etalase diperbarui |
| Konten bertanggal kedaluwarsa | Kurasi §4 |

## 8. Keputusan pemilik (22 Okt 2026)

1. **Posisi**: sebelum bagian "Pernah Merasakan Ini?".
2. **Sumber**: campuran. Diputar dari YouTube bila ada (Reels 04, 05, 06b), selain itu dari Instagram.
3. **Isi**: semua Reels **sejak rekaman Syaikh Dr. Yahya Al-Ghautsani (14 Okt 2026)**; Reels sebelumnya tidak ditampilkan.
   Saat ini 8 Reels: 01, 04, 05, 06b, 07, 02 (versi bersuara), 09, 10.
4. **Reels 01**: izin rekaman Syaikh mencakup penayangan di situs.

Catatan uji (22 Okt): sematan Instagram memutar video di dalam halaman dengan suara (diuji pada
Reels lama), tetapi tanpa autoplay, sehingga pengunjung mengetuk tombol putar Instagram sekali lagi.
Daftar posting dibaca dari profil publik @rattililquran; pelacak konten belum mencatat tautannya.
