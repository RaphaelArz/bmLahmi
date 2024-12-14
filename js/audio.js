document.addEventListener("DOMContentLoaded", function () {
    const debutAudio = document.getElementById("debutAudio");
    const receptionAudio = document.getElementById("receptionAudio");
    const chabbatAudio = document.getElementById("chabbatAudio");

    const debutSection = document.querySelector(".debut");
    const receptionSection = document.querySelector(".reception");
    const chabbatSection = document.querySelector(".chabbat");

    let currentAudio = null;
    let observer = null;

    // Fonction pour croiser les fondus
    function crossFade(outgoingAudio, incomingAudio) {
        const fadeDuration = 1000; // Durée du fondu en millisecondes
        const intervalDuration = 50; // Durée entre chaque incrément (ms)
        const steps = fadeDuration / intervalDuration; // Nombre de pas dans le fondu
        let currentStep = 0;

        if (incomingAudio) incomingAudio.volume = 0;
        if (incomingAudio) incomingAudio.play();

        const fadeInterval = setInterval(() => {
            currentStep++;

            // Calcul des volumes
            const outgoingVolume = Math.max(1 - currentStep / steps, 0);
            const incomingVolume = Math.min(currentStep / steps, 1);

            if (outgoingAudio) outgoingAudio.volume = outgoingVolume;
            if (incomingAudio) incomingAudio.volume = incomingVolume;

            // Quand le fondu est terminé
            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                if (outgoingAudio) {
                    outgoingAudio.pause();
                    outgoingAudio.currentTime = 0;
                }
                if (incomingAudio) incomingAudio.volume = 1; // Assure un volume final correct
                currentAudio = incomingAudio; // Met à jour l'audio actuel
            }
        }, intervalDuration);
    }

    // Fonction pour changer d'audio avec croisement de fondus
    function switchAudio(newAudio) {
        if (currentAudio !== newAudio) {
            crossFade(currentAudio, newAudio);
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

        observer.observe(debutSection);
        observer.observe(receptionSection);
        observer.observe(chabbatSection);
    }

    // Fonction pour démarrer le système de musiques
    window.startMusicSystem = function () {
        debutAudio.volume = 0; // Assure que l'audio commence silencieux
        debutAudio.play(); // Démarre la première musique
        crossFade(null, debutAudio); // Applique un fondu entrant pour la première musique
        currentAudio = debutAudio; // Définit l'audio actuel
        startObservingSections(); // Active l'observation
    };
});
