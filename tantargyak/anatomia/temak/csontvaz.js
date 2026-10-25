// Téma: Csontváz és ízületek
'use strict';

(() => {
  const kartya = (ikon, cim, szoveg = '') =>
    `<div class="nagy-kartya"><div class="nagy-ikon">${ikon}</div><div class="nagy-cim">${cim}</div>${szoveg ? `<p>${szoveg}</p>` : ''}</div>`;

  // Egyszerűsített csontváz (vonalas), kiemelhető részekkel
  const CSONTOK = {
    koponya: '<circle cx="100" cy="30" r="20" class="csont"/>',
    gerinc: '<line x1="100" y1="52" x2="100" y2="168" class="csont vastag"/>',
    mellkas: '<ellipse cx="100" cy="95" rx="34" ry="32" class="csont"/><line x1="100" y1="66" x2="100" y2="122" class="csont"/>',
    kulcscsont: '<line x1="64" y1="62" x2="98" y2="60" class="csont"/><line x1="102" y1="60" x2="136" y2="62" class="csont"/>',
    felkar: '<line x1="62" y1="64" x2="54" y2="130" class="csont vastag"/><line x1="138" y1="64" x2="146" y2="130" class="csont vastag"/>',
    alkar: '<line x1="52" y1="132" x2="46" y2="190" class="csont"/><line x1="58" y1="132" x2="54" y2="190" class="csont"/><line x1="148" y1="132" x2="154" y2="190" class="csont"/><line x1="142" y1="132" x2="146" y2="190" class="csont"/>',
    medence: '<path d="M70 168 Q100 200 130 168 L124 186 Q100 204 76 186 Z" class="csont"/><path d="M93 168 L107 168 L100 184 Z" class="csont"/>',
    comb: '<line x1="84" y1="192" x2="80" y2="270" class="csont vastag"/><line x1="116" y1="192" x2="120" y2="270" class="csont vastag"/>',
    labszar: '<line x1="78" y1="274" x2="76" y2="345" class="csont vastag"/><line x1="72" y1="276" x2="70" y2="343" class="csont"/><line x1="122" y1="274" x2="124" y2="345" class="csont vastag"/><line x1="128" y1="276" x2="130" y2="343" class="csont"/>',
  };
  const NEVEK = {
    koponya: 'Koponya',
    gerinc: 'Gerinc',
    mellkas: 'Mellkas (bordák, szegycsont)',
    kulcscsont: 'Kulcscsont',
    felkar: 'Felkarcsont',
    alkar: 'Orsó- és singcsont (alkar)',
    medence: 'Medence',
    comb: 'Combcsont',
    labszar: 'Sípcsont és szárkapocscsont (lábszár)',
  };
  // A kiemelt részt utoljára rajzoljuk, hogy más rész (pl. a mellkas a háti gerincet) ne takarja el.
  function csontvaz(kiemel = '') {
    const belso = Object.entries(CSONTOK)
      .sort(([a], [b]) => (a === kiemel) - (b === kiemel))
      .map(([k, s]) => (k === kiemel ? s.replace(/class="csont/g, 'class="csont kiemelt-csont') : s))
      .join('');
    return `<svg viewBox="0 0 200 360" class="abra" style="max-width:200px" role="img" aria-label="Csontváz">${belso}</svg>`;
  }

  // ---- Animáció ----
  const animacio = Object.keys(CSONTOK).map((k) => ({
    felirat: {
      koponya: '<b>Koponya:</b> védi az agyat (agykoponya), és az arc vázát adja (arckoponya). Csecsemőnél még nyitottak a <b>kutacsok</b>.',
      gerinc: '<b>Gerinc:</b> 7 nyaki, 12 háti, 5 ágyéki csigolya + keresztcsont + farokcsont. A csatornájában fut a gerincvelő.',
      mellkas: '<b>Mellkas:</b> 12 pár borda, a szegycsont és a háti csigolyák alkotják. Védi a szívet és a tüdőt. A szegycsont alsó vége a kardnyúlvány.',
      kulcscsont: '<b>Kulcscsont:</b> a lapockával együtt a vállövet alkotja. Eséskor (kinyújtott kézre) gyakran törik.',
      felkar: '<b>Felkarcsont:</b> a váll és a könyök között. A vállízület gömbízület – a legmozgékonyabb, ezért gyakran ficamodik.',
      alkar: '<b>Alkar:</b> orsócsont (a hüvelykujj felőli oldalon) és singcsont (a kisujj felőli oldalon). Kinyújtott kézre eséskor gyakori a csukló feletti orsócsonttörés.',
      medence: '<b>Medence:</b> a két medencecsont és a keresztcsont (a farokcsonttal) zárt csontgyűrűje. Törésénél nagy belső vérzés lehet!',
      comb: '<b>Combcsont:</b> a test leghosszabb, legerősebb csontja. Törése 1–1,5 l vérvesztéssel járhat. Időseknél jellemző a combnyaktörés.',
      labszar: '<b>Lábszár:</b> sípcsont (belül, vastag, a bőr alatt tapintható) és szárkapocscsont (kívül, vékony).',
    }[k],
    rajz: () => `<div style="display:flex;gap:12px;align-items:center;justify-content:center;width:100%">${csontvaz(k)}<b>${NEVEK[k]}</b></div>`,
  }));

  // ---- Interaktív rész: csontnevek ----
  function interaktiv(el) {
    el.innerHTML = `<div class="interaktiv"><div class="rajz"></div><div>
      <div class="valaszto-csoport"><b>Válassz csontot!</b><select>${Object.entries(NEVEK).map(([k, n]) => `<option value="${k}">${n}</option>`).join('')}</select></div></div></div>`;
    const v = el.querySelector('select');
    const fr = () => (el.querySelector('.rajz').innerHTML = csontvaz(v.value));
    v.addEventListener('change', fr);
    fr();
  }

  // ---- Feladatok ----
  const feladatok = [
    ...Tananyag.szint(1, [
      {
        kerdes: 'Kb. hány csontból áll a felnőtt csontváza?',
        valasztas: ['Kb. 206', 'Kb. 50', 'Kb. 1000', 'Kb. 12'],
        valasz: 'Kb. 206',
        segitseg: 'Kétszáz körül.',
        megoldas: 'A felnőtt csontváza kb. 206 csontból áll (újszülöttnél több, mert egyes csontok később összenőnek).',
      },
      {
        kerdes: 'Melyik a test leghosszabb, legerősebb csontja?',
        valasztas: ['Combcsont', 'Felkarcsont', 'Sípcsont', 'Gerinc'],
        valasz: 'Combcsont',
        segitseg: 'A comb csontja.',
        megoldas: 'A combcsont (femur) a leghosszabb és legerősebb csont. Törése nagy energiát igényel (kivéve időseknél a combnyakat).',
      },
      {
        kerdes: 'Melyik az alkar <b>hüvelykujj</b> felőli csontja?',
        valasztas: ['Orsócsont', 'Singcsont', 'Felkarcsont', 'Szárkapocscsont'],
        valasz: 'Orsócsont',
        segitseg: 'Itt tapintod a pulzust is (a. radialis).',
        megoldas: 'Orsócsont (radius) a hüvelykujj, singcsont (ulna) a kisujj felőli oldalon.',
      },
      {
        kerdes: 'Melyik a lábszár <b>belső</b>, vastagabb csontja, ami a bőr alatt tapintható elöl?',
        valasztas: ['Sípcsont', 'Szárkapocscsont', 'Combcsont', 'Térdkalács'],
        valasz: 'Sípcsont',
        segitseg: 'Ha nekimész valaminek, ez fáj.',
        megoldas: 'Sípcsont (tibia): a lábszár belső, teherviselő csontja. Szárkapocscsont (fibula): a külső, vékony csont.',
      },
    ]),
    ...Tananyag.szint(2, []),
    ...Tananyag.szint(3, []),
    ...Tananyag.szint(1, []),
    ...Tananyag.szint(2, []),
    ...Tananyag.szint(3, []),
    ...Tananyag.szint(2, []),
  ];

  Tananyag.tema('anatomia', {
    azon: 'csontvaz',
    ikon: '🦴',
    animacio,
    interaktiv,
    feladatok,
    magyarazat: `
      <div class="doboz cel">
        <b>Mire jó ez neked?</b>
        <p>A törések és ficamok ellátásához tudnod kell, melyik csont hol van, mit véd, mennyi vért veszíthet törésnél, és melyik ízületet kell rögzíteni. A csontváz <b>tart</b>, <b>véd</b>, <b>mozgat</b> és <b>vért termel</b>.</p>
      </div>
      <p class="kerekites">📘 Tankönyvi fejezet (Donáth Tibor: Anatómia–élettan): IV. fejezet – Mozgásrendszer (Csontvázrendszer: A csontokról általában; A csont szerkezete, fejlődése, növekedése, járulékos részei; A csontok összeköttetései; Az ízület szerkezete és összetartó tényezői; Az ízületekben létrejövő mozgások; A végtagok csontjai és ízületei)</p>

      <h3>Nézd meg lépésről lépésre!</h3>
      <div data-animacio></div>

      <h3>Próbáld ki!</h3>
      <div data-interaktiv></div>

      <h3>A csontváz részei</h3>
      <div class="tabla-keret"><table>
        <thead><tr><th>Rész</th><th>Csontok</th></tr></thead>
        <tbody>
          <tr><td>Koponya</td><td>agykoponya, arckoponya</td></tr>
          <tr><td>Gerinc</td><td>7 nyaki, 12 háti, 5 ágyéki csigolya, keresztcsont, farokcsont</td></tr>
          <tr><td>Mellkas</td><td>háti csigolyák, 12 pár borda, szegycsont (markolat, test, kardnyúlvány)</td></tr>
          <tr><td>Vállöv, felső végtag</td><td>kulcscsont, lapocka; felkarcsont; orsócsont (hüvelykujj felőli), singcsont (kisujj felőli); kéztő (8), kézközép (5), ujjpercek (14)</td></tr>
          <tr><td>Medenceöv, alsó végtag</td><td>medencecsont (csípő-, ülő-, szeméremcsont), keresztcsont; combcsont, térdkalács; sípcsont (belső), szárkapocscsont (külső); lábtő (7), lábközép (5), ujjpercek (14)</td></tr>
        </tbody>
      </table></div>

      <h3>A csontokról általában</h3>
      <ul>
        <li>A mozgásrendszer <b>passzív</b> része a csontváz (csontok és ízületek), <b>aktív</b> része az izomzat.</li>
        <li>A csontváz <b>206</b> csontból áll, a testtömeg kb. <b>10%-a</b>. Hármas feladata: <b>támasz</b>, életfontos szervek <b>védelme</b>, a <b>vörös csontvelő</b> (vérképzés) befogadása.</li>
        <li>Alak szerint: <b>hosszú csöves</b> (combcsont), <b>lapos</b> (lapocka), <b>rövid</b> (kéztőcsontok), <b>szabálytalan</b> (csigolyák) csontok.</li>
        <li>Két fő tulajdonsága a <b>rugalmasság</b> és a <b>szilárdság</b>. A szilárd anyag 30–40%-a szerves (főleg <b>osszein</b> – rugalmasság), 60–70%-a szervetlen (főleg <b>hidroxiapatit</b> – szilárdság). Gyermekben több a szerves anyag, időseknél a csont ritkul. Dekalcinálás (savban a mész kioldódik → hajlítható csont), kalcinálás (égetés → porlékony csont).</li>
      </ul>

      <h3>A csont szerkezete, fejlődése, növekedése</h3>
      <ul>
        <li>Kívül <b>tömör (kompakt)</b>, belül <b>szivacsos</b> állomány; a csöves csontok üregében a <b>csontvelő</b>. A szivacsos állomány gerendái az erővonalak mentén rendeződnek (<b>trajektoriális szerkezet</b>).</li>
        <li><b>Fejlődés:</b> a váz előbb porcos alakban jelenik meg; a csontosodás az embrionális élet 2. hónapjának végén indul, és kb. a <b>20. életévig</b> tart. A csontot a csontképző sejtek (<b>osteoblastok</b>) hozzák létre, csontosodási pontokból kiindulva. A koponyatető csontjai közvetlenül kötőszövetből csontosodnak.</li>
        <li><b>Növekedés:</b> hosszában a középső és a végrész határán lévő <b>epiphysis porckorong</b> (növekedési porc) révén, vastagságban a <b>csonthártya</b> felől rárakódással. A csontfaló sejtek (<b>osteoclastok</b>) folyamatosan bontják a régi állományt: gyermekkorban az építés, idős korban a bontás van túlsúlyban.</li>
        <li><b>Járulékos részek:</b> a porc, a <b>csonthártya</b> (periosteum) és a csontvelő. A csonthártya erekben, idegekben gazdag – ezért fáj és vérzik a törés. Hármas feladata: a csont <b>táplálása és védelme</b>, sérüléskor az <b>anyaghiány pótlása</b>, a <b>vastagságbeli növekedés</b>. Csonthártya nélkül a csont elhal.</li>
        <li><b>Vörös csontvelő:</b> vérképzés (lapos csontok, csigolyák, csöves csontok vége) – ide adható io. gyógyszer.</li>
      </ul>

      <h3>A csontok összeköttetései</h3>
      <ul>
        <li><b>Folytonos</b> összeköttetés: kötőszövetes (koponyavarratok – sutura, szalagok – ligamentum, hártyák), porcos (porckorong – discus, szeméremcsonti összenövés – symphysis), csontos (pl. keresztcsont).</li>
        <li><b>Megszakított</b> összeköttetés: az <b>ízület</b> (articulatio) – a csontvégek között rés van.</li>
      </ul>

      <h3>Az ízület</h3>
      <ul>
        <li>Állandó részei: porccal (0,5–2 mm üvegporc) borított <b>ízfelszínek</b> (domború ízületi fej, homorú ízületi árok), <b>ízületi tok</b> (külső rostos, belső synovialis réteg), <b>ízületi üreg</b>, <b>ízületi nedv</b> (synovia – kenőanyag), <b>szalagok</b>.</li>
        <li>Járulékos részei: porcszegély (váll- és csípőízület), porckorong vagy meniscus (állkapocsízület, térdízület), nyálkatömlő (bursa).</li>
        <li><b>Összetartó tényezők:</b> légnyomás (légüres ízületi rés – a combfejre kb. 12,5 kg), a porcfelszínek tapadása (adhézió), a tok és a szalagok, a környező izmok tónusa, a lágyrészek és a bőr.</li>
      </ul>
      <div class="tabla-keret"><table>
        <thead><tr><th>Ízülettípus (ízfelszín alakja)</th><th>Mozgás</th><th>Példa</th></tr></thead>
        <tbody>
          <tr><td>gömbízület (szabad ízület)</td><td>minden irányban</td><td>váll (a legmozgékonyabb), csípő</td></tr>
          <tr><td>henger- vagy csuklóízület</td><td>egy tengely: hajlítás-feszítés</td><td>ujjpercek, singcsont–felkarcsont, felső ugróízület</td></tr>
          <tr><td>ellipszoid és nyeregízület</td><td>két tengely: hajlítás-feszítés, közelítés-távolítás</td><td>kézcsukló (ellipszoid), hüvelykujj tövén (nyereg)</td></tr>
          <tr><td>lapos ízület</td><td>gyakorlatilag nincs mozgás</td><td>keresztcsont–csípőcsont</td></tr>
        </tbody>
      </table></div>
      <p>Mozgásformák: <b>hajlítás (flexió), feszítés (extenzió), közelítés (addukció), távolítás (abdukció), forgó mozgás (rotáció)</b>. Az alkaron: <b>pronáció</b> (tenyér lefelé, a két alkarcsont keresztezi egymást) és <b>szupináció</b> (tenyér felfelé, párhuzamosak).</p>

      <h3>A végtagok – amit a tankönyv kiemel</h3>
      <ul>
        <li><b>Vállöv:</b> kulcscsont (clavicula, S alakú, teljes hosszában tapintható) és lapocka (scapula, rajta a lapockatövis és a vállcsúcs – acromion). A törzzsel csak a szegycsonton át ízesül.</li>
        <li><b>Felkarcsont</b> (humerus): fej, nagy és kis dudor (tuberculum majus et minus), alattuk a <b>sebészi nyak</b> (gyakori törési hely). A vállízület az ember legmozgékonyabb, de leggyakrabban ficamodó ízülete.</li>
        <li><b>Alkar:</b> orsócsont (radius, hüvelykujj oldal) és singcsont (ulna, kisujj oldal; felső vége a könyöknyúlvány – olecranon). A könyökízület három ízületből áll.</li>
        <li><b>Kéz:</b> kéztő (carpus) 8 csont két sorban, kézközép (metacarpus) 5, ujjpercek 14 (a hüvelykujj 2 percből áll). A hüvelykujj nyeregízülete teszi lehetővé a szembefordítást (oppozíció).</li>
        <li><b>Medenceöv:</b> a két medencecsont és a keresztcsont. A medencecsont (os coxae) a csípőcsont (os ilium), az ülőcsont (os ischii) és a szeméremcsont (os pubis) összecsontosodásából jön létre (20–25 éves korra); találkozásukban a csípőízületi árok (acetabulum). 💬 Ma az os coxae-t gyakran csípőcsontnak, az os iliumot bélcsontnak nevezik. Elöl a symphysis, hátul a keresztcsont–csípőcsonti ízület zárja a gyűrűt. Nagy- és kismedence; a női medence szélesebb, be- és kimenete tágabb. A medencebemenet a vízszintessel 50–70°-ot zár be (medencedőlés).</li>
        <li><b>Combcsont</b> (femur): a test leghosszabb csöves csontja; fej, nyak (a testtel kb. 130°-os szöget zár be), nagy és kis tompor (trochanter major et minor). A csípőízület gömbízület, a vállnál korlátozottabb, de erősebb.</li>
        <li><b>Térdízület</b> (articulatio genus): a test legnagyobb, legbonyolultabb ízülete; combcsont és sípcsont között a félhold alakú porclemezek (meniscusok), elöl a térdkalács (patella).</li>
        <li><b>Lábszár:</b> sípcsont (tibia, mediális; alsó vége a belső boka) és szárkapocscsont (fibula, laterális; alsó vége a külső boka). <b>Bokaízület</b> (felső ugróízület): hengerízület a bokavilla és az ugrócsont között.</li>
        <li><b>Láb:</b> lábtő (tarsus) 7 csont, lábközép (metatarsus) 5, ujjpercek 14. A <b>lábboltozat</b> hosszanti és haránt irányban ível; süllyedése a lúdtalp.</li>
      </ul>

      <h3>A gyakorlatban</h3>
      <div class="doboz szakma">
        <p><b>🚑 Csontok és vérvesztés</b></p>
        <ul>
          <li>Medence: <b>akár több liter</b> · Comb: <b>1–1,5 l</b> · Lábszár: <b>0,5–1 l</b> · Felkar: <b>0,5 l</b> · Alkar: <b>0,25 l</b>.</li>
          <li>Törés <b>biztos jelei</b>: deformitás, kóros mozgathatóság, recsegés, látható csontvég; <b>bizonytalan jelei</b>: fájdalom, duzzanat, bevérzés, működészavar. Rögzítés: a törés feletti és alatti ízület is.</li>
          <li><b>Ficam</b> (luxáció): az ízvégek tartósan elhagyják helyüket, rugalmas rögzítettség – rögzítés a talált helyzetben. <b>Rándulás</b> (disztorzió): átmeneti elmozdulás szalagsérüléssel, az ízület visszaáll.</li>
          <li>Idős + esés: <b>combnyak, csukló, csigolya</b> (csontritkulás).</li>
          <li>Gyermek: <b>zöldgally-törés</b>; a növekedési porc sérülhet.</li>
        </ul>
      </div>

      <details class="tobbet">
        <summary>Ha többet szeretnél tudni: csonttípusok példákkal</summary>
        <ul>
          <li><b>Hosszú csöves csontok:</b> combcsont, felkarcsont – velőüreg, a végeken szivacsos állomány.</li>
          <li><b>Rövid csontok:</b> kéztő, lábtő.</li>
          <li><b>Lapos csontok:</b> koponyatető, szegycsont, lapocka, csípőcsont (csípőlapát) – vörös csontvelő.</li>
          <li><b>Szabálytalan csontok:</b> csigolyák.</li>
        </ul>
      </details>

      <h3>Gyakori hibák</h3>
      <ul>
        <li>❌ <b>Orsócsont és singcsont</b> felcserélése.</li>
        <li>❌ <b>Sípcsont és szárkapocscsont</b> felcserélése.</li>
        <li>❌ <b>Alábecsülöd</b> a medence- és combtörés vérvesztését.</li>
      </ul>

      <div class="doboz jegyezd">
        <b>Jegyezd meg!</b>
        <ul>
          <li>Kb. <b>206</b> csont (a testtömeg 10%-a); gerinc: <b>7–12–5</b>; <b>12 pár</b> borda.</li>
          <li>Hossznövekedés: epiphysis porckorong; vastagodás: csonthártya. Osteoblast épít, osteoclast bont.</li>
          <li>Ízület: ízfelszínek + tok + üreg + nedv + szalagok; gömb-, henger-, ellipszoid-, nyereg-, lapos ízület.</li>
          <li>Orsócsont = <b>hüvelykujj</b> oldal; sípcsont = <b>belső</b>, tapintható.</li>
          <li>Csonthártya fáj és vérzik; vörös csontvelő = vérképzés.</li>
          <li>Medence- és combtörés = <b>nagy vérvesztés</b>.</li>
        </ul>
      </div>`,
  });
})();
