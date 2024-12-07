document.querySelector('#reponse form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire par défaut

    // Récupérer les valeurs des champs
    var nom = document.getElementById('nom').value;
    var prenom = document.getElementById('prenom').value;
    var message = document.getElementById('message').value;
    var nombrePersonnes = document.getElementById('nombre').value;
    var assisterontReception = document.getElementById('reception').checked;
    var assisterontTephiline = document.getElementById('tephiline').checked;
    var nePourrontAssister = document.getElementById('ne-pourront-assister').checked;

    // Construire le message à envoyer
    var formData = new FormData();
    formData.append("Nom", nom);
    formData.append("Prénom", prenom);
    formData.append("Message au bar-mitzvah", message);
    formData.append("Nombre de personnes", nombrePersonnes);
    formData.append("Assisteront à la réception", assisterontReception ? "Oui" : "Non");
    formData.append("Assisteront à la mise des téphiline", assisterontTephiline ? "Oui" : "Non");
    formData.append("Ne pourront pas assister", nePourrontAssister ? "Oui" : "Non");

    // Envoyer le formulaire via Formspree
    fetch('https://formspree.io/f/mpzvblgd', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(function(response) {
        if (response.ok) {
            alert('Formulaire soumis avec succès!');
        } else {
            alert('Erreur lors de la soumission du formulaire.');
        }
    }).catch(function(error) {
        console.error('Erreur:', error);
    });
});
