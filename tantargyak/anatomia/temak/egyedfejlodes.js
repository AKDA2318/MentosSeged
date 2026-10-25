// Téma: Fajfejlődés és egyedfejlődés (filogenezis, ontogenezis, ivarsejtek, megtermékenyítés,
// az embrió fejlődése, csíralemezek, magzatburkok, méhlepény, magzati vérkeringés)
'use strict';

(() => {
  const kartya = (ikon, cim, szoveg = '') =>
    `<div class="nagy-kartya"><div class="nagy-ikon">${ikon}</div><div class="nagy-cim">${cim}</div>${szoveg ? `<p>${szoveg}</p>` : ''}</div>`;

  // ---- 1. ábra: a korai fejlődés szakaszai ----
  const SZAKASZ = [
    ['zigóta', '1 sejt'],
    ['barázdálódás', '2, 4, 8… sejt'],
    ['szedercsíra', 'tömör halmaz'],
    ['hólyagcsíra', 'üreges gömb'],
    ['bélcsíra', 'két sejtréteg'],
  ];
  function fejlodes(kiemel = -1) {
    const cy = 50;
    const panel = (i) => {
      const cx = 46 + i * 92;
      let b = '';
      if (i === 0) b = `<circle cx="${cx}" cy="${cy}" r="24" class="kitolt-a"/><circle cx="${cx}" cy="${cy}" r="6" class="pont"/>`;
      if (i === 1)
        b = `<circle cx="${cx}" cy="${cy}" r="24" class="oldal"/>` +
          [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, c]) => `<circle cx="${cx + a * 10.5}" cy="${cy + c * 10.5}" r="10" class="kitolt-a"/>`).join('');
      if (i === 2)
        b = `<circle cx="${cx}" cy="${cy}" r="24" class="oldal"/>` +
          [[-12, -12], [0, -14], [12, -12], [-14, 0], [0, 0], [14, 0], [-12, 12], [0, 14], [12, 12]]
            .map(([a, c]) => `<circle cx="${cx + a}" cy="${cy + c}" r="7" class="kitolt-a"/>`).join('');
      if (i === 3)
        b = `<circle cx="${cx}" cy="${cy}" r="26" class="oldal"/>` +
          Array.from({ length: 14 }, (_, k) => {
            const s = (k / 14) * 2 * Math.PI;
            return `<circle cx="${(cx + Math.cos(s) * 20).toFixed(1)}" cy="${(cy + Math.sin(s) * 20).toFixed(1)}" r="5" class="kitolt-a"/>`;
          }).join('');
      if (i === 4)
        b = `<path d="M${cx - 24} ${cy - 14} A24 24 0 1 0 ${cx + 24} ${cy - 14} L${cx + 11} ${cy - 14} A13 13 0 1 1 ${cx - 11} ${cy - 14} Z" class="kitolt-b"/>` +
          `<path d="M${cx - 24} ${cy - 14} A24 24 0 1 0 ${cx + 24} ${cy - 14}" class="oldal kek"/>` +
          `<path d="M${cx + 11} ${cy - 14} A13 13 0 1 1 ${cx - 11} ${cy - 14}" class="oldal piros"/>`;
      const hal = kiemel >= 0 && kiemel !== i ? ' opacity="0.35"' : '';
      const keret = kiemel === i ? `<rect x="${cx - 44}" y="8" width="88" height="114" rx="8" fill="none" class="kiemelt"/>` : '';
      const nyil = i < 4 ? Rajz.szoveg(cx + 46, cy, '→') : '';
      return `${keret}<g${hal}>${b}${Rajz.szoveg(cx, 96, SZAKASZ[i][0], 'kicsi')}${Rajz.szoveg(cx, 112, SZAKASZ[i][1], 'kicsi halvany-szoveg')}</g>${nyil}`;
    };
    return Rajz.svg(460, 130, [0, 1, 2, 3, 4].map(panel).join(''), 'A korai embrionális fejlődés szakaszai', 'szeles');
  }

  // ---- 2. ábra: a három csíralemez és származékaik ----
  function lemezek(kiemel = '') {
    const r = (k, y, o, nev, leiras) =>
      `<rect x="20" y="${y}" width="110" height="50" class="${o}${kiemel === k ? ' kiemelt' : ''}"${kiemel && kiemel !== k ? ' opacity="0.35"' : ''}/>` +
      Rajz.szoveg(140, y + 18, nev, 'kicsi', 'start') +
      Rajz.szoveg(140, y + 35, leiras, 'kicsi halvany-szoveg', 'start');
    return Rajz.svg(
      400,
      190,
      r('ekto', 20, 'kitolt-b', 'külső csíralemez (ectoderma)', 'bőr, haj, köröm, idegrendszer') +
        r('mezo', 70, 'kitolt-piros-r', 'középső csíralemez (mesoderma)', 'csont, izom, kötőszövet, szív, erek') +
        r('ento', 120, 'kitolt-sarga-r', 'belső csíralemez (entoderma)', 'bélhám, légcső, máj') +
        '<rect x="20" y="20" width="110" height="150" class="oldal"/>',
      'A három csíralemez és származékaik',
      'szeles',
    );
  }

  // ---- 3. ábra: a magzati vérkeringés vázlata ----
  function magzati(kiemel = '') {
    const c = (k, alap) => `${alap}${kiemel === k ? ' kiemelt' : kiemel ? ' halvany' : ''}`;
    // Minden érszakasz végén nyílhegy mutatja az áramlás irányát.
    const ut = (k, d, o) => `<path d="${d}" class="${c(k, 'ut ' + o)}" marker-end="url(#nyilhegy-${o})"/>`;
    const defs = `<defs>${['szen', 'oxi']
      .map((o) => `<marker id="nyilhegy-${o}" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="nyilhegy ${o}"/></marker>`)
      .join('')}</defs>`;
    return Rajz.svg(
      360,
      300,
      defs +
      '<rect x="120" y="90" width="60" height="42" class="szerv"/><rect x="180" y="90" width="60" height="42" class="szerv"/>' +
        '<rect x="120" y="132" width="60" height="50" class="szerv"/><rect x="180" y="132" width="60" height="50" class="szerv"/>' +
        Rajz.szoveg(150, 111, 'JP', 'kicsi') + Rajz.szoveg(210, 111, 'BP', 'kicsi') + Rajz.szoveg(150, 157, 'JK', 'kicsi') + Rajz.szoveg(210, 157, 'BK', 'kicsi') +
        '<rect x="20" y="150" width="80" height="30" rx="8" class="szerv szerv-maj"/>' + Rajz.szoveg(60, 165, 'máj', 'kicsi') +
        '<ellipse cx="60" cy="268" rx="42" ry="16" class="kitolt-a"/>' + Rajz.szoveg(60, 292, 'méhlepény', 'kicsi') +
        '<rect x="150" y="226" width="80" height="24" rx="8" class="szerv halvany"/>' + Rajz.szoveg(190, 238, 'tüdő', 'kicsi') +
        ut('koldokvena', 'M60 252 V180', 'oxi') +
        ut('alsovena', 'M60 150 V112 H120', 'oxi') +
        ut('felsovena', 'M135 30 V90', 'szen') +
        ut('tudoarteria', 'M150 182 V205 H200', 'szen') +
        '<path d="M190 205 V224" class="ut szen halvany" marker-end="url(#nyilhegy-szen)"/>' +
        ut('botalli', 'M200 205 H300', 'szen') +
        ut('aorta', 'M240 157 H265 V45 H300 V205', 'oxi') +
        ut('koldokarteria', 'M300 205 V270 H102', 'szen') +
        `<circle cx="180" cy="111" r="8" class="${kiemel === 'ovalis' ? 'jelolo-kor' : kiemel ? 'oxi halvany' : 'oxi'}"/>` +
        Rajz.szoveg(135, 20, 'felső üres véna', 'kicsi') +
        Rajz.szoveg(8, 100, 'alsó üres véna', 'kicsi', 'start') +
        Rajz.szoveg(68, 222, 'köldökvéna', 'kicsi', 'start') +
        Rajz.szoveg(144, 200, 'tüdőverőér', 'kicsi', 'end') +
        Rajz.szoveg(250, 197, 'Botallo-vezeték', 'kicsi') +
        Rajz.szoveg(200, 283, 'köldökartériák', 'kicsi') +
        Rajz.szoveg(180, 76, 'ovális nyílás', 'kicsi') +
        Rajz.szoveg(306, 125, 'aorta', 'kicsi', 'start'),
      'A magzati vérkeringés vázlata',
    );
  }

  // ---- Animáció ----
  const animacio = [
    { felirat: 'Az új egyed két <b>ivarsejt</b> egyesüléséből jön létre. Mindkettő magja csak <b>fél kromoszómaszámú</b> (22 + X vagy 22 + Y = 23 kromoszóma). A petesejt nagy, tápanyagban (szikben) gazdag, nem mozog; a hímivarsejt (ondósejt) apró, a farkával aktívan úszik.', rajz: () => kartya('🥚 + 〰️', 'Petesejt + hímivarsejt') },
    { felirat: 'A <b>megtermékenyítéskor</b> a két félmag egyesül: a megtermékenyített pete (zigóta) már <b>teljes, 46</b> kromoszómát tartalmaz, és benne van az egész szervezet „terve”.', rajz: () => fejlodes(0) },
    { felirat: 'A pete hamarosan osztódni kezd: 2, 4, 8… sejt lesz, a sejtek egyre kisebbek, a csíra mérete nem nő. Ez a <b>barázdálódás</b>, a méhkürtben zajlik (3–4 nap).', rajz: () => fejlodes(1) },
    { felirat: 'A tömör, szederre emlékeztető sejthalmaz a <b>szedercsíra</b> (morula).', rajz: () => fejlodes(2) },
    { felirat: 'A belső sejtek elfolyósodnak, üreg (csíraüreg) keletkezik, amelyet egy sejtréteg vesz körül: ez a <b>hólyagcsíra</b> (blastula). A csíra beágyazódik a méh nyálkahártyájába.', rajz: () => fejlodes(3) },
    { felirat: 'A fal egy része betüremkedik: kialakul a két sejtrétegű <b>bélcsíra</b> (gastrula) – külső és belső csíralemezzel, ősbéllel és ősszájjal.', rajz: () => fejlodes(4) },
    { felirat: 'A két réteg között megjelenik a <b>középső csíralemez</b> is. A három csíralemezből fejlődik minden szerv.', rajz: () => lemezek() },
    { felirat: 'A magzat tüdeje még nem lélegzik: az oxigént a <b>méhlepényből</b> kapja a köldökvénán át. A vér nagy része két „rövidzáron” – az <b>ovális nyíláson</b> és a <b>Botallo-vezetéken</b> – át kikerüli a tüdőt.', rajz: () => magzati() },
    { felirat: 'Az <b>első légvételkor</b> a tüdőerek kitágulnak, a vér a tüdőbe áramlik; a bal pitvarban megnő a nyomás, és az ovális nyílás bezárul. A Botallo-vezeték és a köldökerek is elzáródnak.', rajz: () => magzati('ovalis') },
  ];

  // ---- Interaktív rész: a magzat fejlődése hónapról hónapra (a könyv adatai) ----
  const HONAP = [
    ['🔬', 'A barázdálódó csíra 3–4 nap alatt jut át a méhkürtön, majd beágyazódik a méh nyálkahártyájába. Kialakulnak a csíralemezek, a magzatburkok. A 4. hétre kialakul az alapforma (kb. 5 mm); a fej főleg agyvelőből áll; megjelenik a szív, a máj és a végtagok telepe.'],
    ['🫘', 'Az embrió gyorsan nő: a 2. hónap végére kb. 2,5 cm hosszú, és már emberi formájú.'],
    ['👶', 'Aránytalanul nagy fej, rövid végtagok; finom szőrzet (magzatgyapjú, lanugo) borítja. A külső nemi szervekről eldönthető a nem. Kifejlődik a méhlepény.'],
    ['🤸', 'A magzat aktív mozgásokat kezd végezni.'],
    ['🧴', 'A faggyúmirigyek működni kezdenek: termelik az egész testet beborító magzatmázat.'],
    ['🧈', 'Kezd kialakulni a bőr alatti zsírpárna, a bőr ráncolhatóvá válik.'],
    ['🏥', 'A könyv szerint a 7–8. hónaptól a magzat esetleg már az anyán kívül is életben tartható. (Ma, koraszülött-intenzív ellátással, ez már kb. a 22–24. héttől lehetséges.)'],
    ['📈', 'A magzat tovább nő és érik; az anyán kívüli életképessége hétről hétre javul.'],
    ['📈', 'Gyarapodik a zsírpárna, a szervek érnek.'],
    ['🍼', 'Érett újszülött: átlag 50 cm, 3200 g. A fej a legnagyobb körfogatú rész. Fiúknál a herék leszálltak a herezacskóba; a köldök kb. a hasfal közepén van.'],
  ];
  const interaktiv = Rajz.interaktiv({
    csuszkak: [{ k: 'h', cim: 'Terhességi hónap (28 napos holdhónap)', min: 1, max: 10, lepes: 1, ertek: 3, egyseg: '' }],
    frissit: ({ h }) => ({
      rajz: kartya(HONAP[h - 1][0], `${h}. hónap`),
      szamitas: `<p>${HONAP[h - 1][1]}</p><p>Ez kb. a <b>${4 * h}. hét</b> vége (${28 * h}. nap). 10 holdhónap = 280 nap = 40 hét.</p>`,
    }),
  });

  const RESZ = ['ovális nyílás (foramen ovale)', 'Botallo-vezeték (ductus Botalli)', 'köldökvéna', 'köldökartériák'];
  const magzatiFeladat = (k, valasz, n, kerdes, megoldas) => ({
    kerdes: `${kerdes} <small>(${n}. ábra)</small>`,
    abra: () => Rajz.cimkeNelkul(magzati(k)),
    valasztas: RESZ,
    valasz,
    fixSorrend: true,
    szakma: CIMKEK.ABRA,
    segitseg: 'Középen a szív négy ürege (fent a pitvarok, lent a kamrák), bal lent a méhlepény, felette a máj, jobbra az aorta. Piros: oxigéndúsabb, kék: oxigénszegény vér.',
    megoldas,
  });

  const feladatok = [
    ...Tananyag.szint(1, [
      { kerdes: 'Mit jelent a <b>filogenezis</b>?', valasztas: ['Az élőlények történelmi fejlődését (fajfejlődés, törzsfejlődés)', 'Egy egyed fejlődését a megtermékenyítéstől', 'A sejtosztódást', 'A magzati vérkeringést'], valasz: 'Az élőlények történelmi fejlődését (fajfejlődés, törzsfejlődés)', segitseg: 'Phylon = törzs, nemzetség.', megoldas: 'Filogenezis = fajfejlődés: az élővilág fejlődése az egysejtűektől az emberig. Az egyed fejlődése az ontogenezis.' },
      { kerdes: 'Mit jelent az <b>ontogenezis</b>?', valasztas: ['Az egyed fejlődését (szűkebb értelemben a megtermékenyítéstől a születésig)', 'Az élővilág történelmi fejlődését', 'A sejtek elhalását', 'Az öröklődés törvényét'], valasz: 'Az egyed fejlődését (szűkebb értelemben a megtermékenyítéstől a születésig)', segitseg: 'Egyetlen élőlény élettörténete.', megoldas: 'Ontogenezis = egyedfejlődés. Két szakasza a méhen belüli (intrauterin) és a méhen kívüli (extrauterin) fejlődés – a fejlődés a születéssel nem ér véget.' },
      { kerdes: 'Melyik tudomány foglalkozik a méhen belüli (intrauterin) fejlődéssel?', valasztas: ['Embriológia', 'Szövettan', 'Élettan', 'Csonttan'], valasz: 'Embriológia', segitseg: 'Embrió = ébrény, a fejlődő csíra.', megoldas: 'Az embriológia (fejlődéstan) a méhen belüli fejlődést írja le; az anatómiához és a szövettanhoz szorosan hozzátartozik.' },
      { kerdes: 'Kik a fajok fejlődésének klasszikus leírói a könyv szerint?', valasztas: ['Lamarck és Darwin', 'Pavlov és Selye', 'Szent-Györgyi és Rusznyák', 'Krogh és Oparin'], valasz: 'Lamarck és Darwin', segitseg: 'Egy francia és egy angol tudós.', megoldas: 'A francia Lamarck és az angol Darwin: tanaik alapján vált ismertté az öröklődés, a változékonyság, az alkalmazkodás és a természetes kiválasztódás szerepe.' },
    ]),
    ...Tananyag.szint(2, []),
    ...Tananyag.szint(3, []),
  ];

  Tananyag.tema('anatomia', {
    azon: 'egyedfejlodes',
    ikon: '🧬',
    animacio,
    interaktiv,
    feladatok,
    magyarazat: `
      <div class="doboz cel">
        <b>Mire jó ez neked?</b>
        <p>Helyszíni szülésnél, újszülött-ellátásnál és várandós betegnél tudnod kell, hogyan fejlődik a magzat, hogyan kap oxigént, és mi változik a keringésében az első légvételkor. A fejlődés lépései magyarázzák a fejlődési rendellenességek eredetét is.</p>
      </div>
      <p class="kerekites">📘 Tankönyvi fejezet (Donáth Tibor: Anatómia–élettan): III. fejezet – Fajfejlődés, egyedi fejlődés (Filogenezis; Ontogenezis; Ivarsejtek; Megtermékenyítés; Az embrió fejlődése); valamint V. fejezet – A keringési rendszer és a vér (Magzati vérkeringés)</p>

      <h3>Nézd meg lépésről lépésre!</h3>
      <div data-animacio></div>

      <h3>Fajfejlődés és egyedfejlődés</h3>
      <ul>
        <li><b>Filogenezis (fajfejlődés):</b> az élővilág történelmi fejlődése: egysejtűek → többsejtűek (hidra) → férgek → puhatestűek, ízeltlábúak → gerincesek (lándzsahal, halak, kétéltűek, csúszómászók, madarak, emlősök) → ember. Klasszikus leírói: <b>Lamarck</b> és <b>Darwin</b> (öröklődés, változékonyság, alkalmazkodás, természetes kiválasztódás).</li>
        <li><b>Ontogenezis (egyedfejlődés):</b> egy egyed fejlődése. Szűkebb értelemben kb. <b>280 nap</b>; két szakasza a méhen belüli (intrauterin) és a méhen kívüli (extrauterin) fejlődés. Az egyedfejlődés a fajfejlődés „lerövidített formája”: a 3. hónapos magzatot szőrtakaró borítja, és farka van – ezek később eltűnnek.</li>
      </ul>

      <h3>Ivarsejtek és megtermékenyítés</h3>
      <div class="tabla-keret"><table>
        <thead><tr><th></th><th>Petesejt</th><th>Hímivarsejt (ondósejt, spermium)</th></tr></thead>
        <tbody>
          <tr><td>Hol termelődik?</td><td>petefészek (Graaf-féle tüsző)</td><td>here</td></tr>
          <tr><td>Méret, alak</td><td>a könyv szerint 0,2–0,3 mm, gömb, sok tápanyag (szik)</td><td>fonalszerű: fej, nyak, farok</td></tr>
          <tr><td>Mozgás</td><td>nem mozog aktívan</td><td>a farkával úszik (lúgos közeg serkenti, savas gátolja)</td></tr>
          <tr><td>Kromoszóma</td><td>22 + X</td><td>22 + X vagy 22 + Y</td></tr>
        </tbody>
      </table></div>
      <p class="kerekites">A mai tankönyvek a petesejt átmérőjét kb. 0,1–0,15 mm-nek adják meg; vizsgán a könyv értékét használd.</p>
      <p>Az ivarsejtek magja <b>fél kromoszómaszámú</b> (haploid). A <b>megtermékenyítéskor</b> a két félmag egyesül, a pete kromoszómaszáma kiegészül (44 + XX vagy 44 + XY = 46, diploid). Az embernél a megtermékenyítés a női szervezeten belül történik (belső megtermékenyítés). Egy ondóváladék kb. 3,3 ml, kb. 350 millió spermiummal; a spermium a kb. 16–20 cm-es utat kb. 2 óra alatt teszi meg.</p>

      <h3>Az embrió fejlődése</h3>
      ${fejlodes()}
      <ol>
        <li><b>Barázdálódás:</b> a pete osztódik, a sejtek egyre kisebbek, a csíra mérete nem nő (3–4 nap a méhkürtben).</li>
        <li><b>Szedercsíra (morula):</b> tömör sejthalmaz.</li>
        <li><b>Hólyagcsíra (blastula):</b> csíraüreg, körülötte egy sejtréteg. Beágyazódik a méh nyálkahártyájába.</li>
        <li><b>Bélcsíra (gastrula):</b> betüremkedéssel két sejtrétegű zsák: ősbél, ősszáj.</li>
        <li>Megjelenik a <b>középső csíralemez</b>, majd a csíralemezeken a <b>szervtelepek</b>.</li>
        <li>Kialakul a központi idegrendszer telepe és a <b>gerinchúr</b>, a primitív szervezet tengelye. (A gerinc azonban nem ebből, hanem a mellette megjelenő <b>őscsigolyákból</b> fejlődik.)</li>
      </ol>
      <p>A megtermékenyített pete <b>totipotens</b> (az egész szervezetet létrehozhatja), a differenciálódott sejtek <b>unipotensek</b>. A fejlődést az <b>organizációs centrumok</b> irányítják (<b>indukció</b>), ennek hatására a sejtek <b>determinálódnak</b>. Korán még a környezet dönt: az átültetett sejt az új helyének megfelelően fejlődik.</p>

      <h3>A három csíralemez</h3>
      ${lemezek()}

      <h3>Magzatburkok, méhlepény, köldökzsinór</h3>
      <ul>
        <li><b>Amnion</b> (belső burok): üregét a víztiszta <b>magzatvíz</b> tölti ki – véd a kiszáradástól és a fizikai hatásoktól.</li>
        <li><b>Chorion</b> (külső burok): bolyhaival benő a méhfalba, és azzal együtt kialakítja a <b>méhlepényt</b> (placenta) – a 3. hónapra fejlődik ki.</li>
        <li>A méhlepény korong alakú, szivacsos szerv; az anyai és a magzati vér <b>nem keveredik</b>, az anyagcsere a bolyhok falán át zajlik.</li>
        <li><b>Köldökzsinór:</b> kb. 60 cm hosszú, 2 cm vastag; benne kocsonyás anyagban <b>2 köldökartéria és 1 köldökvéna</b>.</li>
      </ul>

      <h3>A magzat hónapról hónapra</h3>
      <div data-interaktiv></div>

      <h3>A magzati vérkeringés</h3>
      ${magzati()}
      <p>A magzat tüdeje és bele nem működik, ezért:</p>
      <ol>
        <li>A méhlepényből a friss vér a <b>köldökvénán</b> át – részben közvetlenül, részben a májon keresztül – az <b>alsó üres vénába</b> kerül, ahol a törzs és az alsó végtagok vénás vérével keveredik, majd a jobb pitvarba jut.</li>
        <li>Innen nagy része az <b>ovális nyíláson</b> (foramen ovale) át a bal pitvarba, a bal kamrába és az aortába kerül.</li>
        <li>A felső üres véna vére a jobb kamrába, onnan a tüdőverőérbe jut, de nagy része a tüdő helyett a <b>Botallo-vezetéken</b> (ductus Botalli) át az aortába folyik.</li>
        <li>A két <b>köldökartéria</b> (a belső csípőverőerekből) visszaviszi a vért a méhlepénybe.</li>
      </ol>
      <p>A könyv szerint tisztán artériás vért csak a máj kap, a test többi artériája kevert vért tartalmaz. <b>Születéskor</b> az első légvétellel a tüdőerek kitágulnak, a bal pitvari nyomás megnő → az ovális nyílás bezárul; a köldökzsinór lekötése után a köldökerek hasi szakasza és a Botallo-vezeték is elzáródik.</p>
      <p class="kerekites">A mai felfogás szerint a köldökvéna vérének jelentős része a ductus venosuson át megkerüli a májat, és a legoxigéndúsabb vér főleg a szívbe és az agyba jut. Vizsgán a könyv szerinti leírást mondd.</p>

      <h3>A gyakorlatban</h3>
      <div class="doboz szakma">
        <p><b>🚑 Miért fontos a mentőnek?</b></p>
        <ul>
          <li><b>Terhességi hét:</b> a napok száma osztva 7-tel (pl. 98 nap = 14 betöltött hét). 280 nap = 40 hét = 10 holdhónap.</li>
          <li>Az <b>első hónapokban</b> alakulnak ki a szervtelepek: ilyenkor a legveszélyesebb a gyógyszer, az alkohol, a sugárzás, egyes fertőzések – fejlődési rendellenességet okozhatnak.</li>
          <li><b>Újszülött:</b> szárítás, meleg, légút, szükség esetén lélegeztetés – a kihűlés és az oxigénhiány gátolhatja a magzati keringés átállását.</li>
          <li><b>Köldökzsinór:</b> két helyen lefogni, közte átvágni; a lepényt vidd a kórházba.</li>
          <li><b>Nyitott gerinc</b> (velőcső-rendellenesség): steril, nedves fedés, hason/oldalt fektetés, nyomás kerülése.</li>
        </ul>
      </div>

      <details class="tobbet">
        <summary>Ha többet szeretnél tudni: a magzat fejlődése a könyv szerint</summary>
        <ul>
          <li><b>4. hét:</b> kb. 5 mm, alapforma; a fej főleg agyvelő; szív, máj, végtagok telepe.</li>
          <li><b>2. hónap vége:</b> kb. 2,5 cm, emberi forma.</li>
          <li><b>3. hónap:</b> nagy fej, rövid végtagok, magzatgyapjú (lanugo); eldönthető a nem.</li>
          <li><b>4. hónap:</b> aktív mozgások.</li>
          <li><b>5. hónap:</b> magzatmáz.</li>
          <li><b>6. hónap:</b> bőr alatti zsírpárna, a bőr ráncolható.</li>
          <li><b>7–8. hónap:</b> a könyv szerint esetleg már az anyán kívül is életben tartható (ma ez kb. a 22–24. héttől lehetséges intenzív ellátással).</li>
        </ul>
      </details>

      <h3>Gyakori hibák</h3>
      <ul>
        <li>❌ Filogenezis és ontogenezis felcserélése – <b>fajfejlődés</b> kontra <b>egyedfejlődés</b>.</li>
        <li>❌ Szedercsíra és hólyagcsíra felcserélése – a <b>szedercsíra tömör</b>, a <b>hólyagcsíra üreges</b>.</li>
        <li>❌ „Az idegrendszer a középső csíralemezből fejlődik” – <b>a külsőből</b> (ectoderma)!</li>
        <li>❌ „A köldökartériában oxigéndús vér van” – a köldökartéria az <b>elhasznált</b> vért viszi a lepénybe.</li>
        <li>❌ „Az anyai és a magzati vér összekeveredik” – <b>nem</b> keveredik.</li>
      </ul>

      <div class="doboz jegyezd">
        <b>Jegyezd meg!</b>
        <ul>
          <li>Ivarsejt: <b>23</b> kromoszóma, megtermékenyített pete: <b>46</b>.</li>
          <li>Pete → barázdálódás → <b>szedercsíra</b> → <b>hólyagcsíra</b> → <b>bélcsíra</b>.</li>
          <li>Ectoderma: bőr, idegrendszer · Mesoderma: csont, izom, szív, erek · Entoderma: bél, légcső, máj.</li>
          <li>Amnion belül (magzatvíz), chorion kívül (méhlepény); köldökzsinór: 2 artéria + 1 véna.</li>
          <li>Magzati rövidzárak: <b>ovális nyílás</b> (pitvarok között) és <b>Botallo-vezeték</b> (tüdőverőér → aorta); az első légvétellel bezárulnak.</li>
        </ul>
      </div>`,
  });
})();
