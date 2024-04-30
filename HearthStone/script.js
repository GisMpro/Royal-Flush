function modifyHealth(amount) {
    var health = document.getElementById('health');
    var currentHealth = parseInt(health.textContent);
    currentHealth += amount;
    if (currentHealth < 0) currentHealth = 0; // Prevent health from going negative
    health.textContent = currentHealth;
}

function modifyArmor(amount) {
    var armor = document.getElementById('armor');
    var currentArmor = parseInt(armor.textContent);
    currentArmor += amount;
    if (currentArmor < 0) currentArmor = 0; // Prevent armor from going negative
    armor.textContent = currentArmor;
}

function modifyMana(amount) {
    var mana = document.getElementById('mana');
    var currentMana = parseInt(mana.textContent);
    currentMana += amount;
    if (currentMana < 0) currentMana = 0; // Prevent mana from going negative
    if (currentMana > 10) currentMana = 10; // Mana cap at 10
    mana.textContent = currentMana;
}