# Rencana — Halaman Infaq (QRIS DANA + Mayar)

> Status: **TAHAP 1 DIBANGUN** (4 Nov 2026): halaman infaq.html dengan QRIS DANA + ucapan terima kasih (§12). Mayar menyusul.
> Prinsip: amanah, aman, bersih. Halaman tidak memegang data pembayaran apa pun; uang
> mengalir langsung dari pemberi ke akun resmi Rattil di DANA Bisnis atau Mayar.

---

## 0. Ringkasan

| | Isi |
|---|---|
| **Apa** | Halaman `infaq.html` + tautan "Infaq" di menu dan footer semua halaman situs |
| **Jalur 1** | **QRIS statis DANA Bisnis**: gambar QRIS di halaman; pemberi memindai dari aplikasi bank/e-wallet apa pun dan mengetik nominal sendiri |
| **Jalur 2** | **Mayar**: tombol menuju halaman donasi/pembayaran Mayar; pemberi memilih nominal & metode, bukti pembayaran otomatis |
| **Server** | Tidak ada. Situs tetap statis (GitHub Pages); tidak ada formulir, tidak ada skrip pihak ketiga |
| **Data pribadi** | Situs tidak mengumpulkan apa pun. Data pemberi (bila ada) hanya di DANA/Mayar |

---

## 1. Yang dibutuhkan dari pemilik (sebelum dibangun)

Akun keuangan dibuat dan diverifikasi oleh pemilik sendiri. Claude tidak membuat akun,
tidak memegang kata sandi, PIN, atau kunci API.

- [x] **Gambar QRIS statis** — diterima 4 Nov 2026 (Google Drive `QRISDANA.jpg`, 1064×1151 JPEG,
      potongan kode saja, tanpa kepala nama merchant). SHA-256 berkas asli:
      `ff142ad850933a439601c1c5bfbba82f20ad6ba4d18ab00c22e764b5554fef76`
- [x] **Isi kode QRIS** (dibaca dengan pembaca QR macOS, CRC sah `A29C`):

      | Tag | Isi |
      |---|---|
      | 01 | `11` = QRIS **statis** |
      | 26 | Penerbit `ID.DANA.WWW`, PAN `936009153035835101`, merchant ID `035835101`, kriteria `UMI` |
      | 51 | `ID.CO.QRIS.WWW`, **NMID `ID1026611450127`**, `UMI` |
      | 52 | MCC `8999` |
      | 59 | **Nama merchant `rattililquran, Service`** |
      | 60 / 61 | `Bondowoso` / `68261` |

      Isi lengkap (dipakai skrip pemeriksa §4.2 sebagai acuan):
      `00020101021126570011ID.DANA.WWW011893600915303583510102090358351010303UMI51440014ID.CO.QRIS.WWW0215ID10266114501270303UMI5204899953033605802ID5922rattililquran, Service6009Bondowoso6105682616304A29C`
- [x] **Nama merchant & NMID** di halaman ditulis persis: `rattililquran, Service` · NMID `ID1026611450127`.
- [ ] **Tautan halaman Mayar** (halaman donasi / galang dana atau tautan pembayaran) yang sudah aktif.
- [ ] **Nama penerima** yang tampil di halaman Mayar.
- [ ] **Peruntukan infaq** — satu kalimat yang bisa dipegang, mis. "operasional halaqah dan dana
      Program Beasiswa Penuh". Dana dipakai sesuai yang tertulis; bila peruntukan berubah, halaman diubah.
- [ ] **Cara laporan**: mis. rekap bulanan di Instagram/Channel WhatsApp (frekuensi + kanal).
- [ ] **Kontak konfirmasi**: nomor WA (bawaan: 0823-1699-3233 yang sudah dipakai situs).
- [ ] (Opsional) **Teks dalil** tentang infaq — disalin dari sumber dan dicek pengajar sebelum tayang.

---

## 2. Isi halaman `infaq.html`

Urutan dari atas ke bawah (gaya mengikuti `program.html`/`beasiswa.html`: tema terang/gelap,
`assets/portal-modul.css`, font lokal):

