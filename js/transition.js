function scrollToSection(sectionId) {
    // Trouver la position de la section cible
    const targetSection = document.querySelector(sectionId);
    const targetPosition = targetSection.offsetTop;

    // Faire défiler la page de manière fluide vers la section cible
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

window.onload = function() {
    // Ajoutez un événement pour chaque lien
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Empêche le comportement par défaut
            // Récupère la cible de l'ancre
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Faites défiler de manière animée vers la cible
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }

        });
    });
};