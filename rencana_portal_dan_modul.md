# Rencana — Portal Murid & Modul Belajar

> Status: **RENCANA** (belum dieksekusi).
> Peran: dua produk ini **bukan pelengkap**, tapi mesin konversi — tugasnya
> membuat calon murid berpikir "kalau saya daftar, saya masuk ke sistem yang
> serius", lalu menekan tombol daftar.
>
> **Semua isi §1 diverifikasi langsung dari produk aslinya** (login sebagai
> murid dummy pada 12 Sep 2026), bukan asumsi. Rencana ini menggantikan versi
> sebelumnya yang masih menebak-nebak fitur.

---

## 0. Ringkasan Eksekutif

| | Portal Murid | Modul Belajar |
|---|---|---|
| **Nama resmi** | Portal Manajemen Halaqah Rattililqur'an | Riyāḍat al-Ḥurūf — Modul Tahsin |
| **URL** | `portal.rattililquran.com` | `modul.rattililquran.com` |
| **Bentuk** | Aplikasi PWA, **wajib login** | Situs terbuka, **tanpa login** |
| **Akses** | Hanya murid — NIS diberikan pengajar | Siapa saja, gratis, non-komersial |
| **Ukuran nyata** | **21 halaman** murid, 6 grup menu, v8.15 | 6 blok materi, urutan belajar **5 level** |
| **Keberatan yang dijawab** | "Belajar online tidak kelihatan hasilnya" | "Latihan di rumah takut salah" |
| **Bukti** | **Tangkapan layar UI asli** | Pratinjau + daftar materi asli |
| **Halaman khusus** | `portal-modul.html` | `portal-modul.html` |
| **Hook di beranda** | 2 section ringkas sebelum `#pendaftaran` | idem |

### Strategi konversi: asimetri akses

Ini temuan paling penting dan harus jadi tulang punggung seluruh copy:

```
Modul  →  TERBUKA & GRATIS  →  calon murid bisa menilai kualitas dulu
Portal →  TERTUTUP (NIS)    →  jadi alasan konkret untuk mendaftar
```

Rangkaian pesannya:

1. **Coba** modulnya — gratis, tanpa daftar. (menghapus risiko)
2. **Lihat** bahwa materinya serius: bertahap, ada dalil, ada 5 level.
3. **Daftar** untuk dapat portal + materi yang terkunci untuk murid.

Dua materi di modul sudah bertanda *"khusus murid Rattililqur'an"*, dan
**Setoran Hafalan di portal terkunci (🔒)**. Ketiganya adalah pemicu konversi
yang sudah nyata — tinggal ditampilkan.

### Penempatan

```
#program        →  apa yang saya pelajari
Portal + Modul  →  sistem & perangkat yang saya dapat   ← 2 HOOK BARU
#pendaftaran    →  bagaimana cara mulai
```

Alasan ditaruh **sebelum** ajakan, karena pembaca mengambil keputusan tepat
setelah membaca alasannya.

---

## 1. Fakta Terverifikasi dari Produk Asli

### 1.1 Portal — fakta tingkat halaman publik

Judul: **Portal Manajemen Halaqah Rattililqur'an**.

- **Statistik di halaman login** (urutan asli):
  **370 MURID AKTIF · 34 HALAQAH · 11 PENGAJAR**
- Empat klaim resmi (kalimat asli, boleh dikutip):
  1. "Kelola sesi KBM & presensi realtime"
  2. "Laporan & raport otomatis per periode"
  3. "Latihan mandiri & progress murid"
  4. "Data terenkripsi & tersinkronisasi aman"
- **Tiga peran:** Murid · Guru · Admin (tab di kartu login).
- Login: **NIS / ID Pengguna + Password**; tertulis *"NIS diberikan pengajar
  Anda."*
- **Lupa password:** form → dikirim ke Admin via WhatsApp → reset manual
  "demi keamanan akun".
- **Bisa dipasang sebagai aplikasi (PWA)**, lengkap dengan panduan iOS Safari
  ("Tambahkan ke Layar Utama").
