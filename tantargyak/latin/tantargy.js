// Orvosi latin: a menü szerkezete (témacsoportok és altémák).
// A kozos.js a témák közös segédfüggvényeit tartalmazza (a keret a témák előtt tölti be).
'use strict';

Tananyag.tantargy({
  azon: 'latin',
  cim: 'Orvosi latin',
  ikon: '🏛️',
  leiras: 'Kiejtés, anatómiai nevek, szakszóképzés, diagnózisok, vények és dokumentáció',
  resz: '🏛️ Orvosi latin',
  kifejtve: true,
  reszLeiras:
    'A mentődokumentáció, a kórházi átadás és a gyógyszerelés nyelve. Nem kell latinul beszélned – de értened és helyesen leírnod kell, amit a kollégák írnak és mondanak.',
  kozos: ['kozos.js'],
  menu: [
    {
      azon: 'latin-alapok',
      cim: 'Latin alapok',
      ikon: '📜',
      leiras: 'Kiejtés, főnevek, melléknevek',
      temak: [
        { azon: 'kiejtes', cim: 'Kiejtés és írásmód', leiras: 'Hogyan olvasd ki és hogyan írd le a latin szavakat', fajl: 'temak/kiejtes.js' },
        { azon: 'fonevek', cim: 'Főnevek: nem, szám, birtokos eset', leiras: 'Szótári alak, ragozási csoportok, „a borda törése”', fajl: 'temak/fonevek.js' },
        { azon: 'melleknevek', cim: 'Melléknevek és egyeztetés', leiras: 'dexter–sinister, major–minor, acutus–chronicus', fajl: 'temak/melleknevek.js' },
      ],
    },
    {
      azon: 'anatomiai-nevek',
      cim: 'Anatómiai nevek',
      ikon: '🦴',
      leiras: 'Testrészek, szervek, csontok, irányok',
      temak: [
        { azon: 'testreszek', cim: 'Testrészek és szervek', leiras: 'caput, collum, thorax, cor, pulmo, hepar…', fajl: 'temak/testreszek.js' },
        { azon: 'csontok-izmok', cim: 'Csontok, ízületek, izmok', leiras: 'femur, radius, articulatio genus, musculus deltoideus', fajl: 'temak/csontok-izmok.js' },
        { azon: 'iranyok-tajak', cim: 'Irányok, mozgások, testtájak', leiras: 'proximalis–distalis, flexio, regio inguinalis', fajl: 'temak/iranyok-tajak.js' },
      ],
    },
    {
      azon: 'klinikai-szavak',
      cim: 'Klinikai szakszavak',
      ikon: '🩺',
      leiras: 'Előtagok, utótagok, diagnózisok',
      temak: [
        { azon: 'elotagok', cim: 'Előtagok és szótövek', leiras: 'hypo-, hyper-, tachy-, cardi-, nephr-, haem-', fajl: 'temak/elotagok.js' },
        { azon: 'utotagok', cim: 'Utótagok és összetett szavak', leiras: '-itis, -osis, -ectomia, -aemia, -plegia', fajl: 'temak/utotagok.js' },
        { azon: 'diagnozisok', cim: 'Diagnózisok és sérülések', leiras: 'commotio cerebri, vulnus scissum, infarctus myocardii', fajl: 'temak/diagnozisok.js' },
      ],
    },
    {
      azon: 'gyogyszer-dokumentacio',
      cim: 'Vény és dokumentáció',
      ikon: '📝',
      leiras: 'Gyógyszerformák, rövidítések, kórlap',
      temak: [
        { azon: 'veny-rovidites', cim: 'Gyógyszerformák, beadás, vény', leiras: 'tabl., amp., i.v., s.c., p.r.n., római számok', fajl: 'temak/veny-rovidites.js' },
        { azon: 'dokumentacio', cim: 'Dokumentáció, tünetek, halál jelei', leiras: 'anamnesis, status praesens, lege artis, livores mortis', fajl: 'temak/dokumentacio.js' },
      ],
    },
  ],
});