1. **Pembuka** — judul + satu paragraf: untuk apa infaq dipakai (dari §1). Tanpa target buatan,
   tanpa hitung mundur, tanpa kalimat mendesak.
2. **Kartu QRIS** (jalur tercepat)
   - Gambar QRIS ukuran cukup besar untuk dipindai dari layar laptop.
   - Di bawahnya teks: **nama merchant** dan **NMID** persis seperti di QRIS, dengan ajakan
     "Pastikan nama ini yang muncul di aplikasi Anda sebelum membayar."
   - Tombol **"Simpan gambar QRIS"** (`<a download>`): di HP, QRIS tidak bisa dipindai dari layar
     yang sama — simpan, lalu pilih "pindai dari galeri" di aplikasi bank/e-wallet. Langkah 1–2–3 singkat.
3. **Kartu Mayar** (untuk transfer VA / e-wallet / bukti otomatis)
   - Tombol "Infaq lewat Mayar" → tautan Mayar, dibuka di tab baru (`rel="noopener noreferrer"`).
   - Satu baris: metode yang tersedia **sesuai yang tampil di halaman Mayar Anda** (dicek saat
     membangun; tidak ditulis dari ingatan).
4. **Konfirmasi & laporan** — "Sudah berinfaq via QRIS? Kirim bukti ke WhatsApp (opsional)" +
   tombol WA berteks siap kirim; kalimat cara laporan (§1).
5. **Penerima resmi** — nama penerima di QRIS dan Mayar, plus peringatan: "Rattil hanya menerima
   infaq lewat dua jalur di halaman ini. Abaikan permintaan transfer dari nomor/rekening lain."

---

## 3. Arsitektur & alasan

- **Statis murni.** QRIS = gambar di repo; Mayar = tautan biasa. Tidak ada `fetch`, tidak ada
  formulir, tidak ada cookie.
- **Tanpa skrip/tombol sematan Mayar.** Mayar menawarkan "tombol donasi embeddable"; tidak dipakai
  di fase 1 supaya tidak ada kode pihak ketiga yang berjalan di domain rattililquran.com.
- **Tanpa daftar donatur / progres dana di situs** (fase 1). Butuh data dari Mayar (lihat §8).

---

## 4. Jalur QRIS DANA — rincian & pengaman

### 4.1 Fakta (sumber §11)
- QRIS statis dipakai berulang; pemberi mengetik nominal sendiri.
- NMID (National Merchant ID) diterbitkan setelah pendaftaran merchant disetujui.
- Biaya MDR QRIS ditetapkan Bank Indonesia dan dapat berubah — **tidak ditulis di halaman**; pemilik
  memeriksa angka terbaru di DANA Bisnis.

### 4.2 Pengaman QRIS (wajib sebelum tayang)
1. **Cocokkan isi kode, bukan hanya gambarnya.** Isi QRIS dibaca dengan pemindai (zbar/pyzbar),
   lalu diperiksa: nama merchant (tag 59), kota (tag 60), NMID, dan **CRC (tag 63) sah**.
   Hasilnya harus sama dengan data dari pemilik (§1).
2. **Gambar yang tayang**: berkas dari pemilik berupa potongan kode tanpa kepala resmi QRIS,
   jadi halaman menampilkan nama merchant & NMID sebagai teks di bawah kode (§2.2). Gambar
   dioptimasi tanpa mengubah isi: setelah dikompres (PNG/WebP), dipindai ulang dan isinya
   dibandingkan byte-per-byte dengan aslinya.
3. **Sidik berkas** (SHA-256 gambar final) dicatat di dokumen ini; setiap deploy, skrip pemeriksa
   (`alat/cek-infaq.sh`) memindai ulang gambar di repo dan menolak deploy bila isi QRIS berubah.
   Ini menangkap penggantian QRIS diam-diam (mis. akun GitHub disusupi).
4. Teks nama merchant & NMID di halaman ditulis manual dari §1 dan ikut dicocokkan skrip yang sama.

---

## 5. Jalur Mayar — rincian & pengaman

### 5.1 Fakta (sumber §11)
- Mayar punya fitur galang dana: target, doa donatur, portal donatur, kabar update, donasi anonim,
  data donatur & analitik di dasbor, dan QRIS di antara metode pembayaran.
