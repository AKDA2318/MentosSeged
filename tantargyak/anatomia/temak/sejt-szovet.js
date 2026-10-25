// Téma: Sejt, szövetek, homeosztázis, folyadékterek, anyagszállítás
'use strict';

(() => {
  const sz = Rajz.szam;
  const kartya = (ikon, cim, szoveg = '') =>
    `<div class="nagy-kartya"><div class="nagy-ikon">${ikon}</div><div class="nagy-cim">${cim}</div>${szoveg ? `<p>${szoveg}</p>` : ''}</div>`;

  // Folyadékterek oszlopdiagramja
  function folyadek(kg) {
    const viz = kg * 0.6;
    const icf = (viz * 2) / 3;
    const ecf = viz / 3;
    const sav = (x, h, o, t1, t2) =>
      `<rect x="${x}" y="${180 - h}" width="70" height="${h}" class="${o}" style="stroke: var(--szoveg); stroke-width: 1.5"/>` + Rajz.szoveg(x + 35, 192, t1, 'kicsi') + Rajz.szoveg(x + 35, 170 - h, t2, 'kicsi');
    const s = 150 / viz;
    return Rajz.svg(
      320,
      200,
      sav(10, viz * s, 'kitolt-b', 'összes víz', `${sz(viz, 1)} l`) +
        sav(90, icf * s, 'kitolt-c', 'sejten belül', `${sz(icf, 1)} l`) +
        sav(170, ((ecf * 3) / 4) * s, 'kitolt-sarga-r', 'sejtek között', `${sz((ecf * 3) / 4, 1)} l`) +
        sav(250, (ecf / 4) * s, 'kitolt-piros-r', 'vérplazma', `${sz(ecf / 4, 1)} l`),
      'Folyadékterek',
    );
  }

  // ---- Animáció ----
  const animacio = [
    { felirat: 'A test legkisebb élő egysége a <b>sejt</b> (cellula). Általában 10–30 µm-es, csak mikroszkóppal látható; kb. 30 billió (30 000 milliárd) sejtből állunk.', rajz: () => kartya('🔬', 'A sejt') },
    { felirat: 'A <b>sejthártya</b> körülveszi és védi a sejtet, és szabályozza, mi juthat be és ki. A <b>sejtmagban</b> (nucleus) van az örökítőanyag (DNS); osztódáskor ez a testi sejtekben 46 kromoszómába rendeződik.', rajz: () => kartya('⭕🧬', 'Sejthártya és sejtmag') },
    { felirat: 'A <b>mitokondrium</b> a sejt „erőműve”: oxigén segítségével energiát (ATP-t) termel. Oxigén nélkül sokkal kevesebb energia keletkezik, és <b>tejsav</b> halmozódik fel.', rajz: () => kartya('⚡🔋', 'Mitokondrium = erőmű') },
    { felirat: 'A hasonló sejtek <b>szöveteket</b> alkotnak: hám-, kötő- és támasztó-, izom- és idegszövet. A szövetekből épülnek fel a <b>szervek</b>.', rajz: () => kartya('🧱', 'Sejt → szövet → szerv → szervrendszer') },
    { felirat: 'A <b>homeosztázis</b> a belső környezet állandósága: testhő, vércukor, pH, víz- és sóháztartás. Ha felborul (pl. kihűlés, kiszáradás, savasodás), a szervek működése romlik.', rajz: () => kartya('⚖️', 'Homeosztázis') },
  ];

  // ---- Interaktív rész: folyadékterek ----
  const interaktiv = Rajz.interaktiv({
    csuszkak: [{ k: 'kg', cim: 'Testtömeg', min: 40, max: 120, lepes: 5, ertek: 70, egyseg: 'kg' }],
    frissit: ({ kg }) => ({
      rajz: folyadek(kg),
      szamitas: `<p>Összes víz: ${kg} · 0,6 = <b>${sz(kg * 0.6, 1)} l</b> (felnőttnél kb. 60%)</p>
        <p>Sejten belül (⅔): <b>${sz(kg * 0.4, 1)} l</b>, sejten kívül (⅓): <b>${sz(kg * 0.2, 1)} l</b></p>
        <p>A sejten kívüli folyadék ¾-e a sejtek között, ¼-e a vérplazmában van.</p>
        <p class="kerekites">Csecsemőnél a víz aránya magasabb (kb. 70–80%), időseknél alacsonyabb.</p>`,
    }),
  });

  // ---- Feladatok ----
  const SZOVET = ['Hámszövet', 'Kötő- és támasztószövet', 'Izomszövet', 'Idegszövet'];
  const szovet = (kerdes, valasz, segitseg, megoldas) => ({
    kerdes,
    valasztas: SZOVET,
    valasz,
    fixSorrend: true,
    segitseg,
    megoldas,
  });

  const feladatok = [
    ...Tananyag.szint(1, [
      {
        kerdes: 'Melyik sejtalkotó termeli a sejt energiáját?',
        valasztas: ['Mitokondrium', 'Sejtmag', 'Sejthártya', 'Riboszóma'],
        valasz: 'Mitokondrium',
        segitseg: 'A sejt „erőműve”.',
        megoldas: 'A mitokondrium oxigén felhasználásával ATP-t (energiát) termel.',
      },
      {
        kerdes: 'Hol található a sejt örökítőanyaga (DNS)?',
        valasztas: ['A sejtmagban', 'A sejthártyában', 'A vérben', 'A lizoszómában'],
        valasz: 'A sejtmagban',
        segitseg: 'A sejt „irányítóközpontja”.',
        megoldas: 'A DNS főként a sejtmagban van; ez irányítja a sejt működését.',
      },
      szovet('Melyik szövettípus borítja a test felszínét (bőr) és béleli a szerveket (nyálkahártya)?', 'Hámszövet', 'Ebből a szövetből épülnek fel a mirigyek is.', 'A hámszövet borít és bélel: bőr felhámja, nyálkahártyák, mirigyek.'),
      szovet('Melyik szövettípusba tartozik a csont, a porc és a vér?', 'Kötő- és támasztószövet', 'Sok sejtközötti állomány jellemzi; a vérben ez a plazma.', 'A csont, porc, ín, zsír és a vér is kötő- és támasztószövet.'),
    ]),
    ...Tananyag.szint(2, []),
    ...Tananyag.szint(3, []),
    ...Tananyag.szint(1, []),
    ...Tananyag.szint(2, []),
    ...Tananyag.szint(3, []),
  ];

  Tananyag.tema('anatomia', {
    azon: 'sejt-szovet',
    ikon: '🔬',
    animacio,
    interaktiv,
    feladatok,
    magyarazat: `
      <div class="doboz cel">
        <b>Mire jó ez neked?</b>
        <p>Miért halnak el az agysejtek néhány perc oxigénhiány után? Miért lesz savas a vér sokkban? Miért nem adhatunk vénába tiszta vizet? A válasz a <b>sejtek</b> működésében és a <b>homeosztázisban</b> rejlik. Ez az alap, amire a többi téma épül.</p>
      </div>
      <p class="kerekites">📘 Tankönyvi fejezet (Donáth Tibor: Anatómia–élettan): II. fejezet – A szervezet morfológiai felépítése (Protoplazma; Sejt; Szövetek: hámszövet, kötő- és támasztószövet, izomszövet, idegszövet; Szervek, szervrendszerek). A homeosztázis és a folyadékterek a későbbi élettani fejezetekben kerülnek elő.</p>

      <h3>Nézd meg lépésről lépésre!</h3>
      <div data-animacio></div>

      <h3>A sejt felépítése</h3>
      <p>Az élő anyag a <b>protoplazma</b>: kb. 80%-a víz, a többi fehérje, szénhidrát, zsírszerű anyag (lipoid), sók és enzimek (a tankönyvben: fermentumok). Legfontosabb alkotója a <b>fehérje</b> (aminosavakból felépülő polipeptidláncok). A protoplazma legfejlettebb formája a <b>sejt</b> (cellula): citoplazmából, sejtorganellumokból és sejtmagból áll. A sejtek között <b>sejtközötti (intercelluláris) állomány</b> is van – a szervezet ebből is épül.</p>
      <div class="tabla-keret"><table>
        <thead><tr><th>Sejtalkotó</th><th>Feladata</th></tr></thead>
        <tbody>
          <tr><td>sejthártya (sejtmembrán)</td><td>elhatárol; ezen át veszi fel a sejt a tápanyagot és adja le a bomlástermékeket</td></tr>
          <tr><td>citoplazma</td><td>a sejt magon kívüli része; izomsejtben miofibrillumok, idegsejtben neurofibrillumok vannak benne</td></tr>
          <tr><td>sejtközpont (cytocentrum, két centriolumból)</td><td>a sejtosztódás és a sejtmozgás irányítása</td></tr>
          <tr><td>mitokondrium</td><td>oxidációs folyamatok – energiatermelés (ATP)</td></tr>
          <tr><td>riboszóma (az endoplazmás hálózaton)</td><td>fehérjeszintézis</td></tr>
          <tr><td>Golgi-készülék</td><td>váladékképzés (szekréció)</td></tr>
          <tr><td>vakuólum</td><td>folyadékkal telt hólyagocska</td></tr>
          <tr><td>sejtmag (nucleus)</td><td>maghártya, magnedv, kromatin (DNS), 1–3 magvacska (nucleolus); osztódáskor kromoszómák: testi sejtben <b>46</b>, ivarsejtben <b>23</b></td></tr>
        </tbody>
      </table></div>
      <p>A sejtek alakja a környezettől és a működéstől függ (a vérben gömb, a hámban lapos, kocka vagy henger alakú). Méretük általában <b>10–30 µm</b> (1 µm = 0,001 mm), ezért csak mikroszkóppal láthatók. Az ember kb. <b>30 billió</b> sejtből áll. A többsejtű szervezet sejtjei <b>differenciálódnak</b> (elkülönülnek): az izomsejt mozgat, a mirigysejt váladékot termel.</p>

      <h3>A sejt életjelenségei</h3>
      <ol>
        <li><b>Anyagcsere:</b> a sejt a szövetnedvből táplálkozik; a felvett anyagokat felépíti (<b>asszimiláció</b>), lebontja (<b>disszimiláció</b>), ill. kiválasztja. Speciális formái: a <b>szekréció</b> (mirigysejtek váladékképzése) és a <b>fagocitózis</b> (falósejtek bekebelezik a részecskéket – emberben védekezés).</li>
        <li><b>Sejtmozgás:</b> <b>amőboid</b> mozgás (pl. fehérvérsejtek – így jutnak ki az érfalon át), ostorral (ondósejt), csillószőrökkel (a hám felszínéről sodorják el az idegen anyagot).</li>
        <li><b>Ingerlékenység:</b> az inger hatására a sejtben <b>ingerület</b> jön létre; irányított mozgás (taxis) is lehet: fény, hő, vegyi anyag (kemotaxis) felé vagy elől.</li>
        <li><b>Növekedés:</b> addig, amíg a sejt felszíne elég a táplálásához.</li>
        <li><b>Osztódás:</b> direkt (<b>amitosis</b>), indirekt (<b>mitosis</b> – a két leánysejt 46 kromoszómás, mint az anyasejt) és felező (<b>meiosis</b> – az ivarsejtek 23 kromoszómások).</li>
      </ol>

      <h3>A négy alapszövet</h3>
      <p>A <b>szövet</b> az azonos alakú és működésű sejtek összessége (a hám kivételével sejtközötti állománnyal együtt).</p>
      <div class="tabla-keret"><table>
        <thead><tr><th>Szövet</th><th>Feladat</th><th>Példa</th></tr></thead>
        <tbody>
          <tr><td>Hámszövet</td><td>borít, bélel, elválaszt</td><td>bőr felhámja, nyálkahártya, mirigyek</td></tr>
          <tr><td>Kötő- és támasztó</td><td>összeköt, megtart, szállít</td><td>csont, porc, ín, zsír, vér</td></tr>
          <tr><td>Izom</td><td>összehúzódik</td><td>vázizom (akaratlagos); simaizom és szívizom (akaratlan)</td></tr>
          <tr><td>Ideg</td><td>ingerületet vezet</td><td>agy, gerincvelő, idegek</td></tr>
        </tbody>
      </table></div>

      <h4>Hámszövet</h4>
      <ul>
        <li>Borítja a test külső és belső felszíneit, béleli az üreges szerveket.</li>
        <li>Ide tartozik az erek belső felszínét bélelő <b>endothel</b> és a savós üregek (mellhártya, hashártya) felszínét borító <b>mesothel</b> is.</li>
        <li>Sejtjei szorosan egymás mellett: <b>nincs sejtközötti állomány és nincsenek erei</b>.</li>
        <li>Alak szerint: <b>laphám, köbhám, hengerhám</b>; rétegszám szerint: <b>egyrétegű, többrétegű</b>.</li>
        <li>Működés szerint: <b>fedőhám</b> (védőhám – pl. a bőr elszarusodó laphámja, a légutak és a petevezeték csillószőrös hengerhámja, a húgyutak urotheliuma), <b>érzékhám</b>, <b>felszívóhám</b> (vékonybél), <b>mirigyhám</b>.</li>
        <li>Mirigyek: <b>külső elválasztású</b> (exokrin, kivezetőcsővel a felszínre ürít – nyál, epe) és <b>belső elválasztású</b> (endokrin, kivezetőcső nélkül a vérbe ürít – hormonok).</li>
      </ul>

      <h4>Kötő- és támasztószövet</h4>
      <ul>
        <li>A legelterjedtebb szövet; sok <b>sejtközötti állománya</b> (rostok + alapállomány) van. Rostjai: <b>kollagén</b> (enyvadó), <b>rugalmas</b> és <b>rácsrostok</b>.</li>
        <li>Sejtjei: rostképző fibroblaszt (fibrocita), falósejt (makrofág, hisztiocita), vándorsejtek (limfocita, plazmasejt), hízósejt (heparin, hisztamin).</li>
        <li>Fajtái: <b>laza rostos</b> (mindenütt), <b>tömött rostos</b> (legrendezettebb formája az <b>ín</b>), <b>reticularis</b> (vérképző és nyirokszervek váza).</li>
        <li>A <b>vér</b> is kötőszövet: sejtjei a vérsejtek, sejtközötti állománya a plazma.</li>
        <li>Véd a mechanikai és vegyi ártalmak ellen; falósejtjeinek rendszere, a <b>RES</b> (reticuloendothelialis rendszer) a kórokozókat és az idegen részecskéket kebelezi be.</li>
        <li>Vizet, sót, zsírt tárol. Ha sok vizet köt meg: <b>vizenyő (ödéma)</b>; nagy vízvesztésnél (pl. hasmenés) a kötőszövet szinte kiszárad.</li>
        <li><b>Porcszövet:</b> érmentes, porchártya borítja. <b>Üvegporc</b> (hyalinporc, pl. ízületi porc, bordaporc), <b>rugalmas rostos porc</b> (fülporc), <b>kollagén rostos porc</b> (porckorong).</li>
        <li><b>Csontszövet:</b> csontsejtek + mészsóval telített sejtközötti állomány. A lemezek a <b>Havers-csatorna</b> (benne erek) körül koncentrikusan rendeződnek: ez az <b>osteon</b>, a csont mechanikai egysége.</li>
        <li><b>Zsírszövet:</b> tartalék tápanyag, hőszigetelés, támasztás (talp, vese körüli, szemüregi zsírtest).</li>
      </ul>

      <h4>Izomszövet</h4>
      <div class="tabla-keret"><table>
        <thead><tr><th></th><th>Simaizom</th><th>Harántcsíkolt (váz-) izom</th><th>Szívizom</th></tr></thead>
        <tbody>
          <tr><td>Felépítés</td><td>orsó alakú sejtek, középen egy mag</td><td>néhány cm hosszú rostok, sok mag a rost hártyája alatt, harántcsíkolat</td><td>harántcsíkolt rostok hálózata, Eberth-vonalak</td></tr>
          <tr><td>Működés</td><td>akaratlan (vegetatív idegrendszer)</td><td>akaratlagos</td><td>akaratlan</td></tr>
          <tr><td>Összehúzódás</td><td>lassú, féregszerű, nem fárad</td><td>gyors, nagy erejű, hamar fárad</td><td>nagy erejű, nem fárad</td></tr>
          <tr><td>Hol?</td><td>tápcsatorna, hörgők, erek fala, bőr</td><td>vázizmok</td><td>szív</td></tr>
        </tbody>
      </table></div>
      <p>💬 Az Eberth-vonalakat ma <b>interkaláris lemezeknek</b> (discus intercalaris) nevezzük; a sejtek közötti réskapcsolatokon terjed át az ingerület.</p>

      <h4>Idegszövet</h4>
      <p>Ingert fog fel, ingerületet hoz létre és vezet. Egysége a <b>neuron</b>: idegsejt + idegrost + idegvégződés.</p>

      <h3>Szervek és szervrendszerek</h3>
      <p>Az azonos működést szolgáló szövetek <b>szervvé</b> egyesülnek (pl. a vesében hám-, kötő- és idegszövet is van), a szervek <b>szervrendszert</b> alkotnak. A tankönyv felosztása: <b>mozgásrendszer</b> (csontváz, izomzat), <b>keringési szervek</b>, <b>zsigeri rendszerek</b> (emésztő-, légző-, vizeletkiválasztó és nemi szervek), <b>szabályozó rendszerek</b> (belső elválasztású mirigyek, idegrendszer) és az <b>érzékszervek</b>. Az irányítás közös: ideg- és hormonrendszer (neuroendokrin rendszer).</p>

      <h3>Anyagszállítás a sejthártyán át</h3>
      <ul>
        <li><b>Diffúzió:</b> az oldott anyag a nagyobb koncentráció felől a kisebb felé mozog, energia nélkül (pl. az oxigén a léghólyagocskából a vérbe).</li>
        <li><b>Ozmózis:</b> a víz áramlása féligáteresztő hártyán át a töményebb oldat felé – „a víz követi a sót”.</li>
        <li><b>Aktív transzport:</b> energiát (ATP-t) igénylő szállítás a koncentrációkülönbséggel szemben (pl. nátrium-kálium pumpa). Oxigénhiányban kevés az ATP, a pumpa leáll, a sejt megduzzad.</li>
      </ul>
      <p>A sejteken <b>kívül</b> a nátrium, a sejteken <b>belül</b> a kálium a fő ion. Az <b>izotóniás</b> oldat (pl. 0,9%-os NaCl) töménysége a vérével azonos: a sejtek nem változnak. <b>Hipotóniás</b> (hígabb) oldatban a víz a sejtbe áramlik, a vörösvértest megduzzad, szétpattanhat (hemolízis); <b>hipertóniás</b> (töményebb) oldatban a sejt vizet veszít, összezsugorodik.</p>

      <h3>Homeosztázis – a belső egyensúly</h3>
      <p>A sejteket körülvevő folyadék (szövetnedv, vérplazma, nyirok) a <b>belső környezet</b>. Ennek viszonylagos állandósága a homeosztázis; az ideg- és a hormonrendszer tartja fenn.</p>
      <ul>
        <li><b>Testhő:</b> kb. 36–37 °C</li>
        <li><b>Vér pH:</b> 7,35–7,45 (alatta acidózis, fölötte alkalózis). A CO₂ a vérben szénsavat képez: ha a beteg túl sokat lélegzik ki (hiperventiláció), alkalózis, ha keveset (légzési elégtelenség), acidózis lesz.</li>
        <li><b>Vércukor:</b> éhgyomorra kb. 4–6 mmol/l</li>
        <li><b>Víz és sók</b> (nátrium, kálium) egyensúlya</li>
      </ul>
      <p><b>Negatív visszacsatolás:</b> az eltérés ellentétes irányú választ vált ki, és így megszűnik (pl. melegben izzadás hűt) – mint egy termosztát. <b>Pozitív visszacsatolás:</b> az eltérés önmagát erősíti; betegségben ördögi kör lesz belőle (pl. vérzés → kihűlés → rosszabb alvadás → még több vérzés).</p>

      <h3>Próbáld ki: a test folyadékterei</h3>
      <div data-interaktiv></div>

      <div class="tetel">
        <b>Folyadékterek</b>
        <p class="keplet">víz ≈ 60% · ⅔ sejten belül · ⅓ sejten kívül (¾ sejtek között, ¼ plazma)</p>
        <p class="pelda">70 kg → 42 l víz → 28 l sejten belül, 14 l sejten kívül (10,5 l a sejtek között, 3,5 l plazma)</p>
      </div>

      <h3>A gyakorlatban</h3>
      <div class="doboz szakma">
        <p><b>🚑 Miért fontos ez a mentőnek?</b></p>
        <ul>
          <li><b>Oxigénhiány</b> → tejsav → acidózis (sokk, szívmegállás).</li>
          <li><b>Az agy</b> perceken belül károsodik oxigén nélkül.</li>
          <li><b>Izotóniás</b> infúzió (0,9% NaCl, balanszírozott oldat) – soha tiszta víz vénába.</li>
          <li><b>CO₂</b> és pH: hiperventiláció → alkalózis; légzési elégtelenség → acidózis.</li>
        </ul>
      </div>

      <details class="tobbet">
        <summary>Ha többet szeretnél tudni: a sejttan története és a lizoszóma</summary>
        <ul>
          <li>Robert Hooke 1665-ben parafametszeten „rekeszeket” (sejteket) írt le; Schleiden a növényi, Schwann (1839) az állati sejteket írta le; Virchow szerint „sejt csak sejtből keletkezhet”.</li>
          <li><b>Lizoszóma:</b> a tankönyvben nem szereplő, de ma fontos sejtalkotó – a sejten belüli lebontás („emésztés”) helye.</li>
        </ul>
      </details>

      <h3>Gyakori hibák</h3>
      <ul>
        <li>❌ A <b>szívizmot</b> akaratlagosnak hiszed.</li>
        <li>❌ <b>Diffúzió és ozmózis</b> összekeverése.</li>
        <li>❌ A <b>vért</b> nem tartod szövetnek (kötőszövet!).</li>
      </ul>

      <div class="doboz jegyezd">
        <b>Jegyezd meg!</b>
        <ul>
          <li>Mitokondrium = <b>energia</b>; oxigén nélkül <b>tejsav</b>.</li>
          <li>Négy alapszövet: <b>hám, kötő-támasztó, izom, ideg</b>. A hámban nincs ér és sejtközötti állomány.</li>
          <li>Riboszóma = fehérjeszintézis; 46 kromoszóma (ivarsejt: 23); mitosis, meiosis.</li>
          <li>Izom: sima (akaratlan), harántcsíkolt (akaratlagos), szív (akaratlan, nem fárad).</li>
          <li>Homeosztázis: testhő, <b>pH 7,35–7,45</b>, vércukor, víz.</li>
          <li>Víz ≈ <b>60%</b> (⅔ sejten belül).</li>
        </ul>
      </div>`,
  });
})();
