// Anatómia és élettan: a menü szerkezete a Donáth Tibor: Anatómia–élettan tankönyv fejezetei (I–X.) szerint.
// Új téma: írd meg a temak/ mappában, és add meg itt a `fajl` mezőt.
// `fajl` nélküli altéma „Hamarosan” jelzéssel jelenik meg.
'use strict';

Tananyag.tantargy({
  azon: 'anatomia',
  cim: 'Anatómia és élettan',
  ikon: '🫀',
  leiras: 'Hogyan épül fel és hogyan működik a test (Donáth Tibor: Anatómia–élettan témakörei)',
  resz: '🫀 Anatómia és élettan',
  kifejtve: true,
  reszLeiras: 'Külön rész a test felépítéséről és működéséről – szervrendszerenként, minden alrésszel.',
  menu: [
    {
      azon: 'alapfogalmak',
      cim: 'I–III. Alapfogalmak, sejt, fejlődés',
      ikon: '🧍',
      leiras: 'Irányok, síkok, sejt és szövet, egyedfejlődés',
      temak: [
        { azon: 'testtajak-iranyok', cim: 'Testtájak, irányok, síkok', fajl: 'temak/testtajak-iranyok.js' },
        { azon: 'sejt-szovet', cim: 'Sejt, szövetek, homeosztázis', fajl: 'temak/sejt-szovet.js' },
        { azon: 'egyedfejlodes', cim: 'Fajfejlődés és egyedfejlődés', leiras: 'Ivarsejtek, megtermékenyítés, csíralemezek, magzati fejlődés', fajl: 'temak/egyedfejlodes.js' },
      ],
    },
    {
      azon: 'mozgasrendszer',
      cim: 'IV. Mozgásrendszer',
      ikon: '🦴',
      leiras: 'Csontok, ízületek, izmok',
      temak: [
        { azon: 'csontvaz', cim: 'Csontváz és ízületek', fajl: 'temak/csontvaz.js' },
        { azon: 'koponya-gerincoszlop', cim: 'Koponya, gerincoszlop, mellkas', leiras: 'A központi idegrendszer és a mellkasi szervek csontos védelme', fajl: 'temak/koponya-gerincoszlop.js' },
        { azon: 'izmok', cim: 'Izomrendszer', fajl: 'temak/izmok.js' },
      ],
    },
    {
      azon: 'keringes',
      cim: 'V. Keringés, vér, nyirokrendszer',
      ikon: '🫀',
      leiras: 'Szív, erek, vérnyomás, vér, nyirokrendszer és védekezés',
      temak: [
        { azon: 'sziv', cim: 'A szív', leiras: 'Üregek, billentyűk, vérkörök', fajl: 'temak/sziv.js' },
        { azon: 'ingerulet', cim: 'A szív ingerületvezetése', leiras: 'Szinuszcsomó, AV-csomó, az EKG élettana', fajl: 'temak/ingerulet.js' },
        { azon: 'erek-vernyomas', cim: 'Erek és vérnyomás', leiras: 'Két vérkör, pulzus, vérnyomás', fajl: 'temak/erek-vernyomas.js' },
        { azon: 'ver', cim: 'A vér', leiras: 'Alkotók, vércsoportok, véralvadás', fajl: 'temak/ver.js' },
        { azon: 'nyirok-immun', cim: 'Nyirokrendszer és immunrendszer', leiras: 'Nyirokerek, nyirokcsomók, lép, védekezés', fajl: 'temak/nyirok-immun.js' },
      ],
    },
    {
      azon: 'emesztes-kivalasztas',
      cim: 'VI. Emésztés és anyagcsere',
      ikon: '🍽️',
      leiras: 'Tápcsatorna, máj, hasnyálmirigy, tápanyagok, vitaminok, energiaforgalom',
      temak: [
        { azon: 'emesztes', cim: 'Emésztőrendszer', fajl: 'temak/emesztes.js' },
        { azon: 'anyagcsere', cim: 'Tápanyagok, vitaminok, anyagcsere', leiras: 'Fehérjék, szénhidrátok, zsírok, vitaminok, enzimek, energiaforgalom', fajl: 'temak/anyagcsere.js' },
      ],
    },
    {
      azon: 'legzes',
      cim: 'VI. Légzőrendszer',
      ikon: '🫁',
      leiras: 'Légutak, tüdő, a légzés élettana, gázcsere',
      temak: [
        { azon: 'legzorendszer', cim: 'A légzőrendszer', fajl: 'temak/legzorendszer.js' },
        { azon: 'gazcsere', cim: 'Gázcsere és sav-bázis egyensúly', leiras: 'Oxigén, szén-dioxid, pH, vérgáz', fajl: 'temak/gazcsere.js' },
      ],
    },
    {
      azon: 'kivalasztas',
      cim: 'VI. Húgyszervek',
      ikon: '💧',
      leiras: 'Vese, vizeletelvezetés, folyadékháztartás',
      temak: [{ azon: 'vese-folyadek', cim: 'Vese és folyadékháztartás', fajl: 'temak/vese-folyadek.js' }],
    },
    {
      azon: 'szaporodas-csoport',
      cim: 'VI. Nemi szervek és szaporodás',
      ikon: '🤰',
      leiras: 'Nemi szervek, terhesség, szülés élettana',
      temak: [{ azon: 'szaporodas', cim: 'Szaporodás és terhesség', fajl: 'temak/szaporodas.js' }],
    },
    {
      azon: 'szabalyozas',
      cim: 'VII. Belső elválasztású mirigyek',
      ikon: '⚖️',
      leiras: 'Hormonok, hipofízis, pajzsmirigy, mellékvese, vércukor',
      temak: [{ azon: 'endokrin', cim: 'Belső elválasztású mirigyek', fajl: 'temak/endokrin.js' }],
    },
    {
      azon: 'idegrendszer-csoport',
      cim: 'IX. Idegrendszer',
      ikon: '🧠',
      leiras: 'Idegélettan, agy, gerincvelő, agyidegek, vegetatív idegrendszer',
      temak: [
        { azon: 'idegelettan', cim: 'Idegélettan és vegetatív idegrendszer', leiras: 'Membránpotenciál, szinapszis, reflexek, agyidegek, szimpatikus és paraszimpatikus rendszer', fajl: 'temak/idegelettan.js' },
        { azon: 'idegrendszer', cim: 'Az agy és az idegrendszer', fajl: 'temak/idegrendszer.js' },
        { azon: 'gerincvelo-idegek', cim: 'Gerincvelő és környéki idegek', leiras: 'Pályák, dermatomok, reflexek, idegsérülés', fajl: 'temak/gerincvelo-idegek.js' },
      ],
    },
    {
      azon: 'erzekszervek-csoport',
      cim: 'VIII. és X. Hőszabályozás, érzékszervek, bőr',
      ikon: '👁️',
      leiras: 'Szem, fül, szaglás, ízlelés, bőr, hőszabályozás',
      temak: [
        { azon: 'erzekszervek', cim: 'Érzékszervek', leiras: 'Szem, pupilla, fül, szaglás, ízlelés', fajl: 'temak/erzekszervek.js' },
        { azon: 'bor-hoszabalyozas', cim: 'Bőr és hőszabályozás', fajl: 'temak/bor-hoszabalyozas.js' },
      ],
    },
  ],
});
