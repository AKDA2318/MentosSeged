// Vizsgák: témazáró (egy téma), témakör-vizsga (egy témacsoport), tantárgyi vizsga és
// komplex vizsgaszimuláció (minden tantárgy + esetfeladatok).
//
// A vizsga a gyakorlástól eltérően: nincs segítség, nincs második esély, és csak a beadás után
// derül ki, mi volt jó. Lehet időkorlátja; lejártakor a vizsga automatikusan beadódik.
// Az esetfeladatok (feladat.eset mezővel jelölt, egymásra épülő lépések) mindig egészben,
// a lépések sorrendjében kerülnek a vizsgába.
//
// Tárolás: tarolt.vizsgak[kulcs] = { aktiv, elozmenyek: [{ datum, pont, max, szazalek, jegy, perc }] }
//   aktiv = { kerdesek: [{ t, tema, i }], valaszok: { [poz]: válasz }, jelolt: [poz], poz, kezdes, hatarido }
'use strict';

const PERC_KERDES = 1.5; // időkeret kérdésenként (perc)
const PERC_ESETLEPES = 2; // időkeret esetlépésenként (perc)
const ATMENO = 60; // a sikeres vizsga határa (%)
// Gyakorló érdemjegy-skála (tájékoztató jellegű): [alsó határ %, jegy, név]
const JEGYEK = [
  [90, 5, 'jeles'],
  [80, 4, 'jó'],
  [70, 3, 'közepes'],
  [60, 2, 'elégséges'],
  [0, 1, 'elégtelen'],
];
const jegyLeiras = (szazalek) => JEGYEK.find(([also]) => szazalek >= also);

let vizsgaIdozito = null;
function vizsgaIdozitoLeallit() {
  clearInterval(vizsgaIdozito);
  vizsgaIdozito = null;
}

const vizsgaKulcs = (reszek) => (reszek.length ? reszek.join('/') : 'osszes');

function vizsgaAllapot(kulcs) {
  tarolt.vizsgak = tarolt.vizsgak || {};
  if (!tarolt.vizsgak[kulcs]) tarolt.vizsgak[kulcs] = { elozmenyek: [] };
  return tarolt.vizsgak[kulcs];
}

