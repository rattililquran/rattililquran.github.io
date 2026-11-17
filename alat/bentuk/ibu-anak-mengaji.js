/* Bentuk gaya line · ibu-anak-mengaji: Ibu berkerudung dan anak perempuan berkerudung duduk menghadap mushaf di atas
 * rehal; tangan ibu menunjuk halaman (faceless, one line art). Bentuk lokal beranda, dimuat alat/ilustrasi-sorot.mjs.
 * Dua bagian dengan bingkai sama (lebar 480) agar bisa diberi warna berbeda dan bertumpuk tepat:
 *   'ibu-menunjuk'  = ibu (garis putih di slide)
 *   'anak-rehal'    = lantai, rehal, mushaf, anak (garis emas)
 * Koordinat lokal: tanah y = 0, ke atas negatif. */
(function(G){
  var J = G.GARIS.jalur, B = (G.GARIS.bentuk = G.GARIS.bentuk || {});
  B['ibu-menunjuk'] = {
    lebar: 480, tinggi: 320,
    tag: ['ibu', 'muslimah', 'kerudung', 'mengajar', 'menunjuk'],
    // kerudung panjang menjuntai sampai lantai (punggung)
    jalur: 'M60 0 C72 -60 80 -150 102 -205 C110 -224 112 -242 110 -258 C108 -292 128 -312 142 -312 C166 -312 182 -292 178 -262 C176 -246 175 -234 184 -220 C196 -204 204 -190 208 -172',
    lepas: [
      J.lingkaran(144, -262, 19),                                   // wajah (polos)
      'M206 -176 C222 -150 238 -124 262 -104 L272 -98',             // lengan menunjuk halaman
      'M188 -150 C192 -110 196 -70 212 -42 C220 -26 232 -14 248 -6' // depan badan, lutut bersimpuh
    ],
    catatan: 'Ibu berkerudung bersimpuh, tangan menunjuk ke depan (pasangan anak-rehal).',
  };
  B['anak-rehal'] = {
    lebar: 480, tinggi: 320,
    tag: ['anak', 'mushaf', 'rehal', 'mengaji', 'belajar'],
    jalur: 'M0 0 H480',
    lepas: [
      'M262 0 L328 -66', 'M328 0 L262 -66',                         // rehal
      'M252 -70 Q295 -104 338 -70', 'M252 -70 Q295 -84 338 -70', 'M295 -94 V-77', // mushaf terbuka
      'M352 0 C360 -40 364 -88 376 -122 C381 -136 380 -148 378 -158 C376 -182 390 -196 398 -196 C415 -196 425 -183 422 -164 C421 -152 426 -142 433 -132 C441 -118 446 -100 449 -80 C453 -50 457 -24 466 0',
      J.lingkaran(399, -166, 12),                                   // wajah anak
      'M382 -116 C366 -104 352 -92 340 -80'                         // tangan anak memegang tepi mushaf
    ],
    catatan: 'Anak perempuan berkerudung duduk menghadap mushaf di atas rehal (pasangan ibu-menunjuk).',
  };
})(globalThis);
