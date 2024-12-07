window.addEventListener('scroll', function() {
    if (window.scrollY <= 0) { // Vérifie si la position de défilement est inférieure ou égale à 0
        document.getElementById("navbar").style.display = "none"; // Masque la barre de navigation
    } else if (window.scrollY > 650) { // Si la position de défilement est supérieure à 650, affiche la barre de navigation
        document.getElementById("navbar").style.display = "block";
    } else { // Sinon, masque la barre de navigation
        document.getElementById("navbar").style.display = "none";
    }
});

// Capturer l'événement de rafraîchissement de la page
window.onbeforeunload = function() {
    // Faire défiler vers la première div
    document.getElementById('premierPartie').scrollIntoView();
};
