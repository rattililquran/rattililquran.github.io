#!/usr/bin/env node
/* Ilustrasi gaya sorot untuk Bab 01 beranda (slide "Pernah Merasakan Ini?").
 *
 * Disalin dari Modul-Web/tools/ilustrasi-sorot.mjs: membekukan benda sorot (konten-sosmed/sorot/mesin/benda.js) dan
 * bentuk gaya line (konten-sosmed/garis/mesin/bentuk), lalu menulis assets/sorot/<id>.json (titik 3D mentah untuk
 * animasi di assets/sorot/sorot-ilus.js). Peta: alat/ilustrasi-sorot.json.
 *
 *   node alat/ilustrasi-sorot.mjs            cetak semua
 *   node alat/ilustrasi-sorot.mjs --lembar   juga tulis <id>.svg + _lembar.html (lembar kontak untuk memilih benda; jangan di-commit)
 *
 * Lokasi konten-sosmed: variabel KONTEN_SOSMED, bawaan ~/Project/Rattil/konten-sosmed. Hanya dibutuhkan saat mencetak. */
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const AKAR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const KS = resolve(process.env.KONTEN_SOSMED || join(homedir(), 'Project/Rattil/konten-sosmed'));
if (!existsSync(join(KS, 'sorot/mesin/benda.js'))) { console.error('konten-sosmed tidak ditemukan di ' + KS + ' (atur KONTEN_SOSMED)'); process.exit(1); }
const req = createRequire(import.meta.url);
req(join(KS, 'garis/mesin/jalur.js'));
for (const f of readdirSync(join(KS, 'garis/mesin/bentuk'))) if (f.endsWith('.js')) req(join(KS, 'garis/mesin/bentuk', f));
// Bentuk lokal beranda (alat/bentuk/*.js) menambah pustaka line sebelum benda sorot dimuat.
for (const f of readdirSync(join(AKAR, 'alat/bentuk'))) if (f.endsWith('.js')) req(join(AKAR, 'alat/bentuk', f));
req(join(KS, 'sorot/mesin/benda.js'));
const B = globalThis.SOROT.benda;

const KELAS = { emas: 'e', putih: 'p', biru: 'b', redup: 'r' };
const T_BAWAAN = 6;
const PAD = 24;

const r1 = v => Math.round(v * 10) / 10;

// Satu item manifest → garis 3D mentah (untuk animasi) + garis terproyeksi pada pose akhir (untuk SVG statis).
function susunItem(item) {
  const t = item.t ?? T_BAWAAN;
  const h = B.bentuk(item.benda, item.opsi || {}, t);
  const pr = B.proyektor({ wx: 0, wy: 0, s: item.s || 1, yaw: item.yaw, pitch: item.pitch, putar: 0 }, t, h.tigaD);
  const kelas = KELAS[item.warna || 'emas'];
  const garis = h.garis.filter(g => g.titik.length > 1).map(g => ({
    kelas: g.warna === 'redup' ? 'r' : kelas,
    alfa: g.alfa,
    mentah: g.titik,
    p: g.titik.map(pr).map(([x, y]) => [x + (item.dx || 0), y + (item.dy || 0)]),
  }));
  return { tigaD: !!h.tigaD, s: item.s || 1, dx: item.dx || 0, dy: item.dy || 0,
    yaw: item.yaw ?? .55, pitch: item.pitch ?? .38, garis };
}