- Versi aplikasi: **v8.15**. © 2026.

> **Temuan konsistensi #1:** portal memakai **"Murid Aktif / Pengajar / 34
> Halaqah"**, sedangkan beranda memakai **"Murid / Guru / 34 Halaqah"** —
> angka sama, label berbeda, urutan berbeda. Harus diseragamkan (§10).

### 1.2 Portal — fakta dasbor murid (butuh login)

Sesi dijalankan dengan akun murid dummy. Isi yang **benar-benar terlihat**:

**Menu sidebar murid — 6 grup, 21 halaman:**

| Grup | Halaman |
|---|---|
| Utama | Beranda · Pengumuman · Saran & Masukan |
| Akademik & KBM | Riwayat KBM · Materi Level · Latihan Mandiri (PR) · Kajian At-Tibyan · **Setoran Hafalan 🔒** · Partner Belajar · Rattil Quiz |
| Penghubung | Modul Rattil · Khatamku · TarbiyahKu |
| Permainan | Petualangan (Game) · Rattil Run (Game) |
| Administrasi | Pembayaran & Infaq |
| Evaluasi | Assessment Mandiri · Raport · Insight Belajar · Charging |
| Pengaturan & Bantuan | Notifikasi · Mode Gelap · Panduan · Pengingat Kalender HP · Preferensi Notifikasi · Install Aplikasi (PWA) · Ganti Password · Tentang · Keluar |

**Isi Beranda yang terlihat:**

- Kepala: nama murid + keterangan "Lihat profil saya".
- **"Halaqah Berikutnya"** — nama halaqah + hari/tanggal + jam
  (contoh: *"Umar Bin Khattab · Lusa · 19:30–21:00"*) + doa singkat.
- **"Kehadiranku"** — dua cincin progres:
  - KBM Reguler: **25%** · "10 dari 40 sesi" · "28 sesi tersisa"
  - At-Tibyan: **5%** · "1 dari 20 sesi" · "19 sesi tersisa"
- **"Perjuanganku Bersama Al-Qur'an"** — kalender bulanan dengan titik
  penanda kegiatan per hari; memilih tanggal menampilkan detail kegiatan.
- **"Partner Belajar"** — grup kecil (mis. "Kelompok 1") berisi beberapa
  murid + status aktivitas masing-masing + tombol "+ Lapor Aktivitas
  Belajar".
- **"Micro Teaching"** — status sebagai observer; nilai praktik muncul
  setelah tampil.
- **"Pembayaran & Infaq"** — progres level ("1 dari 5 bulan") dan penanda
  tunggakan.
- **Notifikasi PWA** dengan penjelasan manfaat: pengingat KBM sehari
  sebelumnya, pengumuman penting saat aplikasi ditutup, raport baru
  dipublikasikan, deadline latihan mandiri.
- Dinyatakan: *"Notifikasi hanya dari portal Rattililqur'an. Tidak ada iklan.
  Bisa dimatikan kapan saja."*

**Kesan yang ditimbulkan:** ini bukan grup WhatsApp. Ada riwayat, ada raport,
ada kalender, ada partner belajar, ada permainan. Persis inilah yang harus
disampaikan di landing page.

### 1.3 Modul — fakta situs publik

Judul: **Riyāḍat al-Ḥurūf — Modul Tahsin**.
Subjudul: *"Latihan makhraj & sifat huruf hijaiyah — dengan dalil & tadrīb."*

Enam blok materi:

| Materi | Isi ringkas |
|---|---|
| Materi Rujukan | Landasan tajwid, makhraj, dan penjelasan sifat huruf |
| Huruf Hijaiyah | Latihan lisan makhraj dan sifat per huruf hijaiyah |
| Bank Mind Map Tajwid | Peta visual center-root: Sifat Huruf, Makhraj & hukum tajwid — mode belajar, quiz & cetak |
| Materi Microteaching | Bekal mengajar Al-Qur'an — **khusus murid Rattililqur'an** |
| Materi At-Tibyan | Ngaji kitab Adab Hamalatil Qur'an — **khusus murid Rattililqur'an** |
| Panduan Menggunakan Modul | Urutan belajar **5 level**, dari fondasi sampai hukum mad |

