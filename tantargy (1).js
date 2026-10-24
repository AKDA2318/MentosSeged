// Mentőápolói alapismeretek: a menü szerkezete (témacsoportok és altémák).
// Új téma: írd meg a temak/ mappában, és add meg itt a `fajl` mezőt.
'use strict';

Tananyag.tantargy({
  azon: 'mentoapolas',
  cim: 'Mentőápolói alapok',
  ikon: '🚑',
  leiras: 'Betegvizsgálat, újraélesztés, mentési alapok (Mentőápolói ABC témakörei)',
  resz: '🚑 Mentős szakmai ismeretek',
  reszLeiras: 'Betegvizsgálat, újraélesztés, gyógyszerelés, sérültellátás és sürgősségi kórképek – a helyszíni munka tudása.',
  menu: [
    {
      azon: 'betegvizsgalat',
      cim: 'Betegvizsgálat',
      ikon: '🩺',
      leiras: 'Vitális paraméterek, ABCDE, tudat, kikérdezés',
      temak: [
        { azon: 'vitalis-parameterek', cim: 'Vitális paraméterek', leiras: 'Pulzus, légzés, vérnyomás, SpO₂, testhő, vércukor', fajl: 'temak/vitalis-parameterek.js' },
        { azon: 'abcde', cim: 'ABCDE-szemlélet', leiras: 'A betegvizsgálat sorrendje', fajl: 'temak/abcde.js' },
        { azon: 'tudatallapot', cim: 'Tudatállapot', leiras: 'AVPU, Glasgow Kóma Skála, pupilla', fajl: 'temak/tudatallapot.js' },
        { azon: 'anamnezis', cim: 'Kikérdezés és másodlagos vizsgálat', leiras: 'SAMPLE, OPQRST, tetőtől talpig', fajl: 'temak/anamnezis.js' },
      ],
    },
    {
      azon: 'ujraelesztes',
      cim: 'Újraélesztés',
      ikon: '❤️‍🩹',
      leiras: 'BLS, AED, ALS, gyermek, légút',
      temak: [
        { azon: 'bls', cim: 'Felnőtt alapszintű újraélesztés és AED', fajl: 'temak/bls.js' },
        { azon: 'als', cim: 'Emelt szintű újraélesztés (ALS)', leiras: 'Ritmusok, defibrillálás, gyógyszerek, 4H–4T', fajl: 'temak/als.js' },
        { azon: 'gyermek-ujraelesztes', cim: 'Gyermek- és csecsemő-újraélesztés', fajl: 'temak/gyermek-ujraelesztes.js' },
        { azon: 'legutbiztositas', cim: 'Légút, idegen test, stabil oldalfekvés', fajl: 'temak/legutbiztositas.js' },
      ],
    },
    {
      azon: 'mentesi-alapok',
      cim: 'Mentési alapok',
      ikon: '🚨',
      leiras: 'Helyszín, triázs, betegmozgatás, jog, higiéné',
      temak: [
        { azon: 'helyszin-triage', cim: 'Helyszín, biztonság, tömeges baleset', leiras: 'Helyszínfelmérés, START-triázs', fajl: 'temak/helyszin-triage.js' },
        { azon: 'betegmozgatas', cim: 'Betegmozgatás és fektetési módok', fajl: 'temak/betegmozgatas.js' },
        { azon: 'mentesi-rendszer', cim: 'Mentésirányítás, jog, dokumentáció', fajl: 'temak/mentesi-rendszer.js' },
        { azon: 'higiene', cim: 'Higiéné és fertőzésvédelem', fajl: 'temak/higiene.js' },
      ],
    },
  ],
});
