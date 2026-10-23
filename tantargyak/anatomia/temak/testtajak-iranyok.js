// Téma: Testtájak, irányok, síkok, testüregek, hasi negyedek
'use strict';

(() => {
  // Emberi test elölről, irányjelző nyilakkal
  function iranyok(kiemel = []) {
    const nyil = (azon, x1, y1, x2, y2, t, tx, ty, h = 'middle') =>
      kiemel.length && !kiemel.includes(azon)
        ? ''
        : `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="ut oxi" marker-end="url(#nyilhegy-oxi)"/>` + Rajz.szoveg(tx, ty, t, 'kicsi piros', h);
    const test = Rajz.ember({ feliratok: {}, nezet: 'elol' }).replace(/<svg[^>]*>/, '').replace('</svg>', '');
    return `<svg viewBox="-110 -20 380 340" class="abra" role="img" aria-label="Anatómiai irányok">
      <defs><marker id="nyilhegy-oxi" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="nyilhegy oxi"/></marker></defs>
      ${test}
      ${nyil('felso', 80, 0, 80, -14, 'felső (kraniális)', 130, -12, 'start')}
      ${nyil('also', 80, 296, 80, 312, 'alsó (kaudális)', 130, 310, 'start')}
      ${nyil('medialis', 22, 140, 70, 140, 'középhez közeli (mediális)', -28, 128, 'middle')}
      ${nyil('lateralis', 140, 140, 190, 140, 'oldalsó (laterális)', 210, 128, 'middle')}
      ${nyil('proximalis', 8, 150, 20, 86, 'törzshöz közeli', 4, 78, 'end')}
      ${nyil('distalis', 40, 180, 40, 262, 'távoli (disztális)', 34, 272, 'end')}
      ${nyil('jobb', -40, 230, -90, 230, 'a beteg JOBB oldala', -60, 248, 'middle')}
    </svg>`;
  }

  // ---- Animáció ----
  const animacio = [
    { felirat: 'Az irányokat mindig az <b>anatómiai alaphelyzetből</b> nézzük: a beteg áll, szemből néz ránk, a karjai lógnak, a tenyere előre néz.', rajz: () => iranyok(['nincs']) },
    { felirat: '<b>Felső (superior, cranialis)</b> = a fej felé; <b>alsó (inferior, caudalis)</b> = a láb (a far) felé. Pl. a szív a rekeszizom fölött (kraniálisan) van.', rajz: () => iranyok(['felso', 'also']) },
    { felirat: '<b>Mediális</b> (középhez közel eső) = a test középvonala felé; <b>oldalsó (laterális)</b> = a középvonaltól el. Pl. a fül laterálisan van az orrhoz képest.', rajz: () => iranyok(['medialis', 'lateralis']) },
    { felirat: 'Végtagokon: <b>proximális</b> = a törzshöz közelebb, <b>disztális</b> = a törzstől távolabb. Pl. a könyök proximális a csuklóhoz képest.', rajz: () => iranyok(['proximalis', 'distalis']) },
    { felirat: '<b>Jobb és bal</b> mindig a <b>beteg</b> szemszögéből értendő! Szemből nézve a beteg jobb oldala a <b>te bal oldaladon</b> van.', rajz: () => iranyok(['jobb']) },
  ];

  // ---- Interaktív rész: hasi negyedek ----
  const NEGYEDEK = {
    jf: ['Jobb felső negyed', 'máj, epehólyag, a vastagbél egy része, jobb vese (hátul)', 'epekő, májsérülés'],
    bf: ['Bal felső negyed', 'gyomor, lép, hasnyálmirigy farka, bal vese (hátul)', 'lépsérülés (bal vállba sugárzó fájdalom!)'],
    ja: ['Jobb alsó negyed', 'vakbél és féregnyúlvány, vékonybél vége, jobb petefészek', 'vakbélgyulladás'],
    ba: ['Bal alsó negyed', 'leszálló vastagbél, szigmabél, bal petefészek', 'vastagbél-diverticulitis'],
  };
  function interaktiv(el) {
    const negyed = (k, x, y) => `<rect x="${x}" y="${y}" width="90" height="80" class="test kattinthato" data-n="${k}"/>`;
    el.innerHTML = `<div class="interaktiv">
      <div class="rajz"><svg viewBox="0 0 220 220" class="abra" role="img" aria-label="Hasi negyedek">
        ${negyed('jf', 20, 20)}${negyed('bf', 110, 20)}${negyed('ja', 20, 100)}${negyed('ba', 110, 100)}
        <circle cx="110" cy="100" r="5" class="pont"/>
        ${Rajz.szoveg(110, 112, 'köldök', 'kicsi')}
        ${Rajz.szoveg(65, 205, 'beteg JOBB', 'kicsi')}${Rajz.szoveg(155, 205, 'beteg BAL', 'kicsi')}
      </svg></div>
      <div class="szamitas"><p>Kattints egy hasi negyedre!</p></div></div>`;
    el.addEventListener('click', (e) => {
      const n = e.target.closest('[data-n]');
      if (!n) return;
      el.querySelectorAll('[data-n]').forEach((r) => r.classList.toggle('jelolt', r === n));
      const [nev, szervek, pelda] = NEGYEDEK[n.dataset.n];
      el.querySelector('.szamitas').innerHTML = `<p><b>${nev}</b></p><p>Szervek: ${szervek}</p><p>Példa fájdalomra: ${pelda}</p>`;
    });
  }

  // ---- Feladatok ----
  const IRANY = ['felső (kraniális)', 'alsó (kaudális)', 'középhez közeli (mediális)', 'oldalsó (laterális)', 'törzshöz közeli (proximális)', 'távoli (disztális)'];
  const irany = (kerdes, valasz, megoldas) => ({
    kerdes,
    valasztas: IRANY,
    valasz,
    fixSorrend: true,
    segitseg: 'Kraniális = fej felé, kaudális = láb felé, mediális = középvonal felé, laterális = oldalra, proximális = törzshöz közel, disztális = törzstől távol.',
    megoldas,
  });

  const feladatok = [
    ...Tananyag.szint(1, [
      {
        kerdes: 'Mi az <b>anatómiai alaphelyzet</b>?',
        valasztas: [
          'Álló test, szemből néz, a karok lógnak, a tenyér előre néz',
          'Hanyatt fekvés',
          'Ülő helyzet',
          'Oldalfekvés',
        ],
        valasz: 'Álló test, szemből néz, a karok lógnak, a tenyér előre néz',
        segitseg: 'Ebből a helyzetből írjuk le az irányokat.',
        megoldas: 'Anatómiai alaphelyzet: egyenes állás, előre néző arc, a test mellett lógó karok, előre néző tenyér. Minden irány ehhez viszonyít.',
      },
      {
        kerdes: 'A betegnek a <b>jobb</b> karja sérült. Ha szemből nézed, melyik oldaladon van?',
        valasztas: ['A te bal oldaladon', 'A te jobb oldaladon', 'Mögötte', 'Mindegy'],
        valasz: 'A te bal oldaladon',
        segitseg: 'A jobb és bal mindig a beteg szemszögéből értendő.',
        megoldas: 'Szemből nézve a beteg jobb oldala a te bal oldaladon van. A dokumentációban mindig a beteg oldalát írd!',
      },
      irany('A fej melyik irányban van a mellkashoz képest?', 'felső (kraniális)', 'A fej a mellkashoz képest felül, kraniálisan van.'),
      irany('A csukló milyen irányban van a könyökhöz képest?', 'távoli (disztális)', 'A csukló távolabb van a törzstől, mint a könyök: disztális.'),
      irany('A térd milyen irányban van a bokához képest?', 'törzshöz közeli (proximális)', 'A térd közelebb van a törzshöz, mint a boka: proximális.'),
      irany('Az orr milyen irányban van a fülhöz képest?', 'középhez közeli (mediális)', 'Az orr közelebb van a test középvonalához: mediális.'),
      irany('A kisujj milyen irányban van a hüvelykujjhoz képest (anatómiai alaphelyzetben, tenyér előre)?', 'középhez közeli (mediális)', 'Alaphelyzetben (tenyér előre) a kisujj van közelebb a test középvonalához: mediális. A hüvelykujj laterális.'),
      {
        kerdes: 'Melyik izom választja el a mellüreget a hasüregtől?',
        valasztas: ['A rekeszizom', 'A bordaközi izmok', 'A hasizom', 'A nyakizom'],
        valasz: 'A rekeszizom',
        segitseg: 'A legfontosabb légzőizom is.',
        megoldas: 'A rekeszizom (diaphragma) kupola alakú izom, ami elválasztja a mellüreget a hasüregtől, és a fő belégző izom.',
      },
      {
        kerdes: 'Melyik hasi negyedben van a <b>máj</b> nagy része?',
        valasztas: ['Jobb felső', 'Bal felső', 'Jobb alsó', 'Bal alsó'],
        valasz: 'Jobb felső',
        fixSorrend: true,
        segitseg: 'A jobb bordaív alatt.',
        megoldas: 'A máj a jobb felső hasi negyedben, a jobb bordaív alatt van.',
      },
      {
        kerdes: 'Melyik hasi negyedben van a <b>lép</b>?',
        valasztas: ['Jobb felső', 'Bal felső', 'Jobb alsó', 'Bal alsó'],
        valasz: 'Bal felső',
        fixSorrend: true,
        segitseg: 'A bal bordaív alatt.',
        megoldas: 'A lép a bal felső negyedben, a bal bordaív alatt van; tompa hasi sérülésnél gyakran reped.',
      },
    ]),
    ...Tananyag.szint(2, [
      {
        kerdes: 'Mit jelent az <b>anterior</b> (ventrális)?',
        valasztas: ['Elülső (has felőli)', 'Hátsó (hát felőli)', 'Felső', 'Mély'],
        valasz: 'Elülső (has felőli)',
        segitseg: '„venter” = has.',
        megoldas: 'Anterior / ventrális = elülső, a has felőli oldal. Posterior / dorzális = hátsó, a hát felőli oldal.',
      },
      { kerdes: 'Miben különbözik a <b>rendszeres (szisztematikus)</b> anatómia és a <b>tájanatómia</b>?', valasztas: ['A rendszeres szervrendszerenként (csonttan, izomtan, értan…), a tájanatómia testtájanként tárgyalja a testet', 'A rendszeres csak a csontokkal, a tájanatómia csak a bőrrel foglalkozik', 'A rendszeres mikroszkóppal, a tájanatómia röntgennel dolgozik', 'Nincs különbség'], valasz: 'A rendszeres szervrendszerenként (csonttan, izomtan, értan…), a tájanatómia testtájanként tárgyalja a testet', segitseg: 'Rendszer, illetve táj.', megoldas: 'Rendszeres anatómia: az összetartozó szerveket együtt tárgyalja (csonttan, ízülettan, izomtan, értan, zsigertan, idegtan). Tájanatómia: egy testtájon belül az izmok, erek, idegek, zsigerek egymáshoz való viszonyát írja le – ez kell pl. egy szúrt seb megítéléséhez.' },
      {
        kerdes: 'Melyik sík osztja a testet <b>jobb és bal</b> félre?',
        valasztas: ['Nyílirányú (szagittális) középsík', 'Homloksík (frontális)', 'Vízszintes (horizontális) sík', 'Egyik sem'],
        valasz: 'Nyílirányú (szagittális) középsík',
        segitseg: 'Mint egy nyíl, ami szemből a test közepébe fúródik.',
        megoldas: 'A szagittális (nyílirányú) sík elölről hátrafelé fut; a középső szagittális sík (mediánsík) a testet jobb és bal félre osztja.',
      },
      {
        kerdes: 'Melyik sík osztja a testet <b>elülső és hátsó</b> részre?',
        valasztas: ['Homloksík (frontális)', 'Nyílirányú sík', 'Vízszintes sík', 'Ferde sík'],
        valasz: 'Homloksík (frontális)',
        segitseg: 'A homlokkal párhuzamos.',
        megoldas: 'A homloksík (frontális, koronális) a homlokkal párhuzamos, a testet elülső és hátsó részre osztja.',
      },
      {
        kerdes: 'Melyik sík osztja a testet <b>felső és alsó</b> részre?',
        valasztas: ['Vízszintes (horizontális, transzverzális) sík', 'Homloksík', 'Nyílirányú sík', 'Középsík'],
        valasz: 'Vízszintes (horizontális, transzverzális) sík',
        segitseg: 'Mint a talaj.',
        megoldas: 'A vízszintes (horizontális, transzverzális) sík a talajjal párhuzamos; a CT-felvételek többsége ilyen „szeleteket” mutat.',
      },
      {
        kerdes: 'Melyik hasi negyedben van a <b>féregnyúlvány</b> (vakbélgyulladás jellegzetes fájdalma)?',
        valasztas: ['Jobb felső', 'Bal felső', 'Jobb alsó', 'Bal alsó'],
        valasz: 'Jobb alsó',
        fixSorrend: true,
        segitseg: 'A vakbél a vastagbél kezdete.',
        megoldas: 'A vakbél és a féregnyúlvány a jobb alsó negyedben van. Vakbélgyulladásnál a fájdalom gyakran a köldök körül kezd, majd ide vándorol.',
      },
      {
        kerdes: 'Mit jelent a <b>felszíni</b> (superficialis) és a <b>mély</b> (profundus)?',
        valasztas: ['A test felszínéhez közelebb, illetve attól távolabb, beljebb', 'Felül és alul', 'Elöl és hátul', 'Jobbra és balra'],
        valasz: 'A test felszínéhez közelebb, illetve attól távolabb, beljebb',
        segitseg: 'A bőr felszíni, a csont mélyebben van.',
        megoldas: 'Felszíni = a bőrhöz közelebb (pl. a felszíni vénák), mély = beljebb (pl. a mélyvénák, ahol a trombózis veszélyesebb).',
      },
      {
        kerdes: 'Mi a <b>tenyéri</b> és a <b>talpi</b> oldal szakszava?',
        valasztas: ['Palmáris (tenyéri), plantáris (talpi)', 'Dorzális, ventrális', 'Kraniális, kaudális', 'Proximális, disztális'],
        valasz: 'Palmáris (tenyéri), plantáris (talpi)',
        segitseg: '„palma” = tenyér, „planta” = talp.',
        megoldas: 'Palmáris = tenyéri oldal, plantáris = talpi oldal. A kézhát és a lábhát: dorzális.',
      },
      {
        kerdes: 'Melyik testüregben van a <b>szív</b>?',
        valasztas: ['Mellüreg (a két tüdő között, a gátorban)', 'Hasüreg', 'Medenceüreg', 'Koponyaüreg'],
        valasz: 'Mellüreg (a két tüdő között, a gátorban)',
        segitseg: 'A mellkasban, a rekeszizom fölött.',
        megoldas: 'A szív a mellüregben, a két tüdő közötti térben (gátor, mediastinum) van, a rekeszizom fölött.',
      },
      { kerdes: 'Mivel foglalkozik a <b>fejlődéstan</b> (embryologia), és mi az <b>ontogenesis</b>?', valasztas: ['A szervezet kialakulásával a megtermékenyüléstől a születésig; az ontogenesis az egyed fejlődése', 'Az öregedéssel; az ontogenesis a halál folyamata', 'A sejtek felépítésével; az ontogenesis a sejtosztódás', 'A betegségek kialakulásával; az ontogenesis a fertőzés'], valasz: 'A szervezet kialakulásával a megtermékenyüléstől a születésig; az ontogenesis az egyed fejlődése', segitseg: 'Onto- = egyed, phylo- = törzs (faj).', megoldas: 'Fejlődéstan (embryologia): a megtermékenyüléstől a születésig. Ontogenesis = egyedfejlődés, phylogenesis = törzsfejlődés (a fajok fejlődése).' },
    ]),
    ...Tananyag.szint(3, [
      {
        kerdes: 'A dokumentációban ez áll: „5 cm-es vágott seb a bal alkar disztális harmadának laterális oldalán.” Hol van a seb?',
        szakma: CIMKEK.ESET,
        valasztas: [
          'A bal alkaron, a csuklóhoz közel, a hüvelykujj felőli oldalon',
          'A bal alkaron, a könyökhöz közel, a kisujj felőli oldalon',
          'A jobb alkaron, a csukló felőli oldalon',
          'A bal felkaron',
        ],
        valasz: 'A bal alkaron, a csuklóhoz közel, a hüvelykujj felőli oldalon',
        segitseg: 'Disztális = csukló felé. Laterális (alaphelyzetben) = hüvelykujj oldal.',
        megoldas: 'Disztális harmad = a csuklóhoz közeli harmad. Laterális oldal alaphelyzetben (tenyér előre) = hüvelykujj (orsócsont) felőli oldal.',
      },
      {
        kerdes: 'Melyik leírás <b>helyes</b> a köldök alatti, középvonali területre?',
        valasztas: ['Hipogasztrium (alhas közepe)', 'Epigasztrium', 'Jobb csípőtáj', 'Bal bordaív alatti tájék'],
        valasz: 'Hipogasztrium (alhas közepe)',
        segitseg: '„hipo” = alatt, „gaszter” = gyomor.',
        megoldas: 'Hipogasztrium: a köldök alatti középső terület (húgyhólyag, méh). Epigasztrium: a köldök fölötti, szegycsont alatti terület (gyomortáj).',
      },
      {
        kerdes: 'Melyik a gyomortáji (szegycsont alatti) régió neve, ahová az infarktus fájdalma is sugározhat?',
        valasztas: ['Epigasztrium', 'Hipogasztrium', 'Lágyék', 'Ágyék'],
        valasz: 'Epigasztrium',
        segitseg: '„epi” = fölött.',
        megoldas: 'Epigasztrium: a szegycsont alatti, köldök fölötti terület. Alsó fali infarktus fájdalma ide is sugározhat – „gyomorfájásnak” tűnhet!',
      },
      { kerdes: 'Mi a különbség a <b>tuber</b> és a <b>tuberculum</b> között?', valasztas: ['A tuber nagyobb dudor, a tuberculum kis dudor (kiemelkedés)', 'A tuber lyuk, a tuberculum árok', 'A tuber csont, a tuberculum izom', 'Ugyanazt jelentik'], valasz: 'A tuber nagyobb dudor, a tuberculum kis dudor (kiemelkedés)', szakma: CIMKEK.LATIN, segitseg: 'Az „-ulum” kicsinyítő képző.', megoldas: 'Tuber = dudor, tuberculum = kis dudor, kiemelkedés (az „-ulum”, „-ulus” kicsinyít). Pl. tuber ischiadicum = ülőgumó, tuberculum majus = a felkarcsont nagy dudora.' },
      {
        kerdes: 'Fektetési helyzetek: mit jelent a <b>Trendelenburg-helyzet</b>?',
        valasztas: [
          'Hanyatt fekvés, a fej mélyebben van, mint a medence',
          'Félülő helyzet',
          'Hason fekvés',
          'Oldalfekvés',
        ],
        valasz: 'Hanyatt fekvés, a fej mélyebben van, mint a medence',
        segitseg: 'Az egész test „lejt” a fej felé.',
        megoldas: 'Trendelenburg-helyzet: hanyatt, a test lejt, a fej lejjebb. Ma ritkán használjuk (pl. légembólia gyanújánál bal oldalon); sokkban inkább csak a lábakat emeljük. A félülő helyzet neve: Fowler-helyzet.',
      },
      { kerdes: 'A mikroszkópban 40-szeres objektívet és 8-szoros okulárt használsz. Hányszoros a nagyítás?', valasz: 320, egyseg: '×', szakma: CIMKEK.SZAMOLAS, segitseg: 'A két lencse nagyítását össze kell szorozni.', megoldas: 'Nagyítás = objektív · okulár = 40 · 8 = 320-szoros. A hagyományos fénymikroszkóp kb. 10–1500-szoros nagyításra képes, az elektronmikroszkóp több százezerszeresre.' },
      {
        kerdes: 'A bal oldali bordaív alatti, hátulról az ágyéktájra sugárzó fájdalom melyik szerv betegségére utalhat leginkább?',
        szakma: CIMKEK.ESET,
        valasztas: ['Bal vese (pl. vesekő)', 'Féregnyúlvány', 'Máj', 'Húgyhólyag'],
        valasz: 'Bal vese (pl. vesekő)',
        segitseg: 'A vesék hátul, a bordák alatt vannak.',
        megoldas: 'A vesék a hasüreg mögött (retroperitoneálisan), a hát felső ágyéki részén vannak. A vesekő oldalsó, ágyéki, a lágyék felé sugárzó görcsös fájdalmat okoz.',
      },
      {
        kerdes: 'Melyik szerv van <b>retroperitoneálisan</b> (a hashártya mögött)?',
        valasztas: ['Vese', 'Gyomor', 'Lép', 'Vékonybél nagy része'],
        valasz: 'Vese',
        segitseg: 'A hasüreg hátsó falán, a hashártya mögött.',
        megoldas: 'Retroperitoneálisan fekszenek: vesék, mellékvesék, hasnyálmirigy nagy része, hasi aorta, alsó üres véna. Ezek vérzése „rejtett”, nehezen észrevehető lehet.',
      },
      { kerdes: 'Miért <b>kifejezőbb</b> a cranialis, mint a superior irányjelzés?', valasztas: ['Mert a fejhez viszonyít, így bármilyen testhelyzetben (fekvő betegnél is) egyértelmű, a „felső” viszont a térbeli helyzettől függ', 'Mert latinul van', 'Mert rövidebb', 'Nem kifejezőbb, a kettő mindig mást jelent'], valasz: 'Mert a fejhez viszonyít, így bármilyen testhelyzetben (fekvő betegnél is) egyértelmű, a „felső” viszont a térbeli helyzettől függ', segitseg: 'Cranium = koponya. Fekvő betegnél mi a „fent”?', megoldas: 'A cranialis (fej felé) és a caudalis (far felé) a testhez kötött irány. A superior–inferior alaphelyzetben ugyanezt jelenti, de fekvő vagy fejjel lefelé lógó betegnél félreérthető lehet.' },
      { kerdes: 'Az élettani kísérletben egy szervet eltávolítanak, és megfigyelik a <b>kiesési tüneteket</b>. Melyik kísérleti módszer ez?', valasztas: ['Műtéti módszer', 'Izolált túlélő szerv vizsgálata', 'Gyógyszerkísérleti (biokémiai) módszer', 'Fizikai módszer'], valasz: 'Műtéti módszer', segitseg: 'Szerveltávolítás, érlekötés, idegátvágás.', megoldas: 'A kísérletek fajtái: műtéti (szerveltávolítás, ér lekötése, ideg átvágása – kiesési tünetek), izolált túlélő szervek és szövetszeletek, gyógyszerkísérleti (biokémiai), fizikai (elektromosság, hő, sugárzás), szervbeültetés, -átültetés.' },
    ]),
    ...Tananyag.szint(1, [
      { kerdes: 'Mivel foglalkozik az <b>anatómia</b>, és mivel az <b>élettan</b>?', valasztas: ['Az anatómia a test felépítésével (szerkezetével), az élettan a működésével', 'Az anatómia a betegségekkel, az élettan a gyógyszerekkel', 'Mindkettő csak a sejtekkel', 'Az anatómia a működéssel, az élettan a szerkezettel'], valasz: 'Az anatómia a test felépítésével (szerkezetével), az élettan a működésével', segitseg: 'Szerkezet (struktúra) és működés (funkció).', megoldas: 'Anatómia: a felépítés (szó szerint „boncolás”); élettan (physiologia): a működés, az életjelenségek. A kettő elválaszthatatlan: a működés a szerkezettől függ, és vissza is hat rá.' },
      { kerdes: 'Mi a <b>szövettan</b> tudományos neve?', valasztas: ['Histologia', 'Cytologia', 'Embryologia', 'Physiologia'], valasz: 'Histologia', szakma: CIMKEK.LATIN, segitseg: 'Hisztológiai vizsgálatra küldik a kimetszett szövetet.', megoldas: 'Szövettan = histologia; sejttan = cytologia (a szövettan önálló része); fejlődéstan = embryologia; élettan = physiologia.' },
      { kerdes: 'Mi az <b>élettan</b> legfontosabb vizsgáló módszere?', valasztas: ['A kísérlet', 'A boncolás', 'A macerálás', 'A metszetkészítés'], valasz: 'A kísérlet', segitseg: 'A kutató maga idéz elő egy jelenséget.', megoldas: 'Az anatómia fő módszere a boncolás (preparálás) és a mikroszkópos vizsgálat, az élettané a kísérlet: a kutató maga hoz létre egy jelenséget, és figyeli, mi történik.' },
      { kerdes: 'Mit jelent a <b>disztális</b> egy végtagon?', valasztas: ['A törzstől távolabb eső', 'A törzshöz közelebb eső', 'Felső', 'Belső'], valasz: 'A törzstől távolabb eső', segitseg: 'Distans = távoli.', megoldas: 'Disztális: a végtag vége felé. A KMÉ-t mindig a sérüléstől disztálisan ellenőrizzük.' },
      { kerdes: 'Melyik a test fő részeinek (fej, nyak, törzs, végtagok) latin neve?', valasztas: ['caput, collum, truncus, extremitates', 'cranium, cervix, thorax, membra', 'corpus, collum, abdomen, artus', 'caput, cervix, pelvis, extremitates'], valasz: 'caput, collum, truncus, extremitates', szakma: CIMKEK.LATIN, segitseg: 'A nyak: collum (mint a „kollár”).', megoldas: 'Fej = caput, nyak = collum, törzs = truncus, végtagok = extremitates (felső és alsó végtag). Az egész test: corpus.' },
      { kerdes: 'Mit jelent a <b>dexter</b> és a <b>sinister</b>?', valasztas: ['Jobb, illetve bal', 'Bal, illetve jobb', 'Elülső, illetve hátsó', 'Felső, illetve alsó'], valasz: 'Jobb, illetve bal', szakma: CIMKEK.LATIN, segitseg: 'A „dexter” a „dextrokardia” (jobbra helyezett szív) szóban is benne van.', megoldas: 'Dexter = jobb, sinister = bal (pl. arteria carotis communis sinistra = bal közös fejverőér). Mindig a beteg jobb és bal oldala!' },
      { kerdes: 'Melyik testüregben van az agy?', valasztas: ['Koponyaüreg', 'Mellüreg', 'Hasüreg', 'Medenceüreg'], valasz: 'Koponyaüreg', segitseg: 'A koponya védi.', megoldas: 'Az agy a koponyaüregben, a gerincvelő a gerinccsatornában van – együtt a hátsó (dorzális) testüreg.' },
      { kerdes: 'Melyik testüregben van a húgyhólyag?', valasztas: ['Medenceüreg', 'Mellüreg', 'Koponyaüreg', 'Gerinccsatorna'], valasz: 'Medenceüreg', segitseg: 'A has legalsó része.', megoldas: 'A medenceüregben van a húgyhólyag, a végbél, nőknél a méh és a petefészkek.' },
      { kerdes: 'Mit jelent a <b>foramen</b>?', valasztas: ['Lyuk', 'Árok', 'Bevágás', 'Taraj'], valasz: 'Lyuk', szakma: CIMKEK.LATIN, segitseg: 'A nyakszirtcsont nagy lyuka: foramen magnum.', megoldas: 'Foramen = lyuk (pl. foramen magnum = nagy nyakszirti lyuk). Hasonló gyűjtőnevek: sulcus = árok, incisura = bevágás, fissura = hasadék, crista = taraj.' },
      { kerdes: 'Hol van a <b>kézhát</b>?', valasztas: ['A kéz tenyérrel ellentétes oldala (dorzális oldal)', 'A tenyér', 'A csukló belső oldala', 'Az ujjbegyek'], valasz: 'A kéz tenyérrel ellentétes oldala (dorzális oldal)', segitseg: 'Dorsum = hát.', megoldas: 'A kézhát a kéz dorzális oldala, a tenyér a palmáris (volaris) oldal. Kanült gyakran a kézháti vénákba teszünk.' },
      { kerdes: 'Mi a <b>köldök</b> szerepe a has felosztásában?', valasztas: ['A rajta átmenő függőleges és vízszintes vonal osztja négy negyedre a hasat', 'Semmi', 'A mellkas határa', 'A medence közepe'], valasz: 'A rajta átmenő függőleges és vízszintes vonal osztja négy negyedre a hasat', segitseg: 'Kvadránsok.', megoldas: 'A köldökön át húzott két vonal négy negyedet (kvadránst) jelöl ki: jobb felső, bal felső, jobb alsó, bal alsó.' },
    ]),
    ...Tananyag.szint(2, [
      { kerdes: 'Mit jelent az <b>ipszilaterális</b>?', valasztas: ['Azonos oldali', 'Ellenoldali', 'Kétoldali', 'Középvonali'], valasz: 'Azonos oldali', segitseg: 'Ipse = ugyanaz.', megoldas: 'Ipszilaterális: ugyanazon az oldalon; kontralaterális: az ellenkező oldalon. Pl. stroke: kontralaterális bénulás.' },
      { kerdes: 'Mivel konzerválják (tartósítják) a tetemet a boncolás előtt?', valasztas: ['10%-os formalinnal, amelyet az érpályába fecskendeznek', 'Konyhasóval bedörzsölve', 'Hűtéssel, mínusz 80 °C-on', 'Hidrogén-peroxidos áztatással'], valasz: '10%-os formalinnal, amelyet az érpályába fecskendeznek', segitseg: 'Formaldehid vizes oldata.', megoldas: 'A tetemet rendszerint 10%-os formalin érpályába fecskendezésével konzerválják; ez a boncolás (preparálás) feltétele.' },
      { kerdes: 'Mi a <b>mediastinum</b> (gátorüreg)?', valasztas: ['A két tüdő közötti térség, benne a szív, a nagy erek, a légcső, a nyelőcső', 'A hasüreg közepe', 'A koponyaüreg alja', 'A medence közepe'], valasz: 'A két tüdő közötti térség, benne a szív, a nagy erek, a légcső, a nyelőcső', segitseg: 'A mellüreg középső része.', megoldas: 'A mediastinum a mellüreg középső része. Feszülő légmellben a mediastinum az ép oldal felé tolódik.' },
      { kerdes: 'Melyik hasi régió neve a köldök körüli terület?', valasztas: ['Köldöktáj (regio umbilicalis)', 'Gyomortáj (epigastrium)', 'Alhas (hypogastrium)', 'Lágyék (regio inguinalis)'], valasz: 'Köldöktáj (regio umbilicalis)', segitseg: 'Umbilicus = köldök.', megoldas: 'A has 9 régiója közül a középső sor: gyomortáj (fent), köldöktáj (középen), alhas (lent).' },
      { kerdes: 'Melyik régió a <b>hypochondrium</b>?', valasztas: ['A bordaív alatti oldalsó terület (jobb és bal)', 'A köldök körüli terület', 'A lágyék', 'A gát'], valasz: 'A bordaív alatti oldalsó terület (jobb és bal)', segitseg: 'Hypo = alatt, chondros = porc (bordaporc).', megoldas: 'Jobb hypochondrium: máj, epehólyag. Bal hypochondrium: lép, gyomor egy része.' },
      { kerdes: 'Mi a <b>macerálás</b>?', valasztas: ['A csontok kikészítése: lágyrészeiktől megtisztítva hetekig langyos vízben áztatják, majd zsírtalanítják és fehérítik', 'Az erek kitöltése festett masszával', 'A szövet vékony szeletekre vágása', 'A tetem fagyasztása'], valasz: 'A csontok kikészítése: lágyrészeiktől megtisztítva hetekig langyos vízben áztatják, majd zsírtalanítják és fehérítik', segitseg: 'Macerálás = áztatás.', megoldas: 'Macerálás: áztatás közben leválnak a csonthártya- és izommaradványok; benzinnel zsírtalanítják, hidrogén-peroxiddal fehérítik. Ezekből a csontokból fűzik össze a tanuló csontvázat.' },
      { kerdes: 'Mit jelent a test <b>szelvényezettsége</b>, és hol ismerhető fel emberben?', valasztas: ['A törzs hosszában egyforma szerkezetű részekből épül fel; emberben a bordákon, a csigolyákon és a gerincvelői idegeken látszik', 'A test jobb és bal fele tükörképe egymásnak; a végtagokon látszik', 'A test sejtekből áll; a bőrön látszik', 'A has négy negyedre osztható; a köldökön látszik'], valasz: 'A törzs hosszában egyforma szerkezetű részekből épül fel; emberben a bordákon, a csigolyákon és a gerincvelői idegeken látszik', segitseg: 'Ismétlődő egységek, mint egy gyöngysor.', megoldas: 'A test két felépítési elve: a kétoldali részarányosság (bilaterális szimmetria) és a szelvényezettség. Emberben a szelvényezettség már csak a bordákon, csigolyákon és gerincvelői idegeken ismerhető fel.' },
      { kerdes: 'Melyik a törzs három részének latin neve (mellkas, has, medence)?', valasztas: ['thorax, abdomen, pelvis', 'thorax, venter, sacrum', 'pectus, abdomen, coxa', 'cavum, abdomen, perineum'], valasz: 'thorax, abdomen, pelvis', szakma: CIMKEK.LATIN, segitseg: 'A mellkasröntgen angolul is „thorax”.', megoldas: 'Mellkas = thorax, has = abdomen, medence = pelvis. A törzs üregét a rekeszizom (diaphragma) mell- és hasüregre osztja; a medenceüreg alsó fala, a két comb közötti terület a gát (perineum).' },
      { kerdes: 'Hol van a <b>jugulum</b> (szegycsont feletti árok)?', valasztas: ['A szegycsont markolata felett, a nyak tövénél', 'A köldök alatt', 'A térdhajlatban', 'A hónaljban'], valasz: 'A szegycsont markolata felett, a nyak tövénél', segitseg: 'Itt figyeljük a légcső helyzetét.', megoldas: 'A jugulumban tapintható a légcső. Eltolódása (késői jel) feszülő légmellre utalhat; behúzódása légúti szűkületre.' },
      { kerdes: 'Mit jelentenek a gyakori <b>rövidítések</b>: a., v., m., n.?', valasztas: ['arteria (ütőér), vena (visszér), musculus (izom), nervus (ideg)', 'anterior, ventralis, medialis, nucleus', 'articulatio, valvula, magnus, nodus', 'arteria, vertebra, musculus, nucleus'], valasz: 'arteria (ütőér), vena (visszér), musculus (izom), nervus (ideg)', szakma: CIMKEK.LATIN, segitseg: 'Ér, ér, izom, ideg.', megoldas: 'a. = arteria, v. = vena, m. = musculus, n. = nervus; többes számban: aa., vv., mm., nn. Pl. a. radialis = orsóartéria, n. medianus = középideg. Továbbá: lig. = ligamentum (szalag), art. = articulatio (ízület), gl. = glandula (mirigy).' },
      { kerdes: 'Mit jelentenek a <b>supra</b>, az <b>infra</b> és az <b>inter</b> előtagok?', valasztas: ['Felett, alatt, között', 'Alatt, felett, belül', 'Között, felett, alatt', 'Belül, kívül, mellett'], valasz: 'Felett, alatt, között', szakma: CIMKEK.LATIN, segitseg: 'Inter-net: a gépek „közötti” háló.', megoldas: 'Supra = felett, infra és sub = alatt, inter = között, intra = belül. Pl. musculi intercostales = bordaközi izmok, regio infraclavicularis = kulcscsont alatti tájék.' },
      { kerdes: 'Hogyan dokumentálod: „a seb a jobb comb belső oldalán, a térd felett 5 cm-re”?', valasztas: ['Jobb comb mediális oldalán, a térdtől 5 cm-re proximálisan', 'Jobb comb laterális oldalán, a térdtől 5 cm-re disztálisan', 'Bal comb mediális oldalán', 'Jobb lábszár laterálisan'], valasz: 'Jobb comb mediális oldalán, a térdtől 5 cm-re proximálisan', segitseg: 'Belső = mediális; felette = a törzs felé.', megoldas: 'Belső oldal = mediális; a térd felett = proximálisan (a törzs felé).' },
      { kerdes: 'Mi a <b>hashártya</b> (peritoneum)?', valasztas: ['A hasüreget bélelő és a hasi szerveket borító savós hártya', 'A tüdőt borító hártya', 'A szívet borító hártya', 'Az agyat borító hártya'], valasz: 'A hasüreget bélelő és a hasi szerveket borító savós hártya', segitseg: 'A mellhártya „hasi párja”.', megoldas: 'A hashártya gyulladása (peritonitis) deszkakemény hasat okoz. A vese és a hasnyálmirigy a hashártya mögött (retroperitoneálisan) fekszik.' },
    ]),
    ...Tananyag.szint(3, [
      { kerdes: 'Melyik vonalak mentén keressük a mellkasi dekompresszió protokoll szerinti helyeit felnőttnél?', valasztas: ['2. bordaköz a medioclavicularis vonalban, vagy 4–5. bordaköz az elülső/középső hónaljvonalban', 'A köldök mellett', 'A 10. bordaköz hátul', 'A szegycsont közepén'], valasz: '2. bordaköz a medioclavicularis vonalban, vagy 4–5. bordaköz az elülső/középső hónaljvonalban', segitseg: 'Két elfogadott hely.', megoldas: 'A pontos hely a helyi protokolltól függ. A tájékozódási vonalak (medioclavicularis, elülső/középső hónaljvonal) ismerete elengedhetetlen.' },
      { kerdes: 'Hogyan találod meg a <b>2. bordát</b> a mellkason?', valasztas: ['A szegycsont markolata és teste közötti kiemelkedés (Louis-szög) mellett tapintható', 'A köldöktől felfelé számolva', 'A kulcscsont alatt közvetlenül mindig az 1. borda tapintható jól', 'A lapocka csúcsánál'], valasz: 'A szegycsont markolata és teste közötti kiemelkedés (Louis-szög) mellett tapintható', segitseg: 'Angulus sterni.', megoldas: 'A Louis-szögnél a 2. borda ízesül; alatta a 2. bordaköz. Innen lefelé számolhatók a bordaközök.' },
      { kerdes: 'Hol van a <b>McBurney-pont</b>, és mire utal ott a nyomásérzékenység?', valasztas: ['A köldök és a jobb elülső felső csípőtövis közötti vonal külső harmadánál – vakbélgyulladás', 'A bal bordaív alatt – lépsérülés', 'A köldök felett – gyomorfekély', 'A szegycsont alatt – infarktus'], valasz: 'A köldök és a jobb elülső felső csípőtövis közötti vonal külső harmadánál – vakbélgyulladás', segitseg: 'Jobb alsó negyed.', megoldas: 'A McBurney-pont érzékenysége vakbélgyulladásra utalhat (de nem kizárólagos jel).' },
      { kerdes: 'Melyik testhelyzetet nevezzük <b>„félig ülő” (Fowler)</b> helyzetnek, és kinek előnyös?', valasztas: ['Kb. 45°-ban megemelt felsőtest – nehézlégzéses, szívelégtelen betegnek', 'Fej lejjebb, láb feljebb – mindenkinek', 'Hason fekvés – hányónak', 'Teljesen lapos – fulladónak'], valasz: 'Kb. 45°-ban megemelt felsőtest – nehézlégzéses, szívelégtelen betegnek', segitseg: 'A rekeszizom lejjebb kerül.', megoldas: 'Félig ülő helyzetben könnyebb a légzés, csökken a vénás visszaáramlás (tüdőödémánál előnyös). Alacsony vérnyomásnál viszont óvatosan!' },
      { kerdes: 'A sérült testén több seb van. Melyik leírás pontos: „seb a bal kézháton, a mutatóujj tövétől 2 cm-re”?', valasztas: ['Bal kéz dorzális oldala, a II. ujj tövétől 2 cm-re proximálisan', 'Bal tenyér, II. ujj', 'Jobb kézhát', 'Bal alkar volaris oldala'], valasz: 'Bal kéz dorzális oldala, a II. ujj tövétől 2 cm-re proximálisan', segitseg: 'Kézhát = dorzális; ujjak számozása a hüvelyktől: I–V.', megoldas: 'Az ujjakat a hüvelykujjtól számozzuk (I–V). Kézhát = dorzális oldal; az ujjtőtől a csukló felé = proximálisan.' },
      { kerdes: 'Mit jelent a <b>retroperitoneális</b> vérzés, és miért nehéz felismerni?', valasztas: ['A hashártya mögötti térbe (vese, aorta, medence környéke) történő vérzés – a has elöl puha maradhat, sok vér rejtve gyűlhet össze', 'A mellüregbe történő vérzés', 'A bőr alatti vérzés', 'Az agyba történő vérzés'], valasz: 'A hashártya mögötti térbe (vese, aorta, medence környéke) történő vérzés – a has elöl puha maradhat, sok vér rejtve gyűlhet össze', segitseg: 'A hashártya mögött.', megoldas: 'Medencetörés, aorta-aneurizma, vesesérülés: liternyi vér a retroperitoneumban, kevés hasi jellel. Sokkjelekre figyelj!' },
      { kerdes: 'Mi a különbség a <b>viscerális</b> és a <b>parietális</b> hártyalemez között?', valasztas: ['A viscerális a szervet borítja, a parietális az üreg falát béleli', 'Ugyanaz', 'A parietális a szervet borítja', 'Mindkettő a bőrben van'], valasz: 'A viscerális a szervet borítja, a parietális az üreg falát béleli', segitseg: 'Viscera = zsigerek, paries = fal.', megoldas: 'Mellhártya, hashártya, szívburok: mindegyiknek van zsigeri (viscerális) és fali (parietális) lemeze; közöttük vékony rés.' },
      { kerdes: 'Melyik hasi régióban jelentkezik jellemzően a <b>hólyagtelődés</b> (vizeletrekedés) tapintható terimeként?', valasztas: ['Az alhasban (hypogastrium), a szeméremcsont felett', 'A gyomortájon', 'A bal bordaív alatt', 'A jobb lágyékban'], valasz: 'Az alhasban (hypogastrium), a szeméremcsont felett', segitseg: 'Középen, lent.', megoldas: 'A telt hólyag a szeméremcsont felett, középen tapintható, kopogtatva tompa.' },
      { kerdes: 'A beteget bal oldalra fektetted. Hogyan írod le szakszerűen?', valasztas: ['Bal oldalfekvés (bal laterális decubitus)', 'Jobb oldalfekvés', 'Hason fekvés', 'Trendelenburg-helyzet'], valasz: 'Bal oldalfekvés (bal laterális decubitus)', segitseg: 'Az alul lévő oldal adja a nevét.', megoldas: 'Az oldalfekvést az alul lévő testfél szerint nevezzük: bal oldalfekvés = a bal oldalán fekszik (pl. várandósnál).' },
      { kerdes: 'Egy tenyérnyi (ujjakkal együtt) égett terület a beteg testfelületének kb. hány százaléka?', valasz: 1, egyseg: '%', segitseg: 'A beteg saját tenyere.', megoldas: 'A beteg tenyere ujjakkal együtt kb. a testfelület 1%-a – szórt, kis égéseknél jól használható.' },
      { kerdes: 'Hány régióra osztja a hasat a részletesebb, kilences felosztás?', valasz: 9, egyseg: 'régió', segitseg: '3 · 3.', megoldas: 'Két függőleges és két vízszintes vonal 9 régiót jelöl ki: jobb/bal hypochondrium, gyomortáj, jobb/bal oldaltáj, köldöktáj, jobb/bal lágyék, alhas.' },
    ]),
    ...Tananyag.szint(2, [
      { kerdes: "Melyik anatómiai irányt mutatja a nyíl az ábrán? <small>(1. ábra)</small>", abra: () => Rajz.cimkeNelkul(iranyok(["felso"])), valasztas: ["kraniális (felső, fej felé)", "mediális (a középvonal felé)", "laterális (oldalra, a középvonaltól el)", "proximális (a törzshöz közelebb)"], valasz: "kraniális (felső, fej felé)", szakma: CIMKEK.ABRA, segitseg: "Fej felé: kraniális; középvonal felé: mediális; végtagon a törzstől távolodva: disztális.", megoldas: "A nyíl a(z) kraniális (felső, fej felé) irányt mutatja. Az irányokat mindig az anatómiai alaphelyzetből értjük." },
      { kerdes: "Melyik anatómiai irányt mutatja a nyíl az ábrán? <small>(2. ábra)</small>", abra: () => Rajz.cimkeNelkul(iranyok(["medialis"])), valasztas: ["mediális (a középvonal felé)", "kraniális (felső, fej felé)", "laterális (oldalra, a középvonaltól el)", "proximális (a törzshöz közelebb)"], valasz: "mediális (a középvonal felé)", szakma: CIMKEK.ABRA, segitseg: "Fej felé: kraniális; középvonal felé: mediális; végtagon a törzstől távolodva: disztális.", megoldas: "A nyíl a(z) mediális (a középvonal felé) irányt mutatja. Az irányokat mindig az anatómiai alaphelyzetből értjük." },
      { kerdes: "Melyik anatómiai irányt mutatja a nyíl az ábrán? <small>(3. ábra)</small>", abra: () => Rajz.cimkeNelkul(iranyok(["lateralis"])), valasztas: ["laterális (oldalra, a középvonaltól el)", "kraniális (felső, fej felé)", "mediális (a középvonal felé)", "proximális (a törzshöz közelebb)"], valasz: "laterális (oldalra, a középvonaltól el)", szakma: CIMKEK.ABRA, segitseg: "Fej felé: kraniális; középvonal felé: mediális; végtagon a törzstől távolodva: disztális.", megoldas: "A nyíl a(z) laterális (oldalra, a középvonaltól el) irányt mutatja. Az irányokat mindig az anatómiai alaphelyzetből értjük." },
      { kerdes: "Melyik anatómiai irányt mutatja a nyíl az ábrán? <small>(4. ábra)</small>", abra: () => Rajz.cimkeNelkul(iranyok(["proximalis"])), valasztas: ["proximális (a törzshöz közelebb)", "kraniális (felső, fej felé)", "mediális (a középvonal felé)", "laterális (oldalra, a középvonaltól el)"], valasz: "proximális (a törzshöz közelebb)", szakma: CIMKEK.ABRA, segitseg: "Fej felé: kraniális; középvonal felé: mediális; végtagon a törzstől távolodva: disztális.", megoldas: "A nyíl a(z) proximális (a törzshöz közelebb) irányt mutatja. Az irányokat mindig az anatómiai alaphelyzetből értjük." },
      { kerdes: "Melyik anatómiai irányt mutatja a nyíl az ábrán? <small>(5. ábra)</small>", abra: () => Rajz.cimkeNelkul(iranyok(["distalis"])), valasztas: ["disztális (a törzstől távolabb)", "kraniális (felső, fej felé)", "mediális (a középvonal felé)", "laterális (oldalra, a középvonaltól el)"], valasz: "disztális (a törzstől távolabb)", szakma: CIMKEK.ABRA, segitseg: "Fej felé: kraniális; középvonal felé: mediális; végtagon a törzstől távolodva: disztális.", megoldas: "A nyíl a(z) disztális (a törzstől távolabb) irányt mutatja. Az irányokat mindig az anatómiai alaphelyzetből értjük." },
    ]),
  ];

  Tananyag.tema('anatomia', {
    azon: 'testtajak-iranyok',
    ikon: '🧍',
    animacio,
    interaktiv,
    feladatok,
    magyarazat: `
      <div class="doboz cel">
        <b>Mire jó ez neked?</b>
        <p>A mentőnek <b>pontosan</b> kell leírnia, hol van a sérülés vagy a fájdalom: „a bal alkar disztális harmadának laterális oldalán” mindenkinek ugyanazt jelenti. Az anatómia nyelvét ebben a részben tanulod meg – minden más anatómiai téma erre épül.</p>
      </div>
      <p class="kerekites">📘 Tankönyvi fejezet (Donáth Tibor: Anatómia–élettan): I. fejezet – Bevezetés (Az anatómia és az élettan fogalma és felosztása; Az anatómia és az élettan vizsgáló módszerei; A test felépítésének általános elvei; A test fő síkjai és irányai; Anatómiai szakkifejezések)</p>

      <h3>Anatómia és élettan</h3>
      <p>Az <b>anatómia</b> a test <b>felépítését</b> (szerkezetét) írja le – a szó eredetileg „boncolást” jelent. Az <b>élettan</b> (physiologia) a test <b>működését</b>, az életjelenségeket vizsgálja. A kettő egy egész: a működés a szerkezettől függ, és a működés vissza is hat a szerkezetre (pl. az edzett izom megnő).</p>
      <div class="tabla-keret"><table>
        <thead><tr><th>Ág</th><th>Mit vizsgál?</th></tr></thead>
        <tbody>
          <tr><td>rendszeres (szisztematikus) anatómia</td><td>szervrendszerenként: csonttan, ízülettan, izomtan, értan, zsigertan, idegtan, érzékszervek</td></tr>
          <tr><td>tájanatómia</td><td>testtájanként: az izmok, erek, idegek, zsigerek egymáshoz való viszonyát</td></tr>
          <tr><td>összehasonlító anatómia</td><td>az ember és az állatok szerkezetének összevetését</td></tr>
          <tr><td>alkalmazott (klinikai) anatómia</td><td>a gyakorlati, orvosi vonatkozásokat – része a röntgenanatómia (és van művészi anatómia is)</td></tr>
          <tr><td>szövettan (histologia), sejttan (cytologia)</td><td>a szabad szemmel nem látható, mikroszkópos szerkezetet</td></tr>
          <tr><td>fejlődéstan (embryologia)</td><td>a kialakulást a megtermékenyüléstől a születésig: egyedfejlődés (ontogenesis), törzsfejlődés (phylogenesis)</td></tr>
        </tbody>
      </table></div>
      <p>Az élettan növény- és állatélettanra tagolódik; az emberélettan az állatélettan része. Külön ágak: munkaélettan, táplálkozás-élettan, összehasonlító élettan. Mindez a <b>biológia</b> része.</p>

      <h3>Hogyan vizsgáljuk?</h3>
      <ul>
        <li><b>Boncolás (preparálás)</b> késsel, csipesszel – előtte a tetemet <b>10%-os formalinnal</b> konzerválják (az érpályába fecskendezik).</li>
        <li><b>Macerálás</b> (áztatás): a csontokat hetekig langyos vízben áztatják, zsírtalanítják, fehérítik – így készül az összefűzött csontváz.</li>
        <li><b>Injekciós technika:</b> az erekbe festett, megszilárduló masszát fecskendeznek. <b>Korróziós (szétmarásos) eljárás:</b> utána sósav marja le a lágyrészeket, és csak az érhálózat „öntvénye” marad.</li>
        <li><b>Röntgen:</b> csontok, valamint kontrasztanyaggal feltöltött üreges szervek és erek – élőben is.</li>
        <li><b>Szövettan:</b> rögzítés, víztelenítés, beágyazás után <b>mikrotommal</b> 5–10 µm vastag metszet, festés, majd <b>mikroszkóp</b>.</li>
      </ul>
      <div class="tetel">
        <b>A mikroszkóp</b>
        <p class="keplet">nagyítás = objektív nagyítása · okulár nagyítása</p>
        <p><b>Szavakkal:</b> álló részei a talp és az oszlop; mozgó részei a tükör (fényforrás), a kondenzor (gyűjti és a tárgyra irányítja a fényt), a tárgyasztal, a tubus a lencsékkel – a revolveren a tárgylencsék (objektív), felül a szemlencse (okulár) –, valamint a makrométer- (durva) és mikrométercsavar (finom beállítás). Pl. 40-es objektív és 8-as okulár: 320-szoros nagyítás. A fénymikroszkóp kb. 10–1500-szoros, az elektronmikroszkóp több százezerszeres nagyításra képes.</p>
      </div>
      <p>💬 A mai mikroszkópokban a tükör helyett általában beépített lámpa adja a fényt.</p>
      <p>Az <b>élettan</b> fő módszere a <b>kísérlet</b>: műtéti módszer (szerv eltávolítása, ér lekötése, ideg átvágása – kiesési tünetek), izolált túlélő szervek, gyógyszerkísérleti (biokémiai), fizikai módszerek, szervbeültetés és -átültetés.</p>

      <h3>A test felépítésének elvei és fő részei</h3>
      <ul>
        <li><b>Kétoldali részarányosság</b> (bilaterális szimmetria): a középsík a testet két tükörképszerű félre osztja. Később aszimmetria is kialakul: a szív, a lép, a gyomor inkább balra, a máj jobbra esik.</li>
        <li><b>Szelvényezettség:</b> a törzs ismétlődő egységekből épül fel – emberben már csak a <b>bordákon</b>, a <b>csigolyákon</b> és a <b>gerincvelői idegeken</b> látszik.</li>
        <li>A test (corpus) fő részei: <b>fej</b> (caput), <b>nyak</b> (collum), <b>törzs</b> (truncus), <b>végtagok</b> (extremitates: felső és alsó végtag). A törzs részei: <b>mellkas</b> (thorax), <b>has</b> (abdomen), <b>medence</b> (pelvis).</li>
      </ul>

      <h3>Nézd meg lépésről lépésre!</h3>
      <div data-animacio></div>

      <h3>Irányok</h3>
      <div class="tabla-keret"><table>
        <thead><tr><th>Szakszó</th><th>Jelentés</th><th>Párja</th></tr></thead>
        <tbody>
          <tr><td>superior (cranialis)</td><td>felső, fej felé</td><td>inferior (caudalis): alsó, far felé</td></tr>
          <tr><td>anterior (ventralis)</td><td>elülső, has felőli</td><td>posterior (dorsalis): hátsó, hát felőli</td></tr>
          <tr><td>medialis</td><td>középhez közel eső</td><td>lateralis: oldalsó</td></tr>
          <tr><td>proximalis</td><td>a törzshöz közel (végtagon)</td><td>distalis: a törzstől távol</td></tr>
          <tr><td>superficialis</td><td>felületi</td><td>profundus: mély</td></tr>
          <tr><td>externus</td><td>külső</td><td>internus: belső</td></tr>
          <tr><td>palmáris</td><td>tenyéri</td><td>plantáris: talpi</td></tr>
        </tbody>
      </table></div>
      <p>💡 <b>Jobb és bal</b> (dexter, sinister) mindig a <b>beteg</b> szemszögéből! A cranialis–caudalis kifejezőbb, mint a superior–inferior, mert a testhez kötött: fekvő betegnél is egyértelmű.</p>

      <h3>Síkok</h3>
      <ul>
        <li><b>Középsík (mediánsík):</b> a középvonalban elölről hátra halad, jobb és bal testfélre oszt.</li>
        <li><b>Nyílirányú (sagittalis) síkok:</b> a középsíkkal párhuzamosak.</li>
        <li><b>Homloksík (frontalis):</b> a homlokkal párhuzamos, elülső és hátsó részre oszt.</li>
        <li><b>Vízszintes (horizontalis, transzverzális) sík:</b> az előző kettőre merőleges, felső és alsó részre oszt (CT-szeletek).</li>
      </ul>

      <h3>Testüregek</h3>
      <ul>
        <li><b>Koponyaüreg:</b> agy. <b>Gerinccsatorna:</b> gerincvelő.</li>
        <li><b>Mellüreg:</b> tüdők, szív (a gátorban), nagyerek. A törzs nagy üregét a <b>rekeszizom</b> (diaphragma) osztja mell- és hasüregre.</li>
        <li><b>Hasüreg:</b> gyomor, belek, máj, lép. Mögötte (<b>retroperitoneálisan</b>): vesék, aorta.</li>
        <li><b>Medenceüreg:</b> húgyhólyag, végbél, belső nemi szervek. Erős csontok veszik körül; alsó fala a két comb közötti terület, a <b>gát</b> (perineum).</li>
      </ul>

      <h3>Anatómiai szakkifejezések</h3>
      <p>Az anatómiai képleteket nemzetközileg egységes <b>latin</b> nevekkel jelöljük. Az anatómiai nevezéktan (nómenklatúra) kb. <b>5000</b> fogalmat tartalmaz; a tankönyv szerint érvényeset 1955-ben Párizsban állították össze (<b>Párizsi Nomina Anatomica, PNA</b>).</p>
      <p>💬 Ma a nemzetközileg elfogadott nevezéktan a <b>Terminologia Anatomica</b> (1998, átdolgozva 2019); a legtöbb latin név ugyanaz maradt.</p>
      <div class="tabla-keret"><table>
        <thead><tr><th>Latin</th><th>Magyar</th><th>Latin</th><th>Magyar</th></tr></thead>
        <tbody>
          <tr><td>arteria (a.)</td><td>ütőér</td><td>vena (v.)</td><td>visszér</td></tr>
          <tr><td>musculus (m.)</td><td>izom</td><td>nervus (n.)</td><td>ideg</td></tr>
          <tr><td>os</td><td>csont</td><td>articulatio (art.)</td><td>ízület</td></tr>
          <tr><td>ligamentum (lig.)</td><td>szalag</td><td>glandula (gl.)</td><td>mirigy</td></tr>
          <tr><td>foramen</td><td>lyuk</td><td>sulcus</td><td>árok</td></tr>
          <tr><td>fissura</td><td>hasadék</td><td>incisura</td><td>bevágás</td></tr>
          <tr><td>tuber</td><td>dudor</td><td>tuberculum</td><td>kis dudor, kiemelkedés</td></tr>
          <tr><td>crista</td><td>taraj</td><td>spina</td><td>tövis</td></tr>
          <tr><td>ganglion</td><td>idegdúc</td><td>nucleus</td><td>mag</td></tr>
          <tr><td>lymphonodus</td><td>nyirokcsomó</td><td>valvula</td><td>billentyű</td></tr>
          <tr><td>regio</td><td>tájék</td><td>ramus (r.)</td><td>ág</td></tr>
          <tr><td>magnus</td><td>nagy</td><td>parvus</td><td>kicsi</td></tr>
          <tr><td>supra</td><td>felett</td><td>infra, sub</td><td>alatt</td></tr>
          <tr><td>inter</td><td>között</td><td>intra</td><td>belül</td></tr>
        </tbody>
      </table></div>
      <p>Többes szám rövidítve: aa. (arteriae), vv. (venae), mm. (musculi), nn. (nervi), ligg. (ligamenta).</p>

      <h3>Próbáld ki: hasi negyedek</h3>
      <div data-interaktiv></div>

      <div class="tetel">
        <b>Hasi negyedek</b>
        <p class="keplet">Két képzelt vonal a köldökön át: függőleges és vízszintes</p>
        <p><b>Szavakkal:</b> jobb felső (máj, epehólyag), bal felső (gyomor, lép), jobb alsó (féregnyúlvány), bal alsó (szigmabél). A köldök fölötti középső terület az epigasztrium, alatta a hipogasztrium.</p>
      </div>

      <h3>A gyakorlatban</h3>
      <div class="doboz szakma">
        <p><b>🚑 Dokumentációs példa</b></p>
        <p class="pelda">„3 cm-es vérző vágott seb a jobb lábszár disztális harmadának mediális oldalán. A jobb alsó hasi negyedben nyomásérzékenység.”</p>
        <p>Pontos, rövid, mindenki ugyanúgy érti.</p>
      </div>

      <details class="tobbet">
        <summary>Ha többet szeretnél tudni: kilenc hasi régió</summary>
        <p>A has finomabb felosztása kilenc régióra: felül jobb bordaív alatti tájék – epigasztrium – bal bordaív alatti tájék; középen jobb oldali tájék – köldöktáj – bal oldali tájék; alul jobb csípőtáj (lágyék) – hipogasztrium – bal csípőtáj.</p>
      </details>

      <h3>Gyakori hibák</h3>
      <ul>
        <li>❌ <b>A saját jobb oldaladat írod</b> a beteg jobb oldala helyett.</li>
        <li>❌ <b>Proximális–disztális</b> összekeverése.</li>
        <li>❌ <b>Pontatlan helyleírás</b> („a lábán valahol”).</li>
      </ul>

      <div class="doboz jegyezd">
        <b>Jegyezd meg!</b>
        <ul>
          <li>Anatómia = felépítés, élettan = működés; az élettan fő módszere a kísérlet.</li>
          <li>Felépítési elvek: kétoldali részarányosság és szelvényezettség.</li>
          <li>Alaphelyzet: áll, szemből néz, tenyér előre.</li>
          <li>Kraniális–kaudális, anterior–posterior, mediális–laterális, <b>proximális–disztális</b>.</li>
          <li>Jobb/bal: a <b>beteg</b> szerint.</li>
          <li>Máj jobb felső, lép bal felső, féregnyúlvány jobb alsó negyed.</li>
        </ul>
      </div>`,
  });
})();
