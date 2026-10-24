// Közös, jelölhető anatómiai ábrák (csontváz, törzsi szervek), amelyeket több tantárgy is használ
// (anatómia, orvosi latin, vizsgák). Minden ábra részekből áll; egy rész kiemelhető, számozott
// jelölővel megjelölhető, vagy felirattal (magyar vagy latin névvel) ellátható.
//
//   Rajz.csontvaz({ kiemel: ['combcsont'], jelol: { combcsont: 1 }, cimkek: 'hu' | 'la' | false })
//   Rajz.szervek({ ... ugyanígy ... })
//   Rajz.CSONTOK / Rajz.SZERVEK: { azon: { hu, la } } – a részek nevei (feladatok generálásához)
'use strict';

(() => {
  // Bal oldali (a rajzon bal = a beteg jobb oldala) alakzat tükrözése a függőleges középvonalra.
  const tukor = (svg, kozep) =>
    `<g transform="translate(${2 * kozep} 0) scale(-1 1)">${svg}</g>`;

  // Általános ábraépítő.
  // reszek: { azon: { svg, p: [x, y] (jelölő helye), c: [x, y] (felirat helye; x < közép → balra) } }
  function abra({ reszek, nevek, vb, kozep, aria, osztaly }) {
    return ({ kiemel = [], jelol = {}, cimkek = false, halvany = false } = {}) => {
      const kiemelt = [].concat(kiemel);
      let belso = '';
      let felso = '';
      for (const [azon, r] of Object.entries(reszek)) {
        const o = kiemelt.includes(azon) ? ' kiemelt' : halvany && kiemelt.length ? ' halvany' : '';
        belso += `<g class="resz${o}" data-resz="${azon}">${r.svg}</g>`;
        if (cimkek && nevek[azon]) {
          const [cx, cy] = r.c;
          const bal = cx < kozep;
          felso +=
            `<line x1="${r.p[0]}" y1="${r.p[1]}" x2="${cx + (bal ? 4 : -4)}" y2="${cy}" class="vezeto"/>` +
            Rajz.szoveg(cx, cy, nevek[azon][cimkek], `kicsi${kiemelt.includes(azon) ? ' piros' : ''}`, bal ? 'end' : 'start');
        }
        if (jelol[azon] != null) {
          felso += `<circle cx="${r.p[0]}" cy="${r.p[1]}" r="10" class="jelolo-kor"/>` + Rajz.szoveg(r.p[0], r.p[1] + 0.5, jelol[azon], 'jelolo-szam');
        }
      }
      return `<svg viewBox="${vb}" class="abra ${osztaly}" role="img" aria-label="${aria}">${belso}${felso}</svg>`;
    };
  }

  // ---- Csontváz (elölről) ----
  const csigolyak = Array.from({ length: 19 }, (_, j) => `<rect x="115" y="${86 + j * 9}" width="10" height="7" rx="2" class="csont"/>`).join('');
  const bordak = Array.from({ length: 8 }, (_, j) => {
    const y = 104 + j * 8;
    const v = `<path d="M114 ${y} C 100 ${y - 3}, ${84 - j * 0.5} ${y}, ${80 - j * 0.3} ${y + 14 + j}" class="csont nyitott"/>`;
    return v + tukor(v, 120);
  }).join('');
  const ketoldal = (svg) => svg + tukor(svg, 120);
  const CS = {
    koponya: {
      svg: '<ellipse cx="120" cy="40" rx="27" ry="31" class="csont"/><ellipse cx="110" cy="42" rx="6" ry="5" class="csont"/><ellipse cx="130" cy="42" rx="6" ry="5" class="csont"/><path d="M116 52 L120 58 L124 52" class="csont nyitott"/>',
      p: [120, 20], c: [-6, 20],
    },
    allkapocs: { svg: '<path d="M98 58 Q100 82 120 85 Q140 82 142 58" class="csont nyitott"/>', p: [138, 76], c: [252, 70] },
    gerinc: { svg: csigolyak, p: [120, 236], c: [252, 236] },
    bordak: { svg: bordak, p: [152, 140], c: [252, 140] },
    kulcscsont: { svg: ketoldal('<path d="M116 96 Q96 91 76 96" class="csont nyitott"/>'), p: [96, 93], c: [-6, 92] },
    szegycsont: { svg: '<rect x="114" y="100" width="12" height="56" rx="5" class="csont"/>', p: [120, 122], c: [252, 112] },
    felkarcsont: {
      svg: ketoldal('<circle cx="78" cy="101" r="7" class="csont"/><path d="M76 106 L66 180" class="csont vastag nyitott"/>'),
      p: [71, 145], c: [-6, 140],
    },
    orsocsont: { svg: ketoldal('<path d="M62 186 L50 262" class="csont nyitott"/>'), p: [55, 230], c: [-6, 222] },
    singcsont: { svg: ketoldal('<path d="M70 186 L62 264" class="csont nyitott"/>'), p: [175, 226], c: [252, 196] },
    kez: {
      svg: ketoldal(
        '<path d="M46 266 L66 266 L64 282 L46 282 Z" class="csont"/>' +
          [47, 52, 57, 62].map((x) => `<path d="M${x} 284 L${x - 1} 302" class="csont nyitott"/>`).join('') +
          '<path d="M45 270 L36 288" class="csont nyitott"/>',
      ),
      p: [56, 276], c: [-6, 290],
    },
    medence: {
      svg: '<path d="M84 252 Q74 286 104 294 L112 280 L128 280 L136 294 Q166 286 156 252 Q138 268 120 264 Q102 268 84 252 Z" class="csont"/><circle cx="102" cy="287" r="4" class="csont"/><circle cx="138" cy="287" r="4" class="csont"/>',
      p: [108, 274], c: [-6, 252],
    },
    keresztcsont: { svg: '<path d="M112 258 L128 258 L120 280 Z" class="csont"/>', p: [120, 267], c: [252, 270] },
    combcsont: {
      svg: ketoldal('<circle cx="103" cy="286" r="6" class="csont"/><path d="M101 292 L94 372" class="csont vastag nyitott"/>'),
      p: [97, 334], c: [-6, 330],
    },
    terdkalacs: { svg: ketoldal('<circle cx="93" cy="380" r="6" class="csont"/>'), p: [147, 380], c: [252, 372] },
    sipcsont: { svg: ketoldal('<path d="M96 390 L94 456" class="csont vastag nyitott"/>'), p: [95, 420], c: [-6, 410] },
    szarkapocs: { svg: ketoldal('<path d="M85 392 L83 454" class="csont nyitott"/>'), p: [156, 424], c: [252, 424] },
    labfej: { svg: ketoldal('<path d="M80 460 L100 460 L104 474 L70 474 Z" class="csont"/>'), p: [86, 467], c: [-6, 466] },
  };
  const CSONTOK = {
    koponya: { hu: 'koponya', la: 'cranium' },
    allkapocs: { hu: 'állkapocs', la: 'mandibula' },
    gerinc: { hu: 'gerincoszlop', la: 'columna vertebralis' },
    bordak: { hu: 'bordák', la: 'costae' },
    kulcscsont: { hu: 'kulcscsont', la: 'clavicula' },
    szegycsont: { hu: 'szegycsont', la: 'sternum' },
    felkarcsont: { hu: 'felkarcsont', la: 'humerus' },
    orsocsont: { hu: 'orsócsont', la: 'radius' },
    singcsont: { hu: 'singcsont', la: 'ulna' },
    kez: { hu: 'kéz csontjai', la: 'ossa manus' },
    medence: { hu: 'medence', la: 'pelvis' },
    keresztcsont: { hu: 'keresztcsont', la: 'os sacrum' },
    combcsont: { hu: 'combcsont', la: 'femur' },
    terdkalacs: { hu: 'térdkalács', la: 'patella' },
    sipcsont: { hu: 'sípcsont', la: 'tibia' },
    szarkapocs: { hu: 'szárkapocscsont', la: 'fibula' },
    labfej: { hu: 'lábfej csontjai', la: 'ossa pedis' },
  };
  const csontvaz = abra({ reszek: CS, nevek: CSONTOK, vb: '-104 0 448 480', kozep: 120, aria: 'Csontváz elölről', osztaly: 'csontvaz' });

  // ---- Törzsi szervek (elölről) ----
  const SZ = {
    vese: {
      svg: '<ellipse cx="86" cy="270" rx="12" ry="20" class="szerv szerv-vese retro"/><ellipse cx="174" cy="270" rx="12" ry="20" class="szerv szerv-vese retro"/>',
      p: [178, 268], c: [270, 266],
    },
    tudo: {
      svg: '<path d="M120 62 Q70 50 58 110 Q52 168 70 192 Q98 184 116 174 Z" class="szerv szerv-tudo"/><path d="M140 72 Q190 50 202 110 Q208 168 190 192 Q170 186 156 178 Q150 160 160 150 Z" class="szerv szerv-tudo"/>',
      p: [80, 120], c: [-8, 112],
    },
    sziv: { svg: '<path d="M116 124 Q148 110 166 140 Q162 176 134 190 Q112 174 112 152 Z" class="szerv szerv-sziv"/>', p: [140, 152], c: [270, 140] },
    legcso: {
      svg: '<rect x="124" y="4" width="12" height="62" rx="4" class="szerv szerv-legcso"/><path d="M127 64 L108 84 M133 64 L152 84" class="bel vekony"/>',
      p: [130, 30], c: [270, 30],
    },
    rekesz: { svg: '<path d="M50 200 Q130 170 210 200" class="rekesz"/>', p: [196, 192], c: [270, 188] },
    maj: { svg: '<path d="M50 204 Q118 188 158 206 Q144 238 100 242 Q60 242 50 222 Z" class="szerv szerv-maj"/>', p: [80, 218], c: [-8, 208] },
    epeholyag: { svg: '<ellipse cx="108" cy="244" rx="8" ry="6" class="szerv szerv-epe"/>', p: [108, 244], c: [-8, 244] },
    lep: { svg: '<ellipse cx="208" cy="216" rx="9" ry="18" class="szerv szerv-lep"/>', p: [208, 216], c: [270, 214] },
    gyomor: { svg: '<path d="M152 206 Q196 196 200 228 Q198 262 162 262 Q140 252 150 236 Z" class="szerv szerv-gyomor"/>', p: [176, 236], c: [270, 240] },
    hasnyal: { svg: '<path d="M118 262 Q160 256 190 246 Q192 256 162 268 Q136 276 118 272 Z" class="szerv szerv-hasnyal"/>', p: [146, 268], c: [270, 292] },
    vastagbel: { svg: '<path d="M68 356 L66 290 Q66 282 76 282 L186 282 Q194 282 194 292 L194 336 Q194 360 150 366" class="bel"/>', p: [66, 316], c: [-8, 300] },
    vekonybel: {
      svg: [298, 314, 330, 346].map((y) => `<path d="M88 ${y} q10 -8 20 0 t20 0 t20 0 t20 0" class="bel vekony"/>`).join(''),
      p: [120, 322], c: [270, 330],
    },
    fereg: { svg: '<path d="M66 358 L58 374" class="bel fereg"/>', p: [58, 374], c: [-8, 360] },
    hugyholyag: { svg: '<ellipse cx="130" cy="380" rx="18" ry="11" class="szerv szerv-holyag"/>', p: [130, 380], c: [270, 380] },
  };
  const SZERVEK = {
    vese: { hu: 'vese', la: 'ren' },
    tudo: { hu: 'tüdő', la: 'pulmo' },
    sziv: { hu: 'szív', la: 'cor' },
    legcso: { hu: 'légcső', la: 'trachea' },
    rekesz: { hu: 'rekeszizom', la: 'diaphragma' },
    maj: { hu: 'máj', la: 'hepar' },
    epeholyag: { hu: 'epehólyag', la: 'vesica fellea' },
    lep: { hu: 'lép', la: 'lien' },
    gyomor: { hu: 'gyomor', la: 'ventriculus' },
    hasnyal: { hu: 'hasnyálmirigy', la: 'pancreas' },
    vastagbel: { hu: 'vastagbél', la: 'intestinum crassum' },
    vekonybel: { hu: 'vékonybél', la: 'intestinum tenue' },
    fereg: { hu: 'féregnyúlvány', la: 'appendix vermiformis' },
    hugyholyag: { hu: 'húgyhólyag', la: 'vesica urinaria' },
  };
  const torzs =
    '<path d="M104 0 L104 18 Q62 22 42 42 L36 396 L224 396 L218 42 Q198 22 156 18 L156 0" class="test torzs"/>';
  const szervRajz = abra({ reszek: SZ, nevek: SZERVEK, vb: '-104 -4 470 404', kozep: 130, aria: 'A törzs szervei elölről', osztaly: 'szervek' });
  const szervek = (o) => {
    const s = szervRajz(o);
    return s.replace(/(<svg[^>]*>)/, `$1${torzs}`);
  };

  // Szám a megfelelő toldalékkal: 1-es, 3-as, 5-ös, 6-os (ábrás feladatok szövegéhez).
  const RAG = ['es', 'es', 'es', 'as', 'es', 'ös', 'os', 'es', 'as', 'es'];
  const szamJel = (n) => `${n}-${n % 10 === 0 ? (n % 100 === 0 ? 'as' : { 10: 'es', 20: 'as', 30: 'as', 40: 'es', 50: 'es', 60: 'as', 70: 'es', 80: 'as', 90: 'es' }[n % 100]) : RAG[n % 10]}`;

  // Felirat nélküli változat (ábrafelismerő feladatokhoz): minden <text> elemet elhagy.
  const cimkeNelkul = (svg) => svg.replace(/<text\b[^>]*>[\s\S]*?<\/text>/g, '');

  Object.assign(Rajz, { csontvaz, szervek, CSONTOK, SZERVEK, abraEpito: abra, szamJel, cimkeNelkul });
})();
