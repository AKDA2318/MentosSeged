// Téma: Testtájak, irányok, síkok, testüregek, hasi negyedek
'use strict';

(() => {
  // Emberi test elölről, irányjelző nyilakkal. Minden nyíl egy ponttól (a kiindulási helytől) indul,
  // és abba az irányba mutat, amit a szakszó jelent. kiemel: a megjelenítendő nyilak/részek listája
  // ('felso', 'also', 'medialis', 'lateralis', 'proximalis', 'distalis', 'kar', 'jobb', 'bal'); üres = mind.
  function iranyok(kiemel = []) {
    const van = (azon) => !kiemel.length || kiemel.includes(azon);
    const pont = (x, y) => `<circle cx="${x}" cy="${y}" r="4" class="iranypont"/>`;
    const nyil = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="ut oxi" marker-end="url(#nyilhegy-oxi)"/>`;
    const cimke = (x, y, sorok, h = 'middle') => sorok.map((t, k) => Rajz.szoveg(x, y + k * 14, t, 'kicsi piros', h)).join('');
    // A közös rajzoló „elölről” feliratát (a lábfejek alatt) áthelyezzük, mert ott indul az alsó nyíl.
    const test = Rajz.ember({ feliratok: {}, nezet: 'elol' }).replace(/<svg[^>]*>/, '').replace('</svg>', '')
      .replace(/<text\b[^>]*>elölről<\/text>/, '') + Rajz.szoveg(116, 290, 'elölről', 'kicsi halvany-szoveg', 'start');
    let r = '';
    // Középvonal (a középsík nyoma): a mediális és laterális irány ehhez viszonyít.
    if (van('medialis') || van('lateralis')) {
      r += `<line x1="80" y1="-8" x2="80" y2="300" class="vonal-kozep"/>` + Rajz.szoveg(74, -14, 'középvonal', 'kicsi', 'end');
    }
    // Végtag: a könyök előtti (felkar) és utáni (alkar) rész a jobb karon.
    if (van('kar')) {
      r +=
        `<path d="M46 60 q-14 2 -16 16 l-3.5 34 h19 l2.5 -24 Z" class="kar-proximalis"/>` +
        `<path d="M26.5 110 l-4.5 44 q-1 8 6 9 h6 q6 0 7 -7 l4.5 -46 Z" class="kar-distalis"/>` +
        `<line x1="-2" y1="110" x2="24" y2="110" class="vonal-kozep"/>` +
        Rajz.szoveg(-6, 114, 'könyök', 'kicsi', 'end') +
        cimke(-6, 70, ['felkar:', 'proximálisan'], 'end') +
        cimke(-6, 146, ['alkar:', 'disztálisan'], 'end');
    }
    if (van('felso')) r += pont(80, 8) + nyil(80, 3, 80, -20) + cimke(90, -12, ['felső (kraniális)'], 'start');
    if (van('also')) r += pont(66, 292) + nyil(66, 297, 66, 318) + cimke(78, 314, ['alsó (kaudális)'], 'start');
    if (van('medialis')) r += pont(126, 100) + nyil(121, 100, 86, 100) + cimke(146, 96, ['középhez közeli', '(mediális)'], 'start');
    if (van('lateralis')) r += pont(66, 100) + nyil(61, 100, -12, 100) + cimke(-16, 96, ['oldalsó', '(laterális)'], 'end');
    // A végtagon a pont a könyök; a nyíl a kar tengelyében a törzs felé (proximális) vagy attól el (disztális) mutat.
    if (van('proximalis')) r += pont(36, 110) + nyil(37, 104, 41, 66) + (van('kar') ? '' : cimke(-6, 76, ['törzshöz közeli', '(proximális)'], 'end'));
    if (van('distalis')) r += pont(36, 110) + nyil(35, 116, 32, 158) + (van('kar') ? '' : cimke(-6, 146, ['távoli', '(disztális)'], 'end'));
    if (van('jobb')) r += nyil(-30, 230, -90, 230) + cimke(-60, 248, ['a beteg', 'JOBB oldala']);
    if (van('bal')) r += nyil(190, 230, 250, 230) + cimke(220, 248, ['a beteg', 'BAL oldala']);
    return `<svg viewBox="-110 -30 380 352" class="abra" role="img" aria-label="Anatómiai irányok">
      <defs><marker id="nyilhegy-oxi" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="nyilhegy oxi"/></marker></defs>
      ${test}${r}
    </svg>`;
  }

  // A has kilenc tájéka (szemből nézve: a beteg jobb oldala a rajz bal oldalán)
  function kilencTajek() {
    const T = [
      ['jobb bordaív', 'alatti tájék'], ['gyomortáj'], ['bal bordaív', 'alatti tájék'],
      ['jobb oldali', 'hastájék'], ['köldöktáj'], ['bal oldali', 'hastájék'],
      ['jobb', 'lágyéktájék'], ['alhas'], ['bal', 'lágyéktájék'],
    ];
    const cella = (sorok, i) => {
      const x = 10 + (i % 3) * 100, y = 10 + Math.floor(i / 3) * 64;
      return `<rect x="${x}" y="${y}" width="100" height="64" class="test"/>` +
        sorok.map((t, k) => Rajz.szoveg(x + 50, y + 36 - (sorok.length - 1) * 7 + k * 14 + (i === 4 ? 6 : 0), t, 'kicsi')).join('');
    };
    return Rajz.svg(320, 236, T.map(cella).join('') + '<circle cx="160" cy="90" r="3" class="pont"/>' +
      Rajz.szoveg(72, 226, 'a beteg JOBB oldala', 'kicsi') + Rajz.szoveg(248, 226, 'a beteg BAL oldala', 'kicsi'),
      'A has kilenc tájéka');
  }

  // ---- Animáció ----
  const animacio = [
    { felirat: 'Az irányokat mindig az <b>anatómiai alaphelyzetből</b> nézzük: a beteg áll, szemből néz ránk, a karjai lógnak, a tenyere előre néz.', rajz: () => iranyok(['nincs']) },
    { felirat: '<b>Felső (superior, cranialis)</b> = a fej felé; <b>alsó (inferior, caudalis)</b> = a láb (a far) felé. Pl. a szív a rekeszizom fölött (kraniálisan) van.', rajz: () => iranyok(['felso', 'also']) },
    { felirat: 'A szaggatott vonal a <b>középvonal</b> (a középsík nyoma), amely a testet jobb és bal testfélre osztja. <b>Mediális</b> (középhez közel eső) = a középvonal felé; <b>oldalsó (laterális)</b> = a középvonaltól el. A pont mutatja, honnan indulunk. Pl. a fül laterálisan van az orrhoz képest.', rajz: () => iranyok(['medialis', 'lateralis']) },
    { felirat: 'Végtagokon a <b>törzshöz</b> viszonyítunk. A könyökhöz képest a <b>felkar</b> (kék) <b>proximálisan</b> van, vagyis a törzshöz közelebb; az <b>alkar</b> (narancs) <b>disztálisan</b>, vagyis a törzstől távolabb. Pl. a könyök proximális a csuklóhoz képest.', rajz: () => iranyok(['kar', 'proximalis', 'distalis']) },
    { felirat: '<b>Jobb és bal</b> mindig a <b>beteg</b> szemszögéből értendő! Szemből nézve a beteg jobb oldala a <b>te bal oldaladon</b>, a beteg bal oldala a <b>te jobb oldaladon</b> van.', rajz: () => iranyok(['jobb', 'bal']) },
  ];

  // ---- Interaktív rész: hasi negyedek ----
  const NEGYEDEK = {
    jf: ['Jobb felső negyed', 'máj, epehólyag, a vastagbél egy része, jobb vese (hátul)', 'epekő, májsérülés'],
    bf: ['Bal felső negyed', 'gyomor, lép, hasnyálmirigy farka, bal vese (hátul)', 'lépsérülés (bal vállba sugárzó fájdalom!)'],
    ja: ['Jobb alsó negyed', 'vakbél és féregnyúlvány, vékonybél vége, jobb petefészek', 'vakbélgyulladás'],
    ba: ['Bal alsó negyed', 'leszálló vastagbél, szigmabél, bal petefészek', 'a vastagbél gurdélyainak gyulladása (diverticulitis)'],
  };
  function interaktiv(el) {
    const negyed = (k, x, y) => `<rect x="${x}" y="${y}" width="90" height="80" class="test kattinthato" data-n="${k}"/>`;
    el.innerHTML = `<div class="interaktiv">
      <div class="rajz"><svg viewBox="0 0 220 220" class="abra" role="img" aria-label="Hasi negyedek">
        ${negyed('jf', 20, 20)}${negyed('bf', 110, 20)}${negyed('ja', 20, 100)}${negyed('ba', 110, 100)}
        <circle cx="110" cy="100" r="5" class="pont"/>
        ${Rajz.szoveg(116, 90, 'köldök', 'kicsi', 'start')}
        ${Rajz.szoveg(65, 205, 'beteg JOBB', 'kicsi')}${Rajz.szoveg(155, 205, 'beteg BAL', 'kicsi')}
      </svg></div>
      <div class="szamitas"><p>Kattints egy hasi negyedre!</p></div></div>`;
    el.addEventListener('click', (e) => {
      const n = e.target.closest('[data-n]');
      if (!n) return;
      el.querySelectorAll('[data-n]').forEach((r) => r.classList.toggle('jelolt', r === n));
      const [nev, szervek, pelda] = NEGYEDEK[n.dataset.n];
      el.querySelector('.szamitas').innerHTML = `<p><b>${nev}</b></p><p>Szervek: ${szervek}</p><p>Példa fájdalomra: ${pelda}</p>`;
    });
  }

  // ---- Feladatok ----
  const IRANY = ['felső (kraniális)', 'alsó (kaudális)', 'középhez közeli (mediális)', 'oldalsó (laterális)', 'törzshöz közeli (proximális)', 'távoli (disztális)'];
  const irany = (kerdes, valasz, megoldas) => ({
    kerdes,
    valasztas: IRANY,
    valasz,
    fixSorrend: true,
    segitseg: 'Kraniális = fej felé, kaudális = láb felé, mediális = középvonal felé, laterális = oldalra, proximális = törzshöz közel, disztális = törzstől távol.',
    megoldas,
  });

  const feladatok = [
    ...Tananyag.szint(1, [
      {
        kerdes: 'Mi az <b>anatómiai alaphelyzet</b>?',
        valasztas: [
          'Álló test, szemből néz, a karok lógnak, a tenyér előre néz',
          'Hanyatt fekvés',
          'Ülő helyzet',
          'Oldalfekvés',
        ],
        valasz: 'Álló test, szemből néz, a karok lógnak, a tenyér előre néz',
        segitseg: 'Ebből a helyzetből írjuk le az irányokat.',
        megoldas: 'Anatómiai alaphelyzet: egyenes állás, előre néző arc, a test mellett lógó karok, előre néző tenyér. Minden irány ehhez viszonyít.',
      },
      {
        kerdes: 'A betegnek a <b>jobb</b> karja sérült. Ha szemből nézed, melyik oldaladon van?',
        valasztas: ['A te bal oldaladon', 'A te jobb oldaladon', 'Mögötte', 'Mindegy'],
        valasz: 'A te bal oldaladon',
        segitseg: 'A jobb és bal mindig a beteg szemszögéből értendő.',
        megoldas: 'Szemből nézve a beteg jobb oldala a te bal oldaladon van. A dokumentációban mindig a beteg oldalát írd!',
      },
      irany('A fej melyik irányban van a mellkashoz képest?', 'felső (kraniális)', 'A fej a mellkashoz képest felül, kraniálisan van.'),
      irany('A csukló milyen irányban van a könyökhöz képest?', 'távoli (disztális)', 'A csukló távolabb van a törzstől, mint a könyök: disztális.'),
    ]),
    ...Tananyag.szint(2, []),
    ...Tananyag.szint(3, []),
    ...Tananyag.szint(1, []),
    ...Tananyag.szint(2, []),
    ...Tananyag.szint(3, []),
    ...Tananyag.szint(2, []),
  ];

  Tananyag.tema('anatomia', {
    azon: 'testtajak-iranyok',
    ikon: '🧍',
    animacio,
    interaktiv,
    feladatok,
    magyarazat: `
      <div class="doboz cel">
        <b>Mire jó ez neked?</b>
        <p>A mentőnek <b>pontosan</b> kell leírnia, hol van a sérülés vagy a fájdalom: „a bal alkar disztális harmadának laterális oldalán” mindenkinek ugyanazt jelenti. Az anatómia nyelvét ebben a részben tanulod meg – minden más anatómiai téma erre épül.</p>
      </div>
      <p class="kerekites">📘 Tankönyvi fejezet (Donáth Tibor: Anatómia–élettan): I. fejezet – Bevezetés (Az anatómia és az élettan fogalma és felosztása; Az anatómia és az élettan vizsgáló módszerei; A test felépítésének általános elvei; A test fő síkjai és irányai; Anatómiai szakkifejezések)</p>

      <h3>Anatómia és élettan</h3>
      <p>Az <b>anatómia</b> a test <b>felépítését</b> (szerkezetét) írja le – a szó eredetileg „boncolást” jelent. Az <b>élettan</b> (physiologia) a test <b>működését</b>, az életjelenségeket vizsgálja. A kettő egy egész: a működés a szerkezettől függ, és a működés vissza is hat a szerkezetre (pl. az edzett izom megnő).</p>
      <div class="tabla-keret"><table>
        <thead><tr><th>Ág</th><th>Mit vizsgál?</th></tr></thead>
        <tbody>
          <tr><td>rendszeres (szisztematikus) anatómia</td><td>szervrendszerenként: csonttan, ízülettan, izomtan, értan, zsigertan, idegtan, érzékszervek</td></tr>
          <tr><td>tájanatómia</td><td>testtájanként: az izmok, erek, idegek, zsigerek egymáshoz való viszonyát</td></tr>
          <tr><td>összehasonlító anatómia</td><td>az ember és az állatok szerkezetének összevetését</td></tr>
          <tr><td>alkalmazott (klinikai) anatómia</td><td>az anatómia gyakorlati, orvosi vonatkozásait</td></tr>
          <tr><td>röntgenanatómia (az alkalmazott anatómia része)</td><td>a csontokat, a szívet, a tüdőt, valamint a levegővel vagy kontrasztanyaggal feltöltött üreges szervek alakját és helyzetét röntgensugárral</td></tr>
          <tr><td>művészi anatómia</td><td>a test felszíni formáit különböző testhelyzetekben – képzőművészek számára</td></tr>
          <tr><td>szövettan (histologia)</td><td>a szabad szemmel nem látható, mikroszkópos szerkezetet</td></tr>
          <tr><td>sejttan (cytologia, a szövettan önálló része)</td><td>a sejtek mikroszkópos szerkezetét</td></tr>
          <tr><td>fejlődéstan (embryologia)</td><td>a kialakulást a megtermékenyüléstől a születésig: az egyed fejlődését (ontogenesis), a fajok fejlődését (phylogenesis), és összehasonlító módon a rokon fajokét</td></tr>
        </tbody>
      </table></div>
      <p>Az élettan növény- és állatélettanra tagolódik; az emberélettan az állatélettan része. Külön ágak: munkaélettan, táplálkozás-élettan, összehasonlító élettan. Mindez a <b>biológia</b> része.</p>

      <h3>Hogyan vizsgáljuk?</h3>
      <ul>
        <li><b>Boncolás (preparálás)</b> késsel, csipesszel – előtte a tetemet <b>10%-os formalinnal</b> konzerválják (az érpályába fecskendezik).</li>
        <li><b>Macerálás</b> (áztatás): a csontokat hetekig langyos vízben áztatják, zsírtalanítják, fehérítik – így készül az összefűzött csontváz.</li>
        <li><b>Injekciós technika:</b> az erekbe festett, megszilárduló masszát fecskendeznek, így az erek jól kipreparálhatók.</li>
        <li><b>Korróziós (szétmarásos) eljárás:</b> a szerv erébe saválló masszát fecskendeznek, majd sósav marja le a lágyrészeket, és csak az érhálózat „öntvénye” marad – így a legfinomabb hajszálerek is vizsgálhatók.</li>
        <li><b>Röntgen:</b> csontok, valamint kontrasztanyaggal feltöltött üreges szervek és erek – élőben is.</li>
        <li><b>Szövettan:</b> rögzítés, víztelenítés, beágyazás után <b>mikrotommal</b> 5–10 µm vastag metszet, festés, majd <b>mikroszkóp</b>.</li>
      </ul>
      <div class="tetel">
        <b>A mikroszkóp</b>
        <p class="keplet">nagyítás = objektív nagyítása · okulár nagyítása</p>
        <p><b>Szavakkal:</b> álló részei a talp és az oszlop; mozgó részei a tükör (a fényforrás fényét juttatja a mikroszkópba), a kondenzor (gyűjti és a tárgyra irányítja a fényt), a tárgyasztal, a tubus a lencsékkel – a revolveren a tárgylencsék (objektív), felül a szemlencse (okulár) –, valamint a makrométer- (durva) és mikrométercsavar (finom beállítás). Pl. 40-es objektív és 8-as okulár: 320-szoros nagyítás. A fénymikroszkóp kb. 10–1500-szoros, az elektronmikroszkóp több százezerszeres nagyításra képes.</p>
      </div>
      <p>💬 A mai mikroszkópokban a tükör helyett általában beépített lámpa adja a fényt.</p>
      <p>Az <b>élettan</b> fő módszere a <b>kísérlet</b>: műtéti módszer (szerv eltávolítása, ér lekötése, ideg átvágása – kiesési tünetek), izolált túlélő szervek, gyógyszerkísérleti (biokémiai), fizikai módszerek, szervbeültetés és -átültetés.</p>

      <h3>A test felépítésének elvei és fő részei</h3>
      <ul>
        <li><b>Kétoldali részarányosság</b> (bilaterális szimmetria): a középsík a testet két tükörképszerű félre osztja. Később aszimmetria is kialakul: a szív, a lép, a gyomor inkább balra, a máj jobbra esik.</li>
        <li><b>Szelvényezettség:</b> a törzs ismétlődő egységekből épül fel – emberben már csak a <b>bordákon</b>, a <b>csigolyákon</b> és a <b>gerincvelői idegeken</b> látszik.</li>
        <li>A test (corpus) fő részei: <b>fej</b> (caput), <b>nyak</b> (collum), <b>törzs</b> (truncus), <b>végtagok</b> (extremitates: felső és alsó végtag). A törzs részei: <b>mellkas</b> (thorax), <b>has</b> (abdomen), <b>medence</b> (pelvis).</li>
      </ul>

      <h3>Nézd meg lépésről lépésre!</h3>
      <div data-animacio></div>

      <h3>Irányok</h3>
      <div class="tabla-keret"><table>
        <thead><tr><th>Szakszó</th><th>Jelentés</th><th>Párja</th></tr></thead>
        <tbody>
          <tr><td>superior (cranialis)</td><td>felső, fej felé</td><td>inferior (caudalis): alsó, far felé</td></tr>
          <tr><td>anterior (ventralis)</td><td>elülső, has felőli</td><td>posterior (dorsalis): hátsó, hát felőli</td></tr>
          <tr><td>medialis</td><td>középhez közel eső</td><td>lateralis: oldalsó</td></tr>
          <tr><td>proximalis</td><td>a törzshöz közel (végtagon)</td><td>distalis: a törzstől távol</td></tr>
          <tr><td>superficialis</td><td>felületi</td><td>profundus: mély</td></tr>
          <tr><td>externus</td><td>külső</td><td>internus: belső</td></tr>
          <tr><td>palmaris</td><td>tenyéri</td><td>plantaris: talpi</td></tr>
        </tbody>
      </table></div>
      <p>💡 <b>Jobb és bal</b> (dexter, sinister) mindig a <b>beteg</b> szemszögéből! A cranialis–caudalis kifejezőbb, mint a superior–inferior, mert a testhez kötött: fekvő betegnél is egyértelmű.</p>

      <h3>Síkok</h3>
      <ul>
        <li><b>Középsík (mediánsík):</b> a középvonalban elölről hátra halad, jobb és bal testfélre oszt.</li>
        <li><b>Nyílirányú (sagittalis) síkok:</b> a középsíkkal párhuzamosak.</li>
        <li><b>Homloksík (frontalis):</b> a homlokkal párhuzamos, elülső és hátsó részre oszt.</li>
        <li><b>Vízszintes (horizontalis, transversalis) sík:</b> az előző kettőre merőleges, felső és alsó részre oszt (CT-szeletek).</li>
      </ul>

      <h3>Testüregek</h3>
      <p>A törzs nagy üregét (testüreg) a <b>rekeszizom</b> (diaphragma) osztja mellüregre és hasüregre; alul a medenceüreg csatlakozik hozzá.</p>
      <ul>
        <li><b>Koponyaüreg:</b> agy.</li>
        <li><b>Gerinccsatorna:</b> gerincvelő.</li>
        <li><b>Mellüreg:</b> tüdők, szív (a gátorban), nagy erek.</li>
        <li><b>Hasüreg:</b> gyomor, belek, máj, lép. A hashártya mögött (<b>retroperitoneálisan</b>): vesék, hasi aorta.</li>
        <li><b>Medenceüreg:</b> húgyhólyag, végbél, belső nemi szervek. Erős csontok veszik körül; alsó fala a két comb közötti terület, a <b>gát</b> (perineum).</li>
      </ul>

      <h3>Anatómiai szakkifejezések</h3>
      <p>Az anatómiai képleteket nemzetközileg egységes <b>latin</b> nevekkel jelöljük. Az anatómiai nevezéktan (nómenklatúra) kb. <b>5000</b> fogalmat tartalmaz. A tankönyv írásakor érvényes nevezéktant 1955-ben Párizsban állították össze (<b>Párizsi Nomina Anatomica, PNA</b>).</p>
      <p>💬 Ma a nemzetközileg elfogadott nevezéktan a <b>Terminologia Anatomica</b> (1998, átdolgozva 2019); a legtöbb latin név ugyanaz maradt.</p>
      <div class="tabla-keret"><table>
        <thead><tr><th>Latin</th><th>Magyar</th><th>Latin</th><th>Magyar</th></tr></thead>
        <tbody>
          <tr><td>arteria (a.)</td><td>ütőér</td><td>vena (v.)</td><td>visszér</td></tr>
          <tr><td>musculus (m.)</td><td>izom</td><td>nervus (n.)</td><td>ideg</td></tr>
          <tr><td>os</td><td>csont</td><td>articulatio (art.)</td><td>ízület</td></tr>
          <tr><td>ligamentum (lig.)</td><td>szalag</td><td>glandula (gl.)</td><td>mirigy</td></tr>
          <tr><td>foramen</td><td>lyuk</td><td>sulcus</td><td>árok</td></tr>
          <tr><td>fissura</td><td>hasadék</td><td>incisura</td><td>bevágás</td></tr>
          <tr><td>tuber</td><td>dudor</td><td>tuberculum</td><td>kis dudor, kiemelkedés</td></tr>
          <tr><td>crista</td><td>taraj</td><td>spina</td><td>tövis</td></tr>
          <tr><td>ganglion</td><td>idegdúc</td><td>nucleus</td><td>mag</td></tr>
          <tr><td>lymphonodus</td><td>nyirokcsomó</td><td>valvula</td><td>billentyű</td></tr>
          <tr><td>regio</td><td>tájék</td><td>ramus (r.)</td><td>ág</td></tr>
          <tr><td>magnus</td><td>nagy</td><td>parvus</td><td>kicsi</td></tr>
          <tr><td>supra</td><td>felett</td><td>infra, sub</td><td>alatt</td></tr>
          <tr><td>inter</td><td>között</td><td>intra</td><td>belül</td></tr>
        </tbody>
      </table></div>
      <p>Többes szám rövidítve: aa. (arteriae), vv. (venae), mm. (musculi), nn. (nervi), ligg. (ligamenta).</p>

      <h3>Próbáld ki: hasi negyedek</h3>
      <div data-interaktiv></div>

      <div class="tetel">
        <b>Hasi negyedek</b>
        <p class="keplet">Két képzelt vonal a köldökön át: függőleges és vízszintes</p>
        <p><b>Szavakkal:</b> jobb felső (máj, epehólyag), bal felső (gyomor, lép), jobb alsó (féregnyúlvány), bal alsó (szigmabél). A köldök fölötti középső terület a gyomortáj (epigastrium), a köldök alatti az alhas (hypogastrium).</p>
      </div>

      <h3>A gyakorlatban</h3>
      <div class="doboz szakma">
        <p><b>🚑 Dokumentációs példa</b></p>
        <p class="pelda">„3 cm-es vérző vágott seb a jobb lábszár disztális harmadának mediális oldalán. A jobb alsó hasi negyedben nyomásérzékenység.”</p>
        <p>Pontos, rövid, mindenki ugyanúgy érti.</p>
      </div>

      <details class="tobbet">
        <summary>Ha többet szeretnél tudni: a has kilenc tájéka</summary>
        <p>A hasat két függőleges és két vízszintes képzelt vonal osztja 3 × 3 = 9 tájékra. A függőleges vonalak a kulcscsontok
          közepétől lefelé húzott vonalak, a vízszintesek a bordaívek alsó szélén, illetve a két elülső felső csípőtövisen
          haladnak át. A rajz és a táblázat úgy áll, ahogy a beteget szemből látod: a beteg jobb oldala a bal oldalon van.</p>
        <div class="rajz">${kilencTajek()}</div>
        <div class="tabla-keret"><table>
          <thead><tr><th></th><th>A beteg jobb oldala</th><th>Középen</th><th>A beteg bal oldala</th></tr></thead>
          <tbody>
            <tr><th>Felül</th><td>jobb bordaív alatti tájék (regio hypochondriaca dextra)</td><td>gyomortáj (epigastrium)</td><td>bal bordaív alatti tájék (regio hypochondriaca sinistra)</td></tr>
            <tr><th>Középen</th><td>jobb oldali hastájék (regio lateralis dextra)</td><td>köldöktáj (regio umbilicalis)</td><td>bal oldali hastájék (regio lateralis sinistra)</td></tr>
            <tr><th>Alul</th><td>jobb lágyéktájék (regio inguinalis dextra)</td><td>alhas, szeméremtájék (hypogastrium, regio pubica)</td><td>bal lágyéktájék (regio inguinalis sinistra)</td></tr>
          </tbody>
        </table></div>
      </details>

      <h3>Gyakori hibák</h3>
      <ul>
        <li>❌ <b>A saját jobb oldaladat írod</b> a beteg jobb oldala helyett.</li>
        <li>❌ <b>Proximális–disztális</b> összekeverése.</li>
        <li>❌ <b>Pontatlan helyleírás</b> („a lábán valahol”).</li>
      </ul>

      <div class="doboz jegyezd">
        <b>Jegyezd meg!</b>
        <ul>
          <li>Anatómia = felépítés, élettan = működés; az élettan fő módszere a kísérlet.</li>
          <li>Felépítési elvek: kétoldali részarányosság és szelvényezettség.</li>
          <li>Alaphelyzet: áll, szemből néz, tenyér előre.</li>
          <li>Kraniális–kaudális, anterior–posterior, mediális–laterális, <b>proximális–disztális</b>.</li>
          <li>Jobb/bal: a <b>beteg</b> szerint.</li>
          <li>Máj jobb felső, lép bal felső, féregnyúlvány jobb alsó negyed.</li>
        </ul>
      </div>`,
  });
})();
