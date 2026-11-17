/* Ilustrasi gaya sorot yang hidup, untuk slide Bab 01 beranda (disalin dari Modul-Web/assets/js/sorot-ilus.js).
 *
 * Data: assets/sorot/<id>.json (dibuat alat/ilustrasi-sorot.mjs) = titik 3D mentah tiap garis + cara memproyeksikannya
 * (rumus sama dengan proyektor mesin sorot di konten-sosmed). Digambar sebagai SVG sebaris; warna dan pendar dari CSS.
 *
 *  1. MASUK (± 2,6 dtk): kamera mendekat, benda 3D berputar ke posenya, pena bercahaya menelusuri garis, lalu kilau.
 *  2. HIDUP HALUS: benda 3D bergoyang pelan, gambar melayang naik-turun, pendar bernapas.
 * prefers-reduced-motion: langsung pose akhir, tanpa gerak.
 *
 * API: RQSorot.pasang(wadah, id) → Promise (selalu mengulang dari awal); RQSorot.jeda(wadah) menghentikan loop tanpa
 * menghapus gambar; RQSorot.muat(id) mengambil data lebih dulu. */
(function(G){
  var BASIS = (function(){
    var s = document.currentScript && document.currentScript.src;
    return s ? s.replace(/sorot-ilus\.js.*$/, '') : 'assets/sorot/';
  })();
  var NS = 'http://www.w3.org/2000/svg';
  var cache = {};
  var DIAM = G.matchMedia && G.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ambil(id){
    if(!cache[id]) cache[id] = fetch(BASIS + id + '.json').then(function(r){ return r.ok ? r.json() : null; }).catch(function(){ return null; });
    return cache[id];
  }

  // Proyeksi = proyektor sorot: skala, putar sumbu Y (yaw), lihat dari atas (pitch), perspektif lemah.
  function proyektor(it, yaw){
    var t3 = it.t3, cy = Math.cos(yaw), sy = Math.sin(yaw), p = t3 ? it.pitch : 0, cp = Math.cos(p), sp = Math.sin(p), s = it.s;
    return function(q){
      var x = q[0] * s, y = q[1] * s, z = q[2] * s;
      if(!t3) return [x + it.dx, y + it.dy];
      var x1 = x * cy + z * sy, z1 = -x * sy + z * cy, y2 = y * cp - z1 * sp, z2 = y * sp + z1 * cp, f = 1600 / (1600 + z2);
      return [x1 * f + it.dx, y2 * f + it.dy];
    };
  }
  function jalur(titik, pr, ox, oy){
    var d = '';
    for(var i = 0; i < titik.length; i++){ var q = pr(titik[i]); d += (i ? 'L' : 'M') + (q[0] + ox).toFixed(1) + ' ' + (q[1] + oy).toFixed(1); }
    return d;
  }
  var mulus = function(u){ return u <= 0 ? 0 : u >= 1 ? 1 : 1 - Math.pow(1 - u, 3); };
  var sinus = function(u){ return u <= 0 ? 0 : u >= 1 ? 1 : (1 - Math.cos(Math.PI * u)) / 2; };

  function bangun(wadah, data, latar){
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + data.w + ' ' + data.h);
    svg.setAttribute('class', 'sorot-hidup' + (latar ? ' is-latar' : ''));
    svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-linecap', 'round'); svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', data.arti || '');
    var kamera = document.createElementNS(NS, 'g'); kamera.setAttribute('class', 'sorot-kamera'); svg.appendChild(kamera);
    var garis = [];
    data.items.forEach(function(it){
      it.g.forEach(function(g){
        var p = document.createElementNS(NS, 'path');
        p.setAttribute('class', g.k); p.setAttribute('pathLength', '1');
        if(g.a != null) p.setAttribute('opacity', g.a);
        kamera.appendChild(p);
        garis.push({ el: p, it: it, titik: g.p });
      });
    });
    var pena = document.createElementNS(NS, 'circle'); pena.setAttribute('class', 'sorot-pena'); pena.setAttribute('r', (Math.max(data.w, data.h) * .012).toFixed(1)); kamera.appendChild(pena);
    var cincin = document.createElementNS(NS, 'circle'); cincin.setAttribute('class', 'sorot-cincin'); cincin.setAttribute('r', (Math.min(data.w, data.h) * .42).toFixed(1));
    cincin.setAttribute('cx', data.w / 2); cincin.setAttribute('cy', data.h / 2); svg.appendChild(cincin);
    wadah.appendChild(svg);
    /* Tebal garis dalam satuan viewBox = 2,4 px layar ÷ skala tampil. Sengaja TIDAK memakai vector-effect:
       non-scaling-stroke: dengan itu panjang goresan (pathLength=1) dihitung di ruang viewBox sementara garis
       diukur di layar, sehingga gambar yang tampil lebih besar dari viewBox hanya tergores 1/skala-nya. */
    function tebal(){
      var r = svg.getBoundingClientRect(); if(!r.width || !r.height) return;
      var skala = Math.min(r.width / data.w, r.height / data.h);
      svg.style.setProperty('--garis', (2.4 / skala).toFixed(3));
    }
    tebal();
    if(window.ResizeObserver){ var ro = new ResizeObserver(tebal); ro.observe(svg); wadah._sorotRO = ro; }
    return { svg: svg, kamera: kamera, garis: garis, pena: pena, cincin: cincin, data: data };
  }

  // Gambar ulang semua garis pada yaw tertentu (benda 3D) — benda 2D cukup sekali.
  function pose(b, dyaw, sekali){
    b.garis.forEach(function(g){
      if(sekali && g.sudah && !g.it.t3) return;
      g.el.setAttribute('d', jalur(g.titik, proyektor(g.it, (g.it.yaw || 0) + dyaw), b.data.ox, b.data.oy));
      g.sudah = true;
    });
  }

  var MASUK = 2.6, GORES0 = .15, GORES1 = 2.05, YAW_MASUK = -.75;

  function jalan(wadah, b, latar){
    var mulai = performance.now(), hidup = true, ada3D = b.data.items.some(function(i){ return i.t3; });
    // Panjang tiap garis pada pose akhir, untuk membagi waktu gores secara proporsional (pena merata).
    pose(b, 0);
    var panjang = b.garis.map(function(g){ try{ return g.el.getTotalLength(); }catch(e){ return 1; } });
    var total = panjang.reduce(function(a, c){ return a + c; }, 0) || 1, awal = [], acc = 0;
    panjang.forEach(function(l){ awal.push(acc); acc += l; });

    if(DIAM){
      b.garis.forEach(function(g){ g.el.style.strokeDashoffset = 0; });
      b.pena.style.opacity = 0; b.svg.classList.add('is-utuh');
      return function(){};
    }
    b.svg.classList.add('is-masuk');

    function langkah(now){
      if(!hidup) return;
      // Berhenti hanya bila wadah dilepas atau benar-benar tersembunyi (display:none → tanpa kotak). Jangan pakai
      // offsetParent: nilainya null untuk elemen position:fixed (latar layar dalil) dan, di Safari, juga untuk isi
      // wadah fixed (seluruh panggung presentasi), sehingga animasi berhenti di frame pertama (gambar terpotong).
      if(!wadah.isConnected || !wadah.getClientRects().length){ hidup = false; return; }
      var t = (now - mulai) / 1000;
      if(t < MASUK){
        // kamera: dari jauh (kecil, agak rendah) mendekat dengan perlambatan; benda 3D berputar masuk ke posenya
        var k = mulus(t / 2.3), skala = .72 + .28 * k, ty = (1 - k) * b.data.h * .08;
        b.kamera.setAttribute('transform', 'translate(' + (b.data.w / 2) + ' ' + (b.data.h / 2 + ty) + ') scale(' + skala + ') translate(' + (-b.data.w / 2) + ' ' + (-b.data.h / 2) + ')');
        if(ada3D) pose(b, YAW_MASUK * (1 - mulus(t / 2.4)));
        else pose(b, 0, true);
        // gores: pena berjalan dari garis pertama ke terakhir dengan laju merata
        var u = sinus((t - GORES0) / (GORES1 - GORES0)) * total, ujung = null;
        b.garis.forEach(function(g, i){
          var lokal = Math.max(0, Math.min(1, (u - awal[i]) / (panjang[i] || 1)));
          g.el.style.strokeDashoffset = 1 - lokal;
          if(lokal > 0 && lokal < 1) ujung = { g: g, l: lokal * (panjang[i] || 0) };
        });
        if(ujung){
          try{ var q = ujung.g.el.getPointAtLength(ujung.l); b.pena.setAttribute('cx', q.x); b.pena.setAttribute('cy', q.y); }catch(e){}
          b.pena.style.opacity = 1;
        } else b.pena.style.opacity = t > GORES1 ? 0 : b.pena.style.opacity;
        if(t > GORES1 && !b.kilau){ b.kilau = true; b.svg.classList.add('is-kilau'); }
      } else {
        if(!b.utuh){
          b.utuh = true; b.svg.classList.remove('is-masuk'); b.svg.classList.add('is-utuh');
          b.garis.forEach(function(g){ g.el.style.strokeDashoffset = 0; });
          b.pena.style.opacity = 0;
        }
        // hidup halus: goyang yaw ±0,06 rad (periode 14 dtk), melayang ±1,2% tinggi (periode 7 dtk)
        var th = t - MASUK;
        if(ada3D) pose(b, .06 * Math.sin(th * 2 * Math.PI / 14));
        var apung = Math.sin(th * 2 * Math.PI / 7) * b.data.h * .012;
        b.kamera.setAttribute('transform', 'translate(0 ' + apung.toFixed(2) + ')');
      }
      requestAnimationFrame(langkah);
    }
    requestAnimationFrame(langkah);
    return function(){ hidup = false; };
  }

  function jeda(wadah){
    if(wadah._sorotHenti) wadah._sorotHenti();
    wadah._sorotHenti = null;
  }

  function lepas(wadah){
    wadah._sorotToken = (wadah._sorotToken || 0) + 1;
    if(wadah._sorotHenti) wadah._sorotHenti();
    wadah._sorotHenti = null;
    if(wadah._sorotRO){ wadah._sorotRO.disconnect(); wadah._sorotRO = null; }
    while(wadah.firstChild) wadah.removeChild(wadah.firstChild);
  }

  function pasang(wadah, id, opsi){
    opsi = opsi || {};
    lepas(wadah);
    // Token per panggilan: pasang() yang lebih baru membatalkan yang lama walau id-nya sama (cegah gambar dobel
    // bila slide aktif lagi sebelum data selesai dimuat).
    var token = wadah._sorotToken = (wadah._sorotToken || 0) + 1;
    return ambil(id).then(function(data){
      if(!data || wadah._sorotToken !== token) return false;
      var b = bangun(wadah, data, opsi.latar);
      wadah._sorotHenti = jalan(wadah, b, opsi.latar);
      return true;
    });
  }

  G.RQSorot = { pasang: pasang, lepas: lepas, jeda: jeda, muat: ambil };
})(window);