// A vizsga hatóköre: mely témák feladataiból válogatunk, és milyen hosszúságok közül lehet választani.
// reszek: [] = komplex vizsgaszimuláció, [tantárgy], [tantárgy, csoport] vagy [tantárgy, téma].
function vizsgaHatokor(reszek) {
  const betoltott = (t, bejegyzesek) => bejegyzesek.map((b) => t.temak[b.azon]).filter(Boolean).map((tema) => ({ tantargy: t, tema }));
  const osszesTema = (t) => betoltott(t, t.menu.flatMap((c) => c.temak));
  const kulcs = vizsgaKulcs(reszek);
  if (!reszek.length) {
    return {
      kulcs,
      tipus: 'komplex',
      ikon: '🏆',
      cim: 'Komplex vizsgaszimuláció',
      leiras:
        'Minden tantárgyból vegyesen (anatómia, latin, mentőápolói alapok, szakápolás, sürgősségi kórképek), a végén egész esetfeladatokkal – mint egy valódi záróvizsgán.',
      temak: Tananyag.tantargyak.flatMap(osszesTema),
      hosszak: [
        { irasbeli: 20, eset: 1, nev: 'Rövid' },
        { irasbeli: 40, eset: 2, nev: 'Normál' },
        { irasbeli: 60, eset: 3, nev: 'Teljes' },
      ],
      alap: 1,
      vissza: { href: '#/', cim: 'Kezdőlap' },
    };
  }
  const tantargy = Tananyag.tantargyak.find((t) => t.azon === reszek[0]);
  if (!tantargy) return null;
  const esetes = !!tantargy.esetek;
  if (reszek.length === 1) {
    return {
      kulcs,
      tipus: 'tantargy',
      ikon: tantargy.ikon,
      cim: `${tantargy.cim} – vizsga`,
      leiras: `A tantárgy összes témájából, arányosan válogatva${esetes ? ', egész esetekkel' : ''}.`,
      temak: osszesTema(tantargy),
      hosszak: esetes
        ? [{ eset: 2, nev: 'Rövid' }, { eset: 4, nev: 'Normál' }, { eset: 6, nev: 'Hosszú' }]
        : [{ irasbeli: 20, nev: 'Rövid' }, { irasbeli: 40, nev: 'Normál' }, { irasbeli: 60, nev: 'Hosszú' }],
      alap: 1,
      vissza: { href: `#/${tantargy.azon}`, cim: tantargy.cim },
    };
  }
  const csoport = tantargy.menu.find((c) => c.azon === reszek[1] && c.temak.length > 1);
  if (csoport) {
    return {
      kulcs,
      tipus: 'csoport',
      ikon: csoport.ikon,
      cim: `${csoport.cim} – témakör-vizsga`,
      leiras: `A(z) „${csoport.cim}” témakör összes elérhető témájából: ${betoltott(tantargy, csoport.temak).map((x) => x.tema.cim).join(', ')}.`,
      temak: betoltott(tantargy, csoport.temak),
      hosszak: esetes
        ? [{ eset: 2, nev: 'Rövid' }, { eset: 3, nev: 'Normál' }, { eset: 5, nev: 'Hosszú' }]
        : [{ irasbeli: 15, nev: 'Rövid' }, { irasbeli: 25, nev: 'Normál' }, { irasbeli: 40, nev: 'Hosszú' }],
      alap: 1,
      vissza: { href: `#/${tantargy.azon}/${csoport.azon}`, cim: csoport.cim },
    };
  }
  const tema = tantargy.temak[reszek[1]];
  if (!tema) return null;
  return {
    kulcs,
    tipus: 'tema',
    ikon: tema.ikon,
    cim: `${tema.cim} – témazáró`,
    leiras: 'A téma feladatbankjából véletlenszerűen, a nehézségi szintek arányában válogatva.',
    temak: [{ tantargy, tema }],
    hosszak: esetes
      ? [{ eset: 2, nev: 'Rövid' }, { eset: 3, nev: 'Normál' }, { eset: 4, nev: 'Hosszú' }]
      : [{ irasbeli: 10, nev: 'Rövid' }, { irasbeli: 20, nev: 'Normál' }, { irasbeli: 30, nev: 'Hosszú' }],
    alap: 1,
    beagyazott: true,
  };
}

// ---- Válogatás ----

function keverve(lista, rnd) {
  const ki = [...lista];
  for (let j = ki.length - 1; j > 0; j--) {
    const k = Math.floor(rnd() * (j + 1));
    [ki[j], ki[k]] = [ki[k], ki[j]];
  }
  return ki;
}

// Írásbeli kérdések: a témák között körbejárva, a nehézségi szintek kb. 30–40–30%-os arányában.
function irasbeliValogatas(temak, n, rnd) {
  const SZINT_SOR = [2, 1, 3, 2, 1, 3, 2, 2, 1, 3];
  const listak = keverve(
    temak
      .map(({ tantargy, tema }) =>
        keverve(
          tema.feladatok.map((f, i) => ({ t: tantargy.azon, tema: tema.azon, i, f })).filter((x) => !x.f.eset),
          rnd,
        ),
      )
      .filter((l) => l.length),
    rnd,
  );
  const ki = [];
  let k = 0;
  while (ki.length < n && listak.some((l) => l.length)) {
    for (const l of listak) {
      if (ki.length >= n) break;
      if (!l.length) continue;
      const j = Math.max(0, l.findIndex((x) => x.f.szint === SZINT_SOR[k % SZINT_SOR.length]));
      k++;
      ki.push(l.splice(j, 1)[0]);
    }
  }
  return keverve(ki, rnd);
}

// Esetfeladatok: n darab egész eset, a lépések eredeti sorrendjében.
function esetValogatas(temak, n, rnd) {
  const esetek = new Map();
  for (const { tantargy, tema } of temak) {
    tema.feladatok.forEach((f, i) => {
      if (!f.eset) return;
      if (!esetek.has(f.eset)) esetek.set(f.eset, []);
      esetek.get(f.eset).push({ t: tantargy.azon, tema: tema.azon, i, f });
    });
  }
  return keverve([...esetek.values()], rnd).slice(0, n).flat();
}

