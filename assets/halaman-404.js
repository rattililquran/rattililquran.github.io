/* ══ halaman-404.js — tebak halaman tujuan dari alamat yang salah ══
   Dipakai DUA halaman 404 yang isinya identik:
     - /404.html               (repo situs utama — alamat salah di rattililquran.com)
     - /pendaftaran/404.html   (repo formulir — alamat salah di bawah /pendaftaran/)
   Dari alamat yang salah (typo, garis miring di akhir, nama lama, sinonim), cari halaman
   yang paling mungkin dimaksud lalu tampilkan tombol "Buka …". Tidak mengalihkan otomatis.
   [EDIT] tambah kata kunci bila ada alamat lama yang sering dipakai. */
(function(){
  var HALAMAN = [
    { url: '/',                         nama: 'Beranda',                        desk: 'Halaman utama Rattililqur\'an.',                kunci: ['beranda','home','index','utama','rattil','rattililquran','rattililqur'] },
    { url: '/program.html',             nama: 'Kelas Tahsin Riyadhatulhuruf',   desk: 'Materi, cara belajar, jadwal, biaya, dan alur.', kunci: ['program','kelas','riyadhatulhuruf','riyadhatul','riyadhoh','riyadoh','tahsin','tentangprogram','level','class','course'] },
    { url: '/program.html#jadwal',      nama: 'Jadwal Kelas Riyadhatulhuruf',   desk: 'Bagian jadwal di halaman program.',             kunci: ['jadwal','schedule','waktu','halaqah'] },
    { url: '/program.html#biaya',       nama: 'Biaya Kelas Riyadhatulhuruf',    desk: 'Bagian biaya di halaman program.',              kunci: ['biaya','harga','spp','infaq','infak','price','fee','bayar','pembayaran'] },
    { url: '/pendaftaran/',             nama: 'Formulir Pendaftaran',           desk: 'Daftar sebagai murid baru.',                    kunci: ['pendaftaran','daftar','register','registrasi','form','formulir','signup','pmb','ppdb','gabung','join'] },
    { url: '/pendaftaran/status.html',  nama: 'Cek Status Pendaftaran',         desk: 'Pantau status dengan nomor pendaftaran.',       kunci: ['status','cek','cekstatus','check','hasil','pengumuman'] },
    { url: '/pendaftaran/share.html',   nama: 'Ajak Saudara Bergabung',         desk: 'Bagikan info pendaftaran ke keluarga & sahabat.', kunci: ['share','bagikan','sebarkan','ajak','undang'] },
    { url: '/beasiswa.html',            nama: 'Beasiswa Penuh',                 desk: 'Syarat, komitmen, dan cara mengajukan.',        kunci: ['beasiswa','scholarship','keringanan','subsidi','gratis'] },
    { url: '/modul.html',               nama: 'Modul Belajar Riyāḍat al-Ḥurūf', desk: 'Latihan makhraj & sifat huruf — gratis.',       kunci: ['modul','module','materi','belajar','riyadat','huruf','hijaiyah','makhraj','tajwid','mindmap'] },
    { url: '/portal.html',              nama: 'Portal Murid',                   desk: 'Presensi, raport, dan latihan murid.',          kunci: ['portal','murid','raport','rapor','presensi','nis','santri','siswa'] },
    { url: 'https://portal.rattililquran.com/', nama: 'Masuk Portal',           desk: 'Login akun murid, guru, atau admin.',           kunci: ['login','masuk','signin','akun','account','dashboard'] },
    { url: '/pendaftaran/admin/',       nama: 'Panel Admin Pendaftaran',        desk: 'Khusus admin.',                                 kunci: ['admin','panel'] },
    { url: '/#faq',                     nama: 'Pertanyaan Umum',                desk: 'Jawaban atas pertanyaan yang sering diajukan.', kunci: ['faq','tanya','pertanyaan','bantuan','help'] },
    { url: '/#kontak',                  nama: 'Kontak',                         desk: 'WhatsApp, Instagram, email, dan alamat.',       kunci: ['kontak','contact','hubungi','whatsapp','wa','alamat','lokasi'] },
    { url: '/#tentang',                 nama: 'Tentang Rattililqur\'an',        desk: 'Cara kami menemani belajar.',                   kunci: ['tentang','about','profil','profile','visi','misi'] },
    { url: '/#testimoni',               nama: 'Testimoni Murid',                desk: 'Cerita mereka yang sudah belajar.',             kunci: ['testimoni','testimonial','ulasan','review'] }
  ];

  // Jarak Levenshtein untuk menangkap salah ketik (mis. "progam", "beasiwa").
  function jarak(a, b){
    if (a === b) return 0;
    var m = a.length, n = b.length, prev = [], cur, i, j;
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++){
      cur = [i];
      for (j = 1; j <= n; j++){
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[n];
  }

  // Skor satu kata alamat terhadap satu kata kunci.
  function skor(kata, kunci){
    if (kata === kunci) return 100;
    if (kata.length >= 4 && kunci.length >= 4 && (kata.indexOf(kunci) === 0 || kunci.indexOf(kata) === 0)) return 80;
    var batas = kunci.length >= 7 ? 2 : (kunci.length >= 4 ? 1 : 0);
    var d = batas ? jarak(kata, kunci) : 99;
    return d <= batas ? 70 - d * 5 : 0;
  }

  var path;
  try { path = decodeURIComponent(location.pathname); } catch (e) { path = location.pathname; }
  var bawah = path.toLowerCase();
  // Di bawah /pendaftaran/ awalan itu hanya konteks, bukan petunjuk: tanpa ini
  // "/pendaftaran/statu.html" akan condong ke Formulir, bukan Cek Status.
  var diPendaftaran = bawah.indexOf('/pendaftaran/') === 0;
  if (diPendaftaran) bawah = bawah.slice('/pendaftaran/'.length);
  var kataAlamat = bawah
    .replace(/\.(html?|php|aspx?)$/, '')
    .split(/[^a-z0-9]+/)
    .filter(function(k){ return k.length >= 2; });
  // Gabungan juga dicoba, mis. "/cek-status" → "cekstatus".
  if (kataAlamat.length > 1) kataAlamat.push(kataAlamat.join(''));

  // Nilai halaman = jumlah skor terbaik tiap kata alamat (kata yang cocok saja), sehingga
  // "/tentang-program" (2 kata cocok) mengalahkan "/#tentang" (1 kata). Bila seri, tujuan
  // yang lebih spesifik (#bagian) menang: "/biaya-kelas" → bagian biaya.
  var terbaik = null, nilai = 0;
  HALAMAN.forEach(function(h){
    var total = 0;
    kataAlamat.forEach(function(kata){
      var best = 0;
      h.kunci.forEach(function(k){ best = Math.max(best, skor(kata, k)); });
      if (best >= 60) total += best;
    });
    var lebihSpesifik = terbaik && total === nilai && h.url.indexOf('#') !== -1 && terbaik.url.indexOf('#') === -1;
    if (total > nilai || lebihSpesifik){ nilai = total; terbaik = h; }
  });

  // Tampilkan alamat yang dibuka (sebagai teks, bukan HTML).
  var lead = document.getElementById('nfLead');
  if (lead && path && path !== '/' && !/\/404\.html$/.test(path)){
    lead.textContent = '';
    lead.appendChild(document.createTextNode('Alamat '));
    var code = document.createElement('code');
    code.textContent = path.length > 60 ? path.slice(0, 57) + '…' : path;
    lead.appendChild(code);
    lead.appendChild(document.createTextNode(' tidak ada atau sudah dipindahkan. Silakan pilih halaman tujuan di bawah ini.'));
  }

  if (!terbaik || nilai < 60) return;
  // "Beranda" di dalam /pendaftaran/ (mis. /pendaftaran/index.php) = halaman formulir.
  if (diPendaftaran && terbaik.url === '/') terbaik = HALAMAN.filter(function(h){ return h.url === '/pendaftaran/'; })[0];
  var tujuan = terbaik.url;
  // Bawa serta #bagian bila tujuan belum punya, mis. /progam.html#biaya → /program.html#biaya
  if (location.hash && tujuan.indexOf('#') === -1 && tujuan.indexOf('http') !== 0) tujuan += location.hash;
  var kotak = document.getElementById('tebak'), btn = document.getElementById('tebakBtn');
  if (!kotak || !btn) return;
  document.getElementById('tebakNama').textContent = terbaik.nama;
  document.getElementById('tebakDesk').textContent = terbaik.desk;
  btn.href = tujuan;
  btn.firstChild.textContent = 'Buka ' + terbaik.nama + ' ';
  kotak.hidden = false;
})();
