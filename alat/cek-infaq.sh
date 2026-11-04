#!/bin/bash
# cek-infaq.sh — jalankan sebelum setiap deploy yang menyentuh halaman infaq.
# Memastikan QRIS di repo tetap QRIS resmi Rattil (lihat rencana_infaq.md §4.2):
#   1. setiap gambar QRIS terbaca & isinya SAMA PERSIS dengan acuan di bawah,
#   2. nama merchant & NMID yang tertulis di infaq.html sesuai isi kode.
# Pemindai: CoreImage macOS (alat/bacaqr.swift). Gagal → keluar dengan kode 1.
set -u
cd "$(dirname "$0")/.."
ACUAN='00020101021126570011ID.DANA.WWW011893600915303583510102090358351010303UMI51440014ID.CO.QRIS.WWW0215ID10266114501270303UMI5204899953033605802ID5922rattililquran, Service6009Bondowoso6105682616304A29C'
NAMA='rattililquran, Service'
NMID='ID1026611450127'
gagal=0
for f in assets/images/infaq/qris-dana-*.png; do
  isi="$(swift alat/bacaqr.swift "$f" 2>/dev/null)"
  if [ "$isi" = "$ACUAN" ]; then echo "OK    $f"; else echo "GAGAL $f → isi QRIS berbeda dari acuan"; gagal=1; fi
done
grep -qF "$NAMA" infaq.html && grep -qF "$NMID" infaq.html \
  && echo "OK    infaq.html memuat nama merchant & NMID" \
  || { echo "GAGAL infaq.html tidak memuat nama merchant/NMID yang benar"; gagal=1; }
[ $gagal -eq 0 ] && echo "Semua pemeriksaan QRIS lulus." || { echo "JANGAN DEPLOY."; exit 1; }
