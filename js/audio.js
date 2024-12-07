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
        const sections = [debutSection, receptionSection, chabbatSection];
        const audioMap = {
            debut: debutAudio,
            reception: receptionAudio,
            chabbat: chabbatAudio,
        };

        observer = new IntersectionObserver((entries) => {
            let visibleSections = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio); // Trie par la proportion visible

            if (visibleSections.length > 0) {
                const mainSection = visibleSections[0].target; // Section majoritairement visible
                const newAudio = audioMap[mainSection.classList[0]]; // Associe l'audio correspondant
                switchAudio(newAudio);
            }
        }, {
            threshold: Array.from({ length: 101 }, (_, i) => i / 100), // Détection précise à différents seuils
        });

        sections.forEach((section) => observer.observe(section));
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
