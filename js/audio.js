document.addEventListener("DOMContentLoaded", function () {
    const debutAudio = document.getElementById("debutAudio");
    const receptionAudio = document.getElementById("receptionAudio");
    const chabbatAudio = document.getElementById("chabbatAudio");

    const debutSection = document.querySelector(".debut");
    const receptionSection = document.querySelector(".reception");
    const chabbatSection = document.querySelector(".chabbat");

    let currentAudio = null; // L'audio actuellement en cours de lecture
    let currentSection = null; // La section actuellement visible
    let observer = null; // Observer activé après le clic

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
            crossFade(currentAudio, newAudio);
        }
    }

    // Fonction pour démarrer l'observation des sections
    function startObservingSections() {
        const sections = [debutSection, receptionSection, chabbatSection];
        const audioMap = {
            debut: debutAudio,
            reception: receptionAudio,
            chabbat: chabbatAudio,
        };

        observer = new IntersectionObserver((entries) => {
            let visibleSections = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio); // Trie par visibilité décroissante

            if (visibleSections.length > 0) {
                const mainSection = visibleSections[0].target; // Section majoritairement visible
                const newAudio = audioMap[mainSection.classList[0]]; // Associe l'audio correspondant

                // Changer de musique uniquement si la section a changé
                if (mainSection !== currentSection) {
                    switchAudio(newAudio);
                    currentSection = mainSection; // Met à jour la section actuelle
                }
            }
        }, {
            threshold: 0.5, // Détection lorsque 50% de la section est visible
        });

        // Observer toutes les sections
        sections.forEach((section) => observer.observe(section));
    }

    // Fonction pour démarrer le système de musiques (appelée au clic)
    window.startMusicSystem = function () {
        debutAudio.volume = 0; // La première musique commence silencieuse
        debutAudio.play(); // Démarre la musique de départ
        crossFade(null, debutAudio); // Applique un fondu entrant à la première musique
        currentAudio = debutAudio; // Définit l'audio actuel
        currentSection = debutSection; // Définit la section actuelle
        startObservingSections(); // Active l'observation
    };
});
