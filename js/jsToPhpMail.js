$(document).ready(function(){
    $('#formReponse').submit(function(event){
        event.preventDefault(); // Empêche le comportement par défaut du formulaire

        // Récupère les données du formulaire
        var formData = $(this).serialize();

        // Envoie des données du formulaire via AJAX
        $.ajax({
            type: 'POST',
            url: 'send_email.php', // L'url où envoyer les données
            data: formData,
            success: function(response){
                alert('Votre réponse a été envoyée avec succès !');
                // Vous pouvez ajouter ici d'autres actions après l'envoi réussi du formulaire
            },
            error: function(xhr, status, error){
                alert('Une erreur s\'est produite lors de l\'envoi du formulaire.');
                console.error(xhr.responseText);
            }
        });
    });
});