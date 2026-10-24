// Közös SVG-rajzoló és interaktív segédfüggvények a témákhoz
// (számformázás, emberi test sziluett, szív sémája, EKG-csík, csúszkás „Próbáld ki!”).
'use strict';

const Rajz = (() => {
  // Szám magyar formátumban (tizedesvessző), legfeljebb `tizedes` tizedesjeggyel.
  function szam(x, tizedes = 2) {
    return Number(x.toFixed(tizedes)).toLocaleString('hu-HU', { maximumFractionDigits: tizedes });
  }

  const kerek = (v) => +v.toFixed(1);

  const svg = (W, H, belso, cimke = 'Ábra', osztaly = '') =>
    `<svg viewBox="0 0 ${W} ${H}" class="abra ${osztaly}" role="img" aria-label="${cimke}">${belso}</svg>`;

  const szoveg = (x, y, t, o = '', h = 'middle') =>
    `<text x="${kerek(x)}" y="${kerek(y)}" text-anchor="${h}" dominant-baseline="middle" class="cimke ${o}">${t}</text>`;

  const csoport = (belso, uj) => `<g${uj ? ' class="uj"' : ''}>${belso}</g>`;

  // Egyszerű, mindig ugyanúgy „véletlen” számsor (EKG-zajhoz), hogy a rajz ne ugráljon.
  function veletlen(mag) {
    let a = mag >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ---- Emberi test sziluettje (elölről vagy hátulról) ----
  // A részek azonosítói: fej, torzs1 (mellkas / hát felső), torzs2 (has / hát alsó),
  // jkar, bkar, jlab, blab, gat. A beteg JOBB oldala a rajzon a BAL oldalon van (szemből nézzük).
  // osztalyok: { fej: 'egett', ... }   feliratok: { fej: '9%', ... }
  const TEST_RESZEK = {
    fej: { d: 'M80 8 a20 22 0 1 1 -0.1 0 Z M72 50 h16 v8 h-16 Z', k: [80, 30] },
    torzs1: { d: 'M54 58 h52 q6 0 6 6 v44 h-64 v-44 q0 -6 6 -6 Z', k: [80, 84] },
    torzs2: { d: 'M48 108 h64 v40 q0 8 -8 8 h-48 q-8 0 -8 -8 Z', k: [80, 130] },
    jkar: { d: 'M46 60 q-14 2 -16 16 l-8 78 q-1 8 6 9 h6 q6 0 7 -7 l7 -70 Z', k: [33, 112] },
    bkar: { d: 'M114 60 q14 2 16 16 l8 78 q1 8 -6 9 h-6 q-6 0 -7 -7 l-7 -70 Z', k: [127, 112] },
    jlab: { d: 'M52 158 h26 l-2 128 q0 6 -6 6 h-12 q-6 0 -6 -6 Z', k: [64, 222] },
    blab: { d: 'M82 158 h26 l-0 128 q0 6 -6 6 h-12 q-6 0 -6 -6 Z', k: [95, 222] },
    gat: { d: 'M72 152 h16 l-8 12 Z', k: [80, 157] },
  };

  function ember({ osztalyok = {}, feliratok = {}, nezet = 'elol', kattinthato = false } = {}) {
    let belso = '';
    // Hátulról nézve a beteg jobb oldala a rajz jobb oldalára kerül.
    const tukor = { jkar: 'bkar', bkar: 'jkar', jlab: 'blab', blab: 'jlab' };
    for (const [alak, { d, k }] of Object.entries(TEST_RESZEK)) {
      if (alak === 'gat' && nezet !== 'elol') continue;
      const azon = nezet === 'elol' ? alak : tukor[alak] || alak;
      belso += `<path d="${d}" class="test ${osztalyok[azon] || ''}${kattinthato ? ' kattinthato' : ''}" data-resz="${azon}"/>`;
      if (feliratok[azon]) belso += szoveg(k[0], k[1], feliratok[azon], 'kicsi');
    }
    belso += szoveg(80, 298, nezet === 'elol' ? 'elölről' : 'hátulról', 'kicsi halvany-szoveg');
    return `<svg viewBox="0 0 160 306" class="abra ember" role="img" aria-label="Emberi test ${nezet === 'elol' ? 'elölről' : 'hátulról'}">${belso}</svg>`;
  }

  // ---- A szív és a két vérkör sémája ----
  // kiemel: a kiemelendő részek listája: 'test', 'vena', 'jp', 'trikuszp', 'jk', 'tudoart', 'tudo',
  // 'tudovena', 'bp', 'mitralis', 'bk', 'aorta'.  halvany: true → a nem kiemelt részek halványak.
  function sziv({ kiemel = [], halvany = false, feliratok = true } = {}) {
    const k = (azon) => (kiemel.includes(azon) ? ' kiemelt' : halvany && kiemel.length ? ' halvany' : '');
    const doboz = (azon, x, y, w, h, o, t) =>
      `<g class="${k(azon).trim()}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" class="${o}${k(azon)}"/>` +
      szoveg(x + w / 2, y + h / 2, t, 'kicsi') + '</g>';
    const ut = (azon, d, o) => `<path d="${d}" class="ut ${o}${k(azon)}" marker-end="url(#nyilhegy-${o})"/>`;
    const belso =
      `<defs>${['szen', 'oxi']
        .map(
          (o) =>
            `<marker id="nyilhegy-${o}" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="nyilhegy ${o}"/></marker>`,
        )
        .join('')}</defs>` +
      doboz('tudo', 95, 6, 110, 34, 'szerv', '🫁 Tüdő (gázcsere)') +
      doboz('jp', 62, 70, 82, 44, 'szen', 'Jobb pitvar') +
      doboz('jk', 62, 134, 82, 60, 'szen', 'Jobb kamra') +
      doboz('bp', 156, 70, 82, 44, 'oxi', 'Bal pitvar') +
      doboz('bk', 156, 134, 82, 60, 'oxi vastag', 'Bal kamra') +
      doboz('test', 95, 222, 110, 34, 'szerv', 'A test szervei') +
      ut('vena', 'M95 239 H22 V92 H58', 'szen') +
      ut('trikuszp', 'M103 115 V131', 'szen') +
      ut('tudoart', 'M62 172 H42 V23 H91', 'szen') +
      ut('tudovena', 'M205 23 H258 V92 H242', 'oxi') +
      ut('mitralis', 'M197 115 V131', 'oxi') +
      ut('aorta', 'M238 172 H280 V239 H209', 'oxi') +
      (feliratok
        ? `<text x="12" y="170" transform="rotate(-90 12 170)" text-anchor="middle" dominant-baseline="middle" class="cimke kicsi kek">üres vénák</text>` +
          szoveg(48, 56, 'tüdőverőér', 'kicsi kek', 'start') +
          szoveg(252, 56, 'tüdővénák', 'kicsi piros', 'end') +
          `<text x="291" y="205" transform="rotate(90 291 205)" text-anchor="middle" dominant-baseline="middle" class="cimke kicsi piros">aorta</text>`
        : '');
    return svg(300, 262, belso, 'A szív és a két vérkör sémája', 'sziv-sema');
  }

  // ---- EKG-csík (25 mm/s, 10 mm/mV, 1 mm = 3 px) ----
  // ritmus: 'sinus' | 'pitvarfibr' | 'vf' | 'vt' | 'asystolia' | 'stemi'
  // frekvencia: ütés/perc (szabályos ritmusoknál), mp: a csík hossza másodpercben.
  function ekg({ ritmus = 'sinus', frekvencia = 75, mp = 6, mag = 7 } = {}) {
    const PX = 3;
    const W = mp * 25 * PX;
    const H = 30 * PX;
    const alap = H * 0.62;
    const rnd = veletlen(mag);
    const g = (t, k, s, a) => a * Math.exp(-((t - k) ** 2) / (2 * s * s));
    // Az R-hullámok időpontjai
    const csucsok = [];
    if (['sinus', 'stemi', 'vt'].includes(ritmus)) {
      for (let t = 0.35; t < mp + 0.5; t += 60 / frekvencia) csucsok.push(t);
    } else if (ritmus === 'pitvarfibr') {
      for (let t = 0.3; t < mp + 0.5; t += 0.42 + rnd() * 0.5) csucsok.push(t);
    }
    // Kamrafibrilláció: néhány, lassan változó hullám összege
    const vfHullamok = Array.from({ length: 5 }, () => [2.5 + rnd() * 4, rnd() * 6.28, 1.5 + rnd() * 2.5]);
    const y = (t) => {
      let v = 0;
      if (ritmus === 'vf') {
        v = vfHullamok.reduce((s, [f, f0, a]) => s + a * Math.sin(2 * Math.PI * f * t + f0), 0) * (0.7 + 0.3 * Math.sin(t * 1.3));
        return v;
      }
      if (ritmus === 'asystolia') return 0.35 * Math.sin(2 * Math.PI * 0.4 * t) + 0.15 * Math.sin(2 * Math.PI * 1.7 * t);
      if (ritmus === 'pitvarfibr') v += 0.45 * Math.sin(2 * Math.PI * 6.3 * t) + 0.3 * Math.sin(2 * Math.PI * 9.1 * t + 1);
      for (const c of csucsok) {
        if (Math.abs(t - c) > 0.6) continue;
        if (ritmus === 'vt') {
          v += g(t, c, 0.045, 13) + g(t, c + 0.13, 0.05, -7);
          continue;
        }
        if (ritmus !== 'pitvarfibr') v += g(t, c - 0.16, 0.025, 1.5);
        v += g(t, c - 0.03, 0.008, -1.2) + g(t, c, 0.011, 11) + g(t, c + 0.03, 0.01, -3) + g(t, c + 0.28, 0.05, 3);
        if (ritmus === 'stemi') v += g(t, c + 0.15, 0.07, 3.8);
      }
      return v;
    };
    let racs = '';
    for (let mm = 0; mm <= mp * 25; mm++) {
      racs += `<line x1="${mm * PX}" y1="0" x2="${mm * PX}" y2="${H}" class="${mm % 5 ? 'ekg-racs' : 'ekg-racs nagy'}"/>`;
    }
    for (let mm = 0; mm <= 30; mm++) {
      racs += `<line x1="0" y1="${mm * PX}" x2="${W}" y2="${mm * PX}" class="${mm % 5 ? 'ekg-racs' : 'ekg-racs nagy'}"/>`;
    }
    const pontok = [];
    for (let t = 0; t <= mp; t += 0.004) pontok.push(`${kerek(t * 25 * PX)},${kerek(alap - y(t) * PX)}`);
    return `<svg viewBox="0 0 ${W} ${H}" class="abra ekg" role="img" aria-label="EKG-csík">${racs}<polyline points="${pontok.join(
      ' ',
    )}" class="ekg-vonal"/></svg>`;
  }

  // ---- Csúszkás „Próbáld ki!” rész ----
  // csuszkak: [{ k, cim, min, max, lepes, ertek, egyseg }]
  // frissit(ertekek) → { rajz: 'HTML', szamitas: 'HTML' }
  function interaktiv({ csuszkak, frissit }) {
    return (el) => {
      el.innerHTML = `<div class="interaktiv">
        <div class="rajz"></div>
        <div class="csuszkak">${csuszkak
          .map(
            (c) => `<label>${c.cim}: <output data-k="${c.k}"></output> ${c.egyseg || ''}
              <input type="range" min="${c.min}" max="${c.max}" step="${c.lepes}" value="${c.ertek}" data-k="${c.k}"></label>`,
          )
          .join('')}<div class="szamitas"></div></div>
      </div>`;
      const ertekek = () => Object.fromEntries(csuszkak.map((c) => [c.k, Number(el.querySelector(`input[data-k="${c.k}"]`).value)]));
      const fr = () => {
        const v = ertekek();
        csuszkak.forEach((c) => (el.querySelector(`output[data-k="${c.k}"]`).textContent = szam(v[c.k])));
        const { rajz, szamitas } = frissit(v);
        el.querySelector('.rajz').innerHTML = rajz;
        el.querySelector('.szamitas').innerHTML = szamitas;
      };
      el.querySelectorAll('input').forEach((i) => i.addEventListener('input', fr));
      fr();
    };
  }

  // Színes értékcímke: allapot = 'jo' | 'figyel' | 'rossz'
  const ertek = (t, allapot) => `<span class="ertek ertek-${allapot}">${t}</span>`;

  // Nagy ikonos „kártya” animációkhoz (pl. az ABCDE betűi): [{ ikon, cim, aktiv, kesz }]
  function lepesSor(elemek) {
    return `<div class="lepes-sor">${elemek
      .map((e) => `<div class="lepes-elem${e.aktiv ? ' aktiv' : ''}${e.kesz ? ' kesz' : ''}"><span class="ikon">${e.ikon}</span><span>${e.cim}</span></div>`)
      .join('')}</div>`;
  }

  // ---- Betegmonitor (esetfeladatokhoz) ----
  // v: { p, rr: '120/80', spo2, lsz, etco2, gcs, vc, t, ritmus } – a meg nem adott érték nem jelenik meg.
  // ritmus: az ekg() ritmusai közül; alapból sinus a pulzus frekvenciájával.
  function monitor(v = {}) {
    const ir = (x) => (typeof x === 'number' ? szam(x, 1) : x);
    const MEZOK = [
      ['p', 'Pulzus', '/perc'],
      ['rr', 'Vérnyomás', 'Hgmm'],
      ['spo2', 'SpO₂', '%'],
      ['lsz', 'Légzésszám', '/perc'],
      ['etco2', 'EtCO₂', 'Hgmm'],
      ['gcs', 'GCS', 'pont'],
      ['vc', 'Vércukor', 'mmol/l'],
      ['t', 'Testhő', '°C'],
    ].filter(([k]) => v[k] != null);
    const ritmus = v.ritmus || (v.p ? 'sinus' : null);
    const csik = ritmus ? ekg({ ritmus, frekvencia: Math.max(30, Math.min(220, v.p || 75)), mp: 8, mag: 3 }) : '';
    const leiras = MEZOK.map(([k, c, e]) => `${c} ${ir(v[k])} ${e}`).join(', ');
    return `<div class="monitor" role="img" aria-label="Betegmonitor: ${leiras}">${csik}<div class="monitor-ertekek">${MEZOK.map(
      ([k, c, e]) => `<div class="m-${k}"><span>${c}</span><b>${ir(v[k])}</b><small>${e}</small></div>`,
    ).join('')}</div></div>`;
  }

  return { szam, svg, szoveg, csoport, veletlen, ember, sziv, ekg, interaktiv, ertek, lepesSor, monitor };
})();