Fakta pendukung:

- **Gratis & non-komersial.** Kalimat asli: *"Modul ini dibuat bukan hanya
  untuk murid Rattililqur'an, tapi untuk kaum muslimin yang ingin belajar
  tahsin. Silakan dimanfaatkan sebaik mungkin, selama bukan untuk tujuan
  komersial."* → **tidak perlu harga, tidak perlu infak.**
- **Jujur soal status:** *"Modul ini masih dalam tahap penyusunan dan
  pengembangan."* → copy **dilarang** mengklaim modul sudah lengkap.
- Ada **form "Saran & Masukan"** → tanda materi dijaga.
- Ada **pencarian** materi.
- Menautkan **Portal Rattililqur'an** dan **KhatamKu**.
- Font: *Aksara Qur'an — KFGQPC HAFS, Uthmani Mushaf Madinah.* © 2026.

### 1.4 Fakta dari beranda (harus konsisten)

- Navbar: 7 tautan + tombol **Masuk Portal**; sudah ada tautan **Modul**.
- Footer menautkan **Masuk Portal** dan **Modul Belajar**.
- Klaim portal yang sudah dipakai: *"progres terpantau lewat portal
  digital"*, *"Dapatkan akun portal dan mulai mengikuti halaqah"*,
  *"Perkembangan belajar tetap terpantau melalui portal digital kami"*,
  dan "sebagian halaqah dilaksanakan secara daring".
- Statistik beranda: **370 Murid · 11 Guru · 34 Halaqah**.

---

## 2. Aturan Kejujuran & Privasi

### 2.1 Boleh diklaim

Semua di §1, karena diambil dari produk aslinya.

### 2.2 Dilarang diklaim

- Fitur yang tidak ada di §1 (mis. chat guru–murid, bank soal, akses wali).
- Modul "lengkap", "final", atau "5 level selesai" — situsnya sendiri
  menyatakan masih disusun.
- Harga/infak modul — modul gratis dan non-komersial.
- Angka progres murid atau nilai tertentu yang dikarang.
- Testimoni baru.

### 2.3 Perlindungan data murid — WAJIB

Tangkapan layar portal diambil dari akun **dummy**, tetapi berisi nama murid
lain. Sebelum dipakai sebagai materi publik:

- [ ] **Wajib blur/sensor** semua nama murid selain pemilik akun dummy.
      Nama yang terlihat di Beranda (daftar Partner Belajar) **harus
      disensor.**
- [ ] Foto profil/avatar murid disensor atau diganti.
- [ ] Jangan menampilkan NIS lengkap, nomor HP, email, atau nominal tagihan.
- [ ] Jangan menampilkan penanda tunggakan pembayaran milik akun dummy
      secara menonjol (bisa dibaca sebagai "murid telat bayar").
- [ ] Simpan berkas asli tangkapan layar **di luar repo publik**; hanya versi
      tersensor yang masuk `assets/`.
- [ ] Minta izin pemilik produk sebelum mempublikasikan tangkapan layar.

### 2.4 Aturan data ilustrasi

Bila ada bagian yang harus digambar ulang (bukan tangkapan layar asli):

- Beri caption kecil: **"Ilustrasi tampilan"**.
- Pakai nama netral/inisial.
- Pakai label kualitatif ("Lancar", "Perlu ulang") daripada persentase
  karangan.
- `aria-hidden="true"` bila murni dekoratif.

---

## 3. Arsitektur: 1 Halaman Khusus + 2 Hook

### 3.1 Mengapa halaman khusus

Portal punya **21 halaman** dan modul punya **6 blok materi**. Tidak mungkin
dijelaskan dengan jujur dalam satu section. Karena itu mengikuti pola
`beasiswa.html` yang sudah ada:

```
beasiswa.html   →  halaman khusus, gaya serupa
portal-modul.html → halaman khusus BARU
```

### 3.2 Peta halaman

