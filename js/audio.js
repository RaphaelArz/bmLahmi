document.addEventListener("DOMContentLoaded", function () {
    const debutAudio = document.getElementById("debutAudio");
    const receptionAudio = document.getElementById("receptionAudio");
    const chabbatAudio = document.getElementById("chabbatAudio");

    const debutSection = document.querySelector(".debut");
    const receptionSection = document.querySelector(".reception");
    const chabbatSection = document.querySelector(".chabbat");

    let currentAudio = null; // Audio en cours de lecture
    let observer = null;

    // Fonction pour effectuer un fondu audio
    function crossFade(outgoingAudio, incomingAudio) {
        const fadeDuration = 1000; // Durée totale du fondu (ms)
        const steps = 20; // Nombre de pas dans le fondu
        const stepDuration = fadeDuration / steps;
        let currentStep = 0;

        if (incomingAudio && incomingAudio.paused) {
            incomingAudio.volume = 0;
            incomingAudio.play().catch((err) => console.error("Erreur lors de la lecture : ", err));
        }

        const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            if (outgoingAudio) outgoingAudio.volume = Math.max(1 - progress, 0);
            if (incomingAudio) incomingAudio.volume = Math.min(progress, 1);

            if (currentStep >= steps) {
                clearInterval(interval);
                if (outgoingAudio) {
                    outgoingAudio.pause(); // Pause uniquement après un fondu complet
                    outgoingAudio.currentTime = 0;
                }
                currentAudio = incomingAudio; // Définir l'audio actif
            }
        }, stepDuration);
    }

    // Fonction pour changer d'audio
    function switchAudio(newAudio) {
        if (currentAudio !== newAudio) {
            crossFade(currentAudio, newAudio);
        }
    }

    // Observer les sections visibles
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
        }, { threshold: 0.5 });

        observer.observe(debutSection);
        observer.observe(receptionSection);
        observer.observe(chabbatSection);
    }

    // Fonction pour initialiser la musique après interaction utilisateur
    function startMusicSystem() {
        if (currentAudio) return; // Empêche de démarrer plusieurs fois

        debutAudio.volume = 0; // Prépare l'audio initial
        debutAudio.play().catch((err) => console.error("Erreur de lecture audio :", err));
        currentAudio = debutAudio;
        startObservingSections();
    }

    // Ajout d'un événement de clic pour démarrer la musique
    const invitationButton = document.getElementById("invitationButton");
    if (invitationButton) {
        invitationButton.addEventListener("click", startMusicSystem);
    }
});
