// Sürgősségi kórképek: a menü szerkezete (témacsoportok és altémák).
// Új téma: írd meg a temak/ mappában, és add meg itt a `fajl` mezőt.
'use strict';

Tananyag.tantargy({
  azon: 'surgosseg',
  cim: 'Sürgősségi kórképek',
  ikon: '🩺',
  leiras: 'Belgyógyászati, ideggyógyászati, gyermek-, szülészeti és környezeti sürgősség',
  resz: '🚑 Mentős szakmai ismeretek',
  menu: [
    {
      azon: 'sziv-legzes',
      cim: 'Szív és légzés',
      ikon: '💓',
      leiras: 'Mellkasi fájdalom, nehézlégzés',
      temak: [
        { azon: 'acs', cim: 'Mellkasi fájdalom, szívinfarktus', fajl: 'temak/acs.js' },
        { azon: 'nehezlegzes', cim: 'Nehézlégzés', leiras: 'Asztma, COPD, tüdőödéma, tüdőembólia', fajl: 'temak/nehezlegzes.js' },
      ],
    },
    {
      azon: 'idegrendszeri',
      cim: 'Idegrendszeri kórképek',
      ikon: '🧠',
      leiras: 'Stroke, görcsroham, ájulás',
      temak: [
        { azon: 'stroke', cim: 'Stroke (agyi érkatasztrófa)', fajl: 'temak/stroke.js' },
        { azon: 'gorcsroham-ajulas', cim: 'Görcsroham és ájulás', fajl: 'temak/gorcsroham-ajulas.js' },
      ],
    },
    {
      azon: 'anyagcsere-allergia',
      cim: 'Cukorbetegség és allergia',
      ikon: '🍬',
      leiras: 'Hipo- és hiperglikémia, anafilaxia',
      temak: [
        { azon: 'cukorbetegseg', cim: 'A cukorbeteg sürgős állapotai', fajl: 'temak/cukorbetegseg.js' },
        { azon: 'anafilaxia', cim: 'Anafilaxia', fajl: 'temak/anafilaxia.js' },
      ],
    },
    {
      azon: 'mergezes-kornyezet',
      cim: 'Mérgezés és környezeti ártalmak',
      ikon: '☠️',
      leiras: 'Mérgezések, kihűlés, hőguta, vízbefulladás, áramütés',
      temak: [
        { azon: 'mergezesek', cim: 'Mérgezések', fajl: 'temak/mergezesek.js' },
        { azon: 'kornyezeti', cim: 'Környezeti ártalmak', leiras: 'Hideg, meleg, víz, áram', fajl: 'temak/kornyezeti.js' },
      ],
    },
    {
      azon: 'szules-gyermek',
      cim: 'Szülészet és gyermek',
      ikon: '👶',
      leiras: 'Sürgős szülés, újszülött, gyermekkori sürgősség',
      temak: [
        { azon: 'szules', cim: 'Sürgős szülés és újszülöttellátás', fajl: 'temak/szules.js' },
        { azon: 'gyermek-surgosseg', cim: 'Gyermekkori sürgős állapotok', fajl: 'temak/gyermek-surgosseg.js' },
      ],
    },
    {
      azon: 'pszichiatria-csoport',
      cim: 'Pszichiátriai sürgősség',
      ikon: '🧩',
      leiras: 'Zavart, agresszív, öngyilkossági veszélyben lévő beteg',
      temak: [{ azon: 'pszichiatria', cim: 'Pszichiátriai sürgős helyzetek', fajl: 'temak/pszichiatria.js' }],
    },
  ],
});