```
index.html
  └─ #program
  └─ #portal-hook      ← HOOK 1 (ringkas, sebelum pendaftaran)
  └─ #modul-hook       ← HOOK 2 (ringkas, sebelum pendaftaran)
  └─ #pendaftaran
  └─ #angka … #faq … #kontak

portal-modul.html      ← HALAMAN KHUSUS (baru)
  └─ Hero: "Portal Murid & Modul Belajar"
  └─ Bagian Portal (detail + tangkapan layar UI asli)
  └─ Bagian Modul (detail + daftar materi + pratinjau)
  └─ Pemisah: "Apa yang Anda dapat setelah bergabung"
  └─ CTA ke #pendaftaran
```

### 3.3 Mengapa hook tetap perlu

Halaman khusus hanya diklik sebagian pengunjung. Hook memastikan **semua**
pembaca beranda tahu bahwa Rattil punya portal & modul — dan hook harus cukup
kuat untuk membuat orang mau mengklik "Lihat detail".

**Aturan hook:** ringkas, satu gagasan per hook, diakhiri tautan ke halaman
khusus **dan** ke `#pendaftaran`.

---

## 4. Hook 1 — «Portal Murid» (di beranda)

### 4.1 Pesan tunggal

> **Progres belajar Anda tercatat dan bisa dilihat sendiri — bukan cuma
> kata pengajar.**

### 4.2 Struktur (ringkas, satu layar)

| Zona | Isi |
|---|---|
| Kepala | Judul + 1 kalimat |
| Bukti | **1 tangkapan layar** Beranda portal (tersensor), dibingkai tipis |
| Poin | 3 kalimat, dipisah garis tipis (bukan kartu) |
| Kaki | `Lihat Portal Murid →` (ke halaman khusus) + nudge ke `#pendaftaran` |

### 4.3 Draf copy

- **Judul:** Portal Murid
- **Sub:** Setiap pertemuan tercatat: kehadiran, materi, latihan, dan raport.
  Murid bisa membukanya kapan saja — dan pengajar melihat catatan yang sama.
- **Poin:**
  - "Presensi dan sesi KBM tercatat realtime, bukan direkap ulang di akhir
    bulan."
  - "Raport disusun otomatis per periode, jadi angka yang Anda lihat sama
    dengan yang dilihat pengajar."
  - "Akun memakai NIS dari pengajar, dan bisa dipasang di layar utama HP
    seperti aplikasi."
- **Kaki:** `Lihat Portal Murid →` · "Belum punya akun? Lihat cara bergabung"

### 4.4 Arah desain

- **Macrostructure: Workbench** — produk sebagai isi utama.
- Tangkapan layar asli (bukan mock), bingkai tipis 1px `--c-line`, radius
  `--r-lg`. **Tanpa** chrome browser palsu.
- Gradien nada: pakai **biru** (senada `--c-primary`).

---

## 5. Hook 2 — «Modul Belajar» (di beranda)

### 5.1 Pesan tunggal

> **Coba dulu modulnya, gratis — supaya Anda bisa menilai sendiri sebelum
> memutuskan.**

### 5.2 Struktur

| Zona | Isi |
|---|---|
| Kepala | Judul + 1 kalimat |
| Bukti | Pratinjau materi (tangkapan layar modul asli) |
| Daftar | 3 dari 6 materi (sisanya di halaman khusus) |
| Penanda | "2 materi khusus murid" — pemicu konversi |
| Kaki | `Buka Modul →` (situs modul) + nudge ke `#pendaftaran` |

### 5.3 Draf copy

- **Judul:** Modul Belajar
- **Sub:** Riyāḍat al-Ḥurūf — latihan makhraj dan sifat huruf, dengan dalil
  dan latihan. Terbuka untuk siapa saja, termasuk yang belum bergabung.
- **Poin:**
  - "Disusun bertahap dengan panduan urutan belajar 5 level."
  - "Nama materi asli: Materi Rujukan, Huruf Hijaiyah, Bank Mind Map Tajwid."
  - "Sebagian materi khusus murid: Microteaching dan At-Tibyan."
