document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire traditionnel

    // Création de l'élément de message "Envoi en cours"
    var sendingMessage = document.createElement('div');
    sendingMessage.textContent = 'Envoi en cours...';
    sendingMessage.style.position = 'fixed';
    sendingMessage.style.top = '50%';
    sendingMessage.style.left = '50%';
    sendingMessage.style.transform = 'translate(-50%, -50%)';
    sendingMessage.style.backgroundColor = '#000000';
    sendingMessage.style.color = '#dab984';
    sendingMessage.style.padding = '20px';
    sendingMessage.style.borderRadius = '5px';
    sendingMessage.style.zIndex = '9999';
    sendingMessage.style.border = '2px solid #dab984';
    document.body.appendChild(sendingMessage);

    var formData = new FormData(event.target);
    var data = {};
    formData.forEach((value, key) => data[key] = value);

    fetch('https://script.google.com/macros/s/AKfycbxrmVpBoMlolTK0Wf1DKKpTzsdz9k-ks7bBmd6M_CsZYz76Rak8Tl3JuAG1-0fT53ze/exec', { // Remplacez par l'URL de déploiement du script Google Apps
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
    })
        .then(response => {
                sendingMessage.textContent = 'Envoyé avec succès!';
                sendingMessage.style.backgroundColor = '#000000'; // Vert pour succès

            setTimeout(function() {
                sendingMessage.remove(); // Supprimer le message après 5 secondes
            }, 5000);
        })
        .catch(error => {
            console.error('Erreur:', error);
            sendingMessage.textContent = 'Erreur lors de l\'envoi du formulaire.';
            sendingMessage.style.backgroundColor = '#f44336'; // Fond rouge en cas d'erreur
            setTimeout(function() {
                sendingMessage.remove(); // Supprimer le message après 5 secondes
            }, 5000);
        });
});