const hosszSzoveg = (h) =>
  [h.irasbeli ? `${h.irasbeli} kérdés` : '', h.eset ? `${h.eset} eset (egyenként 8 lépés)` : ''].filter(Boolean).join(' + ');
const hosszPerc = (h) => Math.round((h.irasbeli || 0) * PERC_KERDES + (h.eset || 0) * 8 * PERC_ESETLEPES);

const feladatOf = ({ t, tema, i }) => Tananyag.tantargyak.find((x) => x.azon === t)?.temak[tema]?.feladatok[i];
const temaOf = ({ t, tema }) => Tananyag.tantargyak.find((x) => x.azon === t)?.temak[tema];

// ---- Oldalak ----

function vizsgaOldal(reszek) {
  // Részleges kiadásban csak az elérhető tantárgyak (és csoportok) engedélyezett vizsgafajtái nyithatók meg.
  const tantargy = Tananyag.tantargyak.find((t) => t.azon === reszek[0] && !t.hamarosan);
  const csoport = tantargy && tantargy.menu.find((c) => c.azon === reszek[1]);
  const fajta = !reszek.length ? 'komplex' : reszek.length === 1 ? 'tantargy' : csoport ? 'csoport' : 'tema';
  const elerheto = reszek.length ? !!tantargy && !(csoport && csoport.hamarosan) : Tananyag.teljes();
  if (!elerheto || !Tananyag.vizsgaElerheto(fajta)) return kezdolap();
  const hatokor = vizsgaHatokor(reszek);
  // Még egyetlen téma sincs feltöltve a vizsga körében: nincs miből vizsgázni.
  if (!hatokor || !hatokor.temak.length) return kezdolap();
  cimBeallit(hatokor.cim);
  tartalom.innerHTML = `<a class="vissza" href="${hatokor.vissza.href}">← ${hatokor.vissza.cim}</a>
    <h2>${hatokor.ikon || '🎓'} ${hatokor.cim}</h2><div class="panel"></div>`;
  vizsgaMegjelenit(hatokor, $('.panel'));
}

function vizsgaMegjelenit(hatokor, panel) {
  const allapot = vizsgaAllapot(hatokor.kulcs);
  const aktiv = allapot.aktiv;
  const ervenyes = aktiv && aktiv.kerdesek.length && aktiv.kerdesek.every(feladatOf);
  if (aktiv && !ervenyes) delete allapot.aktiv;
  if (ervenyes) return kerdesMutat(hatokor, panel);
  inditoLap(hatokor, panel);
}

