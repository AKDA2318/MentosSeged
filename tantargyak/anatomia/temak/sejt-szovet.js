// Téma: Sejt, szövetek, homeosztázis, folyadékterek, anyagszállítás
'use strict';

(() => {
  const sz = Rajz.szam;
  const kartya = (ikon, cim, szoveg = '') =>
    `<div class="nagy-kartya"><div class="nagy-ikon">${ikon}</div><div class="nagy-cim">${cim}</div>${szoveg ? `<p>${szoveg}</p>` : ''}</div>`;

  // Folyadékterek oszlopdiagramja
  function folyadek(kg) {
    const viz = kg * 0.6;
    const icf = (viz * 2) / 3;
    const ecf = viz / 3;
    const sav = (x, h, o, t1, t2) =>
      `<rect x="${x}" y="${180 - h}" width="70" height="${h}" class="${o}" style="stroke: var(--szoveg); stroke-width: 1.5"/>` + Rajz.szoveg(x + 35, 192, t1, 'kicsi') + Rajz.szoveg(x + 35, 170 - h, t2, 'kicsi');
    const s = 150 / viz;
    return Rajz.svg(
      320,
      200,
      sav(10, viz * s, 'kitolt-b', 'összes víz', `${sz(viz, 1)} l`) +
        sav(90, icf * s, 'kitolt-c', 'sejten belül', `${sz(icf, 1)} l`) +
        sav(170, ((ecf * 3) / 4) * s, 'kitolt-sarga-r', 'sejtek között', `${sz((ecf * 3) / 4, 1)} l`) +
        sav(250, (ecf / 4) * s, 'kitolt-piros-r', 'vérplazma', `${sz(ecf / 4, 1)} l`),
      'Folyadékterek',
    );
  }

  // ---- Animáció ----
  const animacio = [
    { felirat: 'A test legkisebb élő egysége a <b>sejt</b> (cellula). Általában 10–30 µm-es, csak mikroszkóppal látható; kb. 30 billió (30 000 milliárd) sejtből állunk.', rajz: () => kartya('🔬', 'A sejt') },
    { felirat: 'A <b>sejthártya</b> körülveszi és védi a sejtet, és szabályozza, mi juthat be és ki. A <b>sejtmagban</b> (nucleus) van az örökítőanyag (DNS); osztódáskor ez a testi sejtekben 46 kromoszómába rendeződik.', rajz: () => kartya('⭕🧬', 'Sejthártya és sejtmag') },
    { felirat: 'A <b>mitokondrium</b> a sejt „erőműve”: oxigén segítségével energiát (ATP-t) termel. Oxigén nélkül sokkal kevesebb energia keletkezik, és <b>tejsav</b> halmozódik fel.', rajz: () => kartya('⚡🔋', 'Mitokondrium = erőmű') },
    { felirat: 'A hasonló sejtek <b>szöveteket</b> alkotnak: hám-, kötő- és támasztó-, izom- és idegszövet. A szövetekből épülnek fel a <b>szervek</b>.', rajz: () => kartya('🧱', 'Sejt → szövet → szerv → szervrendszer') },
    { felirat: 'A <b>homeosztázis</b> a belső környezet állandósága: testhő, vércukor, pH, víz- és sóháztartás. Ha felborul (pl. kihűlés, kiszáradás, savasodás), a szervek működése romlik.', rajz: () => kartya('⚖️', 'Homeosztázis') },
  ];

  // ---- Interaktív rész: folyadékterek ----
  const interaktiv = Rajz.interaktiv({
    csuszkak: [{ k: 'kg', cim: 'Testtömeg', min: 40, max: 120, lepes: 5, ertek: 70, egyseg: 'kg' }],
    frissit: ({ kg }) => ({
      rajz: folyadek(kg),
      szamitas: `<p>Összes víz: ${kg} · 0,6 = <b>${sz(kg * 0.6, 1)} l</b> (felnőttnél kb. 60%)</p>
        <p>Sejten belül (⅔): <b>${sz(kg * 0.4, 1)} l</b>, sejten kívül (⅓): <b>${sz(kg * 0.2, 1)} l</b></p>
        <p>A sejten kívüli folyadék ¾-e a sejtek között, ¼-e a vérplazmában van.</p>
        <p class="kerekites">Csecsemőnél a víz aránya magasabb (kb. 70–80%), időseknél alacsonyabb.</p>`,
    }),
  });

  // ---- Feladatok ----
  const SZOVET = ['Hámszövet', 'Kötő- és támasztószövet', 'Izomszövet', 'Idegszövet'];
  const szovet = (kerdes, valasz, segitseg, megoldas) => ({
    kerdes,
    valasztas: SZOVET,
    valasz,
    fixSorrend: true,
    segitseg,
    megoldas,
  });

  const feladatok = [
    ...Tananyag.szint(1, [
      {
        kerdes: 'Melyik sejtalkotó termeli a sejt energiáját?',
        valasztas: ['Mitokondrium', 'Sejtmag', 'Sejthártya', 'Riboszóma'],
        valasz: 'Mitokondrium',
        segitseg: 'A sejt „erőműve”.',
        megoldas: 'A mitokondrium oxigén felhasználásával ATP-t (energiát) termel.',
      },
      {
        kerdes: 'Hol található a sejt örökítőanyaga (DNS)?',
        valasztas: ['A sejtmagban', 'A sejthártyában', 'A vérben', 'A lizoszómában'],
        valasz: 'A sejtmagban',
        segitseg: 'A sejt „irányítóközpontja”.',
        megoldas: 'A DNS főként a sejtmagban van; ez irányítja a sejt működését.',
      },
      szovet('Melyik szövettípus borítja a test felszínét (bőr) és béleli a szerveket (nyálkahártya)?', 'Hámszövet', 'Ebből a szövetből épülnek fel a mirigyek is.', 'A hámszövet borít és bélel: bőr felhámja, nyálkahártyák, mirigyek.'),
      szovet('Melyik szövettípusba tartozik a csont, a porc és a vér?', 'Kötő- és támasztószövet', 'Sok sejtközötti állomány jellemzi; a vérben ez a plazma.', 'A csont, porc, ín, zsír és a vér is kötő- és támasztószövet.'),
      szovet('Melyik szövet képes összehúzódni?', 'Izomszövet', 'Sejtjeiben miofibrillumok rövidülnek meg.', 'Az izomszövet összehúzódásra képes: váz-, sima- és szívizom.'),
      szovet('Melyik szövet vezeti az ingerületet?', 'Idegszövet', 'Egysége a neuron.', 'Az idegszövet (idegsejtek) ingerületet hoz létre és vezet.'),
      {
        kerdes: 'Mit jelent a <b>homeosztázis</b>?',
        valasztas: ['A belső környezet (testhő, vércukor, pH, víz) állandósága', 'A sejtek osztódása', 'A vérzés megállása', 'Az izmok növekedése'],
        valasz: 'A belső környezet (testhő, vércukor, pH, víz) állandósága',
        segitseg: '„homeo” = hasonló, „sztázis” = állapot.',
        megoldas: 'Homeosztázis: a belső környezet viszonylagos állandósága, amelyet a szervezet szabályozó rendszerei (ideg- és hormonrendszer) tartanak fenn.',
      },
      {
        kerdes: 'Kb. hány százaléka víz egy felnőtt testtömegének?',
        valasztas: ['Kb. 60%', 'Kb. 10%', 'Kb. 90%', 'Kb. 30%'],
        valasz: 'Kb. 60%',
        segitseg: 'Több mint a fele.',
        megoldas: 'Felnőttnél a testtömeg kb. 60%-a víz (csecsemőnél több, idősnél kevesebb).',
      },
      {
        kerdes: 'Mi keletkezik a sejtekben, ha nincs elég oxigén (anaerob anyagcsere)?',
        valasztas: ['Tejsav (laktát) és kevesebb energia', 'Több energia', 'Oxigén', 'Cukor'],
        valasz: 'Tejsav (laktát) és kevesebb energia',
        segitseg: 'Megerőltető munkánál az izomban is felhalmozódik.',
        megoldas: 'Oxigén nélkül a sejt csak kevés energiát tud termelni, és tejsav keletkezik. Sokkban ez a vér savasodásához (acidózis) vezet.',
      },
      {
        kerdes: 'Mennyi víz van kb. egy 50 kg-os felnőtt testében (60%)?',
        valasz: 30,
        egyseg: 'liter',
        szakma: CIMKEK.SZAMOLAS,
        segitseg: 'Testtömeg · 0,6.',
        megoldas: '50 · 0,6 = 30 liter.',
      },
    ]),
    ...Tananyag.szint(2, [
      {
        kerdes: 'Mi a vér normális pH-ja?',
        valasztas: ['7,35–7,45', '6,0–6,5', '8,0–8,5', '5,0'],
        valasz: '7,35–7,45',
        segitseg: 'Enyhén lúgos.',
        megoldas: 'A vér pH-ja 7,35–7,45. Alatta acidózis (savasodás), fölötte alkalózis. Már kis eltérés is súlyos lehet.',
      },
      {
        kerdes: 'Milyen pH-nál beszélünk <b>acidózisról</b>?',
        valasztas: ['7,35 alatt', '7,45 fölött', '7,40-nél', '8 fölött'],
        valasz: '7,35 alatt',
        segitseg: 'Savas = alacsonyabb pH.',
        megoldas: 'Acidózis: a pH 7,35 alatt van (pl. sokkban, ketoacidózisban, légzési elégtelenségben). Alkalózis: a pH 7,45 fölött van (pl. hiperventilációban).',
      },
      {
        kerdes: 'Mi a <b>diffúzió</b>?',
        valasztas: [
          'Az anyagok mozgása a nagyobb koncentráció felől a kisebb felé, energia nélkül (pl. gázcsere a tüdőben)',
          'Energiát igénylő szállítás',
          'A víz mozgása a vérben',
          'A sejt osztódása',
        ],
        valasz: 'Az anyagok mozgása a nagyobb koncentráció felől a kisebb felé, energia nélkül (pl. gázcsere a tüdőben)',
        segitseg: 'Mint egy csepp tinta a vízben.',
        megoldas: 'Diffúzió: az anyag a sűrűbb helyről a ritkább felé áramlik, magától. Így jut az oxigén a léghólyagocskákból a vérbe.',
      },
      {
        kerdes: 'Mi az <b>ozmózis</b>?',
        valasztas: [
          'A víz áramlása egy féligáteresztő hártyán át a töményebb oldat felé',
          'A só mozgása a víz felé',
          'A vér alvadása',
          'Az izom összehúzódása',
        ],
        valasz: 'A víz áramlása egy féligáteresztő hártyán át a töményebb oldat felé',
        segitseg: 'A víz „hígítani” akarja a töményebb oldalt.',
        megoldas: 'Ozmózis: a víz a féligáteresztő hártyán át a töményebb (több oldott anyagot tartalmazó) oldat felé áramlik. Ezért kell az infúziónak a vérrel azonos töménységűnek (izotóniásnak) lennie.',
      },
      {
        kerdes: 'Melyik izomtípus <b>akaratlan</b>, mégis harántcsíkolt?',
        valasztas: ['Szívizom', 'Vázizom', 'Simaizom', 'Egyik sem'],
        valasz: 'Szívizom',
        segitseg: 'Nem tudod akarattal megállítani.',
        megoldas: 'Szívizom: harántcsíkolt, de akaratlan. Vázizom: harántcsíkolt, akaratlagos. Simaizom: akaratlan, nem harántcsíkolt (belek, erek, hörgők).',
      },
      {
        kerdes: 'Hol található <b>simaizom</b>?',
        valasztas: ['Az erek, hörgők, belek, húgyhólyag falában', 'A bicepszben', 'A combizomban', 'A szívben'],
        valasz: 'Az erek, hörgők, belek, húgyhólyag falában',
        segitseg: 'A belső szervek akaratlan izma.',
        megoldas: 'Simaizom: az üreges belső szervek és az erek falában. Asztmában a hörgők simaizma görcsöl.',
      },
      {
        kerdes: 'Egy 70 kg-os felnőtt teljes víztartalma 42 l. Ebből mennyi van a sejteken <b>belül</b> (⅔)?',
        valasz: 28,
        egyseg: 'liter',
        szakma: CIMKEK.SZAMOLAS,
        segitseg: '42 · 2 : 3.',
        megoldas: '42 · 2 : 3 = 28 liter.',
      },
      {
        kerdes: 'Egy 70 kg-os felnőtt teljes víztartalma 42 l. Ebből mennyi van a sejteken <b>kívül</b> (⅓)?',
        valasz: 14,
        egyseg: 'liter',
        szakma: CIMKEK.SZAMOLAS,
        segitseg: '42 : 3.',
        megoldas: '42 : 3 = 14 liter (ebből kb. ¾ a sejtek között, ¼ a vérplazmában).',
      },
      {
        kerdes: 'Mi a <b>negatív visszacsatolás</b>?',
        valasztas: [
          'Szabályozás, amelyben az eltérés ellentétes irányú választ vált ki (pl. melegben izzadás hűt)',
          'Amikor egy folyamat önmagát erősíti',
          'A sejtek pusztulása',
          'Rossz visszajelzés a betegtől',
        ],
        valasz: 'Szabályozás, amelyben az eltérés ellentétes irányú választ vált ki (pl. melegben izzadás hűt)',
        segitseg: 'Mint egy termosztát.',
        megoldas: 'A negatív visszacsatolás a homeosztázis alapja: ha valami eltér (pl. nő a testhő), a szervezet ellentétesen reagál (izzad, hűl). Mint a termosztát.',
      },
      {
        kerdes: 'Miért izotóniás (pl. 0,9%-os NaCl) az infúzió?',
        valasztas: [
          'Mert a vérrel azonos töménységű, így a vörösvértestek nem duzzadnak meg és nem zsugorodnak',
          'Mert olcsó',
          'Mert édes',
          'Mert fertőtlenít',
        ],
        valasz: 'Mert a vérrel azonos töménységű, így a vörösvértestek nem duzzadnak meg és nem zsugorodnak',
        segitseg: 'Ozmózis.',
        megoldas: 'Az izotóniás oldat töménysége megegyezik a vérével, így nincs káros vízáramlás a sejtek és a környezet között. Tiszta vizet vénába adni tilos: a vörösvértestek megduzzadnak, szétesnek.',
      },
    ]),
    ...Tananyag.szint(3, [
      {
        kerdes: 'Sokkban miért lesz savas (acidózisos) a vér?',
        szakma: CIMKEK.ESET,
        valasztas: [
          'Mert a szövetek oxigénhiányában anaerob anyagcsere indul, és tejsav halmozódik fel',
          'Mert a beteg savanyú ételt evett',
          'Mert túl sok oxigént kap',
          'Nem lesz savas',
        ],
        valasz: 'Mert a szövetek oxigénhiányában anaerob anyagcsere indul, és tejsav halmozódik fel',
        segitseg: 'Kevés oxigén → tejsav.',
        megoldas: 'Sokkban a szövetek kevés oxigént kapnak, a sejtek anaerob módon termelnek energiát, tejsav halmozódik fel: acidózis. Az acidózis rontja a szív működését és a véralvadást.',
      },
      {
        kerdes: 'Egy 80 kg-os felnőtt vérplazmájának térfogata kb. mennyi? (víz 60%; sejten kívül ⅓; ennek ¼-e plazma)',
        valasz: 4,
        egyseg: 'liter',
        szakma: CIMKEK.SZAMOLAS,
        segitseg: 'Előbb a teljes víz (80 · 0,6), ennek harmada a sejten kívüli, annak negyede a plazma.',
        megoldas: 'Víz: 48 l. Sejten kívül: 16 l. Plazma: 16 : 4 = 4 l.',
      },
      {
        kerdes: 'Miért száradnak ki könnyebben a csecsemők?',
        szakma: CIMKEK.GYERMEK,
        valasztas: [
          'Mert testük víztartalma nagyobb arányú, testfelületük nagy, anyagcseréjük gyors, és nem tudnak inni maguktól',
          'Mert kevés vizet tartalmaznak',
          'Mert nem izzadnak',
          'Nem száradnak ki könnyebben',
        ],
        valasz: 'Mert testük víztartalma nagyobb arányú, testfelületük nagy, anyagcseréjük gyors, és nem tudnak inni maguktól',
        segitseg: 'Nagy forgalom, kis tartalék.',
        megoldas: 'Csecsemőknél a víz aránya (70–80%) és a napi vízforgalom nagy, a testfelület a tömeghez képest nagy. Hányás, hasmenés, láz mellett gyorsan kiszáradnak.',
      },
      {
        kerdes: 'Mi történne, ha valakinek nagy mennyiségű <b>desztillált vizet</b> adnánk vénásan?',
        valasztas: [
          'A víz beáramlana a vörösvértestekbe, azok megduzzadnának és szétesnének (hemolízis)',
          'Semmi',
          'Javulna a keringése',
          'Megnőne a vércukra',
        ],
        valasz: 'A víz beáramlana a vörösvértestekbe, azok megduzzadnának és szétesnének (hemolízis)',
        segitseg: 'Hipotóniás oldat.',
        megoldas: 'A desztillált víz hipotóniás: ozmózissal a vörösvértestekbe áramlik, azok szétpattannak (hemolízis). Ezért vénába csak megfelelő töménységű oldat adható.',
      },
      {
        kerdes: 'A hiperventiláló beteg vére lúgosabb lesz (alkalózis). Miért?',
        valasztas: [
          'Mert túl sok szén-dioxidot lélegzik ki, és a CO₂ a vérben savként viselkedik',
          'Mert túl sok oxigént vesz fel',
          'Mert lúgot ivott',
          'Nem lesz lúgosabb',
        ],
        valasz: 'Mert túl sok szén-dioxidot lélegzik ki, és a CO₂ a vérben savként viselkedik',
        segitseg: 'CO₂ + víz = szénsav.',
        megoldas: 'A CO₂ a vérben szénsavat képez. Ha a beteg túl sokat lélegzik ki, kevesebb a sav, a vér lúgosabb lesz (légzési alkalózis): zsibbadás a száj körül, kézgörcs.',
      },
      {
        kerdes: 'A légzési elégtelenségben lévő beteg vére miért savasodik?',
        valasztas: [
          'Mert nem tudja kilélegezni a CO₂-t, amely szénsavként savasítja a vért',
          'Mert túl sok oxigént vesz fel',
          'Mert lúgot termel',
          'Nem savasodik',
        ],
        valasz: 'Mert nem tudja kilélegezni a CO₂-t, amely szénsavként savasítja a vért',
        segitseg: 'A hiperventiláció ellentéte.',
        megoldas: 'Elégtelen légzésnél a CO₂ felhalmozódik, a vér savasodik (légzési acidózis). Ez aluszékonyságot, zavartságot okoz.',
      },
      {
        kerdes: 'Melyik az a szövet, amely a legkevésbé tűri az oxigénhiányt (perceken belül károsodik)?',
        valasztas: ['Idegszövet (agy)', 'Csont', 'Porc', 'Zsírszövet'],
        valasz: 'Idegszövet (agy)',
        segitseg: 'Ezért olyan sürgős az újraélesztés.',
        megoldas: 'Az agy idegsejtjei a legérzékenyebbek: néhány perc oxigénhiány után maradandóan károsodnak. Ezért kell a szívmegállásnál azonnal kompresszióval keringést biztosítani.',
      },
      {
        kerdes: 'Lázban miért marad tartósan magas a testhő, bár a hőszabályozás (homeosztázis) működik?',
        valasztas: [
          'Mert fertőzéskor az agy hőközpontja magasabb „beállítást” kap, és a test ehhez szabályoz (didergés, érösszehúzódás)',
          'Mert a homeosztázis megszűnik',
          'Mert a beteg sokat eszik',
          'Mert a láz mindig hőguta',
        ],
        valasz: 'Mert fertőzéskor az agy hőközpontja magasabb „beállítást” kap, és a test ehhez szabályoz (didergés, érösszehúzódás)',
        segitseg: 'A termosztát átállítása.',
        megoldas: 'Lázban a hőközpont (hipotalamusz) „termosztátja” magasabbra áll; a test didergéssel, érösszehúzódással emeli a hőt. Ez különbözik a hőgutától, ahol a hőleadás elégtelen.',
      },
      {
        kerdes: 'Egy 10 kg-os csecsemő víztartalma 75%. Hány liter víz van a testében?',
        valasz: 7.5,
        egyseg: 'liter',
        szakma: CIMKEK.GYERMEK,
        segitseg: 'Testtömeg · 0,75.',
        megoldas: '10 · 0,75 = 7,5 liter.',
      },
      {
        kerdes: 'Mi az <b>aktív transzport</b>?',
        valasztas: [
          'Energiát (ATP-t) igénylő anyagszállítás a koncentrációkülönbséggel szemben (pl. nátrium-kálium pumpa)',
          'Energia nélküli mozgás',
          'A víz áramlása',
          'A vér keringése',
        ],
        valasz: 'Energiát (ATP-t) igénylő anyagszállítás a koncentrációkülönbséggel szemben (pl. nátrium-kálium pumpa)',
        segitseg: '„Felfelé” szállítás, energiával.',
        megoldas: 'Aktív transzport: energiát igénylő szállítás az alacsonyabb koncentráció felől a magasabb felé (pl. Na⁺/K⁺ pumpa). Oxigénhiányban kevés az energia, a pumpák leállnak, a sejtek megduzzadnak.',
      },
    ]),
    ...Tananyag.szint(1, [
      { kerdes: 'Mi az élő szervezet legkisebb alaki és működési egysége?', valasztas: ['A sejt', 'A szerv', 'Az atom', 'A szövet'], valasz: 'A sejt', segitseg: 'Mindent sejtek építenek fel.', megoldas: 'Sejt → szövet → szerv → szervrendszer → szervezet.' },
      { kerdes: 'Mi a <b>szövet</b>?', valasztas: ['Azonos alakú és működésű sejtek összessége', 'Egyetlen sejt', 'Egy szerv', 'A vér folyékony része'], valasz: 'Azonos alakú és működésű sejtek összessége', segitseg: 'Pl. izomszövet.', megoldas: 'A szövetet – a hám kivételével – a sejtek mellett sejtközötti állomány is alkotja. Négy alapszövet: hámszövet, kötő- és támasztószövet, izomszövet, idegszövet.' },
      { kerdes: 'Melyik a négy alapszövet?', valasztas: ['Hám-, kötő- és támasztó-, izom-, idegszövet', 'Csont, vér, bőr, zsír', 'Szív, tüdő, máj, vese', 'Sejt, mag, hártya, plazma'], valasz: 'Hám-, kötő- és támasztó-, izom-, idegszövet', segitseg: 'Borít, összeköt, mozgat, irányít.', megoldas: 'Hám: borít, bélel; kötő- és támasztó: összeköt, tart (csont, porc, vér is); izom: mozgat; ideg: ingerületet vezet.' },
      { kerdes: 'Mit határol a <b>sejthártya</b>?', valasztas: ['A sejtet a környezetétől; szabályozza, mi juthat be és ki', 'Csak a sejtmagot', 'A szerveket', 'Az ereket'], valasz: 'A sejtet a környezetétől; szabályozza, mi juthat be és ki', segitseg: 'Kapuőr.', megoldas: 'A sejthártya féligáteresztő: a víz, a gázok könnyen átjutnak, más anyagok csak szállítók vagy csatornák segítségével.' },
      { kerdes: 'Melyik sejtalkotó végzi a <b>fehérjeszintézist</b>?', valasztas: ['Riboszóma', 'Mitokondrium', 'Golgi-készülék', 'Sejtközpont (centriolumok)'], valasz: 'Riboszóma', segitseg: 'Csak elektronmikroszkóppal látható szemcsék az endoplazmás hálózaton.', megoldas: 'A riboszómák (csak elektronmikroszkóppal láthatók) az endoplazmás hálózaton ülnek, és fehérjét szintetizálnak. Mitokondrium: energia; Golgi-készülék: váladékképzés; sejtközpont: sejtosztódás.' },
      { kerdes: 'Melyik a három izomszövet-fajta?', valasztas: ['Simaizom, harántcsíkolt izom, szívizom', 'Vázizom, ínszövet, porc', 'Simaizom, zsírszövet, szívizom', 'Bőrizom, csontizom, bélizom'], valasz: 'Simaizom, harántcsíkolt izom, szívizom', segitseg: 'Szerkezetük és viselkedésük alapján.', megoldas: 'Simaizom (orsó alakú sejtek, akaratlan), harántcsíkolt izom (vázizmok, akaratlagos), szívizom (különleges harántcsíkolt izom, akaratlan).' },
      { kerdes: 'Mi a <b>fagocitózis</b>?', valasztas: ['Szilárd részecskék (pl. baktériumok) bekebelezése a sejtbe', 'A sejt kettéosztódása', 'A víz átáramlása a sejthártyán', 'A sejt elhalása'], valasz: 'Szilárd részecskék (pl. baktériumok) bekebelezése a sejtbe', segitseg: '„phagein” = enni.', megoldas: 'Fagocitózis: a falósejtek (fagociták, pl. egyes fehérvérsejtek, makrofágok) bekebelezik a kórokozókat, idegen részecskéket. Emberben ez már a védekezést szolgálja, nem a táplálkozást.' },
      { kerdes: 'Mi a „belső környezet”?', valasztas: ['A sejteket körülvevő folyadék (szövetnedv, vérplazma, nyirok)', 'A gyomor tartalma', 'A szoba hőmérséklete', 'A tüdő levegője'], valasz: 'A sejteket körülvevő folyadék (szövetnedv, vérplazma, nyirok)', segitseg: 'Ebben „úsznak” a sejtek.', megoldas: 'A belső környezet állandóságát (hőmérséklet, pH, só, víz, cukor) tartja fenn a homeosztázis.' },
      { kerdes: 'Melyik ion van a legnagyobb mennyiségben a sejteken <b>kívül</b>?', valasztas: ['Nátrium', 'Kálium', 'Vas', 'Jód'], valasz: 'Nátrium', segitseg: 'Konyhasó.', megoldas: 'Sejten kívül a nátrium, sejten belül a kálium a fő ion. Ezért a 0,9%-os NaCl-oldat (fiziológiás sóoldat) főleg a sejteken kívüli térben oszlik el.' },
      { kerdes: 'Melyik ion van a legnagyobb mennyiségben a sejteken <b>belül</b>?', valasztas: ['Kálium', 'Nátrium', 'Kalcium', 'Klorid'], valasz: 'Kálium', segitseg: 'Sejtszétesésnél kiszabadul.', megoldas: 'A kálium főleg a sejtekben van. Ha sok sejt pusztul (crush-szindróma, égés), a kálium a vérbe áramlik → hiperkalémia.' },
      { kerdes: 'Hány kromoszóma van egy emberi testi sejt magjában?', valasz: 46, egyseg: 'db', segitseg: '23 pár.', megoldas: 'A testi sejtekben 46 kromoszóma van (23 pár), az ivarsejtekben ennek fele, 23. Megtermékenyítéskor 23 + 23 = 46 áll helyre.' },
      { kerdes: 'Mi az idegszövet szerkezeti és működési egysége?', valasztas: ['A neuron (idegsejt nyúlványaival és végződéseivel)', 'Az izomrost', 'A hámsejt', 'Az osteon'], valasz: 'A neuron (idegsejt nyúlványaival és végződéseivel)', segitseg: 'Az idegrendszer nagyszámú ilyen egységből épül fel.', megoldas: 'Az idegszövet egysége a neuron: idegsejt + idegrost + idegvégződés. Az idegszövet ingereket fog fel, ingerületet hoz létre és vezet tovább.' },
    ]),
    ...Tananyag.szint(2, [
      { kerdes: 'Mi történik a vörösvértesttel <b>hipotóniás</b> (a vérnél hígabb) oldatban?', valasztas: ['Víz áramlik bele, megduzzad, szétpattanhat (hemolízis)', 'Összezsugorodik', 'Nem változik', 'Megalvad'], valasz: 'Víz áramlik bele, megduzzad, szétpattanhat (hemolízis)', segitseg: 'A víz a töményebb oldal felé áramlik.', megoldas: 'Ozmózis: a víz a hígabb oldatból a töményebb felé áramlik. Hipotóniás oldatban a sejt megduzzad.' },
      { kerdes: 'Mi történik a sejttel <b>hipertóniás</b> (töményebb) oldatban?', valasztas: ['Víz áramlik ki belőle, összezsugorodik', 'Megduzzad', 'Szétpukkan', 'Nem változik'], valasz: 'Víz áramlik ki belőle, összezsugorodik', segitseg: 'A víz kifelé megy.', megoldas: 'Hipertóniás oldatban a sejt vizet veszít. Ezt használják ki pl. agyödémánál a hipertóniás sóoldattal (orvosi elrendelésre).' },
      { kerdes: 'Melyik a hámszövet <b>működés</b> szerinti felosztása?', valasztas: ['Fedő- (védő-), érzék-, felszívó- és mirigyhám', 'Lap-, köb- és hengerhám', 'Üveg-, rugalmas és rostos hám', 'Sima, harántcsíkolt és szívhám'], valasz: 'Fedő- (védő-), érzék-, felszívó- és mirigyhám', segitseg: 'Véd, érzékel, felszív, váladékot termel.', megoldas: 'Fedőhám: pl. a bőr szaruréteges laphámja, a légutak csillószőrös hengerhámja. Érzékhám: érzékszervekben. Felszívóhám: vékonybél. Mirigyhám: a mirigyek építőszövete.' },
      { kerdes: 'Mi a <b>pozitív visszacsatolás</b>, és miért veszélyes betegségben?', valasztas: ['Az eltérés tovább erősíti önmagát – ördögi kör alakulhat ki (pl. sokk, halálos triász)', 'Az eltérést kiegyenlíti', 'Mindig hasznos', 'Nem létezik'], valasz: 'Az eltérés tovább erősíti önmagát – ördögi kör alakulhat ki (pl. sokk, halálos triász)', segitseg: 'Ördögi kör.', megoldas: 'Pl. vérzés → kihűlés → rosszabb alvadás → több vérzés. Élettani példa: szülés (oxitocin). A mentő feladata az ördögi körök megszakítása.' },
      { kerdes: 'Mi a <b>sejtelhalás (nekrózis)</b> egyik gyakori oka a sürgősségi ellátásban?', valasztas: ['Tartós oxigénhiány (ischaemia), pl. infarktus, stroke, érszorító túl sokáig', 'Normális öregedés', 'Edzés', 'Alvás'], valasz: 'Tartós oxigénhiány (ischaemia), pl. infarktus, stroke, érszorító túl sokáig', segitseg: '„Az idő izom / az idő agy.”', megoldas: 'Az oxigénhiányos sejtek először működésképtelenek, majd elhalnak. Minél előbb áll helyre a keringés, annál kevesebb sejt pusztul.' },
      { kerdes: 'Miért veszélyes a túl sok sejtpusztulás (pl. nagy izomroncsolás) a keringésre?', valasztas: ['Mert a sejtekből kálium, sav és mioglobin szabadul fel → ritmuszavar, veseelégtelenség', 'Mert több lesz az oxigén', 'Mert a vér lúgos lesz', 'Nem veszélyes'], valasz: 'Mert a sejtekből kálium, sav és mioglobin szabadul fel → ritmuszavar, veseelégtelenség', segitseg: 'Crush-szindróma.', megoldas: 'Sejtszétesés → hiperkalémia, acidózis, mioglobinuria. Monitor, folyadékpótlás, gyors szállítás.' },
      { kerdes: 'Miért nem adunk <b>5%-os glükózoldatot</b> folyadékpótlásra vérzéses sokkban?', valasztas: ['Mert a cukor elfogy, a maradék „szabad víz” a sejtekbe szétoszlik – alig marad az erekben', 'Mert túl sós', 'Mert megalvasztja a vért', 'Mert drága'], valasz: 'Mert a cukor elfogy, a maradék „szabad víz” a sejtekbe szétoszlik – alig marad az erekben', segitseg: 'Az összes testvízbe oszlik.', megoldas: 'Az 5%-os glükóz a cukor felhasználása után gyakorlatilag víz: az egész testvízben eloszlik, csak kb. 1/12-e marad az erekben. Fejsérültnél agyödémát is ronthat.' },
      { kerdes: 'Hogyan osztjuk fel a hámszövetet a sejtek <b>alakja</b> szerint?', valasztas: ['Laphám, köbhám, hengerhám', 'Fedőhám, érzékhám, mirigyhám', 'Egyrétegű és többrétegű hám', 'Felhám, irha, bőralja'], valasz: 'Laphám, köbhám, hengerhám', segitseg: 'Lapos, kocka, henger alakú sejtek.', megoldas: 'Alak szerint: laphám, köbhám, hengerhám; a rétegek száma szerint: egyrétegű és többrétegű hám (pl. a bőr többrétegű elszarusodó laphám). Működés szerint: fedő-, érzék-, felszívó- és mirigyhám.' },
      { kerdes: 'Miért gyógyul lassan a porc (pl. térdsérülés után)?', valasztas: ['Mert nincsenek benne erek – a tápanyag lassan jut el a sejtekhez', 'Mert túl sok benne az ér', 'Mert idegek vannak benne', 'Gyorsan gyógyul'], valasz: 'Mert nincsenek benne erek – a tápanyag lassan jut el a sejtekhez', segitseg: 'Érmentes szövet.', megoldas: 'A porc ér nélküli, ezért lassan regenerálódik. A csont viszont jól erezett, ezért gyógyul (és vérzik is).' },
      { kerdes: 'Hogyan függ össze a <b>só</b> (nátrium) és a <b>víz</b> mozgása a folyadékterek között?', valasztas: ['A víz a só (ozmotikusan aktív anyag) után áramlik – ahol több a só, oda megy a víz', 'Nincs kapcsolatuk', 'A só mindig a sejtbe megy', 'A víz mindig a sejtből jön ki'], valasz: 'A víz a só (ozmotikusan aktív anyag) után áramlik – ahol több a só, oda megy a víz', segitseg: '„A víz követi a sót.”', megoldas: 'Ezért fontos az infúzió összetétele: az izotóniás oldat a sejten kívül marad, a hipotóniás a sejtekbe is beáramlik.' },
      { kerdes: 'Melyik szerv szövete képes jól regenerálódni (újraképződni)?', valasztas: ['A májban', 'Az agyban', 'A szívizomban', 'A gerincvelőben'], valasz: 'A májban', segitseg: 'Egy része akár vissza is nőhet.', megoldas: 'A máj jól regenerálódik; az idegsejtek és a szívizomsejtek alig. Ezért maradandó az infarktus és a stroke okozta károsodás.' },
      { kerdes: 'Mi az <b>ödéma</b>?', valasztas: ['Kóros folyadékfelszaporodás a szövetközti térben (vizenyő)', 'Vérzés', 'Kiszáradás', 'Csonttörés'], valasz: 'Kóros folyadékfelszaporodás a szövetközti térben (vizenyő)', segitseg: 'Benyomható duzzanat.', megoldas: 'Ödéma okai: szívelégtelenség (pangás), alacsony fehérjeszint, gyulladás, allergia (érfal-áteresztés), nyirokpangás.' },
      { kerdes: 'Mi a különbség a <b>külső elválasztású</b> (exokrin) és a <b>belső elválasztású</b> (endokrin) mirigy között?', valasztas: ['Az exokrin kivezetőcsövön a felszínre üríti váladékát (pl. nyálmirigy), az endokrinnek nincs kivezetőcsöve, közvetlenül a vérbe ürít (pl. pajzsmirigy)', 'Az exokrin a vérbe, az endokrin a bélbe ürít', 'Az exokrin hormont, az endokrin verejtéket termel', 'Nincs különbség'], valasz: 'Az exokrin kivezetőcsövön a felszínre üríti váladékát (pl. nyálmirigy), az endokrinnek nincs kivezetőcsöve, közvetlenül a vérbe ürít (pl. pajzsmirigy)', segitseg: 'Exo = ki, endo = be.', megoldas: 'Mirigy (glandula): váladékot termelő szerv. Váladéka lehet hasznos szekrétum (nyál, epe) vagy kiürítendő exkrétum (vizelet). A legegyszerűbb mirigy egyetlen sejt (kehelysejt a bélhámban).' },
      { kerdes: 'Miben különbözik a <b>hámszövet</b> a többi szövettől?', valasztas: ['Sejtjei szorosan egymás mellett vannak, sejtközötti állománya és erei nincsenek', 'Sok sejtközötti állománya és sok ere van', 'Csak a test belsejében fordul elő', 'Összehúzódásra képes'], valasz: 'Sejtjei szorosan egymás mellett vannak, sejtközötti állománya és erei nincsenek', segitseg: 'A sejtek a sejtek közötti járatokban keringő nedvből táplálkoznak.', megoldas: 'A hámszövet érmentes, sejtközötti állomány nincs benne (csak sejtközötti járatok). Ezért egy felületes horzsolás nem vérzik – ha vérzik, a seb már az erezett irhát is elérte.' },
      { kerdes: 'Melyik sejtosztódás jellemző az <b>ivarsejtekre</b>?', valasztas: ['Felező (számfelező) osztódás – meiosis', 'Direkt osztódás – amitosis', 'Közvetett osztódás – mitosis', 'Bimbózás'], valasz: 'Felező (számfelező) osztódás – meiosis', segitseg: 'A kromoszómák száma a felére csökken.', megoldas: 'A sejtosztódás három fajtája: direkt (amitosis), indirekt (mitosis – a leánysejtek 46 kromoszómásak) és felező (meiosis – az ivarsejtek 23 kromoszómásak, haploidok).' },
      { kerdes: 'Milyen porc alkotja a csigolyák közötti <b>porckorongot</b>?', valasztas: ['Kollagén rostos porc', 'Üvegporc (hyalinporc)', 'Rugalmas rostos porc', 'Csontszövet'], valasz: 'Kollagén rostos porc', segitseg: 'Nagy nyomást és húzást kell elviselnie.', megoldas: 'Porcfajták: üvegporc (egynemű alapállomány, pl. ízületi porc, bordaporc), rugalmas rostos porc (pl. fülporc), kollagén rostos porc (pl. porckorong). A porcban nincsenek erek; felszínét porchártya borítja.' },
    ]),
    ...Tananyag.szint(3, [
      { kerdes: 'Egy 70 kg-os felnőtt vérplazmája kb. 3,5 liter. Ha 1000 ml izotóniás krisztalloidot adsz, kb. mennyi marad a plazmában (1/4 rész)?', valasz: 250, egyseg: 'ml', szakma: CIMKEK.SZAMOLAS, segitseg: '1000 : 4.', megoldas: '1000 : 4 = 250 ml marad az erekben, kb. 750 ml a szövetközti térbe kerül.' },
      { kerdes: 'Egy 70 kg-os beteg teljes testvize 42 l. Ha 1000 ml 5%-os glükózt kap, kb. hány ml marad az érpályában? (A plazma a testvíz kb. 1/12-e)', valasz: 1000 / 12, tizedes: 0, egyseg: 'ml', szakma: CIMKEK.SZAMOLAS, segitseg: '1000 : 12.', megoldas: '1000 : 12 ≈ 83 ml – ezért nem alkalmas volumenpótlásra.' },
      { kerdes: 'Miért alakul ki <b>agyödéma</b> súlyos hiponatrémiában (pl. sok víz ivása, vízmérgezés)?', valasztas: ['Mert a sejteken kívüli folyadék hígabb lesz a sejtek belsejénél, így a víz beáramlik az agysejtekbe – a koponyában nincs hely a duzzadásra', 'Mert sok a só', 'Mert kiszárad az agy', 'Nem alakul ki'], valasz: 'Mert a sejteken kívüli folyadék hígabb lesz a sejtek belsejénél, így a víz beáramlik az agysejtekbe – a koponyában nincs hely a duzzadásra', segitseg: 'Ozmózis + zárt koponya.', megoldas: 'Hiponatrémia → hipotóniás belső környezet → sejtduzzadás → agyödéma: fejfájás, zavartság, görcs, kóma. (Pl. extrém vízivás, egyes drogok, vízhajtók.)' },
      { kerdes: 'Mi az <b>osteon</b> (Havers-rendszer)?', valasztas: ['A csont mechanikai egysége: a Havers-csatorna (benne erek) körül koncentrikus csontlemezek', 'A porc felszínét borító hártya', 'Az izomrost összehúzódó eleme', 'A csontvelő vérképző sejtje'], valasz: 'A csont mechanikai egysége: a Havers-csatorna (benne erek) körül koncentrikus csontlemezek', segitseg: 'Egymásba illesztett, mikroszkopikus csövek.', megoldas: 'A lemezes csontszövetben a lemezek a Havers-csatorna körül koncentrikusan rendeződnek; ez adja a nagy nyomási szilárdságot. A csontsejtek a lemezek határain ülnek, nyúlványaik csatornácskákban futnak; a sejtközötti állományba rakódott mészsó adja a keménységet.' },
      { kerdes: 'Az ischaemia során a sejtekből hiányzik az energia (ATP). Miért duzzadnak meg a sejtek?', valasztas: ['Mert leáll a nátrium-kálium pumpa: nátrium és víz áramlik a sejtbe', 'Mert több oxigént kapnak', 'Mert zsugorodnak', 'Nem duzzadnak'], valasz: 'Mert leáll a nátrium-kálium pumpa: nátrium és víz áramlik a sejtbe', segitseg: 'Aktív transzport energiát igényel.', megoldas: 'Energia nélkül a pumpa leáll, a sejt duzzad (citotoxikus ödéma) – pl. stroke és keringésmegállás utáni agyödéma.' },
      { kerdes: 'Miért alakul ki az <b>égett</b> betegnél gyorsan nagy folyadékvesztés?', valasztas: ['A sérült hajszálerek áteresztők lesznek: plazma szivárog a szövetekbe, és a sérült bőrön át párolog', 'Mert sokat vizel', 'Mert vérzik az égett bőr', 'Nincs folyadékvesztés'], valasz: 'A sérült hajszálerek áteresztők lesznek: plazma szivárog a szövetekbe, és a sérült bőrön át párolog', segitseg: 'Kapilláris szivárgás + párolgás.', megoldas: 'Nagy kiterjedésű égésnél órák alatt jelentős plazmavesztés alakul ki (égési sokk) – ezért kell testtömeg és égett felület alapján számolt folyadékpótlás.' },
      { kerdes: 'Melyik a <b>homeosztázis</b> szabályozásában részt vevő két fő rendszer?', valasztas: ['Idegrendszer (gyors) és hormonrendszer (lassabb)', 'Csontváz és izmok', 'Bőr és haj', 'Emésztőrendszer és szem'], valasz: 'Idegrendszer (gyors) és hormonrendszer (lassabb)', segitseg: 'Villanyvezeték és levélposta.', megoldas: 'Az idegrendszer másodpercek alatt (pl. baroreflex), a hormonrendszer percek–órák alatt (pl. ADH, aldoszteron) korrigál.' },
      { kerdes: 'Hipotermiás betegnél miért lassul minden sejtszintű folyamat (és miért véd ez az agynak)?', valasztas: ['Mert az enzimek a hidegben lassabban működnek – kisebb az oxigénigény', 'Mert több oxigént kap', 'Mert gyorsul az anyagcsere', 'Nem lassul'], valasz: 'Mert az enzimek a hidegben lassabban működnek – kisebb az oxigénigény', segitseg: 'Kb. 1 °C-onként 5–7%-kal csökken az anyagcsere.', megoldas: 'A hideg csökkenti az anyagcserét – ezért élhet túl egy kihűlt beteg hosszabb keringésmegállást. Ugyanezért veszélyes a kihűlés (alvadás, ritmus).' },
      { kerdes: 'Miért káros a <b>túl magas</b> láz (≥ 41–42 °C) a sejtekre?', valasztas: ['Mert a fehérjék (enzimek) kicsapódnak (denaturálódnak), a sejtek károsodnak – többszervi elégtelenség', 'Mert jobban működnek', 'Mert lehűlnek', 'Nem káros'], valasz: 'Mert a fehérjék (enzimek) kicsapódnak (denaturálódnak), a sejtek károsodnak – többszervi elégtelenség', segitseg: 'Mint a tojásfehérje a serpenyőben.', megoldas: 'Extrém hipertermiában (hőguta, malignus hipertermia, egyes drogok) a sejtek fehérjéi károsodnak: agy-, máj-, vese-, izomkárosodás. Azonnali hűtés!' },
      { kerdes: 'Mi jellemzi a <b>szívizom</b> szerkezetét a vázizomhoz képest?', valasztas: ['Rostjai egymással összekapcsolódva hálózatot alkotnak, a sejthatárokon vastag harántvonalak (Eberth-vonalak) látszanak', 'Orsó alakú, egymagvú sejtekből áll, harántcsíkolat nélkül', 'Párhuzamos, soha nem kapcsolódó, sokmagvú rostokból áll, és hamar fárad', 'Nincs benne miofibrillum'], valasz: 'Rostjai egymással összekapcsolódva hálózatot alkotnak, a sejthatárokon vastag harántvonalak (Eberth-vonalak) látszanak', segitseg: 'Az ingerület ezért terjed szét az egész szíven.', megoldas: 'A szívizom különleges harántcsíkolt izom: rostjai hálózatot alkotnak, a sejthatárokat az Eberth-vonalak (ma: interkaláris lemezek) jelzik. Akaratunktól független, nagy erőre képes, nem fárad – átmenet a vázizom és a simaizom között.' },
      { kerdes: 'Melyik állapot okoz <b>alacsony kalciumszintet</b> és ezzel izomgörcsöt, zsibbadást (tetániát)?', valasztas: ['Hiperventiláció (a lúgosodás csökkenti az ionizált kalciumot), mellékpajzsmirigy-sérülés', 'Sok tejtermék fogyasztása', 'Láz', 'Magas vércukor'], valasz: 'Hiperventiláció (a lúgosodás csökkenti az ionizált kalciumot), mellékpajzsmirigy-sérülés', segitseg: 'Alkalózis.', megoldas: 'Alkalózisban több kalcium kötődik a fehérjékhez – csökken a szabad (ionizált) kalcium: zsibbadás, „szülészkéz”, izomgörcs.' },
      { kerdes: 'Mit jelent a <b>reticuloendothelialis rendszer</b> (RES)?', valasztas: ['Az idegen részecskéket, baktériumokat bekebelező (fagocitáló) sejtek összessége – nyirokcsomókban, csontvelőben, májban, lépben', 'Az erek belső falát bélelő hám', 'A szív ingerületvezető rendszere', 'A vörösvérsejtek termelése'], valasz: 'Az idegen részecskéket, baktériumokat bekebelező (fagocitáló) sejtek összessége – nyirokcsomókban, csontvelőben, májban, lépben', segitseg: 'A kötőszövet védekező rendszere.', megoldas: 'A RES sejtjei falósejtek; a hozzájuk kapcsolódó plazmasejtek ellenanyagot (antitestet) termelnek az antigénekkel szemben. Ma inkább mononukleáris fagocitarendszernek nevezik.' },
    ]),
  ];

  Tananyag.tema('anatomia', {
    azon: 'sejt-szovet',
    ikon: '🔬',
    animacio,
    interaktiv,
    feladatok,
    magyarazat: `
      <div class="doboz cel">
        <b>Mire jó ez neked?</b>
        <p>Miért halnak el az agysejtek néhány perc oxigénhiány után? Miért lesz savas a vér sokkban? Miért nem adhatunk vénába tiszta vizet? A válasz a <b>sejtek</b> működésében és a <b>homeosztázisban</b> rejlik. Ez az alap, amire a többi téma épül.</p>
      </div>
      <p class="kerekites">📘 Tankönyvi fejezet (Donáth Tibor: Anatómia–élettan): II. fejezet – A szervezet morfológiai felépítése (Protoplazma; Sejt; Szövetek: hámszövet, kötő- és támasztószövet, izomszövet, idegszövet; Szervek, szervrendszerek). A homeosztázis és a folyadékterek a későbbi élettani fejezetekben kerülnek elő.</p>

      <h3>Nézd meg lépésről lépésre!</h3>
      <div data-animacio></div>

      <h3>A sejt felépítése</h3>
      <p>Az élő anyag a <b>protoplazma</b>: kb. 80%-a víz, a többi fehérje, szénhidrát, zsírszerű anyag (lipoid), sók és enzimek (a tankönyvben: fermentumok). Legfontosabb alkotója a <b>fehérje</b> (aminosavakból felépülő polipeptidláncok). A protoplazma legfejlettebb formája a <b>sejt</b> (cellula): citoplazmából, sejtorganellumokból és sejtmagból áll. A sejtek között <b>sejtközötti (intercelluláris) állomány</b> is van – a szervezet ebből is épül.</p>
      <div class="tabla-keret"><table>
        <thead><tr><th>Sejtalkotó</th><th>Feladata</th></tr></thead>
        <tbody>
          <tr><td>sejthártya (sejtmembrán)</td><td>elhatárol; ezen át veszi fel a sejt a tápanyagot és adja le a bomlástermékeket</td></tr>
          <tr><td>citoplazma</td><td>a sejt magon kívüli része; izomsejtben miofibrillumok, idegsejtben neurofibrillumok vannak benne</td></tr>
          <tr><td>sejtközpont (cytocentrum, két centriolumból)</td><td>a sejtosztódás és a sejtmozgás irányítása</td></tr>
          <tr><td>mitokondrium</td><td>oxidációs folyamatok – energiatermelés (ATP)</td></tr>
          <tr><td>riboszóma (az endoplazmás hálózaton)</td><td>fehérjeszintézis</td></tr>
          <tr><td>Golgi-készülék</td><td>váladékképzés (szekréció)</td></tr>
          <tr><td>vakuólum</td><td>folyadékkal telt hólyagocska</td></tr>
          <tr><td>sejtmag (nucleus)</td><td>maghártya, magnedv, kromatin (DNS), 1–3 magvacska (nucleolus); osztódáskor kromoszómák: testi sejtben <b>46</b>, ivarsejtben <b>23</b></td></tr>
        </tbody>
      </table></div>
      <p>A sejtek alakja a környezettől és a működéstől függ (a vérben gömb, a hámban lapos, kocka vagy henger alakú). Méretük általában <b>10–30 µm</b> (1 µm = 0,001 mm), ezért csak mikroszkóppal láthatók. Az ember kb. <b>30 billió</b> sejtből áll. A többsejtű szervezet sejtjei <b>differenciálódnak</b> (elkülönülnek): az izomsejt mozgat, a mirigysejt váladékot termel.</p>

      <h3>A sejt életjelenségei</h3>
      <ol>
        <li><b>Anyagcsere:</b> a sejt a szövetnedvből táplálkozik; a felvett anyagokat felépíti (<b>asszimiláció</b>), lebontja (<b>disszimiláció</b>), ill. kiválasztja. Speciális formái: a <b>szekréció</b> (mirigysejtek váladékképzése) és a <b>fagocitózis</b> (falósejtek bekebelezik a részecskéket – emberben védekezés).</li>
        <li><b>Sejtmozgás:</b> <b>amőboid</b> mozgás (pl. fehérvérsejtek – így jutnak ki az érfalon át), ostorral (ondósejt), csillószőrökkel (a hám felszínéről sodorják el az idegen anyagot).</li>
        <li><b>Ingerlékenység:</b> az inger hatására a sejtben <b>ingerület</b> jön létre; irányított mozgás (taxis) is lehet: fény, hő, vegyi anyag (kemotaxis) felé vagy elől.</li>
        <li><b>Növekedés:</b> addig, amíg a sejt felszíne elég a táplálásához.</li>
        <li><b>Osztódás:</b> direkt (<b>amitosis</b>), indirekt (<b>mitosis</b> – a két leánysejt 46 kromoszómás, mint az anyasejt) és felező (<b>meiosis</b> – az ivarsejtek 23 kromoszómások).</li>
      </ol>

      <h3>A négy alapszövet</h3>
      <p>A <b>szövet</b> az azonos alakú és működésű sejtek összessége (a hám kivételével sejtközötti állománnyal együtt).</p>
      <div class="tabla-keret"><table>
        <thead><tr><th>Szövet</th><th>Feladat</th><th>Példa</th></tr></thead>
        <tbody>
          <tr><td>Hámszövet</td><td>borít, bélel, elválaszt</td><td>bőr felhámja, nyálkahártya, mirigyek</td></tr>
          <tr><td>Kötő- és támasztó</td><td>összeköt, megtart, szállít</td><td>csont, porc, ín, zsír, vér</td></tr>
          <tr><td>Izom</td><td>összehúzódik</td><td>vázizom (akaratlagos); simaizom és szívizom (akaratlan)</td></tr>
          <tr><td>Ideg</td><td>ingerületet vezet</td><td>agy, gerincvelő, idegek</td></tr>
        </tbody>
      </table></div>

      <h4>Hámszövet</h4>
      <ul>
        <li>Borítja a test külső és belső felszíneit, béleli az üreges szerveket.</li>
        <li>Ide tartozik az erek belső felszínét bélelő <b>endothel</b> és a savós üregek (mellhártya, hashártya) felszínét borító <b>mesothel</b> is.</li>
        <li>Sejtjei szorosan egymás mellett: <b>nincs sejtközötti állomány és nincsenek erei</b>.</li>
        <li>Alak szerint: <b>laphám, köbhám, hengerhám</b>; rétegszám szerint: <b>egyrétegű, többrétegű</b>.</li>
        <li>Működés szerint: <b>fedőhám</b> (védőhám – pl. a bőr elszarusodó laphámja, a légutak és a petevezeték csillószőrös hengerhámja, a húgyutak urotheliuma), <b>érzékhám</b>, <b>felszívóhám</b> (vékonybél), <b>mirigyhám</b>.</li>
        <li>Mirigyek: <b>külső elválasztású</b> (exokrin, kivezetőcsővel a felszínre ürít – nyál, epe) és <b>belső elválasztású</b> (endokrin, kivezetőcső nélkül a vérbe ürít – hormonok).</li>
      </ul>

      <h4>Kötő- és támasztószövet</h4>
      <ul>
        <li>A legelterjedtebb szövet; sok <b>sejtközötti állománya</b> (rostok + alapállomány) van. Rostjai: <b>kollagén</b> (enyvadó), <b>rugalmas</b> és <b>rácsrostok</b>.</li>
        <li>Sejtjei: rostképző fibroblaszt (fibrocita), falósejt (makrofág, hisztiocita), vándorsejtek (limfocita, plazmasejt), hízósejt (heparin, hisztamin).</li>
        <li>Fajtái: <b>laza rostos</b> (mindenütt), <b>tömött rostos</b> (legrendezettebb formája az <b>ín</b>), <b>reticularis</b> (vérképző és nyirokszervek váza).</li>
        <li>A <b>vér</b> is kötőszövet: sejtjei a vérsejtek, sejtközötti állománya a plazma.</li>
        <li>Véd a mechanikai és vegyi ártalmak ellen; falósejtjeinek rendszere, a <b>RES</b> (reticuloendothelialis rendszer) a kórokozókat és az idegen részecskéket kebelezi be.</li>
        <li>Vizet, sót, zsírt tárol. Ha sok vizet köt meg: <b>vizenyő (ödéma)</b>; nagy vízvesztésnél (pl. hasmenés) a kötőszövet szinte kiszárad.</li>
        <li><b>Porcszövet:</b> érmentes, porchártya borítja. <b>Üvegporc</b> (hyalinporc, pl. ízületi porc, bordaporc), <b>rugalmas rostos porc</b> (fülporc), <b>kollagén rostos porc</b> (porckorong).</li>
        <li><b>Csontszövet:</b> csontsejtek + mészsóval telített sejtközötti állomány. A lemezek a <b>Havers-csatorna</b> (benne erek) körül koncentrikusan rendeződnek: ez az <b>osteon</b>, a csont mechanikai egysége.</li>
        <li><b>Zsírszövet:</b> tartalék tápanyag, hőszigetelés, támasztás (talp, vese körüli, szemüregi zsírtest).</li>
      </ul>

      <h4>Izomszövet</h4>
      <div class="tabla-keret"><table>
        <thead><tr><th></th><th>Simaizom</th><th>Harántcsíkolt (váz-) izom</th><th>Szívizom</th></tr></thead>
        <tbody>
          <tr><td>Felépítés</td><td>orsó alakú sejtek, középen egy mag</td><td>néhány cm hosszú rostok, sok mag a rost hártyája alatt, harántcsíkolat</td><td>harántcsíkolt rostok hálózata, Eberth-vonalak</td></tr>
          <tr><td>Működés</td><td>akaratlan (vegetatív idegrendszer)</td><td>akaratlagos</td><td>akaratlan</td></tr>
          <tr><td>Összehúzódás</td><td>lassú, féregszerű, nem fárad</td><td>gyors, nagy erejű, hamar fárad</td><td>nagy erejű, nem fárad</td></tr>
          <tr><td>Hol?</td><td>tápcsatorna, hörgők, erek fala, bőr</td><td>vázizmok</td><td>szív</td></tr>
        </tbody>
      </table></div>
      <p>💬 Az Eberth-vonalakat ma <b>interkaláris lemezeknek</b> (discus intercalaris) nevezzük; a sejtek közötti réskapcsolatokon terjed át az ingerület.</p>

      <h4>Idegszövet</h4>
      <p>Ingert fog fel, ingerületet hoz létre és vezet. Egysége a <b>neuron</b>: idegsejt + idegrost + idegvégződés.</p>

      <h3>Szervek és szervrendszerek</h3>
      <p>Az azonos működést szolgáló szövetek <b>szervvé</b> egyesülnek (pl. a vesében hám-, kötő- és idegszövet is van), a szervek <b>szervrendszert</b> alkotnak. A tankönyv felosztása: <b>mozgásrendszer</b> (csontváz, izomzat), <b>keringési szervek</b>, <b>zsigeri rendszerek</b> (emésztő-, légző-, vizeletkiválasztó és nemi szervek), <b>szabályozó rendszerek</b> (belső elválasztású mirigyek, idegrendszer) és az <b>érzékszervek</b>. Az irányítás közös: ideg- és hormonrendszer (neuroendokrin rendszer).</p>

      <h3>Anyagszállítás a sejthártyán át</h3>
      <ul>
        <li><b>Diffúzió:</b> az oldott anyag a nagyobb koncentráció felől a kisebb felé mozog, energia nélkül (pl. az oxigén a léghólyagocskából a vérbe).</li>
        <li><b>Ozmózis:</b> a víz áramlása féligáteresztő hártyán át a töményebb oldat felé – „a víz követi a sót”.</li>
        <li><b>Aktív transzport:</b> energiát (ATP-t) igénylő szállítás a koncentrációkülönbséggel szemben (pl. nátrium-kálium pumpa). Oxigénhiányban kevés az ATP, a pumpa leáll, a sejt megduzzad.</li>
      </ul>
      <p>A sejteken <b>kívül</b> a nátrium, a sejteken <b>belül</b> a kálium a fő ion. Az <b>izotóniás</b> oldat (pl. 0,9%-os NaCl) töménysége a vérével azonos: a sejtek nem változnak. <b>Hipotóniás</b> (hígabb) oldatban a víz a sejtbe áramlik, a vörösvértest megduzzad, szétpattanhat (hemolízis); <b>hipertóniás</b> (töményebb) oldatban a sejt vizet veszít, összezsugorodik.</p>

      <h3>Homeosztázis – a belső egyensúly</h3>
      <p>A sejteket körülvevő folyadék (szövetnedv, vérplazma, nyirok) a <b>belső környezet</b>. Ennek viszonylagos állandósága a homeosztázis; az ideg- és a hormonrendszer tartja fenn.</p>
      <ul>
        <li><b>Testhő:</b> kb. 36–37 °C</li>
        <li><b>Vér pH:</b> 7,35–7,45 (alatta acidózis, fölötte alkalózis). A CO₂ a vérben szénsavat képez: ha a beteg túl sokat lélegzik ki (hiperventiláció), alkalózis, ha keveset (légzési elégtelenség), acidózis lesz.</li>
        <li><b>Vércukor:</b> éhgyomorra kb. 4–6 mmol/l</li>
        <li><b>Víz és sók</b> (nátrium, kálium) egyensúlya</li>
      </ul>
      <p><b>Negatív visszacsatolás:</b> az eltérés ellentétes irányú választ vált ki, és így megszűnik (pl. melegben izzadás hűt) – mint egy termosztát. <b>Pozitív visszacsatolás:</b> az eltérés önmagát erősíti; betegségben ördögi kör lesz belőle (pl. vérzés → kihűlés → rosszabb alvadás → még több vérzés).</p>

      <h3>Próbáld ki: a test folyadékterei</h3>
      <div data-interaktiv></div>

      <div class="tetel">
        <b>Folyadékterek</b>
        <p class="keplet">víz ≈ 60% · ⅔ sejten belül · ⅓ sejten kívül (¾ sejtek között, ¼ plazma)</p>
        <p class="pelda">70 kg → 42 l víz → 28 l sejten belül, 14 l sejten kívül (10,5 l a sejtek között, 3,5 l plazma)</p>
      </div>

      <h3>A gyakorlatban</h3>
      <div class="doboz szakma">
        <p><b>🚑 Miért fontos ez a mentőnek?</b></p>
        <ul>
          <li><b>Oxigénhiány</b> → tejsav → acidózis (sokk, szívmegállás).</li>
          <li><b>Az agy</b> perceken belül károsodik oxigén nélkül.</li>
          <li><b>Izotóniás</b> infúzió (0,9% NaCl, balanszírozott oldat) – soha tiszta víz vénába.</li>
          <li><b>CO₂</b> és pH: hiperventiláció → alkalózis; légzési elégtelenség → acidózis.</li>
        </ul>
      </div>

      <details class="tobbet">
        <summary>Ha többet szeretnél tudni: a sejttan története és a lizoszóma</summary>
        <ul>
          <li>Robert Hooke 1665-ben parafametszeten „rekeszeket” (sejteket) írt le; Schleiden a növényi, Schwann (1839) az állati sejteket írta le; Virchow szerint „sejt csak sejtből keletkezhet”.</li>
          <li><b>Lizoszóma:</b> a tankönyvben nem szereplő, de ma fontos sejtalkotó – a sejten belüli lebontás („emésztés”) helye.</li>
        </ul>
      </details>

      <h3>Gyakori hibák</h3>
      <ul>
        <li>❌ A <b>szívizmot</b> akaratlagosnak hiszed.</li>
        <li>❌ <b>Diffúzió és ozmózis</b> összekeverése.</li>
        <li>❌ A <b>vért</b> nem tartod szövetnek (kötőszövet!).</li>
      </ul>

      <div class="doboz jegyezd">
        <b>Jegyezd meg!</b>
        <ul>
          <li>Mitokondrium = <b>energia</b>; oxigén nélkül <b>tejsav</b>.</li>
          <li>Négy alapszövet: <b>hám, kötő-támasztó, izom, ideg</b>. A hámban nincs ér és sejtközötti állomány.</li>
          <li>Riboszóma = fehérjeszintézis; 46 kromoszóma (ivarsejt: 23); mitosis, meiosis.</li>
          <li>Izom: sima (akaratlan), harántcsíkolt (akaratlagos), szív (akaratlan, nem fárad).</li>
          <li>Homeosztázis: testhő, <b>pH 7,35–7,45</b>, vércukor, víz.</li>
          <li>Víz ≈ <b>60%</b> (⅔ sejten belül).</li>
        </ul>
      </div>`,
  });
})();
