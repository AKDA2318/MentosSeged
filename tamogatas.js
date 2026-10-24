// Támogatás oldal (#/tamogatas): a program ingyenes; aki szeretné, önkéntesen támogathatja a fejlesztést.
'use strict';

const TAMOGATAS_LINK = 'https://revolut.me/akda';
// QR-kód a fenti hivatkozásra (ellenőrizve: beolvasva a revolut.me/akda címet adja).
const TAMOGATAS_QR = `<svg viewBox="0 0 29 29" class="qr-kod"><title>QR-kód: revolut.me/akda</title><path fill="#fff" d="M0 0h29v29h-29z"/><path class="qrline" stroke="#000" d="M2 2.5h7m1 0h1m1 0h1m1 0h3m3 0h7m-25 1h1m5 0h1m2 0h1m2 0h1m1 0h1m1 0h1m1 0h1m5 0h1m-25 1h1m1 0h3m1 0h1m1 0h1m1 0h2m1 0h1m1 0h1m2 0h1m1 0h3m1 0h1m-25 1h1m1 0h3m1 0h1m2 0h1m1 0h1m1 0h1m1 0h1m2 0h1m1 0h3m1 0h1m-25 1h1m1 0h3m1 0h1m3 0h3m1 0h1m3 0h1m1 0h3m1 0h1m-25 1h1m5 0h1m1 0h3m1 0h3m3 0h1m5 0h1m-25 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-16 1h4m1 0h3m-17 1h1m1 0h1m3 0h2m1 0h2m1 0h1m3 0h1m2 0h1m2 0h1m1 0h1m-24 1h1m2 0h2m3 0h1m5 0h1m2 0h2m1 0h1m1 0h2m-25 1h2m1 0h2m1 0h1m1 0h3m1 0h5m1 0h2m1 0h2m1 0h1m-23 1h1m5 0h4m2 0h1m1 0h2m3 0h1m-21 1h1m1 0h1m2 0h1m1 0h1m2 0h1m3 0h1m2 0h1m5 0h1m-22 1h3m3 0h1m3 0h1m1 0h5m3 0h2m-25 1h4m1 0h4m1 0h2m2 0h2m2 0h1m2 0h2m1 0h1m-17 1h1m5 0h1m1 0h1m1 0h4m-22 1h2m3 0h3m2 0h3m2 0h6m2 0h1m-16 1h2m2 0h1m2 0h2m3 0h1m3 0h1m-25 1h7m1 0h1m3 0h2m2 0h1m1 0h1m1 0h1m3 0h1m-25 1h1m5 0h1m2 0h4m2 0h2m3 0h1m2 0h2m-25 1h1m1 0h3m1 0h1m2 0h1m2 0h1m2 0h6m3 0h1m-25 1h1m1 0h3m1 0h1m2 0h1m7 0h1m2 0h1m1 0h2m-24 1h1m1 0h3m1 0h1m1 0h2m1 0h4m2 0h1m1 0h3m1 0h2m-25 1h1m5 0h1m3 0h1m3 0h1m1 0h5m-21 1h7m1 0h2m1 0h4m1 0h1m4 0h1m2 0h1"/></svg>`;

function tamogatasOldal() {
  cimBeallit('Támogatás');
  tartalom.innerHTML = `<a class="vissza" href="#/">← Kezdőlap</a>
    <h2>💛 Támogatás</h2>
    <p class="tamogatas-vezeto">A Mentős Oktató ingyenes, és az is marad.</p>
    <p>Nem tervezem pénzzé tenni a programot: nincs benne reklám, előfizetés vagy fizetős tartalom.
      Bárki szabadon és ingyen használhatja, legyen tanuló, oktató vagy iskola.</p>
    <p>Az elkészítése viszont nagyon sok munkaórát vett igénybe, és a munka most is folyik: új témák, ábrák
      és feladatok készülnek, az oktatói visszajelzéseket pedig folyamatosan átvezetem.</p>
    <p>Ha hasznosnak találod, és szeretnéd, támogass egy általad választott összeggel.
      Bármekkora támogatásnak örülök. Ha nem tudsz vagy nem szeretnél, az is teljesen rendben van:
      a gyakorló mindenkinek ugyanúgy elérhető marad.</p>

    <section class="tamogatas-kartya" aria-labelledby="tamogatas-revolut">
      <div class="tamogatas-qr">${TAMOGATAS_QR}</div>
      <div class="tamogatas-szoveg">
        <h3 id="tamogatas-revolut">Támogatás Revoluton</h3>
        <p>Ha szeretnél, itt tudsz támogatni:</p>
        <p><a class="gomb" href="${TAMOGATAS_LINK}" target="_blank" rel="noopener">revolut.me/akda</a>
          <button type="button" class="gomb masodlagos" id="tamogatas-masol">Hivatkozás másolása</button></p>
        <p class="kerekites">Telefonnal be is olvashatod a kódot. Akkor is tudsz támogatni,
          ha nem használsz Revolutot.</p>
      </div>
    </section>

    <p class="kerekites">A támogatás önkéntes ajándék, nem vásárlás: érte nem jár külön tartalom vagy szolgáltatás.</p>
    <p class="tamogatas-koszonet">Köszönöm, hogy támogatod a munkámat! 💛</p>`;

  const gomb = $('#tamogatas-masol');
  gomb.addEventListener('click', () => {
    const kesz = () => (gomb.textContent = 'Kimásolva ✓');
    const tartalek = () => {
      // Ha a vágólap nem érhető el, a hivatkozás szövegét kijelöljük, így kézzel másolható.
      const t = $('.tamogatas-szoveg .gomb:not(.masodlagos)');
      const r = document.createRange();
      r.selectNodeContents(t);
      const s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
      gomb.textContent = 'Kijelölve – másold ki';
    };
    try {
      navigator.clipboard.writeText(TAMOGATAS_LINK).then(kesz, tartalek);
    } catch {
      tartalek();
    }
  });
}