function inditoLap(hatokor, panel) {
  const allapot = vizsgaAllapot(hatokor.kulcs);
  const bank = hatokor.temak.reduce((s, { tema }) => s + tema.feladatok.length, 0);
  const esetSzam = new Set(hatokor.temak.flatMap(({ tema }) => tema.feladatok.filter((f) => f.eset).map((f) => f.eset))).size;
  // Csak olyan hosszúság választható, amelyhez van elég feladat / eset.
  const hosszak = hatokor.hosszak.filter((h) => (!h.eset || h.eset <= esetSzam) && (!h.irasbeli || h.irasbeli <= bank));
  // Ha egyik hosszúsághoz sincs elég feladat (pl. szűkített demó), a teljes feladatbankból lehet vizsgázni.
  const elso = hatokor.hosszak[0];
  const valaszthato = hosszak.length ? hosszak : [elso.irasbeli ? { ...elso, irasbeli: Math.min(elso.irasbeli, bank), nev: 'A teljes feladatbank' } : elso];
  const alap = Math.min(hatokor.alap, valaszthato.length - 1);
  const elozmenyek = allapot.elozmenyek.slice(-8).reverse();
  panel.innerHTML = `<div class="kartya vizsga-start">
    ${hatokor.beagyazott ? `<h3>🎓 ${hatokor.cim}</h3>` : ''}
    <p>${hatokor.leiras}</p>
    <p class="kerekites">Feladatbank: ${hatokor.temak.length} téma, ${bank} feladat${esetSzam ? `, ebből ${esetSzam} komplex eset` : ''}.</p>
    <fieldset class="vizsga-hossz"><legend>A vizsga hossza</legend>
      ${valaszthato
        .map(
          (h, j) => `<label><input type="radio" name="hossz" value="${j}"${j === alap ? ' checked' : ''}>
            <span><b>${h.nev}:</b> ${hosszSzoveg(h)} <small>(kb. ${hosszPerc(h)} perc)</small></span></label>`,
        )
        .join('')}
    </fieldset>
    <label class="vizsga-ido"><input type="checkbox" name="idokorlat" checked> Időkorláttal (a vizsga lejártakor automatikusan beadódik)</label>
    <details class="pontinfo" open><summary>📋 Vizsgaszabályok</summary><ul>
      <li>Nincs segítség és nincs második esély – mint az igazi vizsgán.</li>
      <li>A kérdések között szabadon lapozhatsz, a válaszaid mentődnek. A bizonytalanokat 🚩 megjelölheted.</li>
      <li>Az eredményt a <b>Beadás</b> után látod: minden jó válasz 1 pont.</li>
      <li>A gyakorló vizsga <b>${ATMENO}%-tól sikeres</b>. Jegy: 90% jeles, 80% jó, 70% közepes, 60% elégséges (tájékoztató skála).</li>
      <li>A végén megnézheted a hibás válaszaid megoldását, és azt is, melyik témát kell még ismételned.</li>
    </ul></details>
    <div class="gombsor"><button type="button" class="gomb" data-m="indit">🎓 Vizsga indítása</button></div>
    ${
      elozmenyek.length
        ? `<h4>Korábbi eredményeid</h4><div class="tabla-keret"><table>
            <thead><tr><th>Dátum</th><th>Pont</th><th>%</th><th>Jegy</th><th>Idő</th></tr></thead>
            <tbody>${elozmenyek
              .map(
                (e) => `<tr><td>${new Date(e.datum).toLocaleString('hu-HU', { dateStyle: 'short', timeStyle: 'short' })}</td>
                  <td>${e.pont} / ${e.max}</td><td>${e.szazalek}%</td><td>${e.jegy} (${jegyLeiras(e.szazalek)[2]})</td><td>${e.perc} perc</td></tr>`,
              )
              .join('')}</tbody></table></div>`
        : ''
    }
  </div>`;
  $('[data-m="indit"]', panel).addEventListener('click', () => {
    const h = valaszthato[+$('input[name="hossz"]:checked', panel).value];
    const rnd = Rajz.veletlen(Date.now() ^ Math.floor(Math.random() * 2 ** 31));
    const kerdesek = [
      ...irasbeliValogatas(hatokor.temak, h.irasbeli || 0, rnd),
      ...esetValogatas(hatokor.temak, h.eset || 0, rnd),
    ].map(({ t, tema, i }) => ({ t, tema, i }));
    const most = Date.now();
    allapot.aktiv = {
      kerdesek,
      valaszok: {},
      jelolt: [],
      poz: 0,
      kezdes: most,
      hatarido: $('input[name="idokorlat"]', panel).checked ? most + hosszPerc(h) * 60000 : null,
    };
    mentes();
    kerdesMutat(hatokor, panel);
    panel.scrollIntoView({ block: 'start' });
  });
}