- **Kaki:** `Buka Modul →` · "Ingin materi yang khusus murid? Lihat cara
  bergabung"

### 5.4 Arah desain

- **Macrostructure: Catalogue/Index** — daftar baris, bukan grid kartu.
- Gradien nada: **indigo** (senada `--c-primary-2`), supaya Hook 2 terasa
  berbeda dari Hook 1 tapi tetap satu keluarga.

---

## 6. Halaman Khusus `portal-modul.html`

### 6.1 Kerangka

| # | Bagian | Isi | Bukti |
|---|---|---|---|
| 1 | Hero | "Portal & Modul" + 1 paragraf + 2 tombol | — |
| 2 | Mengapa ini penting | 3 kalimat: masalah grup chat, progres tak terlihat, latihan tak terarah | — |
| 3 | Portal Murid | 6 grup menu + fitur inti | **tangkapan layar asli** |
| 4 | Sorotan portal | Kehadiranku · Raport · Partner Belajar · Halaqah Berikutnya · PWA | 4 tangkapan layar |
| 5 | Modul Belajar | 6 materi + 5 level + status jujur | tangkapan layar modul |
| 6 | Materi khusus murid | Microteaching · At-Tibyan · Setoran Hafalan 🔒 | ikon kunci |
| 7 | Apa yang didapat setelah daftar | ringkasan manfaat | — |
| 8 | CTA | `Daftar Sekarang` → `/#pendaftaran` | — |

### 6.2 Fakta yang ditampilkan (semua dari §1)

- Portal: presensi realtime · raport otomatis per periode · latihan mandiri &
  progress · data terenkripsi · PWA · pengingat KBM · pengumuman
- Modul: 6 nama materi asli · urutan 5 level · gratis non-komersial ·
  status "masih disusun" (jujur)

### 6.3 Yang ditambahkan ke navigasi

- Menambah **1 tautan navbar** ke halaman ini: **"Portal & Modul"**.
  (Saat ini navbar 7 tautan + 1 tombol. Menjadi 8 tautan — perlu diuji di
  lebar 1050–1200 px, dan pastikan menu mobile menanganinya.)
- Alternatif bila navbar terlalu penuh: jadikan tautan **"Modul"** yang sudah
  ada mengarah ke `portal-modul.html`, bukan ke situs modul.
  **Perlu keputusan** (§10).

### 6.4 Aturan tetap

- Ikut **sistem `index.html`**: token `--c-*`, `--grad`, `--r-lg`, `--sh-sm`,
  Plus Jakarta Sans, `--font-mono`.
- Satu `h1` saja.
- Konten inti **tidak boleh** bergantung pada JavaScript.

---

## 7. Aset Tangkapan Layar — SUDAH SIAP

**Status: SELESAI.** Enam tangkapan layar sudah diambil dari UI asli, disensor,
dan dikonversi ke WebP + JPG (lebar 1280 & 1920) — total **24 berkas,
2,9 MB**, tersimpan di `assets/images/`.

| Aset | Sumber | Isi | Sensor | Dipakai di |
|---|---|---|---|---|
| `Portal-beranda-*` | Portal · Beranda | Halaqah Berikutnya, kalender "Perjuanganku", Kehadiranku (25% & 5%) | 4 nama partner diblur | Hook 1, §3 |
| `Portal-insight-*` | Portal · Insight Belajar | Tren Adab & Kamera per bulan, Kategori Koreksi Tahsin | bersih | §4 |
| `Portal-latihan-*` | Portal · Latihan Mandiri | Kartu PR, koreksi ustadz, status tugas | bersih (tanpa nominal) | §4 |
| `Portal-masuk-*` | Portal · Halaman login | **370 / 34 / 11** + 4 kemampuan + PWA | **tanpa data pribadi sama sekali** | §3 |
| `Modul-daftar-materi-*` | Modul · Beranda | 6 materi + 2 bertanda "khusus murid" + status jujur | bersih | Hook 2, §5 |
| `Modul-isi-materi-*` | Modul · Pengantar Tahsin | Dalil Arab, tabel Lahn Jaliy/Khafiy, 4 langkah tadrib | bersih | §5 |

