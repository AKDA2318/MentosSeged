// Anatómia-demó: csak az Anatómia és élettan tantárgy (és azon belül a lent felsorolt témacsoportok)
// érhető el; a többi tantárgy, csoport és a fel nem töltött témák „Hamarosan” jelzéssel látszanak.
// Ezt a fájlt az eszkozok/demo-anatomia.sh írja.
'use strict';

window.MENTOS_CSAK = ['anatomia'];
window.MENTOS_CSOPORTOK = { anatomia: ['alapfogalmak', 'mozgasrendszer'] };
// Vizsgák: az elérhető részből témazáró és témakör-vizsga; a tantárgyi (nagy)vizsga és a komplex vizsga nem.
window.MENTOS_VIZSGA = ['tema', 'csoport'];
