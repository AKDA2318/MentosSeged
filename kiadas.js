// Anatómia-demó: csak az Anatómia és élettan tantárgy (és azon belül a lenti témacsoportok) érhető el,
// a többi tantárgy „Hamarosan” jelzéssel, nem kattinthatóan látszik a kezdőlapon.
'use strict';

window.MENTOS_CSAK = ['anatomia'];
// Az anatómiából egyelőre csak az I–III. fejezet (Alapfogalmak, sejt, fejlődés) érhető el.
window.MENTOS_CSOPORTOK = { anatomia: ['alapfogalmak'] };
// Vizsgák: az elérhető részből témazáró és témakör-vizsga; a tantárgyi (nagy)vizsga és a komplex vizsga nem.
window.MENTOS_VIZSGA = ['tema', 'csoport'];
