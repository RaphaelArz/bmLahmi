document.addEventListener("DOMContentLoaded", function () {
    const debutAudio = document.getElementById("debutAudio");
    const receptionAudio = document.getElementById("receptionAudio");
    const chabbatAudio = document.getElementById("chabbatAudio");

    const debutSection = document.querySelector(".debut");
    const receptionSection = document.querySelector(".reception");
    const chabbatSection = document.querySelector(".chabbat");

    let currentAudio = null;
    let observer = null;

    function crossFade(outgoingAudio, incomingAudio) {
        const fadeDuration = 1000; // Durée du fondu en millisecondes
        const intervalDuration = 50; // Durée entre chaque incrément (ms)
        const steps = fadeDuration / intervalDuration;
        let currentStep = 0;

        if (incomingAudio) {
            incomingAudio.volume = 0.01; // Volume très bas au départ
            incomingAudio.play().catch(console.error); // Gérer les erreurs éventuelles
        }

        const fadeInterval = setInterval(() => {
            currentStep++;

            const outgoingVolume = Math.max(1 - currentStep / steps, 0);
            const incomingVolume = Math.min(currentStep / steps, 1);

            if (outgoingAudio) outgoingAudio.volume = outgoingVolume;
            if (incomingAudio) incomingAudio.volume = incomingVolume;

            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                if (outgoingAudio) {
                    outgoingAudio.pause();
                    outgoingAudio.currentTime = 0; // Réinitialisation après pause
                }
                if (incomingAudio) incomingAudio.volume = 1; // Volume final correct
                currentAudio = incomingAudio;
            }
        }, intervalDuration);
    }

    function switchAudio(newAudio) {
        if (currentAudio !== newAudio) {
            crossFade(currentAudio, newAudio);
        }
    }

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
            threshold: 0.5,
        });

        observer.observe(debutSection);
        observer.observe(receptionSection);
        observer.observe(chabbatSection);
    }

    window.startMusicSystem = function () {
        debutAudio.volume = 0.01; // Volume initial bas
        debutAudio.play().catch(console.error); // Assure que l'audio démarre
        currentAudio = debutAudio; // Définir l'audio actuel
        startObservingSections();
    };
});