### 7.1 Cara sensor dilakukan (untuk jejak audit)

Redaksi dilakukan **di dalam DOM halaman sebelum gambar ditulis** — jadi
gambar mentah yang memuat data murid **tidak pernah menyentuh disk**:

1. Sesi murid asli dibuka (login lewat form sungguhan).
2. Skrip menandai elemen yang teksnya sama dengan nama murid lain, lalu
   menggantinya dengan `•••••••` dan memberi atribut penanda.
3. Atribut penanda itu di-blur 5px melalui CSS, baru kemudian
   `Page.captureScreenshot` dipanggil.
4. Tangkapan layar dipotong hanya ke area konten, dikonversi ke WebP/JPG.

### 7.2 Hasil pemindaian data sensitif

Pemindaian otomatis pada **13 halaman murid** untuk NIS, nomor HP, email, dan
nominal rupiah:

| Temuan | Hasil |
|---|---|
| Nama murid lain | 4 nama, **hanya di Beranda & Partner Belajar** — sudah diblur |
| NIS murid lain | **0** |
| Nomor HP | **0** |
| Email | **0** |
| Nominal rupiah | 4 nilai, **hanya di halaman Pembayaran & Infaq** — halaman ini **tidak dipakai** sebagai materi promosi |
| Nama murid pada 6 aset terpilih | **tidak ada** (semua nama ada di daftar Partner Belajar, di luar area yang dipotong) |

### 7.3 Yang perlu ditindaklanjuti

- [ ] **Konfirmasi pemilik produk** sebelum aset dipublikasikan.
- [ ] **Hapus akun murid dummy** yang dipakai untuk pengambilan tangkapan
      layar, setelah tidak diperlukan lagi. (ID sengaja tidak dicatat di
      dokumen ini.)
- [ ] Bila nanti mengubah tangkapan layar, **ulangi prosedur §7.1** — jangan
      memotret layar secara manual dengan akun asli.

### 7.4 Catatan teknis

- Format: WebP (utama) + JPG (fallback), lebar 1280 & 1920, mengikuti pola
  art-direction yang sudah dipakai `assets/images/`.
- Semua gambar **tanpa chrome browser/HP palsu** — langsung UI asli dengan
  bingkai tipis `--c-line`.
- Beri `loading="lazy"` pada semua gambar di bawah lipatan.
- **Kredit sumber:** keterangan kecil "Tangkapan layar portal Rattililqur'an"
  agar jelas ini bukan mock.


---

## 8. Penempatan & Penomoran

`sec-num` sekarang: `01` keresahan · `02` harapan · `03` tentang ·
`04` program · `05` pendaftaran · `06` angka · `07` faq · `08` kontak.

### Opsi A — Dua hook sebelum pendaftaran *(rekomendasi)*

```
01 keresahan · 02 harapan · 03 tentang · 04 program
05 Portal Murid · 06 Modul Belajar
07 pendaftaran · 08 angka · 09 faq · 10 kontak
```

- Kekuatan: alasan terkumpul tepat sebelum ajakan.
- Biaya: `#pendaftaran` turun 2 posisi; 4 `sec-num` digeser; 1 tautan navbar
  bertambah.

### Opsi B — Satu hook gabungan

- Portal + Modul jadi satu section `05`; sisanya geser 1. Lebih ringkas, tapi
  dua produk digabung jadi satu.

**Rekomendasi: Opsi A** — dua produk berbeda jenis, jangan disatukan.

---

## 9. Urutan Pengerjaan

1. ~~**Ambil & sensor tangkapan layar** (§7)~~ — **SELESAI**, 6 aset siap.
2. **Putuskan §10** (terutama label angka & nasib tautan navbar).
3. Bangun **Hook 1** (Portal) di beranda — pakai `Portal-beranda-*`.
4. Bangun **Hook 2** (Modul) di beranda — pakai `Modul-daftar-materi-*`.
5. Bangun **`portal-modul.html`** — pakai keenam aset.
6. Geser penomoran + perbarui navbar & footer di **kedua** berkas
   (`index.html` dan `beasiswa.html` bila tautannya berubah).
