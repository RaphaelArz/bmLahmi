// Sélection des cases à cocher
var nePourrontAssisterCheckbox = document.getElementById('ne-pourront-assister');
var receptionCheckbox = document.getElementById('reception');
var tephilineCheckbox = document.getElementById('chabbat');

// Écouteurs d'événements sur le changement des cases à cocher
receptionCheckbox.addEventListener('change', function() {
    // Si "Assisteront à la réception" est cochée, décocher "Ne pourront pas assister"
    if (receptionCheckbox.checked) {
        nePourrontAssisterCheckbox.checked = false;
    }
});

tephilineCheckbox.addEventListener('change', function() {
    // Si "Assisteront à la mise des téphiline" est cochée, décocher "Ne pourront pas assister"
    if (tephilineCheckbox.checked || receptionCheckbox.checked) {
        nePourrontAssisterCheckbox.checked = false;
    }
});

nePourrontAssisterCheckbox.addEventListener('change', function() {
    // Si "Ne pourront pas assister" est cochée, décocher les autres cases
    if (nePourrontAssisterCheckbox.checked) {
        receptionCheckbox.checked = false;
        tephilineCheckbox.checked = false;
    }
});