- Webhook Mayar (`payment.received`, dst.) diatur di dasbor **Integration → Webhook**; dokumentasi
  resmi **tidak menyebut tanda tangan/token verifikasi**.
- Biaya transaksi tidak tercantum di halaman produk — pemilik memeriksa di halaman harga Mayar.

### 5.2 Pengaman Mayar
1. **Tautan diperiksa**: domain resmi Mayar, halaman aktif, nama penerima sesuai §1. Dicek lagi
   setiap deploy (skrip yang sama: kode HTTP 200 + domain cocok).
2. Tautan ditulis **langsung di HTML** (bukan dibentuk JavaScript), `target="_blank"
   rel="noopener noreferrer"`.
3. Tanpa parameter berisi data pribadi di URL.

---

## 6. Keamanan & kebersihan (daftar periksa)

| Ancaman / hal | Penanganan |
|---|---|
| QRIS diganti orang lain | §4.2 butir 1–3; akun GitHub pemilik memakai 2FA |
| Penipuan "atas nama Rattil" (nomor/rekening palsu) | Kalimat "hanya dua jalur ini" (§2.5) + halaman ini jadi rujukan resmi yang bisa dibagikan |
| Skrip pihak ketiga | Tidak ada (tanpa embed Mayar, tanpa analitik) |
| Data pribadi | Tidak dikumpulkan situs |
| Klaim keliru (biaya, metode) | Hanya menulis yang terlihat di akun/halaman resmi saat membangun |
| Kebersihan kode | Satu berkas HTML + CSS bersama yang sudah ada; gambar QRIS di `assets/images/infaq/`; tanpa pustaka baru |
| Aksesibilitas | Teks alternatif QRIS menyebut nama merchant; tombol ≥ 44 px; kontras terang/gelap |

---

## 7. Kepatuhan & amanah (dipastikan pemilik)

Bukan nasihat hukum; hal yang sebaiknya dipastikan sebelum tayang:
- Penghimpunan infaq/sedekah dari publik diatur, antara lain, UU No. 23 Tahun 2011 tentang
  Pengelolaan Zakat (mencakup infak dan sedekah). Pastikan bentuk lembaga Rattil dan izin yang
  diperlukan untuk menghimpun dana dari umum.
- Akun penerima atas nama **lembaga** (bukan pribadi) lebih mudah dipertanggungjawabkan.
- Pembukuan terpisah dari SPP murid; laporan berkala sesuai yang dijanjikan di halaman.

---

## 8. Sengaja tidak dikerjakan di fase 1

- Progres dana / daftar donatur di situs.
- Webhook Mayar → Apps Script. Bila nanti dibuat: karena webhook tidak bertanda tangan, setiap
  notifikasi **wajib diverifikasi ulang ke API Mayar** (kunci API disimpan di Script Properties,
  bukan di kode/sheet publik) sebelum dicatat; endpoint terpisah dari backend pendaftaran.
- Tombol/sematan Mayar di dalam halaman.

---

## 9. Integrasi ke situs

- Menu: tautan **"Infaq"** di `index.html`, `program.html`, `programramadhan.html`, `beasiswa.html`,
  `portal.html`, `modul.html` (menu desktop & HP), dan di footer semua halaman.
- `sitemap.xml`: tambah `https://rattililquran.com/infaq.html`.
- Kartu bagikan (Open Graph): `assets/images/og-infaq.jpg` 1200×630, gaya sama dengan og-program.
- Tanpa perubahan pada formulir pendaftaran & backend.

---

## 10. Langkah kerja & verifikasi

1. Terima bahan §1 → periksa QRIS (§4.2) & tautan Mayar (§5.2).
2. Bangun `infaq.html`, gambar QRIS teroptimasi, `og-infaq.jpg`, tautan menu/footer, sitemap.
3. Skrip `alat/cek-infaq.sh`: pindai QRIS (isi + CRC + nama + NMID), cek tautan Mayar, cek SHA-256.
4. Uji: lebar 320/390/1280, terang/gelap, tanpa overflow & galat JS; tombol "Simpan gambar QRIS"
   menghasilkan berkas yang bisa dipindai; QRIS dipindai dari layar laptop dengan aplikasi asli
   (**uji bayar Rp1 dilakukan pemilik**, bukan Claude); tautan Mayar terbuka di tab baru.
