// Komplex esetgyakorlatok: egymásra épülő, többlépéses esetek (helyszín → felmérés → ellátás → szállítás → átadás).
// Minden téma 8 esetet tartalmaz, esetenként 8 lépéssel. A vizsgákba egész esetként kerülnek (esetek: true).
'use strict';

Tananyag.tantargy({
  azon: 'esetek',
  cim: 'Komplex esetgyakorlatok',
  ikon: '🧩',
  leiras: 'Teljes esetek lépésről lépésre, változó vitális paraméterekkel',
  resz: '🧩 Komplex esetgyakorlatok',
  kifejtve: true,
  esetek: true,
  reszLeiras:
    'Itt nem egy-egy szabályt kérdezünk, hanem végigviszel egy teljes esetet: a helyszíntől az átadásig. Minden lépésnél új információt kapsz, és a monitoron látod, hogyan változik a beteg állapota.',
  kozos: ['kozos.js'],
  menu: [
    { azon: 'trauma-csoport', cim: 'Traumatológia', ikon: '🩹', leiras: 'Vérzés, törések, mellkas- és fejsérülés, égés, polytrauma', temak: [{ azon: 'trauma', cim: 'Traumatológiai esetek', fajl: 'temak/trauma.js' }] },
    { azon: 'keringes-csoport', cim: 'Szív és keringés', ikon: '🫀', leiras: 'ACS, ritmuszavar, tüdőödéma, embólia, disszekció', temak: [{ azon: 'keringes', cim: 'Kardiológiai és keringési esetek', fajl: 'temak/keringes.js' }] },
    { azon: 'legzes-csoport', cim: 'Légzés és allergia', ikon: '🫁', leiras: 'Asztma, COPD, idegen test, anafilaxia, szepszis, CO', temak: [{ azon: 'legzes', cim: 'Légzési és allergiás esetek', fajl: 'temak/legzes.js' }] },
    { azon: 'neuro-csoport', cim: 'Neurológia, anyagcsere, mérgezés', ikon: '🧠', leiras: 'Hipoglikémia, stroke, görcs, DKA, opioid, SAH', temak: [{ azon: 'neuro', cim: 'Neurológiai, anyagcsere- és mérgezéses esetek', fajl: 'temak/neuro.js' }] },
    { azon: 'gyermek-csoport', cim: 'Gyermek és szülészet', ikon: '🧸', leiras: 'Lázgörcs, croup, félrenyelés, szülés, vérzés', temak: [{ azon: 'gyermek-szules', cim: 'Gyermek- és szülészeti esetek', fajl: 'temak/gyermek-szules.js' }] },
    { azon: 'ujraelesztes-csoport', cim: 'Újraélesztés', ikon: '⚡', leiras: 'BLS, ALS, ROSC utáni ellátás, különleges helyzetek', temak: [{ azon: 'ujraelesztes', cim: 'Újraélesztési esetek', fajl: 'temak/ujraelesztes.js' }] },
  ],
});