const percMp = (ms) => {
  const mp = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(mp / 60)}:${String(mp % 60).padStart(2, '0')}`;
};

function kerdesMutat(hatokor, panel) {
  vizsgaIdozitoLeallit();
  const allapot = vizsgaAllapot(hatokor.kulcs);
  const aktiv = allapot.aktiv;
  if (aktiv.hatarido && Date.now() >= aktiv.hatarido) return beadas(hatokor, panel, true);
  const n = aktiv.kerdesek.length;
  const poz = Math.max(0, Math.min(n - 1, aktiv.poz));
  const f = feladatOf(aktiv.kerdesek[poz]);
  const valaszolt = Object.keys(aktiv.valaszok).filter((k) => aktiv.valaszok[k] !== '').length;
  const racs = aktiv.kerdesek
    .map((k, j) => {
      const o = [
        aktiv.valaszok[j] ? 'valaszolt' : '',
        aktiv.jelolt.includes(j) ? 'jelolt' : '',
        j === poz ? 'aktualis' : '',
        feladatOf(k).eset && (j === 0 || feladatOf(aktiv.kerdesek[j - 1]).eset !== feladatOf(k).eset) ? 'eset-eleje' : '',
      ].join(' ');
      return `<button type="button" class="lap ${o}" data-ugras="${j}" aria-label="${j + 1}. kérdés${aktiv.valaszok[j] ? ', megválaszolva' : ''}">${j + 1}</button>`;
    })
    .join('');
  panel.innerHTML = `<div class="vizsga">
    <div class="savsor"><span>${poz + 1}. kérdés / ${n}</span><span>Megválaszolva: ${valaszolt} / ${n}</span>
      ${aktiv.hatarido ? `<span class="ido" aria-live="off">⏱ ${percMp(aktiv.hatarido - Date.now())}</span>` : ''}</div>
    <div class="haladas-sav"><span style="width:${(valaszolt / n) * 100}%"></span></div>
    <form class="feladatpar" novalidate>${feladatKartya(f, poz, { vizsga: true, sorszam: poz })}</form>
    <div class="vizsga-gombok">
      <button type="button" class="gomb kicsi masodlagos" data-ugras="${poz - 1}"${poz === 0 ? ' disabled' : ''}>← Előző</button>
      <button type="button" class="gomb kicsi masodlagos" data-m="jelol">${aktiv.jelolt.includes(poz) ? '🚩 Jelölés törlése' : '🚩 Megjelölöm'}</button>
      <button type="button" class="gomb kicsi${poz === n - 1 ? ' masodlagos' : ''}" data-ugras="${poz + 1}"${poz === n - 1 ? ' disabled' : ''}>Következő →</button>
    </div>
    <nav class="lapozo kerdesracs" aria-label="Kérdések">${racs}</nav>
    <p class="jelmagyarazat"><span class="lap valaszolt">1</span> megválaszolva <span class="lap jelolt">1</span> megjelölve${
      aktiv.kerdesek.some((k) => feladatOf(k).eset) ? ' <span class="lap eset-eleje">1</span> eset kezdete' : ''
    }</p>
    <p class="befejezes"><button type="button" class="gomb" data-m="bead">📝 Beadás</button>
      <button type="button" class="link-gomb" data-m="megszakit">Vizsga megszakítása</button></p>
  </div>`;
  const doboz = $('.vizsga', panel);
  const urlap = $('form', doboz);
  // A korábban megadott válasz visszaállítása
  const mezo = urlap.elements[`f${poz}`];
  const regi = aktiv.valaszok[poz];
  if (regi != null) {
    if (mezo instanceof RadioNodeList) mezo.forEach((r) => (r.checked = r.value === regi));
    else mezo.value = regi;
  }
  const ment = () => {
    aktiv.valaszok[poz] = valaszKiolvas(urlap, poz);
    mentes();
    $('.savsor span:nth-child(2)', doboz).textContent = `Megválaszolva: ${
      Object.values(aktiv.valaszok).filter((v) => v !== '').length
    } / ${n}`;
    $(`.kerdesracs [data-ugras="${poz}"]`, doboz).classList.toggle('valaszolt', aktiv.valaszok[poz] !== '');
  };
  urlap.addEventListener('change', ment);
  urlap.addEventListener('input', ment);
  urlap.addEventListener('submit', (e) => {
    e.preventDefault();
    if (poz < n - 1) ugras(poz + 1);
  });
  const ugras = (j) => {
    aktiv.poz = j;
    mentes();
    kerdesMutat(hatokor, panel);
  };
  doboz.addEventListener('click', (e) => {
    const u = e.target.closest('[data-ugras]');
    if (u && !u.disabled) return ugras(+u.dataset.ugras);
    const m = e.target.closest('[data-m]')?.dataset.m;
    if (m === 'jelol') {
      aktiv.jelolt = aktiv.jelolt.includes(poz) ? aktiv.jelolt.filter((j) => j !== poz) : [...aktiv.jelolt, poz];
      mentes();
      kerdesMutat(hatokor, panel);
    } else if (m === 'bead') {
      const ures = n - Object.values(aktiv.valaszok).filter((v) => v !== '').length;
      const jelolt = aktiv.jelolt.length;
      const kerdes = [
        ures ? `${ures} kérdésre még nem válaszoltál (ezek 0 pontot érnek).` : '',
        jelolt ? `${jelolt} kérdést megjelöltél.` : '',
        'Biztosan beadod a vizsgát?',
      ]
        .filter(Boolean)
        .join('\n');
      megerosit(kerdes, 'Beadom').then((igen) => igen && beadas(hatokor, panel, false));
    } else if (m === 'megszakit') {
      megerosit('Biztosan megszakítod? A vizsga nem kerül értékelésre, a válaszaid törlődnek.', 'Megszakítom').then((igen) => {
        if (!igen) return;
        delete allapot.aktiv;
        mentes();
        inditoLap(hatokor, panel);
      });
    }
  });
  if (aktiv.hatarido) {
    const ido = $('.ido', doboz);
    vizsgaIdozito = setInterval(() => {
      const maradt = aktiv.hatarido - Date.now();
      if (maradt <= 0) return beadas(hatokor, panel, true);
      ido.textContent = `⏱ ${percMp(maradt)}`;
      ido.classList.toggle('keves', maradt < 5 * 60000);
    }, 1000);
  }
}

function beadas(hatokor, panel, lejart) {
  vizsgaIdozitoLeallit();
  const allapot = vizsgaAllapot(hatokor.kulcs);
  const aktiv = allapot.aktiv;
  const sorok = aktiv.kerdesek.map((k, j) => {
    const f = feladatOf(k);
    const valasz = aktiv.valaszok[j] ?? '';
    return { k, j, f, valasz, jo: valasz !== '' && ertekel(f, valasz) };
  });
  const pont = sorok.filter((s) => s.jo).length;
  const max = sorok.length;
  const szazalek = Math.round((pont / max) * 100);
  const [, jegy, jegyNev] = jegyLeiras(szazalek);
  const perc = Math.max(1, Math.round((Math.min(Date.now(), aktiv.hatarido || Infinity) - aktiv.kezdes) / 60000));
  allapot.elozmenyek.push({ datum: new Date().toISOString(), pont, max, szazalek, jegy, perc });
  allapot.elozmenyek = allapot.elozmenyek.slice(-30);
  delete allapot.aktiv;
  mentes();
  eredmenyLap(hatokor, panel, { sorok, pont, max, szazalek, jegy, jegyNev, perc, lejart });
}

function eredmenyLap(hatokor, panel, { sorok, pont, max, szazalek, jegy, jegyNev, perc, lejart }) {
  const sikeres = szazalek >= ATMENO;
  // Bontás témánként (komplex vizsgánál tantárgyanként is), a leggyengébb elöl.
  const bontas = (kulcsFv, cimFv, linkFv) => {
    const m = new Map();
    for (const s of sorok) {
      const k = kulcsFv(s);
      if (!m.has(k)) m.set(k, { cim: cimFv(s), link: linkFv(s), jo: 0, db: 0 });
      const e = m.get(k);
      e.db++;
      if (s.jo) e.jo++;
    }
    return [...m.values()].sort((a, b) => a.jo / a.db - b.jo / b.db);
  };
  const temaSorok = bontas(
    (s) => `${s.k.t}/${s.k.tema}`,
    (s) => `${temaOf(s.k).cim}${hatokor.tipus === 'komplex' ? ` <small>(${Tananyag.tantargyak.find((t) => t.azon === s.k.t).cim})</small>` : ''}`,
    (s) => `#/${s.k.t}/${s.k.tema}/gyakorlas`,
  );
  const tantargySorok =
    hatokor.tipus === 'komplex'
      ? bontas(
          (s) => s.k.t,
          (s) => Tananyag.tantargyak.find((t) => t.azon === s.k.t).cim,
          (s) => `#/${s.k.t}`,
        )
      : [];
  const savSor = (e) => {
    const sz = Math.round((e.jo / e.db) * 100);
    return `<tr><td class="bal"><a href="${e.link}">${e.cim}</a></td><td>${e.jo} / ${e.db}</td>
      <td><span class="ertek ertek-${sz >= 80 ? 'jo' : sz >= ATMENO ? 'figyel' : 'rossz'}">${sz}%</span></td></tr>`;
  };
  const ismetlendo = temaSorok.filter((e) => e.jo / e.db < ATMENO / 100);
  const hibak = sorok.filter((s) => !s.jo);
  const rovid = (html) => {
    const t = html.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    return t.length > 110 ? `${t.slice(0, 108)}…` : t;
  };
  panel.innerHTML = `<div class="kartya osszegzes vizsga-eredmeny">
    <h3>${lejart ? '⏱ Lejárt az idő – a vizsgát automatikusan beadtuk.' : 'A vizsga eredménye'}</h3>
    <p class="eredmeny">${szazalek}%</p>
    <p class="pont-cimke">${pont} / ${max} pont · ${perc} perc</p>
    <p class="jegy ${sikeres ? 'sikeres' : 'sikertelen'}">${sikeres ? '✔ Sikeres' : '✘ Nem sikerült'} – érdemjegy: <b>${jegy} (${jegyNev})</b></p>
    <p>${
      szazalek >= 90
        ? 'Kiváló! Ez már vizsgaérett tudás. 🌟'
        : sikeres
          ? 'Átmentél, de nézd át a gyengébb témákat – a helyszínen minden részlet számít.'
          : 'Most még nem sikerült. Nézd át a lent felsorolt témákat, gyakorolj, és próbáld újra!'
    }</p>
    ${
      tantargySorok.length
        ? `<h4>Tantárgyanként</h4><div class="tabla-keret"><table><thead><tr><th>Tantárgy</th><th>Pont</th><th>Arány</th></tr></thead>
            <tbody>${tantargySorok.map(savSor).join('')}</tbody></table></div>`
        : ''
    }
    ${
      temaSorok.length > 1 && hatokor.tipus !== 'komplex'
        ? `<h4>Témánként</h4><div class="tabla-keret"><table><thead><tr><th>Téma (kattints a gyakorláshoz)</th><th>Pont</th><th>Arány</th></tr></thead>
            <tbody>${temaSorok.map(savSor).join('')}</tbody></table></div>`
        : ''
    }
    ${
      ismetlendo.length
        ? `<p class="figyelmeztet-doboz">📚 <b>${hatokor.tipus === 'komplex' ? 'Ezekben a témákban hibáztál – ismételd át őket:' : 'Ezeket a témákat ismételd át:'}</b> ${ismetlendo.map((e) => `<a href="${e.link}">${e.cim}</a>`).join(', ')}</p>`
        : ''
    }
    ${
      hibak.length
        ? `<h4>Hibás és kihagyott válaszok (${hibak.length})</h4>
          <div class="vizsga-hibak">${hibak
            .map(
              (s) => `<details class="kartya"><summary><b>${s.j + 1}.</b> ${rovid(s.f.kerdes)}</summary>
                ${s.f.helyzet ? `<div class="helyzet">${typeof s.f.helyzet === 'function' ? s.f.helyzet() : s.f.helyzet}</div>` : ''}
                <div class="kerdes">${s.f.kerdes}</div>
                ${s.f.abra ? `<div class="rajz">${s.f.abra()}</div>` : ''}
                <p class="rossz">A te válaszod: ${s.valasz === '' ? '<i>nem válaszoltál</i>' : esc(s.valasz)}</p>
                <p class="jo">Helyes válasz: <b>${helyesValasz(s.f)}</b></p>
                ${megoldasHTML(s.f)}
                <p class="kerekites">Téma: <a href="#/${s.k.t}/${s.k.tema}/magyarazat">${temaOf(s.k).cim}</a></p>
              </details>`,
            )
            .join('')}</div>`
        : '<p class="biztatas">Minden válaszod helyes volt!</p>'
    }
    <div class="gombsor">
      <button type="button" class="gomb" data-m="uj">🎓 Új vizsga</button>
      ${hatokor.vissza ? `<a class="gomb masodlagos" href="${hatokor.vissza.href}">← ${hatokor.vissza.cim}</a>` : ''}
    </div>
  </div>`;
  $('[data-m="uj"]', panel).addEventListener('click', () => {
    inditoLap(hatokor, panel);
    panel.scrollIntoView({ block: 'start' });
  });
}