5. Tangkapan layar ke pemilik → deploy setelah pemilik mengetik "deploy".
6. Catat SHA-256 final di dokumen ini.

---

## 11. Sumber

- Webhook Mayar — https://docs.mayar.id/integration/webhook
- Fitur galang dana Mayar — https://mayar.id/fundraiser-online
- QRIS statis & NMID (umum) — https://www.kapanlagi.com/feeds/cara-bikin-qris-untuk-usaha-lewat-e-wallet-bank-dan-agregator-651a150f3a.html ,
  https://www.fortuneidn.com/finance/ini-cara-membuat-qris-untuk-penjual-hingga-pelaku-umkm-00-ccw2k-r4rmk9
- MDR QRIS (berubah dari waktu ke waktu; contoh ketentuan) — https://www.bca.co.id/id/bisnis/produk/penerimaan-bisnis/qris-bisnis

---

## 12. Ucapan terima kasih (dibangun 4 Nov 2026)

QRIS statis tidak mengabari situs saat ada pembayaran, jadi ucapan diberikan lewat dua jalan.

### 12.1 Di halaman — tombol "Saya sudah berinfaq"
- `<details id="syukur">`: bekerja tanpa JavaScript. Saat dibuka tampil:
  جَزَاكُمُ اللَّهُ خَيْرًا · "Jazaakumullahu khairan" · doa "Semoga Allah menerima infaq Anda,
  memberkahi harta dan keluarga Anda, dan menggantinya dengan yang lebih baik." · potongan
  **QS. Saba' [34]: 39** beserta terjemahan Kemenag.
- "Kabari kami (tidak wajib)": isian Nama & Nominal **hanya** menyusun teks pesan WhatsApp
  (wa.me) di perangkat pemberi; tidak dikirim ke server dan tidak disimpan.
- **Teks Arab — wajib diperiksa pengajar sebelum tayang:**

  | Teks | Sumber |
  |---|---|
  | `وَمَآ أَنفَقْتُم مِّن شَىْءٍ فَهُوَ يُخْلِفُهُۥ ۖ وَهُوَ خَيْرُ ٱلرَّٰزِقِينَ` | quran.com API v4, `text_uthmani`, ayat 34:39 (potongan dari "وَمَآ" sampai akhir ayat, tanpa diubah) |
  | "Dan apa saja yang kamu infakkan, Allah akan menggantinya dan Dialah pemberi rezeki yang terbaik." | quran.com, terjemahan resource 33 (Kementerian Agama RI), potongan kalimat kedua |
  | `جَزَاكُمُ اللَّهُ خَيْرًا` | ungkapan doa; diketik, **perlu dicek harakatnya** |

### 12.2 Balasan WhatsApp dari admin (siap salin)

Untuk pemberi yang mengirim bukti. Disarankan disimpan sebagai *Balasan cepat* di WhatsApp Business.

**A. Dengan nominal & tanggal**
```
Wa'alaikumussalam warahmatullahi wabarakatuh.

Jazaakumullahu khairan, infaq Anda sebesar Rp[nominal] pada [tanggal] sudah kami terima.

Semoga Allah menerima infaq Anda, memberkahi harta dan keluarga Anda, dan menggantinya dengan yang lebih baik.

"Dan apa saja yang kamu infakkan, Allah akan menggantinya dan Dialah pemberi rezeki yang terbaik." (QS. Saba' [34]: 39)

Baarakallahu fiikum.
Rattililqur'an
```

**B. Singkat (bukti tanpa nominal / sudah sering berinfaq)**
```
Wa'alaikumussalam warahmatullahi wabarakatuh. Jazaakumullahu khairan, infaq Anda sudah kami terima. Semoga Allah menerima dan menggantinya dengan yang lebih baik. Baarakallahu fiikum.
```

Sebelum membalas, cocokkan nominal & waktu dengan riwayat transaksi DANA Bisnis; jangan
mengonfirmasi "sudah diterima" hanya dari tangkapan layar.
