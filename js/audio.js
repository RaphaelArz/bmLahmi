document.addEventListener("DOMContentLoaded", function () {
    const debutAudio = document.getElementById("debutAudio");
    const receptionAudio = document.getElementById("receptionAudio");
    const chabbatAudio = document.getElementById("chabbatAudio");

    const debutSection = document.querySelector(".debut");
    const receptionSection = document.querySelector(".reception");
    const chabbatSection = document.querySelector(".chabbat");

    let currentAudio = null; // Aucun audio par défaut
    let observer = null; // Observer initialisé après le clic

    // Fonction pour effectuer un fondu entre deux musiques
    function crossFade(outgoingAudio, incomingAudio) {
        const fadeDuration = 1000; // Durée du fondu (en ms)
        const intervalDuration = 50; // Pas de l'animation (en ms)
        const steps = fadeDuration / intervalDuration; // Nombre d'étapes
        let currentStep = 0;

        if (incomingAudio) {
            incomingAudio.volume = 0; // La nouvelle musique commence silencieuse
            incomingAudio.play();
        }

        const fadeInterval = setInterval(() => {
            currentStep++;

            // Ajuste les volumes
            if (outgoingAudio) outgoingAudio.volume = Math.max(1 - currentStep / steps, 0);
            if (incomingAudio) incomingAudio.volume = Math.min(currentStep / steps, 1);

            // Fin du fondu
            if (currentStep >= steps) {
                clearInterval(fadeInterval);

                if (outgoingAudio) {
                    outgoingAudio.pause();
                    outgoingAudio.currentTime = 0; // Réinitialise la musique sortante
                }

                currentAudio = incomingAudio; // Met à jour l'audio en cours
            }
        }, intervalDuration);
    }

    // Fonction pour changer de musique avec fondu
    function switchAudio(newAudio) {
        if (currentAudio !== newAudio) {
            crossFade(currentAudio, newAudio); // Effectue le fondu entre l'audio actuel et le nouveau
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
        debutAudio.volume = 0; // La première musique commence silencieuse
        debutAudio.play(); // Démarre la musique de départ
        crossFade(null, debutAudio); // Applique un fondu entrant à la première musique
        currentAudio = debutAudio; // Définit l'audio actuel
        startObservingSections(); // Active l'observation
    };
});
