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
    const ut = (k, d, o) => `<path d="${d}" class="${c(k, 'ut ' + o)}"/>`;
    return Rajz.svg(
      360,
      300,
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
        '<path d="M190 205 V226" class="ut szen halvany"/>' +
        ut('botalli', 'M200 205 H300', 'szen') +
        ut('aorta', 'M240 157 H265 V45 H300 V205', 'oxi') +
        ut('koldokarteria', 'M300 205 V270 H102', 'szen') +
        `<circle cx="180" cy="111" r="8" class="${kiemel === 'ovalis' ? 'jelolo-kor' : 'oxi'}"/>` +
        Rajz.szoveg(135, 20, 'felső üres véna', 'kicsi') +
        Rajz.szoveg(8, 100, 'alsó üres véna', 'kicsi', 'start') +
        Rajz.szoveg(68, 222, 'köldökvéna', 'kicsi', 'start') +
        Rajz.szoveg(144, 200, 'tüdőverőér', 'kicsi', 'end') +
        Rajz.szoveg(250, 197, 'Botalli-vezeték', 'kicsi') +
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
    { felirat: 'A magzat tüdeje még nem lélegzik: az oxigént a <b>méhlepényből</b> kapja a köldökvénán át. A vér nagy része két „rövidzáron” – az <b>ovális nyíláson</b> és a <b>Botalli-vezetéken</b> – át kikerüli a tüdőt.', rajz: () => magzati() },
    { felirat: 'Az <b>első légvételkor</b> a tüdőerek kitágulnak, a vér a tüdőbe áramlik; a bal pitvarban megnő a nyomás, és az ovális nyílás bezárul. A Botalli-vezeték és a köldökerek is elzáródnak.', rajz: () => magzati('ovalis') },
  ];

  // ---- Interaktív rész: a magzat fejlődése hónapról hónapra (a könyv adatai) ----
  const HONAP = [
    ['🔬', 'A barázdálódó csíra 3–4 nap alatt jut át a méhkürtön, majd beágyazódik a méh nyálkahártyájába. Kialakulnak a csíralemezek, a magzatburkok.'],
    ['🫘', 'A 4. hétre kialakul az alapforma (kb. 5 mm); a fej főleg agyvelőből áll; megjelenik a szív, a máj és a végtagok telepe. A 2. hónap végére kb. 2,5 cm, már emberi formájú.'],
    ['👶', 'Aránytalanul nagy fej, rövid végtagok; finom szőrzet (magzatgyapjú, lanugo) borítja. A külső nemi szervekről eldönthető a nem. Kifejlődik a méhlepény.'],
    ['🤸', 'A magzat aktív mozgásokat kezd végezni.'],
    ['🧴', 'A faggyúmirigyek működni kezdenek: termelik az egész testet beborító magzatmázat.'],
    ['🧈', 'Kezd kialakulni a bőr alatti zsírpárna, a bőr ráncolhatóvá válik.'],
    ['🏥', 'A könyv szerint a 7–8. hónaptól a magzat esetleg már az anyán kívül is életben tartható. (Ma, koraszülött-intenzív ellátással, ez már kb. a 22–24. héttől lehetséges.)'],
    ['📈', 'A magzat tovább nő és érik; az anyán kívüli életképessége hétről hétre javul.'],
    ['📈', 'Gyarapodik a zsírpárna, a szervek érnek.'],
    ['🍼', 'Érett újszülött: átlag 50 cm, 3200 g. A fej a legnagyobb körfogatú rész. Fiúknál a herék leszálltak a herezacskóba; a köldök kb. a test hosszának közepén van.'],
  ];
  const interaktiv = Rajz.interaktiv({
    csuszkak: [{ k: 'h', cim: 'Terhességi hónap (28 napos holdhónap)', min: 1, max: 10, lepes: 1, ertek: 3, egyseg: '' }],
    frissit: ({ h }) => ({
      rajz: kartya(HONAP[h - 1][0], `${h}. hónap`),
      szamitas: `<p>${HONAP[h - 1][1]}</p><p>Ez kb. a <b>${4 * h}. hét</b> vége (${28 * h}. nap). 10 holdhónap = 280 nap = 40 hét.</p>`,
    }),
  });

  const RESZ = ['ovális nyílás (foramen ovale)', 'Botalli-vezeték (ductus Botalli)', 'köldökvéna', 'köldökartériák'];
  const magzatiFeladat = (k, valasz, n, megoldas) => ({
    kerdes: `Melyik ér vagy nyílás van kiemelve a magzati vérkeringés vázlatán? <small>(${n}. ábra)</small>`,
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
      { kerdes: 'Hol termelődnek a női ivarsejtek (petesejtek)?', valasztas: ['A petefészekben', 'A méhben', 'A petevezetőben', 'A méhlepényben'], valasz: 'A petefészekben', segitseg: 'Az érett petesejt a Graaf-féle tüszőben van.', megoldas: 'A petesejt a petefészekben, a Graaf-féle tüszőben érik; a hímivarsejtek a herében termelődnek.' },
      { kerdes: 'Hány kromoszóma van egy érett ivarsejt magjában (22 + X vagy 22 + Y)?', valasz: 23, egyseg: 'db', segitseg: 'Fél (haploid) kromoszómaszám.', megoldas: '22 + 1 = 23 kromoszóma – ezért „félmagnak” is tekinthető. A teljes szám a megtermékenyítéskor egészül ki.' },
      { kerdes: 'Hány kromoszómája van a megtermékenyített petének (diploid sejt)?', valasz: 46, egyseg: 'db', segitseg: '44 + XX vagy 44 + XY.', megoldas: '23 + 23 = 46 kromoszóma (44 + XX lánynál, 44 + XY fiúnál).' },
      { kerdes: 'Melyik ivarsejt képes <b>aktív mozgásra</b>?', valasztas: ['A hímivarsejt (ondósejt)', 'A petesejt', 'Mindkettő', 'Egyik sem'], valasz: 'A hímivarsejt (ondósejt)', segitseg: 'Farka van.', megoldas: 'Az ondósejt a farka csapkodó mozgásával halad előre; a petesejt nem képes aktív mozgásra.' },
      { kerdes: 'Melyek a hímivarsejt (ondószál) részei?', valasztas: ['Fej, nyak, farok', 'Mag, szik, burok', 'Test, dendrit, axon', 'Fej, törzs, végtag'], valasz: 'Fej, nyak, farok', segitseg: 'Fonalszerű sejt.', megoldas: 'Fej (a mag), nyak (átalakult centriólum) és farok (mozgás). Plazma alig van benne.' },
      { kerdes: 'A könyv szerint kb. hány napig tart a szűkebb értelemben vett ontogenezis (a méhen belüli fejlődés)?', valasz: 280, egyseg: 'nap', segitseg: '40 hét.', megoldas: 'Kb. 280 nap = 40 hét = 10 holdhónap. (A szülészet ezt az utolsó menstruáció első napjától számolja; maga a megtermékenyítés kb. 2 héttel később történik.)' },
      { kerdes: 'Mi a <b>barázdálódás</b>?', valasztas: ['A megtermékenyített pete ismételt osztódása: a sejtek száma nő, a méretük csökken', 'A magzat bőrének ráncolódása', 'A méhlepény kialakulása', 'A spermium útja a petevezetőben'], valasz: 'A megtermékenyített pete ismételt osztódása: a sejtek száma nő, a méretük csökken', segitseg: 'A pete felszínén barázdák jelennek meg.', megoldas: 'Barázdálódáskor a csíra mérete nem nő (akkora marad, mint a petesejt), csak egyre több, egyre kisebb sejtből áll.' },
      { kerdes: 'Mi a <b>szedercsíra</b> (morula)?', valasztas: ['Tömör, szederre emlékeztető sejthalmaz', 'Üreges, egy sejtrétegű gömb', 'Két sejtrétegű zsák', 'Az érett petesejt'], valasz: 'Tömör, szederre emlékeztető sejthalmaz', segitseg: 'Morus = szeder.', megoldas: 'A barázdálódás során kialakuló tömör sejthalmaz a szedercsíra; ebből lesz a hólyagcsíra.' },
      { kerdes: 'Hány csíralemez alakul ki az embrióban?', valasz: 3, egyseg: 'db', segitseg: 'Külső, középső, belső.', megoldas: 'Három: külső (ectoderma), középső (mesoderma) és belső (entoderma) csíralemez.' },
      { kerdes: 'Melyik csíralemezből fejlődik az <b>idegrendszer</b> és a bőr?', valasztas: ['Külső csíralemez (ectoderma)', 'Középső csíralemez (mesoderma)', 'Belső csíralemez (entoderma)', 'A chorionból'], valasz: 'Külső csíralemez (ectoderma)', fixSorrend: true, segitseg: 'Ami „kívül” van, és ami érzékel.', megoldas: 'Az ectodermából: bőr, haj, köröm, mirigyek hámja és az idegrendszer.' },
      { kerdes: 'Melyik csíralemezből fejlődik a csont, az izom, a szív és az erek?', valasztas: ['Külső csíralemez (ectoderma)', 'Középső csíralemez (mesoderma)', 'Belső csíralemez (entoderma)', 'A chorionból'], valasz: 'Középső csíralemez (mesoderma)', fixSorrend: true, segitseg: 'A mozgás és a keringés szervei.', megoldas: 'A mesodermából: kötőszövet, izomzat, csontok, szív, erek.' },
      { kerdes: 'Melyik csíralemezből fejlődik a bél hámja, a légcső és a máj?', valasztas: ['Külső csíralemez (ectoderma)', 'Középső csíralemez (mesoderma)', 'Belső csíralemez (entoderma)', 'A chorionból'], valasz: 'Belső csíralemez (entoderma)', fixSorrend: true, segitseg: 'Az ősbelet béleli.', megoldas: 'Az entodermából: a belek (hámja), a légcső, a máj stb.' },
      { kerdes: 'Melyik a <b>belső</b> magzatburok, amelynek üregét a magzatvíz tölti ki?', valasztas: ['Amnion', 'Chorion', 'Méhlepény', 'Köldökzsinór'], valasz: 'Amnion', segitseg: 'A külső burok a chorion.', megoldas: 'Az amnion a belső burok; üregében, a magzatvízben úszik az embrió, védve a kiszáradástól és a külső fizikai hatásoktól.' },
      { kerdes: 'Mi köti össze a magzatot a méhlepénnyel?', valasztas: ['A köldökzsinór', 'Az amnion', 'A petevezető', 'A méhnyak'], valasz: 'A köldökzsinór', segitseg: 'Benne futnak a köldökerek.', megoldas: 'A köldökzsinór hengeres köteg, benne kocsonyás anyagba ágyazva futnak a köldökerek.' },
      { kerdes: 'Mekkora az érett újszülött átlagos hossza és tömege a könyv szerint?', valasztas: ['Kb. 50 cm, 3200 g', 'Kb. 30 cm, 1500 g', 'Kb. 70 cm, 5000 g', 'Kb. 40 cm, 2000 g'], valasz: 'Kb. 50 cm, 3200 g', segitseg: 'Fél méter, kb. 3 kg.', megoldas: 'Az érett újszülött átlagosan 50 cm hosszú és 3200 g. A 2500 g alatti újszülött kis súlyúnak számít.' },
      { kerdes: 'Honnan kapja a magzat az oxigént?', valasztas: ['Az anya véréből, a méhlepényen át', 'A saját tüdejével a magzatvízből', 'A bőrén át a levegőből', 'A köldökön át közvetlenül a levegőből'], valasz: 'Az anya véréből, a méhlepényen át', segitseg: 'A tüdő és a bél a magzatban még nem működik.', megoldas: 'A magzat az oxigént és a tápanyagot a méhlepényen át az anya véréből kapja, és ide adja le a bomlástermékeket is.' },
      { kerdes: 'Keveredik-e az anyai és a magzati vér a méhlepényben?', valasztas: ['Nem: az anyagcsere a bolyhok falán át zajlik', 'Igen, teljesen összekeveredik', 'Csak szülés közben keveredik', 'Csak a vörösvértestek cserélődnek'], valasz: 'Nem: az anyagcsere a bolyhok falán át zajlik', segitseg: 'Az anyai vér öblökbe ömlik, ebbe nyúlnak a magzati bolyhok.', megoldas: 'A két vér nem keveredik közvetlenül: a magzati erek a bolyhokban vannak, az anyagok a bolyhok sejtfalán át jutnak át.' },
    ]),
    ...Tananyag.szint(2, [
      { kerdes: 'Mi a <b>hólyagcsíra</b> (blastula)?', valasztas: ['Egy sejtréteg által körülvett, folyadékkal telt üreges gömb', 'Tömör sejthalmaz', 'Két sejtrétegű zsák ősszájjal', 'A megtermékenyített petesejt'], valasz: 'Egy sejtréteg által körülvett, folyadékkal telt üreges gömb', segitseg: 'A belső sejtek elfolyósodnak.', megoldas: 'A szedercsíra belsejében üreg (csíraüreg) keletkezik, amelyet egy sejtréteg vesz körül – ez a hólyagcsíra.' },
      { kerdes: 'Hogyan jön létre a <b>bélcsíra</b> (gastrula)?', valasztas: ['A hólyagcsíra fala betüremkedik: két sejtrétegű zsák lesz, ősbéllel és ősszájjal', 'A pete kettéválik', 'A sejtek elfolyósodnak, üreg képződik', 'A méhlepény benő a csírába'], valasz: 'A hólyagcsíra fala betüremkedik: két sejtrétegű zsák lesz, ősbéllel és ősszájjal', segitseg: 'Mint amikor egy labdát benyomsz.', megoldas: 'A bélcsíra külső rétege a külső, belső rétege a belső csíralemez; üregét ősbélnek, nyílását ősszájnak nevezzük.' },
      { kerdes: 'Melyik a korai fejlődés helyes sorrendje?', valasztas: ['Megtermékenyített pete → barázdálódás → szedercsíra → hólyagcsíra → bélcsíra', 'Hólyagcsíra → szedercsíra → bélcsíra → barázdálódás', 'Bélcsíra → hólyagcsíra → szedercsíra → pete', 'Szedercsíra → pete → bélcsíra → hólyagcsíra'], valasz: 'Megtermékenyített pete → barázdálódás → szedercsíra → hólyagcsíra → bélcsíra', segitseg: 'Tömör halmaz → üreges gömb → kétrétegű zsák.', megoldas: 'Pete → barázdálódás → szedercsíra (morula) → hólyagcsíra (blastula) → bélcsíra (gastrula), majd megjelenik a középső csíralemez.' },
      { kerdes: 'A könyv szerint mennyi idő alatt jut át a barázdálódó pete a méhkürtön?', valasztas: ['3–4 nap', '3–4 óra', '3–4 hét', '3–4 hónap'], valasz: '3–4 nap', segitseg: 'Néhány nap.', megoldas: 'A barázdálódás a méhkürtön való átjutás 3–4 napja alatt zajlik; ezalatt a pete főleg a magával hozott tápanyagot használja.' },
      { kerdes: 'Hová ágyazódik be a barázdálódott csíra?', valasztas: ['A méh nyálkahártyájába', 'A petefészekbe', 'A hasüregbe', 'A méhnyakba'], valasz: 'A méh nyálkahártyájába', segitseg: 'Itt alakul ki a méhlepény.', megoldas: 'A csíra a méh nyálkahártyájába ágyazódik be; ezen a helyen fejlődik ki a méhlepény. (Ha máshol ágyazódik be – pl. a petevezetőben –, az méhen kívüli terhesség.)' },
      { kerdes: 'Mi a <b>chorion</b> (külső magzatburok) fő szerepe?', valasztas: ['Bolyhaival benő a méhfalba, és azzal együtt kialakítja a méhlepényt', 'Magzatvizet termel', 'A magzat bőrét adja', 'Hormonokat termel a petefészekben'], valasz: 'Bolyhaival benő a méhfalba, és azzal együtt kialakítja a méhlepényt', segitseg: 'Kapcsolatot teremt az anya és a magzat között.', megoldas: 'A chorion körülveszi az egész csírahólyagot; bolyhai (chorionbolyhok) a méhfallal együtt alkotják a méhlepényt (placenta).' },
      { kerdes: 'Melyik terhességi hónapra fejlődik ki a méhlepény a könyv szerint?', valasz: 3, egyseg: 'hónap', segitseg: 'Az első trimeszter végére.', megoldas: 'A méhlepény a 3. hónapra fejlődik ki; addig a csíra a feloldott méhnyálkahártyából és diffúzióval táplálkozik.' },
      { kerdes: 'Mi a latin neve a <b>középső</b> csíralemeznek?', szakma: CIMKEK.LATIN, valasztas: ['mesoderma', 'ectoderma', 'entoderma', 'chorion'], valasz: 'mesoderma', segitseg: 'Meso- = közép.', megoldas: 'Ectoderma = külső, mesoderma = középső, entoderma = belső csíralemez.' },
      { kerdes: 'Mit jelent a <b>foramen ovale</b>?', szakma: CIMKEK.LATIN, valasztas: ['Ovális nyílás a két pitvar között (a magzatban)', 'A koponyaalap egyik nyílása', 'A két kamra közti sövény', 'A köldökzsinór ere'], valasz: 'Ovális nyílás a két pitvar között (a magzatban)', segitseg: 'Foramen = nyílás.', megoldas: 'A foramen ovale a pitvari sövényen lévő nyílás: a magzatban a jobb pitvarból a bal pitvarba vezeti a vért. Születés után bezárul.' },
      { kerdes: 'Mit köt össze a <b>ductus Botalli</b> (Botallo-vezeték)?', szakma: CIMKEK.LATIN, valasztas: ['A tüdőverőeret és az aortát', 'A két pitvart', 'A köldökvénát és a májat', 'A két kamrát'], valasz: 'A tüdőverőeret és az aortát', segitseg: 'Ductus = vezeték.', megoldas: 'A Botalli-vezeték a tüdőverőérből az aortába tereli a vért, így az kikerüli a még nem működő tüdőt.' },
      { kerdes: 'Mit jelent, hogy a megtermékenyített pete <b>totipotens</b>?', valasztas: ['Képes az egész szervezetet létrehozni', 'Csak egy szövetet tud kialakítani', 'Nem tud osztódni', 'Mozgásra képes'], valasz: 'Képes az egész szervezetet létrehozni', segitseg: 'Toti- = egész.', megoldas: 'A pete totipotens; a differenciálódott sejtek már unipotensek, csak egy meghatározott szövetet, szervet képesek kialakítani.' },
      { kerdes: 'Mi a <b>differenciálódás</b>?', valasztas: ['A sejtcsoportok eltérő irányú fejlődése, amelyből különböző sejttípusok lesznek', 'A sejtek számának növekedése', 'A csíra beágyazódása', 'A sejtek elhalása'], valasz: 'A sejtcsoportok eltérő irányú fejlődése, amelyből különböző sejttípusok lesznek', segitseg: 'Elkülönülés.', megoldas: 'A sokféle sejt, szövet, szerv kialakulását két tényező magyarázza: a folytonos sejtosztódás és a sejtek elkülönülése (differenciálódás).' },
      { kerdes: 'A könyv szerint melyik hónapban kezd a magzat aktív mozgásokat végezni?', valasz: 4, egyseg: 'hónap', segitseg: 'A 3. után.', megoldas: 'A 4. hónapban kezd a magzat aktívan mozogni; az 5. hónapban termelődik a magzatmáz, a 6.-ban kezdődik a bőr alatti zsírpárna.' },
      { kerdes: 'Miért mondja a könyv, hogy az egyedfejlődés a fajfejlődés „lerövidített formája”?', valasztas: ['Mert az embrióban az állatokra jellemző képletek jelennek meg, majd eltűnnek (pl. szőrtakaró, farok)', 'Mert a magzat 280 nap alatt fejlődik', 'Mert az ember az állatoktól származik közvetlenül', 'Mert a magzat nem fejlődik tovább születés után'], valasz: 'Mert az embrióban az állatokra jellemző képletek jelennek meg, majd eltűnnek (pl. szőrtakaró, farok)', segitseg: 'A 3. hónap végi magzatnak farka és szőrtakarója van.', megoldas: 'A magzati fejlődés során nagyjából megfigyelhetők a fajfejlődés átalakulásai; pl. a 3. hónap végén szőrtakaró és farok, amely később eltűnik.' },
      { kerdes: 'Magzati keringés: hová jut az alsó üres vénából a jobb pitvarba érkező vér nagy része?', valasztas: ['Az ovális nyíláson át a bal pitvarba', 'A jobb kamrán át a tüdőbe', 'Vissza a méhlepénybe', 'A koszorúerekbe'], valasz: 'Az ovális nyíláson át a bal pitvarba', segitseg: 'Rövidzár a pitvarok között.', megoldas: 'Az alsó üres véna (a méhlepényből jövő friss vérrel kevert) vére a foramen ovalén át a bal pitvarba, onnan a bal kamrába és az aortába jut.' },
      { kerdes: 'Hány köldökartéria és hány köldökvéna fut a köldökzsinórban?', valasztas: ['2 artéria és 1 véna', '1 artéria és 2 véna', '1 artéria és 1 véna', '2 artéria és 2 véna'], valasz: '2 artéria és 1 véna', segitseg: 'A két belső csípőverőérből ered egy-egy köldökartéria.', megoldas: 'Két köldökartéria (a belső csípőverőerekből) viszi a vért a méhlepénybe, egy köldökvéna hozza vissza a friss vért.' },
      { kerdes: 'Milyen vért szállítanak a köldökartériák?', valasztas: ['Oxigénszegény, elhasznált vért a magzatból a méhlepénybe', 'Oxigéndús vért a méhlepényből a magzatba', 'Anyai vért', 'Magzatvizet'], valasz: 'Oxigénszegény, elhasznált vért a magzatból a méhlepénybe', segitseg: 'Az artéria a szívtől el visz – itt a méhlepény felé.', megoldas: 'Itt is igaz: az artéria a szívtől elvezető ér, nem az oxigéntartalom dönt. A köldökartériák elhasznált vért, a köldökvéna friss vért szállít.' },
      { kerdes: 'Várandós a 8. terhességi hétnél tart, és „csak egy kis” gyógyszert szedne engedély nélkül. Miért különösen érzékeny ez az időszak a magzat szempontjából?', szakma: CIMKEK.TERHES, valasztas: ['Mert ekkor alakulnak ki a szervtelepek – a káros hatás fejlődési rendellenességet okozhat', 'Mert ekkor már kész minden szerv', 'Mert ekkor fejlődik ki a bőr alatti zsír', 'Nem érzékeny időszak'], valasz: 'Mert ekkor alakulnak ki a szervtelepek – a káros hatás fejlődési rendellenességet okozhat', segitseg: 'A 4. héten már megvan a szív, a máj, a végtagok telepe.', megoldas: 'Az első hónapokban (főleg az első trimeszterben) alakulnak ki a szervek. Gyógyszer, alkohol, dohányzás, sugárzás, egyes fertőzések ekkor okozhatnak legnagyobb eséllyel fejlődési rendellenességet. Terhesség alatt gyógyszert csak orvosi javaslatra!' },
      {
        kerdes: 'Melyik fejlődési szakasz van kiemelve az ábrán? <small>(1. ábra)</small>', abra: () => Rajz.cimkeNelkul(fejlodes(2)), szakma: CIMKEK.ABRA,
        valasztas: ['szedercsíra (morula)', 'hólyagcsíra (blastula)', 'bélcsíra (gastrula)', 'megtermékenyített pete (zigóta)'], valasz: 'szedercsíra (morula)',
        segitseg: 'Balról jobbra: pete → barázdálódás → szedercsíra → hólyagcsíra → bélcsíra.', megoldas: 'A kiemelt szakasz a szedercsíra: tömör, szederszerű sejthalmaz. Utána üreg képződik benne (hólyagcsíra).',
      },
      {
        kerdes: 'Melyik fejlődési szakasz van kiemelve az ábrán? <small>(2. ábra)</small>', abra: () => Rajz.cimkeNelkul(fejlodes(4)), szakma: CIMKEK.ABRA,
        valasztas: ['bélcsíra (gastrula)', 'szedercsíra (morula)', 'hólyagcsíra (blastula)', 'megtermékenyített pete (zigóta)'], valasz: 'bélcsíra (gastrula)',
        segitseg: 'Két réteg és egy nyílás (ősszáj).', megoldas: 'A kiemelt szakasz a bélcsíra: két sejtrétegű zsák (kék: külső, piros: belső csíralemez), ősbéllel és ősszájjal.',
      },
      {
        kerdes: 'Melyik csíralemez van kiemelve az ábrán? <small>(3. ábra)</small>', abra: () => Rajz.cimkeNelkul(lemezek('ekto')), szakma: CIMKEK.ABRA,
        valasztas: ['külső csíralemez (ectoderma)', 'középső csíralemez (mesoderma)', 'belső csíralemez (entoderma)', 'chorion'], valasz: 'külső csíralemez (ectoderma)', fixSorrend: true,
        segitseg: 'Fentről lefelé: külső – középső – belső.', megoldas: 'A kiemelt réteg a külső csíralemez (ectoderma): bőr, haj, köröm, idegrendszer fejlődik belőle.',
      },
      {
        kerdes: 'Melyik csíralemez van kiemelve az ábrán? <small>(4. ábra)</small>', abra: () => Rajz.cimkeNelkul(lemezek('mezo')), szakma: CIMKEK.ABRA,
        valasztas: ['külső csíralemez (ectoderma)', 'középső csíralemez (mesoderma)', 'belső csíralemez (entoderma)', 'chorion'], valasz: 'középső csíralemez (mesoderma)', fixSorrend: true,
        segitseg: 'Fentről lefelé: külső – középső – belső.', megoldas: 'A kiemelt réteg a középső csíralemez (mesoderma): csont, izom, kötőszövet, szív, erek fejlődik belőle.',
      },
    ]),
    ...Tananyag.szint(3, [
      { kerdes: 'Mi történik a keringésben az újszülött <b>első légvételekor</b>?', valasztas: ['A tüdőerek kitágulnak, a vér a tüdőbe áramlik; a bal pitvari nyomás nő, az ovális nyílás bezárul, a Botalli-vezeték elzáródik', 'A szív először kezd verni', 'A köldökvéna kitágul, több vér jön a méhlepényből', 'Semmi nem változik'], valasz: 'A tüdőerek kitágulnak, a vér a tüdőbe áramlik; a bal pitvari nyomás nő, az ovális nyílás bezárul, a Botalli-vezeték elzáródik', segitseg: 'A tüdő „szívó hatása”.', megoldas: 'A kitáguló tüdőerek szívják a vért a tüdőverőérből; a tüdővénákon több vér jut a bal pitvarba, nyomása nagyobb lesz, mint a jobbé, ezért a foramen ovale bezárul. A köldökzsinór lekötése után a köldökerek hasi szakasza és a Botalli-vezeték is elzáródik.' },
      { kerdes: 'Miért záródik be az ovális nyílás születés után?', valasztas: ['Mert a bal pitvarban nagyobb lesz a nyomás, mint a jobb pitvarban', 'Mert a jobb pitvar megnő', 'Mert a köldökvéna összehúzódik', 'Mert a szívbillentyűk benövik'], valasz: 'Mert a bal pitvarban nagyobb lesz a nyomás, mint a jobb pitvarban', segitseg: 'A tüdőből most már sok vér jön a bal pitvarba.', megoldas: 'A nyomáskülönbség „rácsukja” a nyílás szelepszerű lemezét; később végleg összenő. Ha nem zárul be, nyitott ovális nyílás marad.' },
      { kerdes: 'Miért fontos az újszülött <b>szárítása, melegen tartása</b> és megfelelő légzése a keringés szempontjából is?', szakma: CIMKEK.GYERMEK, valasztas: ['Mert hidegben, oxigénhiányban és savasodásban a tüdőerek szűkek maradhatnak, és a vér továbbra is kikerüli a tüdőt (magzati keringés marad fenn)', 'Mert a meleg bezárja a köldökereket', 'Mert különben nem sír', 'Nincs összefüggés a keringéssel'], valasz: 'Mert hidegben, oxigénhiányban és savasodásban a tüdőerek szűkek maradhatnak, és a vér továbbra is kikerüli a tüdőt (magzati keringés marad fenn)', segitseg: 'Az átállás a tüdőerek kitágulásán múlik.', megoldas: 'Kihűlés, hipoxia, acidózis szűkíti a tüdőereket; a magas tüdőnyomás miatt a vér a rövidzárakon át a tüdőt megkerülheti → cianózis, romló állapot. Ezért: szárítás, meleg, légút, szükség esetén lélegeztetés.' },
      { kerdes: 'A könyv szerint a magzatban melyik szerv kapja a „legfrissebb”, legtisztább artériás vért?', valasztas: ['A máj', 'Az agy', 'A tüdő', 'A vese'], valasz: 'A máj', segitseg: 'A köldökvéna előbb ide ér.', megoldas: 'A könyv szerint tisztán artériás vért csak a máj kap, a többi artéria kevert vért tartalmaz. (Ma tudjuk, hogy a köldökvéna vérének jelentős része a ductus venosuson át megkerüli a májat, és a legoxigéndúsabb vér a foramen ovalén át főleg a szívbe és az agyba jut – vizsgán a könyv szerinti választ add.)' },
      { kerdes: 'Miért keveredik viszonylag kevéssé a jobb pitvarban az alsó és a felső üres véna vére a magzatban?', valasztas: ['Mert az áramlás iránya az alsó üres véna vérét az ovális nyílás felé, a felsőét a jobb kamra felé tereli', 'Mert a két véna más-más pitvarba ömlik', 'Mert a jobb pitvarban sövény választja el őket', 'Mert a felső üres véna a magzatban zárva van'], valasz: 'Mert az áramlás iránya az alsó üres véna vérét az ovális nyílás felé, a felsőét a jobb kamra felé tereli', segitseg: 'Két „sugár” keresztezi egymást.', megoldas: 'A végleges keveredés az aortában jön létre, ahol a jobb kamra vénás vére a Botalli-vezetéken át a jórészt artériás vérhez adódik.' },
      { kerdes: 'A könyv szerint a spermium másodpercenként kb. 0,025 mm-t halad. Hány mm ez percenként?', valasz: 1.5, tizedes: 1, egyseg: 'mm/perc', szakma: CIMKEK.SZAMOLAS, segitseg: '0,025 · 60.', megoldas: '0,025 mm/s · 60 = 1,5 mm/perc. Így a kb. 16–20 cm-es utat kb. 2 óra alatt teszi meg.' },
      { kerdes: 'Egy kiürülő ondóváladék a könyv szerint kb. 3,3 ml, és kb. 350 millió spermiumot tartalmaz. Kb. hány millió spermium van 1 ml-ben?', valasz: 350 / 3.3, tizedes: 0, egyseg: 'millió/ml', szakma: CIMKEK.SZAMOLAS, segitseg: '350 : 3,3.', megoldas: '350 : 3,3 ≈ 106 millió/ml. A megtermékenyítéshez csak egy kell – a nagy szám a fajfenntartás biztosítéka.' },
      { kerdes: 'A 4. hét végén az embrió kb. 5 mm, a 2. hónap végén kb. 2,5 cm. Hányszorosára nőtt a hossza?', valasz: 5, egyseg: '×', szakma: CIMKEK.SZAMOLAS, segitseg: 'Váltsd át: 2,5 cm = 25 mm.', megoldas: '25 mm : 5 mm = 5-szörösére – kb. 4 hét alatt.' },
      { kerdes: 'Várandós elmondja, hogy az utolsó menstruációja első napja óta 98 nap telt el. Hányadik betöltött terhességi hétnél tart?', valasz: 14, egyseg: 'hét', szakma: CIMKEK.TERHES, segitseg: '98 : 7.', megoldas: '98 : 7 = 14 betöltött hét – ezzel épp túl van az első trimeszteren (0–13. hét). A terhességi hét fontos adat az átadásnál (pl. életképesség, méhalap, szülészeti teendők).' },
      { kerdes: 'Mi a <b>fejlődési indukció</b>?', valasztas: ['Az organizációs centrumok irányító hatása, amelynek hatására a sejtek végleges fejlődési iránya meghatározódik (determinálódás)', 'A szülés megindítása', 'A pete beágyazódása', 'A kromoszómaszám feleződése'], valasz: 'Az organizációs centrumok irányító hatása, amelynek hatására a sejtek végleges fejlődési iránya meghatározódik (determinálódás)', segitseg: 'Élénkebb anyagcseréjű sejtcsoportok „vezérlik” a többit.', megoldas: 'A gasztrulációt az organizációs centrumok indítják meg; irányító hatásuk az indukció, amely után a totipotens sejtek determinálódnak.' },
      { kerdes: 'Mit bizonyít a kísérlet, amelyben egy korai ectoderma-darabkát a mesodermába ültetnek, és ott mesoderma lesz belőle?', valasztas: ['Hogy korai stádiumban a sejt sorsát a környezete (elhelyezkedése) dönti el', 'Hogy az ectoderma nem képes fejlődni', 'Hogy a csíralemezek felcserélhetetlenek', 'Hogy a mesoderma elpusztítja az idegen sejteket'], valasz: 'Hogy korai stádiumban a sejt sorsát a környezete (elhelyezkedése) dönti el', segitseg: 'A sejt nem a származásának, hanem az új helyének megfelelően fejlődik.', megoldas: 'A csíralemezek kialakulásában a más és más elhelyezkedés a döntő: a beültetett sejt az új helynek megfelelő szövetté alakul.' },
      { kerdes: 'Mi a <b>gerinchúr</b>, és miből fejlődik a végleges gerinc?', valasztas: ['A primitív szervezet tengelye; a gerinc nem belőle, hanem a mellette megjelenő őscsigolyákból fejlődik', 'A gerincvelő régi neve; belőle lesz a gerinc', 'A köldökzsinór része', 'Az idegrendszer telepe, belőle lesz az agy'], valasz: 'A primitív szervezet tengelye; a gerinc nem belőle, hanem a mellette megjelenő őscsigolyákból fejlődik', segitseg: 'Őscsigolyák kétoldalt.', megoldas: 'A gerinchúr a későbbi gerinc helyén van, de a gerinc a két oldalán megjelenő őscsigolyákból alakul ki; ezekből fejlődnek a primitív izomsejtek és a mesenchymasejtek is.' },
      { kerdes: 'Újszülött hátán, a gerinc felett vékony hártyás tömlő látszik, belőle tiszta folyadék szivárog. Mire gondolsz, és mi a helyes ellátás?', szakma: CIMKEK.GYERMEK, valasztas: ['Velőcső-záródási rendellenesség (nyitott gerinc) – steril, nedves fedés, hason vagy oldalt fektetés, nyomás kerülése, melegen tartás', 'Ártalmatlan anyajegy – nincs teendő', 'Születési sérülés – szoros kötés', 'Bőrfertőzés – fertőtlenítő oldattal lemosni'], valasz: 'Velőcső-záródási rendellenesség (nyitott gerinc) – steril, nedves fedés, hason vagy oldalt fektetés, nyomás kerülése, melegen tartás', segitseg: 'Az idegrendszer az ectodermából, egy csőből (velőcső) fejlődik.', megoldas: 'Ha a velőcső nem záródik be, a gerincvelő és burkai a felszínre kerülhetnek (spina bifida, myelomeningokele). Ne nyomd, ne fektesd hanyatt; steril, sóoldattal nedvesített fedés, hőmegtartás, gyors szállítás idegsebészeti centrumba.' },
      { kerdes: 'Miért javasolnak <b>folsavat</b> a fogamzás előtt és a terhesség elején?', szakma: CIMKEK.TERHES, valasztas: ['Mert csökkenti a velőcső-záródási rendellenességek kockázatát', 'Mert megakadályozza a koraszülést minden esetben', 'Mert pótolja a vasat', 'Mert gyorsítja a szülést'], valasz: 'Mert csökkenti a velőcső-záródási rendellenességek kockázatát', segitseg: 'A velőcső nagyon korán, az első hetekben záródik.', megoldas: 'A folsav (B-vitamin-csoport) hiánya összefügg a nyitott gerinccel és más velőcső-rendellenességekkel; mivel a velőcső már az első hetekben záródik, a pótlást a fogamzás előtt kell kezdeni.' },
      { kerdes: 'Helyszíni szülés után miért kell a köldökzsinórt két helyen lefogni, és a kettő között átvágni?', szakma: CIMKEK.TERHES, valasztas: ['Mert a köldökerek a magzat érhálózatában folytatódnak – így sem az újszülött, sem a lepény felől nem vérzik', 'Mert így gyorsabban leválik a lepény', 'Mert a köldökzsinórban nincs ér', 'Hogy a magzatvíz ne folyjon el'], valasz: 'Mert a köldökerek a magzat érhálózatában folytatódnak – így sem az újszülött, sem a lepény felől nem vérzik', segitseg: '2 artéria + 1 véna fut benne.', megoldas: 'A lefogás után a köldökerek hasi szakasza elzáródik. A lefogás nélküli átvágás az újszülött vérvesztésével járhat – az újszülött kis vérmennyisége miatt ez veszélyes.' },
      { kerdes: 'Miért fontos szülésnél, hogy a magzat feje a legnagyobb körfogatú testrész?', valasztas: ['Mert a fejnek kell elsőként és legnehezebben áthaladnia a szülőcsatornán; ha a fej megszületett, a test többnyire könnyebben követi', 'Mert a fej a legkönnyebb rész', 'Mert a fej mindig utoljára születik', 'Nincs jelentősége'], valasz: 'Mert a fejnek kell elsőként és legnehezebben áthaladnia a szülőcsatornán; ha a fej megszületett, a test többnyire könnyebben követi', segitseg: 'Az agyvelő gyors fejlődése miatt nagy a fej.', megoldas: 'A fej már az embrióban is aránytalanul nagy (agyvelő). A könyv is kiemeli: a fej körfogata fontos szempont a szülésvezetésnél. (Kivétel: vállelakadás.)' },
      { kerdes: 'Fiúújszülöttnél mire utal, ha a herék a herezacskóban vannak?', valasztas: ['Az érettség jele (a herék leszálltak a hasüregből)', 'Koraszülés jele', 'Fejlődési rendellenesség', 'Fertőzés jele'], valasz: 'Az érettség jele (a herék leszálltak a hasüregből)', segitseg: 'A herék a hasüregben fejlődnek.', megoldas: 'A könyv szerint az érettség jele fiúknál a herék leszállása, továbbá hogy a köldök kb. a test hosszának közepén van.' },
      magzatiFeladat('ovalis', 'ovális nyílás (foramen ovale)', 5, 'Kiemelve: az ovális nyílás a két pitvar között. A jobb pitvarból a bal pitvarba vezeti a vért; születés után bezárul.'),
      magzatiFeladat('botalli', 'Botalli-vezeték (ductus Botalli)', 6, 'Kiemelve: a Botalli-vezeték, amely a tüdőverőérből az aortába tereli a vért, így az kikerüli a még nem működő tüdőt.'),
      magzatiFeladat('koldokvena', 'köldökvéna', 7, 'Kiemelve: a köldökvéna, amely a méhlepényből a friss, oxigéndús vért szállítja a magzatba (a máj felé).'),
      magzatiFeladat('koldokarteria', 'köldökartériák', 8, 'Kiemelve: a köldökartériák, amelyek a magzat elhasznált vérét viszik vissza a méhlepénybe.'),
    ]),
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
        <li>Megjelenik a <b>középső csíralemez</b>, a <b>szervtelepek</b>, a központi idegrendszer telepe és a <b>gerinchúr</b> (a gerinc azonban az <b>őscsigolyákból</b> fejlődik).</li>
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
        <li>A méhlepényből a friss vér a <b>köldökvénán</b> át – részben közvetlenül, részben a májon keresztül – az <b>alsó üres vénába</b>, majd a jobb pitvarba jut.</li>
        <li>Innen nagy része az <b>ovális nyíláson</b> (foramen ovale) át a bal pitvarba, a bal kamrába és az aortába kerül.</li>
        <li>A felső üres véna vére a jobb kamrába, onnan a tüdőverőérbe jut, de a tüdő helyett a <b>Botalli-vezetéken</b> (ductus Botalli) át az aortába folyik.</li>
        <li>A két <b>köldökartéria</b> (a belső csípőverőerekből) visszaviszi a vért a méhlepénybe.</li>
      </ol>
      <p>A könyv szerint tisztán artériás vért csak a máj kap, a test többi artériája kevert vért tartalmaz. <b>Születéskor</b> az első légvétellel a tüdőerek kitágulnak, a bal pitvari nyomás megnő → az ovális nyílás bezárul; a köldökzsinór lekötése után a köldökerek hasi szakasza és a Botalli-vezeték is elzáródik.</p>
      <p class="kerekites">A mai felfogás szerint a köldökvéna vérének jelentős része a ductus venosuson át megkerüli a májat, és a legoxigéndúsabb vér főleg a szívbe és az agyba jut. Vizsgán a könyv szerinti leírást mondd.</p>

      <h3>A gyakorlatban</h3>
      <div class="doboz szakma">
        <p><b>🚑 Miért fontos a mentőnek?</b></p>
        <ul>
          <li><b>Terhességi hét:</b> a napok száma osztva 7-tel (pl. 98 nap = 14. hét). 280 nap = 40 hét = 10 holdhónap.</li>
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
          <li><b>4. hónap:</b> aktív mozgások. <b>5. hónap:</b> magzatmáz. <b>6. hónap:</b> bőr alatti zsírpárna.</li>
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
          <li>Magzati rövidzárak: <b>ovális nyílás</b> (pitvarok között) és <b>Botalli-vezeték</b> (tüdőverőér → aorta); az első légvétellel bezárulnak.</li>
        </ul>
      </div>`,
  });
})();