// ---- Belépési pontok a többi oldalon ----

// A kezdőlap vizsgaszakasza: komplex vizsgaszimuláció és minden tantárgy vizsgája.
function vizsgaSzakasz() {
  if (!Tananyag.vizsgaElerheto()) {
    return `<section class="resz vizsgak"><h2>🎓 Vizsgák és vizsgaszimuláció</h2><div class="temak">
      ${hamarosanKartya('🎓', 'Vizsgák', 'Témazáró, témakör- és tantárgyi vizsga, vizsgaszimuláció')}</div></section>`;
  }
  const kartyaja = (href, ikon, cim, leiras, kulcs) => {
    const e = vizsgaAllapot(kulcs).elozmenyek;
    const legjobb = e.length ? Math.max(...e.map((x) => x.szazalek)) : null;
    const folyamatban = !!vizsgaAllapot(kulcs).aktiv;
    return `<a class="tema vizsga-kartya" href="${href}"><span class="ikon">${ikon}</span><span class="nev">${cim}</span>
      <span class="leiras">${leiras}</span>
      <span class="haladas">${folyamatban ? '⏳ Folyamatban lévő vizsga' : legjobb != null ? `Legjobb eredményed: ${legjobb}% (${jegyLeiras(legjobb)[1]})` : 'Még nem vizsgáztál'}</span></a>`;
  };
  // Csak olyan vizsga indítható, amelynek körében már van feltöltött téma.
  const vanTemaja = (t) => t.menu.some((c) => c.temak.some((x) => t.temak[x.azon]));
  const komplex = Tananyag.teljes() && Tananyag.vizsgaElerheto('komplex') && Tananyag.tantargyak.some(vanTemaja);
  // Ha a tantárgyi vizsga nem érhető el, de a témakör-vizsga igen, az elérhető témakörök vizsgái kerülnek ide.
  const csoportVizsgak =
    !Tananyag.vizsgaElerheto('tantargy') && Tananyag.vizsgaElerheto('csoport')
      ? Tananyag.tantargyak
          .filter((t) => !t.hamarosan)
          .flatMap((t) =>
            t.menu
              .filter((c) => !c.hamarosan && c.temak.some((x) => t.temak[x.azon]))
              .map((c) => kartyaja(`#/vizsga/${t.azon}/${c.azon}`, c.ikon, `${c.cim} – témakör-vizsga`, 'A témakör összes témájából vegyesen', vizsgaKulcs([t.azon, c.azon]))),
          )
          .join('')
      : '';
  return `<section class="resz vizsgak"><h2>🎓 Vizsgák és vizsgaszimuláció</h2>
    <p class="bevezeto">Ha már gyakoroltál: mérd fel magad vizsgakörülmények között – segítség nélkül, időre. ${
      Tananyag.teljes() && Tananyag.vizsgaElerheto('tantargy')
        ? 'Minden tantárgynak, témakörnek és témának saját vizsgája van'
        : 'Az elérhető témakörökből vizsgázhatsz'
    } (a témáknál a 🎓 Témazáró fül).</p>
    <div class="temak">
      ${komplex ? kartyaja('#/vizsga', '🏆', 'Komplex vizsgaszimuláció', 'Minden tantárgy vegyesen + egész esetfeladatok, időre', 'osszes') : ''}
      ${csoportVizsgak}
      ${[...Tananyag.tantargyak]
        .sort((x, y) => x.hamarosan - y.hamarosan)
        .map((t) =>
          t.hamarosan || !Tananyag.vizsgaElerheto('tantargy') || !vanTemaja(t)
            ? hamarosanKartya(t.ikon, `${t.vizsgaCim || t.cim} – vizsga`)
            : kartyaja(`#/vizsga/${t.azon}`, t.ikon, `${t.vizsgaCim || t.cim} – vizsga`, t.esetek ? 'Egész esetek lépésről lépésre' : 'Az összes témából vegyesen', t.azon),
        )
        .join('')}
      ${komplex ? '' : hamarosanKartya('🏆', 'Komplex vizsgaszimuláció', 'Minden tantárgy vegyesen + egész esetfeladatok, időre')}
    </div></section>`;
}

function vizsgaGomb(href, cim, kulcs, fajta) {
  if (!Tananyag.vizsgaElerheto(fajta)) return '';
  const e = vizsgaAllapot(kulcs).elozmenyek;
  const utolso = e[e.length - 1];
  return `<p class="vizsga-gomb"><a class="gomb masodlagos" href="${href}">🎓 ${cim}</a>${
    utolso ? ` <span class="kerekites">Utolsó eredményed: ${utolso.szazalek}% (${utolso.jegy})</span>` : ''
  }</p>`;
}