function susun(entri) {
  const isi = entri.isi || [{ benda: entri.benda, warna: entri.warna, opsi: entri.opsi, t: entri.t, s: entri.s }];
  const items = isi.map(susunItem);
  const semua = items.flatMap(i => i.garis);
  // tanah: garis lantai tipis di bawah semua benda (tokoh duduk/berdiri tidak melayang). Nilai = kelebihan kiri-kanan.
  if (entri.tanah) {
    let a = Infinity, z = -Infinity, bawah = -Infinity;
    for (const g of semua) for (const [x, y] of g.p) { a = Math.min(a, x); z = Math.max(z, x); bawah = Math.max(bawah, y); }
    const lebih = typeof entri.tanah === 'number' ? entri.tanah : 40;
    const p = [[a - lebih, bawah], [z + lebih, bawah]];
    const g = { kelas: KELAS[entri.warnaTanah || 'putih'], alfa: .45, p, mentah: p.map(([x, y]) => [x, y, 0]) };
    items.push({ tigaD: false, s: 1, dx: 0, dy: 0, garis: [g] }); semua.push(g);
  }
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const g of semua) for (const [x, y] of g.p) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  return { isi, items, semua, x0, y0, w: Math.round(x1 - x0 + PAD * 2), h: Math.round(y1 - y0 + PAD * 2) };
}

export function svg(entri) {
  const { isi, semua, x0, y0, w, h } = susun(entri);
  const paths = semua.map(g => {
    const d = g.p.map(([x, y], i) => (i ? 'L' : 'M') + r1(x - x0 + PAD) + ' ' + r1(y - y0 + PAD)).join('');
    return `<path class="${g.kelas}" d="${d}"${g.alfa != null ? ` opacity="${g.alfa}"` : ''} pathLength="1"/>`;
  });
  const benda = isi.map(i => i.benda).join(' + ');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" data-benda="${benda}">\n`
    + `<title>${entri.arti.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</title>\n${paths.join('\n')}\n</svg>\n`;
}

/* Data gerak untuk assets/js/sorot-ilus.js: titik 3D mentah per item + cara memproyeksikannya (rumus sama dengan
   proyektor sorot). Bingkai w×h dan geser (ox, oy) diambil dari pose akhir, jadi animasi berakhir tepat di SVG statis. */
export function gerak(entri) {
  const { items, x0, y0, w, h } = susun(entri);
  return { w, h, ox: r1(PAD - x0), oy: r1(PAD - y0), arti: entri.arti,
    items: items.map(i => ({ t3: i.tigaD ? 1 : 0, s: i.s, dx: i.dx, dy: i.dy, yaw: i.yaw, pitch: i.pitch,
      g: i.garis.map(g => ({ k: g.kelas, ...(g.alfa != null ? { a: g.alfa } : {}), p: g.mentah.map(q => [r1(q[0]), r1(q[1]), r1(q[2] || 0)]) })) })) };
}

const PETA = process.env.PETA || join(AKAR, 'alat/ilustrasi-sorot.json');
const manifest = JSON.parse(readFileSync(PETA, 'utf8')).gambar;
const lembar = process.argv.includes('--lembar');
const KELUAR = process.env.KELUAR || join(AKAR, 'assets/sorot');
mkdirSync(KELUAR, { recursive: true });
let n = 0;
for (const e of manifest) {
  try {
    writeFileSync(join(KELUAR, e.id + '.json'), JSON.stringify(gerak(e)));
    if (lembar) writeFileSync(join(KELUAR, e.id + '.svg'), svg(e));
    n++;
  } catch (err) { console.error('GAGAL', e.id, err.message); process.exitCode = 1; }
}
console.log(`${n} ilustrasi ditulis ke ${KELUAR}`);
if (lembar) {
  const sel = manifest.map(e => `<figure><div class="g">${existsSync(join(KELUAR, e.id + '.svg')) ? readFileSync(join(KELUAR, e.id + '.svg'), 'utf8') : '<em>gagal</em>'}</div><figcaption><b>${e.id}</b> ${e.arti}</figcaption></figure>`).join('\n');
  writeFileSync(join(KELUAR, '_lembar.html'), `<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:20px;background:#05080f;color:#ddd;font:13px system-ui}main{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px}figure{margin:0;background:#0a1428;border-radius:10px;padding:10px}.g{height:170px;position:relative}.g svg{position:absolute;inset:0;width:100%;height:100%}.g path{stroke-width:2.2;vector-effect:non-scaling-stroke}.e{stroke:#ffbe55}.p{stroke:#f4f7fb}.b{stroke:#6f9dff}.r{stroke:#3a4558}</style><main>${sel}</main>`);
}
