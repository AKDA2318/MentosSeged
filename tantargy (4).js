// Speciális szakápolói ismeretek: a menü szerkezete a tankönyv fejezetei szerint (I–XIII.),
// kiegészítve a mentős sérültellátási témákkal.
// Új téma: írd meg a temak/ mappában, és add meg itt a `fajl` mezőt.
'use strict';

Tananyag.tantargy({
  azon: 'szakapolas',
  cim: 'Speciális szakápolói ismeretek',
  ikon: '💉',
  leiras: 'Invazív beavatkozások, vénabiztosítás, folyadék, gyógyszer, fájdalom, légút, oxigén, EKG, ápolás',
  resz: '🚑 Mentős szakmai ismeretek',
  kozos: ['kozos.js'],
  menu: [
    {
      azon: 'invaziv',
      cim: 'I. Invazív beavatkozások',
      ikon: '🧤',
      leiras: 'Biopszia, jog és etika, higiéné, előkészítés, punkciók',
      temak: [
        { azon: 'invaziv-alapok', cim: 'Invazív beavatkozások alapjai', leiras: 'Biopszia, beleegyezés, higiéné, hulladék, előkészítés, labor', fajl: 'temak/invaziv-alapok.js' },
        { azon: 'punkciok', cim: 'Punkciók és csapolások', leiras: 'Mellkascsapolás, mellkasdrén, haspunkció, lumbálpunkció, csontvelő', fajl: 'temak/punkciok.js' },
      ],
    },
    {
      azon: 'vena',
      cim: 'II–IV. Vénabiztosítás, folyadék- és transzfúziós terápia',
      ikon: '💧',
      leiras: 'Perifériás és centrális véna, intraosszeális út, folyadék, vér',
      temak: [
        { azon: 'infuzio', cim: 'Perifériás vénabiztosítás és infúzió', leiras: 'Kanülök, csepp/perc, ml/óra, oldatok', fajl: 'temak/infuzio.js' },
        { azon: 'centralis-io', cim: 'Centrális véna, intraosszeális út, port, artériás punkció', leiras: 'CVK, IO, Port-a-cath, artériás vérgáz' },
        { azon: 'folyadekterapia', cim: 'Folyadékterápia', leiras: 'Homeosztázis, kiszáradás, túltöltés, oldatok, pumpák' },
        { azon: 'transzfuzio', cim: 'Transzfúziós terápia', leiras: 'Vércsoport, készítmények, bedside teszt, reakciók' },
      ],
    },
    {
      azon: 'gyogyszereles',
      cim: 'V. Gyógyszertan és gyógyszerelés',
      ikon: '💊',
      leiras: 'Beadási módok, számolás, sürgősségi szerek',
      temak: [
        { azon: 'gyogyszer-alapok', cim: 'A gyógyszerelés alapjai', leiras: 'Beadási módok, injekciók, szabályok', fajl: 'temak/gyogyszer-alapok.js' },
        { azon: 'gyogyszer-szamitas', cim: 'Gyógyszerelési számítások', leiras: 'mg, ml, %, µg, testsúlyra számolás', fajl: 'temak/gyogyszer-szamitas.js' },
        { azon: 'surgossegi-gyogyszerek', cim: 'Sürgősségi gyógyszerek', fajl: 'temak/surgossegi-gyogyszerek.js' },
      ],
    },
    {
      azon: 'fajdalom-csoport',
      cim: 'VI. Fájdalomcsillapítás',
      ikon: '🩺',
      leiras: 'A fájdalom élettana, felmérése és csillapítása',
      temak: [
        { azon: 'fajdalom', cim: 'Fájdalomcsillapítás ápolói teendői', leiras: 'Skálák, WHO-lépcső, PCA, tapasz, posztoperatív fájdalom' },
      ],
    },
    {
      azon: 'legut-csoport',
      cim: 'VII–VIII. Légútbiztosítás és lélegeztetés',
      ikon: '🫁',
      leiras: 'Eszközös és nehéz légút, tracheostomia, gépi lélegeztetés',
      temak: [
        { azon: 'legut-halado', cim: 'Eszközös légútbiztosítás', leiras: 'Supraglotticus eszköz, intubálás, nehéz légút, tracheostomia' },
        { azon: 'lelegeztetes', cim: 'Gépi lélegeztetés', leiras: 'Módok, beállítások, riasztások, a lélegeztetett beteg ápolása' },
      ],
    },
    {
      azon: 'oxigen-ekg',
      cim: 'VIII. és XII. Oxigén és EKG',
      ikon: '📈',
      leiras: 'Oxigénterápia, EKG, kardiológiai vizsgálatok',
      temak: [
        { azon: 'oxigenterapia', cim: 'Oxigénterápia', leiras: 'Javallatok, eszközök, áramlás, palack', fajl: 'temak/oxigenterapia.js' },
        { azon: 'ekg', cim: 'EKG alapjai és monitorozás', leiras: 'Elvezetések, görbe, ritmusok', fajl: 'temak/ekg.js' },
        { azon: 'ekg-vizsgalatok', cim: 'Kardiológiai vizsgálatok', leiras: 'EKG felvétele, terheléses EKG, echo, ABPM, Holter' },
      ],
    },
    {
      azon: 'alapapolas',
      cim: 'IX–XI. és XIII. Táplálás, katéterezés, decubitus, ápolási terv',
      ikon: '🛏️',
      leiras: 'Táplálás és szondák, katéterezés, nyomási fekély, ápolási folyamat',
      temak: [
        { azon: 'taplalas', cim: 'Táplálás és mesterséges táplálás', leiras: 'Energiaszükséglet, malnutríció, szonda, PEG' },
        { azon: 'kateterezes', cim: 'Katéterezés és inkontinencia', leiras: 'Katétertípusok, női és férfi katéterezés, szövődmények' },
        { azon: 'decubitus', cim: 'Nyomási fekély (decubitus)', leiras: 'Helyek, Norton- és Braden-skála, stádiumok, prevenció' },
        { azon: 'apolasi-terv', cim: 'Ápolási folyamat és ápolási terv', leiras: 'Felmérés, ápolási diagnózis, cél, beavatkozás, értékelés' },
      ],
    },
    {
      azon: 'serultellatas',
      cim: 'Kiegészítés: sokk és sérültellátás',
      ikon: '🩹',
      leiras: 'Mentős gyakorlat: sokk, vérzés, égés, törés, koponya, mellkas',
      temak: [
        { azon: 'sokk', cim: 'Sokk és vérveszteség', fajl: 'temak/sokk.js' },
        { azon: 'verzes-sebellatas', cim: 'Vérzéscsillapítás és sebellátás', fajl: 'temak/verzes-sebellatas.js' },
        { azon: 'egesi-serules', cim: 'Égési sérülés', leiras: '9-es szabály, folyadékpótlás', fajl: 'temak/egesi-serules.js' },
        { azon: 'csonttores', cim: 'Törések, ficamok, rögzítés', fajl: 'temak/csonttores.js' },
        { azon: 'koponya-gerinc', cim: 'Koponya- és gerincsérülés', fajl: 'temak/koponya-gerinc.js' },
        { azon: 'mellkas-has', cim: 'Mellkas- és hasi sérülés', fajl: 'temak/mellkas-has.js' },
      ],
    },
  ],
});
