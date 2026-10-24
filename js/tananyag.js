// Tantárgyak és témák nyilvántartása, valamint a témafájlok betöltése.
//
// Egy tantárgy = egy mappa a tantargyak/ alatt, benne egy tantargy.js, amely
// a Tananyag.tantargy({...}) hívással leírja a menüt. A menü azon altémáinál,
// amelyeknek van `fajl` mezője, a keret betölti a fájlt; a témafájl a
// Tananyag.tema('<tantárgy>', {...}) hívással regisztrálja magát.
// Altéma `fajl` nélkül, vagy ha a megadott fájl (még) nincs feltöltve, illetve nem tölthető be,
// „Hamarosan” jelzéssel, nem kattinthatóan jelenik meg – így a tananyag fájlonként, fokozatosan bővíthető.
'use strict';

// Részleges kiadás (pl. demo-anatomia/) – a kiadásfájl (js/kiadas.js) állítja be:
//   window.MENTOS_CSAK = ['anatomia']                      csak ezek a tantárgyak érhetők el;
//   window.MENTOS_CSOPORTOK = { anatomia: ['alapfogalmak'] } egy tantárgyon belül csak ezek a témacsoportok;
//   window.MENTOS_VIZSGA = ['tema', 'csoport']              csak ezek a vizsgafajták érhetők el
//     ('tema' = témazáró, 'csoport' = témakör-vizsga, 'tantargy' = tantárgyi vizsga, 'komplex'; false = egyik sem).
// Ami nem érhető el, „Hamarosan” jelzéssel, nem kattinthatóan látszik, és a témafájljai nem töltődnek be.

const Tananyag = {
  tantargyak: [],

  tantargy(adatok) {
    // A témafájlok útvonala a tantargy.js mappájához képest értendő. Ha a böngésző nem adja meg
    // a betöltő szkript címét (régebbi böngésző), a szokásos mappát vesszük.
    const src = document.currentScript && document.currentScript.src;
    const alap = src ? new URL('.', src).href : `tantargyak/${adatok.azon}/`;
    // Részleges kiadásban a többi tantárgy csak „Hamarosan” kártyaként látszik.
    const hamarosan = Array.isArray(window.MENTOS_CSAK) && !window.MENTOS_CSAK.includes(adatok.azon);
    // A nem elérhető témacsoportok témái fájl nélkül maradnak, így „Hamarosan” jelzéssel jelennek meg.
    const csoportok = window.MENTOS_CSOPORTOK && window.MENTOS_CSOPORTOK[adatok.azon];
    const menu = csoportok
      ? adatok.menu.map((c) => (csoportok.includes(c.azon) ? c : { ...c, hamarosan: true, temak: c.temak.map(({ fajl, ...t }) => t) }))
      : adatok.menu;
    this.tantargyak.push({ ...adatok, menu, alap, temak: {}, hamarosan });
  },

  // Igaz, ha minden tantárgy elérhető (nem részleges kiadás).
  teljes() {
    return this.tantargyak.every((t) => !t.hamarosan);
  },

  // Igaz, ha a kiadásban elérhető az adott vizsgafajta ('tema', 'csoport', 'tantargy', 'komplex');
  // fajta nélkül: ha bármelyik vizsga elérhető.
  vizsgaElerheto(fajta) {
    const v = window.MENTOS_VIZSGA;
    if (v === false) return false;
    if (!Array.isArray(v)) return true;
    return fajta ? v.includes(fajta) : v.length > 0;
  },

  tema(tantargyAzon, tema) {
    const tantargy = this.tantargyak.find((t) => t.azon === tantargyAzon);
    if (!tantargy) throw new Error(`Ismeretlen tantárgy: ${tantargyAzon}`);
    // A cím a menüből jön, így csak egy helyen kell karbantartani.
    const bejegyzes = tantargy.menu.flatMap((c) => c.temak).find((t) => t.azon === tema.azon);
    // Tört alakú válasznál a számértéket is kitöltjük (statisztikához, ellenőrzéshez).
    // A feladatok nehézség szerint sorba kerülnek (stabil rendezés), így egy téma később bővíthető
    // újabb könnyű/közepes/nehéz blokkokkal a fájl végén is.
    const feladatok = tema.feladatok
      .map((f) => (f.tort && f.valasz == null ? { ...f, valasz: f.tort[0] / f.tort[1] } : f))
      .sort((x, y) => (x.szint || 0) - (y.szint || 0));
    tantargy.temak[tema.azon] = { ...bejegyzes, ...tema, feladatok };
  },

  // Nehézségi szintet rendel egy feladatlistához (1 = könnyű, 2 = közepes, 3 = nehéz).
  szint(szint, feladatok) {
    return feladatok.map((f) => ({ ...f, szint }));
  },

  // Szakmai feladatokat jelöl meg (pl. SZAKMAK.ACS, lásd tantargyak/szakmak.js); a feladatkártyán címkeként jelenik meg.
  szakma(szakma, feladatok) {
    return feladatok.map((f) => ({ ...f, szakma }));
  },

  // Az összes tantárgy témafájljait betölti: párhuzamosan töltődnek le, de sorrendben futnak le
  // (előbb a tantárgy közös segédfájljai, utána a témák). Egy hibás fájl nem állítja meg a többit.
  // `jelez(kesz, osszes)` a haladásról értesít.
  betolt(jelez = () => {}) {
    const cimek = this.tantargyak.filter((t) => !t.hamarosan).flatMap((t) =>
      [...(t.kozos || []), ...t.menu.flatMap((c) => c.temak).map((x) => x.fajl)].filter(Boolean).map((f) => t.alap + f),
    );
    let kesz = 0;
    jelez(kesz, cimek.length);
    return Promise.all(
      cimek.map((src) =>
        szkriptBetoltes(src)
          // Hiányzó (még fel nem töltött) vagy hibás témafájl: a téma „Hamarosan” jelzéssel jelenik meg.
          .catch(() => console.info(`Nincs betöltve (a téma „Hamarosan” jelzéssel látszik): ${src}`))
          .then(() => jelez(++kesz, cimek.length)),
      ),
    );
  },
};

function szkriptBetoltes(src) {
  return new Promise((kesz, hiba) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = false; // a letöltés párhuzamos, a futtatás a beillesztés sorrendjében történik
    s.onload = kesz;
    s.onerror = hiba;
    // Ha egy fájl sosem válaszol, ne akadjon meg miatta az egész oldal.
    setTimeout(hiba, 30000);
    document.head.appendChild(s);
  });
}