7. Verifikasi §11.

---

## 10. Keputusan yang Masih Terbuka

- [ ] **Label angka:** portal memakai "Murid Aktif / Pengajar / Halaqah";
      beranda memakai "Murid / Guru / Halaqah". Mana acuannya?
      *(Screenshot `Portal-masuk-*` ikut menampilkan versi portal — bila
      label diseragamkan, screenshot perlu diambil ulang.)*
- [ ] **Urutan angka:** portal "370 · 34 · 11" vs beranda "370 · 11 · 34".
      Diseragamkan?
- [ ] **Tautan navbar:** tambah "Portal & Modul", atau alihkan tautan
      "Modul" yang sudah ada ke halaman khusus?
- [ ] **Tampilkan KhatamKu & TarbiyahKu?** Keduanya ada di portal dan modul
      menautkan KhatamKu. Ikut dijelaskan atau cukup disebut sekilas?
- [ ] **Sebut angka pencapaian?** Portal punya PWA, 21 halaman, dan
      v8.15 — mana yang layak ditonjolkan?
- [ ] **Izin publikasi:** sudahkah pemilik produk menyetujui pemakaian
      tangkapan layar?
- [ ] **Akun dummy untuk tangkapan layar:** akan dihapus atau dibiarkan?
- [ ] **Penempatan:** setuju Opsi A?

---

## 11. Kriteria Selesai (Acceptance)

- [ ] **Nol error** — `node --check` JS inline lolos, konsol bersih.
- [ ] **Nol overflow horizontal** — `documentElement.scrollWidth` = lebar
      viewport di 320 / 360 / 375 / 390 / 414 / 768 / 1024 / 1280 px.
- [ ] **Tanpa JavaScript tetap terbaca** — konten inti dan angka statistik
      tidak bergantung pada `.in` atau `IntersectionObserver`.
- [ ] **Tema gelap & terang** — kontras lolos di keduanya.
- [ ] **`prefers-reduced-motion`** — animasi mati, konten tetap tampil.
- [ ] **Satu `h1` per halaman.**
- [ ] **Sensor privasi** lolos: tidak ada nama murid selain akun dummy,
      tidak ada NIS/nomor HP/email/nominal.
- [ ] **Caption** "Tangkapan layar" atau "Ilustrasi tampilan" ada di setiap
      gambar.
- [ ] **Tidak ada klaim** di luar §1.
- [ ] **Navbar mobile** tetap muat setelah tautan bertambah.
- [ ] **Kontras teks** minimal 4.5:1 untuk teks normal.
- [ ] **Tautan silang** berfungsi: beranda → halaman khusus → `#pendaftaran`.

---

## 12. Catatan Konsistensi Desain

**Dilarang**
- Kartu berisi ikon kotak, badge kapsul pastel, emoji sebagai ikon.
- Grid kartu seragam 3 kolom.
- Garis aksen tebal di sisi kiri kartu.
- Statistik, testimoni, atau harga yang dikarang.
- Chrome browser/HP palsu di sekitar tangkapan layar.
- Menampilkan nama atau data murid nyata.

**Dipakai**
- Tipografi sebagai hierarki; garis tipis 1px.
- Label kolom sekali saja di kepala daftar; metadata ditulis sebagai kalimat.
- Token yang sudah ada: `--c-ink*`, `--c-line`, `--c-card`, `--c-primary`,
  `--c-primary-2`, `--font-mono`, `--r-lg`, `--sh-sm`, `--dur`,
  `--ease-spring`.
- Gerak hanya pada `color` / `background` / `opacity` / `transform`, ≤ 300 ms,
  hormati `prefers-reduced-motion`.

**Sistem warna**
- Hook 1 (Portal): **biru** `--c-primary`.
- Hook 2 (Modul): **indigo** `--c-primary-2`.
- Satu keluarga gradasi, tanpa menambah palet baru.
