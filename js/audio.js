document.addEventListener("DOMContentLoaded", function () {
    const debutAudio = document.getElementById("debutAudio");
    const receptionAudio = document.getElementById("receptionAudio");
    const chabbatAudio = document.getElementById("chabbatAudio");

    const debutSection = document.querySelector(".debut");
    const receptionSection = document.querySelector(".reception");
    const chabbatSection = document.querySelector(".chabbat");

    let currentAudio = null; // Aucun audio par défaut
    let observer = null; // Observer initialisé après le clic

    // Fonction pour changer d'audio
    function switchAudio(newAudio) {
        if (currentAudio !== newAudio) {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0; // Réinitialiser l'ancien audio
            }
            currentAudio = newAudio;
            currentAudio.play();
        }
    }

    // Fonction pour démarrer l'observation des sections
    function startObservingSections() {
        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target === debutSection) {
                        switchAudio(debutAudio);
                    } else if (entry.target === receptionSection) {
                        switchAudio(receptionAudio);
                    } else if (entry.target === chabbatSection) {
                        switchAudio(chabbatAudio);
                    }
                }
            });
        }, {
            threshold: 0.5 // Changement lorsque 50 % de la section est visible
        });

        // Observer les sections concernées
        observer.observe(debutSection);
        observer.observe(receptionSection);
        observer.observe(chabbatSection);
    }

    // Fonction pour démarrer la gestion des musiques (appelée au clic)
    window.startMusicSystem = function () {
        debutAudio.play(); // Démarre la musique de départ
        currentAudio = debutAudio; // Définit l'audio actuel
        startObservingSections(); // Active l'observation
    };
});